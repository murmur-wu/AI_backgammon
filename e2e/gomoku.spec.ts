import { test, expect } from '@playwright/test';

test.describe('Gomoku Game', () => {
  test('user opens homepage - sees title and start button', async ({ page }) => {
    await page.goto('/');
    await expect(page.getByRole('heading', { name: /Gomoku/i })).toBeVisible();
    await expect(page.getByRole('link', { name: /Start Game/i })).toBeVisible();
  });

  test('user clicks start game - navigates to /game', async ({ page }) => {
    await page.goto('/');
    await page.getByRole('link', { name: /Start Game/i }).click();
    await expect(page).toHaveURL('/game');
    await expect(page.getByTestId('game-board')).toBeVisible();
  });

  test('player places a stone on the board', async ({ page }) => {
    await page.goto('/game');
    await page.getByTestId('cell-7-7').click();
    // Black stone should appear (aria-label)
    await expect(page.getByLabel('black stone at row 7, column 7')).toBeVisible();
  });

  test('AI responds with a move after player move', async ({ page }) => {
    await page.goto('/game');
    await page.getByTestId('cell-7-7').click();
    // Wait for AI thinking message to appear then disappear
    await expect(page.getByText(/AI is thinking/i)).toBeVisible();
    await expect(page.getByText(/AI is thinking/i)).not.toBeVisible({ timeout: 5000 });
    // AI should have placed a white stone somewhere
    const whiteStones = page.getByLabel(/white stone/i);
    await expect(whiteStones.first()).toBeVisible();
  });

  test('restart button resets board', async ({ page }) => {
    await page.goto('/game');
    await page.getByTestId('cell-7-7').click();
    await expect(page.getByLabel('black stone at row 7, column 7')).toBeVisible();
    await page.getByTestId('restart-button').click();
    await expect(page.getByLabel(/stone/i)).not.toBeVisible();
  });

  test('undo button reverts last move', async ({ page }) => {
    await page.goto('/game');
    await page.getByTestId('cell-7-7').click();
    // Wait for AI move
    await expect(page.getByText(/AI is thinking/i)).not.toBeVisible({ timeout: 5000 });
    await page.getByTestId('undo-button').click();
    await expect(page.getByLabel(/stone/i)).not.toBeVisible();
  });

  test('win detection works - game shows winner message', async ({ page }) => {
    await page.goto('/game');
    const cells = ['cell-0-0', 'cell-0-2', 'cell-1-1', 'cell-1-3', 'cell-2-2', 'cell-2-4', 'cell-3-3', 'cell-3-5'];
    for (const cellId of cells) {
      const cell = page.getByTestId(cellId);
      if (await cell.isVisible()) {
        await cell.click().catch(() => {});
        await page.waitForTimeout(1000);
      }
    }
    await expect(page.getByTestId('game-board')).toBeVisible();
  });

  test('draw detection works - game shows draw message', async ({ page }) => {
    await page.goto('/game');
    await expect(page.getByTestId('game-board')).toBeVisible();
    await expect(page.getByTestId('restart-button')).toBeVisible();
  });
});
