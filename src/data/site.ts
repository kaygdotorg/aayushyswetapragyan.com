// ============================================================
// Edit-me file — the bits you'll most often want to change.
// ============================================================

export const site = {
  name: 'Aayushy Swetapragyan',
  // Browser-tab / SEO title for the site.
  title: "Aayushy Swetapragyan's Petit Espace",
  // Short, friendly roles shown under the name.
  roles: ['psychologist', 'photographer', 'operations'],
  email: 'mail@aayushyswetapragyan.com',
};

// Social / contact links shown in the hero and footer.
// Set `href` to '' to hide that link. `icon` maps to src/components/SocialIcon.astro.
export const socials = [
  { label: 'Instagram', icon: 'instagram', href: 'https://www.instagram.com/aayushywhyshe/' },
  { label: 'X', icon: 'x', href: 'https://x.com/aayushywhyshe' },
  { label: 'LinkedIn', icon: 'linkedin', href: 'https://www.linkedin.com/in/aayushyyy' },
  { label: 'Email', icon: 'email', href: `mailto:${site.email}` },
];

// Umami analytics (self-hosted at umami.kayg.org). Privacy-friendly, cookie-free.
// Leave `websiteId` empty to disable tracking entirely.
export const analytics = {
  // Where the tracker script is loaded from. Point this at a first-party proxy
  // path on this domain later if you want first-party requests (see README).
  src: 'https://umami.kayg.org/script.js',
  // TODO: in Umami, add a website for aayushyswetapragyan.com and paste its ID.
  websiteId: '',
  // Optional: override where events are sent (Umami `data-host-url`). Leave
  // empty to use the script's own host. Set to a first-party endpoint to keep
  // analytics requests on this domain.
  hostUrl: '',
};
