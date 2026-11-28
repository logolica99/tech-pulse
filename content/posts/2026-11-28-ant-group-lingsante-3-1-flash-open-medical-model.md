---
title: "Ant Group open-sources LingSante-3.1-flash, a 560B-parameter medical AI model"
date: "2026-11-28"
published: "2026-11-28T09:30:00-08:00"
summary: "Ant Group released LingSante-3.1-flash under the MIT license: a 560B mixture-of-experts medical model with 25B active parameters and a 1M-token context, which it says tops open models on its InclusionMed benchmark."
tags:
  - Ant Group
  - Open Models
  - Healthcare
  - LingSante
category: AI
sources:
  - title: "Hugging Face: inclusionAI/LingSante-3.1-flash model card"
    url: "https://huggingface.co/inclusionAI/LingSante-3.1-flash"
  - title: "MarkTechPost: Ant Group Releases LingSante-3.1-flash"
    url: "https://www.marktechpost.com/2026/11/28/ant-group-lingsante-3-1-flash-open-source-medical-ai/"
draft: false
---

Ant Group has published open weights for LingSante-3.1-flash, a medical reasoning model from the LingSante family that powers its health app Afu. MarkTechPost reports Ant says Afu serves 150 million users.

## The model

According to the model card on Hugging Face, LingSante-3.1-flash is built on Ant's Ling-3.1-flash base:

- 560 billion total parameters, about 25 billion active per token (mixture of experts, 512 routed experts plus one shared)
- A 1-million-token context window, made practical by a hybrid design of 63 linear-attention (KDA) layers and 9 gated MLA layers
- MIT license, with an MXFP4 quantized version also available
- Reference serving setup of 8 Nvidia H200s or 4 GB300s with SGLang

Medical and general data were mixed through pretraining and fine-tuning, followed by reinforcement learning for medical reasoning, search, tool use and professional behaviour, and a final multi-teacher distillation step. A smaller vision-language sibling, LingSante-3.1-air-VL, was released too.

## How it scores

On Ant's InclusionMed benchmark the model scores 45.064, fifth of 23 configurations; the four above it are closed models. MarkTechPost notes the model card also puts it first on HealthBench Professional (65.72) in a nine-model comparison, ahead of GPT-6 Astra, while it trails on MedQA-USMLE and on general coding tasks. All scores are Ant's own.

Ant says the model is for research and evaluation only, is not a medical device, and must not be used on its own to diagnose or treat patients.
