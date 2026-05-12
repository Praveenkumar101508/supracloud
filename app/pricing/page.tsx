"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { HolographicCard } from "../components/ui/HolographicCard";
import { GlowButton } from "../components/ui/GlowButton";
import { TrustBadgeRow } from "../components/ui/TrustBadge";
import { NeuralBackground } from "../components/3d/NeuralBackground";

// ── Tier data ─────────────────────────────────────────────────────────────────

const TIERS = [
  {
    id:         "foundation",
    name:       "Foundation",
    icon:       "⚡",
    monthlyGBP: 2500,
    annualGBP:  2000,
    desc:       "For individuals and small teams starting their AI engineering journey.",
    badge:      null,
    variant:    "default" as const,
    features: [
      "8-week live cohort (max 8 engineers)",
      "AI agent fundamentals — LangGraph, RAG, vector search",
      "One real-world project brief",
      "Weekly 1:1 mentorship sessions",
      "Access to SupraCloud knowledge base",
      "Certificate of completion",
      "Career guidance session",
    ],
    cta:  "Enrol — Foundation",
    href: "/talent/programs?tier=foundation",
  },
  {
    id:         "application_engine",
    name:       "Application Engine",
    icon:       "🚀",
    monthlyGBP: 15000,
    annualGBP:  12000,
    desc:       "For engineers building production AI agents in regulated industries.",
    badge:      "Most Popular",
    variant:    "cyan" as const,
    features: [
      "12-week intensive live cohort",
      "Full RAG + multi-agent orchestration pipeline",
      "Two real enterprise project briefs",
      "Daily async support channel",
      "Code review from senior SupraCloud engineers",
      "Access to private model fine-tuning sandbox",
      "Placement referral to partner companies",
      "All Foundation features included",
    ],
    cta:  "Enrol — Application Engine",
    href: "/talent/programs?tier=application_engine",
  },
  {
    id:         "full_accelerator",
    name:       "Full Accelerator",
    icon:       "🌐",
    monthlyGBP: 25000,
    annualGBP:  20000,
    desc:       "Complete enterprise-grade AI delivery programme for serious teams.",
    badge:      null,
    variant:    "purple" as const,
    features: [
      "Everything in Application Engine",
      "Custom cohort dates and pacing",
      "Dedicated senior engineer as account lead",
      "Three live client project briefs",
      "Priority placement referral and introductions",
      "Post-programme retainer option",
      "Enterprise NDA and IP protection",
      "Custom assessment and certification",
    ],
    cta:  "Enrol — Full Accelerator",
    href: "/talent/programs?tier=full_accelerator",
  },
];

const FAQS = [
  {
    q: "Are cohorts in-person or remote?",
    a: "All cohorts run remotely, with optional in-person workshops for Full Accelerator clients. Sessions are recorded for async catch-up.",
  },
  {
    q: "What are the payment terms?",
    a: "Foundation and Application Engine are paid upfront or in two instalments. Full Accelerator and Enterprise support staged payment plans — contact us to discuss.",
  },
  {
    q: "Can my company enrol a team?",
    a: "Yes — enterprise cohorts (4+ engineers) get custom pricing, dates, and an embedded SupraCloud lead engineer. Contact us for a bespoke proposal.",
  },
  {
    q: "What if I need something custom?",
    a: "Enterprise cohorts are scoped individually. Contact us and we'll design a curriculum around your stack, industry, and delivery goals.",
  },
  {
    q: "Is there a refund policy?",
    a: "We offer a full refund within 14 days of enrolment if you haven't started. After the first session, refunds are prorated. Full details in our Terms.",
  },
  {
    q: "Do you offer FCA-relevant training?",
    a: "Yes — the Application Engine and Full Accelerator both include modules on FCA SYSC requirements, audit trail design, and regulated AI deployment.",
  },
];

// ── FAQ item ──────────────────────────────────────────────────────────────────

