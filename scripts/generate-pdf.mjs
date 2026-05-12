import { chromium } from '@playwright/test';
import { readFileSync, writeFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dir = dirname(fileURLToPath(import.meta.url));
const SHOTS = join(__dir, '../public/screenshots');
const OUT   = join(__dir, '../public/SupraCloud-Site-Review.pdf');

function img(file) {
  const buf = readFileSync(join(SHOTS, file));
  return `data:image/png;base64,${buf.toString('base64')}`;
}

const sections = [
  { file: '01-hero.png',       label: '01 — Hero Section',               sub: 'Spinning rings orb · HUD indicators · Triple-S monogram · Glass nav' },
  { file: '02-hero-full.png',  label: '02 — Hero (Full Height)',          sub: 'Status pills: MLOPS ACTIVE · NODE CLUSTER 04 · ALL SYSTEMS OPERATIONAL' },
  { file: '03-stats.png',      label: '03 — Live Metrics Rail',           sub: '63% L1 Deflection · 60% Cost Reduction · 99.97% Uptime · 0.1s Latency' },
  { file: '04-bento-cards.png',label: '04 — Bento Grid: Capability Stack',sub: 'AI Agent Dev (Banking/Retail tags) · IT Services (98.2% / 99.97% bars) · Talent Lab' },
  { file: '05-talent-lab.png', label: '05 — Talent Lab: Forge Elite Architects', sub: '"Special Forces Selection" · Background image overlay · Review Protocols · Enter the Lab' },
  { file: '06-footer.png',     label: '06 — Reactive Substrate Footer',   sub: 'Space Mono typography · SUPRA.OS branding · Navigation links' },
  { file: '07-full-page.png',  label: '07 — Full Page Composite',         sub: 'Complete desktop scroll — all sections end-to-end' },
  { file: '08-jarvis-boot.png',label: '08 — Jarvis Initialization Hub',   sub: '7-step boot sequence · FCA · GDPR · PCI-DSS · "ENTER THE PLATFORM →"' },
  { file: '09-mobile-hero.png',label: '09 — Mobile Hero (390px)',         sub: 'Responsive: rings + headline + status pills on iPhone viewport' },
  { file: '10-mobile-bento.png',label:'10 — Mobile Bento Grid (390px)',   sub: 'Stacked cards · Forge Elite Architects at mobile breakpoint' },
];

const PRIMARY = '#adc6ff';
const BG      = '#020202';

const html = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8"/>
<style>
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700;800&family=Space+Mono&display=swap');
  * { box-sizing: border-box; margin: 0; padding: 0; }
  body {
    background: #0a0c12;
    color: #e0e2ed;
    font-family: Inter, system-ui, sans-serif;
    -webkit-print-color-adjust: exact;
    print-color-adjust: exact;
  }

  /* ── Cover page ─────────────────────────────── */
  .cover {
    width: 100%;
    height: 100vh;
    min-height: 900px;
    background: #020202;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
    page-break-after: always;
    position: relative;
    overflow: hidden;
  }
  .cover-aurora {
    position: absolute;
    inset: 0;
    background:
      radial-gradient(ellipse 60% 50% at 50% 30%, rgba(0,122,255,0.12) 0%, transparent 70%),
      radial-gradient(ellipse 40% 40% at 80% 80%, rgba(0,91,193,0.07) 0%, transparent 70%);
    pointer-events: none;
  }
  .cover-monogram {
    position: absolute;
    font-size: 60vw;
    font-weight: 900;
    color: white;
    opacity: 0.018;
    letter-spacing: -0.1em;
    user-select: none;
    pointer-events: none;
    font-family: Inter, sans-serif;
  }
  .cover-content { position: relative; z-index: 2; }
  .cover-tag {
    font-family: 'Space Mono', monospace;
    font-size: 10px;
    letter-spacing: 0.18em;
    color: ${PRIMARY};
    text-transform: uppercase;
    margin-bottom: 28px;
    display: flex;
    align-items: center;
    gap: 10px;
    justify-content: center;
  }
  .pulse { width: 6px; height: 6px; border-radius: 50%; background: #007AFF; display: inline-block; box-shadow: 0 0 8px #007AFF; }
  .cover-title {
    font-size: 56px;
    font-weight: 800;
    letter-spacing: -0.04em;
    line-height: 1.05;
    color: #e0e2ed;
    margin-bottom: 16px;
  }
  .cover-title span { color: ${PRIMARY}; }
  .cover-sub {
    font-size: 18px;
    color: rgba(193,198,215,0.7);
    margin-bottom: 48px;
    line-height: 1.6;
    max-width: 520px;
  }
  .cover-meta {
    font-family: 'Space Mono', monospace;
    font-size: 11px;
    color: rgba(193,198,215,0.35);
    letter-spacing: 0.08em;
  }
  .divider {
    width: 80px;
    height: 1px;
    background: linear-gradient(90deg, transparent, ${PRIMARY}, transparent);
    margin: 32px auto;
  }
  .pills {
    display: flex;
    gap: 12px;
    justify-content: center;
    margin-bottom: 44px;
  }
  .pill {
    padding: 6px 16px;
    border-radius: 9999px;
    border: 1px solid rgba(255,255,255,0.08);
    background: rgba(255,255,255,0.03);
    font-family: 'Space Mono', monospace;
    font-size: 9px;
    letter-spacing: 0.1em;
    color: rgba(193,198,215,0.8);
    text-transform: uppercase;
    display: flex;
    align-items: center;
    gap: 6px;
  }
  .pill .dot { width: 5px; height: 5px; border-radius: 50%; }

  /* ── Section pages ───────────────────────────── */
  .section {
    page-break-before: always;
    padding: 48px 56px;
    min-height: 100vh;
    background: #0a0c12;
    display: flex;
    flex-direction: column;
  }
  .section-header {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    margin-bottom: 32px;
    padding-bottom: 20px;
    border-bottom: 1px solid rgba(255,255,255,0.06);
  }
  .section-num {
    font-family: 'Space Mono', monospace;
    font-size: 10px;
    color: ${PRIMARY};
    letter-spacing: 0.15em;
    text-transform: uppercase;
    margin-bottom: 6px;
  }
  .section-title {
    font-size: 22px;
    font-weight: 800;
    letter-spacing: -0.02em;
    color: #e0e2ed;
  }
  .section-sub {
    font-family: 'Space Mono', monospace;
    font-size: 10px;
    color: rgba(193,198,215,0.5);
    letter-spacing: 0.06em;
    margin-top: 4px;
    text-align: right;
    max-width: 420px;
  }
  .section-img {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .section-img img {
    max-width: 100%;
    max-height: 680px;
    border-radius: 10px;
    border: 1px solid rgba(255,255,255,0.07);
    box-shadow: 0 20px 80px rgba(0,0,0,0.6), 0 0 0 1px rgba(173,198,255,0.06);
  }
  .section-img img.mobile {
    max-width: 400px;
    border-radius: 20px;
  }
  .section-footer {
    margin-top: 24px;
    padding-top: 16px;
    border-top: 1px solid rgba(255,255,255,0.04);
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .sf-brand {
    font-family: 'Space Mono', monospace;
    font-size: 9px;
    color: rgba(193,198,215,0.25);
    letter-spacing: 0.1em;
    text-transform: uppercase;
  }
  .sf-url {
    font-family: 'Space Mono', monospace;
    font-size: 9px;
    color: rgba(173,198,255,0.4);
    letter-spacing: 0.06em;
  }
</style>
</head>
<body>

<!-- ── Cover ─────────────────────────────────────────── -->
<div class="cover">
  <div class="cover-aurora"></div>
  <div class="cover-monogram">SSS</div>
  <div class="cover-content">
    <div class="cover-tag">
      <span class="pulse"></span>
      Site Review · Command Center // Active
      <span class="pulse"></span>
    </div>
    <h1 class="cover-title">
      SupraCloud<br/>
      <span>Enterprise UI</span>
    </h1>
    <p class="cover-sub">
      Full visual audit of the Supra Obsidian OS design system<br/>
      implemented on the homepage — desktop & mobile.
    </p>
    <div class="pills">
      <div class="pill"><span class="dot" style="background:#007AFF"></span> Supra Obsidian OS</div>
      <div class="pill"><span class="dot" style="background:#28C840"></span> 10 Screens Captured</div>
      <div class="pill"><span class="dot" style="background:${PRIMARY}"></span> Desktop + Mobile</div>
    </div>
    <div class="divider"></div>
    <div class="cover-meta">
      SUBSTRATE: v4.0 &nbsp;·&nbsp; LATENCY: 0.1s &nbsp;·&nbsp; REACTIVE UI · FRAMER MOTION · NEXT.JS 16
    </div>
    <div class="cover-meta" style="margin-top:10px; opacity:0.5">
      Generated ${new Date().toLocaleDateString('en-GB', { day:'numeric', month:'long', year:'numeric' })}
    </div>
  </div>
</div>

${sections.map(s => {
  const num = s.file.split('-')[0];
  const isMobile = s.file.startsWith('09') || s.file.startsWith('10');
  return `
<!-- ── ${s.label} ─────────── -->
<div class="section">
  <div class="section-header">
    <div>
      <div class="section-num">Screen ${num}</div>
      <div class="section-title">${s.label.replace(/^\d+ — /, '')}</div>
    </div>
    <div class="section-sub">${s.sub}</div>
  </div>
  <div class="section-img">
    <img src="${img(s.file)}" class="${isMobile ? 'mobile' : ''}" alt="${s.label}" />
  </div>
  <div class="section-footer">
    <span class="sf-brand">SupraCloud Enterprise // Reactive Substrate v4.0</span>
    <span class="sf-url">localhost:3000 — ${s.file}</span>
  </div>
</div>`;
}).join('\n')}

</body>
</html>`;

// Write HTML for inspection
writeFileSync(join(__dir, '../public/site-review.html'), html);

// Generate PDF
const browser = await chromium.launch({ headless: true });
const page    = await browser.newPage();
await page.setContent(html, { waitUntil: 'networkidle' });
await page.waitForTimeout(1500);

await page.pdf({
  path: OUT,
  format: 'A4',
  landscape: true,
  printBackground: true,
  margin: { top: '0', right: '0', bottom: '0', left: '0' },
});

await browser.close();
console.log(`✓ PDF: ${OUT}`);
console.log(`  Size: ${(readFileSync(OUT).length / 1024 / 1024).toFixed(2)} MB`);
