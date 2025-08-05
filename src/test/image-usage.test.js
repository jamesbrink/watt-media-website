import { describe, it } from 'vitest';
import { promises as fs } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

describe('Image Usage', () => {
  it('should use Image component for all static images in Astro files', async () => {
    const srcDir = path.join(__dirname, '../../src');
    const errors = [];
    
    async function checkDirectory(dir) {
      const entries = await fs.readdir(dir, { withFileTypes: true });
      
      for (const entry of entries) {
        const fullPath = path.join(dir, entry.name);
        
        if (entry.isDirectory() && !entry.name.startsWith('.')) {
          await checkDirectory(fullPath);
        } else if (entry.isFile() && entry.name.endsWith('.astro')) {
          const content = await fs.readFile(fullPath, 'utf-8');
          const lines = content.split('\n');
          
          // Skip if it's the Image component itself
          if (fullPath.includes('components/Image.astro')) {
            continue;
          }
          
          // Check for any <img or <Image tags with absolute paths
          lines.forEach((line, index) => {
            // First check for <img tags (case insensitive)
            const imgMatch = line.match(/<img\s/i);
            if (imgMatch) {
              // Extract the src attribute
              const srcMatch = line.match(/src=["']([^"']+)["']/);
              if (srcMatch && srcMatch[1].startsWith('/')) {
                // Skip if it's in a script tag or is the lightbox image
                const trimmedLine = line.trim();
                if (trimmedLine.includes('lightbox') || 
                    trimmedLine.includes('id="lightbox-img"') ||
                    content.substring(0, content.indexOf(line)).includes('<script')) {
                  return;
                }
                
                const relativePath = path.relative(srcDir, fullPath);
                errors.push({
                  file: relativePath,
                  line: index + 1,
                  content: line.trim(),
                  type: 'img-tag'
                });
              }
            }
            
            // Also check <Image tags to ensure they have proper imports
            const imageMatch = line.match(/<Image\s/);
            if (imageMatch && !content.includes('import Image from')) {
              const relativePath = path.relative(srcDir, fullPath);
              errors.push({
                file: relativePath,
                line: index + 1,
                content: line.trim(),
                type: 'missing-import'
              });
            }
          });
        }
      }
    }
    
    await checkDirectory(srcDir);
    
    if (errors.length > 0) {
      const imgTagErrors = errors.filter(e => e.type === 'img-tag');
      const importErrors = errors.filter(e => e.type === 'missing-import');
      
      let errorMessage = '';
      
      if (imgTagErrors.length > 0) {
        errorMessage += `Found ${imgTagErrors.length} <img> tags that should use the Image component:\n`;
        errorMessage += imgTagErrors.map(e => `${e.file}:${e.line} - ${e.content}`).join('\n');
        errorMessage += '\n\nReplace <img src="/..." with <Image src="/..." and import the Image component.\n\n';
      }
      
      if (importErrors.length > 0) {
        errorMessage += `Found ${importErrors.length} files using Image component without importing it:\n`;
        errorMessage += [...new Set(importErrors.map(e => e.file))].join('\n');
      }
      
      throw new Error(errorMessage);
    }
  });

  it('should import Image component when using it', async () => {
    const srcDir = path.join(__dirname, '../../src');
    const errors = [];
    
    async function checkDirectory(dir) {
      const entries = await fs.readdir(dir, { withFileTypes: true });
      
      for (const entry of entries) {
        const fullPath = path.join(dir, entry.name);
        
        if (entry.isDirectory() && !entry.name.startsWith('.')) {
          await checkDirectory(fullPath);
        } else if (entry.isFile() && entry.name.endsWith('.astro')) {
          const content = await fs.readFile(fullPath, 'utf-8');
          
          // Skip if it's the Image component itself
          if (fullPath.includes('components/Image.astro')) {
            continue;
          }
          
          // Check if file uses <Image but doesn't import it
          if (content.includes('<Image ') && !content.includes("import Image from")) {
            const relativePath = path.relative(srcDir, fullPath);
            errors.push(relativePath);
          }
        }
      }
    }
    
    await checkDirectory(srcDir);
    
    if (errors.length > 0) {
      throw new Error(
        `Found ${errors.length} files using Image component without importing it:\n${errors.join('\n')}`
      );
    }
  });
});