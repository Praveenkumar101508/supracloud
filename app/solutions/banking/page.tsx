import type { Metadata } from "next";
import Link from "next/link";

import {
  Shield, Zap, CheckCircle, ArrowRight, Brain, Lock,
  FileText, AlertTriangle, Clock, Server, Globe, Building2,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Banking AI Agents | SupraCloud",
  description:
    "Precision-engineered AI agents for financial services. Sub-200ms latency, FCA-compliant, GDPR-native. Autonomous L1/L2 support, fraud detection, and KYC/AML automation.",
  openGraph: {
    title: "Banking AI Agents — Secure, Compliant, Sub-Second Latency | SupraCloud",
    description:
      "Production-grade autonomous AI agents for UK banking. L1/L2 support, fraud detection 40% faster, KYC/AML automation. FCA-compliant. Book a security audit.",
    url: "https://supracloud.co.uk/solutions/banking",
    siteName: "SupraCloud",
    locale: "en_GB",
  },
  alternates: { canonical: "https://supracloud.co.uk/solutions/banking" },
};

/* ── Transcript data ──────────────────────────────────────── */
const TRANSCRIPT = [
  { role: "customer", label: "Customer", text: "I see a £128.40 charge from \"GLOBALPAY*WEB\" on my Platinum card I don't recognise. Can you cancel it?" },
  { role: "tool", label: "tool · core_banking.lookup_txn", text: "txn_id=tx_2c91 · merchant=GLOBALPAY · auth=2026-05-04 · amt=128.40 · channel=card-not-present · 3DS=skipped" },
  { role: "agent", label: "SupraCloud Agent", text: "I can see the transaction — £128.40 to GLOBALPAY on 4 May. It bypassed 3D-Secure, which is unusual on your Platinum card. To raise a Section 75 dispute, can you confirm: did anyone in your household authorise it?" },
  { role: "customer", label: "Customer", text: "No-one. I haven't used that card online this week." },
  { role: "tool", label: "tool · fraud.flag_and_freeze", text: "card_id=plat_4421 · status=frozen · replacement=expedited · eta=2 business days" },
  { role: "agent", label: "SupraCloud Agent", text: "Card frozen and a replacement is on its way (2 business days). I've opened dispute case #DSP-9041 — provisional credit of £128.40 will land within 24h. You'll get an SMS when it's posted." },
];

const bubbleStyle: Record<string, React.CSSProperties> = {
  customer: { background: "rgba(0,112,255,0.08)", border: "1px solid rgba(0,112,255,0.2)", marginLeft: "auto", maxWidth: "80%" },
  agent: { background: "rgba(0,112,255,0.14)", border: "1px solid rgba(0,112,255,0.3)", maxWidth: "80%" },
  tool: { background: "rgba(245,158,11,0.06)", border: "1px solid rgba(245,158,11,0.2)", fontFamily: "monospace", fontSize: 11 },
};