function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div
      className="rounded-xl overflow-hidden cursor-pointer"
      style={{ border: "1px solid rgba(0,245,255,0.1)" }}
      onClick={() => setOpen((o) => !o)}
    >
      <div
        className="flex items-center justify-between px-5 py-4 text-sm font-semibold text-white/80 hover:text-white transition-colors"
        style={{ background: "rgba(0,245,255,0.03)" }}
      >
        <span>{q}</span>
        <motion.span
          animate={{ rotate: open ? 45 : 0 }}
          transition={{ duration: 0.2 }}
          className="text-[#00F5FF] ml-4 shrink-0"
        >
          +
        </motion.span>
      </div>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            style={{ background: "rgba(0,0,0,0.2)" }}
          >
            <p className="px-5 py-4 text-sm text-white/50 leading-relaxed">{a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ── Page ──────────────────────────────────────────────────────────────────────

export default function PricingPage() {
  const [annual, setAnnual] = useState(false);

  return (
    <main className="relative min-h-screen bg-[#050510] text-white overflow-x-hidden">
      <NeuralBackground />

      {/* ── Hero ── */}
      <section className="relative pt-28 pb-16 px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold text-[#00F5FF] mb-6"
            style={{ background: "rgba(0,245,255,0.08)", border: "1px solid rgba(0,245,255,0.2)" }}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#00F5FF] animate-pulse" />
            Talent Programme Pricing
          </div>

          <h1 className="text-4xl md:text-6xl font-black leading-tight mb-5">
            Invest in Your
            <br />
            <span className="gradient-text-nova">AI Engineering Capability</span>
          </h1>
          <p className="text-white/50 text-lg max-w-xl mx-auto mb-10">
            All programmes run in live cohorts of up to 8, with real enterprise project briefs
            and weekly mentorship from senior SupraCloud engineers.
          </p>

          {/* Annual/Monthly toggle */}
          <div className="inline-flex items-center gap-3 p-1.5 rounded-full"
            style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)" }}>
            <button
              onClick={() => setAnnual(false)}
              className={`px-5 py-2 rounded-full text-sm font-semibold transition-all ${
                !annual ? "bg-[#00F5FF] text-black" : "text-white/50 hover:text-white"
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setAnnual(true)}
              className={`px-5 py-2 rounded-full text-sm font-semibold transition-all flex items-center gap-2 ${
                annual ? "bg-[#8B5CF6] text-white" : "text-white/50 hover:text-white"
              }`}
            >
              Annual
              <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-full bg-green-500/20 text-green-400">
                Save 20%
              </span>
            </button>
          </div>
        </motion.div>
      </section>

      {/* ── Tier cards ── */}
      <section className="relative px-4 pb-24">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
            {TIERS.map((tier, i) => {
              const price = annual ? tier.annualGBP : tier.monthlyGBP;
              const isPopular = tier.badge === "Most Popular";
              return (
                <motion.div
                  key={tier.id}
                  className={`relative ${isPopular ? "md:-mt-4 md:mb-[-16px]" : ""}`}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.12, duration: 0.5 }}
                >
                  {/* Popular badge */}
                  {tier.badge && (
                    <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 z-20">
                      <span className="px-4 py-1 rounded-full text-xs font-bold text-black bg-[#00F5FF]"
                        style={{ boxShadow: "0 0 16px rgba(0,245,255,0.5)" }}>
                        {tier.badge}
                      </span>
                    </div>
                  )}

                  <HolographicCard
                    variant={tier.variant}
                    className={`h-full flex flex-col p-6 ${isPopular ? "ring-1 ring-[#00F5FF]/30" : ""}`}
                    tilt={false}
                  >
                    {/* Header */}
                    <div className="mb-6">
                      <span className="text-3xl mb-3 block">{tier.icon}</span>
                      <h2 className="text-xl font-bold text-white mb-1">{tier.name}</h2>
                      <p className="text-white/45 text-sm">{tier.desc}</p>
                    </div>

                    {/* Price */}
                    <div className="mb-6 pb-6" style={{ borderBottom: "1px solid rgba(255,255,255,0.07)" }}>
                      <AnimatePresence mode="wait">
                        <motion.div
                          key={`${tier.id}-${annual}`}
                          initial={{ opacity: 0, y: -8 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 8 }}
                          transition={{ duration: 0.2 }}
                        >
                          <span className="text-4xl font-black text-white">
                            £{price.toLocaleString()}
                          </span>
                          <span className="text-white/35 text-sm ml-2">/ programme</span>
                          {annual && (
                            <div className="text-green-400 text-xs font-semibold mt-1">
                              Saving £{(tier.monthlyGBP - tier.annualGBP).toLocaleString()} vs monthly
                            </div>
                          )}
                        </motion.div>
                      </AnimatePresence>
                    </div>

                    {/* Features */}
                    <ul className="space-y-2.5 flex-1 mb-8">
                      {tier.features.map((f) => (
                        <li key={f} className="flex items-start gap-2.5 text-sm text-white/65">
                          <svg
                            className="shrink-0 mt-0.5"
                            width="14" height="14" viewBox="0 0 24 24"
                            fill="none" stroke={tier.variant === "cyan" ? "#00F5FF" : tier.variant === "purple" ? "#8B5CF6" : "#00F5FF"}
                            strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
                          >
                            <path d="M20 6L9 17l-5-5" />
                          </svg>
                          {f}
                        </li>
                      ))}
                    </ul>

                    {/* CTA */}
                    <Link href={tier.href} className="block w-full">
                      <GlowButton
                        variant={tier.variant === "cyan" ? "cyan" : tier.variant === "purple" ? "purple" : "outline"}
                        size="md"
                        fullWidth
                      >
                        {tier.cta}
                      </GlowButton>
                    </Link>
                  </HolographicCard>
                </motion.div>
              );
            })}
          </div>

          {/* Enterprise callout */}
          <motion.div
            className="mt-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
          >
            <HolographicCard className="p-6 md:p-8">
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-2xl">🏢</span>
                    <h3 className="text-xl font-bold text-white">Enterprise Cohort</h3>
                  </div>
                  <p className="text-white/50 text-sm max-w-lg">
                    Closed cohort for in-house teams of 4+ engineers. Custom curriculum, dates, embedded lead engineer,
                    NDA, and IP protection. Scoped per-engagement.
                  </p>
                </div>
                <div className="shrink-0">
                  <Link href="/contact">
                    <GlowButton variant="outline" size="md">
                      Request Enterprise Proposal
                    </GlowButton>
                  </Link>
                </div>
              </div>
            </HolographicCard>
          </motion.div>
        </div>
      </section>

      {/* ── Trust signals ── */}
      <section className="py-12 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-white/30 text-sm mb-5">Programme graduates work at</p>
          <TrustBadgeRow className="justify-center" />
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="py-24 px-4">
        <div className="max-w-3xl mx-auto">
          <motion.h2
            className="text-3xl md:text-4xl font-bold text-white text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Common Questions
          </motion.h2>
          <div className="space-y-3">
            {FAQS.map((faq, i) => (
              <motion.div
                key={faq.q}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06 }}
              >
                <FAQItem q={faq.q} a={faq.a} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Final CTA ── */}
      <section className="py-24 px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Not sure which tier?
          </h2>
          <p className="text-white/50 text-lg mb-8 max-w-md mx-auto">
            Talk to Nova — our AI assistant can help you pick the right track based on your goals and current experience.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/book">
              <GlowButton variant="cyan" size="lg">
                Book a Free Consultation
              </GlowButton>
            </Link>
            <Link href="/contact">
              <GlowButton variant="outline" size="lg">
                Send Us a Message
              </GlowButton>
            </Link>
          </div>
        </motion.div>
      </section>
    </main>
  );
}
