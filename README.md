# aayushyswetapragyan.com

A warm, organic personal website for Aayushy Swetapragyan — built with
[Astro](https://astro.build). Cream + terracotta palette, Fraunces over Inter,
gentle motion, photo-forward landing page.

## Develop

```bash
npm install      # once
npm run dev      # local server at http://localhost:4321
npm run build    # production build -> ./dist
npm run preview  # preview the built site
```

## Always-on preview (NetBird)

A persistent dev server runs as a systemd **user** service, bound to this node's
NetBird IP so it's reachable over the VPN any time:

- **http://10.69.69.51:4321** (or **http://o1.vpn.kayg.org:4321**)
- Runs `astro dev`, so edits to content/code show up live — no rebuild needed.
- Survives reboots (user lingering + `Restart=always`). VPN-only, not on the LAN.

```bash
systemctl --user status asp-site     # check it
systemctl --user restart asp-site    # restart (e.g. after astro.config change)
systemctl --user stop asp-site       # stop it
journalctl --user -u asp-site -f     # follow logs
```

The bound IP/port live in the `server` block of `astro.config.mjs`.

## The bits you'll edit most

| What | Where |
| --- | --- |
| Name, roles, email, social links | `src/data/site.ts` |
| Landing page copy & sections | `src/pages/index.astro` |
| `/now` page | `src/pages/now.mdx` (Markdown + components) |
| `/uses` page | `src/pages/uses.mdx` (Markdown + components) |
| Colors, fonts, spacing | `src/styles/global.css` (`:root` tokens) |
| Analytics | `src/data/site.ts` (`analytics` block) |

### Swap the hero photograph

The landing hero shows a placeholder at `public/images/hero-placeholder.svg`.
Drop a real photo into `public/images/` (a portrait ~4:5 ratio looks best) and
point the `<img src>` in `src/pages/index.astro` (the `.hero__media` block) at it.

### Social links

Open `src/data/site.ts` and fill in the `href` for Instagram and LinkedIn, and
set the real `email`. Empty `href` values are hidden automatically.

### Open Graph image

`public/og-image.svg` is a placeholder share image. For best results on social
platforms, export a 1200×630 **PNG** (some platforms don't render SVG previews),
save it as `public/og-image.png`, and update the reference in
`src/layouts/Base.astro`.

## Analytics (Umami)

Privacy-friendly, cookie-free analytics via the self-hosted Umami at
`umami.kayg.org`. Configured in the `analytics` block of `src/data/site.ts`:

1. In Umami, add a website for `aayushyswetapragyan.com` and copy its **Website ID**.
2. Paste it into `analytics.websiteId`.

The tracker only loads when `websiteId` is set (off until then). The script tag
itself lives in `src/layouts/Base.astro`.

### First-party requests (optional)

By default the tracker loads from `umami.kayg.org` (third-party), which some
ad-blockers drop. To keep all analytics requests on this domain:

1. Proxy a path on this domain to the Umami instance (e.g. a Cloudflare Worker or
   Pages Function routing `/_a/*` to `https://umami.kayg.org/*`).
2. Set `analytics.src` to the proxied script URL (e.g. `/_a/script.js`) and
   `analytics.hostUrl` to the proxied API base.

One Umami instance already serves many sites (each keyed by its Website ID), so
no per-domain change is needed on Umami itself; first-party is purely a proxy in
front of it.

## Deploy — Cloudflare Pages

This is a fully static site, so deployment is simple.

**Option A — Git (recommended):** push to GitHub/GitLab, then in the Cloudflare
dashboard: *Workers & Pages → Create → Pages → Connect to Git*.

- Framework preset: **Astro**
- Build command: `npm run build`
- Build output directory: `dist`

**Option B — Direct upload:** run `npm run build` and drag the `dist/` folder
into *Workers & Pages → Create → Pages → Upload assets*.

Then add the custom domain `aayushyswetapragyan.com` under the project's
**Custom domains** tab and follow the DNS prompts.

> The site is host-agnostic — the same `dist/` works on Netlify, Vercel, or any
> static host. If the production domain ever changes, update `site` in
> `astro.config.mjs`.
