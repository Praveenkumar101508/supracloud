import Link from "next/link";
import { CheckCircle, Plus } from "lucide-react";

const tiers = [
  {
    tier: "Tier 1",
    name: "The Foundation",
    tagline: "Your professional presence, rebuilt to employer standards.",
    price: "Starting point for all candidates",
    highlight: false,
    cta: { label: "Apply for Pricing", href: "/apply" },
    features: [
      "Full CV rewrite — ATS-compliant, keyword-optimised for UK Data/Cloud/AI roles",
      "LinkedIn profile overhaul (headline, about, experience, skills)",
      "GitHub profile formatting — README, pinned repos, contribution graph",
      "Professional portfolio page creation",
      "Role-specific keyword mapping per target job description",
    ],
  },
  {
    tier: "Tier 2",
    name: "The Application Engine",
    tagline: "We do the applying. You focus on preparing.",
    price: "Includes everything in Tier 1",
    highlight: true,
    cta: { label: "Apply for Pricing", href: "/apply" },
    features: [
      "Everything in The Foundation",
      "Done-for-you UK job applications (targeted, not mass-spray)",
      "Application tracking dashboard — every role, status, and follow-up",
      "Cover letter templates and custom outreach copy",
      "Weekly pipeline review and strategy adjustment",
      "Recruiter outreach scripts (LinkedIn DMs, cold emails)",
    ],
  },
  {
    tier: "Tier 3",
    name: "The Full Accelerator",
    tagline: "From profile to offer — we're with you every step.",
    price: "Includes everything in Tiers 1 & 2",
    highlight: false,
    cta: { label: "Book a Discovery Call", href: "/book" },
    features: [
      "Everything in Tiers 1 & 2",
      "Technical interview preparation (SQL, Python, Cloud, ML concepts)",
      "System design sessions for senior/lead roles",
      "Behavioural coaching using the STAR framework",
      "2 live mock interviews with written feedback reports",
      "1:1 weekly coaching sessions (Mon–Thu schedule)",
      "Dedicated training path tailored to your target role",
      "Salary negotiation guidance",
    ],
  },
];

const addons = [
  { name: "Extra Mock Interview", detail: "1 additional live mock session with feedback report" },
  { name: "Salary Negotiation Deep Dive", detail: "60-min 1:1 session on offer evaluation and counter-offer strategy" },
  { name: "Portfolio Deep Review", detail: "Detailed audit of all GitHub repos and portfolio projects" },
  { name: "Architecture Diagram Pack", detail: "Professional Lucidchart/Draw.io diagrams for your projects" },
];

const faqs = [
  {
    q: "Do I need to be in the UK to join?",
    a: "No. All sessions are remote. However, the programme is specifically designed for candidates targeting UK-based roles.",
  },
  {
    q: "How long does the programme take?",
    a: "Tier 1 is typically completed within 1 week. Tier 2 runs ongoing alongside your job search. Tier 3 is a 6–8 week intensive programme.",
  },
  {
    q: "What experience level is this for?",
    a: "We work with candidates ranging from junior engineers making a transition into Data/Cloud/AI, to mid-level professionals targeting senior UK roles.",
  },
  {
    q: "What tools and technologies do you cover?",
    a: "Python, SQL, Azure, AWS, Databricks, Spark, dbt, Airflow, Docker, Terraform, and more — mapped to the specific tools in your target job descriptions.",
  },
  {
    q: "Is there a refund policy?",
    a: "We offer a clear scope of work before any engagement begins. Please book an assessment call to discuss terms specific to your programme.",
  },
];

export default function ProgramsPage() {
  return (
    <div className="bg-slate-50">
      {/* Header */}
      <section style={{ backgroundColor: "#0A192F" }} className="py-20 text-center">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="inline-block mb-4 text-xs font-semibold tracking-widest uppercase text-emerald-400 border border-emerald-700 rounded-full px-3 py-1">
            Programmes & Pricing
          </p>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white">
            Transparent Pricing. Real Results.
          </h1>
          <p className="mt-4 text-slate-300 text-lg">
            Choose the level of support that matches where you are in your job search.
          </p>
        </div>
      </section>

      {/* Tier Cards */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
            {tiers.map((tier) => (
              <div
                key={tier.tier}
                className={`rounded-xl p-8 border bg-white ${
                  tier.highlight ? "border-emerald-500 shadow-xl" : "border-slate-200 shadow-sm"
                }`}
              >
                {tier.highlight && (
                  <span className="inline-block mb-3 text-xs font-bold uppercase tracking-widest text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full">
                    Most Popular
                  </span>
                )}
                <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-1">{tier.tier}</p>
                <h2 className="text-2xl font-bold text-gray-900 mb-1">{tier.name}</h2>
                <p className="text-sm text-gray-500 mb-1">{tier.tagline}</p>
                <p className="text-xs text-emerald-600 font-medium mb-6">{tier.price}</p>
                <ul className="space-y-3 mb-8">
                  {tier.features.map((f) => (
                    <li key={f} className="flex items-start gap-2 text-sm text-gray-700">
                      <CheckCircle size={16} className="text-emerald-500 mt-0.5 shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>
                <Link
                  href={tier.cta.href}
                  className={`block text-center py-3 rounded-md text-sm font-semibold transition-colors ${
                    tier.highlight
                      ? "bg-emerald-500 hover:bg-emerald-600 text-white"
                      : "border border-slate-300 hover:border-slate-500 text-gray-800"
                  }`}
                >
                  {tier.cta.label}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Add-ons */}
      <section className="bg-white py-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">Add-Ons</h2>
            <p className="mt-2 text-gray-500">Bolt on extra support to any tier.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {addons.map((a) => (
              <div key={a.name} className="flex items-start gap-4 p-6 rounded-xl border border-slate-100 bg-slate-50">
                <Plus size={20} className="text-emerald-500 shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-gray-900">{a.name}</p>
                  <p className="text-sm text-gray-500 mt-1">{a.detail}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 bg-slate-50">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">Frequently Asked Questions</h2>
          </div>
          <div className="space-y-6">
            {faqs.map((faq) => (
              <div key={faq.q} className="bg-white rounded-xl p-6 border border-slate-100 shadow-sm">
                <p className="font-semibold text-gray-900 mb-2">{faq.q}</p>
                <p className="text-sm text-gray-500 leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
          <div className="text-center mt-10">
            <Link
              href="/book"
              className="inline-block px-8 py-3.5 rounded-md text-base font-semibold text-white bg-emerald-500 hover:bg-emerald-600 transition-colors"
            >
              Book Free Assessment Call
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
