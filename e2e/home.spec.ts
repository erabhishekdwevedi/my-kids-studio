import { test, expect } from '@playwright/test';

test.describe('Home Page', () => {
  test('should load home page successfully', async ({ page }) => {
    await page.goto('/');

    // Check main heading is visible
    await expect(page.getByRole('heading', { name: /kids studio/i })).toBeVisible();
  });

  test('should display app categories', async ({ page }) => {
    await page.goto('/');

    // Check that category sections are visible
    await expect(page.getByText(/math/i)).toBeVisible();
    await expect(page.getByText(/games/i)).toBeVisible();
  });

  test('should navigate to math app when clicked', async ({ page }) => {
    await page.goto('/');

    // Find and click on a math app card
    const countingApp = page.getByText(/counting/i).first();
    await countingApp.click();

    // Should navigate to counting app
    await expect(page).toHaveURL(/\/math\/counting/);
  });

  test('should have accessible navigation', async ({ page }) => {
    await page.goto('/');

    // Check for main navigation elements
    const mainContent = page.locator('main, [role="main"]');
    await expect(mainContent).toBeVisible();
  });
});
