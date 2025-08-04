import { test, expect } from '@playwright/test';

test.describe('Portfolio Lightbox', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/portfolio');
    // Wait for portfolio items to load
    await page.waitForSelector('.portfolio-item', { timeout: 10000 });
  });

  test('should open lightbox when clicking portfolio image', async ({ page }) => {
    // Initially lightbox should be hidden
    const lightbox = page.locator('#lightbox');
    await expect(lightbox).toBeHidden();
    
    // Click on first portfolio item
    const firstItem = page.locator('.portfolio-item').first();
    await firstItem.click();
    
    // Lightbox should be visible
    await expect(lightbox).toBeVisible();
    
    // Lightbox should contain an image
    const lightboxImage = lightbox.locator('img#lightbox-img');
    await expect(lightboxImage).toBeVisible();
    
    // Image should have a src attribute
    const imageSrc = await lightboxImage.getAttribute('src');
    expect(imageSrc).toBeTruthy();
    expect(imageSrc).toContain('/images/portfolio/');
  });

  test('should close lightbox when clicking close button', async ({ page }) => {
    // Open lightbox
    await page.locator('.portfolio-item').first().click();
    const lightbox = page.locator('#lightbox');
    await expect(lightbox).toBeVisible();
    
    // Click close button
    const closeButton = lightbox.locator('.lightbox-close');
    await closeButton.click();
    
    // Lightbox should be hidden
    await expect(lightbox).toBeHidden();
  });

  test('should close lightbox when clicking outside image', async ({ page }) => {
    // Open lightbox
    await page.locator('.portfolio-item').first().click();
    const lightbox = page.locator('#lightbox');
    await expect(lightbox).toBeVisible();
    
    // Click on lightbox background (not on image)
    await lightbox.click({ position: { x: 10, y: 10 } });
    
    // Lightbox should be hidden
    await expect(lightbox).toBeHidden();
  });

  test('should close lightbox with Escape key', async ({ page }) => {
    // Open lightbox
    await page.locator('.portfolio-item').first().click();
    const lightbox = page.locator('#lightbox');
    await expect(lightbox).toBeVisible();
    
    // Press Escape
    await page.keyboard.press('Escape');
    
    // Lightbox should be hidden
    await expect(lightbox).toBeHidden();
  });

  test('should work on mobile viewport', async ({ page, isMobile }) => {
    if (!isMobile) {
      test.skip();
    }
    
    // Ensure page is scrollable on mobile
    const body = page.locator('body');
    await expect(body).toHaveCSS('overflow', 'auto');
    
    // Click on portfolio item
    const portfolioItem = page.locator('.portfolio-item').first();
    await portfolioItem.scrollIntoViewIfNeeded();
    await portfolioItem.click();
    
    // Lightbox should be visible
    const lightbox = page.locator('#lightbox');
    await expect(lightbox).toBeVisible();
    
    // Body should prevent scrolling when lightbox is open
    await expect(body).toHaveCSS('overflow', 'hidden');
    
    // Image should fit within viewport
    const lightboxImage = lightbox.locator('img#lightbox-img');
    const viewportSize = page.viewportSize();
    const boundingBox = await lightboxImage.boundingBox();
    
    if (boundingBox && viewportSize) {
      expect(boundingBox.width).toBeLessThanOrEqual(viewportSize.width);
      expect(boundingBox.height).toBeLessThanOrEqual(viewportSize.height);
    }
    
    // Close lightbox
    await lightbox.click({ position: { x: 10, y: 10 } });
    await expect(lightbox).toBeHidden();
    
    // Body should be scrollable again
    await expect(body).toHaveCSS('overflow', 'auto');
  });

  test('should display correct image for each portfolio item', async ({ page }) => {
    const portfolioItems = page.locator('.portfolio-item');
    const count = await portfolioItems.count();
    
    // Test first 3 items to keep test fast
    for (let i = 0; i < Math.min(3, count); i++) {
      const item = portfolioItems.nth(i);
      
      // Get the onclick attribute to extract expected image path
      const onclickAttr = await item.getAttribute('onclick');
      const match = onclickAttr?.match(/openLightbox\('(.+?)'\)/);
      const expectedImagePath = match?.[1];
      
      // Click the item
      await item.click();
      
      // Verify lightbox opens with correct image
      const lightbox = page.locator('#lightbox');
      await expect(lightbox).toBeVisible();
      
      const lightboxImage = lightbox.locator('img#lightbox-img');
      const actualImageSrc = await lightboxImage.getAttribute('src');
      expect(actualImageSrc).toBe(expectedImagePath);
      
      // Close lightbox for next iteration
      await page.keyboard.press('Escape');
      await expect(lightbox).toBeHidden();
    }
  });

  test('should handle touch events on mobile', async ({ page, browserName }) => {
    // Skip on desktop
    if (!page.viewportSize() || page.viewportSize()!.width > 768) {
      test.skip();
    }
    
    // Skip on webkit as touch events are flaky
    if (browserName === 'webkit') {
      test.skip();
    }
    
    const portfolioItem = page.locator('.portfolio-item').first();
    await portfolioItem.scrollIntoViewIfNeeded();
    
    // Simulate touch tap
    const box = await portfolioItem.boundingBox();
    if (box) {
      await page.touchscreen.tap(box.x + box.width / 2, box.y + box.height / 2);
    }
    
    // Lightbox should open
    const lightbox = page.locator('#lightbox');
    await expect(lightbox).toBeVisible();
    
    // Close with touch on background
    await page.touchscreen.tap(10, 10);
    await expect(lightbox).toBeHidden();
  });
});