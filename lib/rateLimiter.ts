/**
 * Rate limiting — Upstash Redis (production) with in-memory fallback (dev/test).
 *
 * Production: set UPSTASH_REDIS_REST_URL + UPSTASH_REDIS_REST_TOKEN in env.
 * Development: automatic in-memory sliding-window (resets on process restart).
 *
 * Per-endpoint limits (requests per minute per IP):
 *   /api/agent/respond  → 20
 *   /api/agent/speak    → 15
 *   /api/agent/lead     →  5
 *   /api/agent/knowledge→ 30
 *   /api/contact        →  5
 *   /api/book           → 10
 *   /api/checkout       → 10
 *   default             → 60
 */

import { NextRequest, NextResponse } from "next/server";

// ── Upstash (production) ───────────────────────────────────────────────────────

async function upstashLimit(
  key: string,
  limit: number,
  windowMs: number
): Promise<{ success: boolean; remaining: number; reset: number }> {
  const url   = process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN;

  const now       = Date.now();
  const windowSec = Math.floor(windowMs / 1000);
  const bucket    = `rl:${key}:${Math.floor(now / windowMs)}`;

  try {
    // INCR + EXPIRE via Upstash REST pipeline
    const res = await fetch(`${url}/pipeline`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify([
        ["INCR", bucket],
        ["EXPIRE", bucket, windowSec],
      ]),
    });

    if (!res.ok) throw new Error("Upstash error");

    const data: [[string, number], [string, number]] = await res.json();
    const count = data[0][1];
    const reset = Math.ceil(now / windowMs) * windowMs;

    return {
      success:   count <= limit,
      remaining: Math.max(0, limit - count),
      reset,
    };
  } catch {
    // If Upstash is unreachable, fail open (allow the request)
    return { success: true, remaining: limit, reset: now + windowMs };
  }
}

// ── In-memory fallback (development / no Upstash) ─────────────────────────────

type WindowEntry = { count: number; windowStart: number };
const memStore = new Map<string, WindowEntry>();

function memLimit(
  key: string,
  limit: number,
  windowMs: number
): { success: boolean; remaining: number; reset: number } {
  const now         = Date.now();
  const windowStart = Math.floor(now / windowMs) * windowMs;
  const reset       = windowStart + windowMs;

  const entry = memStore.get(key);

  if (!entry || entry.windowStart !== windowStart) {
    memStore.set(key, { count: 1, windowStart });
    return { success: true, remaining: limit - 1, reset };
  }

  entry.count += 1;
  memStore.set(key, entry);

  return {
    success:   entry.count <= limit,
    remaining: Math.max(0, limit - entry.count),
    reset,
  };
}

// ── Unified interface ─────────────────────────────────────────────────────────

const WINDOW_MS = 60_000; // 1 minute sliding window

const ROUTE_LIMITS: Record<string, number> = {
  "/api/agent/respond":   20,
  "/api/agent/speak":     15,
  "/api/agent/lead":       5,
  "/api/agent/knowledge": 30,
  "/api/contact":          5,
  "/api/book":            10,
  "/api/booking":         10,
  "/api/checkout":        10,
};

function getLimitForPath(pathname: string): number {
  for (const [route, limit] of Object.entries(ROUTE_LIMITS)) {
    if (pathname.startsWith(route)) return limit;
  }
  return 60; // generous default for other API routes
}

function getClientIp(req: NextRequest): string {
  return (
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    req.headers.get("x-real-ip") ||
    "unknown"
  );
}

export async function rateLimit(
  req: NextRequest
): Promise<{ success: boolean; response?: NextResponse }> {
  const ip       = getClientIp(req);
  const pathname = new URL(req.url).pathname;
  const limit    = getLimitForPath(pathname);
  const key      = `${pathname}:${ip}`;

  const isUpstash =
    Boolean(process.env.UPSTASH_REDIS_REST_URL) &&
    Boolean(process.env.UPSTASH_REDIS_REST_TOKEN);

  const result = isUpstash
    ? await upstashLimit(key, limit, WINDOW_MS)
    : memLimit(key, limit, WINDOW_MS);

  if (result.success) return { success: true };

  const retryAfter = Math.ceil((result.reset - Date.now()) / 1000);

  return {
    success: false,
    response: NextResponse.json(
      {
        error: "Too many requests. Please wait before trying again.",
        retryAfter,
      },
      {
        status: 429,
        headers: {
          "Retry-After":        String(retryAfter),
          "X-RateLimit-Limit":  String(limit),
          "X-RateLimit-Remaining": "0",
          "X-RateLimit-Reset":  String(result.reset),
        },
      }
    ),
  };
}
