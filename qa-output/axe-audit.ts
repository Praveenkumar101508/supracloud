/**
 * Phase 4: axe-core accessibility audit against https://supracloud.co.uk
 * Run with: npx ts-node --project tsconfig.json qa-output/axe-audit.ts
 * Requires: axe-core (in node_modules), @playwright/test
 */

import { chromium } from "@playwright/test";
import * as fs from "fs";
import * as path from "path";

const BASE_URL = "https://supracloud.co.uk";
const AXE_PATH = path.resolve(__dirname, "../node_modules/axe-core/axe.min.js");

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

interface AxeViolation {
  id: string;
  impact: string;
  description: string;
  nodes: { html: string }[];
}

interface RouteResult {
  route: string;
  violations: AxeViolation[];
  passes: number;
  incomplete: number;
}

async function auditRoute(page: any, route: string): Promise<RouteResult> {
  await page.goto(`${BASE_URL}${route}`, { waitUntil: "networkidle" });
  await page.addScriptTag({ path: AXE_PATH });

  const result = await page.evaluate(async () => {
    const axeResult = await (window as any).axe.run(document, {
      runOnly: { type: "tag", values: ["wcag2a", "wcag2aa", "best-practice"] },
    });
    return {
      violations: axeResult.violations.map((v: any) => ({
        id: v.id,
        impact: v.impact,
        description: v.description,
        nodes: v.nodes.map((n: any) => ({ html: n.html.substring(0, 200) })),
      })),
      passes: axeResult.passes.length,
      incomplete: axeResult.incomplete.length,
    };
  });

  return { route, ...result };
}

async function run() {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();

  const results: RouteResult[] = [];

  for (const route of ROUTES) {
    console.log(`Auditing ${route}...`);
    try {
      const result = await auditRoute(page, route);
      results.push(result);
      const count = result.violations.length;
      console.log(
        `  ${count === 0 ? "✓" : "✗"} ${count} violation(s), ${result.passes} passed`
      );
    } catch (err) {
      console.error(`  ERROR on ${route}:`, err);
      results.push({ route, violations: [], passes: 0, incomplete: 0 });
    }
  }

  await browser.close();

  // ── Build markdown report ──────────────────────────────────────────────────
  const totalViolations = results.reduce((s, r) => s + r.violations.length, 0);
  const criticalRoutes = results.filter((r) =>
    r.violations.some((v) => v.impact === "critical")
  );
  const seriousRoutes = results.filter((r) =>
    r.violations.some((v) => v.impact === "serious")
  );

  let md = `# Accessibility Audit Report — supracloud.co.uk\n`;
  md += `**Date:** ${new Date().toISOString().split("T")[0]}\n`;
  md += `**Tool:** axe-core (WCAG 2.1 AA + best-practice rules)\n`;
  md += `**Scope:** ${ROUTES.length} routes\n\n`;

  md += `## Summary\n\n`;
  md += `| Metric | Value |\n|---|---|\n`;
  md += `| Routes audited | ${ROUTES.length} |\n`;
  md += `| Total violations | ${totalViolations} |\n`;
  md += `| Routes with critical violations | ${criticalRoutes.length} |\n`;
  md += `| Routes with serious violations | ${seriousRoutes.length} |\n`;
  md += `| Routes fully clean | ${results.filter((r) => r.violations.length === 0).length} |\n\n`;

  md += `## Per-Route Results\n\n`;
  md += `| Route | Violations | Worst Impact | Passes |\n|---|---|---|---|\n`;
  for (const r of results) {
    const worst =
      r.violations.find((v) => v.impact === "critical")?.impact ||
      r.violations.find((v) => v.impact === "serious")?.impact ||
      r.violations.find((v) => v.impact === "moderate")?.impact ||
      r.violations.find((v) => v.impact === "minor")?.impact ||
      (r.violations.length === 0 ? "—" : "unknown");
    md += `| \`${r.route}\` | ${r.violations.length} | ${worst} | ${r.passes} |\n`;
  }

  md += `\n## Violation Details\n\n`;
  for (const r of results) {
    if (r.violations.length === 0) continue;
    md += `### \`${r.route}\`\n\n`;
    for (const v of r.violations) {
      md += `#### ${v.impact?.toUpperCase()} — \`${v.id}\`\n`;
      md += `${v.description}\n\n`;
      md += `Affected nodes (first ${Math.min(3, v.nodes.length)} of ${v.nodes.length}):\n`;
      for (const n of v.nodes.slice(0, 3)) {
        md += `\`\`\`html\n${n.html}\n\`\`\`\n`;
      }
      md += "\n";
    }
  }

  md += `---\n*Generated ${new Date().toISOString()}*\n`;

  const outPath = path.resolve(__dirname, "accessibility-report.md");
  fs.writeFileSync(outPath, md, "utf8");
  console.log(`\nReport written to ${outPath}`);
  console.log(`Total violations: ${totalViolations}`);
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
