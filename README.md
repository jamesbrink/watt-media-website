# wattmedia.au

A modern, responsive website for wattmedia.au - graphic design and multimedia services in Bass Coast, Victoria, Australia.

## 🌟 Features

- Professional branding and design services portfolio
- Responsive design optimized for all devices
- Service-specific pages for detailed information
- Social media integration (Facebook and Instagram)
- Accessible and SEO-friendly markup
- Fast loading with optimized assets

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

### Useful Nix Commands
- `dev` - Start the development server with hot reload
- `build` - Build the website for production
- `format` - Auto-format all code files
- `check` - Run linters to check code quality
- `exit` - Leave the Nix development environment

## 📁 Project Structure

```
watt-media-website/
├── src/                      # All website source files
│   ├── index.html           # Homepage
│   ├── about.html           # About page
│   ├── services.html        # Services overview
│   ├── portfolio.html       # Portfolio showcase
│   ├── contact.html         # Contact information
│   ├── testimonials.html    # Client testimonials
│   │
│   ├── audio-services.html  # Service pages
│   ├── branding-identity.html
│   ├── print-marketing-design.html
│   ├── social-media-design.html
│   ├── visual-content-creation.html
│   │
│   ├── css/                 # Stylesheets
│   │   └── main.css        # Tailwind CSS configuration
│   │
│   ├── images/             # All images and graphics
│   │   ├── *.svg          # Vector graphics for services
│   │   ├── *.png          # Logo and other images
│   │   └── favicon.png    # Browser tab icon
│   │
│   └── old/               # Legacy website (DO NOT MODIFY)
│
├── docker-compose.yml      # Docker configuration
├── Dockerfile             # Docker image setup
├── flake.nix             # Nix configuration
├── package.json          # Node.js dependencies
├── tailwind.config.js    # Tailwind CSS settings
├── vite.config.js        # Vite build tool settings
└── README.md            # This file
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

- **[Vite](https://vitejs.dev/)** - Fast build tool and development server
- **[Tailwind CSS](https://tailwindcss.com/)** - Utility-first CSS framework
- **[Docker](https://www.docker.com/)** - Containerization for consistent development
- **[Nix](https://nixos.org/)** - Reproducible development environments
- **HTML5** - Modern, semantic markup
- **SVG** - Scalable vector graphics for icons

## 📝 Making Changes

### Editing Content

1. All website pages are in the `src/` folder
2. Open any `.html` file in a text editor
3. Make your changes
4. Save the file
5. The browser will automatically refresh to show your changes

### Common Edits

**Changing Text:**
```html
<!-- Find text like this -->
<p>Old text here</p>

<!-- Change it to -->
<p>Your new text here</p>
```

**Updating Prices:**
```html
<!-- Look for price text -->
<span class="text-xl font-bold text-gray-800">$100 AUD</span>

<!-- Update the amount -->
<span class="text-xl font-bold text-gray-800">$150 AUD</span>
```

**Changing Images:**
1. Add your new image to `src/images/`
2. Update the image path in the HTML:
```html
<img src="images/your-new-image.png" alt="Description of image">
```

### Important Guidelines

- ✅ Use "we" instead of "I" in all text
- ✅ Keep file names lowercase (e.g., `about.html` not `About.html`)
- ❌ Never modify files in `src/old/` directory
- ✅ Test all changes in your browser before deploying

## 🏗️ Building for Production

When you're ready to publish the website:

### With Docker
```bash
docker compose run --rm app npm run build
```

### With Nix
```bash
nix develop -c build
```

The built website will be in the `dist/` folder, ready to upload to your web hosting.

## 🚀 GitHub Pages Deployment

This repository is configured for automatic deployment to GitHub Pages. Every push to the `main` branch triggers a build and deploy.

### Automatic Deployment

The site uses GitHub Actions for CI/CD:
- **Automatic builds** on every push to main
- **Static site generation** using Vite
- **Free SSL certificate** included by default
- **Available at**: `https://jamesbrink.github.io/watt-media-website/`

### Custom Domain Setup

To use a custom domain (e.g., wattmedia.au):

1. **In your repository**:
   - Create a file `src/CNAME` with your domain: `wattmedia.au`
   - Update `vite.config.js`: change `base: '/watt-media-website/'` to `base: '/'`

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
- [DNS Configuration Help](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/managing-a-custom-domain-for-your-github-pages-site)
- [Troubleshooting Custom Domains](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/troubleshooting-custom-domains-and-github-pages)

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
2. Change the port in `vite.config.js` and `docker-compose.yml`

### "Cannot find module"
Run these commands:
```bash
# With Docker
docker compose run --rm app npm install

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

## 📞 Support

For technical issues with the website, consult:
- [Vite Documentation](https://vitejs.dev/guide/)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Docker Documentation](https://docs.docker.com/)
- [Nix Documentation](https://nixos.org/learn.html)

## 📄 License

© 2025 Watt Media. All rights reserved.