import { test, expect } from "@playwright/test";

/** Journey 3: Solutions Pages — TC-3.xx */

test.describe("Solutions Pages — TC-3.xx", () => {
  test("TC-3.01: /solutions/banking loads 200, H1 contains 'Banking'", async ({ page }) => {
    const res = await page.goto("/solutions/banking");
    expect(res?.status()).toBe(200);
    await expect(page.getByRole("heading", { level: 1 })).toContainText("Banking");
    await page.screenshot({ path: "screenshots/TC-3.01-banking.png", fullPage: true });
  });

  test("TC-3.02: /solutions/retail loads 200, H1 contains 'Retail'", async ({ page }) => {
    const res = await page.goto("/solutions/retail");
    expect(res?.status()).toBe(200);
    await expect(page.getByRole("heading", { level: 1 })).toContainText("Retail");
    await page.screenshot({ path: "screenshots/TC-3.02-retail.png", fullPage: true });
  });

  test("TC-3.03: Banking page has CTA linking to /book or /contact", async ({ page }) => {
    await page.goto("/solutions/banking");
    await page.waitForLoadState("networkidle");
    const cta = page.locator('main a[href="/book"], main a[href="/contact"]').first();
    await expect(cta).toBeVisible();
  });

  test("TC-3.04: Retail page has CTA linking to /book or /contact", async ({ page }) => {
    await page.goto("/solutions/retail");
    await page.waitForLoadState("networkidle");
    const cta = page.locator('main a[href="/book"], main a[href="/contact"]').first();
    await expect(cta).toBeVisible();
  });

  test("TC-3.05: No console errors on /solutions/banking", async ({ page }) => {
    const errors: string[] = [];
    page.on("pageerror", (err) => errors.push(err.message));
    await page.goto("/solutions/banking");
    await page.waitForLoadState("networkidle");
    expect(errors).toHaveLength(0);
  });

  test("TC-3.06: No console errors on /solutions/retail", async ({ page }) => {
    const errors: string[] = [];
    page.on("pageerror", (err) => errors.push(err.message));
    await page.goto("/solutions/retail");
    await page.waitForLoadState("networkidle");
    expect(errors).toHaveLength(0);
  });
});
