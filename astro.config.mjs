import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://wattmedia.au',
  base: '/watt-media-website/',
  integrations: [
    tailwind(),
    sitemap()
  ],
  server: {
    port: 8080,
    host: 'localhost'
  },
  build: {
    assets: 'assets'
  },
  publicDir: 'src/public'
});