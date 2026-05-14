/**
 * In-memory sliding-window rate limiter.
 *
 * Per-endpoint limits (requests per minute per IP):
 *   /api/agent/respond  → 20
 *   /api/agent/speak    → 15
 *   /api/agent/lead     →  5
 *   /api/agent/knowledge→ 30
 *   /api/contact        →  5
 *   /api/book           → 10
 *   /api/booking        → 10
 *   /api/checkout       → 10
 *   default             → 60
 *
 * Resets on process restart (acceptable for edge/serverless deployments).
 */

import { NextRequest, NextResponse } from "next/server";

const WINDOW_MS = 60_000;

const ROUTE_LIMITS: Record<string, number> = {
  "/api/agent/respond":   20,
  "/api/agent/speak":     15,
  "/api/agent/lead":       5,
  "/api/agent/knowledge": 30,
  "/api/contact":          5,
  "/api/apply":            5,
  "/api/book":            10,
  "/api/booking":         10,
  "/api/checkout":        10,
  "/api/nova/session":    60,
  "/api/nova/feedback":   20,
};

type WindowEntry = { count: number; windowStart: number };

// Module-level store — shared across all requests in the same Node.js process.
const store = new Map<string, WindowEntry>();

// Prune stale entries every 5 minutes to prevent unbounded memory growth.
if (typeof setInterval !== "undefined") {
  setInterval(() => {
    const cutoff = Date.now() - WINDOW_MS * 2;
    for (const [key, entry] of store.entries()) {
      if (entry.windowStart < cutoff) store.delete(key);
    }
  }, 5 * 60_000);
}

function getLimitForPath(pathname: string): number {
  for (const [route, limit] of Object.entries(ROUTE_LIMITS)) {
    if (pathname.startsWith(route)) return limit;
  }
  return 60;
}

function getClientIp(req: NextRequest): string {
  return (
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    req.headers.get("x-real-ip") ||
    "unknown"
  );
}

function check(
  key: string,
  limit: number
): { success: boolean; remaining: number; reset: number } {
  const now         = Date.now();
  const windowStart = Math.floor(now / WINDOW_MS) * WINDOW_MS;
  const reset       = windowStart + WINDOW_MS;

  const entry = store.get(key);

  if (!entry || entry.windowStart !== windowStart) {
    store.set(key, { count: 1, windowStart });
    return { success: true, remaining: limit - 1, reset };
  }

  entry.count += 1;

  return {
    success:   entry.count <= limit,
    remaining: Math.max(0, limit - entry.count),
    reset,
  };
}

export async function rateLimit(
  req: NextRequest
): Promise<{ success: boolean; response?: NextResponse }> {
  const ip       = getClientIp(req);
  const pathname = new URL(req.url).pathname;
  const limit    = getLimitForPath(pathname);
  const key      = `${pathname}:${ip}`;

  const result = check(key, limit);

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
          "Retry-After":           String(retryAfter),
          "X-RateLimit-Limit":     String(limit),
          "X-RateLimit-Remaining": "0",
          "X-RateLimit-Reset":     String(result.reset),
        },
      }
    ),
  };
}
