import type { Metadata } from "next";
import Link from "next/link";
import { CheckCircle, ArrowRight, Shield, TrendingUp, Users, Bot, Briefcase, GraduationCap } from "lucide-react";

export const metadata: Metadata = {
  title: "About SupraCloud | Enterprise AI Agent Development",
  description:
    "SupraCloud is founded by Praveen Kumar, ex-IBM AI/ML Engineer with 5+ years building production RAG pipelines and ML systems. Engineer-led enterprise AI agent development for banking and retail.",
  openGraph: {
    title: "About SupraCloud | Enterprise AI Agent Development",
    description:
      "Founded by ex-IBM AI/ML engineer Praveen Kumar. Production-grade AI agents for banking and retail — built by engineers, not slide deck consultants.",
    url: "https://supracloud.co.uk/about",
    siteName: "SupraCloud",
    locale: "en_GB",
  },
  alternates: { canonical: "https://supracloud.co.uk/about" },
};

const values = [
  {
    icon: <Shield size={24} className="text-emerald-500" />,
    title: "Engineering Rigour",
    desc: "Every system we build goes through the same standards we applied at IBM — architecture reviews, production testing, SLA monitoring, and continuous optimisation.",
  },
  {
    icon: <TrendingUp size={24} className="text-emerald-500" />,
    title: "Measurable Outcomes",
    desc: "We don't deliver strategies or recommendations. We deploy agents, measure L1 deflection rates, and track cost-per-query — ROI you can show to a CFO.",
  },
  {
    icon: <Users size={24} className="text-emerald-500" />,
    title: "Honest Engagement",
    desc: "SupraCloud is currently founder-led. We bring in vetted ML engineers, backend developers, and QA specialists per project — you always know who is building your system.",
  },
];

const capabilities = [
  { icon: <Bot size={18} className="text-emerald-500" />, label: "Production RAG pipelines (LangGraph, Pinecone, FastAPI)" },
  { icon: <Bot size={18} className="text-emerald-500" />, label: "LLM-powered agent orchestration (Claude API, LangGraph)" },
  { icon: <Bot size={18} className="text-emerald-500" />, label: "ML model development, deployment, and monitoring" },
  { icon: <Briefcase size={18} className="text-emerald-500" />, label: "Enterprise systems integration (core banking, OMS, CRM)" },
  { icon: <Briefcase size={18} className="text-emerald-500" />, label: "Cloud architecture (AWS, Azure — certified)" },
  { icon: <GraduationCap size={18} className="text-emerald-500" />, label: "Graduate talent development and placement pipelines" },
];

