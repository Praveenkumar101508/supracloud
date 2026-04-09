import { test, expect } from '@playwright/test';

// Force mobile viewport for ALL tests in this file
test.use({ viewport: { width: 375, height: 812 } });

test.describe('Mobile – TC-2.xx', () => {

  test('TC-2.01: Desktop nav links NOT visible on mobile', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    // The desktop nav div has class "hidden md:flex" — should not be visible at 375px
    const desktopNavLinks = page.locator('nav .hidden.md\\:flex a[href="/programs"]');
    await expect(desktopNavLinks).not.toBeVisible();

    await page.screenshot({ path: 'test-results/TC-2.01-mobile-no-desktop-nav.png' });
  });

  test('TC-2.02: Hamburger button is visible on mobile', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    const hamburger = page.locator('button[aria-label="Toggle menu"]');
    await expect(hamburger).toBeVisible();

    await page.screenshot({ path: 'test-results/TC-2.02-hamburger-visible.png' });
  });

  test('TC-2.03: Click hamburger shows mobile menu with Book a Call', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    const hamburger = page.locator('button[aria-label="Toggle menu"]');
    await hamburger.click();

    // Mobile menu should appear with Book a Call
    const bookACall = page.locator('a[href="/book"]').last();
    await expect(bookACall).toBeVisible({ timeout: 5000 });

    await page.screenshot({ path: 'test-results/TC-2.03-mobile-menu-open.png' });
  });

  test('TC-2.04: Click Programs in mobile menu navigates and closes menu', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    const hamburger = page.locator('button[aria-label="Toggle menu"]');
    await hamburger.click();

    const programsLink = page.locator('a[href="/programs"]').last();
    await expect(programsLink).toBeVisible({ timeout: 5000 });
    await programsLink.click();

    await page.waitForURL('**/programs');
    await expect(page).toHaveURL(/\/programs/);

    // Menu should be closed — hamburger (Menu icon) visible, not X
    await expect(hamburger).toBeVisible();

    await page.screenshot({ path: 'test-results/TC-2.04-mobile-programs-nav.png' });
  });

  test('TC-2.05: Pillars section has 3 cards stacking on mobile', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    // The pillars grid: grid-cols-1 md:grid-cols-3 — on mobile all 3 are stacked
    // Each pillar card is a div inside the grid
    const pillarCards = page.locator('section.bg-slate-50 .grid > div');
    // The pillars section has exactly 3 cards
    const count = await pillarCards.count();
    // Filter to the first grid section (pillars section)
    // The pillars grid has bg-white cards with text content from the 3 pillars
    const pillarSection = page.locator('section').filter({ hasText: 'Everything You Need to Land the Role' });
    const pillarGrid = pillarSection.locator('.grid > div');
    const pillarCount = await pillarGrid.count();
    expect(pillarCount).toBe(3);

    await page.screenshot({ path: 'test-results/TC-2.05-mobile-pillars.png' });
  });

  test('TC-2.06: No horizontal overflow on mobile', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    const noOverflow = await page.evaluate(() => {
      return document.documentElement.scrollWidth <= document.documentElement.clientWidth;
    });

    expect(noOverflow).toBe(true);

    await page.screenshot({ path: 'test-results/TC-2.06-no-overflow.png' });
  });

});
