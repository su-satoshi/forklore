---
title: "Vibe-coded and vulnerable: prompt injection, CSRF, RCE and misconfigurations in AI-built apps"
description: "The security bugs that keep showing up in projects built with Claude and ChatGPT, why the models produce them, and how to catch them before you ship."
pubDate: 2026-10-12
tags: ["ai-security", "web-security", "vibe-coding"]
color: "red"
draft: true
---

<!-- DRAFT NOTES (not shown on the site, but visible in the public repo)
- Only use examples from your own projects, lab apps, or code you're allowed to test. Don't name or link live apps that are still vulnerable.
- Keep code samples as vulnerable-vs-fixed pairs so the post teaches the fix, not just the bug.
-->

"Vibe coding" means describing what you want and letting an AI model write the code. It is fast, and it gets you something that works. It does not get you something that is safe. The model optimises for "runs and looks right", and most security bugs are invisible until someone goes looking.

This post walks through the bug classes I see most often in vibe-coded projects, why they appear, and how to check for them.

## Why AI-written code ships with these bugs

- **It copies the average of its training data,** and the average tutorial skips auth, validation and secrets handling.
- **It does what you asked, literally.** "Add a delete button" gets a delete button, not a permission check.
- **It fills gaps with defaults:** permissive CORS, debug mode on, open database rules, so the demo works.
- **Nobody reviews it,** because the person prompting often can't read the code well enough to spot what's missing.

## 1. Prompt injection

If your app sends user content to an LLM *and* that LLM can take actions (call tools, read files, send emails, query a database), then the user content can contain instructions the model will follow.

- **Direct:** the user types "ignore previous instructions and..." into your chatbot.
- **Indirect:** the instructions are hidden in something the model reads later, such as a web page, a PDF, an email or a GitHub issue.

What to check:
- Can the model's output trigger an action without a human confirming it?
- Does the model have access to more data or tools than the current user should?
- Is retrieved content clearly separated from instructions, and treated as untrusted?

<!-- TODO: example from your own lab app. Show the injected text and what the model did. -->

## 2. CSRF (cross-site request forgery)

AI-generated backends often use cookie sessions and state-changing `GET` routes, with no CSRF tokens and no `SameSite` setting on the cookie.

```js
// Vulnerable: a state-changing action on GET, authenticated only by a cookie
app.get('/account/delete', requireLogin, deleteAccount);

// Better: POST only, CSRF token checked, cookie set with SameSite
app.post('/account/delete', requireLogin, verifyCsrfToken, deleteAccount);
res.cookie('session', id, { httpOnly: true, secure: true, sameSite: 'lax' });
```

<!-- TODO: explain how SameSite=Lax changes the picture, and where it doesn't protect you. -->

## 3. RCE-type bugs (remote code execution)

The usual paths from "user input" to "runs on my server":

- Building shell commands with string concatenation (`exec("convert " + filename)`).
- `eval()` or `new Function()` on user input, often in "calculator" or "formula" features.
- Unsafe deserialisation (Python `pickle`, YAML `load`).
- Template injection when user input is rendered as a template.
- File uploads saved inside the web root with their original extension.

```python
# Vulnerable: user input goes straight into a shell
subprocess.run(f"convert {filename} out.png", shell=True)

# Better: no shell, arguments passed as a list, filename validated first
subprocess.run(["convert", safe_filename, "out.png"], check=True)
```

## 4. Misconfigurations

The most common and the easiest to fix:

- API keys and secrets committed to the repo or shipped in frontend JavaScript.
- Supabase or Firebase tables with row-level security turned off or rules left open.
- `Access-Control-Allow-Origin: *` together with credentials.
- Debug mode, stack traces and admin panels left on in production.
- `.env`, `.git` or backup files reachable over HTTP.
- No rate limiting on login, signup or AI endpoints (the last one gets expensive fast).

<!-- TODO: add a short checklist people can run against their own project in 10 minutes. -->

## How to vibe code more safely

- Ask the model to **threat model** the feature before it writes it.
- Ask for a **security review of its own diff**, then verify the claims yourself.
- Run a scanner: dependency audit, secret scanning, and a basic DAST pass on a staging copy.
- Never give an AI agent production credentials.

<!-- TODO: your conclusion. -->