export default function BankingPage() {
  return (
    <div style={{ background: "#050505" }}>

      {/* ── HERO ──────────────────────────────────────────── */}
      <section className="relative py-28 overflow-hidden" style={{ borderBottom: "1px solid rgba(0,112,255,0.08)" }}>
        <div className="absolute inset-0 pointer-events-none" style={{
          background: "radial-gradient(ellipse 80% 55% at 50% -5%, rgba(0,112,255,0.13) 0%, transparent 65%)"
        }} />
        {/* Dot grid */}
        <div className="absolute inset-0 opacity-30 pointer-events-none" style={{
          backgroundImage: "radial-gradient(rgba(0,112,255,0.25) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }} />

        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="inline-flex items-center gap-2 text-[10px] font-bold tracking-widest uppercase px-3 py-1.5 rounded-full mb-8"
            style={{ background: "rgba(0,112,255,0.1)", color: "#60A5FA", border: "1px solid rgba(0,112,255,0.25)" }}>
            <Shield size={11} /> Enterprise Banking · FCA Compliant · GDPR Native
          </span>

          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold leading-[1.06] tracking-tight text-white mb-7">
            Precision Engineering<br />
            for the{" "}
            <span style={{
              background: "linear-gradient(135deg, #0070FF 0%, #3B8EFF 50%, #60A5FA 100%)",
              WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text"
            }}>
              Financial Sector.
            </span>
          </h1>

          <p className="text-xl text-gray-400 leading-relaxed max-w-3xl mx-auto mb-4">
            Secure, Compliant, Sub-Second Latency.
          </p>
          <p className="text-lg text-gray-500 leading-relaxed max-w-3xl mx-auto mb-12">
            In an industry where milliseconds define market positions, SupraCloud provides the infrastructure
            for the next generation of banking. Our AI Agents move beyond &lsquo;chat&rsquo; to execute complex
            financial workflows with <strong style={{ color: "#3B8EFF" }}>0.1s response times</strong>.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/book"
              className="inline-flex items-center gap-2 text-sm font-bold px-7 py-4 rounded-xl text-white"
              style={{ background: "#0070FF", boxShadow: "0 0 28px rgba(0,112,255,0.45)" }}>
              Request Technical Whitepaper <FileText size={15} />
            </Link>
            <Link href="/contact"
              className="inline-flex items-center gap-2 text-sm font-bold px-7 py-4 rounded-xl text-gray-300"
              style={{ border: "1px solid rgba(255,255,255,0.12)", background: "rgba(255,255,255,0.04)" }}>
              Book Security Audit <Shield size={15} />
            </Link>
          </div>
        </div>
      </section>

      {/* ── LIVE METRICS STRIP ─────────────────────────────── */}
      <section style={{ background: "#080808", borderBottom: "1px solid rgba(255,255,255,0.04)" }}>
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-7">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {[
              { val: "63%",   label: "Average L1 deflection rate" },
              { val: "<200ms", label: "Human-equivalent latency" },
              { val: "40%",   label: "Faster fraud detection" },
              { val: "25%",   label: "KYC drop-off reduction" },
            ].map(({ val, label }) => (
              <div key={label}>
                <p className="text-3xl font-extrabold" style={{ color: "#0070FF" }}>{val}</p>
                <p className="text-xs text-gray-600 mt-1">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── THE BIG THREE ──────────────────────────────────── */}
      <section className="py-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <p className="text-xs font-bold tracking-widest uppercase mb-3" style={{ color: "#0070FF" }}>Core Capabilities</p>
            <h2 className="text-4xl font-extrabold text-white">Three Engines. One Platform.</h2>
            <p className="mt-3 text-gray-500 max-w-xl mx-auto">
              Purpose-built for the regulatory demands and operational complexity of UK financial services.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Feature 1 */}
            <div className="card p-7 flex flex-col">
              <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-5"
                style={{ background: "rgba(0,112,255,0.12)", color: "#3B8EFF" }}>
                <Brain size={22} />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Autonomous L1/L2 Support</h3>
              <p className="text-sm text-gray-500 leading-relaxed flex-1">
                Eliminate wait times. Our agents handle transaction queries, card freezes, and account
                management with human-level nuance — resolving the majority of contacts with zero human
                in the loop. FCA-aware escalation built in from day one.
              </p>
              <div className="mt-6 space-y-2">
                {["Balance enquiries & transaction lookup", "Dispute initiation & card management", "Secure account resets with MFA validation"].map(f => (
                  <div key={f} className="flex items-start gap-2 text-xs text-gray-400">
                    <CheckCircle size={12} className="shrink-0 mt-0.5" style={{ color: "#0070FF" }} /> {f}
                  </div>
                ))}
              </div>
            </div>

            {/* Feature 2 */}
            <div className="card p-7 flex flex-col" style={{ borderColor: "rgba(239,68,68,0.2)" }}>
              <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-5"
                style={{ background: "rgba(239,68,68,0.1)", color: "#F87171" }}>
                <AlertTriangle size={22} />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Fraud Detection Neural Link</h3>
              <p className="text-sm text-gray-500 leading-relaxed flex-1">
                Real-time agents that identify and flag suspicious transaction behaviour{" "}
                <strong style={{ color: "#F87171" }}>40% faster than legacy systems</strong>. Pattern
                recognition across channels, devices, and behavioural signals — with explainable outputs
                your compliance team can stand behind.
              </p>
              <div className="mt-6 space-y-2">
                {["Real-time transaction scoring", "Cross-channel anomaly detection", "Section 75 dispute automation"].map(f => (
                  <div key={f} className="flex items-start gap-2 text-xs text-gray-400">
                    <CheckCircle size={12} className="shrink-0 mt-0.5" style={{ color: "#EF4444" }} /> {f}
                  </div>
                ))}
              </div>
            </div>

            {/* Feature 3 */}
            <div className="card p-7 flex flex-col" style={{ borderColor: "rgba(34,197,94,0.2)" }}>
              <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-5"
                style={{ background: "rgba(34,197,94,0.1)", color: "#4ADE80" }}>
                <FileText size={22} />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">KYC/AML Automation</h3>
              <p className="text-sm text-gray-500 leading-relaxed flex-1">
                Streamline UK-compliant onboarding flows, reducing customer drop-off by{" "}
                <strong style={{ color: "#4ADE80" }}>25%</strong>. Automated document verification,
                risk scoring, and PEP/sanctions screening — integrated with your existing AML platform,
                no rip-and-replace required.
              </p>
              <div className="mt-6 space-y-2">
                {["Automated document verification", "PEP & sanctions screening", "Real-time risk scoring engine"].map(f => (
                  <div key={f} className="flex items-start gap-2 text-xs text-gray-400">
                    <CheckCircle size={12} className="shrink-0 mt-0.5" style={{ color: "#22C55E" }} /> {f}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── LIVE TRANSCRIPT ────────────────────────────────── */}
      <section style={{ background: "#080808", borderTop: "1px solid rgba(255,255,255,0.04)" }} className="py-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <p className="text-xs font-bold tracking-widest uppercase mb-3" style={{ color: "#0070FF" }}>Live Production Trace</p>
            <h2 className="text-3xl font-extrabold text-white">A Disputed Card Transaction, End-to-End</h2>
            <p className="mt-3 text-gray-500 max-w-xl mx-auto">
              Replayed from a production session — names anonymised, latency unedited.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
            {/* Transcript */}
            <div className="rounded-2xl overflow-hidden" style={{
              background: "#0a0a0a", border: "1px solid rgba(0,112,255,0.15)",
              boxShadow: "0 0 40px rgba(0,112,255,0.05)"
            }}>
              {/* Header bar */}
              <div className="flex items-center gap-2 px-4 py-3" style={{
                background: "#0d0d0d", borderBottom: "1px solid rgba(255,255,255,0.04)"
              }}>
                <span style={{ width: 9, height: 9, borderRadius: "50%", background: "#FF5F57", display: "inline-block" }} />
                <span style={{ width: 9, height: 9, borderRadius: "50%", background: "#FEBC2E", display: "inline-block" }} />
                <span style={{ width: 9, height: 9, borderRadius: "50%", background: "#28C840", display: "inline-block" }} />
                <span className="ml-2 text-xs text-gray-600 font-mono">session_a83f · banking-l2-agent v3.2.1 · 14:02 BST</span>
                <span className="ml-auto flex items-center gap-1 text-[10px] font-semibold" style={{ color: "#22C55E" }}>
                  <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#22C55E", display: "inline-block" }} />
                  LIVE
                </span>
              </div>

              {/* Messages */}
              <div className="p-5 space-y-3">
                {TRANSCRIPT.map((msg, i) => (
                  <div key={i} style={{ ...(bubbleStyle[msg.role] || {}), borderRadius: 10, padding: "10px 14px" }}>
                    <p className="text-[10px] font-bold mb-1" style={{
                      color: msg.role === "tool" ? "#F59E0B" : msg.role === "agent" ? "#3B8EFF" : "#9CA3AF"
                    }}>
                      {msg.label}
                    </p>
                    <p className="text-sm text-gray-300 leading-relaxed">{msg.text}</p>
                  </div>
                ))}
              </div>

              {/* Footer */}
              <div className="px-5 py-3 flex flex-wrap gap-4 text-[11px] text-gray-600"
                style={{ borderTop: "1px solid rgba(255,255,255,0.04)" }}>
                <span>Resolution: <strong className="text-gray-400">L2 autonomous</strong> · 4 tool calls</span>
                <span>SLA: <strong className="text-gray-400">3.2s</strong> avg latency</span>
                <span>Human handoff: <strong className="text-gray-400">0</strong></span>
              </div>
            </div>

            {/* Callout */}
            <div>
              <h3 className="text-2xl font-bold text-white mb-5">What just happened</h3>
              <p className="text-gray-400 leading-relaxed mb-8">
                A textbook L2 flow: the agent gathered the missing authorisation fact, made two privileged
                tool calls (freeze card, open dispute), and closed with a concrete SLA — no human in the loop.
                The full trace is available in your client portal as a replayable QA artifact.
              </p>

              <div className="grid grid-cols-2 gap-4 mb-8">
                {[
                  { val: "60%+", label: "L1 deflection (SLA)" },
                  { val: "90%+", label: "L2 first-contact resolution" },
                  { val: "3.2s", label: "Median end-to-end latency" },
                  { val: "0", label: "PII leakage incidents" },
                ].map(({ val, label }) => (
                  <div key={label} className="card p-4">
                    <p className="text-2xl font-extrabold mb-1" style={{ color: "#0070FF" }}>{val}</p>
                    <p className="text-xs text-gray-600">{label}</p>
                  </div>
                ))}
              </div>

              <Link href="/book"
                className="inline-flex items-center gap-2 text-sm font-bold px-6 py-3.5 rounded-xl text-white"
                style={{ background: "#0070FF", boxShadow: "0 0 20px rgba(0,112,255,0.35)" }}>
                See Full Architecture Walkthrough <ArrowRight size={14} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── TECHNICAL TRUST SIGNALS ────────────────────────── */}
      <section className="py-24" style={{ borderTop: "1px solid rgba(0,112,255,0.06)" }}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <p className="text-xs font-bold tracking-widest uppercase mb-3" style={{ color: "#0070FF" }}>Technical Trust Signals</p>
            <h2 className="text-3xl font-extrabold text-white">Built for Your Risk Team to Approve</h2>
            <p className="mt-3 text-gray-500 max-w-xl mx-auto">
              The technical guarantees your CTO, CISO, and compliance function will require before sign-off.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-14">
            <div className="card p-6">
              <div className="w-10 h-10 rounded-lg flex items-center justify-center mb-4"
                style={{ background: "rgba(0,112,255,0.1)", color: "#3B8EFF" }}>
                <Globe size={18} />
              </div>
              <h3 className="font-bold text-white mb-2">Data Sovereignty</h3>
              <p className="text-sm text-gray-500 leading-relaxed">
                GDPR and UK-specific data residency protocols. All agent processing and knowledge retrieval
                runs within your cloud tenant — data never leaves your perimeter.
              </p>
            </div>

            <div className="card p-6">
              <div className="w-10 h-10 rounded-lg flex items-center justify-center mb-4"
                style={{ background: "rgba(0,112,255,0.1)", color: "#3B8EFF" }}>
                <Server size={18} />
              </div>
              <h3 className="font-bold text-white mb-2">Legacy Bridge</h3>
              <p className="text-sm text-gray-500 leading-relaxed">
                Compatible with COBOL cores and modern RESTful APIs. Our integration layer bridges
                legacy core banking systems — no rip-and-replace, no migration risk.
              </p>
            </div>

            <div className="card p-6">
              <div className="w-10 h-10 rounded-lg flex items-center justify-center mb-4"
                style={{ background: "rgba(0,112,255,0.1)", color: "#3B8EFF" }}>
                <Zap size={18} />
              </div>
              <h3 className="font-bold text-white mb-2">Sub-200ms Latency</h3>
              <p className="text-sm text-gray-500 leading-relaxed">
                Human-equivalent conversation speeds (&lt;200ms end-to-end). Agents feel like a
                knowledgeable colleague, not a slow helpdesk system — measurable from day one.
              </p>
            </div>
          </div>

          {/* Additional trust row */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { icon: <Shield size={14} />, label: "FCA Compliance Ready" },
              { icon: <Lock size={14} />, label: "ISO 27001 Aligned" },
              { icon: <CheckCircle size={14} />, label: "GDPR by Design" },
              { icon: <Clock size={14} />, label: "99.97% Uptime SLA" },
            ].map(({ icon, label }) => (
              <div key={label} className="flex items-center gap-2.5 p-3.5 rounded-xl"
                style={{ background: "rgba(0,112,255,0.04)", border: "1px solid rgba(0,112,255,0.1)" }}>
                <span style={{ color: "#0070FF" }}>{icon}</span>
                <span className="text-sm font-semibold text-gray-400">{label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── ACADEMY — TALENT LAB ───────────────────────────── */}
      <section style={{ background: "#080808", borderTop: "1px solid rgba(255,255,255,0.04)" }} className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="card p-8 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 pointer-events-none"
              style={{ background: "radial-gradient(circle at top right, rgba(0,112,255,0.06) 0%, transparent 70%)" }} />

            <div className="flex items-start gap-4 mb-5">
              <div className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0"
                style={{ background: "rgba(99,102,241,0.12)", color: "#818CF8" }}>
                <Building2 size={20} />
              </div>
              <div>
                <span className="text-[10px] font-bold tracking-widest uppercase px-2 py-0.5 rounded-full"
                  style={{ background: "rgba(99,102,241,0.12)", color: "#818CF8", border: "1px solid rgba(99,102,241,0.25)" }}>
                  SupraCloud Talent Lab
                </span>
                <h3 className="text-xl font-bold text-white mt-2">Our Secret Weapon: Battle-Tested Before You See It</h3>
              </div>
            </div>

            <p className="text-gray-400 leading-relaxed text-base mb-4">
              Our solutions are battle-tested in the{" "}
              <strong style={{ color: "#818CF8" }}>SupraCloud Talent Lab</strong>, where we simulate
              millions of customer interactions to ensure our agents are production-ready before they
              reach your infrastructure.
            </p>
            <p className="text-gray-500 leading-relaxed text-sm">
              Graduate engineers on our Academy programme work under senior engineers on live client
              briefs — generating a continuous stream of adversarial test cases, edge-case simulations,
              and compliance stress tests that make our banking agents genuinely robust. What most vendors
              call a &ldquo;pilot&rdquo;, we call Tuesday.
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              <Link href="/talent/internships" className="text-sm font-semibold px-4 py-2 rounded-lg text-gray-400"
                style={{ border: "1px solid rgba(255,255,255,0.08)", background: "rgba(255,255,255,0.03)" }}>
                Graduate Programme →
              </Link>
              <Link href="/talent/programs" className="text-sm font-semibold px-4 py-2 rounded-lg text-gray-400"
                style={{ border: "1px solid rgba(255,255,255,0.08)", background: "rgba(255,255,255,0.03)" }}>
                Training Pathways →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── ARCHITECTURE OVERVIEW ──────────────────────────── */}
      <section className="py-24" style={{ borderTop: "1px solid rgba(0,112,255,0.06)" }}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <p className="text-xs font-bold tracking-widest uppercase mb-3" style={{ color: "#0070FF" }}>Reference Architecture</p>
            <h2 className="text-3xl font-extrabold text-white">How a Banking AI Agent Resolves a Query</h2>
            <p className="mt-3 text-gray-500 max-w-xl mx-auto">
              Every hop logged, audited, and replayable. Full trace available in your client portal.
            </p>
          </div>

          {/* Architecture nodes */}
          <div className="flex flex-col md:flex-row items-stretch gap-px">
            {[
              { eye: "Channel", title: "Customer Touchpoint", desc: "Mobile · Web Chat · IVR · WhatsApp", solid: false },
              { eye: "Gateway", title: "Auth & Routing", desc: "OAuth2 · MFA · PII redaction", solid: false },
              { eye: "Orchestrator", title: "LangGraph Runtime", desc: "Plans, calls tools, streams response", solid: true },
              { eye: "Output", title: "Resolved & Logged", desc: "SLA tracked · QA replay-ready", solid: false },
            ].map((node, i) => (
              <div key={node.eye} className="flex-1 flex flex-col items-center text-center p-5 relative"
                style={{
                  background: node.solid ? "rgba(0,112,255,0.08)" : "#0d0d0d",
                  border: `1px solid ${node.solid ? "rgba(0,112,255,0.35)" : "rgba(255,255,255,0.05)"}`,
                  borderRadius: i === 0 ? "12px 0 0 12px" : i === 3 ? "0 12px 12px 0" : 0,
                }}>
                <span className="text-[10px] font-bold tracking-widest uppercase mb-2" style={{ color: "#0070FF" }}>{node.eye}</span>
                <p className="font-bold text-white text-sm mb-1">{node.title}</p>
                <p className="text-xs text-gray-600">{node.desc}</p>
                {i < 3 && (
                  <div className="hidden md:block absolute top-1/2 -right-3 z-10"
                    style={{ width: 16, height: 2, background: "#0070FF" }} />
                )}
              </div>
            ))}
          </div>

          {/* Knowledge layer */}
          <div className="mt-4 flex flex-col md:flex-row gap-4">
            {[
              { eye: "Knowledge", title: "Banking RAG Index", desc: "Policy docs · Product T&Cs · FAQ corpus" },
              { eye: "Tools", title: "Core Banking APIs", desc: "Balance · Payments · Cards · Disputes" },
              { eye: "Escalation", title: "L2 / Human Handoff", desc: "Full context transfer · 0 customer repeat" },
            ].map(node => (
              <div key={node.eye} className="flex-1 p-4 rounded-xl text-center"
                style={{ background: "#0d0d0d", border: "1px dashed rgba(0,112,255,0.2)" }}>
                <span className="text-[10px] font-bold tracking-widest uppercase" style={{ color: "#0070FF" }}>{node.eye}</span>
                <p className="font-semibold text-white text-sm mt-1 mb-0.5">{node.title}</p>
                <p className="text-xs text-gray-600">{node.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── DUAL CTA ───────────────────────────────────────── */}
      <section className="py-24 text-center" style={{ background: "#080808", borderTop: "1px solid rgba(0,112,255,0.08)" }}>
        <div className="max-w-2xl mx-auto px-4">
          <p className="text-xs font-bold tracking-widest uppercase mb-4" style={{ color: "#0070FF" }}>Ready to Build?</p>
          <h2 className="text-4xl font-extrabold text-white mb-4">
            Your engineers have questions.<br />
            <span style={{
              background: "linear-gradient(135deg,#0070FF,#3B8EFF)",
              WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text"
            }}>Ours have answers.</span>
          </h2>
          <p className="text-gray-400 mb-10 leading-relaxed">
            30-minute call. We map your workflows, data perimeter, escalation paths, and compliance constraints.
            You&apos;ll leave with a concrete technical blueprint — no slides, no sales deck.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/book"
              className="inline-flex items-center gap-2 text-sm font-bold px-8 py-4 rounded-xl text-white"
              style={{ background: "#0070FF", boxShadow: "0 0 32px rgba(0,112,255,0.45)" }}>
              Request Technical Whitepaper <FileText size={15} />
            </Link>
            <Link href="/contact"
              className="inline-flex items-center gap-2 text-sm font-bold px-8 py-4 rounded-xl text-gray-300"
              style={{ border: "1px solid rgba(255,255,255,0.12)", background: "rgba(255,255,255,0.04)" }}>
              Book Security Audit <Shield size={15} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
