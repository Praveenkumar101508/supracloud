"use client";

import { useState } from "react";
import Link from "next/link";
import { Mail, MessageCircle, MapPin, Clock, ArrowRight, Calendar } from "lucide-react";

export default function ContactForm() {
  const [status, setStatus] = useState("idle");

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus("sending");
    const form = e.currentTarget;
    const data = {
      formType: "contact",
      name: form.elements.namedItem("name")?.value,
      company: form.elements.namedItem("company")?.value,
      email: form.elements.namedItem("email")?.value,
      phone: form.elements.namedItem("phone")?.value,
      service: form.elements.namedItem("service")?.value,
      budget: form.elements.namedItem("budget")?.value,
      requirements: form.elements.namedItem("requirements")?.value,
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

  return (
    <div className="bg-slate-50">
      {/* Hero */}
      <section
        style={{ backgroundColor: "#0A192F" }}
        className="relative py-20 text-center overflow-hidden"
      >
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
            Get in Touch
          </p>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white mb-4">
            Start a Conversation
          </h1>
          <p className="text-slate-400 text-lg max-w-xl mx-auto">
            We respond within 1 business day.
          </p>
        </div>
      </section>

      {/* Main content */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            {/* Left — form */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-2xl p-8 border border-slate-200 shadow-sm">
                <h2 className="text-xl font-bold text-gray-900 mb-6">
                  Send us a message
                </h2>

                {status === "done" ? (
                  <div className="text-center py-14">
                    <div className="w-14 h-14 rounded-full bg-emerald-50 border border-emerald-200 flex items-center justify-center mx-auto mb-4">
                      <span className="text-emerald-600 text-2xl font-bold">✓</span>
                    </div>
                    <p className="text-lg font-bold text-gray-900">Message received.</p>
                    <p className="text-sm text-gray-500 mt-2">
                      We&apos;ll respond within 1 business day.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label
                          htmlFor="c-name"
                          className="block text-sm font-medium text-gray-700 mb-1"
                        >
                          Full name *
                        </label>
                        <input
                          id="c-name"
                          name="name"
                          required
                          className="w-full px-4 py-2.5 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-400"
                        />
                      </div>
                      <div>
                        <label
                          htmlFor="c-company"
                          className="block text-sm font-medium text-gray-700 mb-1"
                        >
                          Company *
                        </label>
                        <input
                          id="c-company"
                          name="company"
                          required
                          className="w-full px-4 py-2.5 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-400"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label
                          htmlFor="c-email"
                          className="block text-sm font-medium text-gray-700 mb-1"
                        >
                          Corporate email *
                        </label>
                        <input
                          id="c-email"
                          name="email"
                          type="email"
                          required
                          className="w-full px-4 py-2.5 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-400"
                        />
                      </div>
                      <div>
                        <label
                          htmlFor="c-phone"
                          className="block text-sm font-medium text-gray-700 mb-1"
                        >
                          Phone (optional)
                        </label>
                        <input
                          id="c-phone"
                          name="phone"
                          type="tel"
                          className="w-full px-4 py-2.5 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-400"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label
                          htmlFor="c-service"
                          className="block text-sm font-medium text-gray-700 mb-1"
                        >
                          Service interest *
                        </label>
                        <select
                          id="c-service"
                          name="service"
                          required
                          className="w-full px-4 py-2.5 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-400 bg-white"
                        >
                          <option value="">Select a service…</option>
                          <option value="Banking AI Agents">Banking AI Agents</option>
                          <option value="Supermarket AI Agents">Supermarket AI Agents</option>
                          <option value="IT Staffing">IT Staffing</option>
                          <option value="IT Consultation">IT Consultation</option>
                          <option value="Talent Programme">Talent Programme</option>
                          <option value="Other">Other</option>
                        </select>
                      </div>
                      <div>
                        <label
                          htmlFor="c-budget"
                          className="block text-sm font-medium text-gray-700 mb-1"
                        >
                          Budget range
                        </label>
                        <select
                          id="c-budget"
                          name="budget"
                          className="w-full px-4 py-2.5 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-400 bg-white"
                        >
                          <option value="">Prefer not to say</option>
                          <option value="Under £25k">Under £25k</option>
                          <option value="£25k–£100k">£25k–£100k</option>
                          <option value="£100k–£500k">£100k–£500k</option>
                          <option value="£500k+">£500k+</option>
                          <option value="Prefer not to say">Prefer not to say</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label
                        htmlFor="c-requirements"
                        className="block text-sm font-medium text-gray-700 mb-1"
                      >
                        Requirements *
                      </label>
                      <textarea
                        id="c-requirements"
                        name="requirements"
                        required
                        rows={5}
                        placeholder="Describe your project, challenge, or question. The more context you give us, the more useful our reply will be."
                        className="w-full px-4 py-2.5 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-400 resize-none"
                      />
                    </div>

                    {status === "error" && (
                      <p className="text-sm text-red-500">
                        Something went wrong — please try again or email us directly.
                      </p>
                    )}

                    <button
                      type="submit"
                      disabled={status === "sending"}
                      className="w-full py-3 rounded-lg text-sm font-semibold text-white bg-emerald-500 hover:bg-emerald-600 disabled:opacity-60 transition-colors"
                    >
                      {status === "sending" ? "Sending…" : "Send Message"}
                    </button>
                  </form>
                )}
              </div>
            </div>

            {/* Right — CTA card + contact details */}
            <div className="space-y-6">
              {/* Book a call card */}
              <div
                style={{ backgroundColor: "#0A192F" }}
                className="rounded-2xl p-7 border border-slate-700/60"
              >
                <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center mb-4">
                  <Calendar size={18} className="text-emerald-400" />
                </div>
                <h3 className="font-bold text-white mb-2">Book a Discovery Call</h3>
                <p className="text-slate-400 text-sm leading-relaxed mb-5">
                  Prefer to talk first? Book a 30-minute call with our team. We&apos;ll map
                  your workflows and tell you honestly what AI can achieve.
                </p>
                <Link
                  href="/book"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-semibold text-white bg-emerald-500 hover:bg-emerald-600 transition-colors w-full justify-center"
                >
                  Schedule a Call <ArrowRight size={13} />
                </Link>
              </div>

              {/* Contact details */}
              <div className="bg-white rounded-2xl p-7 border border-slate-200 shadow-sm space-y-4">
                <h3 className="font-bold text-gray-900 mb-4">Contact Details</h3>
                <a
                  href="mailto:rk@supracloud.co.uk"
                  className="flex items-center gap-3 text-sm text-gray-600 hover:text-emerald-600 transition-colors"
                >
                  <div className="w-8 h-8 rounded-lg bg-emerald-50 border border-emerald-100 flex items-center justify-center shrink-0">
                    <Mail size={14} className="text-emerald-600" />
                  </div>
                  rk@supracloud.co.uk
                </a>
                <a
                  href="https://wa.me/447776456694"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-sm text-gray-600 hover:text-emerald-600 transition-colors"
                >
                  <div className="w-8 h-8 rounded-lg bg-emerald-50 border border-emerald-100 flex items-center justify-center shrink-0">
                    <MessageCircle size={14} className="text-emerald-600" />
                  </div>
                  +44 7776 456694 (WhatsApp)
                </a>
                <div className="flex items-center gap-3 text-sm text-gray-600">
                  <div className="w-8 h-8 rounded-lg bg-slate-50 border border-slate-100 flex items-center justify-center shrink-0">
                    <MapPin size={14} className="text-slate-500" />
                  </div>
                  London, UK
                </div>
                <div className="flex items-center gap-3 text-sm text-gray-600">
                  <div className="w-8 h-8 rounded-lg bg-slate-50 border border-slate-100 flex items-center justify-center shrink-0">
                    <Clock size={14} className="text-slate-500" />
                  </div>
                  Response time: 1 business day
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
