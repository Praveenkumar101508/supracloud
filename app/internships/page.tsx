import type { Metadata } from "next";
import Link from "next/link";
import { CheckCircle, GraduationCap, Cloud, Bot } from "lucide-react";

export const metadata: Metadata = {
  title: "Internship Programme | SupraCloud",
  description:
    "Structured internships in Data, Cloud and AI for students and fresh graduates. Real projects, mentorship, and placement support.",
};

const tracks = [
  {
    icon: <GraduationCap size={28} className="text-emerald-500" />,
    title: "Data & Analytics Internship",
    duration: "3–6 months",
    skills: ["Python", "SQL", "Power BI", "dbt", "data pipelines"],
    outcome: "Production-style portfolio project + CV + LinkedIn",
  },
  {
    icon: <Cloud size={28} className="text-emerald-500" />,
    title: "Cloud & Infrastructure Internship",
    duration: "3–6 months",
    skills: ["Azure / AWS fundamentals", "Terraform", "Docker", "CI/CD"],
    outcome: "Deployed cloud project + architecture diagrams",
  },
  {
    icon: <Bot size={28} className="text-emerald-500" />,
    title: "AI & ML Internship",
    duration: "3–6 months",
    skills: ["Python", "ML fundamentals", "LangChain", "model deployment"],
    outcome: "End-to-end ML project + GitHub portfolio",
  },
];

const forWho = [
  "Final year university students",
  "Recent graduates (within 2 years)",
  "Career changers with transferable technical skills",
];

export default function InternshipsPage() {
  return (
    <div className="bg-slate-50">
      {/* ── HERO ── */}
      <section style={{ backgroundColor: "#0A192F" }} className="relative overflow-hidden py-24">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)",
            backgroundSize: "48px 48px",
          }}
        />
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="inline-block mb-4 text-xs font-semibold tracking-widest uppercase text-emerald-400 border border-emerald-700 rounded-full px-3 py-1">
            Internship Programme
          </span>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white leading-tight">
            Start Your Career in{" "}
            <span className="text-emerald-400">UK Data, Cloud & AI</span>
          </h1>
          <p className="mt-6 text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed">
            A structured internship programme for students and fresh graduates — with real projects, mentorship, and placement year support.
          </p>
          <Link
            href="/apply"
            className="mt-10 inline-block px-8 py-3.5 rounded-md text-base font-semibold text-white bg-emerald-500 hover:bg-emerald-600 transition-colors"
          >
            Apply for Internship
          </Link>
        </div>
      </section>

      {/* ── THREE TRACKS ── */}
      <section className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">Choose Your Track</h2>
            <p className="mt-3 text-gray-500 max-w-xl mx-auto">
              Three specialist tracks, each with a defined project, skillset, and career outcome.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {tracks.map((track) => (
              <div
                key={track.title}
                className="bg-slate-50 rounded-xl p-8 border border-slate-100 hover:shadow-md transition-shadow flex flex-col"
              >
                <div className="mb-4">{track.icon}</div>
                <h3 className="text-lg font-bold text-gray-900 mb-1">{track.title}</h3>
                <p className="text-xs font-semibold text-emerald-600 mb-4">{track.duration}</p>
                <div className="mb-4">
                  <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Skills covered</p>
                  <div className="flex flex-wrap gap-2">
                    {track.skills.map((skill) => (
                      <span key={skill} className="px-2.5 py-1 rounded-full bg-white border border-slate-200 text-xs text-gray-600">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="mt-auto pt-4 border-t border-slate-100">
                  <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">Outcome</p>
                  <p className="text-sm text-gray-700 leading-relaxed">{track.outcome}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHO IT'S FOR ── */}
      <section className="bg-slate-50 py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">Who is this for?</h2>
          </div>
          <div className="space-y-4">
            {forWho.map((item) => (
              <div key={item} className="flex items-center gap-4 p-5 rounded-xl bg-white border border-slate-100 shadow-sm">
                <CheckCircle size={20} className="text-emerald-500 shrink-0" />
                <p className="text-gray-700 text-sm">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PLACEMENT YEAR ── */}
      <section className="bg-white py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-slate-50 rounded-xl p-10 border border-slate-100 text-center">
            <span className="inline-block mb-3 text-xs font-semibold uppercase tracking-widest text-emerald-600">Placement Year</span>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Placement Year Support</h2>
            <p className="text-gray-500 leading-relaxed max-w-xl mx-auto mb-8">
              For students on sandwich courses looking for a structured placement year in tech. We provide the project environment, mentorship, and industry exposure — you bring the commitment.
            </p>
            <Link
              href="/contact"
              className="inline-block px-8 py-3.5 rounded-md text-base font-semibold text-gray-800 border border-slate-300 hover:border-slate-500 transition-colors"
            >
              Express Interest
            </Link>
          </div>
        </div>
      </section>

      {/* ── BOTTOM CTA ── */}
      <section style={{ backgroundColor: "#0A192F" }} className="py-16 text-center">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">
            Ready to start your career in tech?
          </h2>
          <p className="text-slate-300 mb-8">
            Apply now and we&apos;ll match you to the right track based on your background and goals.
          </p>
          <Link
            href="/apply"
            className="inline-block px-8 py-3.5 rounded-md text-base font-semibold text-white bg-emerald-500 hover:bg-emerald-600 transition-colors"
          >
            Apply Now
          </Link>
        </div>
      </section>
    </div>
  );
}
