import { test, expect } from '@playwright/test';
import { chromium } from 'playwright';

test('has title', async ({ page }) => {
  await page.goto('https://playwright.dev/');

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Playwright/);
});

test('get started link', async ({ page }) => {
  await page.goto('https://playwright.dev/');

  // Click the get started link.
  await page.getByRole('link', { name: 'Get started' }).click();

  // Expects page to have a heading with the name of Installation.
  await expect(page.getByRole('heading', { name: 'Installation' })).toBeVisible();
});

test('has certificate', async () => {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    ignoreHTTPSErrors: false // Ensure SSL errors are not ignored
  });
  const page = await context.newPage();

  try {
    await page.goto('https://demosanddonnuts.online');
    console.log('Website has a valid certificate.');
  } catch (error) {
    console.error('Failed to load the website:', error);
    throw new Error('Website does not have a valid certificate.');
  } finally {
    await browser.close();
  }
});