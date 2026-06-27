// @ts-check
// SEPARATE config for the Keystatic admin instance ONLY (runs on o2, NetBird-only).
// The public site uses astro.config.mjs (static, Cloudflare Pages) and never
// includes Keystatic/React/SSR. This config adds the admin at /keystatic.
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import react from '@astrojs/react';
import keystatic from '@keystatic/astro';
import node from '@astrojs/node';

export default defineConfig({
  output: 'server',
  adapter: node({ mode: 'standalone' }),
  integrations: [mdx(), react(), keystatic()],
  server: {
    host: true,
    port: 4322,
    // Served behind Traefik (NetBird-only + Authentik); allow the proxied host.
    allowedHosts: ['cms.aayushyswetapragyan.com'],
  },
});

