<div align="center">

# SupraCloud

### Enterprise AI Agents & IT Solutions — Built for Banking & Retail

[![Live Site](https://img.shields.io/badge/Live%20Site-supracloud.co.uk-0070FF?style=for-the-badge&logo=vercel&logoColor=white)](https://supracloud.co.uk)
[![Next.js](https://img.shields.io/badge/Next.js%2016-App%20Router-black?style=for-the-badge&logo=next.js)](https://nextjs.org)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS%20v4-38BDF8?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com)
[![Deployed on Vercel](https://img.shields.io/badge/Deployed-Vercel-black?style=for-the-badge&logo=vercel)](https://vercel.com)

</div>

---

## What is SupraCloud?

SupraCloud builds **production-grade AI agents and enterprise IT solutions** for regulated industries — banking, finance, and retail. Founded by ex-IBM engineers, we specialise in deploying LLM-powered agents that operate inside your cloud perimeter with full FCA, GDPR, and PCI-DSS compliance.

**Core capabilities:**
- AI agents on Claude + LangGraph + RAG with sub-200ms latency
- FCA/GDPR/PCI-DSS compliance baked in from day one
- Full-stack IT staffing, managed services, and cloud architecture
- Voice AI assistant (Aria) — ElevenLabs + Claude, live on the site

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 16 (App Router) |
| Language | TypeScript + JavaScript |
| Styling | Tailwind CSS v4 |
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

- **Aria Voice Agent** — an AI-powered sales assistant that qualifies leads via voice, remembers visitor names across a session, triggers after 3 exchanges, and auto-logs leads to Google Sheets + email. Falls back gracefully to browser TTS when ElevenLabs is not configured.
- **Booking Flow** — discovery call form creates a Google Calendar event with a unique Meet link and sends confirmation emails via Resend, with static fallback if Calendar API is not configured.
- **Stripe Billing** — three-tier pricing (Foundation, Application Engine, Full Accelerator) with server-side secret key; no sensitive keys exposed to the client.
- **Zero data exfiltration** — agents designed to run inside the customer's cloud tenant; NDA before discovery call is a business requirement, reflected in the architecture.

---

## Project Structure

```
app/
├── api/                  # Route handlers (agent, book, contact, leads, stripe)
├── components/           # Shared UI components (VoiceAgent, layout, etc.)
├── solutions/            # Banking, Retail, Supermarket solution pages
├── services/             # Cloud architecture, IT staffing, managed services
├── ai-agents/            # AI agent product pages
├── talent/               # Programs, partnerships, internships
├── case-studies/         # Customer success stories
├── portal/               # Client portal (authenticated)
├── about/                # Founder bio & company story
├── book/                 # Discovery call booking
└── contact/              # Contact form
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
| `ANTHROPIC_API_KEY` | Claude API key (Aria intelligence) |
| `ELEVENLABS_API_KEY` | ElevenLabs voice key |
| `ELEVENLABS_VOICE_ID` | ElevenLabs voice ID (default: Bella) |
| `GEMINI_API_KEY` | Google Gemini API key |

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

## Aria — Voice Agent

Aria is a custom voice AI agent embedded on the site. She:

1. Greets visitors by name, remembers it for the session
2. Answers questions from a local knowledge base (instant) or Claude (fallback)
3. Proactively suggests a discovery call after 3 exchanges
4. Runs a 6-question lead qualification flow when intent is detected
5. Logs qualified leads to email + Google Sheets via Zapier
6. Falls back to browser TTS if ElevenLabs is not configured
7. Handles inactivity — prompts after 45s, closes after 75s

To customise Aria: `app/components/VoiceAgent/agentPersonality.js`

---

## Deployment

Hosted on **Vercel**. Set all environment variables in the Vercel dashboard under Project → Settings → Environment Variables, then redeploy.

---

## License

Private & proprietary. All rights reserved — SupraCloud Ltd.
