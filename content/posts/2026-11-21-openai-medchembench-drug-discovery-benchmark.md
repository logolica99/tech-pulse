---
title: "OpenAI launches MedChemBench to test AI on medicinal chemistry reasoning"
date: "2026-11-21"
published: "2026-11-21T09:08:00-08:00"
summary: "OpenAI's new benchmark has 99 problems drawn from 117 papers and patents, testing whether models can read molecules, weigh experimental evidence and pick which drug candidates to make next."
tags:
  - AI
  - OpenAI
  - Drug Discovery
  - Benchmarks
category: AI
sources:
  - title: "Can AI help scientists identify promising drug candidates? (OpenAI)"
    url: "https://openai.com/index/introducing-medchembench/"
draft: false
---

OpenAI has released MedChemBench, a benchmark built to check whether AI models can do the kind of reasoning medicinal chemists use when deciding which drug compounds to pursue.

## What it tests

The benchmark has 99 problems taken from 117 published papers and patents, covering 761 distinct molecular structures. In most problems the model gets what researchers knew at a given point in a real project: the biological target, the goals, the compounds tested so far and some experimental results. It is then graded on four things:

- **Molecular structures:** rebuilding molecules correctly from drawings and chemical groups, including stereochemistry.
- **Scientific reasoning:** explanations backed by the evidence provided.
- **Ranking and selection:** choosing compounds that meet the stated goals.
- **Property predictions:** matching measured values, with partial credit for close answers.

One example uses research on PRMT5 inhibitors, a cancer target, where the model must predict how three related compounds trade off potency, cell permeability and how fast liver enzymes break them down.

## Results

At the highest reasoning setting, OpenAI says GPT-6.2 Astra earned 84.5% of the available credit, compared with 83.3% for GPT-6 Astra, 82.0% for GPT-6.1 Sol and 58.2% for GPT-5.6 Sol. OpenAI says models were strongest at rebuilding structures and explaining evidence, and weaker at selecting compounds and predicting numerical properties.
