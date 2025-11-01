# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Watt Media Website - A modern, responsive website for a graphic design and multimedia services company in Bass Coast, Victoria, Australia.

## Tech Stack

- **Framework**: Astro 4.16 with file-based routing
- **CSS Framework**: Tailwind CSS 3.5
- **Testing**: Vitest (unit tests), Playwright (E2E tests)
- **Type Checking**: TypeScript 5.7
- **Linting**: ESLint with Astro plugin
- **Development**: Docker (primary) or Nix flakes
- **Package Manager**: npm
- **Deployment**: GitHub Pages to wattmedia.au

## Development Commands

### Docker (Recommended)

```bash
docker compose up     # Start dev server on http://localhost:8080
docker compose down   # Stop server
```

### Nix Alternative

```bash
nix develop          # Enter development shell
dev                  # Start Astro dev server on port 8080
build                # Build for production
run-tests            # Run unit tests with Vitest (watch mode)
run-tests:once       # Run unit tests once (CI mode)
run-tests:e2e        # Run Playwright E2E tests
lint                 # Run ESLint on JS/TS/Astro files
typecheck            # Run TypeScript type checking
format               # Format all code with treefmt
check                # Run all linters and tests
```

### NPM Scripts

```bash
npm run dev          # Start development server on port 8080
npm run build        # Build for production
npm run preview      # Preview production build
npm run test         # Run unit tests with Vitest (watch mode, excludes build-validation)
npm run test:build   # Run build validation test only (validates dist/ output)
npm run test:ui      # Run tests with UI dashboard
npm run test:coverage # Run tests with coverage report
npm run test:e2e     # Run Playwright E2E tests
npm run test:e2e:ui  # Run Playwright tests with UI
npm run test:e2e:install # Install Playwright browsers (run once per machine)
npm run lint         # Run ESLint
npm run lint:fix     # Run ESLint with auto-fix
npm run typecheck    # TypeScript type checking (astro check)
```

### Running Specific Tests

```bash
# Run a specific test file
npm test src/test/components/Image.test.js

# Run Playwright tests for a specific file
npx playwright test e2e/lightbox.spec.ts

# Run tests matching a pattern
npm test -- --grep "Image component"
```

## Pre-commit Checklist

**IMPORTANT**: Always run these commands locally before committing:

```bash
# Run all checks in CI mode (no watch)
npm run lint         # Check code style
npm run typecheck    # Check TypeScript types
CI=true npm test     # Run all unit tests once

# Or run all at once:
npm run lint && npm run typecheck && CI=true npm test
```

The CI/CD pipeline will fail if these checks don't pass.

For the complete coding checklist, refer to `STANDARDS.md`.

## Architecture Patterns

### Component Organization

- **Layouts**: Base layout structure in `src/layouts/`
  - `BaseLayout.astro` - HTML structure with SEO meta tags
  - `MainLayout.astro` - Adds navigation and footer to BaseLayout
- **Components**: Reusable components in `src/components/`
  - `Image.astro` - Handles image paths with base path logic
  - `Link.astro` - Wraps internal links with base path handling
  - `Navigation.astro` - Main site navigation
  - `Footer.astro` - Site footer with social media links
- **Pages**: File-based routing in `src/pages/` - each `.astro` file becomes a route
- **Utilities**: Helper functions in `src/utils/paths.ts` for centralized path management

### Path Handling System

The site uses a centralized path handling system via `src/utils/paths.ts`:

- `addBasePath(url)` - Adds base path to internal URLs
- `isExternalUrl(url)` - Checks for http/https URLs
- `isSpecialUrl(url)` - Checks for mailto/tel links
- `getBasePath()` - Returns the base path from `import.meta.env.BASE_URL`

Components using path handling:
- `Image.astro` - Automatically handles image paths
- `Link.astro` - Wraps all internal links
- Portfolio lightbox JavaScript - Uses dynamic path resolution

### Routing Configuration

- **Development**: Runs on `http://localhost:8080` (configured in astro.config.mjs)
- **Production**: Deployed to `https://wattmedia.au` with base path `/`
- **Static Assets**: Must be placed in `public/` directory
- **Image Organization**: Portfolio images in `public/images/portfolio/{category}/`

## Testing Strategy

### Unit Tests (Vitest)

- Test files: `src/test/**/*.test.js`
- Configuration: `vitest.config.js` with jsdom environment
- Build validation: `src/test/build-validation.test.js` (runs separately)
- Coverage reports: Available via `npm run test:coverage`

### E2E Tests (Playwright)

- Test files: `e2e/**/*.spec.ts`
- Configuration: `playwright.config.ts`
- Tests run against preview server
- Multiple browser configurations: Chrome, Firefox, Safari, Mobile

## Design Standards

### Brand Guidelines

- Primary brand color: `watt-yellow` (#ffee00)
- Text on light backgrounds: `text-gray-800` (avoid yellow for readability)
- Success indicators: `text-green-600`
- Hover states: Yellow accents on dark backgrounds only
- Professional tone: Use "we" language, not first-person "I"

### Social Media Integration

- Facebook: https://www.facebook.com/wattmediaau
- Instagram: @watt_media_au (https://www.instagram.com/watt_media_au)
- Links appear in footer with hover effects

### Service Page Pattern

Each service page (`audio-services.astro`, `branding-identity.astro`, etc.) follows:
1. Hero section with service name
2. Detailed service descriptions with pricing
3. Related services section
4. Call-to-action sections

## Contributor Standards

Refer to [AGENTS.md](./AGENTS.md) for:
- Commit message conventions (Conventional Commits)
- Pull request requirements
- Code style guidelines
- Testing expectations

## Important Constraints

- **DO NOT READ** image files directly - use `file` command to check type
- All static assets must be in `public/` directory
- Hot reload is enabled in both Docker and Nix environments
- Build output goes to `dist/` directory
- Ensure accessibility with proper contrast ratios
