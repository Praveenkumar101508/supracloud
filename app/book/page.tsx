import MarketingLayout from "@/app/components/marketing/MarketingLayout";
import BookingSystem from "@/app/components/BookingSystem";

export const metadata = {
  title: "Book a Demo",
  description: "Schedule a strategy session with our solutions engineers.",
};

export default function Page() {
  return (
    <MarketingLayout>
      <section className="hero compact">
        <div className="container hero-center">
          <div className="eyebrow-pill">Industry Strategy Session</div>
          <h1 className="display">Worth a <span className="grad">quick chat?</span></h1>
          <p className="lede-dark">Tell us which workflow you want to automate. We&apos;ll come back within 24h with a session tailored to your sector — Banking or Retail.</p>
        </div>
      </section>
      <section className="dark-section">
        <div className="container narrow">
          <BookingSystem />
        </div>
      </section>
    </MarketingLayout>
  );
}
