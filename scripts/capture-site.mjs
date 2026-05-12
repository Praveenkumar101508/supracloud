import { chromium } from '@playwright/test';
import { writeFileSync, mkdirSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const OUT = join(__dirname, '../public/screenshots');
mkdirSync(OUT, { recursive: true });

const BASE = 'http://localhost:3000';

async function run() {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();

  // Desktop viewport
  await page.setViewportSize({ width: 1440, height: 900 });

  // ── 1. Dismiss boot overlay if present ─────────────────
  await page.goto(BASE, { waitUntil: 'networkidle' });
  await page.waitForTimeout(3500); // let boot lines animate

  const initBtn = page.locator('button', { hasText: 'Initialize Systems →' });
  if (await initBtn.isVisible()) {
    await initBtn.click();
    await page.waitForTimeout(800);
  }

  // ── 2. Hero section ────────────────────────────────────
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.waitForTimeout(600);
  await page.screenshot({ path: `${OUT}/01-hero.png`, fullPage: false });
  console.log('✓ 01-hero');

  // ── 3. Hero + orb close-up (full viewport) ────────────
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.screenshot({ path: `${OUT}/02-hero-full.png`, fullPage: false });
  console.log('✓ 02-hero-full');
  await page.setViewportSize({ width: 1440, height: 900 });

  // ── 4. Stats rail ──────────────────────────────────────
  await page.evaluate(() => window.scrollTo({ top: 1100, behavior: 'instant' }));
  await page.waitForTimeout(700);
  await page.screenshot({ path: `${OUT}/03-stats.png`, fullPage: false });
  console.log('✓ 03-stats');

  // ── 5. Bento header + AI Agent Dev + IT Services ───────
  await page.evaluate(() => window.scrollTo({ top: 1450, behavior: 'instant' }));
  await page.waitForTimeout(800);
  await page.screenshot({ path: `${OUT}/04-bento-cards.png`, fullPage: false });
  console.log('✓ 04-bento-cards');

  // ── 6. Talent Lab card ─────────────────────────────────
  await page.evaluate(() => window.scrollTo({ top: 2100, behavior: 'instant' }));
  await page.waitForTimeout(700);
  await page.screenshot({ path: `${OUT}/05-talent-lab.png`, fullPage: false });
  console.log('✓ 05-talent-lab');

  // ── 7. Footer ──────────────────────────────────────────
  await page.evaluate(() => window.scrollTo({ top: document.body.scrollHeight, behavior: 'instant' }));
  await page.waitForTimeout(500);
  await page.screenshot({ path: `${OUT}/06-footer.png`, fullPage: false });
  console.log('✓ 06-footer');

  // ── 8. Full page screenshot ────────────────────────────
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.waitForTimeout(400);
  await page.screenshot({ path: `${OUT}/07-full-page.png`, fullPage: true });
  console.log('✓ 07-full-page');

  // ── 9. Jarvis boot modal ───────────────────────────────
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.waitForTimeout(400);
  // Use JS click since button is in fixed nav (may be outside scroll viewport)
  await page.evaluate(() => {
    const btn = [...document.querySelectorAll('button')].find(b => b.textContent.trim() === 'Initialize Hub');
    if (btn) btn.click();
  });
  await page.waitForTimeout(4200); // let all 7 lines animate
  await page.screenshot({ path: `${OUT}/08-jarvis-boot.png`, fullPage: false });
  console.log('✓ 08-jarvis-boot');

  // close modal via JS
  await page.evaluate(() => {
    const btn = [...document.querySelectorAll('button')].find(b => b.textContent.trim() === '✕');
    if (btn) btn.click();
  });
  await page.waitForTimeout(500);

  // ── 10. Mobile viewport ────────────────────────────────
  await page.setViewportSize({ width: 390, height: 844 });
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.waitForTimeout(600);
  await page.screenshot({ path: `${OUT}/09-mobile-hero.png`, fullPage: false });
  console.log('✓ 09-mobile-hero');

  await page.evaluate(() => window.scrollTo({ top: 1600, behavior: 'instant' }));
  await page.waitForTimeout(500);
  await page.screenshot({ path: `${OUT}/10-mobile-bento.png`, fullPage: false });
  console.log('✓ 10-mobile-bento');

  // ── 11. PDF export ─────────────────────────────────────
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.waitForTimeout(500);

  await page.pdf({
    path: `${OUT}/../SupraCloud-Command-Center.pdf`,
    format: 'A4',
    printBackground: true,
    margin: { top: '0', right: '0', bottom: '0', left: '0' },
    scale: 0.75,
  });
  console.log('✓ PDF generated');

  await browser.close();
  console.log('\nAll done! Output:', OUT);
}

run().catch(e => { console.error(e); process.exit(1); });
