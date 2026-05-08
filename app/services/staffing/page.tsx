import type { Metadata } from "next";
import Link from "next/link";
import { CheckCircle, ArrowRight, Briefcase, Users, Code2, Shield, Clock, Building2 } from "lucide-react";

export const metadata: Metadata = {
  title: "IT Staffing & Resource Outsourcing",
  description:
    "Engineer-vetted IT staffing for contract, permanent, and project-based roles across Data, Cloud, and AI. UK-focused, IR35-compliant, fast turnaround.",
};

const engagementModels = [
  {
    icon: <Briefcase size={22} className="text-emerald-500" />,
    title: "Contract Staffing",
    desc: "Flexible resource for project delivery, team augmentation, or surge capacity. Day-rate or fixed-term contracts. IR35-compliant assessment and documentation provided.",
    tags: ["Data Engineering", "ML Engineering", "Cloud Architecture", "DevOps"],
  },
  {
    icon: <Users size={22} className="text-emerald-500" />,
    title: "Permanent Placement",
    desc: "End-to-end recruitment for permanent technical hires. We source, screen technically, and present only shortlisted candidates — reducing hiring manager time by 70%.",
    tags: ["Senior Engineer", "Tech Lead", "Principal Engineer", "Head of Data"],
  },
  {
    icon: <Code2 size={22} className="text-emerald-500" />,
    title: "Project-Based Teams",
    desc: "Dedicated small teams for specific deliverables — data migration, ML model deployment, cloud infrastructure build-outs. Fixed scope, fixed timeline.",
    tags: ["Data Migration", "Cloud Build-Out", "ML Deployment", "Platform Engineering"],
  },
];

const disciplines = [
  "Data Engineering (Spark, dbt, Airflow, Azure Data Factory)",
  "ML Engineering (PyTorch, MLflow, Kubeflow, Sagemaker)",
  "Cloud Architecture (AWS, Azure, GCP — certified)",
  "Platform & DevOps Engineering (Terraform, Kubernetes, CI/CD)",
  "AI / LLM Engineering (LangChain, LangGraph, RAG stacks)",
  "Software Engineering (Python, TypeScript, Go, Java)",
  "Data Science & Analytics (Python, R, Power BI, Databricks)",
  "QA & Test Automation (Playwright, Selenium, Cypress)",
];

const process = [
  { num: "01", title: "Submit a Brief", desc: "Tell us the role, seniority, duration, and technical requirements. We respond within 4 business hours." },
  { num: "02", title: "Technical Screening", desc: "Our engineers assess candidates against your stack — not just keywords. Only technically validated profiles proceed." },
  { num: "03", title: "Shortlist Delivery", desc: "You receive 2–4 pre-vetted candidates with technical assessment summaries. No CV spam." },
  { num: "04", title: "Placement & Onboarding", desc: "We manage contracts, IR35 assessments, and onboarding. Ongoing support throughout the engagement." },
];

