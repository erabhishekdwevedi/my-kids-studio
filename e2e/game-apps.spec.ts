import { test, expect } from '@playwright/test';

test.describe('Game Apps', () => {
  test.describe('Snake Game', () => {
    test('should load snake game', async ({ page }) => {
      await page.goto('/snake');

      await expect(page.getByText(/snake/i)).toBeVisible();
      await expect(page.getByRole('button', { name: /home/i })).toBeVisible();
    });

    test('should have game controls', async ({ page }) => {
      await page.goto('/snake');

      // Check for play/start button or game area
      const playButton = page.getByRole('button', { name: /play|start/i });
      const gameArea = page.locator('canvas, [class*="game"]');

      const hasPlayButton = await playButton.count() > 0;
      const hasGameArea = await gameArea.count() > 0;

      expect(hasPlayButton || hasGameArea).toBeTruthy();
    });

    test('should navigate home', async ({ page }) => {
      await page.goto('/snake');

      await page.getByRole('button', { name: /home/i }).click();

      await expect(page).toHaveURL('/');
    });
  });

  test.describe('Car Race Game', () => {
    test('should load car race game', async ({ page }) => {
      await page.goto('/car-race');

      await expect(page.getByText(/car.*race|racing/i)).toBeVisible();
      await expect(page.getByRole('button', { name: /home/i })).toBeVisible();
    });

    test('should have game area', async ({ page }) => {
      await page.goto('/car-race');

      const gameArea = page.locator('canvas, [class*="game"]');
      await expect(gameArea.first()).toBeVisible();
    });
  });

  test.describe('Dinosaur Game', () => {
    test('should load dinosaur game', async ({ page }) => {
      await page.goto('/dinosaur');

      await expect(page.getByText(/dinosaur|dino/i)).toBeVisible();
      await expect(page.getByRole('button', { name: /home/i })).toBeVisible();
    });

    test('should have game controls or area', async ({ page }) => {
      await page.goto('/dinosaur');

      const playButton = page.getByRole('button', { name: /play|start|jump/i });
      const gameArea = page.locator('canvas, [class*="game"]');

      const hasPlayButton = await playButton.count() > 0;
      const hasGameArea = await gameArea.count() > 0;

      expect(hasPlayButton || hasGameArea).toBeTruthy();
    });
  });
});
