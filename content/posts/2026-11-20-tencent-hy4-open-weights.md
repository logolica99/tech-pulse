---
title: "Tencent opens the weights of Hy4, its 770-billion-parameter flagship model"
date: "2026-11-20"
published: "2026-11-20T09:25:00-08:00"
summary: "Tencent has put the weights of its flagship Hy4 model on Hugging Face, a multimodal mixture-of-experts model with 770 billion parameters, 49 billion active per token and a context window of about one million tokens."
tags:
  - AI
  - Tencent
  - Open Weights
  - LLM
category: AI
sources:
  - title: "tencent/Hy4 model card (Hugging Face)"
    url: "https://huggingface.co/tencent/Hy4"
  - title: "Tencent Hy License, Version 1.0 (Hugging Face)"
    url: "https://huggingface.co/tencent/Hy4/blob/main/LICENSE"
  - title: "Tencent releases Hy4 model weights with million-token context (TechNode)"
    url: "https://technode.com/2026/11/20/tencent-releases-hy4-model-weights-with-million-token-context/"
draft: false
---

Tencent has made its flagship Hy4 model downloadable. On Friday the company published the weights on Hugging Face, so developers can run and fine-tune the model on their own hardware instead of only reaching it through Tencent's services. Hy4 first launched on November 4, TechNode notes, and the release comes a few days after Tencent opened the weights of the smaller [Hy4 flash](/posts/2026-11-17-tencent-hy4-flash).

## What's inside

According to Tencent's model card, Hy4 is a mixture-of-experts model that understands text, images and video. Its language backbone has 770 billion parameters in total, but only about 49 billion are used for each token. It has 78 layers, 256 routed experts per MoE layer plus one shared expert, and a context window of 1,048,576 tokens.

The model also ships with a small built-in drafter of about 3.3 billion parameters, called DFly2, used for speculative decoding to speed up generation. Tencent says the attention design borrows ideas from DeepSeek and GLM, using a gated version of DeepSeek Sparse Attention.

Tencent provides recipes for serving the model with vLLM and SGLang, a fine-tuning guide, and a system card with its own safety test results. The company pitches Hy4 for computer use, front-end and game development, office and finance work, and long-running assistant tasks. The benchmark numbers on the model card are Tencent's own.

## The license fine print

The weights come under the Tencent Hy License, which is based on Apache 2.0 but adds commercial terms. Companies that offer the model as a general-purpose service through an API need a separate written license from Tencent if they have more than $50 million in yearly revenue, or if the product has more than 100 million monthly users. Purely internal use is exempt from that requirement.