export default function StaffingPage() {
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
            <Briefcase size={11} /> Enterprise IT Services
          </span>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white leading-tight mb-6">
            IT Staffing & Resource{" "}
            <span className="gradient-text">Outsourcing</span>
          </h1>
          <p className="text-lg text-slate-400 max-w-2xl mx-auto leading-relaxed mb-10">
            Vetted engineers for contract, permanent, and project-based roles across Data, Cloud, and AI. Engineer-assessed — not keyword-matched. UK-focused with full IR35 compliance.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-lg text-base font-semibold text-white bg-emerald-500 hover:bg-emerald-600 transition-colors"
            >
              Submit a Staffing Brief <ArrowRight size={15} />
            </Link>
            <Link
              href="/book"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-lg text-base font-semibold text-white border border-slate-600 hover:border-slate-400 transition-colors"
            >
              Book a Consultation
            </Link>
          </div>
        </div>
      </section>

      {/* ── STAT BAR ── */}
      <section className="border-b border-slate-200 py-5 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {[
              { value: "< 4hrs", label: "Brief response time" },
              { value: "2–4", label: "Shortlisted candidates delivered" },
              { value: "70%", label: "Reduction in hiring manager time" },
              { value: "IR35", label: "Compliant contracts provided" },
            ].map((s) => (
              <div key={s.label}>
                <p className="text-2xl font-extrabold text-emerald-600">{s.value}</p>
                <p className="text-xs text-gray-500 mt-1">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── ENGAGEMENT MODELS ── */}
      <section className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <p className="text-xs font-semibold uppercase tracking-widest text-emerald-600 mb-3">Engagement Models</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">Right-Fit Technical Talent</h2>
            <p className="mt-3 text-gray-500 max-w-xl mx-auto">
              Three flexible models — matched to your project scope, budget, and timeline.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {engagementModels.map((model) => (
              <div key={model.title} className="hover-lift bg-slate-50 rounded-2xl p-8 border border-slate-100 flex flex-col">
                <div className="w-11 h-11 rounded-xl bg-emerald-50 border border-emerald-100 flex items-center justify-center mb-5">
                  {model.icon}
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-3">{model.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed flex-1">{model.desc}</p>
                <div className="mt-5 flex flex-wrap gap-2">
                  {model.tags.map((tag) => (
                    <span key={tag} className="px-2.5 py-1 rounded-full text-xs font-medium bg-emerald-50 text-emerald-700 border border-emerald-100">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── DISCIPLINES ── */}
      <section className="bg-slate-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-emerald-600 mb-3">Technical Disciplines</p>
              <h2 className="text-3xl font-bold text-gray-900 mb-5">Covering the Full Tech Stack</h2>
              <p className="text-gray-500 leading-relaxed mb-8">
                We place engineers across the full modern data and AI stack — assessed by engineers who have actually shipped production systems, not recruiters working from a skills checklist.
              </p>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg text-sm font-semibold text-white bg-emerald-500 hover:bg-emerald-600 transition-colors"
              >
                Submit a Staffing Brief <ArrowRight size={13} />
              </Link>
            </div>
            <div className="grid grid-cols-1 gap-3">
              {disciplines.map((d) => (
                <div key={d} className="flex items-start gap-3 bg-white rounded-xl p-4 border border-slate-100">
                  <CheckCircle size={15} className="text-emerald-500 shrink-0 mt-0.5" />
                  <p className="text-sm text-gray-700">{d}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── PROCESS ── */}
      <section className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <p className="text-xs font-semibold uppercase tracking-widest text-emerald-600 mb-3">Our Process</p>
            <h2 className="text-3xl font-bold text-gray-900">From Brief to Placed — Fast</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {process.map((step) => (
              <div key={step.num} className="bg-slate-50 rounded-xl p-6 border border-slate-100 text-center">
                <div className="text-3xl font-extrabold text-emerald-500 mb-3">{step.num}</div>
                <h3 className="font-bold text-gray-900 text-sm mb-2">{step.title}</h3>
                <p className="text-xs text-gray-500 leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHY US ── */}
      <section className="bg-slate-50 py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-gray-900 text-center mb-8">Why SupraCloud Staffing</h2>
          <div className="space-y-4">
            {[
              { icon: <Shield size={18} className="text-emerald-500" />, text: "Engineer-led screening — we assess technical depth ourselves, not via automated tests" },
              { icon: <Clock size={18} className="text-emerald-500" />, text: "Fast turnaround — shortlist delivered within 5 working days of brief submission" },
              { icon: <Building2 size={18} className="text-emerald-500" />, text: "UK-focused — we understand IR35, the UK market, and enterprise procurement processes" },
            ].map((item) => (
              <div key={item.text} className="flex items-start gap-4 p-5 bg-white rounded-xl border border-slate-100">
                <div className="w-8 h-8 rounded-lg bg-emerald-50 flex items-center justify-center shrink-0">{item.icon}</div>
                <p className="text-sm text-gray-700 leading-relaxed">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section style={{ backgroundColor: "#0A192F" }} className="py-20 text-center">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-white mb-4">Tell us what you need</h2>
          <p className="text-slate-400 mb-10 leading-relaxed">
            Submit a brief and we&apos;ll respond within 4 business hours with a resourcing plan and candidate timeline.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact" className="px-8 py-3.5 rounded-lg text-base font-semibold text-white bg-emerald-500 hover:bg-emerald-600 transition-colors">
              Submit a Staffing Brief
            </Link>
            <Link href="/book" className="px-8 py-3.5 rounded-lg text-base font-semibold text-white border border-slate-600 hover:border-slate-400 transition-colors">
              Book a Consultation
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
