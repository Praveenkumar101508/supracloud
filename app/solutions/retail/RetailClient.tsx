"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";
import {
  ShoppingCart, Zap, CheckCircle, ArrowRight, Package,
  TrendingUp, Clock, Globe, Server, Building2, Cpu,
} from "lucide-react";
import { NeuralBackground } from "../../components/3d/NeuralBackground";
import { HolographicCard } from "../../components/ui/HolographicCard";
import { GlowButton } from "../../components/ui/GlowButton";
import { TrustBadgeRow } from "../../components/ui/TrustBadge";
import { AnimatedCounter } from "../../components/ui/AnimatedCounter";

// ── Transcript data ────────────────────────────────────────────────────────────
const TRANSCRIPT = [
  { role: "customer", label: "Customer",                          text: "My order #TES-8821 was supposed to arrive this morning but it hasn't shown up. Can you find it?" },
  { role: "tool",     label: "tool · oms.lookup_order",          text: "order_id=TES-8821 · status=out_for_delivery · carrier=DPD · eta=14:30–16:30 · driver_delayed=true · reason=traffic_M25" },
  { role: "agent",    label: "SupraCloud Agent",                  text: "Your order is still on the van — the DPD driver hit delays on the M25 so the slot has shifted to 14:30–16:30 today. I'll send you a live-tracking link right now. Is someone able to be home in that window?" },
  { role: "customer", label: "Customer",                          text: "No — I'll be out from 1pm. Can I redirect to my neighbour at number 14?" },
  { role: "tool",     label: "tool · oms.update_delivery_pref",  text: "order_id=TES-8821 · safe_place=neighbour_14 · driver_notified=true · confirmation_sms=sent" },
  { role: "agent",    label: "SupraCloud Agent",                  text: "Done — the driver has been notified to leave with number 14. You'll get an SMS with a photo proof of delivery. Anything else I can help with today?" },
];

// ── Animated transcript message ───────────────────────────────────────────────
function TranscriptMsg({ msg, index }: { msg: typeof TRANSCRIPT[0]; index: number }) {
  const ref    = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const isAgent = msg.role === "agent";
  const isTool  = msg.role === "tool";

  const bubble: React.CSSProperties = isTool
    ? { background: "rgba(245,158,11,0.07)", border: "1px solid rgba(245,158,11,0.22)", fontFamily: "monospace", fontSize: 11 }
    : isAgent
    ? { background: "rgba(0,245,255,0.08)", border: "1px solid rgba(0,245,255,0.22)", maxWidth: "82%" }
    : { background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", maxWidth: "82%", marginLeft: "auto" };

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 16, x: isAgent ? -12 : isTool ? 0 : 12 }}
      animate={inView ? { opacity: 1, y: 0, x: 0 } : {}}
      transition={{ duration: 0.4, delay: index * 0.08 }}
      style={{ ...(isTool ? {} : { display: "flex", justifyContent: msg.role === "customer" ? "flex-end" : "flex-start" }) }}
    >
      <div style={{ ...bubble, borderRadius: 10, padding: "10px 14px" }}>
        <p className="text-[10px] font-bold mb-1" style={{
          color: isTool ? "#F59E0B" : isAgent ? "#00F5FF" : "#9CA3AF"
        }}>
          {msg.label}
        </p>
        <p className="text-sm text-gray-300 leading-relaxed">{msg.text}</p>
      </div>
    </motion.div>
  );
}

