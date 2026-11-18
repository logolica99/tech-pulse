---
title: "Nvidia unveils Rubin HPC, a 50,000-core GPU built for scientific simulation"
date: "2026-11-17"
published: "2026-11-17T13:16:16-08:00"
summary: "Announced at SC26, Rubin HPC is a new Vera Rubin-platform GPU aimed at simulation and analytics rather than pure AI, with a record core count, faster data movement and NVLink 7, due in 2028."
tags:
  - AI
  - Chips
  - HPC
  - Nvidia
category: AI
sources:
  - title: "NVIDIA Announces Rubin HPC — A New GPU to Accelerate Agents for Science, Engineering and Analytics"
    url: "https://blogs.nvidia.com/blog/rubin-hpc/"
  - title: "Nvidia Recommits to FP64 with a New GPU, the Rubin HPC (HPCwire)"
    url: "https://www.hpcwire.com/2026/11/16/nvidia-recommits-to-fp64-with-a-new-gpu-the-rubin-hpc/"
draft: false
---

Nvidia used the SC26 supercomputing conference in Chicago to announce Rubin HPC, a new GPU in its Vera Rubin platform built for simulation, engineering and data analytics rather than training large AI models.

## What's in the chip

Nvidia says Rubin HPC will have more than 50,000 CUDA cores, a record for a single GPU. HPCwire puts that at three times the vector cores of Blackwell. The company says the design scales data movement along with compute, using a sparse-data acceleration feature to keep the cores busy and seventh-generation NVLink to link GPUs together. That targets the kind of work common in climate models, engineering simulations, genomics and financial risk: pulling scattered values out of huge datasets, computing on them and repeating that at scale.

Nvidia pitches the chip as part of its agent story. AI agents that propose new materials, molecules or designs still need simulations to test them, and faster simulations mean a faster loop of hypothesis, testing and refinement.

## Back to double precision

HPCwire reads the chip as Nvidia recommitting to FP64, the 64-bit math that traditional supercomputing depends on. Recent Nvidia data-center GPUs had put more weight on low-precision AI formats, and AMD has been pitching its upcoming MI430X on strong native FP64. Nvidia's Dion Harris told HPCwire the GPU is meant to handle a broad range of precisions, including FP4 and FP32. Nvidia has not said how much FP64 performance Rubin HPC will deliver.

Rubin HPC is expected to be available in 2028.
