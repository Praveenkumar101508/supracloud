import { test, expect } from "@playwright/test";

/** Journey 6: About Page — TC-6.xx */

test.describe("About Page — TC-6.xx", () => {
  test("TC-6.01: /about loads with status 200", async ({ page }) => {
    const res = await page.goto("/about");
    expect(res?.status()).toBe(200);
    await page.screenshot({ path: "screenshots/TC-6.01-about.png", fullPage: true });
  });

  test("TC-6.02: H1 is visible on /about", async ({ page }) => {
    await page.goto("/about");
    await page.waitForLoadState("networkidle");
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
  });

  test("TC-6.03: About page has a CTA to /contact or /book", async ({ page }) => {
    await page.goto("/about");
    await page.waitForLoadState("networkidle");
    const cta = page.locator('a[href="/contact"], a[href="/book"]').first();
    await expect(cta).toBeVisible();
  });

  test("TC-6.04: No console errors on /about", async ({ page }) => {
    const errors: string[] = [];
    page.on("pageerror", (err) => errors.push(err.message));
    await page.goto("/about");
    await page.waitForLoadState("networkidle");
    expect(errors).toHaveLength(0);
  });
});
