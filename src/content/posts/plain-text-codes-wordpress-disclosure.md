---
title: "Found in plain text: exposed codes on an Australian WordPress site"
description: "How I came across sensitive codes sitting in plain text on a live WordPress site, what the risk was, and how it was reported."
pubDate: 2026-10-12
tags: ["web-security", "wordpress", "disclosure"]
draft: true
---

<!-- DRAFT NOTES (not shown on the site, but this file IS readable by anyone in the public GitHub repo)
- Keep the company unnamed and keep every exposed value out of this file until the issue is fixed.
- Before publishing: report it to the company, give them time to fix it, confirm the fix, and ideally get their OK to name them.
- Australian contacts if they don't respond: the business itself first, then ACSC (cyber.gov.au) for coordinated disclosure. If personal information was exposed, the OAIC is relevant to them, not you.
- Never use the exposed codes. Accessing systems with them, even "to check", can be an offence under the Criminal Code Act 1995 (Cth).
- Fill in what "ip2codes" actually were (API keys, licence keys, IP2Location codes, credentials...) in general terms only.
-->

While browsing a small Australian business's WordPress site, I noticed something that shouldn't have been public: a set of codes sitting in plain text, readable by anyone who knew where to look. This is how I found it, why it matters, and how I reported it.

## What I found

<!-- TODO: describe in general terms. What kind of codes, roughly how many, and where (page source, a plugin file, an exposed JSON endpoint, wp-content/uploads...). No real values, no exact URL. -->

## How I came across it

<!-- TODO: be precise and honest about what you did. Viewing page source or a publicly linked file is very different from guessing URLs or running scanners. Only describe passive observation you're comfortable standing behind. -->

## Why it's a problem

Codes in plain text on a public site can be:

- **Indexed by search engines** and found with a simple search.
- **Scraped automatically.** Bots crawl WordPress sites for exactly this.
- **Used by anyone,** depending on what they unlock.

<!-- TODO: the realistic impact for this specific case. -->

## Why this happens on WordPress sites

- Plugins that store settings or keys in files inside the web root.
- Debug logs (`wp-content/debug.log`) left publicly readable.
- Backup or export files dropped into `uploads`.
- Theme or page-builder settings that embed keys in the page source.
- The REST API exposing more fields than intended.

## How I reported it

<!-- TODO: timeline. Date found, date reported, how (email/contact form), their response, date fixed. -->

## What site owners should check

- Search your own site's source and uploads folder for keys, codes and passwords.
- Make sure `debug.log`, backups and `.env` files can't be downloaded.
- Rotate any key that has ever been public, even briefly.
- Keep plugins updated, and remove the ones you don't use.

## Takeaway

<!-- TODO: your conclusion. -->
