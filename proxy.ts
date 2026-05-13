/**
 * Next.js 16 Proxy — runs before every matched API request.
 * (Replaces middleware.ts per Next.js 16 convention.)
 *
 * Responsibilities:
 *   1. Block known scanner / exploit user agents
 *   2. Block malicious path patterns (traversal, injection in URL)
 *   3. Enforce hard body-size cap (prevent OOM DoS)
 *   4. Enforce application/json content-type on API mutations
 *   5. Rate limiting (per-IP, per-route)
 *   6. Strip server fingerprinting headers
 */
import { NextRequest, NextResponse } from "next/server";
import { rateLimit } from "./lib/rateLimiter";

export const config = {
  matcher: ["/api/:path*"],
};

// ── Blocked user-agent substrings ─────────────────────────────────────────────
// Scanners, exploit frameworks, and CVE probers with no legitimate use against
// a marketing/fintech site.
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
  "python-requests/0.",
  "python-requests/1.",
];

// ── Malicious path / query patterns ──────────────────────────────────────────
const BLOCKED_PATH_PATTERNS = [
  // Directory traversal
  /\.\.\//,
  // Sensitive server paths
  /\/etc\/passwd/i,
  /\/etc\/shadow/i,
  /\/proc\/self/i,
  /\/windows\/system/i,
  // WordPress/PHP probes (not relevant, block fast)
  /\.(php|asp|aspx|jsp|cgi)$/i,
  /wp-admin/i,
  /phpMyAdmin/i,
  /\.env$/i,
  // Code injection in URL
  /<script/i,
  /javascript:/i,
  /\beval\s*\(/i,
  // SQL injection fragments
  /union\s+select/i,
  /;\s*drop\s+table/i,
  /\binsert\s+into\b/i,
];

// ── Maximum Content-Length for API mutations (bytes) ──────────────────────────
const API_MAX_BODY_BYTES = 64 * 1024; // 64 KB

export async function proxy(req: NextRequest) {
  const { pathname } = new URL(req.url);
  const method = req.method.toUpperCase();
  const ua = (req.headers.get("user-agent") ?? "").toLowerCase();

  // ── 1. Block malicious user agents ──────────────────────────────────────────
  for (const fragment of BLOCKED_UA_FRAGMENTS) {
    if (ua.includes(fragment)) {
      return new NextResponse(null, { status: 403 });
    }
  }

  // ── 2. Block malicious path / injection patterns ─────────────────────────────
  const rawUrl = req.url;
  for (const pattern of BLOCKED_PATH_PATTERNS) {
    if (pattern.test(rawUrl)) {
      return new NextResponse(null, { status: 400 });
    }
  }

  // ── 3. Enforce body size cap ─────────────────────────────────────────────────
  if (["POST", "PUT", "PATCH"].includes(method)) {
    const contentLength = req.headers.get("content-length");
    if (contentLength && parseInt(contentLength, 10) > API_MAX_BODY_BYTES) {
      return NextResponse.json(
        { error: "Request body too large." },
        { status: 413 }
      );
    }
  }

  // ── 4. Enforce JSON content-type on API mutations ────────────────────────────
  // Prevents multipart/form-data body confusion attacks on JSON endpoints.
  if (["POST", "PUT", "PATCH"].includes(method)) {
    const ct = (req.headers.get("content-type") ?? "").toLowerCase();
    if (ct && !ct.includes("application/json")) {
      return NextResponse.json(
        { error: "Unsupported content type. Use application/json." },
        { status: 415 }
      );
    }
  }

  // ── 5. Rate limiting ─────────────────────────────────────────────────────────
  const { success, response: rateLimitResponse } = await rateLimit(req);
  if (!success && rateLimitResponse) {
    rateLimitResponse.headers.set("Access-Control-Allow-Origin", "*");
    return rateLimitResponse;
  }

  // ── 6. Strip server fingerprinting headers ───────────────────────────────────
  const res = NextResponse.next();
  res.headers.delete("X-Powered-By");
  res.headers.delete("Server");
  return res;
}
