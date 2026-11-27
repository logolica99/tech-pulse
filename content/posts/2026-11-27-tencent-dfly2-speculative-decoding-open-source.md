---
title: "Tencent open-sources DFly2, a drafter that speeds up long-context sparse models"
date: "2026-11-27"
published: "2026-11-27T09:16:00-08:00"
summary: "Tencent released code, weights and a paper for DFly2, a speculative-decoding drafter that reuses a sparse model's own cache and token selection, reporting up to 81% more throughput on DeepSeek-V4.1-Flash."
tags:
  - AI
  - Tencent
  - Open Source
  - Inference
category: AI
sources:
  - title: "DFly2: Turbocharging Long-Context Speculative Decoding by Sharing the Target's Sparsity (arXiv)"
    url: "https://arxiv.org/abs/2611.34776"
  - title: "Tencent/AngelSpec (GitHub)"
    url: "https://github.com/Tencent/AngelSpec"
  - title: "Tencent releases DFly2 draft model weights and training code (AI.info)"
    url: "https://ai.info/news/tencent-open-sources-dfly2-draft-model"
draft: false
---

Tencent's Hunyuan AI infrastructure team has released DFly2, a small "draft" model that makes large language models generate text faster, along with its training code, weights and a technical paper. The full release landed in Tencent's AngelSpec repository on November 26.

## How it works

Speculative decoding lets a cheap drafter guess several tokens ahead, which the big target model then checks in one pass. Output quality is unchanged, but the target runs fewer times.

Newer long-context models such as DeepSeek-V4, GLM-5 and Tencent's Hy4 use sparse attention: for each query, an indexer picks a fixed number of context positions to look at. DFly2's idea is that the target has already done the drafter's work. Each draft layer reads the key-value cache of a paired target layer, at the positions that layer's indexer chose. The drafter keeps no cache of its own and runs no scoring pass, so its cost stays roughly flat as context grows.

## Reported results

Tencent released drafters for Hy4 flash, DeepSeek-V4.1-Flash and GLM-5.3-Flash. In the paper, compared with DFlash and DSpark drafters trained the same way:

- DFly2 accepted 3.9% to 10.5% more tokens per step on general tasks, and 10.0% to 31.5% more on long-context and agentic tasks up to 128K tokens.
- Serving DeepSeek-V4.1-Flash at high concurrency, it delivered 62% and 81% more throughput than the stronger baseline on long-context and agentic sets at 64K.
- On Hy4 flash agentic benchmarks, AI.info citing the repository reports a 3.41x decoding speedup over normal decoding (1.67x end to end).

These are Tencent's own measurements.
