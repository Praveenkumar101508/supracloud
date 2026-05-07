import { test, expect } from "@playwright/test";

/** Journey 8: Book a Call — TC-8.xx */

test.describe("Book a Call — TC-8.xx", () => {
  test("TC-8.01: /book loads with status 200", async ({ page }) => {
    const res = await page.goto("/book");
    expect(res?.status()).toBe(200);
    await page.screenshot({ path: "screenshots/TC-8.01-book.png", fullPage: true });
  });

  test("TC-8.02: Booking form heading is visible", async ({ page }) => {
    await page.goto("/book");
    await page.waitForLoadState("networkidle");
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
  });

  test("TC-8.03: Booking form has at least one input field", async ({ page }) => {
    await page.goto("/book");
    await page.waitForLoadState("networkidle");
    // Form uses custom styled inputs — check for any visible input or textarea
    const input = page.locator("input, textarea").first();
    await expect(input).toBeVisible();
  });

  test("TC-8.04: Name field is present", async ({ page }) => {
    await page.goto("/book");
    await page.waitForLoadState("networkidle");
    const nameField = page.locator('input[type="text"], input[name*="name" i]').first();
    await expect(nameField).toBeVisible();
  });

  test("TC-8.05: Email field is present", async ({ page }) => {
    await page.goto("/book");
    await page.waitForLoadState("networkidle");
    const emailField = page.locator('input[type="email"]').first();
    await expect(emailField).toBeVisible();
  });

  test("TC-8.06: Submit/Book button is present", async ({ page }) => {
    await page.goto("/book");
    await page.waitForLoadState("networkidle");
    const btn = page.getByRole("button", { name: /book|submit|send/i }).first();
    await expect(btn).toBeVisible();
  });

  test("TC-8.07: No console errors on /book load", async ({ page }) => {
    const errors: string[] = [];
    page.on("pageerror", (err) => errors.push(err.message));
    await page.goto("/book");
    await page.waitForLoadState("networkidle");
    expect(errors).toHaveLength(0);
  });

  test("TC-8.08: Submit button is disabled when form is empty", async ({ page }) => {
    await page.goto("/book");
    await page.waitForLoadState("networkidle");
    const btn = page.getByRole("button", { name: /book|submit|send/i }).first();
    await expect(btn).toBeDisabled();
  });
});
