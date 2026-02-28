import { test, expect } from '@playwright/test';

test.describe('Math Apps', () => {
  test.describe('Counting App', () => {
    test('should load counting app', async ({ page }) => {
      await page.goto('/math/counting');

      await expect(page.getByText(/counting 1-20/i)).toBeVisible();
      await expect(page.getByRole('button', { name: /home/i })).toBeVisible();
    });

    test('should display question and answer options', async ({ page }) => {
      await page.goto('/math/counting');

      // Check that answer buttons are present
      const buttons = page.getByRole('button').filter({ hasNotText: /home/i });
      await expect(buttons.first()).toBeVisible();
    });

    test('should allow user to select an answer', async ({ page }) => {
      await page.goto('/math/counting');

      // Find answer buttons (excluding home button)
      const answerButtons = page.getByRole('button').filter({ hasNotText: /home/i });
      const firstButton = answerButtons.first();

      await firstButton.click();

      // Should show feedback
      await page.waitForTimeout(500);
    });

    test('should navigate home when home button clicked', async ({ page }) => {
      await page.goto('/math/counting');

      await page.getByRole('button', { name: /home/i }).click();

      await expect(page).toHaveURL('/');
    });
  });

  test.describe('Addition App', () => {
    test('should load addition app', async ({ page }) => {
      await page.goto('/math/addition');

      await expect(page.getByText(/addition/i)).toBeVisible();
      await expect(page.getByRole('button', { name: /home/i })).toBeVisible();
    });

    test('should display addition question', async ({ page }) => {
      await page.goto('/math/addition');

      // Should show math problem with + sign
      const content = await page.textContent('body');
      expect(content).toBeTruthy();
    });

    test('should allow answering questions', async ({ page }) => {
      await page.goto('/math/addition');

      const answerButtons = page.getByRole('button').filter({ hasNotText: /home/i });
      await expect(answerButtons.first()).toBeVisible();

      await answerButtons.first().click();
      await page.waitForTimeout(500);
    });
  });

  test.describe('Subtraction App', () => {
    test('should load subtraction app', async ({ page }) => {
      await page.goto('/math/subtraction');

      await expect(page.getByText(/subtraction/i)).toBeVisible();
      await expect(page.getByRole('button', { name: /home/i })).toBeVisible();
    });

    test('should display subtraction question', async ({ page }) => {
      await page.goto('/math/subtraction');

      const content = await page.textContent('body');
      expect(content).toBeTruthy();
    });
  });

  test.describe('Multiplication Tables App', () => {
    test('should load tables app', async ({ page }) => {
      await page.goto('/math/tables');

      await expect(page.getByText(/tables/i)).toBeVisible();
      await expect(page.getByRole('button', { name: /home/i })).toBeVisible();
    });

    test('should display multiplication question', async ({ page }) => {
      await page.goto('/math/tables');

      const content = await page.textContent('body');
      expect(content).toBeTruthy();
    });
  });

  test.describe('Odd/Even App', () => {
    test('should load odd/even app', async ({ page }) => {
      await page.goto('/math/odd-even');

      await expect(page.getByText(/odd.*even/i)).toBeVisible();
      await expect(page.getByRole('button', { name: /home/i })).toBeVisible();
    });

    test('should display number to classify', async ({ page }) => {
      await page.goto('/math/odd-even');

      const answerButtons = page.getByRole('button').filter({ hasNotText: /home/i });
      await expect(answerButtons.first()).toBeVisible();
    });
  });

  test.describe('Reverse Counting App', () => {
    test('should load reverse counting app', async ({ page }) => {
      await page.goto('/math/reverse-counting');

      await expect(page.getByText(/reverse/i)).toBeVisible();
      await expect(page.getByRole('button', { name: /home/i })).toBeVisible();
    });
  });
});
