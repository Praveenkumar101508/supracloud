# SupraCloud Security Policy

**Last updated:** May 2026
**Platform:** supracloud.co.uk
**Classification:** Public
**Audience:** Enterprise / fintech / regulated-industry clients

---

## Reporting a Vulnerability

| Channel | Details |
|---------|---------|
| **Security email** | security@supracloud.co.uk |
| **Initial response SLA** | 24 hours |
| **Fix timeline communication** | 72 hours |
| **Coordinated disclosure** | We ask that you do not publish until we have confirmed a fix |

We do not operate a formal bug bounty programme at this time, but we recognise and appreciate responsible disclosures.

---

## Architecture Overview

```
Browser (client)
    │
    │  HTTPS only (HSTS preloaded, max-age=2yr)
    ▼
Next.js Edge Middleware (scanner blocking, body-size limits, UA filtering)
    │
    ▼
Next.js API Routes (rate limiting per IP, Zod validation, injection detection, sanitisation)
    │
    ├── Anthropic Claude API  (server-side only, never in browser)
    ├── Google Gemini API     (fallback, server-side only)
    ├── Supabase              (service_role key — server-side only)
    ├── Resend / Email        (server-side only)
    ├── Stripe                (secret key — server-side only)
    └── Google Calendar API   (service account — server-side only)
```

**The browser never directly calls:**
- Any AI API (Anthropic, Gemini)
- Supabase with the service_role key
- Stripe with the secret key
- Any third-party API containing secrets

All secrets live exclusively in server-side environment variables.

---

## Security Controls

### 1. Edge Middleware (`middleware.ts`)

Applied **before every request** — even before route handlers:

| Check | Detail |
|-------|--------|
| Scanner / exploit UA blocking | SQLMap, Nikto, Masscan, Nessus, Nuclei, Burp Suite, Hydra, Metasploit, and 15+ others blocked with 403 |
| Path traversal detection | `../`, `/etc/passwd`, `union select`, `eval(`, `<script`, and more — 400 |
| Body size enforcement | 64 KB hard cap on POST/PUT/PATCH to all `/api/*` routes — 413 |
| Content-type enforcement | Only `application/json` accepted on API routes — 415 |
| Server fingerprint removal | `X-Powered-By` and `Server` headers stripped |

### 2. Rate Limiting (`lib/rateLimiter.ts`)

In-memory sliding-window rate limiter, applied in **every** API route handler:

| Endpoint | Limit (req/min/IP) |
|----------|--------------------|
| `/api/agent/respond` | 20 |
| `/api/agent/speak` | 15 |
| `/api/agent/lead` | 5 |
| `/api/agent/knowledge` | 30 |
| `/api/contact` | 5 |
| `/api/apply` | 5 |
| `/api/book` | 10 |
| `/api/booking` | 10 |
| `/api/checkout` | 10 |
| `/api/nova/session` | 60 |
| `/api/nova/feedback` | 20 |
| Default (all others) | 60 |

429 responses include `Retry-After`, `X-RateLimit-Limit`, `X-RateLimit-Remaining`, and `X-RateLimit-Reset` headers.

### 3. Input Validation

All API routes use **Zod schemas** with strict field-level validation:
- String fields have explicit `max()` byte limits
- Email fields validated with `z.string().email()`
- Enum fields use `z.enum()` — prevents arbitrary string injection
- Unknown/extra fields are stripped
- HTML tags stripped via `sanitiseText()` before storage or AI processing

### 4. Prompt Injection & Jailbreak Protection (`lib/sanitize.ts`)

Applied to all Nova AI input through a multi-layer pipeline:

**Pre-processing — 40+ regex patterns detecting:**
- Instruction override (`ignore previous instructions`, `disregard all rules`)
- Role reassignment (`you are now`, `pretend to be`, `act as`, `impersonate`)
- System prompt extraction (`reveal your prompt`, `repeat the above`, `show instructions`)
- Format injection (`[INST]`, `<<SYS>>`, `<|im_start|>`, `###instruction`)
- Jailbreak patterns (DAN, AIM, STAN, developer mode, evil mode)
- Indirect injection (`the following is a new instruction`)
- Template injection (`${...}`, `{{...}}`)

**Fintech-specific — regulatory sensitivity patterns:**
- Account numbers, sort codes, PINs, card numbers, SSNs detected
- Redirected to human team with no data echoed back

**System prompt hardening:**
- Explicit identity anchoring (name/role cannot be changed by user input)
- Sections for IMMUTABLE IDENTITY, FINANCIAL & REGULATORY DATA, and RESPONSE RULES
- Falls back to human team redirect for all ambiguous cases

**Output validation:**
- AI responses checked before delivery
- System prompt leakage patterns blocked
- PAN-like number patterns blocked in output
- Hard 3,000-character cap on all responses

