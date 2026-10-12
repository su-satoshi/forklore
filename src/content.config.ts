import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const posts = defineCollection({
  loader: glob({ pattern: '**/[^_]*.{md,mdx}', base: './src/content/posts' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    tags: z.array(z.string()).default([]),
    draft: z.boolean().default(false),
    // Pinned posts stay first on the home page
    pinned: z.boolean().default(false),
    // Optional cover image for the post card, e.g. /images/posts/my-post.jpg (put the file in public/images/posts/)
    cover: z.string().optional(),
    coverAlt: z.string().optional(),
  }),
});

export const collections = { posts };
