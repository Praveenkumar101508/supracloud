"use client";

import { useState, useEffect, useMemo } from "react";
import { CheckCircle, Calendar, Clock, Video, ChevronRight, Loader2, AlertCircle } from "lucide-react";

interface SlotInfo {
  time: string;
  displayTime: string;
  available: boolean;
  isoStart: string;
  isoEnd: string;
}

interface DateOption {
  value: string;
  dayName: string;
  dayNum: number;
  monthName: string;
}

type Step = "date" | "time" | "details" | "confirmed";

const TOPICS = [
  "Banking AI Agents",
  "Retail AI Agents",
  "IT Staffing & Consultation",
  "Talent Programme",
  "General Enquiry",
];

function generateDateOptions(): DateOption[] {
  const options: DateOption[] = [];
  const now = new Date();
  const DAY_NAMES = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const MONTH_NAMES = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
  for (let i = 1; options.length < 10 && i < 30; i++) {
    const d = new Date(now);
    d.setDate(d.getDate() + i);
    const day = d.getDay();
    if (day === 0 || day === 6) continue;
    const yyyy = d.getFullYear();
    const mm = String(d.getMonth() + 1).padStart(2, "0");
    const dd = String(d.getDate()).padStart(2, "0");
    options.push({
      value: `${yyyy}-${mm}-${dd}`,
      dayName: DAY_NAMES[day],
      dayNum: d.getDate(),
      monthName: MONTH_NAMES[d.getMonth()],
    });
  }
  return options;
}

interface BookingEngineProps {
  onClose?: () => void;
}

