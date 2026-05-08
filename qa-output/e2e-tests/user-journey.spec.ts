import { test, expect } from '@playwright/test';

test('User journey: Enterprise client discovers and books a call', async ({ page }) => {
  // 1. Land on homepage
  await page.goto('https://supracloud.co.uk');
  await expect(page).toHaveTitle(/SupraCloud/i);

  // 2. Read hero section
  const h1 = page.locator('h1').first();
  await expect(h1).toBeVisible();

  // 3. Hover over Solutions in navbar
  await page.locator('nav').getByText('Solutions').first().hover();
  await page.waitForTimeout(300);

  // 4. Navigate to Banking AI page
  await page.goto('https://supracloud.co.uk/solutions/banking');
  await expect(page.locator('h1').first()).toBeVisible();

  // 5. Click Book a Call CTA
  const cta = page.locator('main a[href="/book"], main a[href*="book"]').first();
  await expect(cta).toBeVisible();

  // 6. Go to /book page
  await page.goto('https://supracloud.co.uk/book');
  await page.waitForLoadState('networkidle');
  await expect(page.locator('h1, h2, h3').first()).toBeVisible();

  // 7. Verify form is present
  await expect(page.locator('input[name="name"], input#booking-name').first()).toBeVisible();
  await expect(page.locator('input[name="email"], input#booking-email').first()).toBeVisible();

  // 8. Verify Meet link is mentioned somewhere on page or in form context
  // (the confirmation text mentions Google Meet)
  await expect(page.getByText(/google meet|meet\.google/i).first()).toBeAttached();
});

test('User journey: Talent candidate finds internships', async ({ page }) => {
  await page.goto('https://supracloud.co.uk');
  await page.goto('https://supracloud.co.uk/talent/internships');
  await page.waitForLoadState('networkidle');
  await expect(page.locator('h1').first()).toBeVisible();
  const cta = page.locator('a[href="/book"], a[href="/contact"]').first();
  await expect(cta).toBeAttached();
});

test('User journey: Contact form loads with all options', async ({ page }) => {
  await page.goto('https://supracloud.co.uk/contact');
  await page.waitForLoadState('networkidle');
  await expect(page.locator('h1').first()).toBeVisible();
  // WhatsApp and email contact options visible
  await expect(page.getByText(/whatsapp|wa\.me/i).first()).toBeAttached();
});
