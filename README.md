# ForkLore

ForkLore is an independent tech blog exploring cybersecurity, AI vulnerabilities, blockchain cryptography, digital forensics, and the hidden mechanics of online systems. From vibe-coded security flaws to algorithmic rabbit holes, follow the evidence, question the assumptions, and document the discoveries.

Live at **https://su-satoshi.github.io/forklore/**

## Writing a post

1. Copy `src/content/posts/_template.md` and rename it without the underscore (files starting with `_` are ignored). The file name becomes the URL, so `sql-injection-basics.md` is published at `/forklore/posts/sql-injection-basics/`.
2. Fill in the front matter (`title`, `description`, `pubDate`, `tags`).
3. Optional, for the post's card on the home page:
   - `cover: "/images/posts/my-post.jpg"` and `coverAlt: "..."` to show an image on the card (put the file in `public/images/posts/`); without one the card is plain orange
4. Add `pinned: true` to keep a post first on the home page.
5. Delete `draft: true` when it's ready to go live.
6. Commit and push to `main`. The new post slots into the bento grid automatically. GitHub Actions builds and deploys the site in a minute or two.

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

Fonts: Urbanist Black (headings, Open Font License), Montserrat (body), JetBrains Mono (code). All self-hosted.

The logo is `src/components/Logo.astro` (letters follow the text colour, so black in light mode and cream in dark mode). Standalone SVGs are in `public/brand/`: `forklore-logo.svg` (cream letters) and `forklore-logo-inverted.svg` (black letters).

## Footer collage

The footer art is the cover collage split into layers in `public/images/collage/` (static `bg`, `scene` and `scene2` layers plus one file per moving piece, stacked in the original order). Positions and animations live in `src/components/Collage.astro`. Animations only run while the footer is on screen and switch off for readers who prefer reduced motion.

## Deployment

Pushing to `main` runs `.github/workflows/deploy.yml`, which builds the site and publishes it to the `gh-pages` branch. GitHub Pages serves that branch (Settings > Pages > Deploy from a branch > `gh-pages` / root).

## Email subscriptions (follow.it)

The footer has a "Subscribe to the mailing list" form. Until it's connected, submitting it only shows a "sign-ups open soon" note:

1. Sign up at follow.it and add the feed `https://su-satoshi.github.io/forklore/rss.xml`.
2. Create a subscription form and copy the URL in its `action="..."` attribute (it starts with `https://api.follow.it/subscription-form/`).
3. Paste it into `newsletterAction` in `src/lib/site.ts`, then commit and push.

From then on, follow.it emails subscribers automatically whenever a new post appears in the RSS feed.

## Analytics (optional, off)

Tracking is switched off. To turn on GoatCounter later, sign up at goatcounter.com and put your code in `goatcounter` in `src/lib/site.ts`. Post cards, topic filters and footer links are already tagged for click counts.

## Custom domain

To move to your own domain later, add it under Settings > Pages, then in `astro.config.mjs` set `site` to the new domain and remove the `base` line.
