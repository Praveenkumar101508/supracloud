import type { Metadata } from "next";
import Link from "next/link";
import { CheckCircle, Users, Briefcase, Code2, Lightbulb, RefreshCw, Bot } from "lucide-react";

export const metadata: Metadata = {
  title: "IT Staffing & Consultation | SupraCloud",
  description:
    "Vetted IT staffing for contract, permanent and project roles. Technology advisory and AI/automation consulting for UK businesses.",
};

const staffingCards = [
  {
    icon: <Briefcase size={24} className="text-emerald-500" />,
    title: "Contract Staffing",
    desc: "Flexible resource for project delivery, team augmentation, or surge capacity. Day rates or fixed-term contracts.",
  },
  {
    icon: <Users size={24} className="text-emerald-500" />,
    title: "Permanent Hiring",
    desc: "End-to-end recruitment for permanent technical hires. We source, screen technically, and present only shortlisted candidates.",
  },
  {
    icon: <Code2 size={24} className="text-emerald-500" />,
    title: "Project-Based Resources",
    desc: "Dedicated small teams for specific deliverables — data migration, ML model deployment, cloud infrastructure build-outs.",
  },
];

const consultationCards = [
  {
    icon: <Lightbulb size={24} className="text-emerald-500" />,
    title: "Technology Advisory",
    desc: "Audit your current tech stack. Identify bottlenecks, redundancies, and modernisation opportunities with a clear roadmap.",
  },
  {
    icon: <RefreshCw size={24} className="text-emerald-500" />,
    title: "Digital Transformation",
    desc: "End-to-end transformation programmes — from legacy system migration to cloud-native rebuild. Delivered in phases with clear milestones.",
  },
  {
    icon: <Bot size={24} className="text-emerald-500" />,
    title: "AI & Automation Consulting",
    desc: "Identify high-ROI AI and automation opportunities in your business. We scope, build proof-of-concepts, and support full deployment.",
  },
];

const whyPoints = [
  "Engineer-led, not recruiter-led — we assess technical depth ourselves",
  "We build AI systems ourselves — our consulting advice is grounded in real delivery experience",
  "UK-focused — we understand the UK hiring market, IR35 rules, and enterprise procurement",
];

export default function ITServicesPage() {
  return (
    <div className="bg-slate-50">
      {/*  HERO  */}
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
            For Businesses
          </span>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white leading-tight">
            The Right Tech Talent.{" "}
            <span className="text-emerald-400">The Right Strategy.</span>
          </h1>
          <p className="mt-6 text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed">
            We connect UK businesses with vetted IT professionals across Data, Cloud and AI — and provide strategic technology advisory to help you build and scale.
          </p>
          <Link
            href="/contact"
            className="mt-10 inline-block px-8 py-3.5 rounded-md text-base font-semibold text-white bg-emerald-500 hover:bg-emerald-600 transition-colors"
          >
            Submit a Brief
          </Link>
        </div>
      </section>

      {/*  IT STAFFING  */}
      <section className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <span className="inline-block mb-3 text-xs font-semibold uppercase tracking-widest text-emerald-600">
              IT Staffing
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">Right-Fit Technical Talent</h2>
            <p className="mt-3 text-gray-500 max-w-2xl mx-auto">
              Pre-vetted candidates across Data Engineering, ML Engineering, Cloud Architecture, and Software Development. We match on technical depth, not just keywords.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {staffingCards.map((card) => (
              <div key={card.title} className="bg-slate-50 rounded-xl p-8 border border-slate-100 hover:shadow-md transition-shadow">
                <div className="mb-4">{card.icon}</div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">{card.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{card.desc}</p>
              </div>
            ))}
          </div>
          <div className="text-center mt-10">
            <Link
              href="/contact"
              className="inline-block px-8 py-3.5 rounded-md text-base font-semibold text-white bg-emerald-500 hover:bg-emerald-600 transition-colors"
            >
              Submit a Staffing Brief
            </Link>
          </div>
        </div>
      </section>

      {/*  IT CONSULTATION  */}
      <section className="bg-slate-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <span className="inline-block mb-3 text-xs font-semibold uppercase tracking-widest text-slate-500">
              IT Consultation
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">Strategic Technology Advisory</h2>
            <p className="mt-3 text-gray-500 max-w-2xl mx-auto">
              Strategic technology advisory from engineers who have actually shipped production systems at scale.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {consultationCards.map((card) => (
              <div key={card.title} className="bg-white rounded-xl p-8 border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
                <div className="mb-4">{card.icon}</div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">{card.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{card.desc}</p>
              </div>
            ))}
          </div>
          <div className="text-center mt-10">
            <Link
              href="/book"
              className="inline-block px-8 py-3.5 rounded-md text-base font-semibold text-gray-800 border border-slate-300 hover:border-slate-500 transition-colors"
            >
              Book a Consultation
            </Link>
          </div>
        </div>
      </section>

      {/*  WHY SUPRACLOUD  */}
      <section className="bg-white py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">Why SupraCloud?</h2>
          </div>
          <div className="space-y-5">
            {whyPoints.map((point) => (
              <div key={point} className="flex items-start gap-4 p-5 rounded-xl bg-slate-50 border border-slate-100">
                <CheckCircle size={20} className="text-emerald-500 shrink-0 mt-0.5" />
                <p className="text-gray-700 text-sm leading-relaxed">{point}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/*  BOTTOM CTA  */}
      <section style={{ backgroundColor: "#0A192F" }} className="py-16 text-center">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">
            Let&apos;s talk about your requirements
          </h2>
          <p className="text-slate-300 mb-8">
            Tell us what you need and we&apos;ll respond within 1 business day.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="px-8 py-3.5 rounded-md text-base font-semibold text-white bg-emerald-500 hover:bg-emerald-600 transition-colors"
            >
              Submit a Brief
            </Link>
            <Link
              href="/book"
              className="px-8 py-3.5 rounded-md text-base font-semibold text-white border border-slate-500 hover:border-white transition-colors"
            >
              Book a Call
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
