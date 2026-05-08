import { test, expect } from '@playwright/test';

// Pages that should have exactly 1 nav (the global Navbar)
const STANDARD_PAGES = ['/', '/about', '/contact', '/book', '/solutions/banking', '/solutions/retail',
  '/services/staffing', '/services/consultation', '/talent/programs', '/talent/partnerships',
  '/talent/internships', '/privacy', '/terms'];

// Portal has multiple navs by design: global Navbar + sidebar nav + dashboard nav
// This is correct accessible HTML — we just verify the global Navbar is present
const PORTAL_PAGES = ['/portal', '/portal/schedule', '/portal/projects', '/portal/resources'];

for (const path of STANDARD_PAGES) {
  test(`Single navbar on ${path}`, async ({ page }) => {
    await page.goto(`https://supracloud.co.uk${path}`);
    await page.waitForLoadState('networkidle');
    const navCount = await page.locator('nav').count();
    expect(navCount).toBe(1);
    await expect(page.locator('nav').first()).toContainText('Book a Call');
  });
}

for (const path of PORTAL_PAGES) {
  test(`Global navbar present on portal page ${path}`, async ({ page }) => {
    await page.goto(`https://supracloud.co.uk${path}`);
    await page.waitForLoadState('networkidle');
    // Portal has multiple navs (global + sidebar) — just verify global nav exists
    const navCount = await page.locator('nav').count();
    expect(navCount).toBeGreaterThanOrEqual(1);
    // The first nav should be the global Navbar with Book a Call
    await expect(page.locator('nav').first()).toContainText('Book a Call');
  });
}
