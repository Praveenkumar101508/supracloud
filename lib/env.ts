/**
 * Environment variable validation.
 * Fails loudly at startup if required vars are missing or malformed.
 * Import `env` from this file instead of using `process.env` directly in server code.
 *
 * Security note: this module must only be imported in server-side code.
 * Never import it in client components — Next.js will tree-shake correctly
 * but the schema itself documents what must stay server-side.
 */
import { z } from "zod";

const serverEnvSchema = z.object({
  // ── AI (at least one must be present for Nova to function) ────────────────
  ANTHROPIC_API_KEY: z.string().min(10).optional(),
  GEMINI_API_KEY:    z.string().min(10).optional(),

  // ── Supabase (server-side only — NEVER expose service_role to browser) ────
  SUPABASE_SERVICE_ROLE_KEY: z.string().min(20).optional(),

  // ── Email ─────────────────────────────────────────────────────────────────
  RESEND_API_KEY:           z.string().startsWith("re_").optional(),
  RESEND_FROM_EMAIL:        z.string().email().optional(),
  EMAIL_SERVICE_API_KEY:    z.string().min(10).optional(),

  // ── Stripe ────────────────────────────────────────────────────────────────
  STRIPE_SECRET_KEY:        z.string().startsWith("sk_").optional(),
  STRIPE_WEBHOOK_SECRET:    z.string().startsWith("whsec_").optional(),
  STRIPE_PRICE_FOUNDATION:          z.string().startsWith("price_").optional(),
  STRIPE_PRICE_APPLICATION_ENGINE:  z.string().startsWith("price_").optional(),
  STRIPE_PRICE_FULL_ACCELERATOR:    z.string().startsWith("price_").optional(),

  // ── Google Calendar ────────────────────────────────────────────────────────
  GOOGLE_CLIENT_ID:                   z.string().min(10).optional(),
  GOOGLE_CLIENT_SECRET:               z.string().min(10).optional(),
  GOOGLE_REFRESH_TOKEN:               z.string().min(10).optional(),
  GOOGLE_SERVICE_ACCOUNT_EMAIL:       z.string().email().optional(),
  GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY: z.string().min(1).optional(),
  GOOGLE_CALENDAR_ID:                 z.string().min(1).optional(),

  // ── Monitoring ────────────────────────────────────────────────────────────
  SENTRY_DSN: z.string().url().optional(),

  // ── Security ──────────────────────────────────────────────────────────────
  // Must be set in production. Random 32+ char string.
  // Used to salt IP hashes so they are not reversible without the salt.
  IP_HASH_SALT: z.string().min(16).optional(),
});

const publicEnvSchema = z.object({
  NEXT_PUBLIC_SUPABASE_URL:      z.string().url().optional(),
  // anon key: legitimate for real-time subscriptions with RLS; NEVER for sensitive data
  NEXT_PUBLIC_SUPABASE_ANON_KEY: z.string().min(20).optional(),
  NEXT_PUBLIC_SITE_URL:          z.string().url().optional(),
  NEXT_PUBLIC_STRIPE_PUB_KEY:    z.string().startsWith("pk_").optional(),
  NEXT_PUBLIC_SENTRY_DSN:        z.string().url().optional(),
});

type EnvResult = z.infer<typeof serverEnvSchema> & z.infer<typeof publicEnvSchema>;

function validateEnv(): EnvResult {
  const serverResult = serverEnvSchema.safeParse(process.env);
  const pubResult    = publicEnvSchema.safeParse(process.env);

  const issues: string[] = [];

  if (!serverResult.success) {
    for (const issue of serverResult.error.issues) {
      issues.push(`  ${issue.path.join(".")}: ${issue.message}`);
    }
  }
  if (!pubResult.success) {
    for (const issue of pubResult.error.issues) {
      issues.push(`  ${issue.path.join(".")}: ${issue.message}`);
    }
  }

  if (issues.length > 0) {
    // Log clearly but don't crash — allows partial deployments (e.g. Stripe disabled)
    console.warn("⚠️  Environment variable validation warnings:\n" + issues.join("\n"));
  }

  // Warn about missing IP_HASH_SALT in production
  if (process.env.NODE_ENV === "production" && !process.env.IP_HASH_SALT) {
    console.warn("⚠️  IP_HASH_SALT is not set in production. Audit log IP hashes are using the default salt and may be less secure.");
  }

  // Warn if SUPABASE_SERVICE_ROLE_KEY is missing but Supabase URL is present
  if (process.env.NEXT_PUBLIC_SUPABASE_URL && !process.env.SUPABASE_SERVICE_ROLE_KEY) {
    console.warn("⚠️  NEXT_PUBLIC_SUPABASE_URL is set but SUPABASE_SERVICE_ROLE_KEY is missing. Database writes will fail silently.");
  }

  return {
    ...(serverResult.success ? serverResult.data : {}),
    ...(pubResult.success ? pubResult.data : {}),
  } as EnvResult;
}

export const env = validateEnv();

// ── Typed helpers (use these instead of process.env) ────────────────────────

export const isAnthropicConfigured = () => Boolean(process.env.ANTHROPIC_API_KEY);
export const isGeminiConfigured    = () => Boolean(process.env.GEMINI_API_KEY);
export const isSupabaseConfigured  = () =>
  Boolean(process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY);
export const isStripeConfigured    = () => Boolean(process.env.STRIPE_SECRET_KEY);
export const isEmailConfigured     = () =>
  Boolean(process.env.EMAIL_SERVICE_API_KEY || process.env.RESEND_API_KEY);
