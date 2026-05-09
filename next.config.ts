import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      { source: "/solutions/retail",   destination: "/solutions/supermarket", permanent: true },
      { source: "/services/staffing",  destination: "/services/it-staffing",  permanent: true },
      { source: "/talent/internships", destination: "/careers/internships",   permanent: true },
      { source: "/talent/programs",    destination: "/careers/training",      permanent: true },
      { source: "/internships",        destination: "/careers/internships",   permanent: true },
      { source: "/programs",           destination: "/careers/training",      permanent: true },
    ];
  },
};

export default nextConfig;
