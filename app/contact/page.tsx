import type { Metadata } from "next";
import ContactForm from "@/app/components/ContactForm";

export const metadata: Metadata = {
  title: "Contact SupraCloud | Start a Conversation",
  description: "Get in touch with SupraCloud. We respond within 1 business day. Book a discovery call or submit a brief for AI agents, IT staffing, or consultation.",
  openGraph: {
    title: "Contact SupraCloud | Start a Conversation",
    description: "Get in touch with SupraCloud — AI agents, IT staffing, consultation. We respond within 1 business day.",
    url: "https://supracloud.co.uk/contact",
    siteName: "SupraCloud",
    locale: "en_GB",
  },
  alternates: { canonical: "https://supracloud.co.uk/contact" },
};

export default function ContactPage() {
  return <ContactForm />;
}
