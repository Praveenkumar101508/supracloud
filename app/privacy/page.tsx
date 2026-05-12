import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Privacy Policy | SupraCloud",
  description:
    "SupraCloud Privacy Policy — how we collect, use, and protect your personal data in compliance with UK GDPR and the Data Protection Act 2018.",
  openGraph: {
    title: "Privacy Policy | SupraCloud",
    description: "How SupraCloud collects, uses, and protects your personal data under UK GDPR.",
    url: "https://supracloud.co.uk/privacy",
    siteName: "SupraCloud",
    locale: "en_GB",
  },
  alternates: { canonical: "https://supracloud.co.uk/privacy" },
};

export default function PrivacyPage() {
  return (
    <div className="bg-slate-50 py-16">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-10">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Privacy Policy</h1>
          <p className="text-sm text-slate-400">Last updated: May 2026 &nbsp;·&nbsp; Effective immediately</p>
        </div>

        <div className="bg-white rounded-xl border border-slate-100 shadow-sm p-8 space-y-10 text-sm text-gray-600 leading-relaxed">

          <section>
            <h2 className="text-base font-semibold text-gray-900 mb-3">1. Data Controller</h2>
            <p>
              SupraCloud Ltd (&ldquo;SupraCloud&rdquo;, &ldquo;we&rdquo;, &ldquo;us&rdquo;, &ldquo;our&rdquo;) is the data controller responsible for your personal data. We are registered in England and Wales.
            </p>
            <p className="mt-3">
              <strong className="text-gray-800">Contact:</strong> rk@supracloud.co.uk<br />
              <strong className="text-gray-800">Website:</strong> https://supracloud.co.uk<br />
              <strong className="text-gray-800">ICO Registration:</strong> SupraCloud Ltd is registered with the Information Commissioner&rsquo;s Office (ICO) as required under UK data protection law.
            </p>
          </section>

          <section>
            <h2 className="text-base font-semibold text-gray-900 mb-3">2. Data We Collect</h2>
            <p>We collect personal data in the following contexts:</p>
            <ul className="mt-3 space-y-2 list-disc list-inside marker:text-emerald-500">
              <li><strong className="text-gray-800">Contact form:</strong> Name, company, email address, phone number, and message content submitted via our contact page.</li>
              <li><strong className="text-gray-800">Booking form:</strong> Name, company, email address, phone number, preferred availability, and brief description of requirements submitted when requesting a discovery call.</li>
              <li><strong className="text-gray-800">Direct communications:</strong> Name and email address when you contact us by email or via WhatsApp.</li>
              <li><strong className="text-gray-800">Analytics:</strong> We may collect anonymised usage data (pages visited, session duration, browser type) via privacy-respecting analytics tools. This data is not linked to your identity.</li>
            </ul>
            <p className="mt-3">We do not collect payment card data directly. Any payment processing is handled by third-party providers under their own privacy policies.</p>
          </section>

          <section>
            <h2 className="text-base font-semibold text-gray-900 mb-3">3. Lawful Basis for Processing</h2>
            <p>We process your personal data on the following lawful bases under UK GDPR Article 6:</p>
            <ul className="mt-3 space-y-2 list-disc list-inside marker:text-emerald-500">
              <li><strong className="text-gray-800">Legitimate interests (Article 6(1)(f)):</strong> Responding to enquiries, managing bookings, and conducting business operations where our interests are not overridden by your rights.</li>
              <li><strong className="text-gray-800">Contract performance (Article 6(1)(b)):</strong> Processing data necessary to enter into or perform a contract with you for our services.</li>
              <li><strong className="text-gray-800">Compliance with legal obligations (Article 6(1)(c)):</strong> Where we are required to process data to comply with applicable law.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-base font-semibold text-gray-900 mb-3">4. How We Use Your Data</h2>
            <p>Your personal data is used to:</p>
            <ul className="mt-3 space-y-2 list-disc list-inside marker:text-emerald-500">
              <li>Respond to your enquiry or booking request</li>
              <li>Schedule and conduct discovery calls or consultations</li>
              <li>Provide the services you have engaged us for</li>
              <li>Send relevant follow-up communications directly related to your enquiry</li>
              <li>Comply with legal and regulatory obligations</li>
            </ul>
            <p className="mt-3">We do <strong>not</strong> sell, rent, or share your personal data with third parties for marketing purposes.</p>
          </section>

          <section>
            <h2 className="text-base font-semibold text-gray-900 mb-3">5. Data Sharing</h2>
            <p>We may share your data with:</p>
            <ul className="mt-3 space-y-2 list-disc list-inside marker:text-emerald-500">
              <li><strong className="text-gray-800">Email service providers</strong> (such as Resend) to send transactional emails. These providers act as data processors under our instructions.</li>
              <li><strong className="text-gray-800">Cloud service providers</strong> (such as Vercel) who host this website and may process data in the course of service delivery.</li>
              <li><strong className="text-gray-800">Professional advisers</strong> where required for legal or compliance purposes.</li>
            </ul>
            <p className="mt-3">All third-party processors are contractually bound to handle your data in compliance with UK GDPR.</p>
          </section>

          <section>
            <h2 className="text-base font-semibold text-gray-900 mb-3">6. Retention Periods</h2>
            <p>We retain personal data for the following periods:</p>
            <ul className="mt-3 space-y-2 list-disc list-inside marker:text-emerald-500">
              <li><strong className="text-gray-800">Enquiry and contact data:</strong> 2 years from the date of last contact, unless a commercial relationship is established.</li>
              <li><strong className="text-gray-800">Client data:</strong> 6 years from the end of the engagement, in line with UK statutory limitation periods.</li>
              <li><strong className="text-gray-800">Analytics data:</strong> Anonymised; no personal data is retained beyond the session.</li>
            </ul>
            <p className="mt-3">You may request deletion of your data at any time (see Section 7 below).</p>
          </section>

          <section>
            <h2 className="text-base font-semibold text-gray-900 mb-3">7. Your Rights Under UK GDPR</h2>
            <p>Under the UK General Data Protection Regulation and the Data Protection Act 2018, you have the following rights:</p>
            <ul className="mt-3 space-y-2 list-disc list-inside marker:text-emerald-500">
              <li><strong className="text-gray-800">Right of access:</strong> Request a copy of the personal data we hold about you.</li>
              <li><strong className="text-gray-800">Right to rectification:</strong> Request correction of inaccurate or incomplete data.</li>
              <li><strong className="text-gray-800">Right to erasure:</strong> Request deletion of your personal data where we have no legitimate reason to continue processing it.</li>
              <li><strong className="text-gray-800">Right to restrict processing:</strong> Request that we limit how we use your data in certain circumstances.</li>
              <li><strong className="text-gray-800">Right to data portability:</strong> Receive your data in a structured, machine-readable format.</li>
              <li><strong className="text-gray-800">Right to object:</strong> Object to processing based on legitimate interests, including direct marketing.</li>
              <li><strong className="text-gray-800">Rights related to automated decision-making:</strong> We do not make automated decisions that produce legal or significant effects about you.</li>
            </ul>
            <p className="mt-3">
              To exercise any of these rights, email{" "}
              <a href="mailto:rk@supracloud.co.uk" className="text-emerald-600 hover:underline">rk@supracloud.co.uk</a>{" "}
              with &ldquo;Data Rights Request&rdquo; in the subject line. We will respond within 30 days as required by law.
            </p>
          </section>

          <section>
            <h2 className="text-base font-semibold text-gray-900 mb-3">8. Cookies and Tracking</h2>
            <p>
              This website uses only essential cookies required for core functionality (such as session management and security). We do not use advertising cookies, third-party tracking pixels, or cross-site tracking technologies without your explicit consent.
            </p>
            <p className="mt-3">
              Our cookie banner allows you to accept or decline non-essential cookies. Essential cookies cannot be disabled as they are required for the website to function.
            </p>
          </section>

          <section>
            <h2 className="text-base font-semibold text-gray-900 mb-3">9. International Transfers</h2>
            <p>
              Where your data is processed by third-party service providers outside the UK or EEA, we ensure appropriate safeguards are in place in accordance with UK GDPR transfer requirements (such as UK adequacy decisions or Standard Contractual Clauses).
            </p>
          </section>

          <section>
            <h2 className="text-base font-semibold text-gray-900 mb-3">10. Data Security</h2>
            <p>
              We implement appropriate technical and organisational measures to protect your personal data against unauthorised access, loss, destruction, or disclosure. These include encryption in transit (HTTPS), access controls, and secure third-party processors.
            </p>
          </section>

          <section>
            <h2 className="text-base font-semibold text-gray-900 mb-3">11. Changes to This Policy</h2>
            <p>
              We may update this Privacy Policy from time to time. The &ldquo;Last updated&rdquo; date at the top of this page will reflect any changes. Material changes will be communicated to active clients by email.
            </p>
          </section>

          <section>
            <h2 className="text-base font-semibold text-gray-900 mb-3">12. Complaints</h2>
            <p>
              If you are unhappy with how we handle your data, you have the right to lodge a complaint with the Information Commissioner&rsquo;s Office (ICO), the UK&rsquo;s supervisory authority for data protection:
            </p>
            <p className="mt-3">
              <strong className="text-gray-800">ICO website:</strong> <span className="text-emerald-600">ico.org.uk</span><br />
              <strong className="text-gray-800">ICO helpline:</strong> 0303 123 1113
            </p>
            <p className="mt-3">We would appreciate the opportunity to address your concerns before you contact the ICO — please reach out to us at{" "}
              <a href="mailto:rk@supracloud.co.uk" className="text-emerald-600 hover:underline">rk@supracloud.co.uk</a> first.
            </p>
          </section>

          <section>
            <h2 className="text-base font-semibold text-gray-900 mb-3">13. Contact</h2>
            <p>
              For any privacy-related queries, to exercise your rights, or to raise a concern:
            </p>
            <p className="mt-3">
              <strong className="text-gray-800">SupraCloud Ltd</strong><br />
              Registered in England &amp; Wales<br />
              <a href="mailto:rk@supracloud.co.uk" className="text-emerald-600 hover:underline">rk@supracloud.co.uk</a>
            </p>
          </section>
        </div>

        <div className="mt-8 text-center">
          <Link href="/terms" className="text-sm text-emerald-600 hover:underline">
            View Terms of Service →
          </Link>
        </div>
      </div>
    </div>
  );
}
