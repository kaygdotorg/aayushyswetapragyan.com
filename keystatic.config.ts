import { config, fields, singleton } from '@keystatic/core';

// Local-mode CMS: edits the JSON data files in this repo. Served (gated by
// Authentik, NetBird-only) on o2; a timer commits + pushes -> Cloudflare Pages.
export default config({
  storage: { kind: 'local' },
  ui: {
    brand: { name: "Aayushy's site" },
  },
  singletons: {
    site: singleton({
      label: 'Site & socials',
      path: 'src/data/site',
      format: { data: 'json' },
      schema: {
        name: fields.text({ label: 'Name' }),
        title: fields.text({ label: 'Browser tab title' }),
        email: fields.text({ label: 'Email' }),
        roles: fields.array(fields.text({ label: 'Role' }), {
          label: 'Roles',
          itemLabel: (p) => p.value,
        }),
        socials: fields.array(
          fields.object({
            label: fields.text({ label: 'Label' }),
            icon: fields.select({
              label: 'Icon',
              options: [
                { label: 'Instagram', value: 'instagram' },
                { label: 'X', value: 'x' },
                { label: 'LinkedIn', value: 'linkedin' },
                { label: 'Email', value: 'email' },
              ],
              defaultValue: 'instagram',
            }),
            href: fields.text({ label: 'URL' }),
          }),
          { label: 'Social links', itemLabel: (p) => p.fields.label.value }
        ),
      },
    }),

    home: singleton({
      label: 'Home page',
      path: 'src/data/home',
      format: { data: 'json' },
      schema: {
        eyebrow: fields.text({ label: 'Hero eyebrow' }),
        heroGiven: fields.text({ label: 'Hero first name (shown in italic)' }),
        heroLede: fields.text({ label: 'Hero intro', multiline: true }),
        aboutEyebrow: fields.text({ label: 'About eyebrow' }),
        aboutTitle: fields.text({ label: 'About title', multiline: true }),
        aboutBody: fields.text({ label: 'About body', multiline: true }),
        contactTitle: fields.text({ label: 'Contact title' }),
        contactLeadIn: fields.text({ label: 'Contact text (before resume pill)' }),
        resumeUrl: fields.text({ label: 'Resume URL' }),
        contactAfter: fields.text({ label: 'Contact text (after resume pill)' }),
      },
    }),

    now: singleton({
      label: 'Now page',
      path: 'src/data/now',
      format: { data: 'json' },
      schema: {
        updated: fields.text({ label: 'Updated (e.g. June 2026)' }),
        intro: fields.text({ label: 'Intro', multiline: true }),
        note: fields.text({ label: 'Note (blockquote)', multiline: true }),
        lately: fields.array(fields.text({ label: 'Item' }), {
          label: 'Lately',
          itemLabel: (p) => p.value,
        }),
        reading: fields.array(
          fields.object({
            title: fields.text({ label: 'Title' }),
            author: fields.text({ label: 'Author' }),
            coverId: fields.text({
              label: 'Open Library cover ID (optional)',
              description:
                'Find the book on openlibrary.org; the cover ID is the number in covers.openlibrary.org/b/id/<ID>-L.jpg. Leave blank to auto-search by title.',
            }),
          }),
          { label: 'Currently reading', itemLabel: (p) => p.fields.title.value }
        ),
        making: fields.array(fields.text({ label: 'Item' }), {
          label: 'Making',
          itemLabel: (p) => p.value,
        }),
        loving: fields.array(fields.text({ label: 'Item' }), {
          label: 'Loving',
          itemLabel: (p) => p.value,
        }),
      },
    }),

    uses: singleton({
      label: 'Uses page',
      path: 'src/data/uses',
      format: { data: 'json' },
      schema: {
        updated: fields.text({ label: 'Updated' }),
        intro: fields.text({ label: 'Intro', multiline: true }),
        note: fields.text({ label: 'Note (blockquote)', multiline: true }),
        categories: fields.array(
          fields.object({
            title: fields.text({ label: 'Category title' }),
            items: fields.array(
              fields.object({
                emoji: fields.text({ label: 'Emoji' }),
                name: fields.text({ label: 'Name' }),
                note: fields.text({ label: 'Note (optional)' }),
                url: fields.text({ label: 'Link (optional)' }),
              }),
              { label: 'Items', itemLabel: (p) => p.fields.name.value }
            ),
          }),
          { label: 'Categories', itemLabel: (p) => p.fields.title.value }
        ),
      },
    }),
  },
});
