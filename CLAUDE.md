# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Watt Media Website - A modern, responsive website for a graphic design and multimedia services company in Bass Coast, Victoria, Australia.

## Tech Stack

- **Framework**: Astro 4.16
- **CSS Framework**: Tailwind CSS 3.5
- **Testing**: Vitest (unit tests), Playwright (E2E tests)
- **Type Checking**: TypeScript 5.7
- **Linting**: ESLint with Astro plugin
- **Development**: Docker (primary) or Nix flakes
- **Package Manager**: npm
- **Deployment**: GitHub Pages

## Project Structure

```
.
├── e2e/                        # Playwright end-to-end tests
│   └── lightbox.spec.ts       # Portfolio lightbox tests
├── public/                     # Static assets (served directly)
│   ├── images/                # All website images
│   │   ├── portfolio/         # Portfolio images organized by category
│   │   │   ├── branding/      # Logo and brand identity work
│   │   │   ├── creative-art/  # Creative artwork projects
│   │   │   ├── marketing/     # Marketing campaign designs
│   │   │   ├── packaging/     # Product packaging designs
│   │   │   └── product-design/# Product design mockups
│   │   └── *.svg/jpg/png      # Service images and branding assets
│   ├── robots.txt             # SEO robots configuration
│   ├── sitemap.xml            # XML sitemap for search engines
│   └── llms.txt               # LLM-specific instructions
├── src/                        # Source files
│   ├── components/            # Reusable Astro components
│   │   ├── ErrorBoundary.astro    # Error handling component
│   │   ├── Footer.astro           # Site footer with social links
│   │   ├── Image.astro            # Image component with base path handling
│   │   └── Navigation.astro       # Main navigation menu
│   ├── css/                   # Global stylesheets
│   │   └── main.css           # Tailwind CSS directives and custom styles
│   ├── layouts/               # Page layouts
│   │   ├── BaseLayout.astro   # Base HTML structure with SEO
│   │   └── MainLayout.astro   # Main site layout with nav/footer
│   ├── pages/                 # File-based routing (routes match filenames)
│   │   ├── index.astro        # Homepage
│   │   ├── about.astro        # About page
│   │   ├── services.astro     # Services overview
│   │   ├── portfolio.astro    # Portfolio gallery with lightbox
│   │   ├── contact.astro      # Contact form page
│   │   ├── testimonials.astro # Client testimonials
│   │   ├── audio-services.astro           # Audio production service
│   │   ├── branding-identity.astro        # Branding service
│   │   ├── print-marketing-design.astro   # Print design service
│   │   ├── social-media-design.astro      # Social media service
│   │   └── visual-content-creation.astro  # Visual content service
│   ├── test/                  # Unit tests
│   │   ├── components/        # Component tests
│   │   ├── astro.test.js      # Astro configuration tests
│   │   ├── images.test.js     # Image integrity tests
│   │   └── setup.js           # Test configuration
│   └── env.d.ts               # TypeScript environment types
├── Configuration Files
│   ├── astro.config.mjs       # Astro configuration (site, base, integrations)
│   ├── tailwind.config.js     # Tailwind CSS configuration
│   ├── postcss.config.js      # PostCSS configuration
│   ├── vitest.config.js       # Vitest test runner configuration
│   ├── playwright.config.ts   # Playwright E2E test configuration
│   ├── tsconfig.json          # TypeScript configuration
│   ├── .eslintrc.cjs          # ESLint linting rules
│   ├── .prettierrc.json       # Prettier code formatting
│   └── .stylelintrc.json      # Stylelint CSS linting
├── Docker Files
│   ├── docker-compose.yml     # Docker Compose for development
│   ├── Dockerfile             # Production Docker image
│   └── Dockerfile.dev         # Development Docker image with hot reload
├── Nix Files
│   ├── flake.nix              # Nix flake configuration
│   └── flake.lock             # Nix flake lock file
└── GitHub Actions
    └── .github/workflows/
        ├── ci-cd.yml          # CI/CD pipeline with tests
        ├── claude.yml         # Claude Code integration
        └── claude-code-review.yml # Claude code review

```

## Development Commands

### Docker (Recommended)

```bash
docker compose up     # Start dev server on http://localhost:8080
docker compose down   # Stop server
```

### Nix Alternative

```bash
nix develop          # Enter development shell
dev                  # Start Astro dev server
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
npm run dev          # Start development server on port 4321
npm run build        # Build for production
npm run preview      # Preview production build on port 4321
npm run test         # Run unit tests with Vitest (watch mode)
npm run test:ui      # Run tests with UI dashboard
npm run test:coverage # Run tests with coverage report
npm run test:e2e     # Run Playwright E2E tests
npm run test:e2e:ui  # Run Playwright tests with UI
npm run lint         # Run ESLint
npm run lint:fix     # Run ESLint with auto-fix
npm run typecheck    # TypeScript type checking
```

## Important Notes

- **DO NOT READ** image files directly - use `file` command to check their type
- Astro uses file-based routing - pages in `src/pages/` become routes
- All static assets must be in `public/` directory (not `src/`)
- Development server runs on port 8080
- Hot reload is enabled in both Docker and Nix environments
- Use professional "we" language, not first-person "I" statements
- Maintain consistent color scheme with good contrast for accessibility
- The Image component handles base path for both dev and production environments

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

If any of these fail, fix the issues before committing. The CI/CD pipeline will fail if these checks don't pass.

## Design Standards

### Colors

- Primary brand color: `watt-yellow` (#ffee00)
- Text on light backgrounds: `text-gray-800` (not yellow)
- Success indicators (checkboxes): `text-green-600`
- Hover states: Yellow accents on dark backgrounds only

### Social Media

- Facebook: https://www.facebook.com/wattmediaau
- Instagram: @watt_media_au (https://www.instagram.com/watt_media_au)
- Links appear in footer with hover effects

### Services Structure

Each service page follows a consistent pattern:

- Hero section with service name
- Detailed service descriptions with pricing
- Related services section
- Call-to-action sections

## Architecture Patterns

### Component Organization

- **Layouts**: Base layout structure in `src/layouts/` - BaseLayout handles HTML/SEO, MainLayout adds nav/footer
- **Components**: Reusable components in `src/components/` - Image and Link components handle base path logic
- **Pages**: File-based routing in `src/pages/` - each file becomes a route
- **Utilities**: Helper functions in `src/utils/paths.ts` for path management

### Path Handling

The site uses a centralized path handling system:

- `src/utils/paths.ts` - Core path utilities (addBasePath, isExternalUrl, etc.)
- `src/components/Link.astro` - Wraps all internal links with base path handling
- `src/components/Image.astro` - Handles image paths for different environments
- Portfolio lightbox uses dynamic path resolution via `import.meta.env.BASE_URL`

### Base Path Configuration

The site uses conditional base paths:

- Development: `/` (no base path) - runs on port 4321 locally
- Production: `/watt-media-website` (for GitHub Pages)

This is handled automatically in:

- `astro.config.mjs` - Site and base configuration
- `src/components/Image.astro` - Image path handling
- Portfolio lightbox JavaScript - Dynamic path resolution

## Testing Strategy

### Unit Tests (Vitest)

- Test files: `src/test/**/*.test.js`
- Configuration: `vitest.config.js`
- Environment: jsdom
- Run specific test file: `npm test src/test/components/Image.test.js`

### E2E Tests (Playwright)

- Test files: `e2e/**/*.spec.ts`
- Configuration: `playwright.config.ts`
- Tests run against preview server (port 4321)
- Multiple browser configurations: Chrome, Firefox, Safari, Mobile
