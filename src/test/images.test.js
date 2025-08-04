import { describe, it, expect } from "vitest";
import { fileURLToPath } from "url";
import { dirname, join } from "path";
import { readdirSync, statSync, readFileSync } from "fs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const projectRoot = join(__dirname, "../..");
const imagesDir = join(projectRoot, "public/images");

describe("Image Files Integrity", () => {
  it("should not contain ASCII text files masquerading as images", () => {
    const checkDirectory = dir => {
      const files = readdirSync(dir);

      files.forEach(file => {
        const fullPath = join(dir, file);
        const stat = statSync(fullPath);

        if (stat.isDirectory()) {
          checkDirectory(fullPath);
        } else if (file.match(/\.(jpg|jpeg|png|gif|webp)$/i)) {
          // Read first few bytes to check file signature
          const buffer = readFileSync(fullPath);
          const firstBytes = buffer.slice(0, 20);

          // Check for common image file signatures
          const isPNG =
            buffer[0] === 0x89 && buffer[1] === 0x50 && buffer[2] === 0x4e && buffer[3] === 0x47;
          const isJPEG = buffer[0] === 0xff && buffer[1] === 0xd8 && buffer[2] === 0xff;
          const isGIF = buffer[0] === 0x47 && buffer[1] === 0x49 && buffer[2] === 0x46;

          // If it starts with printable ASCII characters, it's likely corrupted
          const isASCII = firstBytes.every(byte => byte >= 32 && byte <= 126);

          expect(
            isPNG || isJPEG || isGIF || !isASCII,
            `Image file ${file} appears to be corrupted (contains ASCII text)`
          ).toBe(true);
        }
      });
    };

    checkDirectory(imagesDir);
  });

  it("should have reasonable file sizes for images", () => {
    const checkDirectory = dir => {
      const files = readdirSync(dir);

      files.forEach(file => {
        const fullPath = join(dir, file);
        const stat = statSync(fullPath);

        if (stat.isDirectory()) {
          checkDirectory(fullPath);
        } else if (file.match(/\.(jpg|jpeg|png|gif|webp)$/i)) {
          // Images should be larger than 1KB (anything smaller is likely corrupted)
          expect(
            stat.size > 1024,
            `Image file ${file} is suspiciously small (${stat.size} bytes)`
          ).toBe(true);

          // Warn if images are larger than 5MB
          if (stat.size > 5 * 1024 * 1024) {
            console.warn(`Warning: ${file} is large (${(stat.size / 1024 / 1024).toFixed(2)} MB)`);
          }
        }
      });
    };

    checkDirectory(imagesDir);
  });
});
