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
            
            // With custom domain, images should start with /images/ (no base path needed)
            // Check for any lingering base path references that shouldn't be there
            if (src.includes('/watt-media-website/')) {
              errors.push({
                file: path.relative(distDir, fullPath),
                src: src,
                issue: 'Unexpected base path with custom domain'
              });
            }
            // Images should either be absolute (/images/) or external (http/https)
            else if (src.startsWith('../') || src.startsWith('./')) {
              errors.push({
                file: path.relative(distDir, fullPath),
                src: src,
                issue: 'Relative paths should not be used'
              });
            }
          }
          
          // Check for broken paths (double slashes, etc)
          const brokenPathRegex = /(?:href|src)=["']([^"']*\/\/[^"']+)["']/g;
          while ((match = brokenPathRegex.exec(content)) !== null) {
            const srcPath = match[1];
            // Ignore external URLs with protocol
            if (!srcPath.startsWith('http://') && !srcPath.startsWith('https://')) {
              errors.push({
                file: path.relative(distDir, fullPath),
                src: srcPath,
                issue: 'Malformed path (double slashes)'
              });
            }
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
        'Images should use absolute paths starting with /images/ for custom domain setup.'
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
      // With custom domain, favicon should be at /images/favicon.png (no base path)
      if (!faviconPath.startsWith('/images/')) {
        throw new Error(
          `Favicon has incorrect path in production: ${faviconPath}\n` +
          'Expected: /images/favicon.png (for custom domain)'
        );
      }
    }
  });

  it('should not have any broken absolute paths', async () => {
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
            const foundPath = match[1];
            
            // Skip external URLs, hashes, root path
            if (foundPath.startsWith('//') || 
                foundPath.startsWith('/#') ||
                foundPath === '/') {
              continue;
            }
            
            // With custom domain, we shouldn't have /watt-media-website/ prefix
            if (foundPath.includes('/watt-media-website/')) {
              errors.push({
                file: path.relative(distDir, fullPath),
                foundPath: foundPath,
                context: match[0]
              });
            }
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
        `Found ${errors.length} paths with unexpected base path in production:\n${errorMessage}\n\n` +
        'Custom domain should not use /watt-media-website/ base path.'
      );
    }
  });
});