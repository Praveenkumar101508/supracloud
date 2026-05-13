import { NextRequest, NextResponse } from "next/server";
import { createSign } from "crypto";
import { rateLimit } from "@/lib/rateLimiter";

const CALENDAR_ID = process.env.GOOGLE_CALENDAR_ID || "primary";
const CACHE = new Map<string, { data: SlotInfo[]; ts: number }>();
const CACHE_TTL = 5 * 60 * 1000;

export interface SlotInfo {
  time: string;
  displayTime: string;
  available: boolean;
  isoStart: string;
  isoEnd: string;
}

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

function generateSlots(dateStr: string): SlotInfo[] {
  const slots: SlotInfo[] = [];
  for (let h = 9; h < 17; h++) {
    for (const m of [0, 30]) {
      const padH = String(h).padStart(2, "0");
      const padM = String(m).padStart(2, "0");
      const start = new Date(`${dateStr}T${padH}:${padM}:00Z`);
      const end = new Date(start.getTime() + 30 * 60 * 1000);
      const hours12 = h % 12 || 12;
      const ampm = h < 12 ? "AM" : "PM";
      slots.push({
        time: `${padH}:${padM}`,
        displayTime: `${hours12}:${padM} ${ampm}`,
        available: true,
        isoStart: start.toISOString(),
        isoEnd: end.toISOString(),
      });
    }
  }
  return slots;
}

async function getBusyPeriods(
  token: string,
  dateStr: string
): Promise<{ start: string; end: string }[]> {
  try {
    const res = await fetch("https://www.googleapis.com/calendar/v3/freeBusy", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        timeMin: `${dateStr}T08:00:00Z`,
        timeMax: `${dateStr}T18:00:00Z`,
        items: [{ id: CALENDAR_ID }],
      }),
    });
    if (!res.ok) return [];
    const data = await res.json();
    return data.calendars?.[CALENDAR_ID]?.busy ?? [];
  } catch {
    return [];
  }
}

function markBusy(
  slots: SlotInfo[],
  busy: { start: string; end: string }[],
  nowMs: number
): SlotInfo[] {
  return slots.map((slot) => {
    const slotStart = new Date(slot.isoStart).getTime();
    const slotEnd = new Date(slot.isoEnd).getTime();
    if (slotStart < nowMs + 60 * 60 * 1000) return { ...slot, available: false };
    const overlaps = busy.some((b) => {
      const bStart = new Date(b.start).getTime();
      const bEnd = new Date(b.end).getTime();
      return slotStart < bEnd && slotEnd > bStart;
    });
    return { ...slot, available: !overlaps };
  });
}

export async function GET(req: NextRequest) {
  const rl = await rateLimit(req);
  if (!rl.success) return rl.response!;

  const date = req.nextUrl.searchParams.get("date");
  if (!date || !/^\d{4}-\d{2}-\d{2}$/.test(date)) {
    return NextResponse.json({ error: "Invalid date" }, { status: 400 });
  }
  const d = new Date(`${date}T00:00:00Z`);
  const day = d.getUTCDay();
  if (day === 0 || day === 6) {
    return NextResponse.json({ error: "Weekends not available" }, { status: 400 });
  }

  const nowMs = Date.now();
  const cached = CACHE.get(date);
  if (cached && nowMs - cached.ts < CACHE_TTL) {
    return NextResponse.json({ slots: cached.data });
  }

  const slots = generateSlots(date);
  const token = await getServiceAccountToken();

  if (token) {
    const busy = await getBusyPeriods(token, date);
    const marked = markBusy(slots, busy, nowMs);
    CACHE.set(date, { data: marked, ts: nowMs });
    return NextResponse.json({ slots: marked });
  }

  const marked = markBusy(slots, [], nowMs);
  CACHE.set(date, { data: marked, ts: nowMs });
  return NextResponse.json({ slots: marked });
}
