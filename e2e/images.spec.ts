import { test, expect } from '@playwright/test';

test.describe('Image Loading', () => {
  test('should load all images correctly with base path in production', async ({ page, baseURL }) => {
    // Navigate to the homepage
    await page.goto('/');
    
    // Wait for the page to load
    await page.waitForLoadState('networkidle');
    
    // Get all images on the page
    const images = page.locator('img');
    const imageCount = await images.count();
    
    // Ensure we have images to test
    expect(imageCount).toBeGreaterThan(0);
    
    // Check each image
    for (let i = 0; i < imageCount; i++) {
      const image = images.nth(i);
      const src = await image.getAttribute('src');
      const alt = await image.getAttribute('alt');
      
      // Log for debugging
      console.log(`Checking image ${i + 1}/${imageCount}: ${src}`);
      
      // Verify the image has required attributes
      expect(src).toBeTruthy();
      expect(alt).toBeTruthy();
      
      // Check if internal images have the correct base path in production
      if (src?.startsWith('/') && !src.startsWith('//')) {
        if (process.env.CI || baseURL?.includes('watt-media-website')) {
          expect(src).toMatch(/^\/watt-media-website\//);
        }
      }
      
      // Verify the image loads successfully
      const isVisible = await image.isVisible();
      expect(isVisible).toBe(true);
      
      // Check that the image has loaded (naturalWidth > 0 means loaded)
      const naturalWidth = await image.evaluate((img) => (img as HTMLImageElement).naturalWidth);
      expect(naturalWidth).toBeGreaterThan(0);
    }
  });

  test('should load logo image correctly', async ({ page, baseURL }) => {
    await page.goto('/');
    
    // Find the logo specifically
    const logo = page.locator('img[alt*="Watt Media"]').first();
    await expect(logo).toBeVisible();
    
    const logoSrc = await logo.getAttribute('src');
    
    // Verify logo path
    if (process.env.CI || baseURL?.includes('watt-media-website')) {
      expect(logoSrc).toBe('/watt-media-website/images/watt-media-logo.png');
    } else {
      expect(logoSrc).toBe('/images/watt-media-logo.png');
    }
    
    // Verify logo loads
    const naturalWidth = await logo.evaluate((img) => (img as HTMLImageElement).naturalWidth);
    expect(naturalWidth).toBeGreaterThan(0);
  });

  test('should load service images correctly', async ({ page, baseURL }) => {
    await page.goto('/services');
    await page.waitForLoadState('networkidle');
    
    // Check service images
    const serviceImages = page.locator('.service-card img, [class*="service"] img');
    const count = await serviceImages.count();
    
    expect(count).toBeGreaterThan(0);
    
    for (let i = 0; i < count; i++) {
      const img = serviceImages.nth(i);
      const src = await img.getAttribute('src');
      
      // Verify service images have correct paths
      if (src?.startsWith('/')) {
        if (process.env.CI || baseURL?.includes('watt-media-website')) {
          expect(src).toMatch(/^\/watt-media-website\/images\//);
        }
      }
      
      // Verify image loads
      const naturalWidth = await img.evaluate((el) => (el as HTMLImageElement).naturalWidth);
      expect(naturalWidth).toBeGreaterThan(0);
    }
  });

  test('should handle 404 images gracefully', async ({ page }) => {
    await page.goto('/');
    
    // Check for any failed image requests
    const failedRequests: string[] = [];
    
    page.on('response', (response) => {
      if (response.url().includes('/images/') && response.status() === 404) {
        failedRequests.push(response.url());
      }
    });
    
    // Navigate through main pages
    const pages = ['/', '/about', '/services', '/portfolio', '/contact'];
    
    for (const pagePath of pages) {
      await page.goto(pagePath);
      await page.waitForLoadState('networkidle');
    }
    
    // No images should return 404
    expect(failedRequests).toHaveLength(0);
  });
});