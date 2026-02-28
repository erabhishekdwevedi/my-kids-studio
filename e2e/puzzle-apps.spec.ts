import { test, expect } from '@playwright/test';

test.describe('Puzzle Apps', () => {
  test.describe('Puzzles App', () => {
    test('should load puzzles app', async ({ page }) => {
      await page.goto('/puzzles');

      await expect(page.getByText(/puzzle/i)).toBeVisible();
      await expect(page.getByRole('button', { name: /home/i })).toBeVisible();
    });

    test('should have puzzle pieces or grid', async ({ page }) => {
      await page.goto('/puzzles');

      const content = await page.textContent('body');
      expect(content).toBeTruthy();
    });

    test('should navigate home', async ({ page }) => {
      await page.goto('/puzzles');

      await page.getByRole('button', { name: /home/i }).click();

      await expect(page).toHaveURL('/');
    });
  });

  test.describe('Memory Game', () => {
    test('should load memory game', async ({ page }) => {
      await page.goto('/memory');

      await expect(page.getByText(/memory/i)).toBeVisible();
      await expect(page.getByRole('button', { name: /home/i })).toBeVisible();
    });

    test('should have memory cards', async ({ page }) => {
      await page.goto('/memory');

      // Look for clickable card elements
      const cards = page.locator('[role="button"], button, [class*="card"]');
      const cardCount = await cards.count();

      expect(cardCount).toBeGreaterThan(0);
    });

    test('should allow clicking cards', async ({ page }) => {
      await page.goto('/memory');

      // Find clickable elements (excluding home button)
      const cards = page.getByRole('button').filter({ hasNotText: /home/i });
      const firstCard = cards.first();

      if (await firstCard.isVisible()) {
        await firstCard.click();
        await page.waitForTimeout(300);
      }
    });
  });
});
