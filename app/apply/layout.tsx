import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Apply | SupraCloud",
  description: "Apply for SupraCloud's talent programme — structured training and placement support for engineers moving into Data, Cloud, and AI roles in the UK.",
  openGraph: {
    title: "Apply | SupraCloud",
    description: "Start your application for SupraCloud's engineer-led talent programme. Data, Cloud, and AI tracks available.",
    url: "https://supracloud.co.uk/apply",
    siteName: "SupraCloud",
    locale: "en_GB",
  },
  alternates: { canonical: "https://supracloud.co.uk/apply" },
};

export default function ApplyLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
