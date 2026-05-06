"use client";

import { useState } from "react";
import { Mail, MessageCircle, Clock, Bot, Briefcase, GraduationCap, Handshake } from "lucide-react";

type InquiryType = "client" | "partnership" | "talent" | "";

const INQUIRY_OPTIONS: { value: InquiryType; label: string; icon: React.ReactNode; desc: string }[] = [
  { value: "client", label: "Enterprise Client", icon: <Bot size={16} className="text-emerald-500" />, desc: "AI agents or IT services for your organisation" },
  { value: "partnership", label: "Partnership", icon: <Handshake size={16} className="text-emerald-500" />, desc: "Placement year schemes or strategic collaboration" },
  { value: "talent", label: "Talent Programme", icon: <GraduationCap size={16} className="text-emerald-500" />, desc: "Training, internships or staffing enquiries" },
];

const SERVICE_OPTIONS: Record<string, string[]> = {
  client: [
    "Banking AI Agent Development",
    "Retail AI Agent Development",
    "IT Staffing & Resource Outsourcing",
    "Enterprise IT Consultation",
    "Other",
  ],
  partnership: [
    "Placement Year Partnership",
    "University Collaboration",
    "Strategic Partnership",
    "Other",
  ],
  talent: [
    "Industry Training Programme",
    "Graduate Internship",
    "Career Transition Support",
    "Other",
  ],
};

function ContactForm({ inquiryType }: { inquiryType: InquiryType }) {
  const [status, setStatus] = useState<"idle" | "sending" | "done" | "error">("idle");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");
    const form = e.currentTarget;
    const data = {
      inquiryType,
      name: (form.elements.namedItem("name") as HTMLInputElement)?.value,
      company: (form.elements.namedItem("company") as HTMLInputElement)?.value,
      email: (form.elements.namedItem("email") as HTMLInputElement)?.value,
      phone: (form.elements.namedItem("phone") as HTMLInputElement)?.value,
      service: (form.elements.namedItem("service") as HTMLSelectElement)?.value,
      message: (form.elements.namedItem("message") as HTMLTextAreaElement)?.value,
    };
    try {
      const res = await fetch("/api/contact", {
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
      <div className="text-center py-14">
        <div className="w-14 h-14 rounded-full bg-emerald-50 border border-emerald-200 flex items-center justify-center mx-auto mb-4">
          <span className="text-emerald-600 text-2xl font-bold">✓</span>
        </div>
        <p className="text-lg font-bold text-gray-900">Message received.</p>
        <p className="text-sm text-gray-500 mt-2">We&apos;ll respond within 1 business day.</p>
      </div>
    );
  }

  const serviceOptions = inquiryType ? SERVICE_OPTIONS[inquiryType] : [];
  const isClientOrPartnership = inquiryType === "client" || inquiryType === "partnership";

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Your Name *</label>
          <input name="name" required className="w-full px-4 py-2.5 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-400" />
        </div>
        {isClientOrPartnership && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Company / Organisation</label>
            <input name="company" className="w-full px-4 py-2.5 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-400" />
          </div>
        )}
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Email *</label>
          <input name="email" type="email" required className="w-full px-4 py-2.5 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-400" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Phone (optional)</label>
          <input name="phone" type="tel" className="w-full px-4 py-2.5 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-400" />
        </div>
      </div>
      {serviceOptions.length > 0 && (
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {isClientOrPartnership ? "Service / Interest *" : "Programme Interest *"}
          </label>
          <select name="service" required className="w-full px-4 py-2.5 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-400 bg-white">
            <option value="">Select an option…</option>
            {serviceOptions.map((opt) => (
              <option key={opt} value={opt}>{opt}</option>
            ))}
          </select>
        </div>
      )}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          {isClientOrPartnership ? "Describe your requirements *" : "Tell us about yourself *"}
        </label>
        <textarea
          name="message"
          required
          rows={5}
          placeholder={
            inquiryType === "client"
              ? "e.g. We need a banking AI agent to handle L1 customer support queries. We currently receive approx. 3,000 queries/month..."
              : inquiryType === "partnership"
              ? "e.g. We're a Russell Group university looking to place 10 Data Engineering students in Year 3..."
              : "e.g. I'm a recent Computer Science graduate interested in your ML Engineering internship..."
          }
          className="w-full px-4 py-2.5 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-400 resize-none"
        />
      </div>
      {status === "error" && (
        <p className="text-sm text-red-500">Something went wrong — please try again or email us directly.</p>
      )}
      <button
        type="submit"
        disabled={status === "sending"}
        className="w-full py-3 rounded-lg text-sm font-semibold text-white bg-emerald-500 hover:bg-emerald-600 disabled:opacity-60 transition-colors"
      >
        {status === "sending" ? "Sending…" : "Send Message"}
      </button>
    </form>
  );
}

