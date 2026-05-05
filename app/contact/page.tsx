"use client";

import type { Metadata } from "next";
import { useState } from "react";
import { Mail, MessageCircle, Clock } from "lucide-react";

// Note: Metadata export doesn't work with "use client" — meta is set in layout via generateMetadata or a wrapper.
// For simplicity the page is client-only for form state; title is handled by the template in layout.tsx.

type FormType = "candidate" | "business";

function CandidateForm() {
  const [status, setStatus] = useState<"idle" | "sending" | "done" | "error">("idle");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");
    const form = e.currentTarget;
    const data = {
      formType: "candidate",
      name: (form.elements.namedItem("name") as HTMLInputElement).value,
      email: (form.elements.namedItem("email") as HTMLInputElement).value,
      currentRole: (form.elements.namedItem("currentRole") as HTMLInputElement).value,
      targetRole: (form.elements.namedItem("targetRole") as HTMLInputElement).value,
      message: (form.elements.namedItem("message") as HTMLTextAreaElement).value,
    };
    try {
      const res = await fetch("/api/contact", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data) });
      setStatus(res.ok ? "done" : "error");
    } catch {
      setStatus("error");
    }
  }

  if (status === "done") {
    return (
      <div className="text-center py-12">
        <div className="text-4xl mb-4">✓</div>
        <p className="text-lg font-semibold text-gray-900">Message sent!</p>
        <p className="text-sm text-gray-500 mt-2">We&apos;ll be in touch within 1 business day.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
        <input name="name" required className="w-full px-4 py-2.5 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-400" />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
        <input name="email" type="email" required className="w-full px-4 py-2.5 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-400" />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Current Role</label>
        <input name="currentRole" placeholder="e.g. Junior Data Analyst" className="w-full px-4 py-2.5 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-400" />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Target Role</label>
        <input name="targetRole" placeholder="e.g. Senior Data Engineer" className="w-full px-4 py-2.5 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-400" />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
        <textarea name="message" rows={5} placeholder="Tell us where you are and what you're looking for" className="w-full px-4 py-2.5 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-400 resize-none" />
      </div>
      {status === "error" && <p className="text-sm text-red-500">Something went wrong. Please try again or email us directly.</p>}
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

function BusinessForm() {
  const [status, setStatus] = useState<"idle" | "sending" | "done" | "error">("idle");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");
    const form = e.currentTarget;
    const data = {
      formType: "business",
      company: (form.elements.namedItem("company") as HTMLInputElement).value,
      name: (form.elements.namedItem("name") as HTMLInputElement).value,
      email: (form.elements.namedItem("email") as HTMLInputElement).value,
      service: (form.elements.namedItem("service") as HTMLSelectElement).value,
      requirements: (form.elements.namedItem("requirements") as HTMLTextAreaElement).value,
    };
    try {
      const res = await fetch("/api/contact", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data) });
      setStatus(res.ok ? "done" : "error");
    } catch {
      setStatus("error");
    }
  }

  if (status === "done") {
    return (
      <div className="text-center py-12">
        <div className="text-4xl mb-4">✓</div>
        <p className="text-lg font-semibold text-gray-900">Brief received!</p>
        <p className="text-sm text-gray-500 mt-2">We&apos;ll be in touch within 1 business day.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Company Name</label>
        <input name="company" required className="w-full px-4 py-2.5 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-400" />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Your Name</label>
        <input name="name" required className="w-full px-4 py-2.5 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-400" />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
        <input name="email" type="email" required className="w-full px-4 py-2.5 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-400" />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Service Interest</label>
        <select name="service" required className="w-full px-4 py-2.5 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-400 bg-white">
          <option value="">Select a service…</option>
          <option value="AI Agent Development">AI Agent Development</option>
          <option value="IT Staffing">IT Staffing</option>
          <option value="IT Consultation">IT Consultation</option>
          <option value="Other">Other</option>
        </select>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Tell us about your requirements</label>
        <textarea name="requirements" rows={5} className="w-full px-4 py-2.5 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-400 resize-none" />
      </div>
      {status === "error" && <p className="text-sm text-red-500">Something went wrong. Please try again or email us directly.</p>}
      <button
        type="submit"
        disabled={status === "sending"}
        className="w-full py-3 rounded-lg text-sm font-semibold text-white bg-emerald-500 hover:bg-emerald-600 disabled:opacity-60 transition-colors"
      >
        {status === "sending" ? "Sending…" : "Submit Brief"}
      </button>
    </form>
  );
}

export default function ContactPage() {
  const [activeTab, setActiveTab] = useState<FormType>("candidate");

  return (
    <div className="bg-slate-50">
      {/* ── HEADER ── */}
      <section style={{ backgroundColor: "#0A192F" }} className="py-20 text-center">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="inline-block mb-4 text-xs font-semibold tracking-widest uppercase text-emerald-400 border border-emerald-700 rounded-full px-3 py-1">
            Get in Touch
          </p>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white">Contact SupraCloud</h1>
          <p className="mt-4 text-slate-300 text-lg max-w-xl mx-auto">
            Whether you&apos;re a candidate looking to accelerate your career or a business that needs AI agents or IT services.
          </p>
        </div>
      </section>

      {/* ── FORMS ── */}
      <section className="py-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Tab switcher (mobile) */}
          <div className="flex rounded-lg border border-slate-200 overflow-hidden mb-10 md:hidden">
            <button
              onClick={() => setActiveTab("candidate")}
              className={`flex-1 py-3 text-sm font-semibold transition-colors ${activeTab === "candidate" ? "bg-emerald-500 text-white" : "bg-white text-gray-600 hover:bg-slate-50"}`}
            >
              For Candidates
            </button>
            <button
              onClick={() => setActiveTab("business")}
              className={`flex-1 py-3 text-sm font-semibold transition-colors ${activeTab === "business" ? "bg-emerald-500 text-white" : "bg-white text-gray-600 hover:bg-slate-50"}`}
            >
              For Businesses
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {/* Candidate form */}
            <div className={`bg-white rounded-xl p-8 border border-slate-200 shadow-sm ${activeTab !== "candidate" ? "hidden md:block" : ""}`}>
              <h2 className="text-xl font-bold text-gray-900 mb-2">For Candidates</h2>
              <p className="text-sm text-gray-500 mb-6">Apply or ask a question about our programmes.</p>
              <CandidateForm />
            </div>

            {/* Business form */}
            <div className={`bg-white rounded-xl p-8 border border-slate-200 shadow-sm ${activeTab !== "business" ? "hidden md:block" : ""}`}>
              <h2 className="text-xl font-bold text-gray-900 mb-2">For Businesses</h2>
              <p className="text-sm text-gray-500 mb-6">Submit a brief for AI agents, IT staffing or consultation.</p>
              <BusinessForm />
            </div>
          </div>

          {/* Direct contact strip */}
          <div className="mt-12 bg-white rounded-xl p-8 border border-slate-100 shadow-sm">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
              <div className="flex flex-col sm:flex-row gap-6">
                <a href="mailto:rk@supracloud.co.uk" className="flex items-center gap-2 text-sm text-gray-600 hover:text-emerald-600 transition-colors">
                  <Mail size={16} className="text-emerald-500" />
                  rk@supracloud.co.uk
                </a>
                <a href="https://wa.me/447776456694" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm text-gray-600 hover:text-emerald-600 transition-colors">
                  <MessageCircle size={16} className="text-emerald-500" />
                  +44 7776456694 (WhatsApp)
                </a>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-400">
                <Clock size={14} />
                We respond within 1 business day.
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
