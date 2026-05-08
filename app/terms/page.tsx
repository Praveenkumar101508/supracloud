import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Terms of Service | SupraCloud",
  description:
    "SupraCloud Terms of Service — governing law England and Wales. Enterprise AI agent development, IT staffing, consultation, and talent services.",
  openGraph: {
    title: "Terms of Service | SupraCloud",
    description: "Terms governing SupraCloud's enterprise AI, IT staffing, and consultation services. Governed by the laws of England and Wales.",
    url: "https://supracloud.co.uk/terms",
    siteName: "SupraCloud",
    locale: "en_GB",
  },
  alternates: { canonical: "https://supracloud.co.uk/terms" },
};

export default function TermsPage() {
  return (
    <div className="bg-slate-50 py-16">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-10">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Terms of Service</h1>
          <p className="text-sm text-slate-400">Last updated: May 2026 &nbsp;·&nbsp; Effective immediately</p>
        </div>

        <div className="bg-white rounded-xl border border-slate-100 shadow-sm p-8 space-y-10 text-sm text-gray-600 leading-relaxed">

          <section>
            <h2 className="text-base font-semibold text-gray-900 mb-3">1. Acceptance of Terms</h2>
            <p>
              By accessing our website at supracloud.co.uk or engaging with any SupraCloud service — including AI agent development, IT staffing, enterprise consultation, or talent programmes — you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our services or website.
            </p>
            <p className="mt-3">
              These terms constitute a binding agreement between you and <strong className="text-gray-800">SupraCloud Ltd</strong>, a company registered in England and Wales.
            </p>
          </section>

          <section>
            <h2 className="text-base font-semibold text-gray-900 mb-3">2. Services</h2>
            <p>SupraCloud Ltd provides the following categories of services:</p>
            <ul className="mt-3 space-y-2 list-disc list-inside marker:text-emerald-500">
              <li><strong className="text-gray-800">AI Agent Development:</strong> Design, development, and deployment of production AI agents for banking, retail, and enterprise environments.</li>
              <li><strong className="text-gray-800">IT Staffing &amp; Outsourcing:</strong> Placement of vetted technical professionals on contract, permanent, or project-based engagements.</li>
              <li><strong className="text-gray-800">Enterprise IT Consultation:</strong> Technology advisory, architecture design, and digital transformation engagements.</li>
              <li><strong className="text-gray-800">Talent Programmes:</strong> Industry training, placement year partnerships, and graduate internships.</li>
            </ul>
            <p className="mt-3">
              The specific scope, deliverables, timelines, and commercial terms of any engagement are defined in a separate Statement of Work (SoW) or Service Agreement agreed between SupraCloud and the client prior to commencement of work.
            </p>
          </section>

          <section>
            <h2 className="text-base font-semibold text-gray-900 mb-3">3. Enquiries and Discovery Calls</h2>
            <p>
              Submitting a contact form or booking a discovery call does not constitute a contract for services. Services commence only upon execution of a signed Statement of Work or written confirmation of commercial terms. Discovery calls are provided at no charge and without obligation.
            </p>
          </section>

          <section>
            <h2 className="text-base font-semibold text-gray-900 mb-3">4. Payment Terms</h2>
            <p>
              Payment terms are defined in each individual Statement of Work. Unless otherwise agreed in writing:
            </p>
            <ul className="mt-3 space-y-2 list-disc list-inside marker:text-emerald-500">
              <li>Invoices are due within 30 days of the invoice date.</li>
              <li>Late payments accrue interest at 8% per annum above the Bank of England base rate, pursuant to the Late Payment of Commercial Debts (Interest) Act 1998.</li>
              <li>SupraCloud reserves the right to suspend services if invoices are 14 or more days overdue.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-base font-semibold text-gray-900 mb-3">5. Intellectual Property</h2>
            <p>
              Unless expressly stated otherwise in a signed Statement of Work:
            </p>
            <ul className="mt-3 space-y-2 list-disc list-inside marker:text-emerald-500">
              <li>All intellectual property in deliverables created specifically for a client engagement (custom agent code, configurations, documentation) transfers to the client upon full payment.</li>
              <li>SupraCloud retains all rights to its pre-existing methodologies, frameworks, tooling, and general knowledge.</li>
              <li>Website content, design assets, and training programme materials remain the exclusive property of SupraCloud Ltd and may not be reproduced, distributed, or used commercially without written permission.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-base font-semibold text-gray-900 mb-3">6. Confidentiality</h2>
            <p>
              Both parties agree to keep confidential all non-public information exchanged during an engagement, including technical specifications, commercial terms, business strategy, and client data. This obligation survives termination of the engagement for a period of 3 years.
            </p>
          </section>

          <section>
            <h2 className="text-base font-semibold text-gray-900 mb-3">7. Limitation of Liability</h2>
            <p>
              To the maximum extent permitted by applicable law:
            </p>
            <ul className="mt-3 space-y-2 list-disc list-inside marker:text-emerald-500">
              <li>SupraCloud&rsquo;s total liability to you in connection with any engagement shall not exceed the total fees paid by you in the 12 months preceding the claim.</li>
              <li>SupraCloud shall not be liable for indirect, consequential, special, or incidental damages, including loss of profits, loss of data, or business interruption, howsoever caused.</li>
              <li>Nothing in these terms limits liability for death or personal injury caused by negligence, fraud, or any other liability that cannot be excluded by law.</li>
            </ul>
            <p className="mt-3">
              For talent programme and staffing services, SupraCloud does not guarantee specific employment or placement outcomes, which depend on market conditions, employer decisions, and individual performance outside our control.
            </p>
          </section>

          <section>
            <h2 className="text-base font-semibold text-gray-900 mb-3">8. Warranties and Representations</h2>
            <p>
              SupraCloud warrants that services will be performed with reasonable care and skill consistent with industry standards. The website and its content are provided &ldquo;as is&rdquo; without warranty of any kind. We do not warrant that the website will be uninterrupted, error-free, or free from viruses.
            </p>
          </section>

          <section>
            <h2 className="text-base font-semibold text-gray-900 mb-3">9. Termination</h2>
            <p>
              Either party may terminate an engagement with 30 days&rsquo; written notice, unless a shorter or longer notice period is specified in the Statement of Work. Termination does not affect accrued payment obligations. SupraCloud may terminate immediately where a client is in material breach of these terms or the applicable Statement of Work.
            </p>
          </section>

          <section>
            <h2 className="text-base font-semibold text-gray-900 mb-3">10. Data Protection</h2>
            <p>
              SupraCloud processes personal data in accordance with the UK General Data Protection Regulation (UK GDPR) and the Data Protection Act 2018. Our Privacy Policy (available at{" "}
              <Link href="/privacy" className="text-emerald-600 hover:underline">supracloud.co.uk/privacy</Link>
              {" "}
              ) forms part of these terms. Where SupraCloud processes personal data on behalf of a client in the course of service delivery, a Data Processing Agreement will be entered into as required by UK GDPR Article 28.
            </p>
          </section>

          <section>
            <h2 className="text-base font-semibold text-gray-900 mb-3">11. Governing Law and Jurisdiction</h2>
            <p>
              These Terms of Service and any dispute or claim arising out of or in connection with them (including non-contractual disputes or claims) shall be governed by and construed in accordance with the laws of <strong className="text-gray-800">England and Wales</strong>.
            </p>
            <p className="mt-3">
              Both parties irrevocably submit to the exclusive jurisdiction of the courts of England and Wales to settle any dispute or claim arising out of or in connection with these terms.
            </p>
          </section>

          <section>
            <h2 className="text-base font-semibold text-gray-900 mb-3">12. Changes to These Terms</h2>
            <p>
              We may update these terms from time to time. Material changes will be published on this page with an updated &ldquo;Last updated&rdquo; date. Continued use of our services after changes constitutes acceptance of the revised terms. Active clients will be notified of material changes by email.
            </p>
          </section>

          <section>
            <h2 className="text-base font-semibold text-gray-900 mb-3">13. Contact</h2>
            <p>
              For queries regarding these Terms of Service:
            </p>
            <p className="mt-3">
              <strong className="text-gray-800">SupraCloud Ltd</strong><br />
              Registered in England &amp; Wales<br />
              <a href="mailto:rk@supracloud.co.uk" className="text-emerald-600 hover:underline">rk@supracloud.co.uk</a>
            </p>
          </section>

        </div>

        <div className="mt-8 text-center">
          <Link href="/privacy" className="text-sm text-emerald-600 hover:underline">
            View Privacy Policy →
          </Link>
        </div>
      </div>
    </div>
  );
}
