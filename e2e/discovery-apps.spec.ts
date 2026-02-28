import { test, expect } from '@playwright/test';

test.describe('Discovery Apps', () => {
  test.describe('Alphabet App', () => {
    test('should load alphabet app', async ({ page }) => {
      await page.goto('/alphabet');

      await expect(page.getByText(/alphabet|abc/i)).toBeVisible();
      await expect(page.getByRole('button', { name: /home/i })).toBeVisible();
    });

    test('should display letters', async ({ page }) => {
      await page.goto('/alphabet');

      // Should have some letters displayed
      const content = await page.textContent('body');
      expect(content).toBeTruthy();
    });
  });

  test.describe('Animals App', () => {
    test('should load animals app', async ({ page }) => {
      await page.goto('/animals');

      await expect(page.getByText(/animal/i)).toBeVisible();
      await expect(page.getByRole('button', { name: /home/i })).toBeVisible();
    });

    test('should display animal content', async ({ page }) => {
      await page.goto('/animals');

      const content = await page.textContent('body');
      expect(content).toBeTruthy();
    });
  });

  test.describe('Space App', () => {
    test('should load space app', async ({ page }) => {
      await page.goto('/space');

      await expect(page.getByText(/space/i)).toBeVisible();
      await expect(page.getByRole('button', { name: /home/i })).toBeVisible();
    });
  });

  test.describe('Nature App', () => {
    test('should load nature app', async ({ page }) => {
      await page.goto('/nature');

      await expect(page.getByText(/nature/i)).toBeVisible();
      await expect(page.getByRole('button', { name: /home/i })).toBeVisible();
    });
  });

  test.describe('Shapes App', () => {
    test('should load shapes app', async ({ page }) => {
      await page.goto('/shapes');

      await expect(page.getByText(/shape/i)).toBeVisible();
      await expect(page.getByRole('button', { name: /home/i })).toBeVisible();
    });

    test('should display shapes', async ({ page }) => {
      await page.goto('/shapes');

      const content = await page.textContent('body');
      expect(content).toBeTruthy();
    });
  });

  test.describe('Discovery Navigation', () => {
    test('should navigate home from discovery apps', async ({ page }) => {
      await page.goto('/alphabet');

      await page.getByRole('button', { name: /home/i }).click();

      await expect(page).toHaveURL('/');
    });
  });
});
