"use client";

import { useState, useEffect, useRef, Suspense } from "react";
import dynamic from "next/dynamic";
import { motion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import { HolographicCard } from "./components/ui/HolographicCard";
import { GlowButton } from "./components/ui/GlowButton";
import { TrustBadgeRow } from "./components/ui/TrustBadge";
import { AnimatedCounter } from "./components/ui/AnimatedCounter";
import { SocialProof } from "./components/ui/SocialProof";
import { ClientPortalTeaser } from "./components/ui/ClientPortalTeaser";

const NeuralBackground = dynamic(
  () => import("./components/3d/NeuralBackground").then((m) => m.NeuralBackground),
  { ssr: false }
);
const NovaSphere = dynamic(
  () => import("./components/3d/NovaSphere").then((m) => m.NovaSphere),
  { ssr: false }
);
const NovaDemoPreview = dynamic(
  () => import("./components/ui/NovaDemoPreview").then((m) => m.NovaDemoPreview),
  { ssr: false }
);

// ── Typewriter ────────────────────────────────────────────────────────────────

const ROTATING_WORDS = [
  "Banking AI Agents",
  "Retail Intelligence",
  "Enterprise Automation",
  "FCA-Ready Systems",
  "Self-Learning Agents",
];

function TypewriterWord() {
  const [index, setIndex]  = useState(0);
  const [display, setDisplay] = useState("");
  const [deleting, setDeleting] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const word = ROTATING_WORDS[index];
    if (!deleting && display.length < word.length) {
      timerRef.current = setTimeout(() => setDisplay(word.slice(0, display.length + 1)), 60);
    } else if (!deleting && display.length === word.length) {
      timerRef.current = setTimeout(() => setDeleting(true), 2200);
    } else if (deleting && display.length > 0) {
      timerRef.current = setTimeout(() => setDisplay(display.slice(0, -1)), 35);
    } else if (deleting && display.length === 0) {
      setDeleting(false);
      setIndex((i) => (i + 1) % ROTATING_WORDS.length);
    }
    return () => { if (timerRef.current) clearTimeout(timerRef.current); };
  }, [display, deleting, index]);

  return (
    <span className="gradient-text-nova">
      {display}
      <motion.span
        className="inline-block w-0.5 h-[0.85em] bg-[#00F5FF] ml-0.5 align-middle"
        animate={{ opacity: [1, 0] }}
        transition={{ duration: 0.7, repeat: Infinity }}
      />
    </span>
  );
}

// ── Stat strip ────────────────────────────────────────────────────────────────

const STATS = [
  { value: 72, suffix: "%", label: "Query Deflection" },
  { value: 14, suffix: "M+", label: "Transactions Processed" },
  { value: 6,  suffix: "wk", label: "Avg. Time to Production" },
  { value: 99, suffix: ".9%", label: "Uptime SLA", decimals: 0 },
];

// ── Service cards ──────────────────────────────────────────────────────────────

const SERVICES = [
  {
    icon: "🏦",
    title: "Banking AI Agents",
    desc: "Autonomous agents for customer queries, fraud triage, and back-office workflows — integrated into core banking systems.",
    href: "/solutions/banking",
    variant: "cyan" as const,
    tags: ["FCA Aligned", "Audit Trail", "Explainable AI"],
  },
  {
    icon: "🛒",
    title: "Retail Intelligence",
    desc: "Inventory automation, personalised experiences, and support deflection at enterprise scale — no rip-and-replace.",
    href: "/solutions/retail",
    variant: "purple" as const,
    tags: ["ERP Integration", "Real-time", "Multi-channel"],
  },
  {
    icon: "🔬",
    title: "Enterprise IT Consultation",
    desc: "4–12 week engagements producing a concrete technical blueprint your team can execute — or we execute it.",
    href: "/services/consultation",
    variant: "default" as const,
    tags: ["Regulated Industries", "Architecture", "Team Training"],
  },
  {
    icon: "👥",
    title: "Engineer-Screened Staffing",
    desc: "Pre-vetted AI engineers, data architects, and DevOps specialists placed directly into your team.",
    href: "/services/staffing",
    variant: "cyan" as const,
    tags: ["No Recruiters", "Technical Assessment", "UK-Based"],
  },
  {
    icon: "🎓",
    title: "Talent Programme",
    desc: "Industry-aligned AI engineering pathways — Foundation, Application Engine, Full Accelerator — in live cohorts.",
    href: "/talent/programs",
    variant: "purple" as const,
    tags: ["Live Cohorts", "Real Projects", "Mentored"],
  },
  {
    icon: "🤝",
    title: "University Partnerships",
    desc: "Structured placement years that give students real AI delivery experience and universities a talent pipeline.",
    href: "/talent/partnerships",
    variant: "default" as const,
    tags: ["Placement Years", "Graduate Pipeline", "CPD Certified"],
  },
];

