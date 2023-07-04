import { expect, test } from '@playwright/test';

test('navigation test', async ({ page }) => {
  await page.goto('http://localhost:3000/');

  await expect(page.locator('h1')).toHaveText('WANDERLUST');

  await page.getByRole('link', { name: 'Start my Adventure' }).click();

  await expect(page).toHaveURL('http://localhost:3000');
});
