---
title: "Hello, ForkLore"
description: "What this blog is for, what I'll be writing about, and how posts here are put together."
pubDate: 2026-10-11
tags: ["meta", "cybersecurity"]
pinned: true
---

Welcome to ForkLore. This is where I write up what I find while poking at security, AI systems, blockchains and the parts of the internet most people never look at.

## What to expect

- **Cybersecurity:** write-ups from labs, CTFs and coursework, with the reasoning behind each step and not just the commands.
- **AI vulnerabilities:** prompt injection, vibe-coded apps shipped without review, and what goes wrong when models get tools.
- **Blockchain cryptography:** how the maths actually works, and where the hype outruns it.
- **Digital forensics:** following the evidence and documenting what it shows.

## How posts look

Inline code looks like `nmap -sV 10.10.10.5`, and longer snippets get their own block:

```python
import hashlib

def sha256(data: str) -> str:
    """Return the hex SHA-256 digest of a string."""
    return hashlib.sha256(data.encode()).hexdigest()

print(sha256("forklore"))
```

> Follow the evidence, question the assumptions, document the discoveries.

Everything I test here is on systems I own or am authorised to test. If a post saves you some time, there's a coffee link in the footer.
