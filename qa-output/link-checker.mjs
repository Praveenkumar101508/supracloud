// Phase 6: Broken link audit against https://supracloud.co.uk
import { chromium } from "@playwright/test";
import { writeFileSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const BASE_URL = "https://supracloud.co.uk";

const INTERNAL_ROUTES = [
  "/",
  "/about",
  "/contact",
  "/book",
  "/solutions/banking",
  "/solutions/retail",
  "/services/staffing",
  "/services/consultation",
  "/talent/programs",
  "/talent/partnerships",
  "/talent/internships",
  "/portal",
  "/portal/resources",
  "/privacy",
  "/terms",
];

const EXTERNAL_LINKS = [
  "https://wa.me/447776456694",
  "mailto:rk@supracloud.co.uk",
  "https://twitter.com/supraclouduk",
  "https://linkedin.com/company/supracloud",
];

async function checkInternalRoutes() {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  const results = [];

  for (const route of INTERNAL_ROUTES) {
    const url = `${BASE_URL}${route}`;
    try {
      const res = await page.goto(url, { waitUntil: "domcontentloaded", timeout: 15000 });
      const status = res?.status() ?? 0;
      const ok = status >= 200 && status < 400;
      results.push({ url: route, type: "internal", status, ok });
      console.log(`  ${ok ? "✓" : "✗"} [${status}] ${route}`);
    } catch (err) {
      results.push({ url: route, type: "internal", status: "TIMEOUT", ok: false, note: err.message?.substring(0, 80) });
      console.log(`  ✗ [TIMEOUT] ${route}`);
    }
  }

  await browser.close();
  return results;
}

async function checkExternalLinks() {
  const results = [];
  for (const url of EXTERNAL_LINKS) {
    if (url.startsWith("mailto:")) {
      results.push({ url, type: "external", status: "N/A", ok: true, note: "mailto — not HTTP-checkable" });
      console.log(`  ~ [N/A] ${url}`);
      continue;
    }
    try {
      const res = await fetch(url, {
        method: "HEAD",
        signal: AbortSignal.timeout(8000),
        redirect: "follow",
        headers: { "User-Agent": "SupraCloud-QA-Bot/1.0" },
      });
      const ok = res.status >= 200 && res.status < 400;
      results.push({ url, type: "external", status: res.status, ok });
      console.log(`  ${ok ? "✓" : "✗"} [${res.status}] ${url}`);
    } catch (err) {
      results.push({ url, type: "external", status: "ERROR", ok: false, note: err.message?.substring(0, 80) });
      console.log(`  ✗ [ERROR] ${url} — ${err.message}`);
    }
  }
  return results;
}

async function run() {
  console.log("Checking internal routes...");
  const internal = await checkInternalRoutes();

  console.log("\nChecking external links...");
  const external = await checkExternalLinks();

  const all = [...internal, ...external];
  const broken = all.filter((r) => !r.ok);

  let md = `# Broken Link Report — supracloud.co.uk\n`;
  md += `**Date:** ${new Date().toISOString().split("T")[0]}\n\n`;

  md += `## Summary\n\n`;
  md += `| | Count |\n|---|---|\n`;
  md += `| Internal routes checked | ${internal.length} |\n`;
  md += `| External links checked | ${external.filter((r) => !r.url.startsWith("mailto:")).length} |\n`;
  md += `| mailto links (not HTTP-checked) | ${external.filter((r) => r.url.startsWith("mailto:")).length} |\n`;
  md += `| Broken / unreachable | ${broken.length} |\n\n`;

  md += `## Internal Routes\n\n`;
  md += `| Route | Status | Result |\n|---|---|---|\n`;
  for (const r of internal) {
    md += `| \`${r.url}\` | ${r.status} | ${r.ok ? "✅ OK" : "❌ BROKEN"} |\n`;
  }

  md += `\n## External Links\n\n`;
  md += `| URL | Status | Result |\n|---|---|---|\n`;
  for (const r of external) {
    md += `| \`${r.url}\` | ${r.status} | ${r.ok ? "✅ OK" : "❌ BROKEN"}${r.note ? ` — ${r.note}` : ""} |\n`;
  }

  if (broken.length > 0) {
    md += `\n## ❌ Broken Links\n\n`;
    for (const r of broken) {
      md += `- **${r.url}** — Status: ${r.status}${r.note ? ` (${r.note})` : ""}\n`;
    }
  } else {
    md += `\n## Result\n\nAll HTTP links returned 2xx/3xx status. ✅\n`;
  }

  md += `\n---\n*Generated ${new Date().toISOString()}*\n`;

  const outPath = resolve(__dirname, "broken-links-report.md");
  writeFileSync(outPath, md, "utf8");
  console.log(`\nReport written: ${outPath}`);
  console.log(`Broken: ${broken.length}`);
}

run().catch((err) => { console.error(err); process.exit(1); });
