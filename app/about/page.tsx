import Link from "next/link";
import { Target, ShieldCheck, Layers, Bot, Briefcase, GraduationCap, ArrowRight } from "lucide-react";

const values = [
  {
    icon: <Layers size={28} className="text-emerald-500" />,
    title: "Production-First Engineering",
    description:
      "We don't build demos. Every agent we deliver is production-grade — with audit trails, monitoring, SLA dashboards, and continuous optimisation built in from day one.",
  },
  {
    icon: <ShieldCheck size={28} className="text-emerald-500" />,
    title: "Regulatory-Aware by Default",
    description:
      "We specialise in regulated industries. FCA compliance, GDPR data perimeters, role-based access, and explainability layers are not afterthoughts — they're in our delivery blueprint.",
  },
  {
    icon: <Target size={28} className="text-emerald-500" />,
    title: "Engineer-Led, Not Sales-Led",
    description:
      "Every client engagement starts with an engineer, not a sales deck. We ask the right technical questions first, then scope the work honestly — no overselling, no surprise bills.",
  },
];

const pillars = [
  {
    icon: <Bot size={24} className="text-emerald-500" />,
    title: "AI Agent Development",
    desc: "Production-grade autonomous agents for banking and retail — built on LangGraph, RAG, and Claude API. Deployed, monitored, and continuously optimised.",
    href: "/solutions/banking",
  },
  {
    icon: <Briefcase size={24} className="text-emerald-500" />,
    title: "Enterprise IT Services",
    desc: "Engineer-screened IT staffing and strategic technology advisory for organisations scaling securely in regulated environments.",
    href: "/services/staffing",
  },
  {
    icon: <GraduationCap size={24} className="text-emerald-500" />,
    title: "Talent Pipeline",
    desc: "Structured training programmes, placement year partnerships, and graduate internships — feeding a pipeline of production-ready AI engineers.",
    href: "/talent/programs",
  },
];

export default function AboutPage() {
  return (
    <div className="bg-slate-50">
      {/* Header */}
      <section style={{ backgroundColor: "#0A192F" }} className="py-20 text-center">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="inline-block mb-4 text-xs font-semibold tracking-widest uppercase text-emerald-400 border border-emerald-700 rounded-full px-3 py-1">
            About SupraCloud
          </p>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white">
            Built by Engineers, for Enterprise
          </h1>
          <p className="mt-4 text-slate-300 text-lg max-w-2xl mx-auto">
            UK-based enterprise AI and IT firm — founded to bridge the gap between AI research and production delivery in regulated industries.
          </p>
        </div>
      </section>

      {/* Founder Story */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            {/* Terminal block */}
            <div className="rounded-xl bg-slate-900 p-8 font-mono text-xs text-emerald-400 leading-relaxed shadow-lg">
              <p className="text-slate-500 mb-2"># supracloud-agent-runtime v3.2.1</p>
              <p>agent = BankingAgent(</p>
              <p className="pl-4">model=&quot;claude-sonnet-4-6&quot;,</p>
              <p className="pl-4">orchestrator=&quot;langgraph&quot;,</p>
              <p className="pl-4">compliance=&quot;FCA&quot;</p>
              <p>)</p>
              <br />
              <p>result = agent.handle(query)</p>
              <br />
              <p className="text-white">assert result.deflected == True</p>
              <p className="text-white">assert result.latency_ms &lt;= 500</p>
              <p className="text-white">assert result.audit_logged == True</p>
            </div>

            {/* Text */}
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">Why We Exist</h2>
              <div className="space-y-4 text-gray-600 text-sm leading-relaxed">
                <p>
                  Most enterprise AI projects fail not because of the technology — but because the people building them don&apos;t understand the operational reality of banking and retail at scale.
                </p>
                <p>
                  SupraCloud was founded to fix that. We are engineers who have worked inside regulated environments — and we build AI agents that survive contact with production: compliance reviews, security audits, integration constraints, and real query volumes.
                </p>
                <p>
                  Every engagement is scoped by an engineer, built by engineers, and delivered with the same rigour we&apos;d apply to our own systems. No slide decks. No overselling. Just working software, monitored and optimised from day one.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Three Pillars */}
      <section className="py-16 bg-slate-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-xs font-semibold uppercase tracking-widest text-emerald-600 mb-3">What We Do</p>
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">Three Capabilities, One Partner</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {pillars.map((p) => (
              <div key={p.title} className="bg-white rounded-xl p-7 border border-slate-100 shadow-sm flex flex-col">
                <div className="w-11 h-11 rounded-lg bg-emerald-50 border border-emerald-100 flex items-center justify-center mb-4">
                  {p.icon}
                </div>
                <h3 className="text-base font-bold text-gray-900 mb-2">{p.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed flex-1">{p.desc}</p>
                <Link href={p.href} className="inline-flex items-center gap-1 mt-5 text-xs font-semibold text-emerald-600 hover:text-emerald-700 transition-colors">
                  Learn more <ArrowRight size={12} />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-xs font-semibold uppercase tracking-widest text-emerald-600 mb-3">How We Work</p>
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">Our Core Values</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {values.map((v) => (
              <div key={v.title} className="bg-slate-50 rounded-xl p-8 border border-slate-100">
                <div className="mb-4">{v.icon}</div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">{v.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{v.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ backgroundColor: "#0A192F" }} className="py-16 text-center">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">Ready to Talk?</h2>
          <p className="text-slate-300 mb-8">Book a 30-minute discovery call. Engineer-led, no sales pressure — just an honest conversation about what you need and whether we can deliver it.</p>
          <Link
            href="/book"
            className="inline-block px-8 py-3.5 rounded-md text-base font-semibold text-white bg-emerald-500 hover:bg-emerald-600 transition-colors"
          >
            Book a Discovery Call
          </Link>
        </div>
      </section>
    </div>
  );
}
