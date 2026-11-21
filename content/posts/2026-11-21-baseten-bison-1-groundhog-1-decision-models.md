---
title: "Baseten releases bison-1 and groundhog-1, open decision models built on Gemma 4"
date: "2026-11-21"
published: "2026-11-21T09:08:00-08:00"
summary: "Baseten's new open-weight decision models move to Google's Gemma 4 as a base, add 128k context and image input, and bison-1 tops the Artificial Analysis Decision Index."
tags:
  - AI
  - Open Models
  - Baseten
category: AI
sources:
  - title: "Meet bison-1 and groundhog-1, frontier American decision models (Baseten)"
    url: "https://www.baseten.co/blog/meet-bison-1-and-groundhog-1/"
  - title: "Decision models (Baseten docs)"
    url: "https://docs.baseten.co/inference/model-apis/decision-models"
draft: false
---

Inference company Baseten has released two new open-weight "decision models", bison-1 and groundhog-1, built on Google's Gemma 4. Its previous pair, mammoth-1 and elephant-1, released last month, used Qwen models as their base; Baseten says it wanted a model family on an American backbone.

## The two models

- **bison-1** is a 31B model aimed at the highest accuracy. Baseten says it ranks first of 19 decision models on the Artificial Analysis Decision Index v2.1 with a score of 76, ahead of d1.2-ultra at 75 and mammoth-1 at 71, and has the best calibration on that index.
- **groundhog-1** is a 26B mixture-of-experts model with about 4B active parameters, aimed at lower cost and latency. Baseten expects it to match mammoth-1 on the index.

Both accept text and images and have a 128k-token context window, eight times larger than the company's previous models.

## Availability

The models are live on Baseten's Model APIs with weights on Hugging Face. Baseten's docs list pricing of $0.10 per million input tokens for bison-1 and $0.035 for groundhog-1.