export default function ContactPage() {
  const [inquiryType, setInquiryType] = useState<InquiryType>("");

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
          <p className="inline-flex items-center gap-2 mb-5 text-xs font-semibold tracking-widest uppercase text-emerald-400 border border-emerald-700/50 rounded-full px-3 py-1.5">
            <Briefcase size={11} /> Get in Touch
          </p>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white mb-4">Contact SupraCloud</h1>
          <p className="text-slate-400 text-lg max-w-xl mx-auto">
            Enterprise clients, potential partners, or talent programme enquiries — select your inquiry type below.
          </p>
        </div>
      </section>

      {/* ── INQUIRY TYPE SELECTOR ── */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-center text-sm font-semibold text-gray-700 mb-6">What best describes your enquiry?</p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
            {INQUIRY_OPTIONS.map((opt) => (
              <button
                key={opt.value}
                onClick={() => setInquiryType(opt.value)}
                className={`flex flex-col items-start gap-2 p-5 rounded-xl border-2 text-left transition-all ${
                  inquiryType === opt.value
                    ? "border-emerald-500 bg-emerald-50 shadow-sm"
                    : "border-slate-200 bg-white hover:border-emerald-300 hover:bg-slate-50"
                }`}
              >
                <div className="flex items-center gap-2">
                  {opt.icon}
                  <span className="font-semibold text-gray-900 text-sm">{opt.label}</span>
                </div>
                <p className="text-xs text-gray-500 leading-relaxed">{opt.desc}</p>
              </button>
            ))}
          </div>

          {/* Form */}
          {inquiryType ? (
            <div className="bg-white rounded-2xl p-8 border border-slate-200 shadow-sm">
              <div className="mb-6">
                <h2 className="text-xl font-bold text-gray-900">
                  {INQUIRY_OPTIONS.find((o) => o.value === inquiryType)?.label} Enquiry
                </h2>
                <p className="text-sm text-gray-500 mt-1">
                  {inquiryType === "client" && "Tell us about your organisation and what you&apos;re looking to build or resource."}
                  {inquiryType === "partnership" && "Tell us about your organisation and partnership proposal."}
                  {inquiryType === "talent" && "Tell us a bit about yourself and the programme you&apos;re interested in."}
                </p>
              </div>
              <ContactForm inquiryType={inquiryType} />
            </div>
          ) : (
            <div className="bg-white rounded-2xl p-12 border border-slate-200 shadow-sm text-center text-gray-400 text-sm">
              Select an inquiry type above to see the relevant form.
            </div>
          )}

          {/* Direct contact strip */}
          <div className="mt-10 bg-white rounded-xl p-6 border border-slate-100 shadow-sm">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex flex-col sm:flex-row gap-5">
                <a href="mailto:rk@supracloud.co.uk" className="flex items-center gap-2 text-sm text-gray-600 hover:text-emerald-600 transition-colors">
                  <Mail size={15} className="text-emerald-500" />
                  rk@supracloud.co.uk
                </a>
                <a href="https://wa.me/447776456694" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm text-gray-600 hover:text-emerald-600 transition-colors">
                  <MessageCircle size={15} className="text-emerald-500" />
                  +44 7776456694 (WhatsApp)
                </a>
              </div>
              <div className="flex items-center gap-2 text-xs text-gray-400">
                <Clock size={13} /> Respond within 1 business day
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
