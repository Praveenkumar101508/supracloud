export default function TermsPage() {
  return (
    <div className="bg-slate-50 py-16">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Terms of Service</h1>
        <p className="text-sm text-slate-400 mb-10">Last updated: April 2026</p>

        <div className="bg-white rounded-xl border border-slate-100 shadow-sm p-8 space-y-8 text-sm text-gray-600 leading-relaxed">
          <section>
            <h2 className="text-base font-semibold text-gray-900 mb-2">1. Acceptance of Terms</h2>
            <p>
              By accessing our website or engaging with any SupraCloud programme, you agree to these
              Terms of Service. If you do not agree, please do not use our services.
            </p>
          </section>

          <section>
            <h2 className="text-base font-semibold text-gray-900 mb-2">2. Services</h2>
            <p>
              SupraCloud provides career acceleration services including CV rewriting, LinkedIn
              optimisation, portfolio creation, job application support, and interview preparation. The
              specific scope of services is agreed upon prior to programme commencement.
            </p>
          </section>

          <section>
            <h2 className="text-base font-semibold text-gray-900 mb-2">3. Payment & Refunds</h2>
            <p>
              Payment terms are agreed individually before the programme starts. Refund eligibility is
              dependent on the stage of service delivery and will be outlined in your service agreement.
              Please contact us to discuss any concerns before making a payment.
            </p>
          </section>

          <section>
            <h2 className="text-base font-semibold text-gray-900 mb-2">4. Candidate Responsibilities</h2>
            <p>
              Candidates are expected to provide accurate information, engage with the scheduled programme
              (Mon–Thu), complete project work, and attend booked sessions. Outcomes are influenced by
              candidate effort and market conditions which are outside our control.
            </p>
          </section>

          <section>
            <h2 className="text-base font-semibold text-gray-900 mb-2">5. Intellectual Property</h2>
            <p>
              All projects, templates, and materials provided by SupraCloud are for personal career use
              only. You may not resell, redistribute, or use them commercially without written permission.
            </p>
          </section>

          <section>
            <h2 className="text-base font-semibold text-gray-900 mb-2">6. Limitation of Liability</h2>
            <p>
              SupraCloud does not guarantee employment outcomes. We provide structured support, tools,
              and coaching — but hiring decisions rest with employers. Our liability is limited to the value
              of services paid for.
            </p>
          </section>

          <section>
            <h2 className="text-base font-semibold text-gray-900 mb-2">7. Governing Law</h2>
            <p>
              These terms are governed by the laws of England and Wales. Any disputes shall be subject to
              the exclusive jurisdiction of the courts of England and Wales.
            </p>
          </section>

          <section>
            <h2 className="text-base font-semibold text-gray-900 mb-2">8. Contact</h2>
            <p>
              For any queries regarding these terms, email us at{" "}
              <a href="mailto:radhakrishna.uk.ai@gmail.com" className="text-emerald-600 hover:underline">
                radhakrishna.uk.ai@gmail.com
              </a>.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
