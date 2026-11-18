---
title: "Alibaba launches Qwen4-Max, a 2.4-trillion-parameter flagship without open weights"
date: "2026-11-17"
published: "2026-11-17T08:09:46-08:00"
summary: "Alibaba's new flagship Qwen4-Max is a sparse mixture-of-experts model with a one-million-token context window. It is available only through Alibaba's cloud and apps, and smaller open-weight Qwen4 models are promised later."
tags:
  - AI
  - Models
  - China
category: AI
sources:
  - title: "Alibaba Unveils Qwen4-Max: New AI Teammate for Work, Creativity, and Discovery (Alibaba Cloud)"
    url: "https://www.alibabacloud.com/en/press-room/alibaba-unveils-qwen4-max"
  - title: "Alibaba launches Qwen4-Max flagship AI model without open weights (TNW)"
    url: "https://thenextweb.com/news/alibaba-launches-qwen4-max-flagship-ai-model-without-open-weights"
draft: false
---

Alibaba has released Qwen4-Max, the new top model in its Qwen family. Unlike many earlier Qwen releases, its weights are not available for download.

## The model

Alibaba says Qwen4-Max is a mixture-of-experts model with 2.4 trillion total parameters, of which 71 billion are active for each token. That is 25% fewer active parameters than its predecessor, Qwen3.8-Max, which had the same total size. The new model takes text, images and video as input and has a context window of one million tokens.

According to the company, Qwen4-Max ranked 6th on the Code Arena coding leaderboard. On Work360, Alibaba's own benchmark, it used 35% fewer tokens in high-effort reasoning and cut the average cost per task by around 60% compared with Qwen3.8-Max. TNW gives that cost as falling from $4.43 to $1.67. TNW also points out that the benchmark numbers come from Alibaba and that the published charts are mixed: the model leads on some coding tests and trails rivals on others, such as Terminal-Bench.

## Access and safety

Developers can use the model through the QwenCloud API. TNW reports pricing of $1.50 per million input tokens and $4.50 per million output tokens. The model is also available in Alibaba's QwenWork, Qwen Studio and Qoder products. Alibaba says it filtered the training data to keep defensive cybersecurity material and remove offensive attack content, and that it added safety training aimed at chemical, biological, radiological and nuclear risks.

Alibaba also says that in one demo, the model ran as an agent for 48 hours straight to find a chip-coolant molecule that was then validated in a lab. The company plans to release smaller Qwen4 models with open weights but has not given a date.
