import { NextRequest, NextResponse } from "next/server";
import { createSign, randomUUID } from "crypto";
import { Resend } from "resend";

const CALENDAR_ID = process.env.GOOGLE_CALENDAR_ID || "primary";
const OWNER_EMAIL = "rk@supracloud.co.uk";
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://supracloud.co.uk";
const FROM_EMAIL = process.env.RESEND_FROM_EMAIL || "onboarding@resend.dev";

function base64url(buf: Buffer | string): string {
  const b = typeof buf === "string" ? Buffer.from(buf) : buf;
  return b.toString("base64").replace(/\+/g, "-").replace(/\//g, "_").replace(/=/g, "");
}

async function getServiceAccountToken(): Promise<string | null> {
  const email = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
  const key = process.env.GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY?.replace(/\\n/g, "\n");
  if (!email || !key) return null;
  try {
    const now = Math.floor(Date.now() / 1000);
    const header = base64url(JSON.stringify({ alg: "RS256", typ: "JWT" }));
    const payload = base64url(
      JSON.stringify({
        iss: email,
        scope: "https://www.googleapis.com/auth/calendar",
        aud: "https://oauth2.googleapis.com/token",
        exp: now + 3600,
        iat: now,
      })
    );
    const signing = `${header}.${payload}`;
    const sign = createSign("RSA-SHA256");
    sign.update(signing);
    const sig = base64url(sign.sign(key));
    const jwt = `${signing}.${sig}`;
    const res = await fetch("https://oauth2.googleapis.com/token", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        grant_type: "urn:ietf:params:oauth:grant-type:jwt-bearer",
        assertion: jwt,
      }),
    });
    if (!res.ok) return null;
    const data = await res.json();
    return data.access_token ?? null;
  } catch {
    return null;
  }
}

async function isSlotAvailable(
  token: string,
  isoStart: string,
  isoEnd: string
): Promise<boolean> {
  try {
    const res = await fetch("https://www.googleapis.com/calendar/v3/freeBusy", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        timeMin: isoStart,
        timeMax: isoEnd,
        items: [{ id: CALENDAR_ID }],
      }),
    });
    if (!res.ok) return true;
    const data = await res.json();
    const busy = data.calendars?.[CALENDAR_ID]?.busy ?? [];
    return busy.length === 0;
  } catch {
    return true;
  }
}

async function createCalendarEvent(
  token: string,
  name: string,
  email: string,
  topic: string,
  isoStart: string,
  isoEnd: string
): Promise<string | null> {
  try {
    const requestId = randomUUID();
    const event = {
      summary: `SupraCloud Discovery Call — ${name}`,
      description: `30-minute discovery call.\nTopic: ${topic}\nBooked via supracloud.co.uk`,
      start: { dateTime: isoStart, timeZone: "Europe/London" },
      end: { dateTime: isoEnd, timeZone: "Europe/London" },
      attendees: [{ email }],
      conferenceData: {
        createRequest: {
          requestId,
          conferenceSolutionKey: { type: "hangoutsMeet" },
        },
      },
    };
    const res = await fetch(
      `https://www.googleapis.com/calendar/v3/calendars/${encodeURIComponent(CALENDAR_ID)}/events?conferenceDataVersion=1&sendUpdates=all`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(event),
      }
    );
    if (!res.ok) return null;
    const data = await res.json();
    return (
      data?.conferenceData?.entryPoints?.find(
        (ep: { entryPointType: string; uri: string }) =>
          ep.entryPointType === "video"
      )?.uri ?? null
    );
  } catch {
    return null;
  }
}

async function insertSupabase(booking: {
  name: string;
  email: string;
  company: string;
  topic: string;
  isoStart: string;
  isoEnd: string;
  meetLink: string;
}): Promise<void> {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) return;
  try {
    const { createClient } = await import("@supabase/supabase-js");
    const supabase = createClient(url, key);
    await supabase.from("sc_bookings").insert([
      {
        name: booking.name,
        email: booking.email,
        company: booking.company || null,
        topic: booking.topic,
        slot_start: booking.isoStart,
        slot_end: booking.isoEnd,
        meet_link: booking.meetLink,
        created_at: new Date().toISOString(),
      },
    ]);
  } catch {
    // Non-fatal: Supabase is optional
  }
}

