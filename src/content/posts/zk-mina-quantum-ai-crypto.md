---
title: "zk-SNARKs, Mina, and what quantum computers and AI really threaten in crypto"
description: "A tour of zero-knowledge blockchains like Mina, how SNARKs work, and which parts of cryptocurrency maths quantum computing and AI actually put at risk."
pubDate: 2026-10-12
tags: ["blockchain", "cryptography", "zero-knowledge"]
color: "yellow"
---

Most blockchains ask every participant to re-check everything. Zero-knowledge blockchains ask you to check a short proof instead. That shift is powerful, and it also changes which kinds of maths the whole system depends on, which matters a lot once you start asking what quantum computers and AI could break.

## Zero-knowledge proofs in one paragraph

A zero-knowledge proof lets someone convince you a statement is true without showing you why it's true. "I know the password", "this transaction follows the rules", "this computation produced this output", all proven without revealing the secret or redoing the work.

## SNARKs and STARKs

- **zk-SNARK:** *Succinct Non-interactive ARgument of Knowledge.* Tiny proofs that are fast to verify. Many popular constructions rely on elliptic curves and pairings, and some need a trusted setup.
- **zk-STARK:** *Scalable Transparent ARgument of Knowledge.* No trusted setup, built on hash functions, larger proofs.

The flow is always the same: a **prover** does the expensive work and produces a **proof**, and a **verifier** checks that proof quickly without redoing the work or seeing the secret inputs.

## Mina: a blockchain that stays tiny

Mina uses **recursive** zk-SNARKs: each new block includes a proof that verifies the previous proof, so the whole history collapses into one small, constant-size proof. Anyone can verify the current state of the chain without downloading its history.

- Proof system: Kimchi (a PLONK-style SNARK), with recursion handled by Pickles.
- zkApps: smart contracts where the computation happens off-chain and only a proof goes on-chain.

Compare that with **zk-rollups** on Ethereum, such as zkSync, Starknet and Scroll. Rollups bundle many transactions off-chain and post a proof to Ethereum that the batch was executed correctly. Ethereum still keeps its full history; the proofs make the rollup trustworthy, not the base chain smaller. Mina goes further by making the base chain itself a proof. Starknet is also worth noting here because it uses STARKs, which matters for the quantum section below.

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

Where the big chains stand:

- **Bitcoin:** BIP-360 proposes a new output type built to support post-quantum signatures, with users moving their coins voluntarily. It was merged into the BIP repository in early 2026 but has not been activated.
- **Ethereum:** the Ethereum Foundation lists four exposed areas (validator BLS signatures, KZG commitments, user ECDSA signatures and app-level SNARKs) and is working toward hash-based signatures for validators and account abstraction so users can switch signature schemes. Its roadmap targets the core post-quantum pieces around 2029.
- **Mina:** its proof system is built on elliptic curves, so a quantum-safe Mina would need a new proof system underneath, not just new signatures.

The hard open question for every chain is old coins whose owners never move them. Once their public keys can be broken, someone will have to decide whether to freeze them or let them be taken.

## What AI threatens (and what it doesn't)

AI doesn't break the maths. Nobody has shown a model that solves discrete logarithms faster. Where AI does change the risk:

- **Finding bugs in implementations:** smart contracts, circuits and wallet code, faster than human auditors.
- **Under-constrained ZK circuits:** a classic ZK bug class where the circuit doesn't fully enforce the rules. AI-assisted analysis is getting good at spotting these.
- **Side channels and key leakage:** models trained to pull secrets out of timing or power traces.
- **Social engineering at scale:** phishing for seed phrases is still the cheapest attack of all.

## The honest summary

The maths behind crypto has a deadline: when large, fault-tolerant quantum computers arrive, today's elliptic-curve signatures and pairing-based SNARKs stop being safe. Nobody knows exactly when, which is why migration work has to start years before.

The code has a problem today. Bugs in contracts, circuits and wallets are where money is actually lost, and AI is making those bugs faster to find for defenders and attackers alike.

Zero-knowledge proofs are one of the most exciting tools in the space, and the hash-based ones may be part of how blockchains survive the quantum transition. Just don't confuse "the maths is unbroken" with "the system is safe".
