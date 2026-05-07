import { test, expect } from "@playwright/test";

/** Journey 9: Client Portal — TC-9.xx */

test.describe("Client Portal — TC-9.xx", () => {
  test("TC-9.01: /portal loads with status 200", async ({ page }) => {
    const res = await page.goto("/portal");
    expect(res?.status()).toBe(200);
    await page.screenshot({ path: "screenshots/TC-9.01-portal.png", fullPage: true });
  });

  test("TC-9.02: Portal H1 is visible", async ({ page }) => {
    await page.goto("/portal");
    await page.waitForLoadState("networkidle");
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
  });

  test("TC-9.03: Dashboard nav tab is present", async ({ page }) => {
    await page.goto("/portal");
    await page.waitForLoadState("networkidle");
    // Sidebar links exist in DOM; visibility depends on CSS breakpoint
    await expect(page.locator('a[href="/portal"]').first()).toBeAttached();
  });

  test("TC-9.04: Schedule nav tab is present", async ({ page }) => {
    await page.goto("/portal");
    await page.waitForLoadState("networkidle");
    await expect(page.locator('a[href="/portal/schedule"]')).toBeAttached();
  });

  test("TC-9.05: Projects nav tab is present", async ({ page }) => {
    await page.goto("/portal");
    await page.waitForLoadState("networkidle");
    await expect(page.locator('a[href="/portal/projects"]')).toBeAttached();
  });

  test("TC-9.06: Resources nav tab is present", async ({ page }) => {
    await page.goto("/portal");
    await page.waitForLoadState("networkidle");
    await expect(page.locator('a[href="/portal/resources"]')).toBeAttached();
  });

  test("TC-9.07: No console errors on portal load", async ({ page }) => {
    const errors: string[] = [];
    page.on("pageerror", (err) => errors.push(err.message));
    await page.goto("/portal");
    await page.waitForLoadState("networkidle");
    expect(errors).toHaveLength(0);
  });
});
