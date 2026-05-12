/**
 * Next.js 16 Proxy — runs before every matched request.
 * (Renamed from middleware.ts per Next.js 16 convention.)
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

const BLOCKED_UA_PATTERNS = [
  /sqlmap/i,
  /nikto/i,
  /nessus/i,
  /masscan/i,
  /zgrab/i,
  /python-requests\/[01]\./i,
];

const BLOCKED_PATH_PATTERNS = [
  /\.(php|asp|aspx|jsp|cgi)$/i,
  /wp-admin/i,
  /phpMyAdmin/i,
  /\.env$/i,
  /\/etc\/passwd/i,
  /\.\.\//,
];

export async function proxy(req: NextRequest) {
  const { pathname } = new URL(req.url);
  const ua = req.headers.get("user-agent") || "";

  // 1. Block scanners
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

  // 2. Block oversized request bodies early
  const contentLength = req.headers.get("content-length");
  if (contentLength && parseInt(contentLength, 10) > 50_000) {
    return NextResponse.json(
      { error: "Request body too large." },
      { status: 413 }
    );
  }

  // 3. Rate limiting
  const { success, response: rateLimitResponse } = await rateLimit(req);
  if (!success && rateLimitResponse) {
    rateLimitResponse.headers.set("Access-Control-Allow-Origin", "*");
    return rateLimitResponse;
  }

  // 4. Continue — security headers set in next.config.ts
  return NextResponse.next();
}
