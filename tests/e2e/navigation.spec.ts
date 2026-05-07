import { test, expect } from '@playwright/test';

test.describe('Navigation – TC-1.xx', () => {

  test('TC-1.01: Desktop navbar elements visible', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    // Logo
    await expect(page.locator('text=SupraCloud').first()).toBeVisible();

    // Nav links (desktop hidden md:flex — only check on desktop viewport)
    const viewport = page.viewportSize();
    if (viewport && viewport.width >= 768) {
      await expect(page.locator('nav a[href="/programs"]')).toBeVisible();
      await expect(page.locator('nav a[href="/projects"]')).toBeVisible();
      await expect(page.locator('nav a[href="/success-stories"]')).toBeVisible();
      await expect(page.locator('nav a[href="/about"]')).toBeVisible();
      // Desktop Book a Call CTA
      await expect(page.locator('nav a[href="/book"]')).toBeVisible();
    }

    await page.screenshot({ path: 'test-results/TC-1.01-navbar-desktop.png' });
  });

  test('TC-1.02: Click Programs in navbar navigates to /programs', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    const viewport = page.viewportSize();
    if (viewport && viewport.width >= 768) {
      await page.locator('nav a[href="/programs"]').first().click();
    } else {
      const hamburger = page.locator('button[aria-label="Toggle menu"]');
      await hamburger.click();
      await page.locator('a[href="/programs"]').last().click();
    }

    await page.waitForURL('**/programs');
    await expect(page).toHaveURL(/\/programs/);
    await page.screenshot({ path: 'test-results/TC-1.02-programs-page.png', fullPage: true });
  });

  test('TC-1.03: Click Book a Call in navbar navigates to /book', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    const viewport = page.viewportSize();
    if (viewport && viewport.width >= 768) {
      await page.locator('nav a[href="/book"]').first().click();
    } else {
      const hamburger = page.locator('button[aria-label="Toggle menu"]');
      await hamburger.click();
      await page.locator('a[href="/book"]').last().click();
    }

    await page.waitForURL('**/book');
    await expect(page).toHaveURL(/\/book/);
    await page.screenshot({ path: 'test-results/TC-1.03-book-page.png' });
  });

  test('TC-1.04: Footer is present and contains copyright text', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    const footer = page.locator('footer');
    await expect(footer).toBeVisible();
    await expect(footer).toContainText('SupraCloud');
    await expect(footer).toContainText('2026');

    await page.screenshot({ path: 'test-results/TC-1.04-footer.png', fullPage: true });
  });

  test('TC-1.05: Footer email link has correct mailto href', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    const emailLink = page.locator('footer a[href="mailto:rk@supracloud.co.uk"]');
    await expect(emailLink).toBeVisible();
    const href = await emailLink.getAttribute('href');
    expect(href).toBe('mailto:rk@supracloud.co.uk');
  });

  test('TC-1.06: Footer WhatsApp link href contains wa.me/447776456694', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    const waLink = page.locator('footer a[href*="wa.me/447776456694"]');
    await expect(waLink).toBeVisible();
    const href = await waLink.getAttribute('href');
    expect(href).toContain('wa.me/447776456694');
  });

});
