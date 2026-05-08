import Link from "next/link";
import { Target, ShieldCheck, Layers } from "lucide-react";

const values = [
  {
    icon: <Layers size={28} className="text-emerald-500" />,
    title: "Technical Depth",
    description:
      "We don't teach surface-level concepts. Every project, session, and piece of feedback is grounded in how real engineering teams actually work.",
  },
  {
    icon: <ShieldCheck size={28} className="text-emerald-500" />,
    title: "Accountability",
    description:
      "We hold you to a schedule — Mon to Thu, structured and consistent. Because employers don't care about intention, they care about output.",
  },
  {
    icon: <Target size={28} className="text-emerald-500" />,
    title: "Real-World Standards",
    description:
      "Every deliverable — your CV, your GitHub, your mock interview — is measured against what senior engineers and hiring managers actually expect.",
  },
];

export default function AboutPage() {
  return (
    <div className="bg-slate-50">
      {/* Header */}
      <section style={{ backgroundColor: "#0A192F" }} className="py-20 text-center">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="inline-block mb-4 text-xs font-semibold tracking-widest uppercase text-emerald-400 border border-emerald-700 rounded-full px-3 py-1">
            About Us
          </p>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white">
            Built by Engineers, for Engineers
          </h1>
          <p className="mt-4 text-slate-300 text-lg max-w-2xl mx-auto">
            SupraCloud exists because the gap between "technically capable" and "hired in the UK" is real — and we've seen it up close.
          </p>
        </div>
      </section>

      {/* Founder Story */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            {/* Architecture diagram placeholder */}
            <div className="rounded-xl bg-slate-900 p-8 font-mono text-xs text-emerald-400 leading-relaxed shadow-lg">
              <p className="text-slate-500 mb-2"># system: candidate_journey.py</p>
              <p>candidate = Candidate(</p>
              <p className="pl-4">skills=&quot;strong&quot;,</p>
              <p className="pl-4">visibility=&quot;low&quot;,</p>
              <p className="pl-4">interviews_passed=0</p>
              <p>)</p>
              <br />
              <p>accelerator = SupraCloud()</p>
              <p>result = accelerator.run(candidate)</p>
              <br />
              <p className="text-white">assert result.role_secured == True</p>
              <p className="text-white">assert result.salary &gt;= target</p>
            </div>

            {/* Text */}
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">The Founder Story</h2>
              <div className="space-y-4 text-gray-600 text-sm leading-relaxed">
                <p>
                  SupraCloud was founded after watching talented engineers — people who genuinely had
                  the technical ability — fail to break into UK Data, Cloud, and AI roles. Not because
                  they couldn't do the job. Because they couldn't <em>prove</em> they could.
                </p>
                <p>
                  Their CVs didn't reflect their ability. Their GitHub was empty or full of tutorials.
                  They'd never had to explain a system design under pressure. They applied, heard nothing,
                  and assumed the market was closed to them.
                </p>
                <p>
                  This programme bridges that gap. It's not a bootcamp. It's not a course. It's a
                  structured, engineer-led accelerator that treats your job search like a production
                  system — built, tested, and deployed with precision.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="py-16 bg-slate-50">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">Our Mission</h2>
          <p className="text-gray-600 text-lg leading-relaxed">
            To close the gap between learning and employability for Data, Cloud & AI professionals
            entering or advancing in the UK tech market — through real projects, structured support,
            and uncompromising standards.
          </p>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
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
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">Let's See If We're a Fit</h2>
          <p className="text-slate-300 mb-8">Book a free 30-minute call. No pitch. Just an honest conversation about where you are and where you want to be.</p>
          <Link
            href="/book"
            className="inline-block px-8 py-3.5 rounded-md text-base font-semibold text-white bg-emerald-500 hover:bg-emerald-600 transition-colors"
          >
            Book Free Assessment Call
          </Link>
        </div>
      </section>
    </div>
  );
}
