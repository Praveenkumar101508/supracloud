import type { Metadata } from "next";
import Link from "next/link";
import { CheckCircle, ArrowRight, BookOpen, Code2, Cloud, Bot } from "lucide-react";

export const metadata: Metadata = {
  title: "Industry Training Programs | SupraCloud Talent",
  description:
    "Structured Data, Cloud & AI training programmes that build industry-ready engineers. Engineer-delivered, production-focused, and aligned to enterprise hiring standards.",
};

const tracks = [
  {
    icon: <Code2 size={20} className="text-emerald-500" />,
    title: "Data Engineering Track",
    duration: "12 weeks",
    level: "Junior → Mid",
    skills: ["Spark, dbt, Airflow", "Azure Data Factory / AWS Glue", "SQL performance & data modelling", "Production pipeline architecture"],
  },
  {
    icon: <Bot size={20} className="text-emerald-500" />,
    title: "AI & ML Engineering Track",
    duration: "14 weeks",
    level: "Mid → Senior",
    skills: ["LLMs, RAG pipelines, LangGraph", "MLflow, model versioning & deployment", "Evaluation frameworks & observability", "Production serving patterns"],
  },
  {
    icon: <Cloud size={20} className="text-emerald-500" />,
    title: "Cloud & Platform Engineering Track",
    duration: "10 weeks",
    level: "Junior → Mid",
    skills: ["AWS / Azure architecture patterns", "Terraform & Kubernetes", "CI/CD pipelines & GitOps", "Security, compliance & cost optimisation"],
  },
];

const outcomes = [
  "Production-quality portfolio project with architecture documentation",
  "ATS-optimised CV written by engineers, not template tools",
  "Technical mock interview preparation with structured feedback",
  "LinkedIn profile optimised for UK engineering recruiter searches",
  "Placement support and referral into SupraCloud's enterprise network",
];

export default function ProgramsPage() {
  return (
    <div className="bg-slate-50">
      {/* ── HERO ── */}
      <section style={{ backgroundColor: "#0A192F" }} className="relative overflow-hidden py-24">
        <div aria-hidden className="pointer-events-none absolute inset-0 opacity-[0.035]"
          style={{ backgroundImage: "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)", backgroundSize: "48px 48px" }} />
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="inline-flex items-center gap-2 mb-5 text-xs font-semibold tracking-widest uppercase text-emerald-400 border border-emerald-700/50 rounded-full px-3 py-1.5">
            <BookOpen size={11} /> Talent Pipeline
          </span>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white leading-tight mb-6">
            Industry Training{" "}
            <span className="gradient-text">Programs</span>
          </h1>
          <p className="text-lg text-slate-400 max-w-2xl mx-auto leading-relaxed mb-10">
            Structured pathways for Data, Cloud & AI engineering — delivered by engineers who build production systems. Designed to meet enterprise hiring standards from day one.
          </p>
          <Link href="/contact" className="inline-flex items-center gap-2 px-8 py-3.5 rounded-lg text-base font-semibold text-white bg-emerald-500 hover:bg-emerald-600 transition-colors">
            Enquire About Programs <ArrowRight size={15} />
          </Link>
        </div>
      </section>

      {/* ── TRACKS ── */}
      <section className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <p className="text-xs font-semibold uppercase tracking-widest text-emerald-600 mb-3">Training Tracks</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">Choose Your Specialism</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {tracks.map((track) => (
              <div key={track.title} className="hover-lift bg-slate-50 rounded-2xl p-8 border border-slate-100 flex flex-col">
                <div className="w-11 h-11 rounded-xl bg-emerald-50 border border-emerald-100 flex items-center justify-center mb-5">
                  {track.icon}
                </div>
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-xs font-semibold text-emerald-600 bg-emerald-50 border border-emerald-100 px-2 py-0.5 rounded-full">{track.duration}</span>
                  <span className="text-xs text-slate-400">{track.level}</span>
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-4">{track.title}</h3>
                <ul className="space-y-2 flex-1">
                  {track.skills.map((skill) => (
                    <li key={skill} className="flex items-start gap-2 text-sm text-gray-600">
                      <CheckCircle size={14} className="text-emerald-500 mt-0.5 shrink-0" />
                      {skill}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── OUTCOMES ── */}
      <section className="bg-slate-50 py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-xs font-semibold uppercase tracking-widest text-emerald-600 mb-3">Programme Outcomes</p>
            <h2 className="text-3xl font-bold text-gray-900">What Every Graduate Receives</h2>
          </div>
          <div className="space-y-4">
            {outcomes.map((outcome) => (
              <div key={outcome} className="flex items-start gap-4 p-5 bg-white rounded-xl border border-slate-100">
                <CheckCircle size={18} className="text-emerald-500 shrink-0 mt-0.5" />
                <p className="text-sm text-gray-700 leading-relaxed">{outcome}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section style={{ backgroundColor: "#0A192F" }} className="py-20 text-center">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-white mb-4">Interested in our training programmes?</h2>
          <p className="text-slate-400 mb-10">Get in touch and we&apos;ll match you to the right track and intake cohort.</p>
          <Link href="/contact" className="px-8 py-3.5 rounded-lg text-base font-semibold text-white bg-emerald-500 hover:bg-emerald-600 transition-colors">
            Contact Us
          </Link>
        </div>
      </section>
    </div>
  );
}
