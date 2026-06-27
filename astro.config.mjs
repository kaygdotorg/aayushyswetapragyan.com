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
  // Dev server: bind all interfaces so it's reachable over NetBird. We bind
  // `true` rather than a single IP because Astro 7's dev CLI crashes when bound
  // to one non-loopback IP (Vite leaves resolvedUrls.local empty). Reachability
  // is still controlled at the network layer (OCI security list / NetBird);
  // allowedHosts gates which Host headers are accepted.
  server: {
    host: true,
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
