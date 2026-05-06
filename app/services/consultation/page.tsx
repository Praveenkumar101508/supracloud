import type { Metadata } from "next";
import Link from "next/link";
import { CheckCircle, ArrowRight, Lightbulb, RefreshCw, Bot, BarChart3, Shield, Layers } from "lucide-react";

export const metadata: Metadata = {
  title: "Enterprise IT Consultation | SupraCloud",
  description:
    "Strategic technology advisory and digital transformation from engineers who build production AI systems. UK-based enterprise IT consulting for Data, Cloud, and AI programmes.",
};

const services = [
  {
    icon: <Lightbulb size={22} className="text-emerald-500" />,
    title: "Technology Stack Audit",
    desc: "Comprehensive review of your current data architecture, cloud infrastructure, and tooling. We identify bottlenecks, redundancies, and modernisation opportunities with a prioritised roadmap.",
    deliverables: ["Architecture diagram review", "Vendor cost analysis", "Technical debt assessment", "12-month modernisation roadmap"],
  },
  {
    icon: <RefreshCw size={22} className="text-emerald-500" />,
    title: "Digital Transformation Advisory",
    desc: "End-to-end transformation programmes — from legacy system migration to cloud-native rebuild. Phased delivery with clear milestones, measurable KPIs, and minimal operational disruption.",
    deliverables: ["Migration strategy document", "Phased delivery plan", "Risk register", "KPI framework"],
  },
  {
    icon: <Bot size={22} className="text-emerald-500" />,
    title: "AI & Automation Strategy",
    desc: "Identify high-ROI AI opportunities within your business. We scope, prototype, and validate — so you invest in automation that delivers measurable outcomes, not proof-of-concept theatre.",
    deliverables: ["AI opportunity assessment", "ROI modelling", "Proof-of-concept delivery", "Production deployment plan"],
  },
  {
    icon: <BarChart3 size={22} className="text-emerald-500" />,
    title: "Data Strategy & Governance",
    desc: "Design a scalable data architecture with clear ownership, quality standards, and governance policies. Covering data mesh, lakehouse patterns, and enterprise data catalogue implementation.",
    deliverables: ["Data architecture blueprint", "Governance framework", "Quality metric definition", "Team enablement sessions"],
  },
];

const engagements = [
  {
    name: "Discovery Sprint",
    duration: "2 weeks",
    desc: "Rapid audit of a specific technical area — architecture, AI readiness, data quality. Deliverable: a prioritised findings report with recommendations.",
    ideal: "Teams needing quick clarity before a major investment",
  },
  {
    name: "Strategic Programme",
    duration: "3–6 months",
    desc: "Embedded advisory across a transformation programme. We provide weekly guidance, review technical decisions, and ensure delivery aligns with strategic objectives.",
    ideal: "CTO / Head of Engineering looking for a trusted technical partner",
  },
  {
    name: "AI Proof of Concept",
    duration: "4–8 weeks",
    desc: "We scope, build, and validate a targeted AI use case — proving business value before full-scale deployment. Includes a production-readiness assessment.",
    ideal: "Businesses exploring AI before committing to enterprise rollout",
  },
];

export default function ConsultationPage() {
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
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="inline-flex items-center gap-2 mb-5 text-xs font-semibold tracking-widest uppercase text-emerald-400 border border-emerald-700/50 rounded-full px-3 py-1.5">
            <Lightbulb size={11} /> Enterprise IT Services
          </span>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white leading-tight mb-6">
            Enterprise IT{" "}
            <span className="gradient-text">Consultation</span>
          </h1>
          <p className="text-lg text-slate-400 max-w-2xl mx-auto leading-relaxed mb-10">
            Strategic technology advisory from engineers who have actually built and deployed production AI systems at enterprise scale. Grounded in delivery experience, not slide decks.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/book"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-lg text-base font-semibold text-white bg-emerald-500 hover:bg-emerald-600 transition-colors"
            >
              Book a Consultation <ArrowRight size={15} />
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

      {/* ── DIFFERENTIATORS ── */}
      <section className="border-b border-slate-200 py-6 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-center gap-x-10 gap-y-3 text-sm text-gray-600">
            {[
              { icon: <Shield size={14} className="text-emerald-500" />, text: "Engineer-led, not slide-deck consultancy" },
              { icon: <Layers size={14} className="text-emerald-500" />, text: "Grounded in real production delivery" },
              { icon: <CheckCircle size={14} className="text-emerald-500" />, text: "UK-based team, UK market expertise" },
            ].map((item) => (
              <span key={item.text} className="flex items-center gap-2 font-medium">
                {item.icon} {item.text}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ── SERVICES ── */}
      <section className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <p className="text-xs font-semibold uppercase tracking-widest text-emerald-600 mb-3">Advisory Services</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">Strategic Technology Advisory</h2>
            <p className="mt-3 text-gray-500 max-w-xl mx-auto">
              Four core advisory areas — each with defined deliverables and measurable outcomes.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {services.map((service) => (
              <div key={service.title} className="hover-lift bg-slate-50 rounded-2xl p-8 border border-slate-100">
                <div className="w-11 h-11 rounded-xl bg-emerald-50 border border-emerald-100 flex items-center justify-center mb-5">
                  {service.icon}
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-3">{service.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed mb-5">{service.desc}</p>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wide text-gray-400 mb-3">Deliverables</p>
                  <ul className="space-y-2">
                    {service.deliverables.map((d) => (
                      <li key={d} className="flex items-center gap-2 text-xs text-gray-600">
                        <CheckCircle size={12} className="text-emerald-500 shrink-0" />
                        {d}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── ENGAGEMENT MODELS ── */}
      <section className="bg-slate-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <p className="text-xs font-semibold uppercase tracking-widest text-emerald-600 mb-3">Engagement Models</p>
            <h2 className="text-3xl font-bold text-gray-900">Choose the Right Engagement</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {engagements.map((eng, i) => (
              <div
                key={eng.name}
                className={`rounded-2xl p-8 border ${i === 1 ? "border-emerald-500 shadow-lg bg-white emerald-glow" : "border-slate-200 bg-white shadow-sm"}`}
              >
                {i === 1 && (
                  <span className="inline-block mb-3 text-xs font-bold uppercase tracking-widest text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full">
                    Most Common
                  </span>
                )}
                <p className="text-xs text-slate-400 uppercase tracking-widest mb-1">{eng.duration}</p>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{eng.name}</h3>
                <p className="text-sm text-gray-500 leading-relaxed mb-5">{eng.desc}</p>
                <p className="text-xs text-slate-400 italic">{eng.ideal}</p>
              </div>
            ))}
          </div>
          <div className="text-center mt-8">
            <Link
              href="/book"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-lg text-sm font-semibold text-white bg-emerald-500 hover:bg-emerald-600 transition-colors"
            >
              Book a Free Discovery Call <ArrowRight size={13} />
            </Link>
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section style={{ backgroundColor: "#0A192F" }} className="py-20 text-center">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-white mb-4">Let&apos;s talk about your technology challenge</h2>
          <p className="text-slate-400 mb-10 leading-relaxed">
            Book a free 30-minute call. We&apos;ll review your current state, identify the highest-priority opportunities, and tell you honestly what&apos;s worth investing in.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/book" className="px-8 py-3.5 rounded-lg text-base font-semibold text-white bg-emerald-500 hover:bg-emerald-600 transition-colors">
              Book a Consultation
            </Link>
            <Link href="/contact" className="px-8 py-3.5 rounded-lg text-base font-semibold text-white border border-slate-600 hover:border-slate-400 transition-colors">
              Submit a Brief
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
