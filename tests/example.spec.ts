import { test, expect } from '@playwright/test';
import { chromium } from 'playwright';

test('has certificate', async () => {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    ignoreHTTPSErrors: false // Ensure SSL errors are not ignored
  });
  const page = await context.newPage();

  try {
    // Capture a screenshot
    await page.screenshot({ path: 'screenshot.png', fullPage: true });
    console.log('Screenshot saved as screenshot.png');
        
    await page.goto('https://demosanddonnuts.online');
    console.log('Website has a valid certificate.');


  } catch (error) {
    console.error('Failed to load the website:', error);
    throw new Error('Website does not have a valid certificate.');
  } finally {
    await browser.close();
  }
});