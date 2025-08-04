import { describe, it, expect } from "vitest";
import { fileURLToPath } from "url";
import { dirname, join } from "path";
import { existsSync, readFileSync } from "fs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const projectRoot = join(__dirname, "../..");

describe("Astro Configuration", () => {
  it("should have astro.config.mjs file", () => {
    const configPath = join(projectRoot, "astro.config.mjs");
    expect(existsSync(configPath)).toBe(true);
  });

  it("should have correct base path configuration", () => {
    const configPath = join(projectRoot, "astro.config.mjs");
    const config = readFileSync(configPath, "utf-8");
    // Check for conditional base path
    expect(config).toContain(
      "base: process.env.NODE_ENV === 'production' ? '/watt-media-website' : '/'"
    );
    // Check for conditional site URL
    expect(config).toContain(
      "site: process.env.NODE_ENV === 'production' ? 'https://jamesbrink.github.io' : 'http://localhost:8080'"
    );
  });
});

describe("Project Structure", () => {
  it("should have required directories", () => {
    expect(existsSync(join(projectRoot, "src/pages"))).toBe(true);
    expect(existsSync(join(projectRoot, "src/layouts"))).toBe(true);
    expect(existsSync(join(projectRoot, "src/components"))).toBe(true);
    expect(existsSync(join(projectRoot, "public/images"))).toBe(true);
  });

  it("should have all service pages", () => {
    const pages = [
      "index.astro",
      "about.astro",
      "services.astro",
      "portfolio.astro",
      "contact.astro",
      "testimonials.astro",
      "audio-services.astro",
      "branding-identity.astro",
      "print-marketing-design.astro",
      "social-media-design.astro",
      "visual-content-creation.astro"
    ];

    pages.forEach(page => {
      const pagePath = join(projectRoot, "src/pages", page);
      expect(existsSync(pagePath), `Missing page: ${page}`).toBe(true);
    });
  });
});

describe("Public Assets", () => {
  it("should have favicon", () => {
    const faviconPath = join(projectRoot, "public/images/favicon.png");
    expect(existsSync(faviconPath)).toBe(true);
  });

  it("should have logo", () => {
    const logoPath = join(projectRoot, "public/images/watt-media-logo.png");
    expect(existsSync(logoPath)).toBe(true);
  });

  it("should have robots.txt", () => {
    const robotsPath = join(projectRoot, "public/robots.txt");
    expect(existsSync(robotsPath)).toBe(true);
  });
});