function clientEmailHtml(d: {
  firstName: string;
  name: string;
  displayDate: string;
  displayTime: string;
  topic: string;
  meetLink: string;
}) {
  return `<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#f8fafc;font-family:Inter,-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f8fafc;padding:48px 16px;">
    <tr><td align="center">
      <table width="580" cellpadding="0" cellspacing="0" style="max-width:580px;width:100%;background:#ffffff;border-radius:16px;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,0.06);">
        <tr><td style="background:linear-gradient(135deg,#0A192F 0%,#0d2137 100%);padding:32px 40px 28px;">
          <p style="margin:0 0 4px;font-size:11px;font-weight:700;letter-spacing:3px;text-transform:uppercase;color:#0070FF;">SUPRACLOUD</p>
          <p style="margin:0;font-size:13px;color:#94a3b8;">Enterprise AI · Confirmed Discovery Call</p>
        </td></tr>
        <tr><td style="padding:36px 40px 0;">
          <p style="margin:0 0 20px;font-size:16px;color:#1e293b;">Hi ${d.firstName},</p>
          <p style="margin:0 0 16px;font-size:15px;color:#374151;line-height:1.7;">
            Your discovery call with SupraCloud is confirmed. Here are the details:
          </p>
          <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:28px;">
            <tr><td style="background:#f0f7ff;border:2px solid #0070FF;border-radius:12px;padding:20px 24px;">
              <p style="margin:0 0 8px;font-size:12px;font-weight:700;letter-spacing:2px;text-transform:uppercase;color:#0070FF;">Your Booking</p>
              <p style="margin:0 0 4px;font-size:20px;font-weight:800;color:#0A192F;">${d.displayDate}</p>
              <p style="margin:0 0 16px;font-size:16px;color:#374151;">${d.displayTime} GMT · 30 minutes</p>
              <a href="${d.meetLink}" style="display:inline-block;padding:12px 28px;background:#0070FF;color:#ffffff;font-size:14px;font-weight:700;border-radius:8px;text-decoration:none;">
                Join Google Meet &rarr;
              </a>
              <p style="margin:12px 0 0;font-size:12px;color:#6b7280;word-break:break-all;">${d.meetLink}</p>
            </td></tr>
          </table>
          <p style="margin:0 0 8px;font-size:14px;color:#374151;line-height:1.7;"><strong>Topic:</strong> ${d.topic}</p>
          <p style="margin:0 0 28px;font-size:14px;color:#374151;line-height:1.7;">
            A calendar invite has been sent to your email. If you need to reschedule, reply to this email or contact us at
            <a href="mailto:rk@supracloud.co.uk" style="color:#0070FF;">rk@supracloud.co.uk</a>.
          </p>
          <p style="margin:0 0 6px;font-size:15px;color:#374151;">Talk soon,</p>
          <p style="margin:0 0 4px;font-size:15px;font-weight:700;color:#0A192F;">Praveen Kumar</p>
          <p style="margin:0 0 32px;font-size:13px;color:#94a3b8;">Founder · SupraCloud &nbsp;|&nbsp; ex-IBM AI/ML Engineer</p>
          <hr style="border:none;border-top:1px solid #e2e8f0;margin-bottom:24px;">
        </td></tr>
        <tr><td style="padding:0 40px 32px;">
          <p style="margin:0;font-size:12px;color:#94a3b8;">
            <strong style="color:#64748b;">SupraCloud Ltd</strong> &nbsp;&middot;&nbsp;
            <a href="mailto:rk@supracloud.co.uk" style="color:#0070FF;text-decoration:none;">rk@supracloud.co.uk</a> &nbsp;&middot;&nbsp;
            <a href="${SITE_URL}" style="color:#0070FF;text-decoration:none;">supracloud.co.uk</a>
          </p>
        </td></tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`;
}

