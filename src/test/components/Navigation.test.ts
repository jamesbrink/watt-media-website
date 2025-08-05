import { describe, it, expect } from 'vitest';

// Recreate the isActive logic from Navigation.astro for testing
function isActive(href: string, currentPath: string, basePath: string): boolean {
  const fullHref = href === '/' ? basePath || '/' : `${basePath}${href}`;
  const fullPath = currentPath.startsWith(basePath) ? currentPath : `${basePath}${currentPath}`;
  
  if (href === "/" && (fullPath === basePath || fullPath === basePath + '/' || fullPath === '/')) return true;
  if (href !== "/" && fullPath.startsWith(fullHref)) return true;
  return false;
}

describe('Navigation isActive function', () => {
  const basePath = '/watt-media-website';

  describe('Home page (/)', () => {
    it('should be active on exact match', () => {
      expect(isActive('/', '/', basePath)).toBe(true);
      expect(isActive('/', '/watt-media-website', basePath)).toBe(true);
      expect(isActive('/', '/watt-media-website/', basePath)).toBe(true);
    });

    it('should not be active on other pages', () => {
      expect(isActive('/', '/about', basePath)).toBe(false);
      expect(isActive('/', '/watt-media-website/about', basePath)).toBe(false);
    });
  });

  describe('Other pages', () => {
    it('should be active on exact match', () => {
      expect(isActive('/about', '/about', basePath)).toBe(true);
      expect(isActive('/about', '/watt-media-website/about', basePath)).toBe(true);
    });

    it('should be active on sub-paths', () => {
      expect(isActive('/services', '/services/design', basePath)).toBe(true);
      expect(isActive('/services', '/watt-media-website/services/design', basePath)).toBe(true);
    });

    it('should not be active on different pages', () => {
      expect(isActive('/about', '/services', basePath)).toBe(false);
      expect(isActive('/about', '/watt-media-website/services', basePath)).toBe(false);
    });
  });

  describe('Edge cases', () => {
    it('should handle missing base path in current path', () => {
      expect(isActive('/about', '/about', basePath)).toBe(true);
    });

    it('should handle base path in current path', () => {
      expect(isActive('/about', '/watt-media-website/about', basePath)).toBe(true);
    });

    it('should handle empty base path', () => {
      expect(isActive('/', '/', '')).toBe(true);
      expect(isActive('/about', '/about', '')).toBe(true);
    });
  });
});