# SupraCloud — Deployment & Go-Live Checklist

## Quick Deploy (Vercel)

```bash
git push origin main   # Vercel auto-deploys on push
```

All environment variables must be set in Vercel Dashboard → Project → Settings → Environment Variables **before** the build runs.

---

## Pre-Launch Checklist

### 1. Environment Variables

- [ ] `NEXT_PUBLIC_SITE_URL` set to production URL (`https://supracloud.co.uk`)
- [ ] `NEXT_PUBLIC_SUPABASE_URL` + `SUPABASE_SERVICE_ROLE_KEY` set
- [ ] `RESEND_API_KEY` + `RESEND_FROM_EMAIL` set and verified in Resend dashboard
- [ ] `MEET_LINK` set to a valid Google Meet fallback URL
- [ ] `ANTHROPIC_API_KEY` set (Nova intelligence)
- [ ] `ELEVENLABS_API_KEY` + `ELEVENLABS_VOICE_ID` set (or accepted as fallback to browser TTS)
- [ ] `STRIPE_SECRET_KEY` + all three `STRIPE_PRICE_*` IDs set
- [ ] Google OAuth credentials set (`GOOGLE_CLIENT_ID`, `GOOGLE_CLIENT_SECRET`, `GOOGLE_REFRESH_TOKEN`)
- [ ] `GOOGLE_CALENDAR_ID` set to booking calendar
- [ ] `LEAD_TO_EMAIL` set to receive lead notifications
- [ ] `NEXT_PUBLIC_POSTHOG_KEY` set (or analytics section removed)

### 2. Supabase

- [ ] `nova_sessions` table exists (see schema below)
- [ ] `nova_leads` table exists
- [ ] Row Level Security (RLS) enabled on both tables
- [ ] Service role key is **server-side only** — never exposed to client

```sql
-- nova_sessions: persists conversation context across page visits
CREATE TABLE nova_sessions (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id  TEXT NOT NULL,
  visitor_name TEXT,
  messages    JSONB DEFAULT '[]',
  created_at  TIMESTAMPTZ DEFAULT now(),
  updated_at  TIMESTAMPTZ DEFAULT now()
);

-- nova_leads: qualified leads captured by Nova
CREATE TABLE nova_leads (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name        TEXT,
  company     TEXT,
  email       TEXT,
  phone       TEXT,
  use_case    TEXT,
  budget      TEXT,
  timeline    TEXT,
  score       INT DEFAULT 0,
  created_at  TIMESTAMPTZ DEFAULT now()
);
```

### 3. DNS & Domain

- [ ] `supracloud.co.uk` A / CNAME records pointing to Vercel
- [ ] `www.supracloud.co.uk` redirect to apex (Vercel handles this)
- [ ] SSL certificate auto-provisioned by Vercel (check green padlock)

### 4. Stripe

- [ ] Products and Prices created in Stripe Dashboard
- [ ] Webhook endpoint configured: `https://supracloud.co.uk/api/stripe/webhook`
- [ ] Webhook secret added to env vars
- [ ] Test mode used for staging, Live mode for production

### 5. Google Calendar

- [ ] Service account created in Google Cloud Console
- [ ] Calendar API enabled
- [ ] Service account added to calendar with "Make changes to events" permission
- [ ] `GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY` formatted correctly (newlines as `\n`)

### 6. Email (Resend)

- [ ] `supracloud.co.uk` domain verified in Resend
- [ ] SPF and DKIM records added to DNS
- [ ] Test booking flow end-to-end — confirm email arrives in inbox

### 7. Analytics

- [ ] PostHog project created; key added to env
- [ ] Verify events firing in PostHog Live view after first visit

---

## Build Verification

```bash
npm run build          # must complete with 0 errors
npx tsc --noEmit       # TypeScript — pre-existing test errors only, no app errors
```

Expected build output: all routes green, no missing env var warnings.

---

## Post-Deploy Smoke Tests

Run these manually after every production deploy:

| Test | Expected |
|---|---|
| Homepage loads | NovaSphere, typewriter, CTAs visible |
| "Try Nova Now" button | Nova widget opens |
| Nova voice response | Audio plays (or browser TTS fallback) |
| `/book` form submit | Calendar event created, confirmation email sent |
| `/solutions/banking` | Transcript animation plays |
| `/solutions/retail` | Transcript animation plays |
| `/pricing` | Stripe checkout initiates |
| `/contact` form | Email received at `LEAD_TO_EMAIL` |
| Rate limiting | 10+ rapid `/api/agent` calls → 429 returned |
| Mobile (375px) | All sections render without horizontal scroll |

---

## Rollback

Vercel keeps the last 20 deployments. To rollback:

1. Vercel Dashboard → Deployments
2. Find the last known-good deployment
3. Click **Promote to Production**

No git revert needed.

---

## Performance Targets

| Metric | Target |
|---|---|
| LCP (Largest Contentful Paint) | < 2.5 s |
| CLS (Cumulative Layout Shift) | < 0.1 |
| FID / INP | < 200 ms |
| Nova first response | < 1.5 s (local KB) / < 3 s (Claude) |

Run Lighthouse against production after deploy. 3D components (NeuralBackground, NovaSphere) are lazy-loaded — they do not affect LCP.

---

## Monitoring

- **Vercel Analytics** — real-time traffic, error rates, Web Vitals
- **PostHog** — funnel analysis, Nova interaction events, booking conversions
- **Resend** — email delivery logs
- **Supabase** — query performance, RLS violations in logs
- **Stripe** — payment success/failure rates

---

## Security Notes

- `middleware.ts` blocks scanner UAs (sqlmap, nikto), path traversal, oversized bodies, and rate-limits all `/api/*` routes
- No secret keys are exposed to the client — all `STRIPE_SECRET_KEY`, `SUPABASE_SERVICE_ROLE_KEY`, `ANTHROPIC_API_KEY` are server-side only
- Nova sessions are scoped to an anonymous session ID — no PII stored without explicit consent
- FCA audit trail is append-only in Supabase with RLS
