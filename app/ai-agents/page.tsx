import type { Metadata } from "next";
import Link from "next/link";
import { CheckCircle, ArrowRight, Zap, PhoneCall, Cpu } from "lucide-react";

export const metadata: Metadata = {
  title: "AI Agent Solutions for Banking & Retail | SupraCloud",
  description:
    "Custom AI agents for banking customer support and supermarket operations. Level 1 and Level 2 support automation built for UK enterprises.",
};

const steps = [
  {
    num: "01",
    title: "Discovery Call",
    desc: "We map your support workflows, data sources, and escalation rules.",
  },
  {
    num: "02",
    title: "Custom Build",
    desc: "We engineer your AI agent trained on your products, policies and tone.",
  },
  {
    num: "03",
    title: "Deploy & Monitor",
    desc: "Live deployment with performance dashboards and ongoing optimisation.",
  },
];

const bankingL1 = [
  "General customer queries (account balances, product info, branch details)",
  "Account & service assistance (basic transactions, statement requests)",
  "FAQ deflection — reduces inbound call volume by up to 60%",
];
const bankingL2 = [
  "Escalation handling (complex complaints, regulatory queries)",
  "Advanced issue resolution (fraud flags, account recovery workflows)",
  "Human handoff with full context transfer",
];

const supermarketL1 = [
  "Customer support (order status, delivery queries, returns)",
  "Order & product assistance (substitutions, availability, pricing)",
  "Store information (opening times, click & collect, loyalty queries)",
];
const supermarketL2 = [
  "Inventory & store escalations (stock issues, supplier queries)",
  "Advanced operational support (multi-system queries, complaint resolution)",
];

const techStack = [
  "Claude API", "LangGraph", "RAG", "FastAPI", "Docker", "AWS / Azure", "PostgreSQL", "Pinecone",
];

export default function AIAgentsPage() {
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
            Automate Customer Support with{" "}
            <span className="text-emerald-400">Production-Grade AI Agents</span>
          </h1>
          <p className="mt-6 text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed">
            We design, build and deploy custom AI agents for banking and supermarket sectors — reducing support costs and handling L1/L2 queries at scale, 24/7.
          </p>
          <Link
            href="/book"
            className="mt-10 inline-flex items-center gap-2 px-8 py-3.5 rounded-md text-base font-semibold text-white bg-emerald-500 hover:bg-emerald-600 transition-colors"
          >
            Book a Discovery Call <ArrowRight size={16} />
          </Link>
        </div>
      </section>

      {/*  HOW IT WORKS  */}
      <section className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">How It Works</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {steps.map((step) => (
              <div key={step.num} className="bg-slate-50 rounded-xl p-8 border border-slate-100 text-center">
                <div className="text-3xl font-extrabold text-emerald-500 mb-3">{step.num}</div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">{step.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/*  BANKING AGENTS  */}
      <section className="bg-slate-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg bg-emerald-50 border border-emerald-200 flex items-center justify-center">
                  <PhoneCall size={20} className="text-emerald-600" />
                </div>
                <span className="text-xs font-semibold uppercase tracking-widest text-emerald-600">Banking Sector</span>
              </div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Banking Sector AI Agents</h2>
              <p className="text-gray-500 leading-relaxed mb-8">
                Handle high-volume customer queries without scaling headcount. Our banking agents are trained on financial products, account management workflows, and compliance-aware escalation paths.
              </p>

              {/* Stat callout */}
              <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-5 mb-8">
                <p className="text-2xl font-extrabold text-emerald-600">Up to 60%</p>
                <p className="text-sm text-emerald-700 mt-1">reduction in L1 call volume</p>
              </div>
            </div>

            <div className="space-y-6">
              <div className="bg-white rounded-xl p-6 border border-slate-100 shadow-sm">
                <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <Zap size={16} className="text-emerald-500" /> Level 1 Support
                </h3>
                <ul className="space-y-3">
                  {bankingL1.map((item) => (
                    <li key={item} className="flex items-start gap-2 text-sm text-gray-600">
                      <CheckCircle size={15} className="text-emerald-500 mt-0.5 shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="bg-white rounded-xl p-6 border border-slate-100 shadow-sm">
                <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <Cpu size={16} className="text-slate-500" /> Level 2 Support
                </h3>
                <ul className="space-y-3">
                  {bankingL2.map((item) => (
                    <li key={item} className="flex items-start gap-2 text-sm text-gray-600">
                      <CheckCircle size={15} className="text-emerald-500 mt-0.5 shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/*  SUPERMARKET AGENTS  */}
      <section className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            <div className="order-2 lg:order-1 space-y-6">
              <div className="bg-slate-50 rounded-xl p-6 border border-slate-100">
                <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <Zap size={16} className="text-emerald-500" /> Level 1 Support
                </h3>
                <ul className="space-y-3">
                  {supermarketL1.map((item) => (
                    <li key={item} className="flex items-start gap-2 text-sm text-gray-600">
                      <CheckCircle size={15} className="text-emerald-500 mt-0.5 shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="bg-slate-50 rounded-xl p-6 border border-slate-100">
                <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <Cpu size={16} className="text-slate-500" /> Level 2 Support
                </h3>
                <ul className="space-y-3">
                  {supermarketL2.map((item) => (
                    <li key={item} className="flex items-start gap-2 text-sm text-gray-600">
                      <CheckCircle size={15} className="text-emerald-500 mt-0.5 shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="order-1 lg:order-2">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg bg-slate-100 border border-slate-200 flex items-center justify-center">
                  <PhoneCall size={20} className="text-slate-600" />
                </div>
                <span className="text-xs font-semibold uppercase tracking-widest text-slate-500">Supermarket & Retail</span>
              </div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Supermarket & Retail AI Agents</h2>
              <p className="text-gray-500 leading-relaxed mb-8">
                From order queries to inventory escalations — our retail agents handle peak-time demand without the overhead.
              </p>
              <div className="bg-slate-50 border border-slate-200 rounded-xl p-5">
                <p className="text-xl font-extrabold text-gray-900">Handle peak season demand</p>
                <p className="text-sm text-gray-500 mt-1">without hiring seasonal headcount</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/*  TECH STACK  */}
      <section className="bg-slate-50 py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Built on proven production technology</h2>
          <div className="flex flex-wrap justify-center gap-3 mt-6">
            {techStack.map((tech) => (
              <span
                key={tech}
                className="px-4 py-2 rounded-full bg-white border border-slate-200 text-sm font-medium text-gray-700 shadow-sm"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/*  BOTTOM CTA  */}
      <section style={{ backgroundColor: "#0A192F" }} className="py-16 text-center">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">
            Ready to automate your customer support?
          </h2>
          <p className="text-slate-300 mb-8">
            Let&apos;s talk about your support workflows and build something that actually works.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/book"
              className="px-8 py-3.5 rounded-md text-base font-semibold text-white bg-emerald-500 hover:bg-emerald-600 transition-colors"
            >
              Book a Discovery Call
            </Link>
            <Link
              href="/contact"
              className="px-8 py-3.5 rounded-md text-base font-semibold text-white border border-slate-500 hover:border-white transition-colors"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
