/**
 * Next.js Edge Middleware — global security gate.
 *
 * Runs before EVERY request (pages + API routes).
 * Responsibilities:
 *   1. Block known scanner / attack user agents
 *   2. Enforce a hard body-size limit on API routes (prevent OOM DoS)
 *   3. Block obviously malicious path traversal attempts
 *   4. Add security headers that must exist even before route handlers fire
 *   5. Reject oversized Content-Length headers on API routes
 */

import { NextRequest, NextResponse } from "next/server";

// ── Blocked user-agent substrings ─────────────────────────────────────────────
// Scanners, exploit frameworks, and CVE probers that have no legitimate use
// against a marketing/fintech site.
const BLOCKED_UA_FRAGMENTS = [
  "sqlmap",
  "nikto",
  "nessus",
  "masscan",
  "zgrab",
  "nuclei",
  "nmap",
  "acunetix",
  "burpsuite",
  "dirbuster",
  "gobuster",
  "wfuzz",
  "hydra",
  "metasploit",
  "openvas",
  "w3af",
  "skipfish",
  "appscan",
  "webinspect",
  "havij",
  "pangolin",
];

// ── Path traversal / injection in URL ─────────────────────────────────────────
const MALICIOUS_PATH_PATTERNS = [
  /\.\.\//,           // directory traversal
  /\/etc\/passwd/i,
  /\/etc\/shadow/i,
  /\/proc\/self/i,
  /\/windows\/system/i,
  /<script/i,
  /javascript:/i,
  /\beval\(/i,
  /union\s+select/i,  // SQLi
  /\bexec\s*\(/i,
  /\binsert\s+into/i,
  /;\s*drop\s+table/i,
];

// ── Maximum Content-Length for API routes (bytes) ─────────────────────────────
const API_MAX_BODY_BYTES = 64 * 1024; // 64 KB — more than enough for any form

function isApiRoute(pathname: string): boolean {
  return pathname.startsWith("/api/");
}

export function middleware(req: NextRequest): NextResponse {
  const { pathname } = req.nextUrl;
  const ua = (req.headers.get("user-agent") ?? "").toLowerCase();
  const method = req.method.toUpperCase();

  // ── 1. Block malicious user agents ──────────────────────────────────────────
  for (const fragment of BLOCKED_UA_FRAGMENTS) {
    if (ua.includes(fragment)) {
      return new NextResponse(null, { status: 403 });
    }
  }

  // ── 2. Block malicious path patterns ────────────────────────────────────────
  const rawUrl = req.url;
  for (const pattern of MALICIOUS_PATH_PATTERNS) {
    if (pattern.test(rawUrl)) {
      return new NextResponse(null, { status: 400 });
    }
  }

  // ── 3. Enforce body size on API routes ──────────────────────────────────────
  if (isApiRoute(pathname) && ["POST", "PUT", "PATCH"].includes(method)) {
    const contentLength = req.headers.get("content-length");
    if (contentLength && parseInt(contentLength, 10) > API_MAX_BODY_BYTES) {
      return NextResponse.json(
        { error: "Request body too large." },
        { status: 413 }
      );
    }
  }

  // ── 4. Reject non-JSON content-type on API POST routes ──────────────────────
  // Prevents multipart/form-data body confusion attacks on JSON endpoints.
  // Exempt: /api/booking/slots (GET-only), static assets.
  if (isApiRoute(pathname) && ["POST", "PUT", "PATCH"].includes(method)) {
    const ct = (req.headers.get("content-type") ?? "").toLowerCase();
    if (ct && !ct.includes("application/json") && !ct.includes("multipart/form-data")) {
      return NextResponse.json(
        { error: "Unsupported content type." },
        { status: 415 }
      );
    }
  }

  // ── 5. Add security response headers ────────────────────────────────────────
  const res = NextResponse.next();

  // Belt-and-suspenders headers (also set in next.config.ts, but edge headers
  // fire earlier and cover middleware-rejected responses too).
  res.headers.set("X-Content-Type-Options", "nosniff");
  res.headers.set("X-Frame-Options", "DENY");
  res.headers.set("X-XSS-Protection", "1; mode=block");

  // Prevent server fingerprinting
  res.headers.delete("X-Powered-By");
  res.headers.delete("Server");

  return res;
}

// Matcher: run on everything except static files and Next.js internals.
export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon\\.ico|icons/|images/|fonts/).*)",
  ],
};
