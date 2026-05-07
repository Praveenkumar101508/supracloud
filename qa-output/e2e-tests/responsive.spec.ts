import { test, expect } from "@playwright/test";

/**
 * Journey 10: Responsive Layout — TC-10.xx
 * Tests at 375px (mobile), 768px (tablet), 1440px (desktop)
 */

const PAGES = ["/", "/about", "/contact", "/solutions/banking", "/portal"];

for (const url of PAGES) {
  test.describe(`Responsive — ${url}`, () => {
    test(`TC-10 [375px] No horizontal overflow — ${url}`, async ({ page }) => {
      await page.setViewportSize({ width: 375, height: 812 });
      await page.goto(url);
      await page.waitForLoadState("networkidle");
      const noOverflow = await page.evaluate(
        () => document.documentElement.scrollWidth <= document.documentElement.clientWidth
      );
      expect(noOverflow).toBe(true);
      await page.screenshot({ path: `screenshots/responsive-375-${url.replace(/\//g, "-")}.png` });
    });

    test(`TC-10 [768px] Page renders without overflow — ${url}`, async ({ page }) => {
      await page.setViewportSize({ width: 768, height: 1024 });
      await page.goto(url);
      await page.waitForLoadState("networkidle");
      const noOverflow = await page.evaluate(
        () => document.documentElement.scrollWidth <= document.documentElement.clientWidth
      );
      expect(noOverflow).toBe(true);
    });

    test(`TC-10 [1440px] Page renders without overflow — ${url}`, async ({ page }) => {
      await page.setViewportSize({ width: 1440, height: 900 });
      await page.goto(url);
      await page.waitForLoadState("networkidle");
      const noOverflow = await page.evaluate(
        () => document.documentElement.scrollWidth <= document.documentElement.clientWidth
      );
      expect(noOverflow).toBe(true);
    });
  });
}

test.describe("Mobile hamburger menu — TC-10.mobile", () => {
  test.use({ viewport: { width: 375, height: 812 } });

  test("TC-10.M1: Hamburger button visible at 375px on homepage", async ({ page }) => {
    await page.goto("/");
    await page.waitForLoadState("networkidle");
    const hamburger = page.locator('button[aria-label*="menu" i], button[aria-label*="toggle" i]').first();
    await expect(hamburger).toBeVisible();
    await page.screenshot({ path: "screenshots/TC-10-mobile-hamburger.png" });
  });
});
