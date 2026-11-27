---
title: "Google's Cogentic agent posts six math papers, including an unverified factoring breakthrough"
date: "2026-11-26"
published: "2026-11-26T18:32:00-08:00"
summary: "Google Research published six papers it says its Gemini 4-based multi-agent system Cogentic produced from a single prompt, including a claimed proven L[1/3] bound for integer factoring. No outside mathematician has verified them yet, and the result does not threaten RSA encryption."
tags:
  - AI
  - Google
  - Gemini 4
  - Mathematics
  - Research
category: AI
sources:
  - title: "Google Research: Cogentic research papers (GitHub)"
    url: "https://github.com/google-research/google-research/tree/master/cogentic_research_papers"
  - title: "R&D World: Google's Gemini 4 agent claims six math proofs in a day"
    url: "https://www.rdworldonline.com/google-cogentic-ai-integer-factoring-bounds-lean-proofs/"
draft: false
---

Google Research has posted six new math papers to GitHub that it says were produced by Cogentic, a multi-agent research system built on Gemini 4, from a single prompt each with no further human help. The batch, dated November 25, covers integer factorization, discrete logarithms in finite fields, approximate Nash equilibria in two-player games, the log-rank conjecture in communication complexity, and graph edge reconstruction.

## The factoring claim

The headline paper claims a randomized algorithm that never returns a wrong answer and fully factors any integer N in expected time L_N[1/3, 105]. As R&D World explains, the 1/3 exponent matches the growth rate of the number field sieve, the fastest method used in practice, but without the unproven assumptions behind that method's analysis. The best proven bound until now had an exponent of 1/2, from Hendrik Lenstra and Carl Pomerance in 1992.

That does not make RSA easier to break. The constant 105 is far larger than the sieve's heuristic constant of about 1.92, and the algorithm hands every number up to 2^10,000 to plain trial division, far beyond the 2,048- to 4,096-bit keys RSA commonly uses. A second paper claims the first subexponential bound for deterministic factoring. Mathematician David Harvey told R&D World that Google's results "appear to be a better complexity bound" than an earlier Claude-assisted claim from October.

## Not yet checked

The papers have not been reviewed by outside mathematicians. Each README says Cogentic completed a proof in the Lean 4 proof assistant, but R&D World reports that the repository held only PDFs and READMEs when the release went out. That matters because batches of AI-generated proofs have been retracted quickly before: OpenAI withdrew three of 722 AI-written manuscripts a day after releasing them in October.
