# SupraCloud — Setup Checklist

Everything you need to do before the site is fully live. Work through this top to bottom.

---

## STATUS KEY
- [x] Done
- [ ] Still to do

---

## 1. Vercel — Environment Variables

Go to: **Vercel Dashboard > Your Project > Settings > Environment Variables**

Add each variable below. After adding ALL of them, click **Redeploy**.

### Email (Resend) — ALREADY DONE
- [x] `RESEND_API_KEY` — your Resend API key (already set)
- [x] `RESEND_FROM_EMAIL` — `noreply@supracloud.co.uk` (already set)
- [x] `MEET_LINK` — `https://meet.google.com/dyq-oerk-qkk` (already set)
- [x] `NEXT_PUBLIC_SITE_URL` — `https://supracloud.co.uk` (already set)

### Nova Voice Agent — STILL TO DO
- [ ] `ELEVENLABS_API_KEY`
  - Where to get it: https://elevenlabs.io → sign up → Profile → API Keys → Create API Key
  - Copy the key and paste it here in Vercel

- [ ] `ELEVENLABS_VOICE_ID`
  - Where to get it: https://elevenlabs.io/voice-library → pick a voice → copy the Voice ID from the URL
  - Recommended voice: search "Rachel" or "Bella" — professional female voices
  - Paste the Voice ID (looks like: `EXAVITQu4vr4xnSDxMaL`)
  - **If you skip this: Nova will use the browser's built-in voice instead (robotic but still works)

- [ ] `ANTHROPIC_API_KEY`
  - Where to get it: https://console.anthropic.com → sign up → API Keys → Create Key
  - This powers Nova's AI answers beyond the built-in knowledge base
  - **If you skip this**: Nova still answers from 14 built-in Q&A pairs — only unknown questions get a "please contact us" message

- [ ] `LEAD_TO_EMAIL`
  - Set this to: `rk@supracloud.co.uk`
  - This is where lead emails from Nova go
  - **If you skip this**: lead emails default to `rk@supracloud.co.uk` anyway

- [ ] `LEAD_WEBHOOK_URL` ← for Google Sheets
  - See Section 2 below for how to get this
  - **If you skip this**: leads are still emailed to you, just not added to Google Sheets

---

## 2. Google Sheets — Lead Capture (via Zapier)

Every time Nova collects a visitor's details, you get:
1. An email to your inbox (works immediately once Resend is set up)
2. A row added to a Google Sheet (needs Zapier — 5-minute setup, free plan)

### Step A — Create the Google Sheet

1. Go to https://sheets.google.com
2. Create a new blank spreadsheet
3. Name it: **SupraCloud Nova Leads**
4. Add these headers in Row 1 (one per column):

| A | B | C | D | E | F | G | H | I |
|---|---|---|---|---|---|---|---|---|
| Name | Company | Role | Challenge | Volume | Timeframe | Email | Source | Timestamp |

### Step B — Create a Zapier Webhook

