---
title: "Lean and Mathlib communities certify Alpöge's Claude-assisted Riemann hypothesis proof"
date: "2026-11-22"
published: "2026-11-22T09:15:00-08:00"
summary: "A joint statement endorsed by the Lean FRO and the Mathlib Initiative says the 17-million-line Lean proof of the Riemann hypothesis is correct, after dozens of independent builds and multiple proof checkers agreed."
tags:
  - AI
  - Anthropic
  - Claude
  - Mathematics
  - Lean
category: AI
sources:
  - title: "Lean verification of the Riemann Hypothesis (Lean community blog)"
    url: "https://leanprover-community.github.io/blog/posts/riemann-hypothesis/"
  - title: "Lean and Mathlib community officially confirms Levent Alpöge's proof of the Riemann hypothesis is correct (The Decoder)"
    url: "https://the-decoder.com/lean-and-mathlib-community-officially-confirms-levent-alpoges-proof-of-the-riemann-hypothesis-is-correct/"
draft: false
---

A day after Levent Alpöge posted a computer-checkable proof of the Riemann hypothesis that he says he found with Anthropic's Claude, the people who maintain the Lean proof assistant have vouched for it. In a joint statement from the Lean and Mathlib communities, endorsed by the Lean FRO and the Mathlib Initiative and dated November 21, they say they have "full confidence" the proof is correct.

## What was checked

Alpöge released the proof on November 20 as a Lean library of about 17 million lines that depends directly only on Mathlib, Lean's shared mathematics library. The statement lists four checks:

- **The right statement.** The theorem being proved is Mathlib's own definition of the Riemann hypothesis, which experts in Lean and number theory had already vetted.
- **It builds.** Dozens of people compiled the library without errors and got the same raw proof export.
- **It proves that statement.** The community added a separate file that states the hypothesis using only Mathlib, and two independent tools confirmed the theorem in Alpöge's library matches it exactly.
- **The proof is valid.** The exported proof passed several checkers, including Lean's official kernel and independent checkers written by third parties in other languages. Two of them come with a formal argument that they cannot accept a false proof. The checks ran on an inert export, so malicious code in the sources could not interfere.

## What it does and does not mean

The Decoder notes that forecasters on Metaculus had expected the problem to fall around 2035. The Lean statement is a machine-verification verdict, not a ruling from journals or the Clay Mathematics Institute, which has its own acceptance process for Millennium Prize problems. The statement itself says the next step is for mathematicians to explain the new ideas inside the proof, which no human-readable write-up yet does.
