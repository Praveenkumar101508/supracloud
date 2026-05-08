import type { Metadata } from "next";
import Link from "next/link";
import { CheckCircle, ArrowRight, GraduationCap, Code2, Calendar, MapPin } from "lucide-react";

export const metadata: Metadata = {
  title: "Graduate Internships | SupraCloud Talent",
  description:
    "Paid technical internships for Data, Cloud & AI engineering graduates across the UK. Real project delivery, mentoring, and a direct pathway into enterprise roles.",
};

const roles = [
  { title: "Data Engineering Intern", duration: "3–6 months", stack: "Spark · dbt · Azure / AWS · SQL" },
  { title: "AI / ML Engineering Intern", duration: "3–6 months", stack: "LangGraph · RAG · Python · MLflow" },
  { title: "Cloud & Platform Intern", duration: "3–6 months", stack: "Terraform · Kubernetes · AWS / Azure" },
  { title: "QA & Test Automation Intern", duration: "3 months", stack: "Playwright · TypeScript · CI/CD" },
];

const whatYouGet = [
  "Paid UK internship — competitive day rate or monthly salary",
  "Real production project ownership from week two",
  "Weekly 1:1 mentoring with a senior SupraCloud engineer",
  "Access to SupraCloud's enterprise client network",
  "Portfolio project with architecture documentation",
  "Reference letter and performance assessment on completion",
];

export default function InternshipsPage() {
  return (
    <div className="bg-slate-50">
      {/*  HERO  */}
      <section style={{ backgroundColor: "#0A192F" }} className="relative overflow-hidden py-24">
        <div aria-hidden className="pointer-events-none absolute inset-0 opacity-[0.035]"
          style={{ backgroundImage: "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)", backgroundSize: "48px 48px" }} />
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="inline-flex items-center gap-2 mb-5 text-xs font-semibold tracking-widest uppercase text-emerald-400 border border-emerald-700/50 rounded-full px-3 py-1.5">
            <GraduationCap size={11} /> Talent Pipeline
          </span>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white leading-tight mb-6">
            Graduate{" "}
            <span className="gradient-text">Internships</span>
          </h1>
          <p className="text-lg text-slate-400 max-w-2xl mx-auto leading-relaxed mb-10">
            Paid technical internships across Data, Cloud & AI engineering. Real production work, senior mentoring, and a direct pathway into permanent enterprise roles.
          </p>
          <Link href="/contact" className="inline-flex items-center gap-2 px-8 py-3.5 rounded-lg text-base font-semibold text-white bg-emerald-500 hover:bg-emerald-600 transition-colors">
            Apply for an Internship <ArrowRight size={15} />
          </Link>
        </div>
      </section>

      {/*  ROLES  */}
      <section className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <p className="text-xs font-semibold uppercase tracking-widest text-emerald-600 mb-3">Open Roles</p>
            <h2 className="text-3xl font-bold text-gray-900">Current Internship Tracks</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {roles.map((role) => (
              <div key={role.title} className="hover-lift bg-slate-50 rounded-2xl p-7 border border-slate-100 flex flex-col gap-3">
                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-lg bg-emerald-50 border border-emerald-100 flex items-center justify-center shrink-0">
                    <Code2 size={16} className="text-emerald-600" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900">{role.title}</h3>
                    <div className="flex items-center gap-3 mt-1 text-xs text-slate-400">
                      <span className="flex items-center gap-1"><Calendar size={11} /> {role.duration}</span>
                      <span className="flex items-center gap-1"><MapPin size={11} /> UK-based (hybrid)</span>
                    </div>
                  </div>
                </div>
                <p className="text-xs font-mono text-slate-500 bg-slate-100 rounded-lg px-3 py-2">{role.stack}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/*  WHAT YOU GET  */}
      <section className="bg-slate-50 py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <p className="text-xs font-semibold uppercase tracking-widest text-emerald-600 mb-3">Benefits</p>
            <h2 className="text-2xl font-bold text-gray-900">What Every Intern Receives</h2>
          </div>
          <div className="space-y-3">
            {whatYouGet.map((item) => (
              <div key={item} className="flex items-start gap-4 p-5 bg-white rounded-xl border border-slate-100">
                <CheckCircle size={16} className="text-emerald-500 shrink-0 mt-0.5" />
                <p className="text-sm text-gray-700">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/*  CTA  */}
      <section style={{ backgroundColor: "#0A192F" }} className="py-20 text-center">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-white mb-4">Ready to start your engineering career?</h2>
          <p className="text-slate-400 mb-10">Get in touch and tell us which track you&apos;re interested in. We&apos;ll guide you through the application process.</p>
          <Link href="/contact" className="px-8 py-3.5 rounded-lg text-base font-semibold text-white bg-emerald-500 hover:bg-emerald-600 transition-colors">
            Apply Now
          </Link>
        </div>
      </section>
    </div>
  );
}
