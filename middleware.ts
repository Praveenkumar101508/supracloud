/**
 * Next.js Edge Middleware — runs before every matched request.
 * Responsibilities:
 *   1. Rate limiting (per-IP, per-route) via lib/rateLimiter
 *   2. Block obviously malicious request patterns
 *   3. Add security headers to all API responses
 */
import { NextRequest, NextResponse } from "next/server";
import { rateLimit } from "./lib/rateLimiter";

export const config = {
  matcher: ["/api/:path*"],
};

// Patterns that should never appear in a request body or URL for our API
const BLOCKED_UA_PATTERNS = [
  /sqlmap/i,
  /nikto/i,
  /nessus/i,
  /masscan/i,
  /zgrab/i,
  /python-requests\/[01]\./i, // old automated scrapers
];

const BLOCKED_PATH_PATTERNS = [
  /\.(php|asp|aspx|jsp|cgi)$/i,
  /wp-admin/i,
  /phpMyAdmin/i,
  /\.env$/i,
  /\/etc\/passwd/i,
  /\.\.\//,            // path traversal
];

export async function middleware(req: NextRequest) {
  const { pathname } = new URL(req.url);
  const ua = req.headers.get("user-agent") || "";

  // ── 1. Block scanners / crawlers targeting non-existent routes ──────────────
  for (const pattern of BLOCKED_UA_PATTERNS) {
    if (pattern.test(ua)) {
      return new NextResponse(null, { status: 403 });
    }
  }

  for (const pattern of BLOCKED_PATH_PATTERNS) {
    if (pattern.test(pathname)) {
      return new NextResponse(null, { status: 404 });
    }
  }

  // ── 2. Block oversized request bodies early (before route handler) ──────────
  const contentLength = req.headers.get("content-length");
  if (contentLength && parseInt(contentLength, 10) > 50_000) {
    return NextResponse.json(
      { error: "Request body too large." },
      { status: 413 }
    );
  }

  // ── 3. Rate limiting ────────────────────────────────────────────────────────
  const { success, response: rateLimitResponse } = await rateLimit(req);
  if (!success && rateLimitResponse) {
    // Add CORS headers so the browser sees the 429 properly
    rateLimitResponse.headers.set("Access-Control-Allow-Origin", "*");
    return rateLimitResponse;
  }

  // ── 4. Continue — security response headers are set in next.config.ts ───────
  return NextResponse.next();
}
