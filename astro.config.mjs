import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: process.env.NODE_ENV === 'production' ? 'https://wattmedia.au' : 'http://localhost:8080',
  base: '/',
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
  image: {
    service: {
      entrypoint: 'astro/assets/services/sharp'
    }
  }
});