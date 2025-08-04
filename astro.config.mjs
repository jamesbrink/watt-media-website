import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: process.env.NODE_ENV === 'production' ? 'https://jamesbrink.github.io' : 'http://localhost:8080',
  base: process.env.NODE_ENV === 'production' ? '/watt-media-website' : '/',
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