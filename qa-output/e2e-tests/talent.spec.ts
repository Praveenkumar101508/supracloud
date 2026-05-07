import { test, expect } from "@playwright/test";

/** Journey 5: Talent Pages — TC-5.xx */

test.describe("Talent Pages — TC-5.xx", () => {
  test("TC-5.01: /talent/programs loads 200 and contains 'Training'", async ({ page }) => {
    const res = await page.goto("/talent/programs");
    expect(res?.status()).toBe(200);
    await expect(page.getByText(/Training/i).first()).toBeVisible();
    await page.screenshot({ path: "screenshots/TC-5.01-programs.png", fullPage: true });
  });

  test("TC-5.02: /talent/partnerships loads 200 and contains 'Placement' or 'Partner'", async ({ page }) => {
    const res = await page.goto("/talent/partnerships");
    expect(res?.status()).toBe(200);
    await expect(page.getByText(/Placement|Partner/i).first()).toBeVisible();
    await page.screenshot({ path: "screenshots/TC-5.02-partnerships.png", fullPage: true });
  });

  test("TC-5.03: /talent/internships loads 200 and contains 'Internship' or 'Graduate'", async ({ page }) => {
    const res = await page.goto("/talent/internships");
    expect(res?.status()).toBe(200);
    await expect(page.getByText(/Internship|Graduate/i).first()).toBeVisible();
    await page.screenshot({ path: "screenshots/TC-5.03-internships.png", fullPage: true });
  });

  test("TC-5.04: /talent/programs has CTA to /contact or /book", async ({ page }) => {
    await page.goto("/talent/programs");
    await page.waitForLoadState("networkidle");
    const cta = page.locator('a[href="/contact"], a[href="/book"]').first();
    await expect(cta).toBeVisible();
  });

  test("TC-5.05: /talent/partnerships has CTA to /contact or /book", async ({ page }) => {
    await page.goto("/talent/partnerships");
    await page.waitForLoadState("networkidle");
    const cta = page.locator('a[href="/contact"], a[href="/book"]').first();
    await expect(cta).toBeVisible();
  });

  test("TC-5.06: /talent/internships has CTA to /contact or /book", async ({ page }) => {
    await page.goto("/talent/internships");
    await page.waitForLoadState("networkidle");
    const cta = page.locator('a[href="/contact"], a[href="/book"]').first();
    await expect(cta).toBeVisible();
  });
});
