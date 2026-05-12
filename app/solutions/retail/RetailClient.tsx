"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
  ShoppingCart, CheckCircle, ArrowRight, Package,
  TrendingUp, Clock, Globe, Server, Building2, Cpu,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { NeuralBackground } from "../../components/3d/NeuralBackground";
import { HolographicCard } from "../../components/ui/HolographicCard";
import { GlowButton } from "../../components/ui/GlowButton";
import { TrustBadgeRow } from "../../components/ui/TrustBadge";
import { AnimatedCounter } from "../../components/ui/AnimatedCounter";

// ── Types ─────────────────────────────────────────────────────────────────────
type TranscriptRole = "customer" | "agent" | "tool";

interface TranscriptEntry {
  role:  TranscriptRole;
  label: string;
  text:  string;
}

// ── Data ──────────────────────────────────────────────────────────────────────
const TRANSCRIPT: TranscriptEntry[] = [
  { role: "customer", label: "Customer",                         text: "My order #TES-8821 was supposed to arrive this morning but it hasn't shown up. Can you find it?" },
  { role: "tool",     label: "tool · oms.lookup_order",          text: "order_id=TES-8821 · status=out_for_delivery · carrier=DPD · eta=14:30–16:30 · driver_delayed=true · reason=traffic_M25" },
  { role: "agent",    label: "SupraCloud Agent",                  text: "Your order is still on the van — the DPD driver hit delays on the M25 so the slot has shifted to 14:30–16:30 today. I'll send you a live-tracking link right now. Is someone able to be home in that window?" },
  { role: "customer", label: "Customer",                          text: "No — I'll be out from 1pm. Can I redirect to my neighbour at number 14?" },
  { role: "tool",     label: "tool · oms.update_delivery_pref",  text: "order_id=TES-8821 · safe_place=neighbour_14 · driver_notified=true · confirmation_sms=sent" },
  { role: "agent",    label: "SupraCloud Agent",                  text: "Done — the driver has been notified to leave with number 14. You'll get an SMS with photo proof of delivery. Anything else I can help with?" },
];

const BUBBLE_CLASS: Record<TranscriptRole, string> = {
  agent:    "bubble-agent",
  customer: "bubble-customer",
  tool:     "bubble-tool",
};

const LABEL_COLOR: Record<TranscriptRole, string> = {
  tool:     "text-amber-400",
  agent:    "text-[var(--cyan)]",
  customer: "text-gray-500",
};

// ── Animated transcript message ───────────────────────────────────────────────
function TranscriptMsg({ msg, index }: { msg: TranscriptEntry; index: number }) {
  const ref    = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });

  const isCustomer = msg.role === "customer";
  const isTool     = msg.role === "tool";

  return (
    <motion.div
      ref={ref}
      className={cn(!isTool && "flex", isCustomer ? "justify-end" : "justify-start")}
      initial={{ opacity: 0, y: 16, x: msg.role === "agent" ? -12 : isTool ? 0 : 12 }}
      animate={inView ? { opacity: 1, y: 0, x: 0 } : {}}
      transition={{ duration: 0.4, delay: index * 0.08 }}
    >
      <div className={BUBBLE_CLASS[msg.role]}>
        <p className={cn("text-[10px] font-bold mb-1", LABEL_COLOR[msg.role])}>
          {msg.label}
        </p>
        <p className="text-sm text-gray-300 leading-relaxed">{msg.text}</p>
      </div>
    </motion.div>
  );
}

// ── Reusable section label ────────────────────────────────────────────────────
function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-xs font-bold tracking-widest uppercase mb-3 text-[var(--cyan)]">
      {children}
    </p>
  );
}

