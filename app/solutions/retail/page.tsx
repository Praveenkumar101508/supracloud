import type { Metadata } from "next";
import Link from "next/link";
import { CheckCircle, ArrowRight, Zap, Cpu, ShoppingCart, Package, Clock, TrendingUp } from "lucide-react";
import BookingSystem from "@/app/components/BookingSystem";

export const metadata: Metadata = {
  title: "Retail AI Agents | Supermarket & E-Commerce Support Automation",
  description:
    "AI agents for supermarket and retail operations. Automate order management, delivery queries, inventory escalation, and customer support — 24/7 at enterprise scale.",
};

const l1Capabilities = [
  "Order status, estimated delivery & real-time tracking",
  "Returns, refunds & substitution policy queries",
  "Product availability, pricing & nutritional information",
  "Click & collect slot management and store locator",
  "Loyalty card queries — points balance, redemption, tiers",
  "Opening hours, accessibility & in-store service queries",
];

const l2Capabilities = [
  "Inventory & stock escalations to supplier systems",
  "Multi-system complaint resolution (order + delivery + returns)",
  "High-value order disputes with manual review routing",
  "Supplier delay notifications and proactive communications",
  "Complex loyalty and promotional disputes",
  "Human handoff with full order history and conversation context",
];

const techStack = [
  { name: "Claude API", desc: "Primary LLM reasoning engine" },
  { name: "LangGraph", desc: "Stateful agent orchestration" },
  { name: "RAG Pipeline", desc: "Product catalogue & policy retrieval" },
  { name: "FastAPI", desc: "High-throughput agent API" },
  { name: "AWS Lambda", desc: "Serverless peak-load scaling" },
  { name: "Pinecone", desc: "Vector search for product data" },
  { name: "Redis", desc: "Session caching for concurrent queries" },
  { name: "Prometheus", desc: "SLA & latency monitoring" },
];

const deliverySteps = [
  {
    num: "01",
    title: "Catalogue & Policy Ingestion",
    desc: "We ingest your full product catalogue, return policies, and support playbooks into the RAG pipeline.",
  },
  {
    num: "02",
    title: "Agent Design & Integration",
    desc: "We build the agent graph and connect it to your OMS, WMS, and loyalty systems via REST APIs.",
  },
  {
    num: "03",
    title: "Load Testing & QA",
    desc: "Peak-load simulation at 10× normal throughput. E2E validation across all critical customer journeys.",
  },
  {
    num: "04",
    title: "Deploy & Scale",
    desc: "Serverless architecture auto-scales for Christmas, summer campaigns, and promotional peaks.",
  },
];

export default function RetailPage() {
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
            <ShoppingCart size={11} /> Retail & Supermarket Solution
          </span>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white leading-tight mb-6">
            Retail AI Agents for{" "}
            <span className="gradient-text">Peak-Demand Scale</span>
          </h1>
          <p className="text-lg text-slate-400 max-w-2xl mx-auto leading-relaxed mb-10">
            Handle order queries, inventory escalations, and customer support at Christmas-peak volumes — without seasonal headcount. Always-on, always consistent.
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
              { value: "10×", label: "Peak-load scalability" },
              { value: "< 0.6s", label: "Order query response time" },
              { value: "24/7", label: "Coverage — including bank holidays" },
              { value: "0", label: "Seasonal headcount increase needed" },
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
              Two support tiers — from instant order resolution to complex inventory escalation.
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
                  <p className="text-xs text-emerald-600">Instant responses, zero wait time</p>
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
                  <p className="text-xs text-slate-500">Complex cases routed with full context</p>
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

      {/* ── USE CASES ── */}
      <section className="bg-slate-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <p className="text-xs font-semibold uppercase tracking-widest text-emerald-600 mb-3">Key Use Cases</p>
            <h2 className="text-3xl font-bold text-gray-900">Built for Retail Operations</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {[
              {
                icon: <Package size={22} className="text-emerald-500" />,
                title: "Order & Delivery Management",
                desc: "Real-time status, proactive delay notifications, substitution handling, and one-click returns initiation.",
              },
              {
                icon: <TrendingUp size={22} className="text-emerald-500" />,
                title: "Peak Season Scalability",
                desc: "Auto-scales to handle Christmas, Easter, and promotional spike volumes — no extra headcount required.",
              },
              {
                icon: <Clock size={22} className="text-emerald-500" />,
                title: "24/7 Always-On Support",
                desc: "Bank holidays, midnight deliveries, early-morning queries — the agent never sleeps.",
              },
            ].map((item) => (
              <div key={item.title} className="hover-lift bg-white rounded-xl p-7 border border-slate-100 shadow-sm">
                <div className="mb-4">{item.icon}</div>
                <h3 className="font-bold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TECH STACK ── */}
      <section className="bg-white py-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-3">Technical Architecture</h2>
          <p className="text-sm text-gray-500 mb-8 max-w-xl mx-auto">
            Serverless-first stack designed for retail&apos;s unpredictable traffic patterns.
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {techStack.map((tech) => (
              <div key={tech.name} className="bg-slate-50 rounded-xl p-4 border border-slate-100 text-center hover-lift">
                <p className="font-semibold text-gray-900 text-sm mb-1">{tech.name}</p>
                <p className="text-xs text-gray-400">{tech.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── DELIVERY PROCESS ── */}
      <section className="bg-slate-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <p className="text-xs font-semibold uppercase tracking-widest text-emerald-600 mb-3">Delivery Timeline</p>
            <h2 className="text-3xl font-bold text-gray-900">From Brief to Live in 6–10 Weeks</h2>
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

      {/* ── BOOKING ── */}
      <section style={{ backgroundColor: "#0A192F" }} className="py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <p className="text-xs font-semibold uppercase tracking-widest text-emerald-400 mb-3">No generic demos</p>
            <h2 className="text-3xl font-bold text-white mb-3">
              Ready to scale without the seasonal overhead?
            </h2>
            <p className="text-slate-400 leading-relaxed">
              Book directly below. We&apos;ll review your peak support volumes, system integrations, and delivery timeline — written summary sent after the call.
            </p>
          </div>
          <BookingSystem
            defaultInquiry="Retail AI Agents"
            title="Book a Retail AI Demo"
            subtitle="Your slot is confirmed within 1 business day. Calendar invite and Google Meet link sent to your inbox."
          />
        </div>
      </section>
    </div>
  );
}
