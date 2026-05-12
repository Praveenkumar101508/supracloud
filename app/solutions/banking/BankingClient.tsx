"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
  Shield, Zap, CheckCircle, ArrowRight, Brain,
  Lock, FileText, AlertTriangle, Clock, Server, Globe, Building2,
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
  { role: "customer", label: "Customer",                        text: "I see a £128.40 charge from \"GLOBALPAY*WEB\" on my Platinum card I don't recognise. Can you cancel it?" },
  { role: "tool",     label: "tool · core_banking.lookup_txn", text: "txn_id=tx_2c91 · merchant=GLOBALPAY · auth=2026-05-04 · amt=128.40 · channel=card-not-present · 3DS=skipped" },
  { role: "agent",    label: "SupraCloud Agent",                text: "I can see the transaction — £128.40 to GLOBALPAY on 4 May. It bypassed 3D-Secure, which is unusual on your Platinum card. To raise a Section 75 dispute, can you confirm: did anyone in your household authorise it?" },
  { role: "customer", label: "Customer",                        text: "No-one. I haven't used that card online this week." },
  { role: "tool",     label: "tool · fraud.flag_and_freeze",    text: "card_id=plat_4421 · status=frozen · replacement=expedited · eta=2 business days" },
  { role: "agent",    label: "SupraCloud Agent",                text: "Card frozen and a replacement is on its way (2 business days). I've opened dispute case #DSP-9041 — provisional credit of £128.40 will land within 24h. You'll get an SMS when it's posted." },
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

// ── Icon box ──────────────────────────────────────────────────────────────────
function IconBox({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={cn("w-10 h-10 rounded-lg flex items-center justify-center", className)}>
      {children}
    </div>
  );
}

// ── Section label ─────────────────────────────────────────────────────────────
function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-xs font-bold tracking-widest uppercase mb-3 text-[var(--cyan)]">
      {children}
    </p>
  );
}