export default function BookingEngine({ onClose }: BookingEngineProps) {
  const [step, setStep] = useState<Step>("date");
  const [selectedDate, setSelectedDate] = useState<DateOption | null>(null);
  const [selectedSlot, setSelectedSlot] = useState<SlotInfo | null>(null);
  const [slots, setSlots] = useState<SlotInfo[]>([]);
  const [loadingSlots, setLoadingSlots] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [topic, setTopic] = useState(TOPICS[0]);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [confirmed, setConfirmed] = useState<{
    meetLink: string;
    displayDate: string;
    displayTime: string;
  } | null>(null);

  const dates = useMemo(() => generateDateOptions(), []);

  useEffect(() => {
    if (!selectedDate) return;
    setSlots([]);
    setLoadingSlots(true);
    setError("");
    fetch(`/api/booking/slots?date=${selectedDate.value}`)
      .then((r) => r.json())
      .then((data) => {
        setSlots(data.slots ?? []);
        setStep("time");
      })
      .catch(() => setError("Failed to load availability. Please try again."))
      .finally(() => setLoadingSlots(false));
  }, [selectedDate]);

  async function handleConfirm(e: React.FormEvent) {
    e.preventDefault();
    if (!selectedSlot || !selectedDate) return;
    setSubmitting(true);
    setError("");
    try {
      const res = await fetch("/api/booking/confirm", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          company,
          topic,
          isoStart: selectedSlot.isoStart,
          isoEnd: selectedSlot.isoEnd,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        if (data.error === "slot_taken") {
          setError("That slot was just taken — please pick another time.");
          setStep("time");
          // Refresh slots
          setSelectedSlot(null);
          setLoadingSlots(true);
          const fresh = await fetch(`/api/booking/slots?date=${selectedDate.value}`);
          const freshData = await fresh.json();
          setSlots(freshData.slots ?? []);
          setLoadingSlots(false);
        } else {
          setError(data.error || "Something went wrong. Please try again.");
        }
        return;
      }
      setConfirmed({ meetLink: data.meetLink, displayDate: data.displayDate, displayTime: data.displayTime });
      setStep("confirmed");
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="w-full max-w-2xl mx-auto">
      {/* Progress dots */}
      {step !== "confirmed" && (
        <div className="flex items-center gap-2 mb-8">
          {(["date", "time", "details"] as Step[]).map((s, i) => (
            <div key={s} className="flex items-center gap-2">
              <div
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  step === s
                    ? "w-6 bg-[#0070FF]"
                    : ["date", "time", "details"].indexOf(step) > i
                    ? "bg-[#0070FF]/60"
                    : "bg-white/10"
                }`}
              />
              {i < 2 && <div className="w-8 h-px bg-white/10" />}
            </div>
          ))}
          <span className="ml-3 text-xs text-white/40 uppercase tracking-widest">
            {step === "date" ? "Select Date" : step === "time" ? "Select Time" : "Your Details"}
          </span>
        </div>
      )}

      {/* STEP 1: Date */}
      {step === "date" && (
        <div>
          <div className="flex items-center gap-3 mb-6">
            <div className="w-8 h-8 rounded-lg bg-[#0070FF]/10 border border-[#0070FF]/30 flex items-center justify-center">
              <Calendar size={16} className="text-[#0070FF]" />
            </div>
            <div>
              <p className="text-[11px] font-bold uppercase tracking-widest text-[#0070FF]">Step 1</p>
              <h3 className="text-white font-semibold text-lg leading-tight">Choose a date</h3>
            </div>
          </div>
          <div className="grid grid-cols-5 gap-2">
            {dates.map((d) => (
              <button
                key={d.value}
                onClick={() => setSelectedDate(d)}
                className={`flex flex-col items-center py-4 px-2 rounded-xl border transition-all duration-200 ${
                  selectedDate?.value === d.value
                    ? "border-[#0070FF] bg-[#0070FF]/10 shadow-[0_0_20px_rgba(0,112,255,0.15)]"
                    : "border-white/10 bg-white/[0.02] hover:border-[#0070FF]/40 hover:bg-white/5"
                }`}
              >
                <span className="text-[10px] font-bold uppercase tracking-widest text-white/40 mb-1">
                  {d.dayName}
                </span>
                <span className="text-2xl font-bold text-white leading-none mb-1">{d.dayNum}</span>
                <span className="text-[10px] text-white/40">{d.monthName}</span>
              </button>
            ))}
          </div>
          {loadingSlots && (
            <div className="flex items-center gap-2 mt-6 text-white/40 text-sm">
              <Loader2 size={14} className="animate-spin" />
              Checking availability…
            </div>
          )}
        </div>
      )}

      {/* STEP 2: Time */}
      {step === "time" && selectedDate && (
        <div>
          <div className="flex items-center gap-3 mb-6">
            <div className="w-8 h-8 rounded-lg bg-[#0070FF]/10 border border-[#0070FF]/30 flex items-center justify-center">
              <Clock size={16} className="text-[#0070FF]" />
            </div>
            <div>
              <p className="text-[11px] font-bold uppercase tracking-widest text-[#0070FF]">Step 2</p>
              <h3 className="text-white font-semibold text-lg leading-tight">
                {selectedDate.dayName} {selectedDate.dayNum} {selectedDate.monthName} — pick a time
              </h3>
            </div>
          </div>

          {loadingSlots ? (
            <div className="grid grid-cols-4 gap-2">
              {Array.from({ length: 16 }).map((_, i) => (
                <div key={i} className="h-12 rounded-xl bg-white/5 animate-pulse" />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-4 gap-2">
              {slots.map((slot) => (
                <button
                  key={slot.time}
                  disabled={!slot.available}
                  onClick={() => {
                    setSelectedSlot(slot);
                    setStep("details");
                  }}
                  className={`py-3 px-2 rounded-xl border text-sm font-semibold transition-all duration-200 ${
                    !slot.available
                      ? "border-white/5 bg-white/[0.02] text-white/20 cursor-not-allowed"
                      : selectedSlot?.time === slot.time
                      ? "border-[#0070FF] bg-[#0070FF]/10 text-[#0070FF]"
                      : "border-white/10 bg-white/[0.02] text-white hover:border-[#0070FF]/50 hover:bg-[#0070FF]/5 hover:text-[#0070FF]"
                  }`}
                >
                  {slot.available ? slot.displayTime : (
                    <span className="line-through opacity-40">{slot.displayTime}</span>
                  )}
                </button>
              ))}
            </div>
          )}

          <button
            onClick={() => { setStep("date"); setSelectedSlot(null); }}
            className="mt-6 text-sm text-white/40 hover:text-white/70 transition-colors"
          >
            ← Change date
          </button>
        </div>
      )}

      {/* STEP 3: Details */}
      {step === "details" && selectedSlot && selectedDate && (
        <div>
          <div className="flex items-center gap-3 mb-6">
            <div className="w-8 h-8 rounded-lg bg-[#0070FF]/10 border border-[#0070FF]/30 flex items-center justify-center">
              <ChevronRight size={16} className="text-[#0070FF]" />
            </div>
            <div>
              <p className="text-[11px] font-bold uppercase tracking-widest text-[#0070FF]">Step 3</p>
              <h3 className="text-white font-semibold text-lg leading-tight">Your details</h3>
            </div>
          </div>

          {/* Selected slot summary */}
          <div className="flex items-center gap-3 p-3 rounded-xl bg-[#0070FF]/5 border border-[#0070FF]/20 mb-6">
            <Clock size={14} className="text-[#0070FF] shrink-0" />
            <span className="text-sm text-white/70">
              {selectedDate.dayName} {selectedDate.dayNum} {selectedDate.monthName} &middot;{" "}
              <strong className="text-white">{selectedSlot.displayTime} GMT</strong> &middot; 30 min
            </span>
            <button
              onClick={() => { setStep("time"); setSelectedSlot(null); }}
              className="ml-auto text-[11px] text-[#0070FF] hover:text-white transition-colors"
            >
              Change
            </button>
          </div>

          <form onSubmit={handleConfirm} className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-medium text-white/50 mb-1.5">
                  Full Name <span className="text-red-400">*</span>
                </label>
                <input
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Alex Johnson"
                  className="w-full px-3 py-2.5 rounded-lg bg-white/5 border border-white/10 text-white text-sm placeholder-white/20 focus:outline-none focus:border-[#0070FF]/60 transition"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-white/50 mb-1.5">Company</label>
                <input
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                  placeholder="Acme Bank"
                  className="w-full px-3 py-2.5 rounded-lg bg-white/5 border border-white/10 text-white text-sm placeholder-white/20 focus:outline-none focus:border-[#0070FF]/60 transition"
                />
              </div>
            </div>
            <div>
              <label className="block text-xs font-medium text-white/50 mb-1.5">
                Work Email <span className="text-red-400">*</span>
              </label>
              <input
                required
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="alex@acmebank.com"
                className="w-full px-3 py-2.5 rounded-lg bg-white/5 border border-white/10 text-white text-sm placeholder-white/20 focus:outline-none focus:border-[#0070FF]/60 transition"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-white/50 mb-1.5">
                What would you like to discuss?
              </label>
              <div className="grid grid-cols-1 gap-1.5">
                {TOPICS.map((t) => (
                  <button
                    key={t}
                    type="button"
                    onClick={() => setTopic(t)}
                    className={`flex items-center gap-2 px-3 py-2.5 rounded-lg border text-left text-sm transition-all ${
                      topic === t
                        ? "border-[#0070FF]/60 bg-[#0070FF]/10 text-white"
                        : "border-white/10 bg-white/[0.02] text-white/50 hover:border-white/20 hover:text-white/70"
                    }`}
                  >
                    <span
                      className={`w-3.5 h-3.5 rounded-full border shrink-0 flex items-center justify-center ${
                        topic === t ? "border-[#0070FF] bg-[#0070FF]" : "border-white/20"
                      }`}
                    >
                      {topic === t && <span className="w-1.5 h-1.5 rounded-full bg-white" />}
                    </span>
                    {t}
                  </button>
                ))}
              </div>
            </div>

            {error && (
              <div className="flex items-start gap-2 p-3 rounded-lg bg-red-500/10 border border-red-500/20">
                <AlertCircle size={14} className="text-red-400 mt-0.5 shrink-0" />
                <p className="text-sm text-red-300">{error}</p>
              </div>
            )}

            <button
              type="submit"
              disabled={submitting || !name || !email}
              className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl text-sm font-bold text-white bg-[#0070FF] hover:bg-[#0056cc] disabled:opacity-50 disabled:cursor-not-allowed transition-all"
            >
              {submitting ? (
                <>
                  <Loader2 size={14} className="animate-spin" />
                  Confirming your slot…
                </>
              ) : (
                <>
                  Confirm Discovery Call
                  <ChevronRight size={15} />
                </>
              )}
            </button>
            <p className="text-center text-xs text-white/30">
              Google Meet link sent to your email immediately · No charge
            </p>
          </form>
        </div>
      )}

      {/* STEP 4: Confirmed */}
      {step === "confirmed" && confirmed && (
        <div className="text-center">
          <div className="w-16 h-16 rounded-2xl bg-[#0070FF]/10 border border-[#0070FF]/30 flex items-center justify-center mx-auto mb-6">
            <CheckCircle size={28} className="text-[#0070FF]" />
          </div>
          <h3 className="text-2xl font-bold text-white mb-2">Discovery Call Confirmed</h3>
          <p className="text-white/50 text-sm mb-8">Check your inbox — a confirmation is on its way.</p>

          <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-6 mb-6 text-left">
            <div className="flex items-center gap-3 mb-4">
              <Calendar size={16} className="text-[#0070FF]" />
              <div>
                <p className="text-white font-semibold">{confirmed.displayDate}</p>
                <p className="text-white/50 text-sm">{confirmed.displayTime} GMT &middot; 30 minutes</p>
              </div>
            </div>
            <a
              href={confirmed.meetLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-[#0070FF] hover:bg-[#0056cc] text-white text-sm font-bold transition-colors"
            >
              <Video size={15} />
              Join Google Meet
            </a>
          </div>

          {onClose && (
            <button
              onClick={onClose}
              className="text-sm text-white/40 hover:text-white/70 transition-colors"
            >
              Close
            </button>
          )}
        </div>
      )}
    </div>
  );
}
