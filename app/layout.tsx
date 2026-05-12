import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import MascotVoiceHub from "./components/MascotVoiceHub";
import { Providers } from "./providers";
import { AIStateProvider } from "./context/AIState";
import { BootOverlay } from "./components/BootOverlay";
import ClientShell from "./components/ClientShell";

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
    apple:   [{ url: "/apple-touch-icon.png", sizes: "180x180" }],
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
    images: [{ url: "/og-image.jpg", width: 1200, height: 630,
      alt: "SupraCloud — Enterprise AI Agent Development" }],
  },
  twitter: {
    card:        "summary_large_image",
    title:       "SupraCloud | Enterprise AI Agents for Banking & Retail",
    description: "Production-grade autonomous AI agents for UK banking and retail. Engineer-led, compliance-native, measurable SLAs.",
    images:      ["/og-image.jpg"],
    creator:     "@supracloud",
  },
  robots: {
    index: true, follow: true,
    googleBot: { index: true, follow: true, "max-video-preview": -1,
      "max-image-preview": "large", "max-snippet": -1 },
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${inter.variable} h-full antialiased`}>
      <body
        className="min-h-full flex flex-col"
        style={{ background: "#050505", color: "#E2E8F0" }}
      >
        <AIStateProvider>
          <BootOverlay />
          <Providers>
            <ClientShell>{children}</ClientShell>
            <MascotVoiceHub />
          </Providers>
        </AIStateProvider>
      </body>
    </html>
  );
}