// ── Process steps ──────────────────────────────────────────────────────────────

const PROCESS = [
  { step: "01", title: "Discovery Call",  desc: "30 minutes, engineer-led. We scope your data, infrastructure, and required outcomes." },
  { step: "02", title: "Architecture",    desc: "We design the agent architecture, RAG pipeline, and integration plan specific to your stack." },
  { step: "03", title: "Build & Deploy",  desc: "Typically 6–10 weeks from discovery to production on your cloud tenant." },
  { step: "04", title: "Self-Learning",   desc: "Agents improve from real interactions via feedback loops — deflection rates grow over time." },
];

// ── Testimonials ──────────────────────────────────────────────────────────────

const TESTIMONIALS = [
  {
    quote: "We went from 40% CSAT on our customer portal to 91% in three months after deploying SupraCloud's agent. The FCA compliance work was rigorous and thorough.",
    name: "Head of Digital Transformation",
    org: "UK Retail Bank (anonymised)",
  },
  {
    quote: "The engineer-first approach made a real difference. They understood our stack on day one and didn't waste time on discovery theatre.",
    name: "CTO",
    org: "Fintech Scale-up, London",
  },
  {
    quote: "SupraCloud's Talent Programme placed three engineers who are now leading our internal AI platform. Hands-on from week one, not tutorials.",
    name: "Engineering Director",
    org: "FTSE 250 Retail Group",
  },
];

// ── ROI Calculator strip ───────────────────────────────────────────────────────

function ROIStrip() {
  const [volume, setVolume]   = useState(10000);
  const deflectionRate        = 0.72;
  const costPerQuery          = 2.5; // £
  const monthlySaving         = Math.round(volume * deflectionRate * costPerQuery);

  return (
    <section className="relative py-24 px-4">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <HolographicCard variant="cyan" className="p-8 md:p-12">
            <div className="text-center mb-8">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-3">
                Quick ROI Estimate
              </h2>
              <p className="text-white/50 text-sm">
                Drag to set your monthly query volume
              </p>
            </div>

            <div className="space-y-6">
              <div>
                <div className="flex justify-between text-sm text-white/60 mb-2">
                  <span>Monthly queries / transactions</span>
                  <span className="text-[#00F5FF] font-bold">{volume.toLocaleString()}</span>
                </div>
                <input
                  type="range"
                  min={500}
                  max={500000}
                  step={500}
                  value={volume}
                  onChange={(e) => setVolume(Number(e.target.value))}
                  className="w-full h-1.5 rounded-full appearance-none cursor-pointer"
                  style={{
                    background: `linear-gradient(to right, #00F5FF ${(volume / 500000) * 100}%, rgba(255,255,255,0.1) ${(volume / 500000) * 100}%)`,
                  }}
                  aria-label="Monthly query volume"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4">
                {[
                  { label: "Deflected Queries", value: Math.round(volume * deflectionRate).toLocaleString(), color: "#00F5FF" },
                  { label: "Est. Monthly Saving", value: `£${monthlySaving.toLocaleString()}`, color: "#8B5CF6" },
                  { label: "Est. Annual Saving",  value: `£${(monthlySaving * 12).toLocaleString()}`, color: "#00F5FF" },
                ].map((stat) => (
                  <div
                    key={stat.label}
                    className="text-center p-4 rounded-xl"
                    style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)" }}
                  >
                    <div className="text-2xl font-bold mb-1" style={{ color: stat.color }}>
                      {stat.value}
                    </div>
                    <div className="text-white/40 text-xs">{stat.label}</div>
                  </div>
                ))}
              </div>

              <div className="text-center pt-2">
                <p className="text-white/30 text-xs mb-4">
                  Based on 72% deflection at £{costPerQuery}/query. Book a discovery call for a precise estimate.
                </p>
                <GlowButton variant="cyan" size="lg" href="/book">
                  Book a Free Discovery Call
                </GlowButton>
              </div>
            </div>
          </HolographicCard>
        </motion.div>
      </div>
    </section>
  );
}

