import type { Metadata } from "next";
import Link from "next/link";
import { CheckCircle, ArrowRight, Zap, Cpu, Shield, PhoneCall, Database, Clock } from "lucide-react";
import BookingSystem from "@/app/components/BookingSystem";

export const metadata: Metadata = {
  title: "Banking AI Agents | L1 & L2 Support Automation",
  description:
    "Production-grade AI agents for banking customer support. Handle L1 and L2 queries at scale with compliance-aware escalation, RAG-powered knowledge, and 24/7 availability.",
};

const l1Capabilities = [
  "Account balance, transaction history & statement requests",
  "Product information — savings, mortgages, loans, ISAs",
  "Branch & ATM locator with opening hours",
  "General banking FAQs — deflects 60%+ of inbound volume",
  "Card services — lost/stolen reporting, limit queries",
  "Basic eligibility checks & application status",
];

const l2Capabilities = [
  "Complex complaint handling with regulatory compliance",
  "Fraud flag detection and case initiation",
  "Account recovery workflows — identity verification layer",
  "High-value transaction authorisation support",
  "COBS / FCA-aware escalation routing",
  "Full context transfer to human agents on handoff",
];

const techStack = [
  { name: "Claude API", desc: "Primary LLM reasoning engine" },
  { name: "LangGraph", desc: "Stateful multi-step agent orchestration" },
  { name: "RAG Pipeline", desc: "Retrieval-augmented knowledge base" },
  { name: "FastAPI", desc: "Low-latency agent API layer" },
  { name: "PostgreSQL", desc: "Conversation & audit logging" },
  { name: "Pinecone", desc: "Vector store for knowledge retrieval" },
  { name: "Docker / AWS", desc: "Containerised cloud deployment" },
  { name: "Prometheus", desc: "Real-time performance monitoring" },
];

const deliverySteps = [
  {
    num: "01",
    title: "Discovery & Workflow Mapping",
    desc: "We audit your existing support flows, escalation paths, compliance requirements, and knowledge base gaps.",
  },
  {
    num: "02",
    title: "Agent Architecture & Data Ingestion",
    desc: "We design the agent graph, ingest your policy documents into the RAG pipeline, and define intent taxonomies.",
  },
  {
    num: "03",
    title: "Build, Test & QA",
    desc: "Iterative build with ProdReady Labs regression testing and Playwright E2E validation before any production deployment.",
  },
  {
    num: "04",
    title: "Deploy & Monitor",
    desc: "Live deployment with SLA dashboards, L1 deflection tracking, and continuous improvement cycles.",
  },
];

