import { test, expect } from '@playwright/test';

test.describe('Quiz Apps', () => {
  test.describe('Flags Quiz', () => {
    test('should load flags quiz app', async ({ page }) => {
      await page.goto('/quiz/flags');

      await expect(page.getByText(/flags/i)).toBeVisible();
      await expect(page.getByRole('button', { name: /home/i })).toBeVisible();
    });

    test('should display quiz question', async ({ page }) => {
      await page.goto('/quiz/flags');

      // Should have answer buttons
      const answerButtons = page.getByRole('button').filter({ hasNotText: /home/i });
      await expect(answerButtons.first()).toBeVisible();
    });

    test('should allow selecting an answer', async ({ page }) => {
      await page.goto('/quiz/flags');

      const answerButtons = page.getByRole('button').filter({ hasNotText: /home/i });
      await answerButtons.first().click();

      // Wait for feedback
      await page.waitForTimeout(500);
    });
  });

  test.describe('Capitals Quiz', () => {
    test('should load capitals quiz app', async ({ page }) => {
      await page.goto('/quiz/capitals');

      await expect(page.getByText(/capital/i)).toBeVisible();
      await expect(page.getByRole('button', { name: /home/i })).toBeVisible();
    });

    test('should display question and options', async ({ page }) => {
      await page.goto('/quiz/capitals');

      const answerButtons = page.getByRole('button').filter({ hasNotText: /home/i });
      await expect(answerButtons.first()).toBeVisible();
    });
  });

  test.describe('Monuments Quiz', () => {
    test('should load monuments quiz app', async ({ page }) => {
      await page.goto('/quiz/monuments');

      await expect(page.getByText(/monument/i)).toBeVisible();
      await expect(page.getByRole('button', { name: /home/i })).toBeVisible();
    });
  });

  test.describe('Famous People Quiz', () => {
    test('should load people quiz app', async ({ page }) => {
      await page.goto('/quiz/people');

      await expect(page.getByText(/people|famous/i)).toBeVisible();
      await expect(page.getByRole('button', { name: /home/i })).toBeVisible();
    });
  });

  test.describe('Quiz Navigation', () => {
    test('should navigate home from any quiz', async ({ page }) => {
      await page.goto('/quiz/flags');

      await page.getByRole('button', { name: /home/i }).click();

      await expect(page).toHaveURL('/');
    });
  });
});