// ── Main client component ─────────────────────────────────────────────────────
export default function RetailClient() {
  return (
    <div style={{ background: "#050505", minHeight: "100vh" }}>

      {/* ── HERO ─────────────────────────────────────────────────────────────── */}
      <section className="relative py-28 overflow-hidden" style={{ borderBottom: "1px solid rgba(0,245,255,0.06)" }}>
        <NeuralBackground />
        <div className="absolute inset-0 pointer-events-none" style={{
          background: "radial-gradient(ellipse 80% 55% at 50% -5%, rgba(0,245,255,0.10) 0%, transparent 65%)"
        }} />

        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-flex items-center gap-2 text-[10px] font-bold tracking-widest uppercase px-3 py-1.5 rounded-full mb-8"
              style={{ background: "rgba(0,245,255,0.08)", color: "#00F5FF", border: "1px solid rgba(0,245,255,0.2)" }}>
              <ShoppingCart size={11} /> Retail & Supermarket · Peak-Demand Scale · 24/7 Always-On
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-5xl sm:text-6xl lg:text-7xl font-extrabold leading-[1.06] tracking-tight text-white mb-7"
          >
            Retail AI Agents<br />
            for{" "}
            <span className="gradient-text-nova">Peak-Demand Scale.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl text-gray-400 leading-relaxed max-w-3xl mx-auto mb-12"
          >
            Handle order queries, inventory escalations, and customer support at Christmas-peak volumes
            — without seasonal headcount. Always-on, always consistent,{" "}
            <strong style={{ color: "#00F5FF" }}>sub-600ms</strong> response times.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <GlowButton href="/book" variant="cyan" size="lg" icon={<ArrowRight size={16} />}>
              Book Discovery Call
            </GlowButton>
            <GlowButton href="/contact" variant="outline" size="lg">
              Submit a Brief
            </GlowButton>
          </motion.div>
        </div>
      </section>

      {/* ── METRICS STRIP ────────────────────────────────────────────────────── */}
      <section style={{ background: "#080808", borderBottom: "1px solid rgba(255,255,255,0.04)" }}>
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { val: 68,   suffix: "%",   label: "Average query deflection rate" },
              { val: 10,   suffix: "×",   label: "Peak-load scalability multiplier" },
              { val: 99.9, suffix: "%",   label: "Uptime SLA guaranteed" },
              { val: 0,    suffix: "",    label: "Seasonal headcount increase" },
            ].map(({ val, suffix, label }) => (
              <div key={label}>
                <p className="text-3xl font-extrabold" style={{ color: "#00F5FF" }}>
                  <AnimatedCounter end={val} suffix={suffix} decimals={val % 1 !== 0 ? 1 : 0} />
                </p>
                <p className="text-xs text-gray-600 mt-1">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CAPABILITIES ─────────────────────────────────────────────────────── */}
      <section className="py-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <p className="text-xs font-bold tracking-widest uppercase mb-3" style={{ color: "#00F5FF" }}>Core Capabilities</p>
            <h2 className="text-4xl font-extrabold text-white">Two Tiers. One Seamless Experience.</h2>
            <p className="mt-3 text-gray-500 max-w-xl mx-auto">
              From instant order resolution to complex inventory escalation — built for UK retail operations.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <HolographicCard variant="cyan" className="p-7 flex flex-col">
              <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-5"
                style={{ background: "rgba(0,245,255,0.1)", color: "#00F5FF" }}>
                <Package size={22} />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Order & Delivery Management</h3>
              <p className="text-sm text-gray-500 leading-relaxed flex-1">
                Real-time status, proactive delay notifications, substitution handling, and one-click returns
                initiation — fully autonomous with{" "}
                <strong style={{ color: "#00F5FF" }}>zero human in the loop</strong> for standard flows.
              </p>
              <div className="mt-6 space-y-2">
                {[
                  "Live tracking & ETA updates",
                  "Redirect and safe-place management",
                  "Returns & refund initiation",
                ].map(f => (
                  <div key={f} className="flex items-start gap-2 text-xs text-gray-400">
                    <CheckCircle size={12} className="shrink-0 mt-0.5" style={{ color: "#00F5FF" }} /> {f}
                  </div>
                ))}
              </div>
            </HolographicCard>

            <HolographicCard variant="default" className="p-7 flex flex-col" style={{ borderColor: "rgba(245,158,11,0.25)" }}>
              <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-5"
                style={{ background: "rgba(245,158,11,0.1)", color: "#F59E0B" }}>
                <TrendingUp size={22} />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Inventory & Supplier Escalations</h3>
              <p className="text-sm text-gray-500 leading-relaxed flex-1">
                Automated OOS notifications, supplier delay routing, and stock-level queries resolved in
                milliseconds — without a human touching a ticket.
              </p>
              <div className="mt-6 space-y-2">
                {[
                  "Real-time stock availability lookup",
                  "Supplier delay proactive comms",
                  "Automated substitution suggestions",
                ].map(f => (
                  <div key={f} className="flex items-start gap-2 text-xs text-gray-400">
                    <CheckCircle size={12} className="shrink-0 mt-0.5" style={{ color: "#F59E0B" }} /> {f}
                  </div>
                ))}
              </div>
            </HolographicCard>

            <HolographicCard variant="default" className="p-7 flex flex-col" style={{ borderColor: "rgba(34,197,94,0.25)" }}>
              <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-5"
                style={{ background: "rgba(34,197,94,0.1)", color: "#4ADE80" }}>
                <Clock size={22} />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Loyalty & Personalisation</h3>
              <p className="text-sm text-gray-500 leading-relaxed flex-1">
                Points balance, tier status, promotional disputes, and personalised product recommendations
                — powered by your existing loyalty platform, no migration required.
              </p>
              <div className="mt-6 space-y-2">
                {[
                  "Points & tier status queries",
                  "Promotional dispute resolution",
                  "Personalised basket suggestions",
                ].map(f => (
                  <div key={f} className="flex items-start gap-2 text-xs text-gray-400">
                    <CheckCircle size={12} className="shrink-0 mt-0.5" style={{ color: "#22C55E" }} /> {f}
                  </div>
                ))}
              </div>
            </HolographicCard>
          </div>
        </div>
      </section>

      {/* ── LIVE TRANSCRIPT ──────────────────────────────────────────────────── */}
      <section style={{ background: "#080808", borderTop: "1px solid rgba(255,255,255,0.04)" }} className="py-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <p className="text-xs font-bold tracking-widest uppercase mb-3" style={{ color: "#00F5FF" }}>Live Production Trace</p>
            <h2 className="text-3xl font-extrabold text-white">A Missed Delivery, Resolved in Real-Time</h2>
            <p className="mt-3 text-gray-500 max-w-xl mx-auto">
              Replayed from a production session — names anonymised, latency unedited.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
            {/* Transcript window */}
            <div className="rounded-2xl overflow-hidden" style={{
              background: "#0a0a0a", border: "1px solid rgba(0,245,255,0.12)",
              boxShadow: "0 0 40px rgba(0,245,255,0.04)"
            }}>
              <div className="flex items-center gap-2 px-4 py-3" style={{
                background: "#0d0d0d", borderBottom: "1px solid rgba(255,255,255,0.04)"
              }}>
                <span style={{ width: 9, height: 9, borderRadius: "50%", background: "#FF5F57", display: "inline-block" }} />
                <span style={{ width: 9, height: 9, borderRadius: "50%", background: "#FEBC2E", display: "inline-block" }} />
                <span style={{ width: 9, height: 9, borderRadius: "50%", background: "#28C840", display: "inline-block" }} />
                <span className="ml-2 text-xs text-gray-600 font-mono">session_f7e2 · retail-l1-agent v2.4.0 · 09:47 BST</span>
                <span className="ml-auto flex items-center gap-1 text-[10px] font-semibold" style={{ color: "#22C55E" }}>
                  <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#22C55E", display: "inline-block" }} />
                  LIVE
                </span>
              </div>

              <div className="p-5 space-y-3">
                {TRANSCRIPT.map((msg, i) => (
                  <TranscriptMsg key={i} msg={msg} index={i} />
                ))}
              </div>

              <div className="px-5 py-3 flex flex-wrap gap-4 text-[11px] text-gray-600"
                style={{ borderTop: "1px solid rgba(255,255,255,0.04)" }}>
                <span>Resolution: <strong className="text-gray-400">L1 autonomous</strong> · 2 tool calls</span>
                <span>Latency: <strong className="text-gray-400">0.54s</strong> avg</span>
                <span>Human handoff: <strong className="text-gray-400">0</strong></span>
              </div>
            </div>

            {/* Callout */}
            <div>
              <h3 className="text-2xl font-bold text-white mb-5">What just happened</h3>
              <p className="text-gray-400 leading-relaxed mb-8">
                A textbook L1 resolution: the agent surfaced the M25 delay context, proactively offered
                a delivery preference change, actioned it in the OMS, and confirmed via SMS — all with
                no human involvement. The full trace is available in your client portal.
              </p>

              <div className="grid grid-cols-2 gap-4 mb-8">
                {[
                  { val: "68%",   label: "L1 deflection rate" },
                  { val: "0.54s", label: "Median end-to-end latency" },
                  { val: "24/7",  label: "Always-on coverage" },
                  { val: "0",     label: "PII leakage incidents" },
                ].map(({ val, label }) => (
                  <HolographicCard key={label} variant="cyan" className="p-4 text-center">
                    <p className="text-2xl font-extrabold mb-1" style={{ color: "#00F5FF" }}>{val}</p>
                    <p className="text-xs text-gray-600">{label}</p>
                  </HolographicCard>
                ))}
              </div>

              <Link href="/book"
                className="inline-flex items-center gap-2 text-sm font-bold px-6 py-3.5 rounded-xl"
                style={{ background: "#00F5FF", color: "#000", boxShadow: "0 0 20px rgba(0,245,255,0.35)" }}>
                See Full Architecture Walkthrough <ArrowRight size={14} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── TECHNICAL TRUST SIGNALS ──────────────────────────────────────────── */}
      <section className="py-24" style={{ borderTop: "1px solid rgba(0,245,255,0.05)" }}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <p className="text-xs font-bold tracking-widest uppercase mb-3" style={{ color: "#00F5FF" }}>Technical Architecture</p>
            <h2 className="text-3xl font-extrabold text-white">Built for Retail&apos;s Unpredictable Traffic</h2>
            <p className="mt-3 text-gray-500 max-w-xl mx-auto">
              Serverless-first stack that auto-scales from quiet Tuesdays to Black Friday peaks.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <HolographicCard variant="cyan" className="p-6">
              <div className="w-10 h-10 rounded-lg flex items-center justify-center mb-4"
                style={{ background: "rgba(0,245,255,0.1)", color: "#00F5FF" }}>
                <Globe size={18} />
              </div>
              <h3 className="font-bold text-white mb-2">No Rip-and-Replace</h3>
              <p className="text-sm text-gray-500 leading-relaxed">
                Integrates with your existing OMS, WMS, ERP, and loyalty platforms via REST APIs and
                webhooks — zero migration risk, live in 6–10 weeks.
              </p>
            </HolographicCard>

            <HolographicCard variant="cyan" className="p-6">
              <div className="w-10 h-10 rounded-lg flex items-center justify-center mb-4"
                style={{ background: "rgba(0,245,255,0.1)", color: "#00F5FF" }}>
                <Server size={18} />
              </div>
              <h3 className="font-bold text-white mb-2">10× Peak Scalability</h3>
              <p className="text-sm text-gray-500 leading-relaxed">
                Serverless architecture (AWS Lambda + Redis) auto-scales for Christmas, Easter, and
                promotional peaks — tested at 10× normal throughput before go-live.
              </p>
            </HolographicCard>

            <HolographicCard variant="cyan" className="p-6">
              <div className="w-10 h-10 rounded-lg flex items-center justify-center mb-4"
                style={{ background: "rgba(0,245,255,0.1)", color: "#00F5FF" }}>
                <Cpu size={18} />
              </div>
              <h3 className="font-bold text-white mb-2">GDPR by Design</h3>
              <p className="text-sm text-gray-500 leading-relaxed">
                All processing within your cloud tenant. PII redaction before LLM calls.
                GDPR and UK data residency requirements baked in from day one.
              </p>
            </HolographicCard>
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
              <div key={name} className="p-3.5 rounded-xl text-center"
                style={{ background: "rgba(0,245,255,0.03)", border: "1px solid rgba(0,245,255,0.1)" }}>
                <p className="font-semibold text-white text-sm mb-0.5">{name}</p>
                <p className="text-xs text-gray-600">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── DELIVERY STEPS ───────────────────────────────────────────────────── */}
      <section style={{ background: "#080808", borderTop: "1px solid rgba(255,255,255,0.04)" }} className="py-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <p className="text-xs font-bold tracking-widest uppercase mb-3" style={{ color: "#00F5FF" }}>Delivery Timeline</p>
            <h2 className="text-3xl font-extrabold text-white">From Brief to Live in 6–10 Weeks</h2>
            <p className="mt-3 text-gray-500 max-w-xl mx-auto">
              No lengthy enterprise pilots. Discovery, build, test, and deploy — in one sprint cycle.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              { num: "01", title: "Catalogue & Policy Ingestion", desc: "We ingest your full product catalogue, return policies, and support playbooks into the RAG pipeline." },
              { num: "02", title: "Agent Design & Integration",   desc: "We build the agent graph and connect it to your OMS, WMS, and loyalty systems via REST APIs." },
              { num: "03", title: "Load Testing & QA",           desc: "Peak-load simulation at 10× normal throughput. E2E validation across all critical customer journeys." },
              { num: "04", title: "Deploy & Scale",              desc: "Serverless architecture auto-scales for Christmas, summer campaigns, and promotional peaks." },
            ].map(({ num, title, desc }, i) => (
              <motion.div
                key={num}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                <HolographicCard variant="cyan" className="p-6 h-full text-center">
                  <div className="text-4xl font-extrabold mb-3" style={{ color: "#00F5FF" }}>{num}</div>
                  <h3 className="font-bold text-white text-sm mb-2">{title}</h3>
                  <p className="text-xs text-gray-500 leading-relaxed">{desc}</p>
                </HolographicCard>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TALENT LAB ───────────────────────────────────────────────────────── */}
      <section className="py-20" style={{ borderTop: "1px solid rgba(0,245,255,0.05)" }}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <HolographicCard variant="purple" className="p-8 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 pointer-events-none"
              style={{ background: "radial-gradient(circle at top right, rgba(139,92,246,0.07) 0%, transparent 70%)" }} />

            <div className="flex items-start gap-4 mb-5">
              <div className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0"
                style={{ background: "rgba(139,92,246,0.12)", color: "#A78BFA" }}>
                <Building2 size={20} />
              </div>
              <div>
                <span className="text-[10px] font-bold tracking-widest uppercase px-2 py-0.5 rounded-full"
                  style={{ background: "rgba(139,92,246,0.12)", color: "#A78BFA", border: "1px solid rgba(139,92,246,0.25)" }}>
                  SupraCloud Talent Lab
                </span>
                <h3 className="text-xl font-bold text-white mt-2">Battle-Tested Before You See It</h3>
              </div>
            </div>

            <p className="text-gray-400 leading-relaxed text-base mb-4">
              Every retail agent is stress-tested in the{" "}
              <strong style={{ color: "#A78BFA" }}>SupraCloud Talent Lab</strong>, simulating Black Friday
              volumes, edge-case substitution scenarios, and adversarial customer journeys — before
              we write a single line in your production environment.
            </p>
            <p className="text-gray-500 leading-relaxed text-sm">
              Graduate engineers on our Academy programme work under senior engineers on live retail briefs,
              generating a continuous stream of test cases that make our agents genuinely robust. What most
              vendors call a &ldquo;pilot&rdquo;, we call Tuesday.
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              <Link href="/careers/internships" className="text-sm font-semibold px-4 py-2 rounded-lg text-gray-400"
                style={{ border: "1px solid rgba(255,255,255,0.08)", background: "rgba(255,255,255,0.03)" }}>
                Graduate Programme →
              </Link>
              <Link href="/careers/training" className="text-sm font-semibold px-4 py-2 rounded-lg text-gray-400"
                style={{ border: "1px solid rgba(255,255,255,0.08)", background: "rgba(255,255,255,0.03)" }}>
                Training Pathways →
              </Link>
            </div>
          </HolographicCard>
        </div>
      </section>

      {/* ── TRUST BADGES ─────────────────────────────────────────────────────── */}
      <section style={{ background: "#080808", borderTop: "1px solid rgba(255,255,255,0.04)" }} className="py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <TrustBadgeRow />
        </div>
      </section>

      {/* ── DUAL CTA ─────────────────────────────────────────────────────────── */}
      <section className="py-24 text-center" style={{ borderTop: "1px solid rgba(0,245,255,0.06)" }}>
        <div className="max-w-2xl mx-auto px-4">
          <p className="text-xs font-bold tracking-widest uppercase mb-4" style={{ color: "#00F5FF" }}>Ready to Scale?</p>
          <h2 className="text-4xl font-extrabold text-white mb-4">
            Your peak season is coming.<br />
            <span className="gradient-text-nova">Are your agents ready?</span>
          </h2>
          <p className="text-gray-400 mb-10 leading-relaxed">
            30-minute call. We map your support volumes, OMS integrations, and peak-load requirements.
            You&apos;ll leave with a concrete technical blueprint — no slides, no sales deck.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <GlowButton href="/book" variant="cyan" size="lg" icon={<ArrowRight size={16} />}>
              Book Discovery Call
            </GlowButton>
            <GlowButton href="/contact" variant="outline" size="lg">
              Submit a Brief
            </GlowButton>
          </div>
        </div>
      </section>
    </div>
  );
}
