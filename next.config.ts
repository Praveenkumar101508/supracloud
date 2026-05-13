import type { NextConfig } from "next";

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://supracloud.co.uk";

// ── CSP directive builder ─────────────────────────────────────────────────────
function buildCsp(): string {
  const directives: Record<string, string[]> = {
    "default-src":     ["'self'"],
    "script-src":      [
      "'self'",
      "'unsafe-inline'",           // Required by Next.js inline scripts + Tailwind
      "https://js.stripe.com",
      "https://www.googletagmanager.com",
    ],
    "style-src":       ["'self'", "'unsafe-inline'"], // Tailwind inline styles
    "img-src":         [
      "'self'",
      "data:",
      "blob:",
      "https://*.supabase.co",     // Supabase storage images only (not https:)
      "https://www.googletagmanager.com",
      "https://www.google-analytics.com",
    ],
    "font-src":        ["'self'", "data:", "https://fonts.gstatic.com"],
    "media-src":       ["'self'", "blob:"],
    "connect-src":     [
      "'self'",
      "https://*.supabase.co",
      "wss://*.supabase.co",
      "https://api.anthropic.com",
      "https://generativelanguage.googleapis.com",
      "https://oauth2.googleapis.com",
      "https://www.googleapis.com",
      "https://o*.ingest.sentry.io",
      "https://www.googletagmanager.com",
      "https://www.google-analytics.com",
      "https://region1.google-analytics.com",
    ],
    "frame-src":       [
      "https://js.stripe.com",
      "https://hooks.stripe.com",
      "https://calendly.com",
    ],
    "frame-ancestors": ["'none'"],
    "object-src":      ["'none'"],
    "base-uri":        ["'self'"],
    "form-action":     ["'self'", "https://js.stripe.com"],
    "worker-src":      ["'self'", "blob:"],           // Three.js workers
    "manifest-src":    ["'self'"],
    "child-src":       ["'self'", "blob:"],
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
    // 2 years, preload — tells browsers to HTTPS-only, prevents downgrade attacks
    value: "max-age=63072000; includeSubDomains; preload",
  },
  {
    key:   "X-Frame-Options",
    // DENY prevents clickjacking — belt-and-suspenders with CSP frame-ancestors
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
    // Explicitly deny every powerful feature; allow microphone only on self for Nova voice
    value: [
      "accelerometer=()",
      "ambient-light-sensor=()",
      "autoplay=()",
      "battery=()",
      "camera=()",
      "display-capture=()",
      "document-domain=()",
      "encrypted-media=()",
      "execution-while-not-rendered=()",
      "execution-while-out-of-viewport=()",
      "fullscreen=(self)",
      "geolocation=()",
      "gyroscope=()",
      "interest-cohort=()",
      "keyboard-map=()",
      "magnetometer=()",
      "microphone=(self)",
      "midi=()",
      "navigation-override=()",
      "payment=(self https://js.stripe.com)",
      "picture-in-picture=()",
      "publickey-credentials-get=()",
      "screen-wake-lock=()",
      "serial=()",
      "speaker-selection=()",
      "sync-xhr=()",
      "usb=()",
      "web-share=()",
      "xr-spatial-tracking=()",
    ].join(", "),
  },
  {
    key:   "X-DNS-Prefetch-Control",
    // "off" prevents information leakage via DNS timing side-channels
    value: "off",
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
  {
    // Prevent server technology fingerprinting
    key:   "X-Powered-By",
    value: "",
  },
];

const nextConfig: NextConfig = {
  // ── Security headers on all routes ────────────────────────────────────────
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: securityHeaders.filter(h => h.value !== ""), // skip empty-value entries
      },
      // Relax COEP for Stripe-framed payment pages only
      {
        source: "/api/checkout",
        headers: [
          { key: "Cross-Origin-Embedder-Policy", value: "unsafe-none" },
        ],
      },
    ];
  },

  // ── Redirects (permanent 301) ──────────────────────────────────────────────
  async redirects() {
    return [
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
