import { test, expect } from "@playwright/test";

/** Journey 4: Services Pages — TC-4.xx */

test.describe("Services Pages — TC-4.xx", () => {
  test("TC-4.01: /services/staffing loads with status 200", async ({ page }) => {
    const res = await page.goto("/services/staffing");
    expect(res?.status()).toBe(200);
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
    await page.screenshot({ path: "screenshots/TC-4.01-staffing.png", fullPage: true });
  });

  test("TC-4.02: /services/consultation loads with status 200", async ({ page }) => {
    const res = await page.goto("/services/consultation");
    expect(res?.status()).toBe(200);
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
    await page.screenshot({ path: "screenshots/TC-4.02-consultation.png", fullPage: true });
  });

  test("TC-4.03: Staffing page has CTA to /book or /contact", async ({ page }) => {
    await page.goto("/services/staffing");
    await page.waitForLoadState("networkidle");
    const cta = page.locator('main a[href="/book"], main a[href="/contact"]').first();
    await expect(cta).toBeVisible();
  });

  test("TC-4.04: Consultation page has CTA to /book or /contact", async ({ page }) => {
    await page.goto("/services/consultation");
    await page.waitForLoadState("networkidle");
    const cta = page.locator('main a[href="/book"], main a[href="/contact"]').first();
    await expect(cta).toBeVisible();
  });

  test("TC-4.05: No console errors on /services/staffing", async ({ page }) => {
    const errors: string[] = [];
    page.on("pageerror", (err) => errors.push(err.message));
    await page.goto("/services/staffing");
    await page.waitForLoadState("networkidle");
    expect(errors).toHaveLength(0);
  });

  test("TC-4.06: No console errors on /services/consultation", async ({ page }) => {
    const errors: string[] = [];
    page.on("pageerror", (err) => errors.push(err.message));
    await page.goto("/services/consultation");
    await page.waitForLoadState("networkidle");
    expect(errors).toHaveLength(0);
  });
});
