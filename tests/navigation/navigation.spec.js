// @ts-check
const { test, expect } = require('@playwright/test');

test.describe('TCCL Navigation Menu Tests', () => {  test.beforeEach(async ({ page }) => {
    // Go to the home page before each test
    await page.goto('https://trimblecloud.github.io/tccl/');
    // Wait for the page to fully load
    await expect(page.getByRole('link', { name: 'Home' })).toBeVisible();
  });

  test('should have all expected navigation links', async ({ page }) => {
    const navLinks = [
      'Home', 'Events', 'Fixtures', 'Winners', 
      'Scores', 'House Members', 'Guess Game', 'Gallery'
    ];
    
    for (const linkText of navLinks) {
      await expect(page.getByRole('link', { name: linkText })).toBeVisible();
    }
    
    // Also check for the dark mode toggle
    await expect(page.getByRole('button', { name: 'Switch to Dark Mode' })).toBeVisible();
  });

  test('should navigate to Events page', async ({ page }) => {
    await page.getByRole('link', { name: 'Events' }).click();
    await expect(page).toHaveURL(/.*\/events/);
    
    // Verify Events page content
    await expect(page.getByRole('heading', { name: /Events/i })).toBeVisible();
    // Check tabs for events
    const eventTabs = ['ALL EVENTS', 'ONGOING', 'COMPLETED', 'UPCOMING'];
    for (const tab of eventTabs) {
      await expect(page.getByRole('tab', { name: new RegExp(tab, 'i') })).toBeVisible();
    }
  });

  test('should navigate to Fixtures page', async ({ page }) => {
    await page.getByRole('link', { name: 'Fixtures' }).click();
    await expect(page).toHaveURL(/.*\/fixtures/);
    
    // Verify Fixtures page content
    await expect(page.getByRole('heading', { name: /Fixtures/i })).toBeVisible();
    
    // Check for fixture tabs
    const fixtureTabs = ['CRICKET', 'TABLE TENNIS', 'CARROM', 'CHESS'];
    for (const tab of fixtureTabs) {
      await expect(page.getByRole('tab', { name: new RegExp(tab, 'i') })).toBeVisible();
    }
  });

  test('should navigate to Winners page', async ({ page }) => {
    await page.getByRole('link', { name: 'Winners' }).click();
    await expect(page).toHaveURL(/.*\/winners/);
    
    // Verify Winners page content
    await expect(page.getByRole('heading', { name: /Winners & Runners/i })).toBeVisible();
    
    // Click on the Cricket tab to check winner details
    await page.getByRole('tab', { name: /Cricket/i }).click();
  });

  test('should navigate to Scores page', async ({ page }) => {
    await page.getByRole('link', { name: 'Scores' }).click();
    await expect(page).toHaveURL(/.*\/scores/);
    
    // Verify Scores page content
    await expect(page.getByRole('heading', { name: /All Events/i })).toBeVisible();
    
    // Check for the score table
    await expect(page.locator('table')).toBeVisible();
    await expect(page.getByText(/Category/i)).toBeVisible();
    await expect(page.getByText(/Total/i)).toBeVisible();
  });

  test('should navigate to House Members page', async ({ page }) => {
    await page.getByRole('link', { name: 'House Members' }).click();
    await expect(page).toHaveURL(/.*\/participants/);
    
    // Verify House Members page content
    await expect(page.getByRole('heading', { name: /House Members/i })).toBeVisible();
    
    // Check tabs for houses
    const houseTabs = ['The Yellow Sparks', 'Sparta', 'Mission Funpossible'];
    for (const tab of houseTabs) {
      await expect(page.getByRole('tab', { name: new RegExp(tab, 'i') })).toBeVisible();
    }
  });

  test('should navigate to Guess Game page', async ({ page }) => {
    await page.getByRole('link', { name: 'Guess Game' }).click();
    await expect(page).toHaveURL(/.*\/guessgame/);
    
    // Verify Guess Game page content
    await expect(page.getByRole('heading', { name: 'Guess Who? Challenge' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Sign in with Google' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Quick Game' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Full Game' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Start Game' })).toBeVisible();
  });

  test('should navigate to Gallery page', async ({ page }) => {
    await page.getByRole('link', { name: 'Gallery' }).click();
    await expect(page).toHaveURL(/.*\/gallery/);
    
    // Verify Gallery page content
    await expect(page.getByRole('heading', { name: 'Event Gallery' })).toBeVisible();
    
    // Check for event tabs in the gallery
    const galleryEventTabs = ['Tug Of War', 'Football', 'Badminton', 'Table Tennis'];
    for (const tab of galleryEventTabs) {
      await expect(page.getByRole('tab', { name: new RegExp(tab, 'i') })).toBeVisible();
    }
  });

  test('should toggle between dark and light mode', async ({ page }) => {
    // Initially in light mode
    await expect(page.getByRole('button', { name: 'Switch to Dark Mode' })).toBeVisible();
    
    // Switch to dark mode
    await page.getByRole('button', { name: 'Switch to Dark Mode' }).click();
    await expect(page.getByRole('button', { name: 'Switch to Light Mode' })).toBeVisible();
    
    // Switch back to light mode
    await page.getByRole('button', { name: 'Switch to Light Mode' }).click();
    await expect(page.getByRole('button', { name: 'Switch to Dark Mode' })).toBeVisible();
  });
});
