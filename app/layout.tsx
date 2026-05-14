import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import MascotVoiceHub from "./components/MascotVoiceHub";
import { Providers } from "./providers";
import { AIStateProvider } from "./context/AIState";
import { BootOverlay } from "./components/BootOverlay";
import ClientShell from "./components/ClientShell";
import { ScrollProgressBar } from "./components/ui/ScrollProgressBar";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://supracloud.co.uk";

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default:  "SupraCloud | Enterprise AI Agents for Banking & Retail",
    template: "%s | SupraCloud",
  },
  description:
    "Engineer-led AI agent development for UK banking and retail. Production-grade L1 & L2 autonomous agents with compliance-native architecture and measurable SLAs.",
  keywords: [
    "UK AI agency",
    "enterprise AI agents London",
    "autonomous AI agents banking UK",
    "banking AI agents UK",
    "retail AI automation",
    "enterprise AI agent development",
    "LangGraph agency UK",
    "LangGraph RAG production",
    "IT staffing UK",
    "AI consultation UK",
    "L1 deflection banking",
    "enterprise cloud solutions UK",
    "AI agents London",
    "SupraCloud",
  ],
  authors:   [{ name: "SupraCloud", url: BASE_URL }],
  creator:   "SupraCloud",
  publisher: "SupraCloud",
  icons: {
    icon:    [{ url: "/favicon.ico", sizes: "any" }],
    shortcut: "/favicon.ico",
  },
  openGraph: {
    type:      "website",
    locale:    "en_GB",
    url:       BASE_URL,
    siteName:  "SupraCloud",
    title:     "SupraCloud | Enterprise AI Agents for Banking & Retail",
    description:
      "Production-grade autonomous AI agents for UK banking and retail — compliance-native, engineer-led, measurable SLAs from week one.",
    images: [
      {
        url: `/api/og?title=${encodeURIComponent("Enterprise AI Agents for Banking & Retail")}&subtitle=${encodeURIComponent("Production-grade. FCA-compliant. Deployed in 6 weeks.")}`,
        width: 1200, height: 630,
        alt: "SupraCloud — Enterprise AI Agent Development",
      },
    ],
  },
  twitter: {
    card:        "summary_large_image",
    title:       "SupraCloud | Enterprise AI Agents for Banking & Retail",
    description: "Production-grade autonomous AI agents for UK banking and retail. Engineer-led, compliance-native, measurable SLAs.",
    images:      [`/api/og?title=${encodeURIComponent("Enterprise AI Agents for Banking & Retail")}&subtitle=${encodeURIComponent("FCA-compliant. Zero data exfiltration. Live in 6 weeks.")}`],
    creator:     "@supracloud",
  },
  robots: {
    index: true, follow: true,
    googleBot: { index: true, follow: true, "max-video-preview": -1,
      "max-image-preview": "large", "max-snippet": -1 },
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id":   `${BASE_URL}/#organization`,
      name:    "SupraCloud",
      url:     BASE_URL,
      logo:    { "@type": "ImageObject", url: `${BASE_URL}/api/og?tag=Logo` },
      sameAs:  ["https://www.linkedin.com/company/supracloud"],
      contactPoint: [
        { "@type": "ContactPoint", email: "rk@supracloud.co.uk", contactType: "customer service", areaServed: "GB" },
      ],
      address: { "@type": "PostalAddress", addressCountry: "GB" },
      description: "Production-grade AI agents for banking and retail enterprises. Engineer-led, FCA-aware, UK-based.",
    },
    {
      "@type":    "WebSite",
      "@id":      `${BASE_URL}/#website`,
      url:        BASE_URL,
      name:       "SupraCloud",
      publisher:  { "@id": `${BASE_URL}/#organization` },
    },
    {
      "@type":       "Service",
      "@id":         `${BASE_URL}/solutions/banking#service`,
      name:          "Banking AI Agents",
      provider:      { "@id": `${BASE_URL}/#organization` },
      description:   "Autonomous AI agents for customer queries, fraud triage, and back-office automation in regulated financial services.",
      areaServed:    "GB",
      serviceType:   "Enterprise AI Development",
    },
    {
      "@type":       "Service",
      "@id":         `${BASE_URL}/solutions/retail#service`,
      name:          "Retail AI Agents",
      provider:      { "@id": `${BASE_URL}/#organization` },
      description:   "AI agents for inventory automation, customer personalisation, and support deflection at enterprise retail scale.",
      areaServed:    "GB",
      serviceType:   "Enterprise AI Development",
    },
    {
      "@type": "FAQPage",
      "@id":   `${BASE_URL}/#faq`,
      mainEntity: [
        { "@type": "Question", name: "How does SupraCloud ensure my customer data never leaves our environment?", acceptedAnswer: { "@type": "Answer", text: "Every SupraCloud agent runs entirely inside your own AWS or Azure tenant. We deploy the agent runtime using your cloud credentials, your KMS keys, and your network policies. We have no access to your data post-deployment." } },
        { "@type": "Question", name: "Are your agents compliant with FCA regulations?", acceptedAnswer: { "@type": "Answer", text: "Our agents are designed with FCA alignment from the architecture stage: every decision is logged with timestamp, rationale, confidence score, and the data sources used. We produce explainability outputs suitable for SMCR accountability requirements and Consumer Duty obligations." } },
        { "@type": "Question", name: "How long does a typical deployment take?", acceptedAnswer: { "@type": "Answer", text: "A contained single-agent deployment typically runs 4–6 weeks from discovery call to production go-live. Multi-agent platforms typically run 3–6 months." } },
        { "@type": "Question", name: "Can you integrate with our existing core banking systems or ERP?", acceptedAnswer: { "@type": "Answer", text: "Yes — API-first integration is central to our architecture. We do not require a rip-and-replace of any existing systems. Common integrations include core banking APIs, Salesforce, ServiceNow, and proprietary internal tools via REST or GraphQL." } },
        { "@type": "Question", name: "Do the agents improve over time without manual intervention?", acceptedAnswer: { "@type": "Answer", text: "Yes. Every agent includes structured feedback loops: interaction outcomes, CSAT scores, escalation patterns, and resolution rates are fed back into a fine-tuning pipeline. Deflection rates typically improve 8–15% per quarter without manual retraining." } },
        { "@type": "Question", name: "What cloud providers do you support?", acceptedAnswer: { "@type": "Answer", text: "Primarily AWS and Microsoft Azure. We support Azure OpenAI Service, AWS Bedrock, and on-premises model endpoints for highest-sensitivity workloads." } },
      ],
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${inter.variable} h-full antialiased`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body
        className="min-h-full flex flex-col"
        style={{ background: "#050505", color: "#E2E8F0" }}
      >
        <AIStateProvider>
          <BootOverlay />
          <ScrollProgressBar />
          <Providers>
            <ClientShell>{children}</ClientShell>
            <MascotVoiceHub />
          </Providers>
        </AIStateProvider>
      </body>
    </html>
  );
}
