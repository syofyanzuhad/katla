import { test, expect } from '@playwright/test';

test.describe('Katla Gameplay', () => {
  test.beforeEach(async ({ page }) => {
    // Clear localStorage to ensure a fresh state
    await page.goto('/');
    await page.evaluate(() => localStorage.clear());
    await page.reload();
    // Wait for the app to be ready (words loaded)
    await page.waitForSelector('[data-testid="row-0"]');
  });

  test('shows quick start banner on first visit', async ({ page }) => {
    await expect(page.locator('text=Tebak kata dalam 6 kesempatan')).toBeVisible();
    await page.click('button[aria-label="Tutup tip"]'); // Close banner
    await expect(page.locator('text=Tebak kata dalam 6 kesempatan')).toBeHidden();
  });

  test('can type and submit a guess', async ({ page }) => {
    // Dismiss banner first
    await page.click('button[aria-label="Tutup tip"]');

    // Type using virtual keyboard
    await page.click('[data-testid="key-m"]');
    await page.click('[data-testid="key-a"]');
    await page.click('[data-testid="key-k"]');
    await page.click('[data-testid="key-a"]');
    await page.click('[data-testid="key-n"]');

    // Verify letters in the first row
    await expect(page.getByTestId('cell-0-0')).toHaveText('M');
    await expect(page.getByTestId('cell-0-4')).toHaveText('N');

    // Press Enter
    await page.click('[data-testid="key-enter"]');

    // After submit, check if statuses are applied (colors changed)
    // The cell will have a status class (correct, present, or absent)
    const firstCell = page.getByTestId('cell-0-0');
    await expect(firstCell).not.toHaveClass(/border-zinc-600/);
  });

  test('can switch between Daily and Random modes', async ({ page }) => {
    await page.click('button[aria-label="Tutup tip"]'); // Dismiss banner

    // Switch to Random
    await page.click('button:has-text("Random")');
    await expect(page.locator('button:has-text("Random")')).toHaveClass(/bg-blue-600/);

    // Switch back to Daily
    await page.click('button:has-text("Harian")');
    await expect(page.locator('button:has-text("Harian")')).toHaveClass(/bg-blue-600/);
  });

  test('theme toggle works', async ({ page }) => {
    // Check initial dark theme
    await expect(page.locator('html')).toHaveClass(/dark/);

    // Toggle to Light
    await page.click('button[aria-label="Ganti ke Mode Terang"]');
    await expect(page.locator('html')).not.toHaveClass(/dark/);

    // Toggle back to Dark
    await page.click('button[aria-label="Ganti ke Mode Gelap"]');
    await expect(page.locator('html')).toHaveClass(/dark/);
  });

  test('physical keyboard input works', async ({ page }) => {
    await page.click('button[aria-label="Tutup tip"]'); // Dismiss banner

    await page.keyboard.type('bantu');
    await page.keyboard.press('Enter');

    await expect(page.getByTestId('cell-0-0')).toHaveText('B');
    await expect(page.getByTestId('cell-0-4')).toHaveText('U');
  });
});
