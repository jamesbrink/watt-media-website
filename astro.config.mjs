import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://wattmedia.au',
  // Removed conflicting base path - deploying to root domain
  integrations: [
    tailwind(),
    sitemap()
  ],
  server: {
    port: 8080,
    host: '0.0.0.0'
  },
  build: {
    assets: 'assets'
  },
  publicDir: 'src/public',
  image: {
    service: {
      entrypoint: 'astro/assets/services/sharp'
    }
  }
});