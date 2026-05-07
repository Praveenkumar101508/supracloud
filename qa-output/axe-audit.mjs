// Phase 4: axe-core accessibility audit against https://supracloud.co.uk
import { chromium } from "@playwright/test";
import { readFileSync, writeFileSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const BASE_URL = "https://supracloud.co.uk";
const AXE_PATH = resolve(__dirname, "../node_modules/axe-core/axe.min.js");
const AXE_CONTENT = readFileSync(AXE_PATH, "utf8");

const ROUTES = [
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
  "/privacy",
  "/terms",
];

async function auditRoute(page, route) {
  await page.goto(`${BASE_URL}${route}`, { waitUntil: "networkidle" });
  await page.addScriptTag({ content: AXE_CONTENT });

  return page.evaluate(async () => {
    const res = await window.axe.run(document, {
      runOnly: { type: "tag", values: ["wcag2a", "wcag2aa", "best-practice"] },
    });
    return {
      violations: res.violations.map((v) => ({
        id: v.id,
        impact: v.impact,
        description: v.description,
        nodes: v.nodes.map((n) => ({ html: n.html.substring(0, 200) })),
      })),
      passes: res.passes.length,
      incomplete: res.incomplete.length,
    };
  });
}

async function run() {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  const results = [];

  for (const route of ROUTES) {
    process.stdout.write(`Auditing ${route}...`);
    try {
      const r = await auditRoute(page, route);
      results.push({ route, ...r });
      const count = r.violations.length;
      console.log(` ${count === 0 ? "✓" : "✗"} ${count} violation(s), ${r.passes} passed`);
    } catch (err) {
      console.log(` ERROR: ${err.message}`);
      results.push({ route, violations: [], passes: 0, incomplete: 0 });
    }
  }

  await browser.close();

  const totalViolations = results.reduce((s, r) => s + r.violations.length, 0);

  const impactOrder = ["critical", "serious", "moderate", "minor"];
  const worstImpact = (r) => {
    for (const impact of impactOrder) {
      if (r.violations.some((v) => v.impact === impact)) return impact;
    }
    return r.violations.length === 0 ? "—" : "unknown";
  };

  let md = `# Accessibility Audit Report — supracloud.co.uk\n`;
  md += `**Date:** ${new Date().toISOString().split("T")[0]}\n`;
  md += `**Tool:** axe-core (WCAG 2.1 AA + best-practice)\n`;
  md += `**Scope:** ${ROUTES.length} routes\n\n`;

  md += `## Summary\n\n`;
  md += `| Metric | Value |\n|---|---|\n`;
  md += `| Routes audited | ${ROUTES.length} |\n`;
  md += `| Total violations | ${totalViolations} |\n`;
  md += `| Routes with critical violations | ${results.filter((r) => r.violations.some((v) => v.impact === "critical")).length} |\n`;
  md += `| Routes with serious violations | ${results.filter((r) => r.violations.some((v) => v.impact === "serious")).length} |\n`;
  md += `| Routes fully clean (zero violations) | ${results.filter((r) => r.violations.length === 0).length} |\n\n`;

  md += `## Per-Route Results\n\n`;
  md += `| Route | Violations | Worst Impact | Passes |\n|---|---|---|---|\n`;
  for (const r of results) {
    md += `| \`${r.route}\` | ${r.violations.length} | ${worstImpact(r)} | ${r.passes} |\n`;
  }

  md += `\n## Violation Details\n\n`;
  for (const r of results) {
    if (r.violations.length === 0) continue;
    md += `### \`${r.route}\`\n\n`;
    for (const v of r.violations) {
      md += `#### ${(v.impact || "unknown").toUpperCase()} — \`${v.id}\`\n`;
      md += `${v.description}\n\n`;
      md += `Affected nodes (first ${Math.min(3, v.nodes.length)} of ${v.nodes.length}):\n`;
      for (const n of v.nodes.slice(0, 3)) {
        md += `\`\`\`html\n${n.html}\n\`\`\`\n`;
      }
      md += "\n";
    }
  }

  md += `---\n*Generated ${new Date().toISOString()}*\n`;

  const outPath = resolve(__dirname, "accessibility-report.md");
  writeFileSync(outPath, md, "utf8");
  console.log(`\nReport written: ${outPath}`);
  console.log(`Total violations: ${totalViolations}`);
}

run().catch((err) => { console.error(err); process.exit(1); });
