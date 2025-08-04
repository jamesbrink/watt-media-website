# CLAUDE.md

This file provides guidance to Claude Code when working with this repository.

## Project Overview

Watt Media Website - A modern, responsive website for a graphic design and multimedia services company in Bass Coast, Victoria, Australia.

## Tech Stack

- **Framework**: Astro
- **CSS Framework**: Tailwind CSS  
- **Development**: Docker (primary) or Nix flakes

## File Structure

```
src/                    # Source files
├── components/        # Astro components
├── layouts/          # Astro layouts
├── pages/            # Astro pages (file-based routing)
├── css/              # Stylesheets
│   └── main.css     # Tailwind CSS
├── images/          # Image assets
├── old/             # Legacy website (DO NOT MODIFY)
└── public/          # Static assets (robots.txt, sitemap.xml)
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
format              # Format all code
check               # Run all linters
```

## Important Notes

- **DO NOT MODIFY** anything in the `src/old/` directory
- Astro uses file-based routing - pages in `src/pages/` become routes
- Development server runs on port 8080
- Hot reload is enabled in both Docker and Nix environments
- Use professional "we" language, not first-person "I" statements
- Maintain consistent color scheme with good contrast for accessibility

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