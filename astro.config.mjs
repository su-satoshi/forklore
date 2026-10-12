import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// The site lives at https://su-satoshi.github.io/forklore/
// If you add a custom domain later, set `site` to it and delete `base`.
export default defineConfig({
  site: 'https://su-satoshi.github.io',
  base: '/forklore',
  trailingSlash: 'ignore',
  integrations: [sitemap()],
  markdown: {
    shikiConfig: { theme: 'github-dark-default', wrap: false },
  },
});
