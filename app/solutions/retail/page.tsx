import type { Metadata } from "next";
import RetailClient from "./RetailClient";

export const metadata: Metadata = {
  title: "Retail AI Agents | Supermarket & E-Commerce Support Automation",
  description:
    "AI agents for supermarket and retail operations. Automate order management, delivery queries, inventory escalation, and customer support — 24/7 at enterprise scale.",
  openGraph: {
    title: "Retail AI Agents — Peak-Demand Scale Without Seasonal Headcount | SupraCloud",
    description:
      "Production-grade autonomous AI agents for UK retail. Order management, delivery queries, inventory escalation. 68% deflection rate. Book a discovery call.",
    url: "https://supracloud.co.uk/solutions/retail",
    siteName: "SupraCloud",
    locale: "en_GB",
  },
  alternates: { canonical: "https://supracloud.co.uk/solutions/retail" },
};

export default function RetailPage() {
  return <RetailClient />;
}
