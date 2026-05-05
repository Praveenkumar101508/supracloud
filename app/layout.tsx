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
    default: "SupraCloud | UK Data, Cloud & AI Career Accelerator",
    template: "%s | SupraCloud",
  },
  description:
    "Become industry-ready for UK Data, Cloud & AI roles. Engineer-led career accelerator with real production projects, structured training, and interview mastery.",
  keywords: [
    "UK Data Engineer jobs",
    "ML Engineer UK",
    "Cloud Engineer career accelerator",
    "Azure Data Engineering training",
    "AWS ML deployment",
    "Python SQL interview prep UK",
    "career accelerator UK",
    "data engineering portfolio",
    "AI agent development UK",
    "IT staffing UK",
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
    title: "SupraCloud | UK Data, Cloud & AI Career Accelerator",
    description:
      "From qualified-but-overlooked to confidently hired. Engineer-led accelerator with real production projects, done-for-you applications, and interview mastery.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "SupraCloud — UK Data, Cloud & AI Career Accelerator",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "SupraCloud | UK Data, Cloud & AI Career Accelerator",
    description:
      "From qualified-but-overlooked to confidently hired. Real projects. Done-for-you applications. Interview mastery.",
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
