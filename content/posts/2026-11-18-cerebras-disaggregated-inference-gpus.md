---
title: "Cerebras pairs GPUs with its wafer-scale chips in new disaggregated inference service"
date: "2026-11-18"
published: "2026-11-18T16:15:00-08:00"
summary: "Cerebras now runs AI inference with AMD Instinct GPUs handling prompt processing and its CS-3 systems generating output, a split it says delivers five times more tokens per megawatt without slowing generation."
tags:
  - AI
  - Chips
  - Inference
category: AI
sources:
  - title: "Cerebras Launches Disaggregated Inference (Cerebras)"
    url: "https://www.cerebras.ai/blog/cerebras-launches-disaggregated-inference"
  - title: "Cerebras Puts Disaggregated Inference Into Production With GPUs (Unite.AI)"
    url: "https://www.unite.ai/cerebras-puts-disaggregated-inference-into-production-with-gpus/"
draft: false
---

Cerebras has put "disaggregated inference" into production, splitting the work of serving AI models between two kinds of hardware instead of running everything on its own wafer-scale systems.

## How it works

Answering a prompt has two stages. Prefill reads the whole input at once and is heavy on raw compute. Decode then produces the reply one token at a time and is limited mostly by memory bandwidth, which is where Cerebras' chips shine. In Cerebras' production setup, AMD Instinct GPUs handle prefill and Cerebras CS-3 systems handle decode, with software called KV Portal moving the intermediate model state between them over RDMA.

Cerebras says that, measured on a shared GPT-OSS-120B endpoint on its inference cloud, the combination delivered five times the throughput per megawatt of a CS-3-only setup with no loss in generation speed. That figure comes from the company, and it notes results vary by workload and model.

## Who gets it

Partners can either use Cerebras' full stack, which routes requests and runs prefill on open-source engines like vLLM or SGLang, or a decode-only SDK that plugs into their own systems. Amazon Web Services, Fireworks AI, Gimlet Labs, and General Compute are early-access partners, and Cerebras says it is widening access. The company aims to deploy the approach across hundreds of megawatts in its cloud and partner data centers by the end of 2027, a target rather than capacity that exists today.
