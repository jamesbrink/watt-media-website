import { defineConfig } from 'vite'

export default defineConfig({
  root: 'src',
  // For GitHub Pages: use '/watt-media-website/' for github.io subdomain
  // For custom domain: use '/'
  base: '/watt-media-website/',
  server: {
    port: 8080,
    host: 'localhost',
    open: true,
    watch: {
      usePolling: true
    }
  },
  build: {
    outDir: '../dist',
    emptyOutDir: true,
    rollupOptions: {
      input: {
        main: 'src/index.html',
        about: 'src/about.html',
        services: 'src/services.html',
        portfolio: 'src/portfolio.html',
        contact: 'src/contact.html',
        testimonials: 'src/testimonials.html',
        'branding-identity': 'src/branding-identity.html',
        'print-marketing-design': 'src/print-marketing-design.html',
        'social-media-design': 'src/social-media-design.html',
        'visual-content-creation': 'src/visual-content-creation.html',
        'audio-services': 'src/audio-services.html'
      }
    }
  },
  publicDir: 'public'
})