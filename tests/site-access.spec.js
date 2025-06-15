// @ts-check
const { test, expect } = require('@playwright/test');

test('site accessibility test', async ({ page }) => {
  console.log('Checking if the site is accessible...');
  
  // Try navigating directly to the full URL
  await page.goto('https://trimblecloud.github.io/tccl/');
  
  // Log the current URL
  console.log('Current URL:', page.url());
  
  // Take a screenshot to see what's loaded
  await page.screenshot({ path: 'site-test.png' });
  
  // Check if we got the expected navigation elements
  const homeLink = await page.getByRole('link', { name: 'Home' }).isVisible();
  console.log('Home link visible:', homeLink);
  
  // Expect that we're not on a 404 page
  await expect(page).not.toHaveTitle('404');
  
  // Expect that we can see the navigation
  await expect(page.getByRole('link', { name: 'Home' })).toBeVisible();
});
