import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { 
  removeTrailingSlash, 
  getBasePath, 
  isExternalUrl, 
  isSpecialUrl, 
  isHashLink, 
  addBasePath 
} from '../../utils/paths';

describe('Path Utilities', () => {
  describe('removeTrailingSlash', () => {
    it('should remove trailing slash from path', () => {
      expect(removeTrailingSlash('/path/')).toBe('/path');
      expect(removeTrailingSlash('/path/to/page/')).toBe('/path/to/page');
    });

    it('should return path unchanged if no trailing slash', () => {
      expect(removeTrailingSlash('/path')).toBe('/path');
      expect(removeTrailingSlash('')).toBe('');
    });
  });

  describe('isExternalUrl', () => {
    it('should identify external URLs', () => {
      expect(isExternalUrl('https://example.com')).toBe(true);
      expect(isExternalUrl('http://example.com')).toBe(true);
      expect(isExternalUrl('https://example.com/path')).toBe(true);
    });

    it('should identify non-external URLs', () => {
      expect(isExternalUrl('/path')).toBe(false);
      expect(isExternalUrl('relative/path')).toBe(false);
      expect(isExternalUrl('mailto:test@example.com')).toBe(false);
    });
  });

  describe('isSpecialUrl', () => {
    it('should identify special URLs', () => {
      expect(isSpecialUrl('mailto:test@example.com')).toBe(true);
      expect(isSpecialUrl('tel:+1234567890')).toBe(true);
    });

    it('should identify non-special URLs', () => {
      expect(isSpecialUrl('https://example.com')).toBe(false);
      expect(isSpecialUrl('/path')).toBe(false);
    });
  });

  describe('isHashLink', () => {
    it('should identify hash links', () => {
      expect(isHashLink('#section')).toBe(true);
      expect(isHashLink('#')).toBe(true);
    });

    it('should identify non-hash links', () => {
      expect(isHashLink('/path#section')).toBe(false);
      expect(isHashLink('path')).toBe(false);
    });
  });

  describe('addBasePath with production environment', () => {
    beforeEach(() => {
      vi.stubEnv('BASE_URL', '/watt-media-website');
    });

    afterEach(() => {
      vi.unstubAllEnvs();
    });

    it('should add base path to absolute paths', () => {
      expect(addBasePath('/images/logo.png')).toBe('/watt-media-website/images/logo.png');
      expect(addBasePath('/about')).toBe('/watt-media-website/about');
      expect(addBasePath('/')).toBe('/watt-media-website/');
    });

    it('should not modify external URLs', () => {
      expect(addBasePath('https://example.com')).toBe('https://example.com');
      expect(addBasePath('http://example.com/path')).toBe('http://example.com/path');
    });

    it('should not modify special URLs', () => {
      expect(addBasePath('mailto:test@example.com')).toBe('mailto:test@example.com');
      expect(addBasePath('tel:+1234567890')).toBe('tel:+1234567890');
    });

    it('should not modify hash links', () => {
      expect(addBasePath('#section')).toBe('#section');
    });

    it('should not modify relative paths', () => {
      expect(addBasePath('relative/path')).toBe('relative/path');
      expect(addBasePath('image.png')).toBe('image.png');
    });

    it('should handle base path with trailing slash', () => {
      vi.stubEnv('BASE_URL', '/watt-media-website/');
      expect(addBasePath('/images/logo.png')).toBe('/watt-media-website/images/logo.png');
    });
  });

  describe('addBasePath with development environment', () => {
    beforeEach(() => {
      vi.stubEnv('BASE_URL', '');
    });

    afterEach(() => {
      vi.unstubAllEnvs();
    });

    it('should not add base path in development', () => {
      expect(addBasePath('/images/logo.png')).toBe('/images/logo.png');
      expect(addBasePath('/about')).toBe('/about');
    });

    it('should handle root base path', () => {
      vi.stubEnv('BASE_URL', '/');
      expect(addBasePath('/images/logo.png')).toBe('/images/logo.png');
    });
  });

  describe('getBasePath', () => {
    afterEach(() => {
      vi.unstubAllEnvs();
    });

    it('should return base path without trailing slash', () => {
      vi.stubEnv('BASE_URL', '/watt-media-website/');
      expect(getBasePath()).toBe('/watt-media-website');
    });

    it('should return empty string when no base path', () => {
      vi.stubEnv('BASE_URL', '');
      expect(getBasePath()).toBe('');
    });

    it('should handle undefined BASE_URL', () => {
      // Don't stub BASE_URL, let it be naturally undefined
      vi.unstubAllEnvs();
      expect(getBasePath()).toBe('');
    });
  });
});