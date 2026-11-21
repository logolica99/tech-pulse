---
title: "Nvidia launches Nemotron for Science to help researchers build discovery agents"
date: "2026-11-20"
published: "2026-11-20T18:15:00-08:00"
summary: "Nvidia has bundled its open Nemotron 3.5 Super VL model, a new open chemistry dataset of nearly 50,000 questions and post-training recipes into Nemotron for Science, aimed at AI agents for chemistry, biology and materials research."
tags:
  - AI
  - Nvidia
  - Science
  - Open Models
category: AI
sources:
  - title: "NVIDIA launches Nemotron for scientific discovery agents (Engineering.com)"
    url: "https://www.engineering.com/nvidia-launches-nemotron-for-scientific-discovery-agents/"
draft: false
---

Nvidia has introduced Nemotron for Science, a package meant to help researchers build AI agents that work through scientific problems and use specialist research tools.

## What's in it

The package is built on Nvidia's open Nemotron 3.5 Super VL model. It adds LitmusBench v0.2, a new open dataset of nearly 50,000 chemistry questions drawn from molecular property and drug discovery data, plus recipes for post-training the model on domain-specific data. The model and dataset are available on Hugging Face, and the model is optimized to run locally on a 128 GB DGX Spark system.

## Early users

Nvidia pointed to several groups already adapting the model:

- **Terray Therapeutics** post-trained it to pull reactants, products and reaction conditions out of chemistry diagrams, recovering about 76% of annotated reactions on the RxnScribe test.
- **Lila Sciences** uses it to write lab protocols for its automated labs. Nvidia says training on lab feedback nearly doubled its accuracy at making quantum dots, to 61%, at a fraction of the inference cost of a frontier model.
- **Therna** tuned it for mRNA therapeutic design.
- **Argonne**, **Jülich Supercomputing Centre**, **KTH** and **RIKEN** are building it into research agents or offering it on their computing platforms.

The performance numbers come from Nvidia's announcement and its partners, not independent tests.
