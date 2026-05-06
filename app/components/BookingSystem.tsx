"use client";

import { useState } from "react";
import { CheckCircle, ArrowRight, Bot, Briefcase, GraduationCap } from "lucide-react";

const INQUIRY_TYPES = [
  { value: "Banking AI Agents", icon: <Bot size={15} className="text-emerald-500" />, desc: "L1/L2 support automation for financial services" },
  { value: "Retail AI Agents", icon: <Bot size={15} className="text-emerald-500" />, desc: "Order, inventory and customer support agents" },
  { value: "IT Staffing & Consultation", icon: <Briefcase size={15} className="text-emerald-500" />, desc: "Resourcing brief or technology advisory" },
  { value: "Talent Programme", icon: <GraduationCap size={15} className="text-emerald-500" />, desc: "Training, internships or placement partnerships" },
];

const SLOT_OPTIONS = [
  "Monday – Friday, 9am – 12pm GMT",
  "Monday – Friday, 12pm – 3pm GMT",
  "Monday – Friday, 3pm – 6pm GMT",
  "Evenings (6pm – 8pm GMT)",
  "Flexible — any time works",
];

interface BookingSystemProps {
  defaultInquiry?: string;
  title?: string;
  subtitle?: string;
}

export default function BookingSystem({
  defaultInquiry,
  title = "Schedule a Technical Demo",
  subtitle = "Select your industry vertical to speak with a relevant solution architect.",
}: BookingSystemProps) {
  const [inquiryType, setInquiryType] = useState(defaultInquiry ?? "");
  const [selectedSlots, setSelectedSlots] = useState<string[]>([]);
  const [status, setStatus] = useState<"idle" | "sending" | "done" | "error">("idle");

  function toggleSlot(slot: string) {
    setSelectedSlots((prev) =>
      prev.includes(slot) ? prev.filter((s) => s !== slot) : [...prev, slot]
    );
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!inquiryType) return;
    setStatus("sending");

    const form = e.currentTarget;
    const data = {
      name: (form.elements.namedItem("name") as HTMLInputElement).value,
      company: (form.elements.namedItem("company") as HTMLInputElement).value,
      email: (form.elements.namedItem("email") as HTMLInputElement).value,
      phone: (form.elements.namedItem("phone") as HTMLInputElement).value,
      inquiryType,
      slots: selectedSlots.join("\n") || "Flexible",
      message: (form.elements.namedItem("message") as HTMLTextAreaElement).value,
    };

    try {
      const res = await fetch("/api/book", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      setStatus(res.ok ? "done" : "error");
    } catch {
      setStatus("error");
    }
  }

  if (status === "done") {
    return (
      <div className="bg-[#0d2137] rounded-2xl border border-emerald-500/30 p-12 text-center">
        <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center mx-auto mb-5">
          <CheckCircle size={28} className="text-emerald-400" />
        </div>
        <h3 className="text-xl font-bold text-white mb-2">Demo Request Confirmed</h3>
        <p className="text-slate-400 text-sm leading-relaxed max-w-sm mx-auto">
          Check your inbox — a confirmation is on its way. We&apos;ll reply within 1 business day with your calendar invite and Google Meet link.
        </p>
        <p className="text-slate-500 text-xs mt-4">
          Upon completion of the demo, your Production Ready Report will be available in the{" "}
          <a href="/portal" className="text-emerald-400 hover:underline">Supracloud Client Portal</a>.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-[#0d2137] rounded-2xl border border-slate-700/60 p-8 shadow-2xl">
      <div className="mb-6">
        <h3 className="text-2xl font-extrabold text-white mb-1">{title}</h3>
        <p className="text-slate-400 text-sm">{subtitle}</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Inquiry type selector */}
        <div>
          <label className="block text-xs font-semibold uppercase tracking-widest text-slate-400 mb-2.5">
            Industry vertical <span className="text-red-400">*</span>
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {INQUIRY_TYPES.map((t) => (
              <button
                key={t.value}
                type="button"
                onClick={() => setInquiryType(t.value)}
                className={`flex items-start gap-2.5 p-3 rounded-xl border-2 text-left transition-all ${
                  inquiryType === t.value
                    ? "border-emerald-500 bg-emerald-500/10"
                    : "border-slate-700 hover:border-emerald-600/50 hover:bg-white/5"
                }`}
              >
                <span className="mt-0.5 shrink-0">{t.icon}</span>
                <span>
                  <span className="block text-sm font-semibold text-white">{t.value}</span>
                  <span className="block text-xs text-slate-400 mt-0.5 leading-snug">{t.desc}</span>
                </span>
                {inquiryType === t.value && (
                  <CheckCircle size={14} className="text-emerald-400 ml-auto shrink-0 mt-0.5" />
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Contact details */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-medium text-slate-400 mb-1.5">
              Full Name <span className="text-red-400">*</span>
            </label>
            <input
              name="name"
              required
              className="w-full px-3 py-2.5 rounded-lg bg-slate-900 border border-slate-700 text-white text-sm placeholder-slate-500 focus:outline-none focus:border-emerald-500 transition"
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-slate-400 mb-1.5">Company / Organisation</label>
            <input
              name="company"
              className="w-full px-3 py-2.5 rounded-lg bg-slate-900 border border-slate-700 text-white text-sm placeholder-slate-500 focus:outline-none focus:border-emerald-500 transition"
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-slate-400 mb-1.5">
              Corporate Email <span className="text-red-400">*</span>
            </label>
            <input
              name="email"
              type="email"
              required
              className="w-full px-3 py-2.5 rounded-lg bg-slate-900 border border-slate-700 text-white text-sm placeholder-slate-500 focus:outline-none focus:border-emerald-500 transition"
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-slate-400 mb-1.5">Phone (optional)</label>
            <input
              name="phone"
              type="tel"
              className="w-full px-3 py-2.5 rounded-lg bg-slate-900 border border-slate-700 text-white text-sm placeholder-slate-500 focus:outline-none focus:border-emerald-500 transition"
            />
          </div>
        </div>

        {/* Time slots */}
        <div>
          <label className="block text-xs font-medium text-slate-400 mb-2">
            Preferred availability <span className="text-slate-500">(select all that apply)</span>
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
            {SLOT_OPTIONS.map((slot) => {
              const active = selectedSlots.includes(slot);
              return (
                <button
                  key={slot}
                  type="button"
                  onClick={() => toggleSlot(slot)}
                  className={`flex items-center gap-2 px-3 py-2 rounded-lg border text-left text-sm transition-all ${
                    active
                      ? "border-emerald-500 bg-emerald-500/10 text-emerald-300"
                      : "border-slate-700 text-slate-400 hover:border-emerald-600/50 hover:bg-white/5"
                  }`}
                >
                  <span
                    className={`w-3.5 h-3.5 rounded border flex items-center justify-center shrink-0 ${
                      active ? "bg-emerald-500 border-emerald-500" : "border-slate-600"
                    }`}
                  >
                    {active && <CheckCircle size={10} className="text-white" />}
                  </span>
                  {slot}
                </button>
              );
            })}
          </div>
        </div>

        {/* Message */}
        <div>
          <label className="block text-xs font-medium text-slate-400 mb-1.5">
            Briefly describe your requirements
          </label>
          <textarea
            name="message"
            rows={3}
            placeholder="e.g. We need to automate ~3,000 L1 queries/month. Currently using Zendesk. 3-month target timeline..."
            className="w-full px-3 py-2.5 rounded-lg bg-slate-900 border border-slate-700 text-white text-sm placeholder-slate-500 focus:outline-none focus:border-emerald-500 transition resize-none"
          />
        </div>

        {status === "error" && (
          <p className="text-sm text-red-400">
            Something went wrong — please try again or email{" "}
            <a href="mailto:rk@supracloud.co.uk" className="underline">
              rk@supracloud.co.uk
            </a>
            .
          </p>
        )}

        <button
          type="submit"
          disabled={status === "sending" || !inquiryType}
          className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl text-sm font-bold text-white bg-emerald-500 hover:bg-emerald-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {status === "sending" ? (
            "Securing Slot…"
          ) : (
            <>
              Book Industry Demo <ArrowRight size={15} />
            </>
          )}
        </button>

        <p className="text-xs text-center text-slate-500">
          Confirmation email sent immediately &middot; Calendar invite within 1 business day
        </p>
      </form>
    </div>
  );
}
