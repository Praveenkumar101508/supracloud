# Deployment Notes

## Nova Voice Agent — Setup Checklist

---

### 1. ElevenLabs (AI Voice)

1. Go to https://elevenlabs.io and sign up / log in
2. Navigate to **Profile > API Keys** and copy your key
3. Go to **Voice Library** and pick a voice - copy the Voice ID
4. Recommended: **Rachel** or **Bella** (natural, professional female voices)
5. Add to Vercel environment variables:
   - `ELEVENLABS_API_KEY` = your key
   - `ELEVENLABS_VOICE_ID` = voice ID (default: `EXAVITQu4vr4xnSDxMaL` = Bella)

> Without these keys Nova falls back to the browser's built-in TTS automatically.

---

### 2. Anthropic API (AI Answers)

1. Go to https://console.anthropic.com > **API Keys**
2. Create a new key
3. Add to Vercel: `ANTHROPIC_API_KEY`

> Without this key Nova answers from the 14-entry local knowledge base. Only unknown questions fail gracefully with a "please contact us" message.

---

### 3. Google Sheets for Leads (via Zapier - FREE)

This is the easiest way to get leads into a spreadsheet automatically.

**Step A - Create the Google Sheet:**
1. Open Google Sheets and create a new sheet
2. Add these column headers in row 1:
   `Name | Company | Role | Challenge | Volume | Timeframe | Email | Source | Timestamp`

**Step B - Create a Zapier webhook:**
1. Go to https://zapier.com and sign up (free plan works)
2. Create a new Zap
3. **Trigger:** search for "Webhooks by Zapier" > select "Catch Hook" > click Continue
4. Copy the webhook URL Zapier gives you (looks like `https://hooks.zapier.com/hooks/catch/...`)
5. **Action:** search for "Google Sheets" > select "Create Spreadsheet Row"
6. Connect your Google account > select the sheet you created
7. Map the fields: Name > Name, Company > Company, etc.
8. Turn the Zap ON

**Step C - Add to Vercel:**
- `LEAD_WEBHOOK_URL` = the Zapier webhook URL from Step B
- `LEAD_TO_EMAIL` = `rk@supracloud.co.uk` (or wherever lead emails should go)

Now every time a visitor completes the qualification flow with Nova, you get:
- An email to your inbox with a formatted summary and a "Reply" button
- A new row added to your Google Sheet automatically

---

### 4. All Vercel Environment Variables

| Variable | Value | Required? |
|---|---|---|
| `RESEND_API_KEY` | Your Resend API key | Yes (emails) |
| `RESEND_FROM_EMAIL` | `noreply@supracloud.co.uk` | Yes |
| `MEET_LINK` | `https://meet.google.com/dyq-oerk-qkk` | Yes (booking) |
| `NEXT_PUBLIC_SITE_URL` | `https://supracloud.co.uk` | Yes |
| `ELEVENLABS_API_KEY` | Your ElevenLabs key | Optional |
| `ELEVENLABS_VOICE_ID` | Voice ID | Optional |
| `ANTHROPIC_API_KEY` | Your Anthropic key | Optional |
| `LEAD_TO_EMAIL` | `rk@supracloud.co.uk` | Optional |
| `LEAD_WEBHOOK_URL` | Zapier webhook URL | Optional |

After adding/changing variables in Vercel: **redeploy** the project.

---

### 5. How Nova Works — Full Flow

1. **First visit: Nova opens and asks "What's your name?"
2. **Name captured:** Nova greets by name and starts helping - uses name throughout
3. **Questions:** Nova checks local knowledge base first (instant), then Claude AI (if configured)
4. **After 3 exchanges:** Nova proactively suggests a discovery call
5. **Demo intent detected** ("book a call", "interested", "yes please", etc.): Nova asks 6 qualifying questions
6. **Lead stored:** Email sent to team + row added to Google Sheet (if configured)
7. **Inactivity:** After 45 seconds of silence, Nova says "Still there, [Name]?" - closes after 30 more seconds if no response
8. **Returning visitor (same session):** Aria remembers the name and skips the intro

---

### 6. Customising Nova

All customisation is in `app/components/VoiceAgent/agentPersonality.js`:

- **Change opening script:** edit `ASK_NAME_SCRIPT`
- **Change page scripts:** edit `PAGE_SCRIPTS["/your-path"]`
- **Add Q&A pairs:** add an entry to `KNOWLEDGE_BASE` with `tags` and `answer`
- **Change lead questions:** edit `LEAD_QUESTIONS` array
- **Change proactive CTA:** edit `PROACTIVE_CTA`
- **Change inactivity timing:** edit `INACTIVITY_MS` and `CLOSE_MS` in `useVoiceAgent.js`
- **Change voice:** update `ELEVENLABS_VOICE_ID` in Vercel env vars