export default function BankingPage() {
  return (
    <div className="bg-slate-50">
      {/* ── HERO ── */}
      <section style={{ backgroundColor: "#0A192F" }} className="relative overflow-hidden py-24">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-[0.035]"
          style={{
            backgroundImage:
              "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)",
            backgroundSize: "48px 48px",
          }}
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            background: "radial-gradient(ellipse 70% 50% at 50% 0%, rgba(16,185,129,0.07) 0%, transparent 70%)",
          }}
        />
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="inline-flex items-center gap-2 mb-5 text-xs font-semibold tracking-widest uppercase text-emerald-400 border border-emerald-700/50 rounded-full px-3 py-1.5">
            <PhoneCall size={11} /> Banking Sector Solution
          </span>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white leading-tight mb-6">
            Banking AI Agents for{" "}
            <span className="gradient-text">L1 & L2 Support Automation</span>
          </h1>
          <p className="text-lg text-slate-400 max-w-2xl mx-auto leading-relaxed mb-10">
            Handle high-volume customer queries without scaling headcount. Our banking agents are trained on your products, policies, and compliance-aware escalation paths — deployed 24/7 at enterprise scale.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/book"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-lg text-base font-semibold text-white bg-emerald-500 hover:bg-emerald-600 transition-colors"
            >
              Book a Discovery Call <ArrowRight size={15} />
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-lg text-base font-semibold text-white border border-slate-600 hover:border-slate-400 transition-colors"
            >
              Submit a Brief
            </Link>
          </div>
        </div>
      </section>

      {/* ── STAT BAR ── */}
      <section className="border-b border-slate-200 py-5 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {[
              { value: "63%", label: "Average L1 deflection rate" },
              { value: "< 0.5s", label: "Mean query response time" },
              { value: "99.97%", label: "Agent uptime SLA" },
              { value: "24/7", label: "Coverage — no staffing overhead" },
            ].map((s) => (
              <div key={s.label}>
                <p className="text-2xl font-extrabold text-emerald-600">{s.value}</p>
                <p className="text-xs text-gray-500 mt-1">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── L1 / L2 CAPABILITIES ── */}
      <section className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <p className="text-xs font-semibold uppercase tracking-widest text-emerald-600 mb-3">Agent Capabilities</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">What the Agent Handles</h2>
            <p className="mt-3 text-gray-500 max-w-xl mx-auto">
              Structured across two support tiers — with full context preserved on every handoff.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-slate-50 rounded-2xl p-8 border border-slate-100">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-9 h-9 rounded-lg bg-emerald-50 border border-emerald-200 flex items-center justify-center">
                  <Zap size={16} className="text-emerald-600" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900">Level 1 — Automated Resolution</h3>
                  <p className="text-xs text-emerald-600">No human intervention required</p>
                </div>
              </div>
              <ul className="space-y-3">
                {l1Capabilities.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm text-gray-600">
                    <CheckCircle size={15} className="text-emerald-500 mt-0.5 shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-slate-50 rounded-2xl p-8 border border-slate-100">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-9 h-9 rounded-lg bg-slate-200 border border-slate-300 flex items-center justify-center">
                  <Cpu size={16} className="text-slate-600" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900">Level 2 — Assisted Escalation</h3>
                  <p className="text-xs text-slate-500">Agent + human collaboration layer</p>
                </div>
              </div>
              <ul className="space-y-3">
                {l2Capabilities.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm text-gray-600">
                    <CheckCircle size={15} className="text-emerald-500 mt-0.5 shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ── TECH STACK ── */}
      <section className="bg-slate-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <p className="text-xs font-semibold uppercase tracking-widest text-emerald-600 mb-3">Technical Architecture</p>
            <h2 className="text-3xl font-bold text-gray-900">Production-Grade Technology Stack</h2>
            <p className="mt-3 text-gray-500 max-w-xl mx-auto">
              Every component chosen for latency, reliability, and UK data residency compliance.
            </p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {techStack.map((tech) => (
              <div key={tech.name} className="bg-white rounded-xl p-5 border border-slate-100 shadow-sm text-center hover-lift">
                <p className="font-semibold text-gray-900 text-sm mb-1">{tech.name}</p>
                <p className="text-xs text-gray-400">{tech.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── COMPLIANCE CALLOUT ── */}
      <section className="bg-white py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-8 flex flex-col sm:flex-row items-start gap-5">
            <div className="w-12 h-12 rounded-xl bg-emerald-100 border border-emerald-200 flex items-center justify-center shrink-0">
              <Shield size={22} className="text-emerald-600" />
            </div>
            <div>
              <h3 className="font-bold text-gray-900 text-lg mb-2">Compliance-First Architecture</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                All banking agents are designed with FCA consumer duty, GDPR, and COBS regulations in mind. Audit logging, PII redaction, and consent management are built in by default — not bolted on after deployment.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── DELIVERY PROCESS ── */}
      <section className="bg-slate-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <p className="text-xs font-semibold uppercase tracking-widest text-emerald-600 mb-3">Delivery Process</p>
            <h2 className="text-3xl font-bold text-gray-900">From Discovery to Deployment</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {deliverySteps.map((step) => (
              <div key={step.num} className="bg-white rounded-xl p-6 border border-slate-100 shadow-sm text-center">
                <div className="text-3xl font-extrabold text-emerald-500 mb-3">{step.num}</div>
                <h3 className="font-bold text-gray-900 text-sm mb-2">{step.title}</h3>
                <p className="text-xs text-gray-500 leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── INTEGRATION NOTE ── */}
      <section className="bg-white py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {[
              { icon: <Database size={20} className="text-emerald-500" />, title: "Existing System Integration", desc: "REST & webhook connectors for your CRM, telephony, and case management platforms." },
              { icon: <Clock size={20} className="text-emerald-500" />, title: "8-Week Typical Delivery", desc: "Discovery to live deployment in 8 weeks for standard banking L1 configurations." },
              { icon: <Shield size={20} className="text-emerald-500" />, title: "UK Data Residency", desc: "All data processed and stored within UK / EU boundaries. Full GDPR documentation provided." },
            ].map((item) => (
              <div key={item.title} className="flex flex-col items-start p-5 rounded-xl bg-slate-50 border border-slate-100">
                <div className="mb-3">{item.icon}</div>
                <p className="font-semibold text-gray-900 text-sm mb-1">{item.title}</p>
                <p className="text-xs text-gray-500 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── BOOKING ── */}
      <section style={{ backgroundColor: "#0A192F" }} className="py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <p className="text-xs font-semibold uppercase tracking-widest text-emerald-400 mb-3">No generic demos</p>
            <h2 className="text-3xl font-bold text-white mb-3">
              Ready to automate your banking support?
            </h2>
            <p className="text-slate-400 leading-relaxed">
              Book directly below. We&apos;ll map your support workflows against our banking agent capabilities and send a written summary after the call.
            </p>
          </div>
          <BookingSystem
            defaultInquiry="Banking AI Agents"
            title="Book a Banking AI Demo"
            subtitle="Your slot is confirmed within 1 business day. Calendar invite and Google Meet link sent to your inbox."
          />
        </div>
      </section>
    </div>
  );
}
