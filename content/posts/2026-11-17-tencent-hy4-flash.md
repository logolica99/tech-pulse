---
title: "Tencent releases Hy4 flash, a low-cost model with 12 billion active parameters"
date: "2026-11-17"
published: "2026-11-17T10:12:48-08:00"
summary: "Tencent's new Hy4 flash is a 224-billion-parameter multimodal model that activates only 12 billion parameters per token, has a 1M-token context window and costs about $0.07 per million input tokens, according to the company."
tags:
  - AI
  - Models
  - China
category: AI
sources:
  - title: "Tencent Launches Hy4 flash to Power High-Speed, Cost-Efficient AI Deployment for Everyday Workflows (Tencent)"
    url: "https://www.tencent.com/tencent-launches-hy4-flash-to-power-high-speed-cost-efficient-ai-deployment-for-everyday-workflows/"
  - title: "Introducing Hy4 flash (Tencent Hy research)"
    url: "https://hy.tencent.ai/research/hy4-flash"
draft: false
---

Tencent has added Hy4 flash to its Hy model family. The company calls it the cheapest Hy model so far and is aiming it at everyday office and agent work, not frontier-level reasoning. The announcement is dated 16 November.

## The model

Tencent says Hy4 flash has 224 billion total parameters, including 64 billion "Engram" parameters, but uses only 12 billion per token. Like Hy4, it accepts multimodal input and supports a context window of up to 1 million tokens. Listed API prices are about $0.070 per million input tokens, $0.281 per million output tokens and $0.003 per million cached input tokens. For comparison, Tencent lists Hy4 at $0.834 for input and $2.501 for output.

Tencent says it got there with hybrid attention, a LatentMoE design and Engram features. It says these cut the KV cache to 1/24 of Hy3's and 1/6 of Hy4's. The company also cites reinforcement learning that halves average output tokens per task, plus megakernel, 4-bit quantization and DFly inference optimizations that push decoding past 150 tokens per second.

## Tencent's claims

All of the performance figures below come from Tencent. On WorkIndex, its internal benchmark of WorkBuddy tasks like slide decks, document editing, spreadsheet repair and audio/video processing, Tencent says Hy4 flash slightly beats the much larger Hy4 Preview. It puts the per-task cost at 1/13 of Hy4 Preview, 1/20 of Hy4 and 1/8 of DeepSeek-V4.1-Flash. In a blind test with 85 internal WorkBuddy users across 259 tasks, Tencent says user satisfaction came close to Claude Haiku 5.5, with the lowest cost per task and the fastest completion times of the models tested.

## Availability

The model is live on Tencent Cloud TokenHub, WorkBuddy, Yuanbao, WeCom, QQ, ima and Marvis, and Tencent says OpenRouter support is coming. Through 30 November it is free in WorkBuddy and half price on TokenHub. Tencent still recommends the full Hy4 for harder jobs like long-horizon software engineering, and it says it plans to release Hy4 flash as an open-weight model.
