import type { Metadata } from "next";
import BankingClient from "./BankingClient";

export const metadata: Metadata = {
  title: "Banking AI Agents | SupraCloud",
  description:
    "Precision-engineered AI agents for financial services. Sub-200ms latency, FCA-compliant, GDPR-native. Autonomous L1/L2 support, fraud detection, and KYC/AML automation.",
  openGraph: {
    title: "Banking AI Agents — Secure, Compliant, Sub-Second Latency | SupraCloud",
    description:
      "Production-grade autonomous AI agents for UK banking. L1/L2 support, fraud detection 40% faster, KYC/AML automation. FCA-compliant. Book a security audit.",
    url: "https://supracloud.co.uk/solutions/banking",
    siteName: "SupraCloud",
    locale: "en_GB",
  },
  alternates: { canonical: "https://supracloud.co.uk/solutions/banking" },
};

export default function BankingPage() {
  return <BankingClient />;
}
