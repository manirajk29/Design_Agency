import { test, expect } from '@playwright/test';

test.describe('SEO Audit', () => {
  const baseUrl = 'http://localhost:3000';

  test.beforeEach(async ({ page }) => {
    await page.goto(baseUrl);
  });

  test('has correct title', async ({ page }) => {
    // Check for title element
    await expect(page).toHaveTitle(/PixelCraft Studio \| Creative Design Agency/);
  });

  test('has correct meta description', async ({ page }) => {
    // Check for meta description
    const metaDescription = page.locator('meta[name="description"]');
    await expect(metaDescription).toHaveAttribute('content', /Transforming ideas into beautiful digital experiences/);
  });

  test('has exactly one h1 tag', async ({ page }) => {
    // There should be only one H1 for SEO
    const h1s = await page.locator('h1').count();
    expect(h1s).toBe(1);
  });

  test('images have alt attributes', async ({ page }) => {
    // Ensure all images have alt attributes (ignoring next.js internal images if any)
    const images = page.locator('img');
    const count = await images.count();
    
    for (let i = 0; i < count; i++) {
      const alt = await images.nth(i).getAttribute('alt');
      expect(alt).not.toBeNull();
      // Optionally expect alt text to not be empty, except for decorative images
    }
  });

  test('has canonical tag', async ({ page }) => {
    // Check for canonical URL
    const canonical = page.locator('link[rel="canonical"]');
    await expect(canonical).toHaveCount(1);
  });

  test('has Open Graph tags', async ({ page }) => {
    // Check for basic OG tags
    const ogTitle = page.locator('meta[property="og:title"]');
    await expect(ogTitle).toHaveCount(1);
    
    const ogType = page.locator('meta[property="og:type"]');
    await expect(ogType).toHaveCount(1);
  });
});
