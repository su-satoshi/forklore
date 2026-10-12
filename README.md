# ForkLore

ForkLore is an independent tech blog exploring cybersecurity, AI vulnerabilities, blockchain cryptography, digital forensics, and the hidden mechanics of online systems. From vibe-coded security flaws to algorithmic rabbit holes, follow the evidence, question the assumptions, and document the discoveries.

Live at **https://su-satoshi.github.io/forklore/**

## Writing a post

1. Copy `src/content/posts/_template.md` and rename it. The file name becomes the URL, so `sql-injection-basics.md` is published at `/forklore/posts/sql-injection-basics/`.
2. Fill in the front matter (`title`, `description`, `pubDate`, `tags`).
3. Delete `draft: true` when it's ready to go live.
4. Commit and push to `main`. GitHub Actions builds and deploys the site in a minute or two.

Images for posts go in `public/images/` and are referenced as `/forklore/images/your-image.png`.

## Running it locally

Needs Node.js 22 or newer.

```bash
npm install
npm run dev      # http://localhost:4321/forklore/ (drafts are visible here)
npm run build    # production build into dist/
```

## Where things live

| Path | What it is |
| --- | --- |
| `src/content/posts/` | Blog posts in Markdown |
| `src/styles/global.css` | Brand colours, fonts, dark/light themes |
| `src/styles/prose.css` | How post text, code blocks and quotes look |
| `src/components/` | Header, footer, post list, `LogoMark` (the branching-node logo) |
| `public/brand/` | Logo mark and app icon as SVG |
| `src/pages/` | Home, posts, topics, about, RSS feed |
| `src/lib/site.ts` | Site name, author, social links |
| `public/images/forklore-cover.webp` | Footer cover art |

## Brand

| Colour | Hex | Use |
| --- | --- | --- |
| Background | `#12071F` | Page background (dark mode) |
| Violet | `#8B6CFF` | Labels, metadata, `// comments` |
| Cream | `#F8F3EA` | Text, and background in light mode |
| Orange | `#FF8A3D` | Logo node, cursor, links |

Fonts: Fraunces (headings and body) and JetBrains Mono (labels and code), both self-hosted.

## Deployment

Pushing to `main` runs `.github/workflows/deploy.yml`, which builds the site and publishes it to the `gh-pages` branch. GitHub Pages serves that branch (Settings > Pages > Deploy from a branch > `gh-pages` / root).

## Custom domain

To move to your own domain later, add it under Settings > Pages, then in `astro.config.mjs` set `site` to the new domain and remove the `base` line.