1. Go to https://zapier.com → sign up (free plan is enough)
2. Click **Create Zap**
3. **Trigger step:**
   - Search: **Webhooks by Zapier**
   - Event: **Catch Hook**
   - Click Continue
   - Copy the **Custom Webhook URL** (looks like `https://hooks.zapier.com/hooks/catch/12345/abcdef/`)
   - Click Continue (you don't need to test yet)

4. **Action step:**
   - Search: **Google Sheets**
   - Event: **Create Spreadsheet Row**
   - Connect your Google account
   - Select the sheet you created
   - Map the fields:
     - Name → `name`
     - Company → `company`
     - Role → `role`
     - Challenge → `challenge`
     - Volume → `volume`
     - Timeframe → `timeframe`
     - Email → `email`
     - Source → `source`
     - Timestamp → `timestamp`

5. Turn the Zap **ON**

### Step C — Add to Vercel

- Copy the Zapier webhook URL
- Go to Vercel > Settings > Environment Variables
- Add: `LEAD_WEBHOOK_URL` = the Zapier URL
- Redeploy

---

## 3. Resend Domain Verification — CHECK STATUS

- [ ] Go to https://resend.com/domains
- Check that `supracloud.co.uk` shows as **Verified** (not Partially Verified)
- If it shows Partially Verified, check your DNS records:
  - You need 3 DNS records: 2x TXT and 1x MX (or DKIM)
  - Log in to wherever you bought the domain (GoDaddy, Namecheap, etc.)
  - Add the records Resend shows you
  - Wait 24-48 hours for full verification

---

## 4. ElevenLabs — Picking a Voice

When you sign up at elevenlabs.io:

1. Go to **Voice Library** (in the left sidebar)
2. Search for these recommended voices:
   - **Rachel** — professional, clear, British-friendly
   - **Bella** — warm, conversational (this is the default in the code)
   - **Emily** — friendly, professional
3. Click a voice → click **Add to my voices**
4. Go to **My Voices** → click the voice → copy the Voice ID from the URL bar
   - URL looks like: `https://elevenlabs.io/app/voice-lab/edit/EXAVITQu4vr4xnSDxMaL`
   - The Voice ID is the long string: `EXAVITQu4vr4xnSDxMaL`
5. Paste that as `ELEVENLABS_VOICE_ID` in Vercel

**ElevenLabs free plan gives you 10,000 characters/month** — enough to test Aria extensively. Upgrade when you go live with high traffic.

---

## 5. Final Deploy Steps

After adding all the Vercel env variables:

1. Go to Vercel Dashboard → your project
2. Click **Deployments** in the top nav
3. Click the three dots (...) on the latest deployment → **Redeploy**
4. Wait ~2 minutes for build to finish
5. Visit https://supracloud.co.uk and click the green waveform button (bottom right)
6. Nova should greet you and ask your name

---

## 6. Testing Nova

Once live, test this flow:

1. Open the site → click the **green waveform button** (bottom right)
2. Nova asks: *"What's your name?"* → say your name
3. Nova greets you by name
4. Ask: *"What do you do?"* → Nova explains SupraCloud
5. Ask: *"How much does it cost?"* → Nova gives pricing guidance
6. Say: *"I'd like to book a call"* → Nova starts the lead capture flow
7. Answer all 6 questions → Nova confirms
8. Check your email (rk@supracloud.co.uk) — you should get a lead email
9. Check your Google Sheet — a new row should appear

---

## 7. What's Built (Reference)

### New files added in this session:
```
app/components/VoiceAgent/
  agentPersonality.js      — 14 Q&A pairs, page scripts, lead flow scripts
  useVoiceAgent.js         — all conversation logic: name capture, lead flow, inactivity
  useRouteAnnouncer.js     — detects page navigation
  VoiceAgentWidget.js      — the floating UI widget
  VoiceAgentWidget.module.css — premium CSS styling
app/components/VoiceAgentLoader.tsx — client wrapper for SSR compatibility
app/api/agent/
  speak/route.js           — ElevenLabs TTS proxy
  respond/route.js         — Claude AI answers proxy
  lead/route.js            — lead capture: email + webhook to Google Sheets
DEPLOYMENT_NOTES.md        — full technical reference
.github/SETUP_CHECKLIST.md — this file
```

### Bugs fixed in this session:
- Double navbar removed from 7 marketing pages
- WCAG form labels added to /book and /contact
- Horizontal overflow fixed at 768px
- ProdReady/prodready-labs references removed
- Duplicate `<main>` landmark removed
- Heading hierarchy fixed (h5 → p in footer)
- Terms page updated to B2B enterprise scope
- Portal sidebar 404s fixed (/schedule, /projects, /mock-interviews)
- Page title encoding fixed (curly quotes, em dashes)
- Email confirmation working via Resend
- Google Meet link embedded in booking emails
