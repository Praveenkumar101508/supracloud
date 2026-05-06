import { test, expect } from '@playwright/test';

test.describe('SEO & Accessibility – TC-5.xx', () => {

  test('TC-5.01: Meta title and meta description on homepage', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    const title = await page.title();
    expect(title).toContain('ProdReady Labs');

    const metaDesc = page.locator('meta[name="description"]');
    const content = await metaDesc.getAttribute('content');
    expect(content).toBeTruthy();
    expect(content!.length).toBeGreaterThan(0);

    await page.screenshot({ path: 'test-results/TC-5.01-meta-title.png' });
  });

  test('TC-5.02: All images have non-empty alt or aria-hidden on homepage', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    const violations: string[] = await page.evaluate(() => {
      const images = Array.from(document.querySelectorAll('img'));
      const bad: string[] = [];
      for (const img of images) {
        const alt = img.getAttribute('alt');
        const ariaHidden = img.getAttribute('aria-hidden');
        if (ariaHidden === 'true') continue;
        if (!alt || alt.trim() === '') {
          bad.push(img.outerHTML.substring(0, 150));
        }
      }
      return bad;
    });

    if (violations.length > 0) {
      console.log('Images missing alt text:', violations);
    }

    expect(violations.length).toBe(0);

    await page.screenshot({ path: 'test-results/TC-5.02-img-alt.png' });
  });

  test('TC-5.03: Form inputs have labels or aria-label on /apply', async ({ page }) => {
    await page.goto('/apply');
    await page.waitForLoadState('networkidle');

    const violations: string[] = await page.evaluate(() => {
      const fields = Array.from(document.querySelectorAll('input[id], select[id], textarea[id]'));
      const bad: string[] = [];
      for (const field of fields) {
        const id = field.getAttribute('id')!;
        const ariaLabel = field.getAttribute('aria-label');
        const label = document.querySelector(`label[for="${id}"]`);
        if (!ariaLabel && !label) {
          bad.push(`Element #${id} has no label or aria-label`);
        }
      }
      return bad;
    });

    if (violations.length > 0) {
      console.log('Form label violations:', violations);
    }

    expect(violations.length).toBe(0);

    await page.screenshot({ path: 'test-results/TC-5.03-form-labels.png' });
  });

  test('TC-5.04: Keyboard navigation — Tab through fields and Enter triggers validation', async ({ page }) => {
    await page.goto('/apply');
    await page.waitForLoadState('networkidle');

    // Tab 6 times to cycle through fields
    for (let i = 0; i < 6; i++) {
      await page.keyboard.press('Tab');
    }

    // Press Enter to submit (should trigger HTML5 validation, form stays on /apply)
    await page.keyboard.press('Enter');

    // URL should still be /apply (validation prevented submission)
    await expect(page).toHaveURL(/\/apply/);

    await page.screenshot({ path: 'test-results/TC-5.04-keyboard-nav.png', fullPage: true });
  });

});
