---
title: "zk-SNARKs, Mina, and what quantum computers and AI really threaten in crypto"
description: "A tour of zero-knowledge blockchains like Mina, how SNARKs work, and which parts of cryptocurrency maths quantum computing and AI actually put at risk."
pubDate: 2026-10-12
tags: ["blockchain", "cryptography", "zero-knowledge"]
color: "yellow"
draft: true
---

<!-- DRAFT NOTES (not shown on the site, but visible in the public repo)
- Quantum timelines are contested. Present estimates as estimates and cite where each one comes from.
- Double-check any specific numbers (proof sizes, chain size, qubit counts) against primary sources before publishing.
-->

Most blockchains ask every participant to re-check everything. Zero-knowledge blockchains ask you to check a short proof instead. That shift is powerful, and it also changes which kinds of maths the whole system depends on, which matters a lot once you start asking what quantum computers and AI could break.

## Zero-knowledge proofs in one paragraph

A zero-knowledge proof lets someone convince you a statement is true without showing you why it's true. "I know the password", "this transaction follows the rules", "this computation produced this output", all proven without revealing the secret or redoing the work.

## SNARKs and STARKs

- **zk-SNARK:** *Succinct Non-interactive ARgument of Knowledge.* Tiny proofs that are fast to verify. Many popular constructions rely on elliptic curves and pairings, and some need a trusted setup.
- **zk-STARK:** *Scalable Transparent ARgument of Knowledge.* No trusted setup, built on hash functions, larger proofs.

<!-- TODO: a simple diagram of prover -> proof -> verifier. -->

## Mina: a blockchain that stays tiny

Mina uses **recursive** zk-SNARKs: each new block includes a proof that verifies the previous proof, so the whole history collapses into one small, constant-size proof. Anyone can verify the current state of the chain without downloading its history.

- Proof system: Kimchi (a PLONK-style SNARK), with recursion handled by Pickles.
- zkApps: smart contracts where the computation happens off-chain and only a proof goes on-chain.

<!-- TODO: compare with zk-rollups on Ethereum (zkSync, Starknet, Scroll). -->

## What quantum computers threaten

Two quantum algorithms matter here:

- **Shor's algorithm** breaks the hard problems behind RSA and elliptic-curve cryptography. On a large enough fault-tolerant quantum computer, that means deriving a private key from a public key for the ECDSA and EdDSA signatures most chains use today. It also hits SNARKs built on elliptic curves and pairings.
- **Grover's algorithm** speeds up brute-force search, which roughly halves the effective security of hash functions. That's a real but manageable cost: bigger hashes fix it.

So the exposure is uneven:

| Component | Quantum risk |
| --- | --- |
| ECDSA / EdDSA signatures | High once large quantum computers exist |
| Pairing-based SNARKs | High, same underlying maths |
| Hash-based STARKs | Low; considered post-quantum candidates |
| Hash functions (SHA-256, Poseidon) | Reduced margin, not broken |

**"Harvest now, decrypt later"** matters for blockchains in a specific way: any address whose public key is already on-chain can be attacked later, once the hardware exists.

The fix is underway: NIST published its first post-quantum standards in 2024 (ML-KEM, ML-DSA and SLH-DSA), and chains will need migration plans to move funds to quantum-safe signatures.

<!-- TODO: what are Bitcoin, Ethereum and Mina each doing about post-quantum migration? -->

## What AI threatens (and what it doesn't)

AI doesn't break the maths. Nobody has shown a model that solves discrete logarithms faster. Where AI does change the risk:

- **Finding bugs in implementations:** smart contracts, circuits and wallet code, faster than human auditors.
- **Under-constrained ZK circuits:** a classic ZK bug class where the circuit doesn't fully enforce the rules. AI-assisted analysis is getting good at spotting these.
- **Side channels and key leakage:** models trained to pull secrets out of timing or power traces.
- **Social engineering at scale:** phishing for seed phrases is still the cheapest attack of all.

## The honest summary

<!-- TODO: your conclusion. The maths has a deadline (quantum), the code has a problem today (bugs, and AI finding them faster). -->
