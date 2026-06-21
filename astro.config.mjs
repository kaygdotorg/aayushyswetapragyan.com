// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import mdx from '@astrojs/mdx';

// Update this if the production domain ever changes.
export default defineConfig({
  site: 'https://aayushyswetapragyan.com',
  integrations: [mdx(), sitemap()],
  // Output is a fully static site (great for Cloudflare Pages, Netlify, etc.)
  // The always-on NetBird preview runs `astro dev`; hide the dev toolbar so it
  // looks clean when viewed over the VPN.
  devToolbar: { enabled: false },
  // Dev server bind is configured via env vars (see the systemd unit) so no
  // private host/IP is hard-coded in the repo. Defaults are local-only.
  server: {
    host: process.env.DEV_HOST ?? 'localhost',
    port: Number(process.env.DEV_PORT ?? 4321),
    allowedHosts: (process.env.DEV_ALLOWED_HOSTS ?? '')
      .split(',')
      .map((h) => h.trim())
      .filter(Boolean),
  },
  prefetch: {
    prefetchAll: true,
    defaultStrategy: 'viewport',
  },
});
