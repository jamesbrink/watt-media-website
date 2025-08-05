import { describe, it, expect } from 'vitest';
import {
  removeTrailingSlash,
  isExternalUrl,
  isSpecialUrl,
  isHashLink
} from '../../utils/paths';

describe('Path Utilities', () => {
  describe('removeTrailingSlash', () => {
    it('should remove trailing slash', () => {
      expect(removeTrailingSlash('/path/')).toBe('/path');
      expect(removeTrailingSlash('/path/to/page/')).toBe('/path/to/page');
    });

    it('should return path unchanged if no trailing slash', () => {
      expect(removeTrailingSlash('/path')).toBe('/path');
      expect(removeTrailingSlash('')).toBe('');
    });
  });

  // Skip getBasePath test as it depends on import.meta.env which is not available in tests

  describe('isExternalUrl', () => {
    it('should identify external URLs', () => {
      expect(isExternalUrl('http://example.com')).toBe(true);
      expect(isExternalUrl('https://example.com')).toBe(true);
      expect(isExternalUrl('http://localhost:3000')).toBe(true);
    });

    it('should return false for internal URLs', () => {
      expect(isExternalUrl('/about')).toBe(false);
      expect(isExternalUrl('about')).toBe(false);
      expect(isExternalUrl('#section')).toBe(false);
      expect(isExternalUrl('mailto:test@example.com')).toBe(false);
    });
  });

  describe('isSpecialUrl', () => {
    it('should identify special URLs', () => {
      expect(isSpecialUrl('mailto:test@example.com')).toBe(true);
      expect(isSpecialUrl('tel:+1234567890')).toBe(true);
    });

    it('should return false for regular URLs', () => {
      expect(isSpecialUrl('http://example.com')).toBe(false);
      expect(isSpecialUrl('/about')).toBe(false);
      expect(isSpecialUrl('#section')).toBe(false);
    });
  });

  describe('isHashLink', () => {
    it('should identify hash links', () => {
      expect(isHashLink('#section')).toBe(true);
      expect(isHashLink('#top')).toBe(true);
    });

    it('should return false for non-hash links', () => {
      expect(isHashLink('/about')).toBe(false);
      expect(isHashLink('http://example.com')).toBe(false);
      expect(isHashLink('/page#section')).toBe(false);
    });
  });

  // Skip addBasePath tests as it depends on import.meta.env which is not available in tests
  // These functions are tested through integration tests and manual testing
});