import { test, expect } from '@playwright/test'

test('default slot', async ({ page }) => {
  await page.goto('localhost:4173/')
  await expect(page).toHaveScreenshot()
})

test('named slots asChild', async ({ page }) => {
  await page.goto('localhost:4173/named-slots')
  await expect(page).toHaveScreenshot()
})

test('custom styles', async ({ page }) => {
  await page.goto('localhost:4173/custom-styles')
  await expect(page).toHaveScreenshot()
})

test('short and long labels', async ({ page }) => {
  await page.goto('localhost:4173/labels')
  await expect(page).toHaveScreenshot({ fullPage: true })
})

test('short and long labels - dark mode', async ({ page }) => {
  await page.goto('localhost:4173/labels/dark')
  await expect(page).toHaveScreenshot({ fullPage: true })
})

test('slotted labels', async ({ page }) => {
  await page.goto('localhost:4173/labels/custom')
  await expect(page).toHaveScreenshot({ fullPage: true })
})
