---
title: "Thinking Machines releases Inkling 2 Mini, an open-weight looped model that runs on a laptop"
date: "2026-11-20"
published: "2026-11-20T18:15:00-08:00"
summary: "Thinking Machines Lab has released Inkling 2 Mini, a 26.4-billion-parameter open-weight mixture-of-experts model that loops its middle layers three times per token and needs about 20 GB of memory."
tags:
  - AI
  - Thinking Machines
  - Open Weights
  - LLM
category: AI
sources:
  - title: "Introducing Inkling 2 Mini (Thinking Machines Lab)"
    url: "https://thinkingmachines.ai/news/inkling-2-mini/"
draft: false
---

Thinking Machines Lab has released Inkling 2 Mini, a small open-weight model it says is strong enough for agentic coding and light enough to run on a laptop.

## A looped transformer

The unusual part is the architecture. Inkling 2 Mini is a looped transformer: it runs its middle layers three times for every token. The lab says this lets the model reason more internally and reach correct answers with fewer output tokens.

It is a mixture-of-experts model with 26.4 billion total parameters and 3.4 billion active per token (5.4 billion weight activations once looping is counted). Most weights were trained and ship in the 4-bit NVFP4 format, so the whole model takes about 20 GB of memory. The team says it ran the model offline on a MacBook Pro during a flight and had it build a playable flight simulator in minutes.

## Claimed results

According to Thinking Machines, Inkling 2 Mini leads all open-weight models under 100 billion total parameters on benchmarks such as DeepSWE v1.1 (48.2%) and Vals Index v2.2 (46.5%). These are the company's own reported scores.

## Thinking it doesn't write down

Because looping lets a model think without spelling out its reasoning, it could make chain-of-thought monitoring harder. The lab also released a research variant with a variable number of loops and says that, in its tests, the chain of thought got shorter but stayed readable as loops increased, and the model did not score higher on agentic sabotage tests. It is working with NDIF and interpretability lab Goodfire so researchers can study these models.

Weights for both models are on Hugging Face, with inference support in tools including vLLM, SGLang and Ollama, and fine-tuning on the lab's Tinker platform.
