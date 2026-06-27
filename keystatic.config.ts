import { config, fields, singleton, collection } from '@keystatic/core';
import { block } from '@keystatic/core/content-components';

// Local-mode CMS: edits content files in this repo. Served (gated by Authentik,
// NetBird-only) on o2; a timer commits + pushes -> Cloudflare Pages.
export default config({
  storage: { kind: 'local' },
  ui: {
    brand: { name: "Aayushy's site" },
  },
  collections: {
    writing: collection({
      label: 'Writing (blog)',
      slugField: 'title',
      path: 'src/content/writing/*/',
      format: { contentField: 'content' },
      columns: ['title', 'date'],
      schema: {
        title: fields.slug({ name: { label: 'Title' } }),
        date: fields.date({ label: 'Date', defaultValue: { kind: 'today' } }),
        draft: fields.checkbox({ label: 'Draft (hide from site)', defaultValue: false }),
        description: fields.text({ label: 'Short description', multiline: true }),
        content: fields.mdx({ label: 'Body' }),
      },
    }),
    pages: collection({
      label: 'Pages',
      slugField: 'title',
      path: 'src/content/pages/*/',
      format: { contentField: 'content' },
      columns: ['title'],
      schema: {
        title: fields.slug({ name: { label: 'Title' } }),
        description: fields.text({ label: 'Short description', multiline: true }),
        showInNav: fields.checkbox({ label: 'Show in top nav', defaultValue: false }),
        content: fields.mdx({ label: 'Body' }),
      },
    }),
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
        resume: fields.file({
          label: 'Résumé (PDF)',
          description: 'Upload a PDF to replace the resume the "resume" pill links to.',
          directory: 'public/files',
          publicPath: '/files/',
        }),
        contactAfter: fields.text({ label: 'Contact text (after resume pill)' }),
      },
    }),

    now: singleton({
      label: 'Now page',
      path: 'src/content/now/',
      format: { contentField: 'content' },
      schema: {
        intro: fields.text({ label: 'Intro (page header)', multiline: true }),
        updated: fields.text({ label: 'Updated (e.g. June 2026)' }),
        content: fields.mdx({
          label: 'Body',
          description: 'Write freely. Use the "+" / insert menu to drop in the live blocks below.',
          components: {
            Letterboxd: block({
              label: 'Letterboxd films',
              schema: {
                username: fields.text({ label: 'Letterboxd username', defaultValue: 'aayushyyy' }),
                limit: fields.integer({ label: 'How many to show', defaultValue: 6 }),
              },
            }),
            CurrentlyReading: block({
              label: 'Currently reading (book)',
              schema: {
                title: fields.text({ label: 'Title' }),
                author: fields.text({ label: 'Author' }),
                coverId: fields.text({
                  label: 'Open Library cover ID',
                  description: 'The number in covers.openlibrary.org/b/id/<ID>-L.jpg',
                }),
              },
            }),
          },
        }),
      },
    }),

    uses: singleton({
      label: 'Uses page',
      path: 'src/content/uses/',
      format: { contentField: 'content' },
      schema: {
        intro: fields.text({ label: 'Intro (page header)', multiline: true }),
        updated: fields.text({ label: 'Updated' }),
        content: fields.mdx({
          label: 'Body',
          description: 'Write your gear list freely. Insert the photo gallery block where you want it.',
          components: {
            Gallery: block({
              label: 'Photo gallery',
              schema: {},
            }),
          },
        }),
      },
    }),
  },
});
