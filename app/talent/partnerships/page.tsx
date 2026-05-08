import type { Metadata } from "next";
import Link from "next/link";
import { CheckCircle, ArrowRight, Handshake, GraduationCap, Building2, Calendar } from "lucide-react";

export const metadata: Metadata = {
  title: "Placement Year Partnerships",
  description:
    "University placement year partnerships connecting students with enterprise AI and data engineering hosts. Structured programmes with mentoring, real project delivery, and graduate conversion pathways.",
};

const benefits = {
  students: [
    "12-month paid placement at a UK enterprise host organisation",
    "Structured SupraCloud mentoring programme throughout the year",
    "Real project delivery — not admin or shadowing",
    "Priority consideration for graduate roles at placement host",
    "SupraCloud network access and career support post-placement",
  ],
  employers: [
    "Pre-screened, technically-vetted placement candidates",
    "SupraCloud mentoring reduces line-manager overhead",
    "Projects scoped to deliver real business value",
    "Graduate conversion pathway — retain top talent post-degree",
    "University relationship support and employer branding materials",
  ],
};

export default function PartnershipsPage() {
  return (
    <div className="bg-slate-50">
      {/* ── HERO ── */}
      <section style={{ backgroundColor: "#0A192F" }} className="relative overflow-hidden py-24">
        <div aria-hidden className="pointer-events-none absolute inset-0 opacity-[0.035]"
          style={{ backgroundImage: "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)", backgroundSize: "48px 48px" }} />
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="inline-flex items-center gap-2 mb-5 text-xs font-semibold tracking-widest uppercase text-emerald-400 border border-emerald-700/50 rounded-full px-3 py-1.5">
            <Handshake size={11} /> Talent Pipeline
          </span>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white leading-tight mb-6">
            Placement Year{" "}
            <span className="gradient-text">Partnerships</span>
          </h1>
          <p className="text-lg text-slate-400 max-w-2xl mx-auto leading-relaxed mb-10">
            We connect university students with enterprise host organisations for structured, mentored 12-month placements in Data, Cloud & AI roles — with real project delivery from week one.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact" className="inline-flex items-center gap-2 px-8 py-3.5 rounded-lg text-base font-semibold text-white bg-emerald-500 hover:bg-emerald-600 transition-colors">
              Partner With Us <ArrowRight size={15} />
            </Link>
            <Link href="/book" className="inline-flex items-center gap-2 px-8 py-3.5 rounded-lg text-base font-semibold text-white border border-slate-600 hover:border-slate-400 transition-colors">
              Book a Discussion
            </Link>
          </div>
        </div>
      </section>

      {/* ── TWO AUDIENCES ── */}
      <section className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">Built for Both Sides</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-slate-50 rounded-2xl p-8 border border-slate-100">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-emerald-50 border border-emerald-100 flex items-center justify-center">
                  <GraduationCap size={18} className="text-emerald-600" />
                </div>
                <h3 className="font-bold text-gray-900">For Students</h3>
              </div>
              <ul className="space-y-4">
                {benefits.students.map((b) => (
                  <li key={b} className="flex items-start gap-3 text-sm text-gray-600">
                    <CheckCircle size={15} className="text-emerald-500 mt-0.5 shrink-0" />
                    {b}
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-slate-50 rounded-2xl p-8 border border-slate-100">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-slate-100 border border-slate-200 flex items-center justify-center">
                  <Building2 size={18} className="text-slate-600" />
                </div>
                <h3 className="font-bold text-gray-900">For Employer Partners</h3>
              </div>
              <ul className="space-y-4">
                {benefits.employers.map((b) => (
                  <li key={b} className="flex items-start gap-3 text-sm text-gray-600">
                    <CheckCircle size={15} className="text-emerald-500 mt-0.5 shrink-0" />
                    {b}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ── TIMELINE ── */}
      <section className="bg-slate-50 py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex items-center justify-center gap-3 mb-8">
            <Calendar size={20} className="text-emerald-500" />
            <h2 className="text-2xl font-bold text-gray-900">Typical Partnership Timeline</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
            {["Autumn — Host onboarding & candidate screening", "Jan — Placement matching & interviews", "June — Students begin placements", "Ongoing — SupraCloud mentoring & check-ins"].map((item, i) => (
              <div key={i} className="bg-white rounded-xl p-5 border border-slate-100 text-sm text-gray-600 text-left">
                <div className="text-xl font-extrabold text-emerald-500 mb-2">{String(i + 1).padStart(2, "0")}</div>
                {item}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section style={{ backgroundColor: "#0A192F" }} className="py-20 text-center">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-white mb-4">Interested in partnering with us?</h2>
          <p className="text-slate-400 mb-10">Whether you&apos;re an employer looking to host placements or a student seeking a structured year in industry — get in touch.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact" className="px-8 py-3.5 rounded-lg text-base font-semibold text-white bg-emerald-500 hover:bg-emerald-600 transition-colors">
              Contact Us
            </Link>
            <Link href="/book" className="px-8 py-3.5 rounded-lg text-base font-semibold text-white border border-slate-600 hover:border-slate-400 transition-colors">
              Book a Discussion
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