// ── Page ──────────────────────────────────────────────────────────────────────
export default function RetailClient() {
  return (
    <div className="bg-void min-h-screen">
      <NeuralBackground />

      {/* ── HERO ──────────────────────────────────────────────────────────── */}
      <section className="relative py-28 overflow-hidden border-b border-cyan-subtle">
        <div className="absolute inset-0 pointer-events-none"
          style={{ background: "radial-gradient(ellipse 80% 55% at 50% -5%, rgba(0,245,255,0.10) 0%, transparent 65%)" }} />

        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.span
            className="label-cyan mb-8 inline-flex"
            initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
          >
            <ShoppingCart size={11} /> Retail & Supermarket · Peak-Demand Scale · 24/7 Always-On
          </motion.span>

          <motion.h1
            className="text-5xl sm:text-6xl lg:text-7xl font-extrabold leading-[1.06] tracking-tight text-white mb-7"
            initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}
          >
            Retail AI Agents<br />
            for{" "}<span className="gradient-text-nova">Peak-Demand Scale.</span>
          </motion.h1>

          <motion.p
            className="text-xl text-gray-400 leading-relaxed max-w-3xl mx-auto mb-12"
            initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }}
          >
            Handle order queries, inventory escalations, and customer support at Christmas-peak volumes
            — without seasonal headcount. Always-on,{" "}
            <strong className="text-[var(--cyan)]">sub-600ms</strong> response times.
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-10"
            initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }}
          >
            <GlowButton href="/book"    variant="cyan"    size="lg" icon={<ArrowRight size={16} />}>Book Discovery Call</GlowButton>
            <GlowButton href="/contact" variant="outline" size="lg">Submit a Brief</GlowButton>
          </motion.div>

          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}>
            <TrustBadgeRow animate={false} className="justify-center" />
          </motion.div>
        </div>
      </section>

      {/* ── METRICS STRIP ────────────────────────────────────────────────── */}
      <section className="bg-[rgba(0,245,255,0.02)] border-b border-void">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { value: 68,   suffix: "%", decimals: 0, label: "Average query deflection rate" },
              { value: 10,   suffix: "×", decimals: 0, label: "Peak-load scalability multiplier" },
              { value: 99.9, suffix: "%", decimals: 1, label: "Uptime SLA guaranteed" },
              { value: 0,    suffix: "",  decimals: 0, label: "Seasonal headcount increase" },
            ].map(({ value, suffix, decimals, label }) => (
              <div key={label}>
                <p className="text-3xl font-extrabold gradient-text-nova">
                  <AnimatedCounter value={value} suffix={suffix} decimals={decimals} duration={2000} />
                </p>
                <p className="text-xs text-gray-600 mt-1">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CAPABILITIES ─────────────────────────────────────────────────── */}
      <section className="py-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <SectionLabel>Core Capabilities</SectionLabel>
            <h2 className="text-4xl font-extrabold text-white">Two Tiers. One Seamless Experience.</h2>
            <p className="mt-3 text-gray-500 max-w-xl mx-auto">
              From instant order resolution to complex inventory escalation — built for UK retail.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { icon: <Package size={22} />,     title: "Order & Delivery Management",      variant: "cyan"    as const, iconClass: "bg-[var(--cyan-dim)] text-[var(--cyan)]",     checkColor: "text-[var(--cyan)]",     desc: "Real-time status, delay notifications, substitution handling, and one-click returns — fully autonomous with zero human in the loop for standard flows.", features: ["Live tracking & ETA updates", "Redirect and safe-place management", "Returns & refund initiation"] },
              { icon: <TrendingUp size={22} />,  title: "Inventory & Supplier Escalations", variant: "default" as const, iconClass: "bg-amber-500/10 text-amber-400",              checkColor: "text-amber-400",         desc: "Automated OOS notifications, supplier delay routing, and stock-level queries resolved in milliseconds — without a human touching a ticket.", features: ["Real-time stock availability lookup", "Supplier delay proactive comms", "Automated substitution suggestions"] },
              { icon: <Clock size={22} />,       title: "Loyalty & Personalisation",        variant: "default" as const, iconClass: "bg-emerald-500/10 text-emerald-400",          checkColor: "text-emerald-400",       desc: "Points balance, tier status, promotional disputes, and personalised product recommendations — powered by your existing loyalty platform.", features: ["Points & tier status queries", "Promotional dispute resolution", "Personalised basket suggestions"] },
            ].map((card, i) => (
              <motion.div key={card.title}
                initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ delay: i * 0.1 }}>
                <HolographicCard variant={card.variant} className="p-7 h-full flex flex-col">
                  <div className={cn("w-12 h-12 rounded-xl flex items-center justify-center mb-5", card.iconClass)}>
                    {card.icon}
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3">{card.title}</h3>
                  <p className="text-sm text-gray-500 leading-relaxed flex-1 mb-5">{card.desc}</p>
                  <div className="space-y-2">
                    {card.features.map(f => (
                      <div key={f} className="flex items-start gap-2 text-xs text-gray-400">
                        <CheckCircle size={12} className={cn("shrink-0 mt-0.5", card.checkColor)} /> {f}
                      </div>
                    ))}
                  </div>
                </HolographicCard>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── LIVE TRANSCRIPT ──────────────────────────────────────────────── */}
      <section className="bg-void-2 border-t border-void py-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div className="text-center mb-14"
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <SectionLabel>Live Production Trace</SectionLabel>
            <h2 className="text-3xl font-extrabold text-white">A Missed Delivery, Resolved in Real-Time</h2>
            <p className="mt-3 text-gray-500 max-w-xl mx-auto">
              Replayed from a production session — names anonymised, latency unedited.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
            {/* Terminal window */}
            <div className="terminal-nova">
              <div className="terminal-header">
                <span className="w-2.5 h-2.5 rounded-full bg-[#FF5F57]" />
                <span className="w-2.5 h-2.5 rounded-full bg-[#FEBC2E]" />
                <span className="w-2.5 h-2.5 rounded-full bg-[#28C840]" />
                <span className="ml-2 text-xs text-gray-600 font-mono">
                  session_f7e2 · retail-l1-agent v2.4.0 · 09:47 BST
                </span>
                <span className="ml-auto flex items-center gap-1 text-[10px] font-semibold text-emerald-400">
                  <motion.span
                    className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-400"
                    animate={{ opacity: [1, 0.3, 1] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  />
                  LIVE
                </span>
              </div>

              <div className="p-5 space-y-3">
                {TRANSCRIPT.map((msg, i) => (
                  <TranscriptMsg key={i} msg={msg} index={i} />
                ))}
              </div>

              <div className="px-5 py-3 flex flex-wrap gap-4 text-[11px] text-gray-600 border-t border-void">
                <span>Resolution: <strong className="text-gray-400">L1 autonomous</strong> · 2 tool calls</span>
                <span>Latency: <strong className="text-gray-400">0.54s</strong> avg</span>
                <span>Human handoff: <strong className="text-[var(--cyan)]">0</strong></span>
              </div>
            </div>

            {/* Callout */}
            <motion.div
              initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.5 }}
            >
              <h3 className="text-2xl font-bold text-white mb-5">What just happened</h3>
              <p className="text-gray-400 leading-relaxed mb-8">
                A textbook L1 resolution: the agent surfaced the M25 delay context, proactively offered
                a delivery preference change, actioned it in the OMS, and confirmed via SMS — all with
                no human involvement.
              </p>

              <div className="grid grid-cols-2 gap-4 mb-8">
                {[
                  { val: "68%",   label: "L1 deflection rate" },
                  { val: "0.54s", label: "Median end-to-end latency" },
                  { val: "24/7",  label: "Always-on coverage" },
                  { val: "0",     label: "PII leakage incidents" },
                ].map(({ val, label }) => (
                  <HolographicCard key={label} className="p-4 text-center" tilt={false}>
                    <p className="text-2xl font-extrabold mb-1 gradient-text-nova">{val}</p>
                    <p className="text-xs text-gray-600">{label}</p>
                  </HolographicCard>
                ))}
              </div>

              <GlowButton href="/book" variant="cyan" size="md" icon={<ArrowRight size={14} />}>
                See Full Architecture Walkthrough
              </GlowButton>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── TECHNICAL ARCHITECTURE ───────────────────────────────────────── */}
      <section className="py-24 border-t border-cyan-subtle">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div className="text-center mb-14"
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <SectionLabel>Technical Architecture</SectionLabel>
            <h2 className="text-3xl font-extrabold text-white">Built for Retail&apos;s Unpredictable Traffic</h2>
            <p className="mt-3 text-gray-500 max-w-xl mx-auto">
              Serverless-first stack that auto-scales from quiet Tuesdays to Black Friday peaks.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {[
              { icon: <Globe size={18} />,  title: "No Rip-and-Replace",    desc: "Integrates with your existing OMS, WMS, ERP, and loyalty platforms via REST APIs — zero migration risk, live in 6–10 weeks." },
              { icon: <Server size={18} />, title: "10× Peak Scalability",   desc: "Serverless architecture (AWS Lambda + Redis) auto-scales for Christmas, Easter, and promotional peaks — tested at 10× throughput before go-live." },
              { icon: <Cpu size={18} />,    title: "GDPR by Design",         desc: "All processing within your cloud tenant. PII redaction before LLM calls. UK data residency requirements baked in from day one." },
            ].map((card, i) => (
              <motion.div key={card.title}
                initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ delay: i * 0.1 }}>
                <HolographicCard className="p-6">
                  <div className="w-10 h-10 rounded-lg flex items-center justify-center mb-4 bg-[var(--cyan-dim)] text-[var(--cyan)]">
                    {card.icon}
                  </div>
                  <h3 className="font-bold text-white mb-2">{card.title}</h3>
                  <p className="text-sm text-gray-500 leading-relaxed">{card.desc}</p>
                </HolographicCard>
              </motion.div>
            ))}
          </div>

          {/* Tech stack grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {[
              { name: "LangGraph",    desc: "Stateful agent orchestration" },
              { name: "Claude API",   desc: "Primary LLM reasoning engine" },
              { name: "RAG Pipeline", desc: "Product catalogue & policy retrieval" },
              { name: "AWS Lambda",   desc: "Serverless peak-load scaling" },
              { name: "FastAPI",      desc: "High-throughput agent API" },
              { name: "Redis",        desc: "Session caching" },
              { name: "Pinecone",     desc: "Vector search for product data" },
              { name: "Prometheus",   desc: "SLA & latency monitoring" },
            ].map(({ name, desc }) => (
              <div key={name} className="metric-card">
                <p className="font-semibold text-white text-sm mb-0.5">{name}</p>
                <p className="text-xs text-gray-600">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── DELIVERY STEPS ───────────────────────────────────────────────── */}
      <section className="bg-void-2 border-t border-void py-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div className="text-center mb-14"
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <SectionLabel>Delivery Timeline</SectionLabel>
            <h2 className="text-3xl font-extrabold text-white">From Brief to Live in 6–10 Weeks</h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              { num: "01", title: "Catalogue & Policy Ingestion", desc: "We ingest your full product catalogue, return policies, and support playbooks into the RAG pipeline." },
              { num: "02", title: "Agent Design & Integration",   desc: "We build the agent graph and connect it to your OMS, WMS, and loyalty systems via REST APIs." },
              { num: "03", title: "Load Testing & QA",           desc: "Peak-load simulation at 10× normal throughput. E2E validation across all critical customer journeys." },
              { num: "04", title: "Deploy & Scale",              desc: "Serverless architecture auto-scales for Christmas, summer campaigns, and promotional peaks." },
            ].map(({ num, title, desc }, i) => (
              <motion.div key={num}
                initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ delay: i * 0.1 }}>
                <HolographicCard className="step-card h-full">
                  <div className="text-4xl font-extrabold mb-3 gradient-text-nova">{num}</div>
                  <h3 className="font-bold text-white text-sm mb-2">{title}</h3>
                  <p className="text-xs text-gray-500 leading-relaxed">{desc}</p>
                </HolographicCard>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TALENT LAB ───────────────────────────────────────────────────── */}
      <section className="py-20 border-t border-cyan-subtle">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <HolographicCard variant="purple" className="p-8">
              <div className="flex items-start gap-4 mb-5">
                <div className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0 bg-[var(--purple-dim)] text-[var(--purple)]">
                  <Building2 size={20} />
                </div>
                <div>
                  <span className="text-[10px] font-bold tracking-widest uppercase px-2 py-0.5 rounded-full bg-[var(--purple-dim)] text-[var(--purple)] border border-[var(--purple)]/30">
                    SupraCloud Talent Lab
                  </span>
                  <h3 className="text-xl font-bold text-white mt-2">Battle-Tested Before You See It</h3>
                </div>
              </div>
              <p className="text-gray-400 leading-relaxed mb-4">
                Every retail agent is stress-tested in the{" "}
                <strong className="text-[var(--purple)]">SupraCloud Talent Lab</strong>, simulating Black
                Friday volumes, edge-case substitution scenarios, and adversarial customer journeys — before
                we write a single line in your production environment.
              </p>
              <p className="text-gray-500 leading-relaxed text-sm mb-6">
                What most vendors call a &ldquo;pilot&rdquo;, we call Tuesday.
              </p>
              <div className="flex flex-wrap gap-3">
                <GlowButton href="/careers/internships" variant="outline" size="sm">Graduate Programme →</GlowButton>
                <GlowButton href="/careers/training"    variant="outline" size="sm">Training Pathways →</GlowButton>
              </div>
            </HolographicCard>
          </motion.div>
        </div>
      </section>

      {/* ── TRUST BADGES ─────────────────────────────────────────────────── */}
      <section className="bg-void-2 border-t border-void py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <TrustBadgeRow />
        </div>
      </section>

      {/* ── DUAL CTA ─────────────────────────────────────────────────────── */}
      <section className="py-24 text-center border-t border-cyan-subtle">
        <div className="max-w-2xl mx-auto px-4">
          <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <SectionLabel>Ready to Scale?</SectionLabel>
            <h2 className="text-4xl font-extrabold text-white mb-4">
              Your peak season is coming.<br />
              <span className="gradient-text-nova">Are your agents ready?</span>
            </h2>
            <p className="text-gray-400 mb-10 leading-relaxed">
              30-minute call. We map your support volumes, OMS integrations, and peak-load requirements.
              You&apos;ll leave with a concrete technical blueprint — no slides, no sales deck.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <GlowButton href="/book"    variant="cyan"    size="lg" icon={<ArrowRight size={16} />}>Book Discovery Call</GlowButton>
              <GlowButton href="/contact" variant="outline" size="lg">Submit a Brief</GlowButton>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
