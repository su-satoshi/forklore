import rss from '@astrojs/rss';
import { getPosts, SITE } from '../lib/site';

export async function GET(context) {
  const posts = await getPosts();
  const base = import.meta.env.BASE_URL.replace(/\/$/, '');
  return rss({
    title: SITE.title,
    description: SITE.description,
    site: new URL(base + '/', context.site),
    items: posts.map((p) => ({
      title: p.data.title,
      description: p.data.description,
      pubDate: p.data.pubDate,
      categories: p.data.tags,
      link: `${base}/posts/${p.id}/`,
    })),
  });
}
