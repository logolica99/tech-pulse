---
title: "Nvidia's Vera Rubin debuts in MLPerf with up to 2x per-GPU training gains"
date: "2026-11-17"
summary: "In the MLPerf Training v6.1 round, Nvidia says its new Vera Rubin NVL72 systems delivered up to twice the per-GPU training performance of GB300 NVL72, and it was the only platform with results on every benchmark."
tags:
  - AI
  - Nvidia
  - Chips
  - Benchmarks
category: AI
sources:
  - title: "NVIDIA Sweeps MLPerf Training and Endpoints as Vera Rubin Debuts With Leading Performance (NVIDIA Blog)"
    url: "https://blogs.nvidia.com/blog/mlperf-training-endpoints-vera-rubin/"
draft: false
---

Nvidia's next-generation Vera Rubin platform has shown up in industry benchmarks for the first time. MLCommons released the MLPerf Training v6.1 results on November 16, and Nvidia used the occasion to make a big claim about its new rack-scale system.

MLPerf Training measures how quickly a system can train a set of AI models to a fixed accuracy target, covering large language models, image generation, recommender systems and reinforcement-learning post-training.

## What Nvidia is claiming

The figures below come from Nvidia's own write-up of the results:

- **Per-GPU speed:** Vera Rubin NVL72 delivered up to 2x the performance per GPU of the GB300 NVL72 system in this round.
- **Coverage:** Nvidia says its platform was the only one with results on every benchmark.
- **Scaling:** On the DeepSeek-V3 benchmark, going from 256 to 1,024 Vera Rubin GPUs cut training time from 16 minutes to about four, roughly 97% scaling efficiency.
- **Biggest runs:** Nvidia ran the benchmark on 10,240 GPUs using GB300 systems, the largest scale in the round, and Microsoft Azure matched it with 10,240 GPUs on GB200 systems.

Twenty partner organizations, including cloud providers and server makers, submitted results on Nvidia hardware.

## Agentic inference

Nvidia also made its first submission to MLPerf Endpoints, a newer benchmark that tests systems on agentic coding and enterprise workflows. In a provisional Kimi K3 result, Nvidia says Vera Rubin NVL72 produced more than 10x the throughput per watt of GB300 NVL72 at the same response speed. That Vera Rubin figure is still pending MLCommons verification, so it could change.

The pitch behind the numbers is power: AI data centers are increasingly limited by electricity, so how much work a system gets done per watt matters as much as raw speed.