export default function AboutPage() {
  return (
    <div className="bg-slate-50">
      {/* Hero */}
      <section style={{ backgroundColor: "#0A192F" }} className="relative py-24 overflow-hidden">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-[0.035]"
          style={{
            backgroundImage: "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)",
            backgroundSize: "48px 48px",
          }}
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{ background: "radial-gradient(ellipse 70% 50% at 50% 0%, rgba(16,185,129,0.07) 0%, transparent 70%)" }}
        />
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="inline-flex items-center gap-2 mb-5 text-xs font-semibold tracking-widest uppercase text-emerald-400 border border-emerald-700/50 rounded-full px-3 py-1.5">
            About SupraCloud
          </p>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white leading-tight mb-5">
            Engineer-Led Enterprise AI,<br />
            <span className="gradient-text">Built for Production</span>
          </h1>
          <p className="text-lg text-slate-400 max-w-2xl mx-auto leading-relaxed">
            SupraCloud exists because enterprise AI deserves engineering rigour — not slide deck consultants who hand off a proof-of-concept and disappear.
          </p>
        </div>
      </section>

      {/* Founder Story */}
      <section className="bg-white py-24">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Founder card */}
            <div className="bg-slate-900 rounded-2xl p-8 border border-slate-700/60 shadow-xl">
              <div className="flex items-start gap-5 mb-6">
                <div className="w-16 h-16 rounded-full bg-slate-700 border-2 border-emerald-500/40 flex items-center justify-center shrink-0 text-xl font-extrabold text-emerald-400 select-none">
                  PK
                </div>
                <div>
                  <p className="font-bold text-white text-lg">Praveen Kumar</p>
                  <p className="text-emerald-400 text-sm font-semibold">Founder · AI/ML Engineer</p>
                  <p className="text-slate-400 text-xs mt-1">ex-IBM · MSc Data Science, University of Essex</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { v: "5+", l: "Years enterprise AI delivery" },
                  { v: "MSc", l: "Data Science, Univ. of Essex" },
                  { v: "IBM", l: "Production ML systems built" },
                  { v: "UK", l: "Based, serving global enterprise" },
                ].map((s) => (
                  <div key={s.l} className="bg-slate-800 rounded-xl p-4 border border-slate-700/40">
                    <p className="text-xl font-extrabold text-emerald-400">{s.v}</p>
                    <p className="text-xs text-slate-400 mt-1 leading-snug">{s.l}</p>
                  </div>
                ))}
              </div>
              <div className="mt-6 bg-slate-800 rounded-xl p-4 border border-slate-700/40 font-mono text-xs text-emerald-300/80 leading-relaxed">
                <p className="text-slate-500 mb-2"># career summary</p>
                <p>IBM → MSc Data Science → SupraCloud</p>
                <p className="text-slate-500 mt-1">5yr building production RAG + ML pipelines</p>
                <p className="text-slate-500">→ now deploying them for enterprise clients</p>
              </div>
            </div>

            {/* Bio text */}
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-emerald-600 mb-3">Founder Story</p>
              <h2 className="text-3xl font-bold text-gray-900 mb-5">Why SupraCloud Was Built</h2>
              <div className="space-y-4 text-gray-600 text-sm leading-relaxed">
                <p>
                  Praveen Kumar spent five years at IBM designing and deploying production AI and ML systems for enterprise clients — RAG pipelines, model serving infrastructure, data engineering workflows. He saw first-hand what good AI engineering looks like in regulated, high-stakes environments.
                </p>
                <p>
                  He also saw what generic AI consulting looks like: expensive strategy engagements that produce polished slide decks, proofs-of-concept that never go to production, and teams left without the engineering depth to maintain what was built.
                </p>
                <p>
                  SupraCloud was founded to offer a different model. Engineer-led delivery, production-grade from day one, with measurable SLAs rather than subjective outcomes. Praveen holds an MSc in Data Science from the University of Essex and has built production RAG pipelines that handle real enterprise query volumes.
                </p>
                <p>
                  SupraCloud is currently founder-led. For each client engagement, Praveen works with a network of vetted senior ML engineers, backend developers, and QA specialists — so you get specialist expertise without the overhead of a large consultancy.
                </p>
              </div>
              <div className="mt-8">
                <Link
                  href="/book"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-lg text-sm font-semibold text-white bg-emerald-500 hover:bg-emerald-600 transition-colors"
                >
                  Book a Discovery Call <ArrowRight size={14} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="bg-slate-50 py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-xs font-semibold uppercase tracking-widest text-emerald-600 mb-3">Mission</p>
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-5">What We Stand For</h2>
          <p className="text-gray-600 text-lg leading-relaxed">
            To deploy production-grade AI agents into enterprise environments where they create measurable, auditable impact — and to do it with the engineering standards that regulated industries actually require.
          </p>
        </div>
      </section>

      {/* Core Values */}
      <section className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-xs font-semibold uppercase tracking-widest text-emerald-600 mb-3">How We Work</p>
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">Our Operating Principles</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {values.map((v) => (
              <div key={v.title} className="hover-lift bg-slate-50 rounded-2xl p-8 border border-slate-100 flex flex-col">
                <div className="w-11 h-11 rounded-xl bg-emerald-50 border border-emerald-100 flex items-center justify-center mb-5">
                  {v.icon}
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-3">{v.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed flex-1">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Capabilities */}
      <section className="bg-slate-50 py-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <p className="text-xs font-semibold uppercase tracking-widest text-emerald-600 mb-3">Technical Depth</p>
            <h2 className="text-2xl font-bold text-gray-900">Core Capabilities</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {capabilities.map((c) => (
              <div key={c.label} className="flex items-start gap-4 p-5 bg-white rounded-xl border border-slate-100 shadow-sm">
                <div className="w-8 h-8 rounded-lg bg-emerald-50 border border-emerald-100 flex items-center justify-center shrink-0">
                  {c.icon}
                </div>
                <p className="text-sm text-gray-700 leading-relaxed">{c.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Engineer-Led Matters */}
      <section style={{ backgroundColor: "#0A192F" }} className="py-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-emerald-500 mb-3">Why It Matters</p>
              <h2 className="text-3xl font-bold text-white mb-5">Engineer-Led vs. Consultant-Led</h2>
              <p className="text-slate-400 leading-relaxed mb-6">
                Most AI consulting firms send strategy consultants who subcontract the actual engineering. You pay premium rates for people who manage engineers in low-cost locations. The system that gets built doesn&apos;t meet enterprise production standards — and the consultants are gone before you realise it.
              </p>
              <p className="text-slate-400 leading-relaxed">
                SupraCloud puts the engineer who built IBM production ML systems in the room with your team from day one. We write the code, review the architecture, and monitor the deployed system — with our name on the SLA.
              </p>
            </div>
            <div className="space-y-4">
              {[
                { yes: "Senior engineer owns delivery end-to-end", no: "Account manager escalates to subcontractors" },
                { yes: "Production-grade from first commit", no: "POC that 'needs rework' for production" },
                { yes: "SLA dashboards from week one", no: "Success metrics defined after billing" },
                { yes: "Full context on handover", no: "Documentation starts at offboarding" },
              ].map((row) => (
                <div key={row.yes} className="grid grid-cols-2 gap-3">
                  <div className="flex items-start gap-2 bg-emerald-500/10 border border-emerald-500/20 rounded-xl p-4">
                    <CheckCircle size={14} className="text-emerald-400 shrink-0 mt-0.5" />
                    <p className="text-xs text-emerald-300 leading-relaxed">{row.yes}</p>
                  </div>
                  <div className="flex items-start gap-2 bg-slate-800/60 border border-slate-700/40 rounded-xl p-4">
                    <span className="w-3.5 h-3.5 rounded-full border border-slate-600 shrink-0 mt-0.5" />
                    <p className="text-xs text-slate-500 leading-relaxed">{row.no}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-white py-20 text-center">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Ready to see how we work?</h2>
          <p className="text-gray-500 mb-8 leading-relaxed">
            Book a 30-minute discovery call. No pitch deck — just an honest conversation about your support workflows and what AI can realistically achieve.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/book"
              className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-lg text-base font-semibold text-white bg-emerald-500 hover:bg-emerald-600 transition-colors"
            >
              Book a Discovery Call <ArrowRight size={15} />
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center px-8 py-3.5 rounded-lg text-base font-semibold text-gray-700 border border-slate-200 hover:border-slate-400 transition-colors"
            >
              Submit a Brief
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
