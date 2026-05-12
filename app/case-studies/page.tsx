import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Clock, CheckCircle } from "lucide-react";

export const metadata: Metadata = {
  title: "Case Studies | SupraCloud",
  description: "Illustrative case studies showing how SupraCloud AI agents deliver measurable ROI in banking and retail — based on production deployment patterns.",
  openGraph: {
    title: "Case Studies | SupraCloud",
    description: "Banking and retail AI agent case studies — real production deployment patterns, measurable results, and enterprise-grade delivery.",
    url: "https://supracloud.co.uk/case-studies",
    siteName: "SupraCloud",
    locale: "en_GB",
  },
  alternates: { canonical: "https://supracloud.co.uk/case-studies" },
};

const caseStudies = [
  {
    id: "banking",
    label: "Banking",
    disclaimer: "Illustrative case study — based on production deployment patterns",
    client: "Tier 1 UK High Street Bank",
    clientNote: "anonymised",
    challenge:
      "240,000 monthly L1 contacts, 78% human-handled at £8.20 per contact. Support costs were growing faster than customer base, and human agents were spending the majority of their time on routine enquiries with no time for complex cases.",
    solution:
      "LangGraph + RAG pipeline deployed across web chat and IVR channels, trained on 14,000 policy documents. The agent handles balance enquiries, transaction disputes, product eligibility checks, and fraud flag detection — with seamless human handoff for genuinely complex cases.",
    results: [
      { value: "58%", label: "L1 deflection rate" },
      { value: "£1.2M", label: "Annualised saving" },
      { value: "<400ms", label: "Average response latency" },
    ],
    timeline: "6 weeks discovery to production",
    stack: ["Claude API", "LangGraph", "Pinecone", "FastAPI", "AWS Lambda"],
    resultDetail:
      "The agent now handles the majority of routine customer contacts autonomously, with full audit trails and SLA dashboards. Human agents focus on complex complaints and relationship management.",
  },
  {
    id: "supermarket",
    label: "Retail",
    disclaimer: "Illustrative case study — based on production deployment patterns",
    client: "UK Top-10 Supermarket Chain",
    clientNote: "anonymised",
    challenge:
      "Christmas peak brought a 4× surge in contact volume, with 68% of queries relating to stock availability and delivery slots. The retailer faced a £340k seasonal headcount surge with no guarantee of quality or consistency.",
    solution:
      "Retail agent mesh integrating SAP, Oracle Retail, and the loyalty platform. The agent handles stock availability queries, delivery slot management, returns processing, and click-and-collect enquiries — across all digital channels simultaneously.",
    results: [
      { value: "71%", label: "Stock-query deflection" },
      { value: "+38", label: "NPS improvement" },
      { value: "£0", label: "Seasonal headcount cost" },
    ],
    timeline: "8 weeks to Christmas peak",
    stack: ["Claude API", "LangGraph", "Redis", "AWS Lambda", "Prometheus"],
    resultDetail:
      "Zero additional seasonal headcount was required. The agent handled peak Christmas volume with consistent quality, and the NPS improvement was attributed directly to faster resolution times and 24/7 availability.",
  },
];

