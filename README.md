# SupraCloud — Enterprise AI Agent Development & IT Solutions

Production-grade AI agents and enterprise IT services for banking and retail, built by ex-IBM engineers.

**Live site:** [supracloud.co.uk](https://supracloud.co.uk)

---

## Stack

- **Framework:** Next.js 16 (App Router)
- **Language:** TypeScript / JavaScript
- **Styling:** Tailwind CSS v4
- **Email:** Resend
- **Deployment:** Vercel

---

## Routes

| Route | Description |
|---|---|
| `/` | Homepage |
| `/solutions/banking` | Banking AI Agents solution page |
| `/solutions/retail` | Retail AI Agents solution page |
| `/services/staffing` | IT Staffing & Outsourcing |
| `/services/consultation` | Enterprise IT Consultation |
| `/talent/programs` | Industry Training Programs |
| `/talent/partnerships` | Placement Year Partnerships |
| `/talent/internships` | Graduate Internships |
| `/about` | About SupraCloud & founder bio |
| `/contact` | Contact form & direct contact |
| `/book` | Discovery call booking form |
| `/portal` | Client portal (coming soon) |
| `/privacy` | Privacy Policy (UK GDPR) |
| `/terms` | Terms of Service |

---

## Environment Variables

Create `.env.local` with:

```
# Email (Resend)
EMAIL_SERVICE_API_KEY=re_...
EMAIL_FROM=noreply@supracloud.co.uk
RESEND_FROM_EMAIL=noreply@supracloud.co.uk   # legacy fallback

# Google Calendar / Meet integration
GOOGLE_CLIENT_ID=...
GOOGLE_CLIENT_SECRET=...
GOOGLE_REFRESH_TOKEN=...
GOOGLE_CALENDAR_ID=primary

# Static Meet link fallback (used if Google Calendar is not configured)
MEET_LINK=https://meet.google.com/xxx-xxxx-xxx

# Site
NEXT_PUBLIC_SITE_URL=https://supracloud.co.uk
```

### Booking flow

When a discovery call form is submitted:

1. If Google Calendar env vars are set, a calendar event is created with `conferenceData` to generate a unique Google Meet link.
2. A confirmation email with the Meet link is sent to the prospect via Resend.
3. A notification email is sent to `rk@supracloud.co.uk`.
4. If Google Calendar is not configured, the static `MEET_LINK` env var is used as fallback.

---

## Development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Build

```bash
npm run build
```

## Tests

```bash
npm test              # jest unit tests
npx playwright test   # e2e tests
```
