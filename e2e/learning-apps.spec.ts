import { test, expect } from '@playwright/test';

test.describe('Learning Apps', () => {
  test.describe('Stories App', () => {
    test('should load stories app', async ({ page }) => {
      await page.goto('/stories');

      await expect(page.getByText(/stor/i)).toBeVisible();
    });

    test('should have story content or selection', async ({ page }) => {
      await page.goto('/stories');

      const content = await page.textContent('body');
      expect(content).toBeTruthy();
    });
  });

  test.describe('Reading App', () => {
    test('should load reading app', async ({ page }) => {
      await page.goto('/reading');

      await expect(page.getByText(/read/i)).toBeVisible();
    });

    test('should have reading content', async ({ page }) => {
      await page.goto('/reading');

      const content = await page.textContent('body');
      expect(content).toBeTruthy();
    });
  });

  test.describe('Science App', () => {
    test('should load science app', async ({ page }) => {
      await page.goto('/science');

      await expect(page.getByText(/science/i)).toBeVisible();
    });

    test('should have science content', async ({ page }) => {
      await page.goto('/science');

      const content = await page.textContent('body');
      expect(content).toBeTruthy();
    });
  });
});
