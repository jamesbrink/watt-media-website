# wattmedia.au

A modern, responsive website for wattmedia.au - graphic design and multimedia services in Bass Coast, Victoria, Australia.

## 🌟 Features

- Professional branding and design services portfolio
- Responsive design optimized for all devices
- Service-specific pages for detailed information
- Portfolio gallery with lightbox functionality
- Social media integration (Facebook and Instagram)
- Accessible and SEO-friendly markup
- Fast loading with optimized assets
- Built with Astro for optimal performance

## 🚀 Quick Start with Docker

[Docker](https://www.docker.com/) is the easiest way to run this project. Docker creates a consistent development environment on any computer.

### Prerequisites

- Install [Docker Desktop](https://www.docker.com/products/docker-desktop/)
  - For Windows: [Download Docker Desktop for Windows](https://docs.docker.com/desktop/install/windows-install/)
  - For Mac: [Download Docker Desktop for Mac](https://docs.docker.com/desktop/install/mac-install/)
  - For Linux: [Install Docker Engine](https://docs.docker.com/engine/install/)

### Running the Website

```bash
# Clone the repository
git clone <repository-url>
cd watt-media-website

# Start development server
docker compose up

# Visit http://localhost:8080 in your browser
```

To stop the server, press `Ctrl+C` in the terminal, then run:

```bash
docker compose down
```

## 🔧 Alternative: Nix Development

[Nix](https://nixos.org/) is a powerful package manager that ensures everyone has the exact same development environment.

### Installing Nix

**For macOS and Linux:**

```bash
# Install Nix (works on Intel and Apple Silicon Macs)
sh <(curl -L https://nixos.org/nix/install)

# Enable flakes (required for this project)
echo "experimental-features = nix-command flakes" >> ~/.config/nix/nix.conf
```

**For Windows:**

- Use [WSL2](https://learn.microsoft.com/en-us/windows/wsl/install) and follow the Linux instructions
- Or use [Determinate Systems Nix Installer](https://determinate.systems/posts/determinate-nix-installer)

### Using Nix

```bash
# Enter the development environment
nix develop

# Start the development server
dev

# The website will be available at http://localhost:8080
```

### Useful Commands

- `dev` - Start the Astro development server with hot reload
- `build` - Build the website for production
- `run-tests` - Run the test suite (watch mode)
- `run-tests:once` - Run unit tests once (CI mode)
- `run-tests:e2e` - Run Playwright E2E tests
- `lint` - Check code quality with ESLint
- `typecheck` - Run TypeScript type checking
- `format` - Format all code with treefmt
- `check` - Run all linters and tests
- `exit` - Leave the Nix development environment

## 📁 Project Structure

```
watt-media-website/
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
├── GitHub Actions
│   └── .github/workflows/
│       ├── ci-cd.yml          # CI/CD pipeline with tests
│       ├── claude.yml         # Claude Code integration
│       └── claude-code-review.yml # Claude code review
├── CLAUDE.md                  # Instructions for Claude Code
└── README.md                  # This file
```

## 🎨 Services Offered

The website showcases the following services:

### Branding & Identity

- Logo design
- Complete brand packages
- Business cards
- Brand voice and messaging

### Print & Marketing Design

- Brochures and flyers
- Signage and banners
- Packaging design
- Marketing materials

### Social Media Design

- Social media posts
- Instagram stories
- Facebook ads
- Profile graphics

### Visual Content Creation

- Professional photography
- Video production
- Photo editing and retouching
- Event photography

### Audio Services

- Podcast editing
- Voiceover recording
- Audio mixing & mastering
- Custom music and jingles

## 🛠️ Technologies Used

- **[Astro](https://astro.build/)** - Modern static site generator
- **[Tailwind CSS](https://tailwindcss.com/)** - Utility-first CSS framework
- **[Docker](https://www.docker.com/)** - Containerization for consistent development
- **[Nix](https://nixos.org/)** - Reproducible development environments
- **[TypeScript](https://www.typescriptlang.org/)** - Type-safe JavaScript
- **[Vitest](https://vitest.dev/)** - Fast unit testing framework
- **[Playwright](https://playwright.dev/)** - End-to-end testing framework

## 📝 Making Changes

### Editing Content

1. All website pages are in the `src/pages/` folder
2. Open any `.astro` file in a text editor
3. Make your changes
4. Save the file
5. The browser will automatically refresh to show your changes

### Common Edits

**Changing Text:**

```astro
<!-- Find text like this -->
<p>Old text here</p>

<!-- Change it to -->
<p>Your new text here</p>
```

**Updating Prices:**

```astro
<!-- Look for price text -->
<span class="text-xl font-bold text-gray-800">$100 AUD</span>

<!-- Update the amount -->
<span class="text-xl font-bold text-gray-800">$150 AUD</span>
```

**Changing Images:**

1. Add your new image to `public/images/`
2. Update the image path in the Astro file using the Image component:

```astro
<Image src="/images/your-new-image.png" alt="Description of image" />
```

### Important Guidelines

- ✅ Use "we" instead of "I" in all text
- ✅ Keep file names lowercase (e.g., `about.astro` not `About.astro`)
- ✅ All static assets go in `public/` directory
- ✅ Test all changes in your browser before deploying
- ✅ Run `npm run lint` and `npm run typecheck` before committing

## 🧪 Testing

Run the test suite:

```bash
# Unit tests with Vitest
npm run test

# E2E tests with Playwright
npm run test:e2e

# Run all tests
npm run test:all
```

With Docker:

```bash
docker compose run --rm web npm test
```

With Nix:

```bash
nix develop -c npm test
```

## 🏗️ Building for Production

When you're ready to publish the website:

### With Docker

```bash
docker compose run --rm web npm run build
```

### With Nix

```bash
nix develop -c npm run build
```

The built website will be in the `dist/` folder, ready to upload to your web hosting.

## 🚀 GitHub Pages Deployment

This repository is configured for automatic deployment to GitHub Pages. Every push to the `main` branch triggers a build and deploy.

### Automatic Deployment

The site uses GitHub Actions for CI/CD:

- **Automatic builds** on every push to main
- **Test suite** runs before deployment
- **Static site generation** using Astro
- **Automatic sitemap generation** for SEO
- **Free SSL certificate** included by default
- **Available at**: `https://jamesbrink.github.io/watt-media-website/`

### Base Path Configuration

The site automatically handles different base paths:

- **Development**: `/` (no base path)
- **Production**: `/watt-media-website` (for GitHub Pages)

This is configured in:

- `astro.config.mjs` - Site and base configuration
- `src/components/Image.astro` - Image path handling
- Portfolio lightbox JavaScript - Dynamic path resolution

### Custom Domain Setup

To use a custom domain (e.g., wattmedia.au):

1. **In your repository**:
   - Create a file `public/CNAME` with your domain: `wattmedia.au`
   - Update `astro.config.mjs`: change `site` and remove `base`

2. **In GitHub**:
   - Go to Settings → Pages
   - Under "Custom domain", enter your domain
   - Check "Enforce HTTPS" (SSL is free and automatic)

3. **With your domain registrar**:
   - For apex domain (wattmedia.au):
     ```
     A     185.199.108.153
     A     185.199.109.153
     A     185.199.110.153
     A     185.199.111.153
     ```
   - For www subdomain:
     ```
     CNAME www.wattmedia.au -> jamesbrink.github.io
     ```

4. **Wait for DNS propagation** (can take up to 24 hours)

### Resources

- [GitHub Pages Documentation](https://docs.github.com/en/pages)
- [Custom Domain Setup Guide](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site)
- [Astro Deployment Guide](https://docs.astro.build/en/guides/deploy/github/)

### Deployment Status

You can check the deployment status:

1. Go to the repository on GitHub
2. Click the "Actions" tab
3. View the latest "Deploy to GitHub Pages" workflow

## 🌐 Social Media

The website includes links to:

- Facebook: https://www.facebook.com/wattmediaau
- Instagram: @watt_media_au

These appear in the footer of every page.

## 🐛 Troubleshooting

### "Port 8080 is already in use"

Another program is using port 8080. Either:

1. Stop the other program, or
2. Change the port in `docker-compose.yml` and run commands

### "Cannot find module"

Run these commands:

```bash
# With Docker
docker compose run --rm web npm install

# With Nix
nix develop -c npm install
```

### Changes not showing

1. Hard refresh your browser: `Ctrl+Shift+R` (Windows/Linux) or `Cmd+Shift+R` (Mac)
2. Clear browser cache
3. Make sure the development server is running

### Docker not starting

1. Make sure Docker Desktop is running
2. Try: `docker compose down` then `docker compose up --build`

### TypeScript errors

Run type checking to see detailed errors:

```bash
npm run typecheck
```

### Image path issues

The Image component automatically handles base paths for different environments. Always use:

```astro
<Image src="/images/your-image.png" alt="Description" />
```

## 📞 Support

For technical issues with the website, consult:

- [Astro Documentation](https://docs.astro.build/)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Docker Documentation](https://docs.docker.com/)
- [Nix Documentation](https://nixos.org/learn.html)

## 📄 License

© 2025 Watt Media. All rights reserved.