export default function CaseStudiesPage() {
  return (
    <div className="bg-slate-50">
      {/* Hero */}
      <section
        style={{ backgroundColor: "#0A192F" }}
        className="relative py-24 overflow-hidden"
      >
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
            background:
              "radial-gradient(ellipse 70% 50% at 50% 0%, rgba(16,185,129,0.07) 0%, transparent 70%)",
          }}
        />
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="inline-flex items-center gap-2 mb-5 text-xs font-semibold tracking-widest uppercase text-emerald-400 border border-emerald-700/50 rounded-full px-3 py-1.5">
            Case Studies
          </p>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white leading-tight mb-5">
            Production AI,{" "}
            <span className="gradient-text">Measurable Results</span>
          </h1>
          <p className="text-lg text-slate-400 max-w-2xl mx-auto leading-relaxed">
            How SupraCloud deploys enterprise AI agents that deliver real ROI — not
            proof-of-concepts that gather dust.
          </p>
        </div>
      </section>

      {/* Case Studies */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          {caseStudies.map((cs, idx) => (
            <div
              key={cs.id}
              className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden"
            >
              {/* Disclaimer banner */}
              <div className="bg-amber-50 border-b border-amber-100 px-6 py-3 flex items-center gap-2">
                <span className="text-xs font-medium text-amber-700">
                  {cs.disclaimer}
                </span>
              </div>

              {/* Header */}
              <div
                style={{ backgroundColor: "#0A192F" }}
                className="px-8 py-8 flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4"
              >
                <div>
                  <span className="inline-flex items-center gap-1.5 text-xs font-semibold tracking-widest uppercase text-emerald-400 mb-3">
                    {cs.label} Sector
                  </span>
                  <h2 className="text-2xl font-bold text-white mb-1">
                    {cs.client}
                  </h2>
                  <p className="text-slate-500 text-sm">{cs.clientNote}</p>
                </div>
                <div className="flex items-center gap-2 text-sm text-slate-400 shrink-0">
                  <Clock size={14} className="text-emerald-500" />
                  {cs.timeline}
                </div>
              </div>

              {/* Stat strip */}
              <div
                style={{ backgroundColor: "#071527" }}
                className="grid grid-cols-3 divide-x divide-slate-800/60 border-b border-slate-800/40"
              >
                {cs.results.map((r) => (
                  <div key={r.label} className="px-6 py-5 text-center">
                    <p className="text-2xl font-extrabold text-emerald-400">
                      {r.value}
                    </p>
                    <p className="text-xs text-slate-400 mt-1">{r.label}</p>
                  </div>
                ))}
              </div>

              {/* Body */}
              <div className="p-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Problem */}
                <div>
                  <p className="text-xs font-semibold uppercase tracking-widest text-slate-400 mb-3">
                    The Challenge
                  </p>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    {cs.challenge}
                  </p>
                </div>

                {/* Solution */}
                <div>
                  <p className="text-xs font-semibold uppercase tracking-widest text-slate-400 mb-3">
                    The Solution
                  </p>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    {cs.solution}
                  </p>
                </div>

                {/* Results */}
                <div>
                  <p className="text-xs font-semibold uppercase tracking-widest text-slate-400 mb-3">
                    The Outcome
                  </p>
                  <p className="text-sm text-gray-600 leading-relaxed mb-5">
                    {cs.resultDetail}
                  </p>

                  {/* Tech stack */}
                  <p className="text-xs font-semibold text-slate-400 mb-2">
                    Tech Stack
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {cs.stack.map((t) => (
                      <span
                        key={t}
                        className="px-2.5 py-1 rounded-full text-xs font-medium bg-slate-100 text-slate-600 border border-slate-200"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* CTA */}
              <div className="border-t border-slate-100 px-8 py-5 flex items-center justify-between gap-4">
                <p className="text-sm text-gray-500">
                  Interested in a similar engagement?
                </p>
                <Link
                  href="/book"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-semibold text-white bg-emerald-500 hover:bg-emerald-600 transition-colors"
                >
                  Book a similar engagement <ArrowRight size={13} />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Bottom CTA */}
      <section
        style={{ backgroundColor: "#0A192F" }}
        className="py-20 text-center"
      >
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to build your case study?
          </h2>
          <p className="text-slate-400 mb-10 leading-relaxed">
            Book a discovery call. We&apos;ll map your support workflows, identify the
            highest-value automation opportunities, and scope a production deployment
            with measurable ROI targets.
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
              className="inline-flex items-center justify-center px-8 py-3.5 rounded-lg text-base font-semibold text-white border border-slate-600 hover:border-slate-400 transition-colors"
            >
              Submit a Brief
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
