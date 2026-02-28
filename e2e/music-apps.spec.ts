import { test, expect } from '@playwright/test';

test.describe('Music Apps', () => {
  test.describe('Piano App', () => {
    test('should load piano app', async ({ page }) => {
      await page.goto('/piano');

      await expect(page.getByText(/piano/i)).toBeVisible();
      await expect(page.getByRole('button', { name: /home/i })).toBeVisible();
    });

    test('should display piano keys', async ({ page }) => {
      await page.goto('/piano');

      // Check for piano note labels
      await expect(page.getByText('C')).toBeVisible();
      await expect(page.getByText('D')).toBeVisible();
      await expect(page.getByText('E')).toBeVisible();
    });

    test('should show instruction text', async ({ page }) => {
      await page.goto('/piano');

      await expect(page.getByText(/tap.*keys/i)).toBeVisible();
    });

    test('should navigate home', async ({ page }) => {
      await page.goto('/piano');

      await page.getByRole('button', { name: /home/i }).click();

      await expect(page).toHaveURL('/');
    });
  });

  test.describe('Melodies App', () => {
    test('should load melodies app', async ({ page }) => {
      await page.goto('/music/melodies');

      await expect(page.getByText(/melod/i)).toBeVisible();
      await expect(page.getByRole('button', { name: /home/i })).toBeVisible();
    });
  });
});
