import { test, expect } from "@playwright/test";

/**
 * Journey 2: Homepage — TC-2.xx
 */

test.describe("Homepage — TC-2.xx", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
    await page.waitForLoadState("networkidle");
  });

  test("TC-2.01: H1 contains 'Autonomous AI Agents'", async ({ page }) => {
    await expect(page.getByRole("heading", { level: 1 })).toContainText("Autonomous AI Agents");
  });

  test("TC-2.02: Book a Discovery Call CTA links to /book", async ({ page }) => {
    const cta = page.locator('a[href="/book"]').first();
    await expect(cta).toBeVisible();
  });

  test("TC-2.03: Submit a Brief CTA links to /contact", async ({ page }) => {
    const cta = page.locator('a[href="/contact"]').first();
    await expect(cta).toBeVisible();
  });

  test("TC-2.04: Three Pillars section renders all 3 pillars", async ({ page }) => {
    await expect(page.getByText(/AI Agent Development/i).first()).toBeVisible();
    await expect(page.getByText(/Enterprise IT Services/i).first()).toBeVisible();
    await expect(page.getByText(/Talent/i).first()).toBeVisible();
    await page.screenshot({ path: "screenshots/TC-2.04-pillars.png", fullPage: false });
  });

  test("TC-2.05: Solutions Matrix section is present", async ({ page }) => {
    // The page has a solution matrix / interactive tab section
    const matrix = page.getByText(/Solution Matrix|Banking|Retail/i).first();
    await expect(matrix).toBeVisible();
  });

  test("TC-2.06: /solutions/banking link exists on homepage", async ({ page }) => {
    const bankingLink = page.locator('a[href="/solutions/banking"]').first();
    await expect(bankingLink).toBeVisible();
  });

  test("TC-2.07: About page link or CTA visible on homepage", async ({ page }) => {
    const aboutLink = page.locator('a[href="/about"]').first();
    await expect(aboutLink).toBeVisible();
  });

  test("TC-2.08: Footer is visible with copyright year 2026", async ({ page }) => {
    const footer = page.locator("footer");
    await expect(footer).toBeVisible();
    await expect(footer).toContainText("2026");
  });

  test("TC-2.09: Meta title contains 'SupraCloud'", async ({ page }) => {
    const title = await page.title();
    expect(title).toContain("SupraCloud");
  });

  test("TC-2.10: No console errors on homepage load", async ({ page }) => {
    const errors: string[] = [];
    page.on("pageerror", (err) => errors.push(err.message));
    await page.goto("/");
    await page.waitForLoadState("networkidle");
    expect(errors).toHaveLength(0);
  });
});
