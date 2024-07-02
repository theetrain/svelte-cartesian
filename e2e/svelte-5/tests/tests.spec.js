import { test, expect } from '@playwright/test'

test('basic usage', async ({ page }) => {
  await page.goto('localhost:4173/')

  // Expect a title "to contain" a substring.
  await expect(page).toHaveScreenshot()
})

test('multiple snippets', async ({ page }) => {
  await page.goto('localhost:4173/multiple-snippets')

  // Expect a title "to contain" a substring.
  await expect(page).toHaveScreenshot()
})

test('custom styles', async ({ page }) => {
  await page.goto('localhost:4173/custom-styles')

  // Expect a title "to contain" a substring.
  await expect(page).toHaveScreenshot()
})
