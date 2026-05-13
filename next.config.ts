import type { NextConfig } from "next";

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://supracloud.co.uk";

// ── CSP directive builder ─────────────────────────────────────────────────────
// Kept as a function so it can include a nonce in future if needed.
function buildCsp(): string {
  const directives: Record<string, string[]> = {
    "default-src":     ["'self'"],
    "script-src":      [
      "'self'",
      "'unsafe-inline'",           // Required by Next.js inline scripts
      "https://js.stripe.com",
      "https://www.googletagmanager.com",
    ],
    "style-src":       ["'self'", "'unsafe-inline'"], // Tailwind inline styles
    "img-src":         ["'self'", "data:", "blob:", "https:"],
    "font-src":        ["'self'", "data:", "https://fonts.gstatic.com"],
    "media-src":       ["'self'", "blob:"],
    "connect-src":     [
      "'self'",
      "https://*.supabase.co",
      "https://api.anthropic.com",
      "https://generativelanguage.googleapis.com",
      "https://oauth2.googleapis.com",
      "https://www.googleapis.com",
      "https://o*.ingest.sentry.io",
      "wss://*.supabase.co",
    ],
    "frame-src":       ["https://js.stripe.com", "https://calendly.com"],
    "frame-ancestors": ["'none'"],
    "object-src":      ["'none'"],
    "base-uri":        ["'self'"],
    "form-action":     ["'self'", "https://js.stripe.com"],
    "worker-src":      ["'self'", "blob:"],           // Three.js workers
    "manifest-src":    ["'self'"],
    "upgrade-insecure-requests": [],
  };

  return Object.entries(directives)
    .map(([key, vals]) =>
      vals.length === 0 ? key : `${key} ${vals.join(" ")}`
    )
    .join("; ");
}

const securityHeaders = [
  {
    key:   "Content-Security-Policy",
    value: buildCsp(),
  },
  {
    key:   "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains; preload",
  },
  {
    key:   "X-Frame-Options",
    value: "DENY",
  },
  {
    key:   "X-Content-Type-Options",
    value: "nosniff",
  },
  {
    key:   "Referrer-Policy",
    value: "strict-origin-when-cross-origin",
  },
  {
    key:   "Permissions-Policy",
    // Only allow microphone on same origin (Nova voice input), nothing else
    value: "camera=(), microphone=(self), geolocation=(), interest-cohort=()",
  },
  {
    key:   "X-DNS-Prefetch-Control",
    value: "on",
  },
  {
    key:   "X-XSS-Protection",
    value: "1; mode=block",
  },
  {
    key:   "Cross-Origin-Embedder-Policy",
    value: "require-corp",
  },
  {
    key:   "Cross-Origin-Opener-Policy",
    value: "same-origin",
  },
  {
    key:   "Cross-Origin-Resource-Policy",
    value: "same-origin",
  },
];

const nextConfig: NextConfig = {
  // ── Security headers on all routes ────────────────────────────────────────
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: securityHeaders,
      },
    ];
  },

  // ── Redirects (permanent 301) ──────────────────────────────────────────────
  async redirects() {
    return [
      // Legacy B2C URLs → canonical B2B URLs
      { source: "/solutions/supermarket",  destination: "/solutions/retail",   permanent: true },
      { source: "/services/it-staffing",   destination: "/services/staffing",  permanent: true },
      { source: "/careers/internships",    destination: "/talent/internships", permanent: true },
      { source: "/careers/training",       destination: "/talent/programs",    permanent: true },
      { source: "/internships",            destination: "/talent/internships", permanent: true },
      { source: "/programs",               destination: "/talent/programs",    permanent: true },
      { source: "/it-services",            destination: "/services/staffing",  permanent: true },
      { source: "/ai-agents",              destination: "/solutions/banking",  permanent: true },
    ];
  },

  // ── Image optimization ────────────────────────────────────────────────────
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      { protocol: "https", hostname: "**.supabase.co" },
    ],
  },

  // ── Turbopack (Next.js 16 default bundler) ───────────────────────────────
  turbopack: {},
};

export default nextConfig;