function ownerEmailHtml(d: {
  name: string;
  email: string;
  company: string;
  topic: string;
  displayDate: string;
  displayTime: string;
  meetLink: string;
}) {
  return `<!DOCTYPE html>
<html>
<head><meta charset="UTF-8"></head>
<body style="margin:0;padding:0;background:#f1f5f9;font-family:Inter,-apple-system,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f1f5f9;padding:32px 16px;">
    <tr><td align="center">
      <table width="540" cellpadding="0" cellspacing="0" style="max-width:540px;width:100%;background:#fff;border-radius:14px;overflow:hidden;box-shadow:0 2px 16px rgba(0,0,0,0.08);">
        <tr><td style="background:#0A192F;padding:20px 28px;">
          <p style="margin:0 0 2px;font-size:10px;font-weight:700;letter-spacing:3px;text-transform:uppercase;color:#0070FF;">NEW BOOKING — CONFIRMED SLOT</p>
          <p style="margin:0;font-size:18px;font-weight:800;color:#fff;">${d.name}${d.company ? ` — ${d.company}` : ""}</p>
        </td></tr>
        <tr><td style="padding:24px 28px;">
          <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:20px;">
            ${[
              ["Date", d.displayDate],
              ["Time", `${d.displayTime} GMT`],
              ["Topic", d.topic],
              ["Name", d.name],
              ["Company", d.company || "—"],
              ["Email", `<a href="mailto:${d.email}" style="color:#0070FF;">${d.email}</a>`],
            ]
              .map(
                ([k, v]) => `
            <tr style="border-bottom:1px solid #f1f5f9;">
              <td style="padding:9px 0;font-size:12px;color:#94a3b8;font-weight:600;text-transform:uppercase;letter-spacing:0.5px;width:34%;vertical-align:top;">${k}</td>
              <td style="padding:9px 0;font-size:14px;color:#1e293b;">${v}</td>
            </tr>`
              )
              .join("")}
          </table>
          <a href="${d.meetLink}" style="display:inline-block;padding:11px 22px;background:#0070FF;color:#fff;font-size:13px;font-weight:700;border-radius:8px;text-decoration:none;">
            Open Google Meet
          </a>
          <p style="margin:12px 0 0;font-size:12px;color:#94a3b8;word-break:break-all;">${d.meetLink}</p>
        </td></tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`;
}

function formatDisplayDate(isoStart: string): string {
  const d = new Date(isoStart);
  return d.toLocaleDateString("en-GB", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "Europe/London",
  });
}

function formatDisplayTime(isoStart: string): string {
  const d = new Date(isoStart);
  return d.toLocaleTimeString("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
    timeZone: "Europe/London",
  });
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, company, topic, isoStart, isoEnd } = body as {
      name: string;
      email: string;
      company?: string;
      topic: string;
      isoStart: string;
      isoEnd: string;
    };

    if (!name || !email || !topic || !isoStart || !isoEnd) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const token = await getServiceAccountToken();

    // Race condition guard: re-check availability before booking
    if (token) {
      const available = await isSlotAvailable(token, isoStart, isoEnd);
      if (!available) {
        return NextResponse.json(
          { error: "slot_taken", message: "That slot was just taken. Please pick another time." },
          { status: 409 }
        );
      }
    }

    const meetLink =
      token
        ? (await createCalendarEvent(token, name, email, topic, isoStart, isoEnd)) ??
          "https://meet.google.com/"
        : "https://meet.google.com/";

    const displayDate = formatDisplayDate(isoStart);
    const displayTime = formatDisplayTime(isoStart);
    const firstName = name.trim().split(" ")[0];

    // Insert to Supabase (non-blocking, non-fatal)
    void insertSupabase({
      name,
      email,
      company: company ?? "",
      topic,
      isoStart,
      isoEnd,
      meetLink,
    });

    const resend = new Resend(
      process.env.EMAIL_SERVICE_API_KEY || process.env.RESEND_API_KEY || ""
    );

    await Promise.allSettled([
      resend.emails.send({
        from: FROM_EMAIL,
        to: email,
        replyTo: OWNER_EMAIL,
        subject: `Discovery call confirmed — ${displayDate} at ${displayTime} GMT`,
        html: clientEmailHtml({ firstName, name, displayDate, displayTime, topic, meetLink }),
      }),
      resend.emails.send({
        from: FROM_EMAIL,
        to: OWNER_EMAIL,
        replyTo: email,
        subject: `New booking: ${name}${company ? ` (${company})` : ""} — ${displayDate} ${displayTime}`,
        html: ownerEmailHtml({
          name,
          email,
          company: company ?? "",
          topic,
          displayDate,
          displayTime,
          meetLink,
        }),
      }),
    ]);

    return NextResponse.json({ success: true, meetLink, displayDate, displayTime });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
