import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { experimental_AstroContainer as AstroContainer } from 'astro/container';
import Image from '../../components/Image.astro';

describe('Image Component', () => {
  let container;
  
  beforeEach(() => {
    container = AstroContainer.create();
  });

  afterEach(() => {
    vi.unstubAllEnvs();
  });

  describe('Development environment (no base path)', () => {
    beforeEach(() => {
      vi.stubEnv('BASE_URL', '');
    });

    it('should render image with correct src in development', async () => {
      const result = await container.renderToString(Image, {
        props: {
          src: '/images/test.png',
          alt: 'Test image'
        }
      });
      
      expect(result).toContain('src="/images/test.png"');
      expect(result).toContain('alt="Test image"');
    });

    it('should handle external URLs without modification', async () => {
      const result = await container.renderToString(Image, {
        props: {
          src: 'https://example.com/image.png',
          alt: 'External image'
        }
      });
      
      expect(result).toContain('src="https://example.com/image.png"');
    });

    it('should handle relative paths without modification', async () => {
      const result = await container.renderToString(Image, {
        props: {
          src: 'relative/path/image.png',
          alt: 'Relative image'
        }
      });
      
      expect(result).toContain('src="relative/path/image.png"');
    });
  });

  describe('Production environment (with base path)', () => {
    beforeEach(() => {
      vi.stubEnv('BASE_URL', '/watt-media-website');
    });

    it('should add base path to absolute image paths in production', async () => {
      const result = await container.renderToString(Image, {
        props: {
          src: '/images/watt-media-logo.png',
          alt: 'Watt Media Logo'
        }
      });
      
      expect(result).toContain('src="/watt-media-website/images/watt-media-logo.png"');
      expect(result).toContain('alt="Watt Media Logo"');
    });

    it('should handle multiple images with base path', async () => {
      const testCases = [
        { src: '/images/portfolio/branding/logo1.jpg', expected: '/watt-media-website/images/portfolio/branding/logo1.jpg' },
        { src: '/images/services/audio.svg', expected: '/watt-media-website/images/services/audio.svg' },
        { src: '/images/hero-background.png', expected: '/watt-media-website/images/hero-background.png' }
      ];

      for (const testCase of testCases) {
        const result = await container.renderToString(Image, {
          props: {
            src: testCase.src,
            alt: 'Test'
          }
        });
        
        expect(result).toContain(`src="${testCase.expected}"`);
      }
    });

    it('should not add base path to external URLs in production', async () => {
      const result = await container.renderToString(Image, {
        props: {
          src: 'https://example.com/image.png',
          alt: 'External image'
        }
      });
      
      expect(result).toContain('src="https://example.com/image.png"');
      expect(result).not.toContain('/watt-media-website');
    });

    it('should not add base path to relative paths in production', async () => {
      const result = await container.renderToString(Image, {
        props: {
          src: 'assets/image.png',
          alt: 'Relative image'
        }
      });
      
      expect(result).toContain('src="assets/image.png"');
      expect(result).not.toContain('/watt-media-website');
    });
  });

  describe('Image attributes', () => {
    it('should render all provided attributes', async () => {
      const result = await container.renderToString(Image, {
        props: {
          src: '/images/test.png',
          alt: 'Test image',
          class: 'w-full h-auto',
          width: '800',
          height: '600',
          loading: 'eager'
        }
      });
      
      expect(result).toContain('class="w-full h-auto"');
      expect(result).toContain('width="800"');
      expect(result).toContain('height="600"');
      expect(result).toContain('loading="eager"');
    });

    it('should use lazy loading by default', async () => {
      const result = await container.renderToString(Image, {
        props: {
          src: '/images/test.png',
          alt: 'Test image'
        }
      });
      
      expect(result).toContain('loading="lazy"');
    });
  });

  describe('Edge cases', () => {
    it('should handle base path with trailing slash', async () => {
      vi.stubEnv('BASE_URL', '/watt-media-website/');
      
      const result = await container.renderToString(Image, {
        props: {
          src: '/images/test.png',
          alt: 'Test'
        }
      });
      
      expect(result).toContain('src="/watt-media-website/images/test.png"');
      expect(result).not.toContain('//images');
    });

    it('should handle empty base path', async () => {
      vi.stubEnv('BASE_URL', '');
      
      const result = await container.renderToString(Image, {
        props: {
          src: '/images/test.png',
          alt: 'Test'
        }
      });
      
      expect(result).toContain('src="/images/test.png"');
    });

    it('should handle root slash path', async () => {
      vi.stubEnv('BASE_URL', '/');
      
      const result = await container.renderToString(Image, {
        props: {
          src: '/images/test.png',
          alt: 'Test'
        }
      });
      
      expect(result).toContain('src="/images/test.png"');
    });
  });
});