import { test, expect } from "@playwright/test";

/**
 * Journey 1: Navigation — TC-1.xx
 * All tests run against https://supracloud.co.uk
 */

test.describe("Navigation — TC-1.xx", () => {
  test("TC-1.01: Homepage loads with status 200 and correct H1", async ({ page }) => {
    const response = await page.goto("/");
    expect(response?.status()).toBe(200);
    await expect(page.getByRole("heading", { level: 1 })).toContainText("Autonomous AI Agents");
    await page.screenshot({ path: "screenshots/TC-1.01-homepage.png", fullPage: true });
  });

  test("TC-1.02: Logo click navigates back to homepage from /about", async ({ page }) => {
    await page.goto("/about");
    await page.waitForLoadState("networkidle");
    // Click the logo (link to /)
    await page.locator('a[href="/"]').first().click();
    await expect(page).toHaveURL(/\/$|supracloud\.co\.uk$/);
    await page.screenshot({ path: "screenshots/TC-1.02-logo-home.png" });
  });

  test("TC-1.03: /about page loads with status 200", async ({ page }) => {
    const res = await page.goto("/about");
    expect(res?.status()).toBe(200);
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
  });

  test("TC-1.04: /contact page loads with status 200", async ({ page }) => {
    const res = await page.goto("/contact");
    expect(res?.status()).toBe(200);
    await page.screenshot({ path: "screenshots/TC-1.04-contact.png" });
  });

  test("TC-1.05: /portal page loads with status 200", async ({ page }) => {
    const res = await page.goto("/portal");
    expect(res?.status()).toBe(200);
    await page.screenshot({ path: "screenshots/TC-1.05-portal.png" });
  });

  test("TC-1.06: /book page loads with status 200", async ({ page }) => {
    const res = await page.goto("/book");
    expect(res?.status()).toBe(200);
    await page.screenshot({ path: "screenshots/TC-1.06-book.png" });
  });

  test("TC-1.07: Desktop navbar contains Submit a Brief link to /contact", async ({ page }) => {
    await page.goto("/");
    await page.waitForLoadState("networkidle");
    const link = page.locator('a[href="/contact"]').first();
    await expect(link).toBeVisible();
  });

  test("TC-1.08: Desktop navbar contains Book a Call link to /book", async ({ page }) => {
    await page.goto("/");
    await page.waitForLoadState("networkidle");
    const link = page.locator('a[href="/book"]').first();
    await expect(link).toBeVisible();
  });

  test("TC-1.09: Desktop navbar contains Client Login link to /portal", async ({ page }) => {
    await page.goto("/");
    await page.waitForLoadState("networkidle");
    const link = page.locator('a[href="/portal"]').first();
    await expect(link).toBeVisible();
  });

  test("TC-1.10: /solutions/banking loads with status 200", async ({ page }) => {
    const res = await page.goto("/solutions/banking");
    expect(res?.status()).toBe(200);
    await expect(page.getByRole("heading", { level: 1 })).toContainText("Banking");
    await page.screenshot({ path: "screenshots/TC-1.10-banking.png" });
  });

  test("TC-1.11: /solutions/retail loads with status 200", async ({ page }) => {
    const res = await page.goto("/solutions/retail");
    expect(res?.status()).toBe(200);
    await expect(page.getByRole("heading", { level: 1 })).toContainText("Retail");
  });

  test("TC-1.12: /services/staffing loads with status 200", async ({ page }) => {
    const res = await page.goto("/services/staffing");
    expect(res?.status()).toBe(200);
  });

  test("TC-1.13: /services/consultation loads with status 200", async ({ page }) => {
    const res = await page.goto("/services/consultation");
    expect(res?.status()).toBe(200);
  });

  test("TC-1.14: /talent/programs loads with status 200", async ({ page }) => {
    const res = await page.goto("/talent/programs");
    expect(res?.status()).toBe(200);
  });

  test("TC-1.15: /talent/partnerships loads with status 200", async ({ page }) => {
    const res = await page.goto("/talent/partnerships");
    expect(res?.status()).toBe(200);
  });

  test("TC-1.16: /talent/internships loads with status 200", async ({ page }) => {
    const res = await page.goto("/talent/internships");
    expect(res?.status()).toBe(200);
  });

  test("TC-1.17: /privacy loads with status 200", async ({ page }) => {
    const res = await page.goto("/privacy");
    expect(res?.status()).toBe(200);
  });

  test("TC-1.18: /terms loads with status 200", async ({ page }) => {
    const res = await page.goto("/terms");
    expect(res?.status()).toBe(200);
  });

  test("TC-1.19: Footer email link is rk@supracloud.co.uk", async ({ page }) => {
    await page.goto("/");
    await page.waitForLoadState("networkidle");
    const emailLink = page.locator('footer a[href="mailto:rk@supracloud.co.uk"]').first();
    await expect(emailLink).toBeVisible();
  });

  test("TC-1.20: Footer WhatsApp link contains wa.me/447776456694", async ({ page }) => {
    await page.goto("/");
    await page.waitForLoadState("networkidle");
    const waLink = page.locator('footer a[href*="wa.me/447776456694"]').first();
    await expect(waLink).toBeVisible();
  });

  test("TC-1.21: Footer Privacy Policy link navigates to /privacy", async ({ page }) => {
    await page.goto("/");
    await page.waitForLoadState("networkidle");
    await page.locator('footer a[href="/privacy"]').first().click();
    await expect(page).toHaveURL(/\/privacy/);
  });

  test("TC-1.22: Footer Terms of Service link navigates to /terms", async ({ page }) => {
    await page.goto("/");
    await page.waitForLoadState("networkidle");
    await page.locator('footer a[href="/terms"]').first().click();
    await expect(page).toHaveURL(/\/terms/);
  });
});
