---
title: "OpenAI says its models found up to 14% chip-design gains on AMD's flagship GPU"
date: "2026-11-18"
published: "2026-11-18T09:15:00-08:00"
summary: "OpenAI says its frontier models rewrote chip circuit code to deliver up to 14% power, performance, and area gains on AMD's flagship GPU IP, and AMD has already put some changes into a design sent for manufacturing."
tags:
  - AI
  - OpenAI
  - AMD
  - Chips
category: AI
sources:
  - title: "Advancing chip design with OpenAI models (OpenAI)"
    url: "https://openai.com/index/advancing-chip-design-with-our-models/"
draft: false
---

OpenAI has published new details on using its own models to design chips, and says the approach is now paying off on someone else's hardware: AMD's.

## The AMD results

According to OpenAI, its model rewrote the SystemVerilog RTL, the code that describes a chip's circuits, for AMD's flagship GPU IP and delivered up to a 14% improvement in power, performance, and area (PPA) over already heavily optimized baselines. OpenAI calls it roughly a year of progress in under five months. AMD has already folded some of the changes into a recent design sent for manufacturing and added others to its production design files.

OpenAI also says AMD verified single-digit percentage PPA gains across key blocks of its upcoming next-generation flagship CPU using model-written designs. The model used Synopsys tools to check that each rewrite kept the block's behavior intact.

## Back to Jalapeño

The post revisits OpenAI's first custom inference chip, Jalapeño. The team estimates model-proposed changes cut standard-cell area by about 13% in the warp engine and 10% in the matrix unit, and says those changes were proven in silicon. One multiplier redesign used about 15% less area while dropping latency from two clock cycles to one.

## Measuring progress

To compare model generations, OpenAI tested them on two open-source RISC-V cores, PicoRV32 and Ibex, both optimizing existing designs and building cores from a written spec. At a comparable budget of about 112,000 tokens per run, GPT-6.2 Astra scored highest on both. OpenAI notes the spec-based test lets models skip features like performance counters, which may inflate those scores.

Next, OpenAI says it is working with Synopsys to train a new model, GPT-Synopsys, to use electronic design automation tools the way expert chip designers do. All figures here are company-reported.
