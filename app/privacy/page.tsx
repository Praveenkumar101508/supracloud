export default function PrivacyPage() {
  return (
    <div className="bg-slate-50 py-16">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Privacy Policy</h1>
        <p className="text-sm text-slate-400 mb-10">Last updated: April 2026</p>

        <div className="bg-white rounded-xl border border-slate-100 shadow-sm p-8 space-y-8 text-sm text-gray-600 leading-relaxed">
          <section>
            <h2 className="text-base font-semibold text-gray-900 mb-2">1. Who We Are</h2>
            <p>
              SupraCloud (&ldquo;we&rdquo;, &ldquo;us&rdquo;, &ldquo;our&rdquo;) operates the website and career accelerator programme.
              Our contact email is radhakrishna.uk.ai@gmail.com.
            </p>
          </section>

          <section>
            <h2 className="text-base font-semibold text-gray-900 mb-2">2. Data We Collect</h2>
            <p>
              We collect information you provide directly to us via our application form, booking form, or
              email — including your name, email address, career background, and programme goals. We do not
              collect payment information directly; any payment processing is handled by third-party providers.
            </p>
          </section>

          <section>
            <h2 className="text-base font-semibold text-gray-900 mb-2">3. How We Use Your Data</h2>
            <p>
              Your data is used solely to assess your application, communicate with you about the programme,
              and deliver the services you have signed up for. We do not sell or share your data with third
              parties for marketing purposes.
            </p>
          </section>

          <section>
            <h2 className="text-base font-semibold text-gray-900 mb-2">4. Data Retention</h2>
            <p>
              We retain your personal data for as long as necessary to deliver the programme or as required
              by law. You may request deletion of your data at any time by emailing us.
            </p>
          </section>

          <section>
            <h2 className="text-base font-semibold text-gray-900 mb-2">5. Your Rights (UK GDPR)</h2>
            <p>
              Under UK GDPR you have the right to access, correct, or delete your personal data, restrict or
              object to processing, and data portability. To exercise any of these rights, contact us at
              radhakrishna.uk.ai@gmail.com.
            </p>
          </section>

          <section>
            <h2 className="text-base font-semibold text-gray-900 mb-2">6. Cookies</h2>
            <p>
              This site uses only essential cookies required for navigation. We do not use tracking or
              advertising cookies.
            </p>
          </section>

          <section>
            <h2 className="text-base font-semibold text-gray-900 mb-2">7. Contact</h2>
            <p>
              For any privacy-related queries, please contact us at{" "}
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
