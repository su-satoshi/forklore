# ForkLore

ForkLore is an independent tech blog exploring cybersecurity, AI vulnerabilities, blockchain cryptography, digital forensics, and the hidden mechanics of online systems. From vibe-coded security flaws to algorithmic rabbit holes, follow the evidence, question the assumptions, and document the discoveries.

Live at **https://su-satoshi.github.io/forklore/**

## Writing a post

1. Copy `src/content/posts/_template.md` and rename it. The file name becomes the URL, so `sql-injection-basics.md` is published at `/forklore/posts/sql-injection-basics/`.
2. Fill in the front matter (`title`, `description`, `pubDate`, `tags`).
3. Optional, for the post's card on the home page:
   - `cover: "/images/posts/my-post.jpg"` and `coverAlt: "..."` to show an image (put the file in `public/images/posts/`)
   - `color: "purple"` to pick the card colour when there's no image (orange, yellow, blue, purple, red, green or black)
4. Delete `draft: true` when it's ready to go live.
5. Commit and push to `main`. GitHub Actions builds and deploys the site in a minute or two.

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
| `src/styles/global.css` | Colour palette, fonts, grid-paper background |
| `src/styles/prose.css` | How post text, code blocks and quotes look |
| `src/components/` | Top nav, logo (`Logo.astro`), bento post grid and cards, footer, collage |
| `public/brand/` | Logo mark and app icon as SVG |
| `src/pages/` | Home, posts, topics, about, RSS feed |
| `src/lib/site.ts` | Site name, author, social links |

## Brand

| Colour | Hex | Use |
| --- | --- | --- |
| Orange | `#ED6C1D` | Header band, accents |
| Yellow | `#FFDE59` | Logo paper scrap, link highlights |
| Paper | `#F3EFE4` | Grid-paper page background |
| Ink | `#000000` | Text, rules, logo |

Fonts: Bowlby One (headings), Literata (body), JetBrains Mono (code). All self-hosted.

The logo is `src/components/Logo.astro` (letters follow the text colour, so black in light mode and cream in dark mode). Standalone SVGs are in `public/brand/`: `forklore-logo.svg` (cream letters) and `forklore-logo-inverted.svg` (black letters).

## Footer collage

The footer art is the cover collage split into layers in `public/images/collage/` (static `bg`, `scene` and `scene2` layers plus one file per moving piece, stacked in the original order). Positions and animations live in `src/components/Collage.astro`. Animations only run while the footer is on screen and switch off for readers who prefer reduced motion.

## Deployment

Pushing to `main` runs `.github/workflows/deploy.yml`, which builds the site and publishes it to the `gh-pages` branch. GitHub Pages serves that branch (Settings > Pages > Deploy from a branch > `gh-pages` / root).

## Custom domain

To move to your own domain later, add it under Settings > Pages, then in `astro.config.mjs` set `site` to the new domain and remove the `base` line.
