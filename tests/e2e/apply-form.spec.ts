import { test, expect } from '@playwright/test';

const VALID_FORM = {
  name: 'Jane Smith',
  email: 'jane.smith@example.com',
  targetRole: 'Data Engineer',
  level: '2–5 years experience',
  tools: 'Python, SQL, Azure, Databricks',
  goal: 'I want to land a senior Data Engineer role at a UK fintech company within 3 months.',
};

async function fillForm(page: any, overrides: Record<string, string> = {}) {
  const data = { ...VALID_FORM, ...overrides };
  await page.fill('#name', data.name);
  await page.fill('#email', data.email);
  await page.selectOption('#target-role', data.targetRole);
  await page.selectOption('#level', data.level);
  await page.fill('#tools', data.tools);
  await page.fill('#goal', data.goal);
}

function mockApiSuccess(page: any) {
  return page.route('**/api/apply', (route: any) =>
    route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify({ success: true }),
    })
  );
}

test.describe('Apply Form – TC-3.xx', () => {

  test('TC-3.01: Empty submit — form stays on /apply, name field is invalid', async ({ page }) => {
    await page.goto('/apply');
    await page.waitForLoadState('networkidle');

    await page.click('button[type="submit"]');

    // Still on /apply
    await expect(page).toHaveURL(/\/apply/);

    // Check name input validity via evaluate
    const nameInvalid = await page.evaluate(() => {
      const el = document.querySelector('#name') as HTMLInputElement;
      return el ? !el.validity.valid : false;
    });
    expect(nameInvalid).toBe(true);

    await page.screenshot({ path: 'test-results/TC-3.01-empty-submit.png', fullPage: true });
  });

  test('TC-3.02: Bad email "user@.com" — form stays on /apply', async ({ page }) => {
    await page.goto('/apply');
    await page.waitForLoadState('networkidle');

    await page.fill('#name', 'Jane Smith');
    // Type invalid email directly (bypassing fill which triggers autofill)
    await page.locator('#email').fill('user@.com');
    await page.selectOption('#target-role', 'Data Engineer');
    await page.selectOption('#level', '2–5 years experience');
    await page.fill('#goal', 'Some goal here');

    await page.click('button[type="submit"]');

    await expect(page).toHaveURL(/\/apply/);

    await page.screenshot({ path: 'test-results/TC-3.02-bad-email-1.png', fullPage: true });
  });

  test('TC-3.03: Bad email "userdomain.com" — form stays on /apply', async ({ page }) => {
    await page.goto('/apply');
    await page.waitForLoadState('networkidle');

    await page.fill('#name', 'Jane Smith');
    await page.locator('#email').fill('userdomain.com');
    await page.selectOption('#target-role', 'Data Engineer');
    await page.selectOption('#level', '2–5 years experience');
    await page.fill('#goal', 'Some goal here');

    await page.click('button[type="submit"]');

    await expect(page).toHaveURL(/\/apply/);

    await page.screenshot({ path: 'test-results/TC-3.03-bad-email-2.png', fullPage: true });
  });

  test("TC-3.04: Special chars in name O'Connor-Smith — successful submission", async ({ page }) => {
    await mockApiSuccess(page);
    await page.goto('/apply');
    await page.waitForLoadState('networkidle');

    await fillForm(page, { name: "O'Connor-Smith" });

    await page.click('button[type="submit"]');

    await expect(page.locator('h2')).toContainText('Application Received', { timeout: 10000 });

    await page.screenshot({ path: 'test-results/TC-3.04-special-chars-name.png', fullPage: true });
  });

  test('TC-3.05: XSS in goal — no alert dialog, success shown', async ({ page }) => {
    await mockApiSuccess(page);

    // Track if any dialog appears
    let dialogAppeared = false;
    page.on('dialog', async (dialog) => {
      dialogAppeared = true;
      await dialog.dismiss();
    });

    await page.goto('/apply');
    await page.waitForLoadState('networkidle');

    await fillForm(page, { goal: '<script>alert("hack")</script>' });

    await page.click('button[type="submit"]');

    await expect(page.locator('h2')).toContainText('Application Received', { timeout: 10000 });
    expect(dialogAppeared).toBe(false);

    await page.screenshot({ path: 'test-results/TC-3.05-xss-goal.png', fullPage: true });
  });

  test('TC-3.06: Max length 5000 chars in goal — page does not crash', async ({ page }) => {
    await page.goto('/apply');
    await page.waitForLoadState('networkidle');

    const longText = 'a'.repeat(5000);
    await page.fill('#goal', longText);

    // Page should still be responsive
    await expect(page.locator('button[type="submit"]')).toBeVisible();
    await expect(page).toHaveURL(/\/apply/);

    await page.screenshot({ path: 'test-results/TC-3.06-max-length.png', fullPage: true });
  });

  test('TC-3.07: Dropdowns — select correct values', async ({ page }) => {
    await page.goto('/apply');
    await page.waitForLoadState('networkidle');

    await page.selectOption('#target-role', 'Data Engineer');
    await page.selectOption('#level', '2–5 years experience');

    const roleValue = await page.inputValue('#target-role');
    const levelValue = await page.inputValue('#level');

    expect(roleValue).toBe('Data Engineer');
    expect(levelValue).toBe('2–5 years experience');

    await page.screenshot({ path: 'test-results/TC-3.07-dropdowns.png' });
  });

  test('TC-3.08: Valid submission with API mock shows Application Received', async ({ page }) => {
    await mockApiSuccess(page);
    await page.goto('/apply');
    await page.waitForLoadState('networkidle');

    await fillForm(page);

    await page.screenshot({ path: 'test-results/TC-3.08-form-filled.png', fullPage: true });

    await page.click('button[type="submit"]');

    await expect(page.locator('h2')).toContainText('Application Received', { timeout: 10000 });

    await page.screenshot({ path: 'test-results/TC-3.08-success.png', fullPage: true });
  });

  test('TC-3.09: After success, navigate back to /apply shows fresh empty form', async ({ page }) => {
    await mockApiSuccess(page);
    await page.goto('/apply');
    await page.waitForLoadState('networkidle');

    await fillForm(page);
    await page.click('button[type="submit"]');
    await expect(page.locator('h2')).toContainText('Application Received', { timeout: 10000 });

    // Navigate fresh to /apply
    await page.goto('/apply');
    await page.waitForLoadState('networkidle');

    const nameValue = await page.inputValue('#name');
    expect(nameValue).toBe('');

    await page.screenshot({ path: 'test-results/TC-3.09-form-reset.png' });
  });

});
