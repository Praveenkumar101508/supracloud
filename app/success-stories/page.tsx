import Link from "next/link";
import { Quote } from "lucide-react";

const stories = [
  {
    name: "Priya S.",
    background: "BSc Computer Science graduate, 1 year in a non-technical support role. Had Python skills but no portfolio and no interview experience.",
    work: "Built the Production RAG Chatbot and Azure Data Engineering Pipeline. CV and LinkedIn fully rebuilt. Applied to 40+ UK Data Engineering roles via the Application Engine.",
    prep: "8 mock interviews covering SQL, PySpark, and system design. STAR coaching for behavioural rounds.",
    outcome: "Junior Data Engineer at a FTSE 250 financial services firm in London.",
    quote: "I'd been applying on my own for 6 months and heard nothing. Within 8 weeks of joining, I had 3 final-round interviews and accepted an offer.",
  },
  {
    name: "Daniel O.",
    background: "3 years as a Business Analyst wanting to pivot into Cloud/Data. Strong SQL but no cloud certifications or project experience.",
    work: "Built the BI Analytics Dashboard and AWS ML Deployment project. GitHub profile created from scratch. ATS CV rewrite targeting Azure/AWS Data roles.",
    prep: "Technical prep focused on cloud architecture and data modelling. 6 mock interviews plus salary negotiation session.",
    outcome: "Data Analyst (Cloud) at a scale-up in Manchester.",
    quote: "The programme forced me to build things I was scared of. By the time I got to interviews, the questions felt easy compared to the mock sessions.",
  },
  {
    name: "Amara K.",
    background: "Mid-level software engineer with 4 years of backend Python. Wanted to move into ML Engineering but had no deployed ML experience.",
    work: "Built the AWS ML Deployment project end-to-end including MLflow tracking and SageMaker endpoint. Portfolio and LinkedIn repositioned toward MLOps.",
    prep: "ML system design sessions, LLMOps concepts, and 4 mock interviews. Behavioural coaching focused on senior-level competency questions.",
    outcome: "ML Engineer at a Series B AI company in London.",
    quote: "I knew the concepts but had never deployed anything to production. That changed in week 2. I walked into interviews with actual architecture diagrams from my own project.",
  },
];

export default function SuccessStoriesPage() {
  return (
    <div className="bg-slate-50">
      {/* Header */}
      <section style={{ backgroundColor: "#0A192F" }} className="py-20 text-center">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="inline-block mb-4 text-xs font-semibold tracking-widest uppercase text-emerald-400 border border-emerald-700 rounded-full px-3 py-1">
            Success Stories
          </p>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white">
            Real People. Real Roles. Real UK Companies.
          </h1>
          <p className="mt-4 text-slate-300 text-lg max-w-2xl mx-auto">
            These are not testimonials from a landing page photoshoot. These are candidates who did the work and got the offers.
          </p>
        </div>
      </section>

      {/* Case Studies */}
      <section className="py-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          {stories.map((story) => (
            <div key={story.name} className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
              {/* Header */}
              <div className="px-8 py-6 border-b border-slate-100 flex items-center justify-between">
                <div>
                  <p className="text-lg font-bold text-gray-900">{story.name}</p>
                  <p className="text-sm text-emerald-600 font-medium mt-0.5">{story.outcome}</p>
                </div>
                <Quote size={32} className="text-slate-200" />
              </div>

              {/* Body */}
              <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-slate-100">
                <div className="p-6">
                  <p className="text-xs font-semibold uppercase tracking-widest text-slate-400 mb-3">Background</p>
                  <p className="text-sm text-gray-600 leading-relaxed">{story.background}</p>
                </div>
                <div className="p-6">
                  <p className="text-xs font-semibold uppercase tracking-widest text-slate-400 mb-3">Work Completed</p>
                  <p className="text-sm text-gray-600 leading-relaxed">{story.work}</p>
                </div>
                <div className="p-6">
                  <p className="text-xs font-semibold uppercase tracking-widest text-slate-400 mb-3">Interview Prep</p>
                  <p className="text-sm text-gray-600 leading-relaxed">{story.prep}</p>
                </div>
              </div>

              {/* Testimonial */}
              <div className="px-8 py-6 bg-slate-50 border-t border-slate-100">
                <blockquote className="text-sm text-gray-700 italic leading-relaxed">
                  &ldquo;{story.quote}&rdquo;
                </blockquote>
                <p className="text-xs text-slate-400 mt-2">— {story.name}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section style={{ backgroundColor: "#0A192F" }} className="py-16 text-center">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">Your Story Starts Here</h2>
          <p className="text-slate-300 mb-8">Book a free assessment call to see if the programme is right for you.</p>
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
