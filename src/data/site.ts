// ============================================================
// Site config. Content (name/title/roles/email/socials) lives in site.json
// so it's editable in the CMS; analytics stays here as code config.
// ============================================================
import siteData from './site.json';

export const site = {
  name: siteData.name,
  title: siteData.title,
  roles: siteData.roles,
  email: siteData.email,
};

// Social / contact links shown in the hero and footer (edited via the CMS).
// `icon` maps to src/components/SocialIcon.astro. Empty `href` is hidden.
export const socials = siteData.socials;

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
