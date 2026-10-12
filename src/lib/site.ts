import { getCollection, type CollectionEntry } from 'astro:content';

export const SITE = {
  title: 'ForkLore',
  description:
    'An independent tech blog on cybersecurity, AI vulnerabilities, blockchain cryptography, digital forensics and the hidden mechanics of online systems.',
  author: 'Jaswanth',
  github: 'https://github.com/su-satoshi',
  coffee: 'https://buymeacoffee.com/jaswanthonk',
  // Email subscriptions via follow.it. Paste the form "action" URL from your follow.it
  // subscription form code here (it looks like https://api.follow.it/subscription-form/.../8).
  // While it's empty, the footer form shows "coming soon" and can't be submitted.
  newsletterAction: '',
};

/** Prefix a path with the site base (/forklore) so links work locally and on GitHub Pages. */
export function url(path = '/') {
  const base = import.meta.env.BASE_URL.replace(/\/$/, '');
  const clean = path.startsWith('/') ? path : `/${path}`;
  return `${base}${clean}`;
}

export async function getPosts() {
  const posts = await getCollection('posts', ({ data }) => import.meta.env.DEV || !data.draft);
  return posts.sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf());
}

export function slugify(tag: string) {
  return tag.toLowerCase().trim().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
}

export function readingTime(post: CollectionEntry<'posts'>) {
  const words = (post.body ?? '').split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 220));
}

export function formatDate(d: Date) {
  return d.toLocaleDateString('en-AU', { day: 'numeric', month: 'short', year: 'numeric' });
}
