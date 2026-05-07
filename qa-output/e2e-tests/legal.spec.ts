import { test, expect } from "@playwright/test";

/** Journey 11: Legal Pages — TC-11.xx */

test.describe("Legal Pages — TC-11.xx", () => {
  test("TC-11.01: /privacy loads 200 with non-empty body", async ({ page }) => {
    const res = await page.goto("/privacy");
    expect(res?.status()).toBe(200);
    const bodyText = await page.locator("body").innerText();
    expect(bodyText.trim().length).toBeGreaterThan(100);
    await page.screenshot({ path: "screenshots/TC-11.01-privacy.png", fullPage: true });
  });

  test("TC-11.02: /terms loads 200 with non-empty body", async ({ page }) => {
    const res = await page.goto("/terms");
    expect(res?.status()).toBe(200);
    const bodyText = await page.locator("body").innerText();
    expect(bodyText.trim().length).toBeGreaterThan(100);
    await page.screenshot({ path: "screenshots/TC-11.02-terms.png", fullPage: true });
  });

  test("TC-11.03: /privacy page has a last-updated date", async ({ page }) => {
    await page.goto("/privacy");
    await page.waitForLoadState("networkidle");
    // Should contain a date reference like "April 2026" or "Last updated"
    const text = await page.locator("body").innerText();
    expect(text).toMatch(/last updated|2026|2025/i);
  });

  test("TC-11.04: /terms page has a last-updated date or effective date", async ({ page }) => {
    await page.goto("/terms");
    await page.waitForLoadState("networkidle");
    const text = await page.locator("body").innerText();
    expect(text).toMatch(/last updated|effective|2026|2025/i);
  });
});
