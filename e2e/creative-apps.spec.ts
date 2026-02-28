import { test, expect } from '@playwright/test';

test.describe('Creative Apps', () => {
  test.describe('Drawing Board', () => {
    test('should load drawing board app', async ({ page }) => {
      await page.goto('/drawing-board');

      await expect(page.getByText(/drawing board/i)).toBeVisible();
      await expect(page.getByRole('button', { name: /home/i })).toBeVisible();
    });

    test('should have canvas element', async ({ page }) => {
      await page.goto('/drawing-board');

      const canvas = page.locator('canvas');
      await expect(canvas).toBeVisible();
    });

    test('should navigate home', async ({ page }) => {
      await page.goto('/drawing-board');

      await page.getByRole('button', { name: /home/i }).click();

      await expect(page).toHaveURL('/');
    });
  });

  test.describe('Coloring App', () => {
    test('should load coloring app', async ({ page }) => {
      await page.goto('/coloring');

      await expect(page.getByText(/coloring book/i)).toBeVisible();
      await expect(page.getByRole('button', { name: /home/i })).toBeVisible();
    });

    test('should have coloring functionality', async ({ page }) => {
      await page.goto('/coloring');

      // Check for SVG coloring canvas
      const svg = page.locator('svg');
      await expect(svg).toBeVisible();
    });
  });
});
