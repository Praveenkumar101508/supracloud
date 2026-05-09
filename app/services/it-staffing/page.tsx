import type { Metadata } from "next";
import MarketingLayout from "@/app/components/marketing/MarketingLayout";

export const metadata: Metadata = {
  title: "IT Staffing & Outsourcing | SupraCloud",
  description: "Pre-vetted, engineer-screened resources for AI, data, and cloud roles. 48-hour integration, 95% placement retention, 200+ vetted engineers.",
  openGraph: {
    title: "IT Staffing & Outsourcing | SupraCloud",
    description: "Engineer-screened IT staffing for AI, data, and cloud. No recruiters, no CV farming — vetted talent that ships from week one.",
    url: "https://supracloud.co.uk/services/it-staffing",
    siteName: "SupraCloud",
    locale: "en_GB",
  },
  alternates: { canonical: "https://supracloud.co.uk/services/it-staffing" },
};

const BODY = "<section class=\"hero\">\n    <div class=\"container\">\n      <div class=\"hero-2col\">\n        <div>\n          <div class=\"eyebrow-pill\"><i data-lucide=\"users\" style=\"width:14px;height:14px\"></i> Elite Talent Pipeline</div>\n          <h1 class=\"display left\">Enterprise <span class=\"grad\">Resource Outsourcing</span> &amp; Staffing</h1>\n          <p class=\"lede-dark left\">Bridge your technical gap with pre-vetted engineers. We provide specialized resources in AI, Data, and Cloud to accelerate your roadmap without the hiring friction.</p>\n          <div class=\"check-row\">\n            <span><i data-lucide=\"check-circle-2\" style=\"width:16px;height:16px;color:#3B82F6\"></i> 48-Hour Integration</span>\n            <span><i data-lucide=\"check-circle-2\" style=\"width:16px;height:16px;color:#3B82F6\"></i> Pre-Vetted Expertise</span>\n          </div>\n        </div>\n        <div class=\"stat-cluster\">\n          <div class=\"stat-card\"><div class=\"stat-v\">95%</div><div class=\"stat-l\">Placement Retention</div></div>\n          <div class=\"stat-card offset\"><div class=\"stat-v\">200+</div><div class=\"stat-l\">Vetted Engineers</div></div>\n        </div>\n      </div>\n    </div>\n  </section>\n\n  <section class=\"dark-section\">\n    <div class=\"container\">\n      <h2 class=\"h2-dark center\">Specialized Resource Categories</h2>\n      <div class=\"grid-3 mt-12\">\n        <div class=\"vert-card sm\"><div class=\"vc-ic blue sm\"><i data-lucide=\"zap\" style=\"width:18px;height:18px\"></i></div><h4>AI &amp; ML Engineers</h4><p>Experts in LLM orchestration, RAG architectures, and autonomous agent deployment.</p></div>\n        <div class=\"vert-card sm\"><div class=\"vc-ic blue sm\"><i data-lucide=\"briefcase\" style=\"width:18px;height:18px\"></i></div><h4>Data Architects</h4><p>Senior resources specializing in data engineering pipelines and scalable analytics.</p></div>\n        <div class=\"vert-card sm\"><div class=\"vc-ic blue sm\"><i data-lucide=\"user-plus\" style=\"width:18px;height:18px\"></i></div><h4>Cloud &amp; DevOps</h4><p>Specialists in AWS / Azure infrastructure and automated CI/CD pipelines.</p></div>\n      </div>\n    </div>\n  </section>\n\n  <section class=\"dark-section bordered\">\n    <div class=\"container\">\n      <h2 class=\"h2-dark center\">Why CTOs Partner With Us</h2>\n      <div class=\"grid-2 mt-12 align-center\">\n        <div class=\"num-list\">\n          <div class=\"num-row\"><div class=\"num\">1</div><div><h4>Quality-First Benchmarking</h4><p>Every resource passes through our rigorous testing environment, including the SupraCloud benchmarks.</p></div></div>\n          <div class=\"num-row\"><div class=\"num\">2</div><div><h4>Scalable On-Demand</h4><p>Scale your team size up or down within a 2-week notice period, maintaining project agility.</p></div></div>\n          <div class=\"num-row\"><div class=\"num\">3</div><div><h4>Engineering-First Culture</h4><p>Our resources ship code from week one — no ramp-up months or context tax.</p></div></div>\n        </div>\n        <blockquote class=\"quote-card\">\n          \"SupraCloud resources integrated into our sprint cycles within days, delivering high-quality PRs from week one.\"\n          <cite>— Head of Engineering, Tier 1 Financial Group</cite>\n        </blockquote>\n      </div>\n    </div>\n  </section>\n\n  <section class=\"dark-section cta-band\">\n    <div class=\"container narrow center\">\n      <h2 class=\"h2-dark italic\">Worth a quick chat?</h2>\n      <p class=\"lede-dark\">Tell us your immediate staffing needs. No generic recruiter emails — just engineering-focused resource solutions.</p>\n      <a class=\"btn-primary-lg\" href=\"/book\">Book a Staffing Conversation <i data-lucide=\"arrow-right\" style=\"width:14px;height:14px\"></i></a>\n    </div>\n  </section>";

export default function Page() {
  return (
    <MarketingLayout>
      <div dangerouslySetInnerHTML={{ __html: BODY }} />
    </MarketingLayout>
  );
}
