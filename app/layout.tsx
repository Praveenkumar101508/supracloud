import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import CookieBanner from "./components/CookieBanner";
import { Providers } from "./providers";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://supracloud.co.uk";

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: "SupraCloud | Enterprise AI Agent Development & IT Solutions",
    template: "%s | SupraCloud",
  },
  description:
    "SupraCloud builds production-grade AI agents and delivers enterprise IT solutions for banking and retail. Expert staffing, consultation, and autonomous agent deployment.",
  keywords: [
    "AI agent development UK",
    "enterprise AI solutions",
    "banking AI agents",
    "retail AI automation",
    "IT staffing UK",
    "enterprise IT consultation",
    "RAG pipeline UK",
    "LangGraph agents",
    "autonomous AI agents",
    "IT outsourcing UK",
    "enterprise technology consulting",
  ],
  authors: [{ name: "SupraCloud", url: BASE_URL }],
  creator: "SupraCloud",
  publisher: "SupraCloud",
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { url: "/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180" }],
    shortcut: "/favicon.ico",
  },
  openGraph: {
    type: "website",
    locale: "en_GB",
    url: BASE_URL,
    siteName: "SupraCloud",
    title: "SupraCloud | Enterprise AI Agent Development & IT Solutions",
    description:
      "Production-grade autonomous AI agents for banking and retail. Enterprise IT staffing, consultation, and talent pipelines — engineer-led, not recruiter-led.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "SupraCloud — Enterprise AI Agent Development & IT Solutions",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "SupraCloud | Enterprise AI Agent Development & IT Solutions",
    description:
      "Production-grade autonomous AI agents for banking and retail. Enterprise IT staffing and consultation — engineer-led.",
    images: ["/og-image.jpg"],
    creator: "@supracloud",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "SupraCloud",
  url: "https://supracloud.co.uk",
  logo: "https://supracloud.co.uk/og-image.jpg",
  description: "Enterprise AI Agent Development and IT Solutions company specialising in banking and retail automation.",
  contactPoint: {
    "@type": "ContactPoint",
    email: "rk@supracloud.co.uk",
    contactType: "customer service",
  },
  sameAs: ["https://twitter.com/supracloud"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} h-full antialiased`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
      </head>
      <body className="min-h-full flex flex-col bg-slate-50 text-gray-900">
        <Providers>
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
          <CookieBanner />
        </Providers>
      </body>
    </html>
  );
}
