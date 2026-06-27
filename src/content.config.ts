import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

// Blog/writing posts (created in the CMS under "Writing").
const writing = defineCollection({
  loader: glob({ pattern: '**/*.mdx', base: './src/content/writing' }),
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    draft: z.boolean().default(false),
    description: z.string().optional(),
  }),
});

// Freeform standalone pages (created in the CMS under "Pages").
const pages = defineCollection({
  loader: glob({ pattern: '**/*.mdx', base: './src/content/pages' }),
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
    showInNav: z.boolean().default(false),
  }),
});

// Now and Uses: single rich-text entries (src/content/<name>/index.mdx).
const now = defineCollection({
  loader: glob({ pattern: '**/*.mdx', base: './src/content/now' }),
  schema: z.object({
    intro: z.string(),
    updated: z.string(),
  }),
});

const uses = defineCollection({
  loader: glob({ pattern: '**/*.mdx', base: './src/content/uses' }),
  schema: z.object({
    intro: z.string(),
    updated: z.string(),
  }),
});

export const collections = { writing, pages, now, uses };
