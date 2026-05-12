<div align="center">

# SupraCloud

### Enterprise AI Agents — Built for Banking & Retail

[![Live Site](https://img.shields.io/badge/Live%20Site-supracloud.co.uk-0070FF?style=for-the-badge&logo=vercel&logoColor=white)](https://supracloud.co.uk)
[![Next.js](https://img.shields.io/badge/Next.js%2016-App%20Router-black?style=for-the-badge&logo=next.js)](https://nextjs.org)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS%20v4-38BDF8?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com)
[![Deployed on Vercel](https://img.shields.io/badge/Deployed-Vercel-black?style=for-the-badge&logo=vercel)](https://vercel.com)

</div>

---

## What is SupraCloud?

SupraCloud builds **production-grade autonomous AI agents** for regulated industries — banking, finance, and retail. We deploy LLM-powered agents that live inside your cloud tenant with full FCA, GDPR, and PCI-DSS compliance baked in from day one.

**Core capabilities:**
- Autonomous AI agents on Claude + LangGraph + RAG, sub-200ms latency
- FCA-aware audit trail and explainable AI on every decision
- Full-stack IT staffing, managed services, and cloud architecture
- **Nova** — a live voice AI assistant (ElevenLabs + Claude) embedded on the site

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 16 (App Router) |
| Language | TypeScript + JavaScript |
| Styling | Tailwind CSS v4 + CVA (class-variance-authority) |
| Animation | Framer Motion v12 + React Three Fiber |
| AI / LLM | Anthropic Claude API |
| Voice AI | ElevenLabs TTS |
| Database | Supabase (PostgreSQL) |
| Email | Resend |
| Payments | Stripe |
| Analytics | PostHog |
| Calendar | Google Calendar API + Google Meet |
| CRM | Zapier webhook → Google Sheets |
| Deployment | Vercel |

---

## Architecture Highlights

- **Nova Voice Agent** — AI-powered assistant that qualifies leads via voice, remembers visitor context across a session, proactively triggers after 3 exchanges, and auto-logs leads to Google Sheets + email. Falls back to browser TTS when ElevenLabs is not configured.
- **Holographic UI System** — custom CVA + Tailwind v4 `@utility` design system with HolographicCard (3D tilt, radial glow), GlowButton (loading/success/confetti), NovaSphere (R3F hero avatar), and NeuralBackground (WebGL particle network).
- **Booking Flow** — discovery call form creates a Google Calendar event with a unique Meet link and sends confirmation emails via Resend, with static fallback if Calendar API is not configured.
- **Stripe Billing** — three-tier pricing (Foundation, Application Engine, Full Accelerator) with server-side secret key; no sensitive keys exposed to the client.
- **Zero data exfiltration** — agents run inside the customer's cloud tenant by design; NDA before discovery call is a business requirement.
- **Dynamic imports + Suspense** — all 3D and heavy components (NeuralBackground, NovaSphere, NovaDemoPreview) are lazy-loaded to keep the hero TTI fast.

---

## Project Structure

```
app/
├── api/                  # Route handlers (agent, book, contact, leads, stripe)
├── components/
│   ├── 3d/               # NeuralBackground, NovaSphere (React Three Fiber)
│   ├── ui/               # Design system — HolographicCard, GlowButton, NovaDemoPreview,
│   │                     #   SocialProof, ClientPortalTeaser, AnimatedCounter, TrustBadge
│   └── VoiceAgent/       # Nova widget — agentPersonality, useVoiceAgent, VoiceAgentWidget
├── solutions/
│   ├── banking/          # Banking AI agent demo page
│   └── retail/           # Retail intelligence demo page
├── services/             # Consultation, staffing pages
├── talent/               # Programs, partnerships
├── about/                # Founder bio & company story
├── book/                 # Discovery call booking
└── contact/              # Contact form
lib/
└── utils.ts              # cn() — clsx + tailwind-merge
```

---

## Getting Started

```bash
git clone https://github.com/praveenkumar101508/supracloud.git
cd supracloud
npm install
cp .env.example .env.local   # fill in your keys
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

---

## Environment Variables

Create `.env.local` from `.env.example`. Full reference:

### Required

| Variable | Description |
|---|---|
| `NEXT_PUBLIC_SITE_URL` | Public site URL (e.g. `https://supracloud.co.uk`) |
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase project URL |
| `SUPABASE_SERVICE_ROLE_KEY` | Supabase service role key (server-side only) |
| `RESEND_API_KEY` | Resend email API key |
| `RESEND_FROM_EMAIL` | Sender address for transactional emails |
| `MEET_LINK` | Fallback Google Meet URL |

### Payments

| Variable | Description |
|---|---|
| `STRIPE_SECRET_KEY` | Stripe secret key |
| `STRIPE_PRICE_FOUNDATION` | Stripe price ID — Foundation plan |
| `STRIPE_PRICE_APPLICATION_ENGINE` | Stripe price ID — Application Engine plan |
| `STRIPE_PRICE_FULL_ACCELERATOR` | Stripe price ID — Full Accelerator plan |

### AI / Voice (optional — graceful fallback if omitted)

| Variable | Description |
|---|---|
| `ANTHROPIC_API_KEY` | Claude API key (Nova intelligence) |
| `ELEVENLABS_API_KEY` | ElevenLabs voice key |
| `ELEVENLABS_VOICE_ID` | ElevenLabs voice ID (default: Bella) |
| `GEMINI_API_KEY` | Google Gemini API key (optional fallback) |

### Google Calendar & OAuth

| Variable | Description |
|---|---|
| `GOOGLE_CLIENT_ID` | OAuth client ID |
| `GOOGLE_CLIENT_SECRET` | OAuth client secret |
| `GOOGLE_REFRESH_TOKEN` | OAuth refresh token |
| `GOOGLE_CALENDAR_ID` | Calendar ID for booking events |
| `GOOGLE_SERVICE_ACCOUNT_EMAIL` | Service account email |
| `GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY` | Service account private key |

### Leads & CRM

| Variable | Description |
|---|---|
| `LEAD_TO_EMAIL` | Email address for lead notifications |
| `LEAD_WEBHOOK_URL` | Zapier (or equivalent) webhook for CRM ingestion |

### Analytics

| Variable | Description |
|---|---|
| `NEXT_PUBLIC_POSTHOG_KEY` | PostHog project API key |
| `NEXT_PUBLIC_POSTHOG_HOST` | PostHog host (default: `https://app.posthog.com`) |
| `NEXT_PUBLIC_CALENDLY_URL` | Calendly booking page URL |

---

## Scripts

```bash
npm run dev          # Start dev server (http://localhost:3000)
npm run build        # Production build
npm run start        # Start production server
npm test             # Jest unit tests
npx playwright test  # Playwright end-to-end tests
```

---

## Nova — Voice AI Agent

Nova is a custom voice AI assistant embedded on every page. She:

1. Greets visitors by name; remembers context for the session via Supabase
2. Answers questions from a local knowledge base (instant) or Claude (fallback)
3. Proactively suggests a discovery call after 3 exchanges
4. Runs a 6-question lead qualification flow when intent is detected
5. Logs qualified leads to email + Google Sheets via Zapier
6. Falls back to browser TTS if ElevenLabs is not configured
7. Handles inactivity — prompts after 45 s, closes after 75 s
8. Responds to the `nova:open` DOM event from any CTA on the page

To customise Nova: `app/components/VoiceAgent/agentPersonality.js`

---

## Deployment

See [DEPLOYMENT.md](./DEPLOYMENT.md) for the full go-live checklist.

Hosted on **Vercel**. Set all environment variables in the Vercel dashboard under Project → Settings → Environment Variables, then redeploy.

---

## License

Private & proprietary. All rights reserved — SupraCloud Ltd.
