import { test, expect } from '@playwright/test'

test('default slot', async ({ page }) => {
  await page.goto('localhost:4173/')

  // Expect a title "to contain" a substring.
  await expect(page).toHaveScreenshot()
})

test('named slots asChild', async ({ page }) => {
  await page.goto('localhost:4173/named-slots')

  // Expect a title "to contain" a substring.
  await expect(page).toHaveScreenshot()
})

test('custom styles', async ({ page }) => {
  await page.goto('localhost:4173/custom-styles')

  // Expect a title "to contain" a substring.
  await expect(page).toHaveScreenshot()
})
