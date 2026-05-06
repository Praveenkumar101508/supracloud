"use client";

import { useState } from "react";
import { CheckCircle, Clock, MessageCircle, Mail, ArrowRight, Bot, Briefcase, GraduationCap, Send } from "lucide-react";

const INQUIRY_TYPES = [
  { value: "AI Agent Development", icon: <Bot size={15} className="text-emerald-500" />, desc: "Banking or retail support automation" },
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

const PREP_ITEMS = [
  "Your current support workflows and pain points",
  "Volume, complexity, and escalation patterns",
  "Existing systems and integration requirements",
  "Timeline and any compliance constraints",
];

export default function BookPage() {
  const [inquiryType, setInquiryType] = useState("");
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

  return (
    <div className="bg-slate-50">
      {/* ── HEADER ── */}
      <section style={{ backgroundColor: "#0A192F" }} className="relative py-20 text-center overflow-hidden">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-[0.035]"
          style={{
            backgroundImage:
              "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)",
            backgroundSize: "48px 48px",
          }}
        />
        <div className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="inline-block mb-5 text-xs font-semibold tracking-widest uppercase text-emerald-400 border border-emerald-700/50 rounded-full px-3 py-1.5">
            Discovery Call
          </p>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white mb-4">
            Book a Discovery Call
          </h1>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto leading-relaxed">
            Fill in the form below. We&apos;ll confirm your slot within 1 business day
            and send a calendar invite with a video conference link directly to your inbox.
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-5 gap-12 items-start">

          {/* ── LEFT SIDEBAR ── */}
          <div className="lg:col-span-2 space-y-7">
            <div className="flex items-center gap-2">
              <Clock size={15} className="text-emerald-500" />
              <p className="text-sm font-semibold text-gray-700">30 minutes · Remote · No obligation</p>
            </div>

            {/* What to bring */}
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-3">What to bring</p>
              <ul className="space-y-3">
                {PREP_ITEMS.map((item) => (
                  <li key={item} className="flex items-start gap-2.5 text-sm text-gray-600">
                    <CheckCircle size={14} className="text-emerald-500 mt-0.5 shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* What you'll get */}
            <div className="bg-white rounded-xl border border-slate-100 shadow-sm p-5 space-y-4">
              <p className="text-xs font-semibold uppercase tracking-widest text-gray-400">What happens next</p>
              {[
                { n: "1", title: "Confirmation within 1 business day", desc: "We&apos;ll confirm your slot and send a calendar invite with a Google Meet link." },
                { n: "2", title: "30-min discovery call", desc: "We review your requirements and scope a solution — no hard sell." },
                { n: "3", title: "Written summary", desc: "You receive recommended next steps in writing after the call." },
              ].map((s) => (
                <div key={s.n} className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-emerald-500 flex items-center justify-center text-white text-xs font-bold shrink-0">
                    {s.n}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-900">{s.title}</p>
                    <p className="text-xs text-gray-500 mt-0.5 leading-relaxed" dangerouslySetInnerHTML={{ __html: s.desc }} />
                  </div>
                </div>
              ))}
            </div>

            {/* Direct contact */}
            <div className="p-5 rounded-xl bg-slate-100 border border-slate-200">
              <p className="text-xs font-semibold text-gray-700 mb-3">Prefer to reach out directly?</p>
              <div className="space-y-2">
                <a href="mailto:rk@supracloud.co.uk" className="flex items-center gap-2 text-sm text-gray-600 hover:text-emerald-600 transition-colors">
                  <Mail size={13} className="text-emerald-500 shrink-0" /> rk@supracloud.co.uk
                </a>
                <a href="https://wa.me/447776456694" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm text-gray-600 hover:text-emerald-600 transition-colors">
                  <MessageCircle size={13} className="text-emerald-500 shrink-0" /> +44 7776 456694 (WhatsApp)
                </a>
              </div>
            </div>
          </div>

          {/* ── FORM ── */}
          <div className="lg:col-span-3">
            {status === "done" ? (
              <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-12 text-center">
                <div className="w-16 h-16 rounded-full bg-emerald-50 border border-emerald-200 flex items-center justify-center mx-auto mb-5">
                  <CheckCircle size={28} className="text-emerald-600" />
                </div>
                <h2 className="text-xl font-bold text-gray-900 mb-2">Request received!</h2>
                <p className="text-gray-500 text-sm leading-relaxed max-w-sm mx-auto">
                  Check your inbox — a confirmation email is on its way. We&apos;ll reply within 1 business day with your calendar invite and video link.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="bg-white rounded-2xl border border-slate-200 shadow-sm p-8 space-y-7">

                {/* Inquiry type */}
                <div>
                  <label className="block text-sm font-semibold text-gray-800 mb-3">
                    What is this call about? <span className="text-red-500">*</span>
                  </label>
                  <div className="space-y-2.5">
                    {INQUIRY_TYPES.map((t) => (
                      <button
                        key={t.value}
                        type="button"
                        onClick={() => setInquiryType(t.value)}
                        className={`w-full flex items-start gap-3 p-4 rounded-xl border-2 text-left transition-all ${
                          inquiryType === t.value
                            ? "border-emerald-500 bg-emerald-50"
                            : "border-slate-200 hover:border-emerald-200 hover:bg-slate-50"
                        }`}
                      >
                        <span className="mt-0.5">{t.icon}</span>
                        <span>
                          <span className="block text-sm font-semibold text-gray-900">{t.value}</span>
                          <span className="block text-xs text-gray-500 mt-0.5">{t.desc}</span>
                        </span>
                        {inquiryType === t.value && (
                          <CheckCircle size={16} className="text-emerald-500 ml-auto shrink-0 mt-0.5" />
                        )}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Contact details */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Your Name <span className="text-red-500">*</span></label>
                    <input name="name" required className="w-full px-4 py-2.5 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-400" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Company / Organisation</label>
                    <input name="company" className="w-full px-4 py-2.5 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-400" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Email <span className="text-red-500">*</span></label>
                    <input name="email" type="email" required className="w-full px-4 py-2.5 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-400" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Phone (optional)</label>
                    <input name="phone" type="tel" className="w-full px-4 py-2.5 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-400" />
                  </div>
                </div>

                {/* Preferred time slots */}
                <div>
                  <label className="block text-sm font-semibold text-gray-800 mb-1">
                    Preferred availability <span className="text-gray-400 font-normal">(select all that apply)</span>
                  </label>
                  <p className="text-xs text-gray-400 mb-3">We&apos;ll match your slot and send a calendar invite.</p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {SLOT_OPTIONS.map((slot) => {
                      const active = selectedSlots.includes(slot);
                      return (
                        <button
                          key={slot}
                          type="button"
                          onClick={() => toggleSlot(slot)}
                          className={`flex items-center gap-2 px-3 py-2.5 rounded-lg border text-left text-sm transition-all ${
                            active
                              ? "border-emerald-500 bg-emerald-50 text-emerald-800 font-medium"
                              : "border-slate-200 text-gray-600 hover:border-emerald-200 hover:bg-slate-50"
                          }`}
                        >
                          <span className={`w-4 h-4 rounded border flex items-center justify-center shrink-0 ${active ? "bg-emerald-500 border-emerald-500" : "border-slate-300"}`}>
                            {active && <CheckCircle size={11} className="text-white" />}
                          </span>
                          {slot}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Brief description */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Briefly describe your requirements</label>
                  <textarea
                    name="message"
                    rows={4}
                    placeholder="e.g. We need a banking AI agent to handle ~3,000 L1 queries/month. Currently using Zendesk. Looking for a 3-month delivery timeline..."
                    className="w-full px-4 py-2.5 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-400 resize-none"
                  />
                </div>

                {status === "error" && (
                  <p className="text-sm text-red-500">
                    Something went wrong — please try again or email us at{" "}
                    <a href="mailto:rk@supracloud.co.uk" className="underline">rk@supracloud.co.uk</a>.
                  </p>
                )}

                <button
                  type="submit"
                  disabled={status === "sending" || !inquiryType}
                  className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl text-sm font-semibold text-white bg-emerald-500 hover:bg-emerald-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  {status === "sending" ? (
                    "Sending…"
                  ) : (
                    <>
                      Request Discovery Call <ArrowRight size={15} />
                    </>
                  )}
                </button>

                <p className="text-xs text-center text-slate-400">
                  You&apos;ll receive a confirmation email immediately. Calendar invite follows within 1 business day.
                </p>
              </form>
            )}
          </div>

        </div>
      </section>
    </div>
  );
}
