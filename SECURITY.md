# SupraCloud Security Policy

**Last updated:** May 2026  
**Platform:** supracloud.co.uk  
**Classification:** Public

---

## Reporting a Vulnerability

If you discover a security vulnerability in SupraCloud's platform, please disclose it responsibly:

**Email:** security@supracloud.co.uk  
**Response SLA:** Initial acknowledgement within 24 hours. Fix timeline communicated within 72 hours.  
**Please do not:** publicly disclose the vulnerability before we have had the opportunity to address it.

We do not operate a formal bug bounty programme at this time, but we recognise and appreciate responsible disclosures.

---

## Architecture Overview

```
Browser (client)
    │
    │  HTTPS only (HSTS preloaded)
    ▼
Next.js Edge Middleware (rate limiting, scanner blocking, body size limit)
    │
    ▼
Next.js API Routes (Zod validation, injection detection, sanitisation)
    │
    ├── Anthropic Claude API  (claude-sonnet-4-6, server-side only)
    ├── ElevenLabs TTS API    (server-side only)
    ├── Supabase (service_role key — server-side only, never exposed to browser)
    ├── Resend (email — server-side only)
    ├── Stripe (secret key — server-side only)
    └── Google Calendar API   (service account — server-side only)
```

**The browser (client) never directly calls:**
- AI APIs (Anthropic, Gemini, ElevenLabs)
- Supabase with the service_role key
- Stripe with the secret key
- Any third-party API containing secrets

All secrets live exclusively in server-side environment variables.

---

## Security Controls

### 1. Rate Limiting
- **Production:** Upstash Redis sliding-window rate limiting at the Edge Middleware layer
- **Development:** In-memory Map-based fallback
- **Per-endpoint limits** (requests/minute/IP):
  - `/api/agent/respond` → 20 req/min
  - `/api/agent/speak` → 15 req/min
  - `/api/agent/lead` → 5 req/min
  - `/api/contact` → 5 req/min
  - `/api/book` → 10 req/min
  - `/api/checkout` → 10 req/min
- 429 responses include `Retry-After` header

### 2. Input Validation
- **All API routes** use Zod schemas with strict field-level validation
- String fields have explicit `max()` limits (names: 100, messages: 2000, etc.)
- `z.string().email()` for all email inputs
- Unknown/extra fields are stripped (`.strip()`)
- HTML tags stripped from all free-text inputs before storage or AI processing

### 3. Prompt Injection & Jailbreak Protection
Applied to all user input sent to Nova (Claude) in `lib/sanitize.ts`:
- **Pre-processing:** Pattern-based detection of 15+ known injection techniques
  - Instruction override attempts (`ignore previous instructions`)
  - Role-reassignment attempts (`you are now`, `pretend to be`)
  - System prompt probing (`reveal your system prompt`)
  - Template injection (`${...}`, `{{...}}`)
  - Malicious user agents (SQLMap, Nikto, etc.)
- **System prompt hardening:** Explicit identity anchoring prevents Nova from accepting new instructions from user messages
- **Output validation:** Model responses are checked before delivery; suspicious outputs trigger fallback responses
- **Anomaly logging:** Blocked injection attempts logged to `audit_log` table with hashed IP

### 4. Security Headers
Applied to all routes via `next.config.ts`:

| Header | Value |
|--------|-------|
| `Content-Security-Policy` | Restricts scripts, connections, frames to known-safe origins only |
| `Strict-Transport-Security` | `max-age=63072000; includeSubDomains; preload` |
| `X-Frame-Options` | `DENY` — prevents clickjacking |
| `X-Content-Type-Options` | `nosniff` |
| `Referrer-Policy` | `strict-origin-when-cross-origin` |
| `Permissions-Policy` | Allows `microphone=(self)` only — all other APIs denied |
| `Cross-Origin-Embedder-Policy` | `require-corp` |
| `Cross-Origin-Opener-Policy` | `same-origin` |

Verify at: [securityheaders.com](https://securityheaders.com/?q=supracloud.co.uk)

### 5. Database Security (Supabase)
- **Row Level Security (RLS)** enabled on ALL Nova tables
- **Policy:** `auth.role() = 'service_role'` — only server-side API routes (using `SUPABASE_SERVICE_ROLE_KEY`) can read or write
- **Anonymous key** (`NEXT_PUBLIC_SUPABASE_ANON_KEY`) has **zero access** to Nova tables
- Tables: `nova_sessions`, `nova_messages`, `nova_feedback`, `nova_leads`, `nova_knowledge`, `audit_log`
- Migration file: `supabase/migrations/001_nova_tables_and_rls.sql`

### 6. Secret Management
- All secrets stored as environment variables (never in code or git)
- `.env.local` is git-ignored
- Validated at startup via `lib/env.ts` (Zod schema — warns on missing vars)
- Production secrets managed in Vercel environment variables dashboard
- **Key rotation:** Rotate all API keys if a deployment is compromised

### 7. Audit Logging
The `audit_log` Supabase table records:
- Nova lead captures (with lead score, no PII)
- Blocked injection attempts (with hashed IP — not reversible)
- All IPs are one-way hashed (SHA-256 + salt) before storage

---

## Data Handling

### What Nova Stores
| Data | Storage | Retention |
|------|---------|-----------|
| Visitor name | `nova_sessions.visitor_name` | Until session cleanup |
| Conversation turns | `nova_messages` | 90 days (manual cleanup recommended) |
| Message feedback | `nova_feedback` | Indefinite (for model improvement) |
| Lead data | `nova_leads` | CRM retention policy |
| IP hashes | `audit_log` | 30 days |

### What Nova Does NOT Store
- Full IP addresses (only one-way hashed)
- Passwords or authentication tokens
- Payment card data (handled exclusively by Stripe — PCI-DSS compliant)
- Voice audio (ElevenLabs returns audio; we don't store recordings)

### Data Isolation for Enterprise Clients
- SupraCloud's public platform (supracloud.co.uk) is a **marketing and sales tool only**
- **Production AI agents** built for banking/retail clients are deployed exclusively within the **client's own cloud tenant** (AWS or Azure)
- Client data never flows through SupraCloud's infrastructure
- This page describes only supracloud.co.uk platform security

---

## Dependency Security

- Dependencies reviewed with `npm audit` before every release
- Dependabot alerts monitored via GitHub
- No use of `eval()`, `innerHTML`, or `dangerouslySetInnerHTML` in application code
- Third-party scripts (Stripe, PostHog) included only via CSP-allowlisted origins

---

## Incident Response

| Step | Action |
|------|--------|
| 1. Detect | Monitoring via Sentry + audit_log anomalies |
| 2. Contain | Rotate affected API keys immediately |
| 3. Assess | Determine data accessed and scope |
| 4. Notify | Inform affected users within 72 hours if personal data involved (GDPR Art. 33/34) |
| 5. Remediate | Deploy fix, rotate all secrets, verify headers |
| 6. Review | Post-incident review within 5 business days |

**Emergency contact:** security@supracloud.co.uk  
**GDPR DPO:** dpo@supracloud.co.uk

---

## Compliance Posture

| Standard | Status |
|----------|--------|
| **GDPR** | Privacy-by-design architecture; minimal data collection; DPA available |
| **FCA SYSC** | Data isolation architecture for regulated client deployments |
| **ISO 27001** | Controls-aligned (not certified at this time) |
| **SOC 2** | Controls-aligned (audit in progress) |
| **OWASP Top 10** | Mitigated: injection, broken auth, sensitive data exposure, XSS, CSRF |

---

*This document is reviewed quarterly and updated after any security incident or significant architectural change.*
