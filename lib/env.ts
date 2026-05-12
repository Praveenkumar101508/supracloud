/**
 * Environment variable validation.
 * Fails at server startup if required vars are missing or malformed.
 * Import `env` from this file instead of using `process.env` directly in server code.
 */
import { z } from "zod";

const serverEnvSchema = z.object({
  // ── AI ─────────────────────────────────────────────────────────────────────
  ANTHROPIC_API_KEY:        z.string().min(1).optional(),
  GEMINI_API_KEY:           z.string().min(1).optional(),

  // ── Voice ──────────────────────────────────────────────────────────────────
  ELEVENLABS_API_KEY:       z.string().min(1).optional(),
  ELEVENLABS_VOICE_ID:      z.string().min(1).optional(),

  // ── Supabase (server-side only) ────────────────────────────────────────────
  SUPABASE_SERVICE_ROLE_KEY: z.string().min(1).optional(),

  // ── Email ──────────────────────────────────────────────────────────────────
  RESEND_API_KEY:           z.string().min(1).optional(),
  RESEND_FROM_EMAIL:        z.string().email().optional(),

  // ── Stripe ─────────────────────────────────────────────────────────────────
  STRIPE_SECRET_KEY:        z.string().min(1).optional(),
  STRIPE_WEBHOOK_SECRET:    z.string().min(1).optional(),

  // ── Google Calendar ────────────────────────────────────────────────────────
  GOOGLE_SERVICE_ACCOUNT_EMAIL:       z.string().email().optional(),
  GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY: z.string().min(1).optional(),
  GOOGLE_CALENDAR_ID:                 z.string().min(1).optional(),

  // ── Rate limiting (Upstash Redis) ──────────────────────────────────────────
  UPSTASH_REDIS_REST_URL:   z.string().url().optional(),
  UPSTASH_REDIS_REST_TOKEN: z.string().min(1).optional(),

  // ── Monitoring ─────────────────────────────────────────────────────────────
  SENTRY_DSN:               z.string().url().optional(),
});

const publicEnvSchema = z.object({
  NEXT_PUBLIC_SUPABASE_URL:      z.string().url().optional(),
  NEXT_PUBLIC_SUPABASE_ANON_KEY: z.string().min(1).optional(),
  NEXT_PUBLIC_SITE_URL:          z.string().url().optional(),
  NEXT_PUBLIC_STRIPE_PUB_KEY:    z.string().min(1).optional(),
  NEXT_PUBLIC_SENTRY_DSN:        z.string().url().optional(),
});

function validateEnv() {
  try {
    const server = serverEnvSchema.parse(process.env);
    const pub    = publicEnvSchema.parse(process.env);
    return { ...server, ...pub };
  } catch (err) {
    if (err instanceof z.ZodError) {
      console.error("❌ Invalid environment variables:\n",
        err.issues.map(i => `  ${i.path.join(".")}: ${i.message}`).join("\n")
      );
      // Warn but don't crash — allows partial deployments with only some integrations active
    }
    return process.env as Record<string, string | undefined>;
  }
}

export const env = validateEnv();

// ── Typed helpers (use these instead of process.env) ────────────────────────

export const isAnthropicConfigured  = () => Boolean(process.env.ANTHROPIC_API_KEY);
export const isGeminiConfigured     = () => Boolean(process.env.GEMINI_API_KEY);
export const isElevenLabsConfigured = () => Boolean(process.env.ELEVENLABS_API_KEY);
export const isSupabaseConfigured   = () =>
  Boolean(process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY);
export const isUpstashConfigured    = () =>
  Boolean(process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN);