// ── Page ──────────────────────────────────────────────────────────────────────
export default function BankingClient() {
  return (
    <div className="bg-void min-h-screen">
      <NeuralBackground />

      {/* ── HERO ──────────────────────────────────────────────────────────── */}
      <section className="relative py-28 overflow-hidden border-b border-cyan-subtle">
        {/* Radial hero glow */}
        <div className="absolute inset-0 pointer-events-none"
          style={{ background: "radial-gradient(ellipse 80% 55% at 50% -5%, rgba(0,245,255,0.10) 0%, transparent 65%)" }} />
        {/* Dot grid */}
        <div className="absolute inset-0 pointer-events-none opacity-20"
          style={{ backgroundImage: "radial-gradient(rgba(0,245,255,0.2) 1px, transparent 1px)", backgroundSize: "28px 28px" }} />

        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.span
            className="label-cyan mb-8 inline-flex"
            initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
          >
            <Shield size={11} /> Enterprise Banking · FCA Compliant · GDPR Native
          </motion.span>

          <motion.h1
            className="text-5xl sm:text-6xl lg:text-7xl font-extrabold leading-[1.06] tracking-tight text-white mb-7"
            initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}
          >
            Precision Engineering<br />
            for the{" "}<span className="gradient-text-nova">Financial Sector.</span>
          </motion.h1>

          <motion.p
            className="text-xl text-gray-400 leading-relaxed max-w-3xl mx-auto mb-4"
            initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }}
          >
            Secure, Compliant, Sub-Second Latency.
          </motion.p>

          <motion.p
            className="text-lg text-gray-500 leading-relaxed max-w-3xl mx-auto mb-12"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.35 }}
          >
            In an industry where milliseconds define market positions, our AI Agents move beyond
            &lsquo;chat&rsquo; to execute complex financial workflows with{" "}
            <strong className="text-[var(--cyan)]">0.1s response times</strong>.
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-10"
            initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.45 }}
          >
            <GlowButton href="/book" variant="cyan" size="lg" icon={<FileText size={15} />}>
              Request Technical Whitepaper
            </GlowButton>
            <GlowButton href="/contact" variant="outline" size="lg" icon={<Shield size={15} />}>
              Book Security Audit
            </GlowButton>
          </motion.div>

          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }}>
            <TrustBadgeRow animate={false} className="justify-center" />
          </motion.div>
        </div>
      </section>

      {/* ── METRICS STRIP ────────────────────────────────────────────────── */}
      <section className="bg-[rgba(0,245,255,0.02)] border-b border-void">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {[
              { value: 63,  suffix: "%",  label: "Average L1 deflection rate" },
              { value: 200, prefix: "<",  suffix: "ms", label: "Human-equivalent latency" },
              { value: 40,  suffix: "%",  label: "Faster fraud detection" },
              { value: 25,  suffix: "%",  label: "KYC drop-off reduction" },
            ].map((s) => (
              <div key={s.label}>
                <p className="text-3xl font-extrabold gradient-text-nova">
                  <AnimatedCounter value={s.value} prefix={s.prefix} suffix={s.suffix} duration={2000} />
                </p>
                <p className="text-xs text-gray-600 mt-1">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── THREE ENGINES ────────────────────────────────────────────────── */}
      <section className="py-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <SectionLabel>Core Capabilities</SectionLabel>
            <h2 className="text-4xl font-extrabold text-white">Three Engines. One Platform.</h2>
            <p className="mt-3 text-gray-500 max-w-xl mx-auto">
              Purpose-built for the regulatory demands and operational complexity of UK financial services.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { icon: <Brain size={22} />,         title: "Autonomous L1/L2 Support",     variant: "cyan"    as const, iconClass: "bg-[var(--cyan-dim)] text-[var(--cyan)]",   checkColor: "text-[var(--cyan)]",   desc: "Eliminate wait times. Agents handle transaction queries, card freezes, and account management with human-level nuance — resolving the majority of contacts with zero human in the loop.", features: ["Balance enquiries & transaction lookup", "Dispute initiation & card management", "Secure account resets with MFA validation"] },
              { icon: <AlertTriangle size={22} />, title: "Fraud Detection Neural Link",   variant: "purple"  as const, iconClass: "bg-red-500/10 text-red-400",               checkColor: "text-red-400",         desc: "Real-time agents that identify and flag suspicious behaviour 40% faster than legacy systems — with explainable outputs your compliance team can stand behind.", features: ["Real-time transaction scoring", "Cross-channel anomaly detection", "Section 75 dispute automation"] },
              { icon: <FileText size={22} />,      title: "KYC/AML Automation",            variant: "default" as const, iconClass: "bg-emerald-500/10 text-emerald-400",       checkColor: "text-emerald-400",     desc: "Streamline UK-compliant onboarding, reducing drop-off by 25%. Automated document verification, risk scoring, and PEP/sanctions screening — no rip-and-replace.", features: ["Automated document verification", "PEP & sanctions screening", "Real-time risk scoring engine"] },
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

      {/* ── ANIMATED TRANSCRIPT ──────────────────────────────────────────── */}
      <section className="bg-void-2 border-t border-void py-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div className="text-center mb-14"
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <SectionLabel>Live Production Trace</SectionLabel>
            <h2 className="text-3xl font-extrabold text-white">A Disputed Card Transaction, End-to-End</h2>
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
                  session_a83f · banking-l2-agent v3.2.1 · 14:02 BST
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
                <span>Resolution: <strong className="text-gray-400">L2 autonomous</strong> · 4 tool calls</span>
                <span>SLA: <strong className="text-gray-400">3.2s</strong> avg latency</span>
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
                A textbook L2 flow: the agent gathered the missing authorisation fact, made two privileged
                tool calls (freeze card, open dispute), and closed with a concrete SLA — no human in the loop.
              </p>

              <div className="grid grid-cols-2 gap-4 mb-8">
                {[
                  { val: "60%+", label: "L1 deflection (SLA)" },
                  { val: "90%+", label: "L2 first-contact resolution" },
                  { val: "3.2s", label: "Median end-to-end latency" },
                  { val: "0",    label: "PII leakage incidents" },
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

      {/* ── TRUST SIGNALS ────────────────────────────────────────────────── */}
      <section className="py-24 border-t border-cyan-subtle">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div className="text-center mb-14"
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <SectionLabel>Technical Trust Signals</SectionLabel>
            <h2 className="text-3xl font-extrabold text-white">Built for Your Risk Team to Approve</h2>
            <p className="mt-3 text-gray-500 max-w-xl mx-auto">
              The technical guarantees your CTO, CISO, and compliance function will require before sign-off.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {[
              { icon: <Globe size={18} />, title: "Data Sovereignty",    desc: "GDPR and UK data residency protocols. All processing runs within your cloud tenant — data never leaves your perimeter." },
              { icon: <Server size={18} />, title: "Legacy Bridge",       desc: "Compatible with COBOL cores and modern REST APIs. Bridges legacy core banking systems — no migration risk." },
              { icon: <Zap size={18} />,    title: "Sub-200ms Latency",   desc: "Human-equivalent conversation speeds (<200ms). Agents feel like a knowledgeable colleague — measurable from day one." },
            ].map((card, i) => (
              <motion.div key={card.title}
                initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ delay: i * 0.1 }}>
                <HolographicCard className="p-6">
                  <IconBox className="bg-[var(--cyan-dim)] text-[var(--cyan)] mb-4">
                    {card.icon}
                  </IconBox>
                  <h3 className="font-bold text-white mb-2">{card.title}</h3>
                  <p className="text-sm text-gray-500 leading-relaxed">{card.desc}</p>
                </HolographicCard>
              </motion.div>
            ))}
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { icon: <Shield size={14} />,       label: "FCA Compliance Ready" },
              { icon: <Lock size={14} />,         label: "ISO 27001 Aligned" },
              { icon: <CheckCircle size={14} />,  label: "GDPR by Design" },
              { icon: <Clock size={14} />,        label: "99.97% Uptime SLA" },
            ].map(({ icon, label }) => (
              <div key={label} className="metric-card flex items-center gap-2.5 text-left">
                <span className="text-[var(--cyan)] shrink-0">{icon}</span>
                <span className="text-sm font-semibold text-gray-400">{label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TALENT LAB ───────────────────────────────────────────────────── */}
      <section className="bg-void-2 border-t border-void py-20">
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
                  <h3 className="text-xl font-bold text-white mt-2">Our Secret Weapon: Battle-Tested Before You See It</h3>
                </div>
              </div>
              <p className="text-gray-400 leading-relaxed mb-4">
                Our solutions are battle-tested in the{" "}
                <strong className="text-[var(--purple)]">SupraCloud Talent Lab</strong>,
                simulating millions of customer interactions before reaching your infrastructure.
              </p>
              <p className="text-gray-500 leading-relaxed text-sm mb-6">
                Graduate engineers work under senior engineers on live briefs — generating adversarial test
                cases, edge-case simulations, and compliance stress tests. What most vendors call a
                &ldquo;pilot&rdquo;, we call Tuesday.
              </p>
              <div className="flex flex-wrap gap-3">
                <GlowButton href="/talent/internships" variant="outline" size="sm">Graduate Programme →</GlowButton>
                <GlowButton href="/talent/programs"    variant="outline" size="sm">Training Pathways →</GlowButton>
              </div>
            </HolographicCard>
          </motion.div>
        </div>
      </section>

      {/* ── ARCHITECTURE ─────────────────────────────────────────────────── */}
      <section className="py-24 border-t border-cyan-subtle">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div className="text-center mb-14"
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <SectionLabel>Reference Architecture</SectionLabel>
            <h2 className="text-3xl font-extrabold text-white">How a Banking AI Agent Resolves a Query</h2>
          </motion.div>

          <div className="flex flex-col md:flex-row items-stretch gap-px">
            {[
              { eye: "Channel",      title: "Customer Touchpoint", desc: "Mobile · Web Chat · IVR · WhatsApp", active: false, first: true,  last: false },
              { eye: "Gateway",      title: "Auth & Routing",      desc: "OAuth2 · MFA · PII redaction",       active: false, first: false, last: false },
              { eye: "Orchestrator", title: "LangGraph Runtime",   desc: "Plans, calls tools, streams response", active: true, first: false, last: false },
              { eye: "Output",       title: "Resolved & Logged",   desc: "SLA tracked · QA replay-ready",       active: false, first: false, last: true  },
            ].map((node, i) => (
              <div key={node.eye}
                className={cn(
                  "arch-node relative",
                  node.active ? "arch-node-active" : "",
                  node.first  ? "rounded-l-xl" : "",
                  node.last   ? "rounded-r-xl" : "",
                )}>
                <span className="text-[10px] font-bold tracking-widest uppercase mb-2 text-[var(--cyan)]">{node.eye}</span>
                <p className="font-bold text-white text-sm mb-1">{node.title}</p>
                <p className="text-xs text-gray-600">{node.desc}</p>
                {i < 3 && (
                  <div className="hidden md:block absolute top-1/2 -right-3 z-10 w-4 h-0.5 bg-[var(--cyan)]" />
                )}
              </div>
            ))}
          </div>

          <div className="mt-4 flex flex-col md:flex-row gap-4">
            {[
              { eye: "Knowledge",  title: "Banking RAG Index",  desc: "Policy docs · Product T&Cs · FAQ corpus" },
              { eye: "Tools",      title: "Core Banking APIs",  desc: "Balance · Payments · Cards · Disputes" },
              { eye: "Escalation", title: "L2 / Human Handoff", desc: "Full context transfer · 0 customer repeat" },
            ].map(node => (
              <div key={node.eye} className="flex-1 p-4 rounded-xl text-center border border-dashed border-[var(--cyan)]/20 bg-void-4">
                <span className="text-[10px] font-bold tracking-widest uppercase text-[var(--cyan)]">{node.eye}</span>
                <p className="font-semibold text-white text-sm mt-1 mb-0.5">{node.title}</p>
                <p className="text-xs text-gray-600">{node.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── DUAL CTA ─────────────────────────────────────────────────────── */}
      <section className="bg-void-2 border-t border-cyan-subtle py-24 text-center">
        <div className="max-w-2xl mx-auto px-4">
          <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <SectionLabel>Ready to Build?</SectionLabel>
            <h2 className="text-4xl font-extrabold text-white mb-4">
              Your engineers have questions.<br />
              <span className="gradient-text-nova">Ours have answers.</span>
            </h2>
            <p className="text-gray-400 mb-10 leading-relaxed">
              30-minute call. We map your workflows, data perimeter, escalation paths, and compliance
              constraints. You&apos;ll leave with a concrete technical blueprint — no slides, no sales deck.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <GlowButton href="/book"    variant="cyan"    size="lg" icon={<FileText size={15} />}>Request Technical Whitepaper</GlowButton>
              <GlowButton href="/contact" variant="outline" size="lg" icon={<Shield size={15} />}>Book Security Audit</GlowButton>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
