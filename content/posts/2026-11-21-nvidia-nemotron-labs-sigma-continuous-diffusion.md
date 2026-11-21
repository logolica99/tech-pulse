---
title: "Nvidia releases Nemotron-Labs-Sigma, open continuous diffusion language models"
date: "2026-11-21"
published: "2026-11-21T09:08:00-08:00"
summary: "Nvidia has published 14 open checkpoints at 3B and 8B scale for Sigma, a family of language models that generate text by denoising in a continuous embedding space instead of predicting tokens one by one."
tags:
  - AI
  - Nvidia
  - Open Models
  - Diffusion
category: AI
sources:
  - title: "NVIDIA AI Releases Nemotron-Labs-Sigma (MarkTechPost)"
    url: "https://www.marktechpost.com/2026/11/20/nvidia-nemotron-labs-sigma-continuous-diffusion-language-model/"
  - title: "Nemotron-Labs-Sigma collection (Hugging Face)"
    url: "https://huggingface.co/collections/nvidia/nemotron-labs-sigma"
draft: false
---

Nvidia has released Nemotron-Labs-Sigma, a set of open language models that use continuous diffusion to write text. The collection on Hugging Face has 14 checkpoints at 3B and 8B parameters.

## How it differs

Most language models predict the next token. Earlier diffusion language models such as LLaDA and Dream denoise discrete tokens. Sigma instead maps each token to a point in a learned 16-dimensional embedding space, adds noise during training, and learns to remove it. Text is generated block by block, with each finished block stored in a KV cache before the next one starts. Nvidia's team says working in a smooth space makes it practical to distill the model down to a few denoising steps and to steer generation.

## What's in the release

- Base models: Sigma-3B and Sigma-8B.
- Instruct models at both sizes.
- Few-step distilled versions at 2, 4, 8 and 16 steps.
- Self-speculative variants.

## Performance

According to MarkTechPost's write-up, Sigma-8B base averages 71.16 on Nvidia's six-task suite, slightly ahead of NLD-8B at 70.22, and the 8-step distilled 8B model keeps a 70.34 average. The instruct model scores 91.96 on GSM8K but only 17.00 on AIME25, and its average trails NLD-8B. The models run on a single Nvidia GPU at about 120 to 140 tokens per second on an H100, with a 4,096-token context (8,192 for the 8B instruct model).