// ── Main page ─────────────────────────────────────────────────────────────────

export default function HomePage() {
  const { scrollY } = useScroll();
  const heroY = useTransform(scrollY, [0, 600], [0, -80]);

  return (
    <main className="relative min-h-screen bg-[#050510] text-white overflow-x-hidden">
      {/* Fixed neural particle background */}
      <NeuralBackground />

      {/* ── HERO ── */}
      <section className="relative min-h-screen flex flex-col items-center justify-center px-4 pt-24 pb-12">
        <motion.div
          style={{ y: heroY }}
          className="relative z-10 flex flex-col items-center text-center max-w-5xl mx-auto"
        >
          {/* NovaSphere */}
          <motion.div
            className="mb-8"
            initial={{ opacity: 0, scale: 0.7 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <NovaSphere state="idle" />
          </motion.div>

          {/* Badge */}
          <motion.div
            className="flex items-center gap-2 px-4 py-1.5 rounded-full mb-5 text-xs font-semibold text-[#00F5FF]"
            style={{ background: "rgba(0,245,255,0.08)", border: "1px solid rgba(0,245,255,0.2)" }}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25 }}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#00F5FF] animate-pulse" />
            Nova AI · Now Live · UK-Based
          </motion.div>

          {/* Brand name */}
          <motion.div
            className="mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35, duration: 0.6 }}
          >
            <span
              className="text-5xl sm:text-7xl md:text-8xl font-black tracking-tight"
              style={{
                background: "linear-gradient(135deg, #ffffff 0%, #00F5FF 50%, #8B5CF6 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
                filter: "drop-shadow(0 0 32px rgba(0,245,255,0.35))",
              }}
            >
              SupraCloud
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            className="text-2xl sm:text-3xl md:text-4xl font-bold text-white/80 leading-snug tracking-tight mb-6"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.45, duration: 0.6 }}
          >
            Enterprise AI for <TypewriterWord />
          </motion.h1>

          {/* Sub */}
          <motion.p
            className="text-lg md:text-xl text-white/55 max-w-2xl leading-relaxed mb-10"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.55, duration: 0.6 }}
          >
            SupraCloud builds production-grade autonomous AI agents for banking and retail,
            deployed within your cloud tenant — engineer-led, FCA-aware, and self-improving.
          </motion.p>

          {/* CTAs */}
          <motion.div
            className="flex flex-wrap justify-center gap-4 mb-12"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
          >
            <GlowButton variant="cyan" size="lg" href="/book">
              Book a Discovery Call
            </GlowButton>
            <GlowButton
              variant="purple"
              size="lg"
              onClick={() => { document.dispatchEvent(new CustomEvent("nova:open")); }}
            >
              Try Nova Now
            </GlowButton>
            <GlowButton variant="outline" size="lg" href="/solutions/banking">
              See Banking Demo
            </GlowButton>
          </motion.div>

          {/* Trust badges */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9 }}
          >
            <TrustBadgeRow animate={false} />
          </motion.div>
        </motion.div>

        {/* Scroll hint */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1"
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <span className="text-white/20 text-xs">scroll</span>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="2" strokeLinecap="round">
            <path d="M12 5v14M5 12l7 7 7-7" />
          </svg>
        </motion.div>
      </section>

      {/* ── STATS ── */}
      <section className="relative py-16 px-4 overflow-hidden">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-px rounded-2xl overflow-hidden"
            style={{ border: "1px solid rgba(0,245,255,0.1)", background: "rgba(0,245,255,0.04)" }}>
            {STATS.map((s, i) => (
              <motion.div
                key={s.label}
                className="flex flex-col items-center justify-center py-8 px-4 text-center"
                style={{ background: "rgba(5,5,16,0.8)" }}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <span className="text-3xl md:text-4xl font-black gradient-text-nova">
                  <AnimatedCounter
                    value={s.value}
                    suffix={s.suffix}
                    decimals={s.decimals}
                    duration={2200}
                  />
                </span>
                <span className="text-white/40 text-xs mt-1">{s.label}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SOCIAL PROOF ── */}
      <SocialProof />

      {/* ── SERVICES ── */}
      <section className="relative py-24 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
              What We Build
            </h2>
            <p className="text-white/40 text-lg max-w-xl mx-auto">
              Production-grade AI that integrates with your existing infrastructure.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {SERVICES.map((s, i) => (
              <motion.div
                key={s.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
              >
                <Link href={s.href} className="block h-full">
                  <HolographicCard variant={s.variant} className="h-full p-6 group">
                    <div className="flex flex-col h-full">
                      <span className="text-3xl mb-4 block">{s.icon}</span>
                      <h3 className="text-lg font-bold text-white mb-3 group-hover:text-[#00F5FF] transition-colors">
                        {s.title}
                      </h3>
                      <p className="text-white/50 text-sm leading-relaxed flex-1 mb-4">
                        {s.desc}
                      </p>
                      <div className="flex flex-wrap gap-1.5">
                        {s.tags.map((t) => (
                          <span
                            key={t}
                            className="text-[10px] font-semibold px-2 py-0.5 rounded-full"
                            style={{
                              background: "rgba(0,245,255,0.07)",
                              color: "rgba(0,245,255,0.65)",
                              border: "1px solid rgba(0,245,255,0.15)",
                            }}
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>
                  </HolographicCard>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PROCESS ── */}
      <section className="relative py-24 px-4">
        <div className="max-w-5xl mx-auto">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
              From Discovery to Production
            </h2>
            <p className="text-white/40 text-lg">Typically 6–10 weeks, entirely within your cloud tenant.</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {PROCESS.map((p, i) => (
              <motion.div
                key={p.step}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.12 }}
              >
                <HolographicCard className="p-6 h-full">
                  <div
                    className="text-3xl font-black mb-3 gradient-text-nova"
                  >
                    {p.step}
                  </div>
                  <h3 className="text-white font-semibold mb-2">{p.title}</h3>
                  <p className="text-white/45 text-sm leading-relaxed">{p.desc}</p>
                </HolographicCard>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHY BANKS CHOOSE SUPRACLOUD ── */}
      <section className="relative py-24 px-4">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] rounded-full bg-[rgba(0,245,255,0.025)] blur-3xl" />
        </div>
        <div className="max-w-6xl mx-auto">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
              Why Banks Choose SupraCloud
            </h2>
            <p className="text-white/40 text-lg max-w-xl mx-auto">
              Not another AI vendor. An engineering partner that delivers in regulated environments.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {[
              {
                icon: "🔒",
                title: "Data Never Leaves Your Perimeter",
                desc: "Every agent runs inside your own AWS or Azure tenant. We never touch your customer data — NDA before discovery call is a hard requirement.",
                tag: "Zero Data Exfiltration",
                variant: "cyan" as const,
              },
              {
                icon: "🏛",
                title: "FCA-Ready from Day One",
                desc: "Explainable AI decisions, full audit trails, and regulatory documentation built into every agent — not bolted on afterwards.",
                tag: "Regulatory Compliance",
                variant: "default" as const,
              },
              {
                icon: "⚡",
                title: "Live in 4–6 Weeks",
                desc: "Contained agents from discovery to production in 4–6 weeks. Multi-agent platforms in 3–6 months. No 18-month transformation programmes.",
                tag: "Fast Deployment",
                variant: "cyan" as const,
              },
              {
                icon: "🧠",
                title: "Self-Improving Agents",
                desc: "Agents learn from every real interaction through feedback loops. Deflection rates improve week over week without manual retraining.",
                tag: "Continuous Learning",
                variant: "default" as const,
              },
              {
                icon: "🔗",
                title: "No Rip-and-Replace",
                desc: "We integrate with your existing core banking systems, ERPs, and CRMs via API. No infrastructure migration required.",
                tag: "Legacy Compatible",
                variant: "cyan" as const,
              },
              {
                icon: "👷",
                title: "Engineer-Led, Not Sales-Led",
                desc: "Every engagement starts with an engineer on the call — not an account manager. You get a realistic technical estimate on the first call.",
                tag: "Engineer First",
                variant: "default" as const,
              },
            ].map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.07 }}
              >
                <HolographicCard variant={item.variant} className="p-6 h-full group" tilt={false}>
                  <div className="flex flex-col h-full">
                    <div className="flex items-start justify-between mb-4">
                      <span className="text-3xl">{item.icon}</span>
                      <span className="text-[10px] font-bold tracking-wider px-2 py-0.5 rounded-full"
                        style={{ background: "rgba(0,245,255,0.07)", color: "rgba(0,245,255,0.6)", border: "1px solid rgba(0,245,255,0.15)" }}>
                        {item.tag}
                      </span>
                    </div>
                    <h3 className="text-white font-bold text-base mb-2 group-hover:text-[#00F5FF] transition-colors leading-snug">
                      {item.title}
                    </h3>
                    <p className="text-white/45 text-sm leading-relaxed flex-1">{item.desc}</p>
                  </div>
                </HolographicCard>
              </motion.div>
            ))}
          </div>

          <motion.div
            className="flex justify-center mt-10"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
          >
            <GlowButton variant="cyan" size="lg" href="/solutions/banking">
              See Banking Agent in Action
            </GlowButton>
          </motion.div>
        </div>
      </section>

      {/* ── NOVA DEMO PREVIEW ── */}
      <section className="relative py-20 px-4">
        <div className="max-w-5xl mx-auto">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-3">
              Nova in Action
            </h2>
            <p className="text-white/40 text-base max-w-md mx-auto">
              Watch a live resolution — from customer query to autonomous action in seconds.
            </p>
          </motion.div>
          <Suspense fallback={<div className="h-64 rounded-2xl bg-[rgba(255,255,255,0.02)] animate-pulse" />}>
            <NovaDemoPreview />
          </Suspense>
          <motion.div
            className="flex justify-center mt-8"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
          >
            <GlowButton
              variant="purple"
              size="md"
              onClick={() => { document.dispatchEvent(new CustomEvent("nova:open")); }}
            >
              Talk to Nova Live
            </GlowButton>
          </motion.div>
        </div>
      </section>

      {/* ── ROI CALCULATOR ── */}
      <ROIStrip />

      {/* ── TESTIMONIALS ── */}
      <section className="relative py-24 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
              Proven in Production
            </h2>
            <p className="text-white/40 text-lg">Results shared under NDA — anonymised here with permission.</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {TESTIMONIALS.map((t, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.12 }}
              >
                <HolographicCard
                  variant={i === 1 ? "cyan" : "default"}
                  className="p-6 h-full flex flex-col"
                >
                  {/* Stars */}
                  <div className="flex gap-0.5 mb-4">
                    {Array.from({ length: 5 }).map((_, j) => (
                      <svg key={j} width="14" height="14" viewBox="0 0 24 24" fill="#00F5FF">
                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                      </svg>
                    ))}
                  </div>
                  <blockquote className="text-white/70 text-sm leading-relaxed flex-1 mb-4 italic">
                    "{t.quote}"
                  </blockquote>
                  <div>
                    <div className="text-white text-sm font-semibold">{t.name}</div>
                    <div className="text-white/35 text-xs">{t.org}</div>
                  </div>
                </HolographicCard>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CLIENT PORTAL TEASER ── */}
      <ClientPortalTeaser />

      {/* ── FINAL CTA ── */}
      <section className="relative py-32 px-4 overflow-hidden">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 70% 60% at 50% 50%, rgba(0,245,255,0.06) 0%, transparent 70%), " +
              "radial-gradient(ellipse 50% 40% at 80% 20%, rgba(139,92,246,0.06) 0%, transparent 60%)",
          }}
        />
        <div className="relative max-w-3xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <h2 className="text-4xl md:text-6xl font-black leading-tight mb-6">
              Ready to Deploy
              <br />
              <span className="gradient-text-nova">Your First Agent?</span>
            </h2>
            <p className="text-white/50 text-lg mb-10 max-w-xl mx-auto">
              Book a 30-minute discovery call. Engineer-led, no sales deck.
              We'll give you a realistic estimate on the same call.
            </p>
            <div className="flex flex-wrap justify-center gap-4 mb-8">
              <GlowButton variant="cyan" size="lg" href="/book">
                Book Discovery Call
              </GlowButton>
              <GlowButton variant="outline" size="lg" href="/contact">
                Send Us a Message
              </GlowButton>
            </div>
            <TrustBadgeRow className="justify-center" />
          </motion.div>
        </div>
      </section>
    </main>
  );
}