### 5. Security Headers (`next.config.ts`)

Applied to every route:

| Header | Value / Effect |
|--------|---------------|
| `Content-Security-Policy` | Restricts scripts, connections, frames to known-safe origins; `upgrade-insecure-requests` |
| `Strict-Transport-Security` | `max-age=63072000; includeSubDomains; preload` (2 years) |
| `X-Frame-Options` | `DENY` — prevents clickjacking |
| `X-Content-Type-Options` | `nosniff` |
| `Referrer-Policy` | `strict-origin-when-cross-origin` |
| `Permissions-Policy` | 25 browser features explicitly denied; only `microphone=(self)` and `payment=(self stripe)` allowed |
| `X-DNS-Prefetch-Control` | `off` — prevents DNS timing side-channels |
| `X-XSS-Protection` | `1; mode=block` |
| `Cross-Origin-Embedder-Policy` | `require-corp` |
| `Cross-Origin-Opener-Policy` | `same-origin` |
| `Cross-Origin-Resource-Policy` | `same-origin` |

Verify at: [securityheaders.com/?q=supracloud.co.uk](https://securityheaders.com/?q=supracloud.co.uk)

### 6. Database Security (Supabase)

**Migration 001 — Base RLS:**
- Row Level Security (RLS) enabled on ALL Nova tables
- `service_role_only` policy: `auth.role() = 'service_role'`
- Anonymous key has **zero access** to Nova tables

**Migration 002 — Belt-and-Suspenders RLS:**
- `RESTRICTIVE` DENY policies for `anon` AND `authenticated` roles on all tables
- Even if the permissive policy is removed, explicit deny remains
- `match_nova_knowledge` RPC: EXECUTE revoked from `PUBLIC`, `anon`, `authenticated`
- `CREATE ON SCHEMA public` revoked from `PUBLIC` role
- Per-session message cap trigger: prevents runaway insert attacks (max 1,000 messages/session)

**Data retention functions (call via pg_cron):**
- `purge_old_nova_messages()` — deletes messages >90 days
- `purge_old_audit_logs()` — deletes audit entries >30 days
- `purge_orphaned_sessions()` — removes inactive sessions >7 days with no messages or leads

Tables protected: `nova_sessions`, `nova_messages`, `nova_feedback`, `nova_leads`, `nova_knowledge`, `audit_log`

### 7. Secret Management

- All secrets in environment variables (never in code or git)
- `.env.local` is git-ignored
- Validated at startup via `lib/env.ts` (Zod schema — warns on missing or malformed vars)
- Production secrets managed in Vercel environment variables dashboard
- `IP_HASH_SALT` must be set in production (random 32+ char string)
- Stripe price IDs validated to prevent `PLACEHOLDER` values reaching Stripe API

### 8. Audit Logging

The `audit_log` Supabase table records:
- Nova lead captures (with lead score, company — no PII beyond what was submitted)
- Blocked injection attempts (reason + hashed IP)
- All IPs are one-way hashed (SHA-256 + `IP_HASH_SALT`) — not reversible

### 9. Email / HTML Injection Prevention

All API routes that send HTML emails (`/api/apply`, `/api/book`, `/api/contact`) now:
- Validate input through Zod schemas before any processing
- Pass free-text through `sanitiseText()` (strip HTML, truncate)
- Escape **all** dynamic values with `esc()` before HTML template interpolation
- Use enum validation for categorical fields (role, inquiry type) — no arbitrary strings reach email body

---

## Data Handling

### What Nova Stores

| Data | Storage location | Retention |
|------|-----------------|-----------|
| Visitor name | `nova_sessions.visitor_name` | 7 days (orphaned session purge) |
| Conversation turns | `nova_messages` | 90 days |
| Message feedback | `nova_feedback` | Indefinite (model improvement) |
| Lead data | `nova_leads` | CRM retention policy |
| IP hashes | `audit_log` | 30 days |

### What Nova Does NOT Store

- Full IP addresses (only one-way hashed with salt)
- Passwords or authentication tokens
- Payment card data (Stripe handles PCI-DSS, data never touches our servers)
- Voice audio recordings
- Sensitive financial data (account numbers, sort codes — blocked at input validation)

### Data Isolation for Enterprise / Fintech Clients

This page describes security for `supracloud.co.uk` — a **marketing and sales platform only**.

**Production AI agents deployed for banking/fintech clients operate exclusively within the client's own cloud tenant (AWS or Azure).** Client production data never flows through SupraCloud's infrastructure. Each engagement comes with a Data Processing Agreement (DPA) and the relevant DPIA.

---

## Dependency Security

- `npm audit` run before every release
- Dependabot alerts monitored via GitHub
- No `eval()`, `innerHTML`, or `dangerouslySetInnerHTML` in application code
- Third-party scripts (Stripe, GTM) restricted to CSP-allowlisted origins only

---

## Incident Response

| Step | Action |
|------|--------|
| 1. Detect | Sentry errors + `audit_log` anomaly queries |
| 2. Contain | Rotate affected API keys immediately via Vercel dashboard |
| 3. Assess | Review audit log, Sentry traces, Supabase logs |
| 4. Notify | Inform affected users within 72 hours if personal data involved (GDPR Art. 33/34) |
| 5. Remediate | Deploy fix, rotate all secrets, verify headers with securityheaders.com |
| 6. Review | Post-incident review within 5 business days |

**Emergency contact:** security@supracloud.co.uk
**GDPR DPO:** dpo@supracloud.co.uk

---

## Compliance Posture

| Standard | Status |
|----------|--------|
| **GDPR** | Privacy-by-design; minimal data collection; DPA available; IP hashing |
| **FCA SYSC** | Data isolation architecture for regulated client deployments |
| **ISO 27001** | Controls-aligned (not certified) |
| **SOC 2 Type II** | Controls-aligned; audit in progress |
| **OWASP Top 10** | A01 Broken Access Control: RLS + DENY policies; A02 Cryptographic Failures: HSTS + TLS; A03 Injection: Zod + sanitization + 40+ patterns; A05 Security Misconfiguration: middleware + headers; A06 Vulnerable Components: npm audit; A07 Auth Failures: service_role only; A09 Logging Failures: audit_log |
| **PCI-DSS** | Card data never touches SupraCloud servers; Stripe handles all card processing |

---

## Go-Live Security Checklist

Run this checklist before every production deployment:

### Environment Variables
- [ ] `ANTHROPIC_API_KEY` set and valid (starts with `sk-ant-`)
- [ ] `SUPABASE_SERVICE_ROLE_KEY` set (never exposed to browser)
- [ ] `NEXT_PUBLIC_SUPABASE_ANON_KEY` set — confirm it has **zero** access to Nova tables
- [ ] `RESEND_API_KEY` set (starts with `re_`)
- [ ] `IP_HASH_SALT` set — random 32+ character string, unique per environment
- [ ] `STRIPE_SECRET_KEY` set (starts with `sk_live_` in production)
- [ ] `STRIPE_WEBHOOK_SECRET` set (starts with `whsec_`)
- [ ] All `STRIPE_PRICE_*` IDs set to live Stripe price IDs (no `PLACEHOLDER`)
- [ ] `NEXT_PUBLIC_SITE_URL` set to `https://supracloud.co.uk`

### Database
- [ ] Migration 001 applied — RLS enabled on all tables
- [ ] Migration 002 applied — RESTRICTIVE DENY policies in place
- [ ] Verify with: `SELECT tablename, rowsecurity FROM pg_tables WHERE tablename LIKE 'nova_%' OR tablename = 'audit_log';` — all should show `rowsecurity = true`
- [ ] Verify DENY policies with: `SELECT * FROM pg_policies WHERE schemaname = 'public' ORDER BY tablename;`
- [ ] Test: attempt to query `nova_leads` with the anon key — should return 0 rows or error
- [ ] pg_cron jobs scheduled for `purge_old_nova_messages()`, `purge_old_audit_logs()`, `purge_orphaned_sessions()`

### Headers & CSP
- [ ] Run [securityheaders.com](https://securityheaders.com/?q=supracloud.co.uk) — expect A or A+ rating
- [ ] Confirm `X-Frame-Options: DENY` in response headers
- [ ] Confirm `Strict-Transport-Security` with `preload` directive
- [ ] Confirm CSP does not contain `unsafe-eval`

### API Routes
- [ ] Every route returns 429 when rate limit is exceeded (test with curl loop)
- [ ] `/api/agent/respond` blocks `ignore previous instructions` — returns safe response, not 500
- [ ] `/api/apply` rejects missing required fields with 400
- [ ] `/api/book` rejects invalid `inquiryType` values with 400
- [ ] `/api/checkout` returns 503 if `STRIPE_SECRET_KEY` not set

### Secrets & Logs
- [ ] No API keys or secrets appear in git history: `git log --all --oneline | xargs git show | grep -E 'sk_|re_|whsec_|eyJ'`
- [ ] No sensitive data in server logs (`console.error` calls never log user content)
- [ ] Sentry DSN configured and receiving errors in staging

### Third-Party
- [ ] Stripe webhook endpoint registered in Stripe dashboard pointing to `/api/checkout`
- [ ] Stripe webhook secret matches `STRIPE_WEBHOOK_SECRET`

---

*This document is reviewed after every significant security change and quarterly at minimum.*
*Last security hardening: May 2026 — RLS RESTRICTIVE policies, edge middleware, 40+ injection patterns, HTML email escaping, rate limiting wired to all routes.*
