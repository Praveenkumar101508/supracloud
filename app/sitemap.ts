import type { MetadataRoute } from "next";

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://supracloud.co.uk";

function entry(
  path: string,
  priority: number,
  changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"] = "monthly"
): MetadataRoute.Sitemap[number] {
  return { url: `${BASE_URL}${path}`, lastModified: new Date(), changeFrequency, priority };
}

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    entry("/",                       1.0, "weekly"),
    entry("/pricing",                 0.9, "monthly"),
    entry("/solutions/banking",      0.9, "monthly"),
    entry("/solutions/retail",       0.9, "monthly"),
    entry("/solutions/supermarket",  0.9, "monthly"),
    entry("/services/it-staffing",   0.8, "monthly"),
    entry("/services/consultation",  0.8, "monthly"),
    entry("/careers/internships",    0.8, "monthly"),
    entry("/careers/training",       0.8, "monthly"),
    entry("/talent/partnerships",    0.7, "monthly"),
    entry("/ai-agents",              0.7, "monthly"),
    entry("/about",                  0.7, "yearly"),
    entry("/contact",                0.7, "yearly"),
    entry("/success-stories",        0.6, "monthly"),
    entry("/projects",               0.5, "monthly"),
    entry("/book",                   0.6, "yearly"),
    entry("/apply",                  0.5, "yearly"),
    entry("/privacy",                0.2, "yearly"),
    entry("/terms",                  0.2, "yearly"),
  ];
}
