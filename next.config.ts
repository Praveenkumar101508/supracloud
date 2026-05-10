import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      // Old B2C routes → new B2B canonical URLs (301 permanent)
      { source: "/solutions/supermarket",  destination: "/solutions/retail",      permanent: true },
      { source: "/services/it-staffing",   destination: "/services/staffing",     permanent: true },
      { source: "/careers/internships",    destination: "/talent/internships",    permanent: true },
      { source: "/careers/training",       destination: "/talent/programs",       permanent: true },
      { source: "/internships",            destination: "/talent/internships",    permanent: true },
      { source: "/programs",              destination: "/talent/programs",        permanent: true },
      { source: "/it-services",           destination: "/services/staffing",     permanent: true },
      { source: "/ai-agents",             destination: "/solutions/banking",     permanent: true },
    ];
  },
};

export default nextConfig;
