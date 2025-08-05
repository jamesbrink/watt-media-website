import { describe, it, beforeAll } from 'vitest';
import { promises as fs } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { execSync } from 'child_process';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

describe('Build Validation', () => {
  const distDir = path.join(__dirname, '../../dist');
  
  beforeAll(async () => {
    // Skip build in CI since it's already built
    if (process.env.CI) {
      console.log('Running in CI, using existing build...');
      return;
    }
    
    // Ensure we have a fresh build locally
    console.log('Building project for validation...');
    execSync('NODE_ENV=production npm run build', { 
      stdio: 'inherit',
      cwd: path.join(__dirname, '../..'),
      env: { ...process.env, NODE_ENV: 'production' }
    });
  });

  it('should have correct image paths in production build', async () => {
    const errors = [];
    
    async function checkHtmlFiles(dir) {
      const entries = await fs.readdir(dir, { withFileTypes: true });
      
      for (const entry of entries) {
        const fullPath = path.join(dir, entry.name);
        
        if (entry.isDirectory()) {
          await checkHtmlFiles(fullPath);
        } else if (entry.name.endsWith('.html')) {
          const content = await fs.readFile(fullPath, 'utf-8');
          
          // Find all image sources
          const imgSrcRegex = /<img[^>]*src=["']([^"']+)["'][^>]*>/g;
          let match;
          
          while ((match = imgSrcRegex.exec(content)) !== null) {
            const src = match[1];
            
            // Check if it's a local image that should have base path
            if (src.startsWith('/images/')) {
              // In production, should start with /watt-media-website/images/
              errors.push({
                file: path.relative(distDir, fullPath),
                src: src,
                issue: 'Missing base path in production'
              });
            } else if (src.startsWith('/') && 
                      !src.startsWith('/watt-media-website/') && 
                      src.includes('/images/')) {
              // Any other absolute path with images that doesn't have base path
              errors.push({
                file: path.relative(distDir, fullPath),
                src: src,
                issue: 'Incorrect base path'
              });
            }
          }
          
          // Also check for broken base paths (double slashes, missing slashes)
          const brokenPathRegex = /(?:href|src)=["']([^"']*watt-media-website[^/][^"']*images[^"']+)["']/g;
          while ((match = brokenPathRegex.exec(content)) !== null) {
            const path = match[1];
            errors.push({
              file: path.relative(distDir, fullPath),
              src: path,
              issue: 'Malformed base path (missing slash)'
            });
          }
        }
      }
    }
    
    await checkHtmlFiles(distDir);
    
    if (errors.length > 0) {
      const errorMessage = errors.map(e => 
        `${e.file}: ${e.src} - ${e.issue}`
      ).join('\n');
      
      throw new Error(
        `Found ${errors.length} image path issues in production build:\n${errorMessage}\n\n` +
        'All local images must use the Image component to ensure proper base path handling.'
      );
    }
  });

  it('should have valid favicon path in production', async () => {
    const indexPath = path.join(distDir, 'index.html');
    const content = await fs.readFile(indexPath, 'utf-8');
    
    // Check favicon
    const faviconMatch = content.match(/<link[^>]*rel=["']icon["'][^>]*href=["']([^"']+)["']/);
    if (faviconMatch) {
      const faviconPath = faviconMatch[1];
      if (!faviconPath.startsWith('/watt-media-website/')) {
        throw new Error(
          `Favicon has incorrect path in production: ${faviconPath}\n` +
          'Expected: /watt-media-website/images/favicon.png'
        );
      }
    }
  });

  it('should not have any absolute paths without base path', async () => {
    const errors = [];
    
    async function checkHtmlFiles(dir) {
      const entries = await fs.readdir(dir, { withFileTypes: true });
      
      for (const entry of entries) {
        const fullPath = path.join(dir, entry.name);
        
        if (entry.isDirectory()) {
          await checkHtmlFiles(fullPath);
        } else if (entry.name.endsWith('.html')) {
          const content = await fs.readFile(fullPath, 'utf-8');
          
          // Find all href and src attributes with absolute paths
          const pathRegex = /(?:href|src)=["'](\/[^"']+)["']/g;
          let match;
          
          while ((match = pathRegex.exec(content)) !== null) {
            const path = match[1];
            
            // Skip external URLs, hashes, and already correct paths
            if (path.startsWith('//') || 
                path.startsWith('/#') ||
                path.startsWith('/watt-media-website/') ||
                path === '/') {
              continue;
            }
            
            // Any other absolute path should be flagged
            errors.push({
              file: path.relative(distDir, fullPath),
              path: match[1],
              context: match[0]
            });
          }
        }
      }
    }
    
    await checkHtmlFiles(distDir);
    
    if (errors.length > 0) {
      const errorMessage = errors.map(e => 
        `${e.file}: ${e.context}`
      ).join('\n');
      
      throw new Error(
        `Found ${errors.length} absolute paths without base path in production:\n${errorMessage}\n\n` +
        'Use the Link component for navigation and Image component for images.'
      );
    }
  });
});