# CLAUDE.md

This file provides guidance to Claude Code when working with this repository.

## Project Overview

Watt Media Website - A modern, responsive website for a graphic design and multimedia services company in Bass Coast, Victoria, Australia.

## Tech Stack

- **Framework**: Astro 5.2.4
- **CSS Framework**: Tailwind CSS 3.5.7
- **Testing**: Vitest 2.2.7
- **Type Checking**: TypeScript 5.7.2
- **Linting**: ESLint with Astro plugin
- **Development**: Docker (primary) or Nix flakes

## File Structure

```
src/                    # Source files
├── components/        # Reusable Astro components
├── layouts/          # Page layouts
│   └── BaseLayout.astro
├── pages/            # Astro pages (file-based routing)
│   ├── index.astro
│   ├── about.astro
│   ├── services.astro
│   ├── portfolio.astro
│   ├── contact.astro
│   ├── testimonials.astro
│   └── [service pages].astro
├── css/              # Stylesheets
│   └── main.css     # Tailwind CSS imports
├── test/             # Test files
│   └── setup.js
└── old/             # Legacy website (DO NOT MODIFY)

public/                # Static assets (served as-is)
├── images/           # All images
│   └── portfolio/   # Portfolio images by category
├── robots.txt       # SEO configuration
├── sitemap.xml      # Sitemap for search engines
└── llms.txt         # Instructions for LLMs
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
build               # Build for production
test                 # Run tests with Vitest
lint                # Run ESLint on JS/TS/Astro files
typecheck            # Run TypeScript type checking
```

### NPM Scripts
```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run test         # Run tests
npm run lint         # Run ESLint
npm run typecheck    # TypeScript type checking
```

## Important Notes

- **DO NOT MODIFY** anything in the `src/old/` directory
- **DO NOT READ** image files directly - use `file` command to check their type
- Astro uses file-based routing - pages in `src/pages/` become routes
- All static assets must be in `public/` directory
- Development server runs on port 8080
- Hot reload is enabled in both Docker and Nix environments
- Use professional "we" language, not first-person "I" statements
- Maintain consistent color scheme with good contrast for accessibility
- Run `npm run lint` and `npm run typecheck` before committing

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