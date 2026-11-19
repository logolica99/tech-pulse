---
title: "Apple releases FastFrames, video generation models fast enough for real-time interaction"
date: "2026-11-19"
published: "2026-11-19T15:15:00-08:00"
summary: "Apple researchers released FastFrames-S (1.3B) and FastFrames-L (14B), autoregressive video diffusion models that produce 480p video in under 50 ms per frame on Nvidia B200 GPUs, with code and checkpoints public."
tags:
  - AI
  - Video Generation
  - Apple
  - Research
category: AI
sources:
  - title: "FastFrames: Video Generation at Interactive Latency (project page)"
    url: "https://apple-aiml-research.github.io/ml-fastframes/"
  - title: "apple/FastFrames-L (Hugging Face)"
    url: "https://huggingface.co/apple/FastFrames-L"
draft: false
---

Apple's machine learning researchers have published FastFrames, a family of video generation models built to respond quickly enough for interactive use, along with code and model checkpoints. The release has two text-to-video models: FastFrames-S with 1.3 billion parameters and FastFrames-L with 14 billion. Both generate 480p video frame by frame.

## Where the speed comes from

The team, which includes Vladlen Koltun and collaborators from Cornell, says it profiled current autoregressive video diffusion pipelines and found that parts often treated as fixed overhead, like decoding the video's latent representation and updating the attention cache, took more than half of the total time. FastFrames replaces those steps with lighter components: a small pixel decoder and a "KV refinement" network. It also uses two-step diffusion sampling plus systems optimizations.

According to the researchers, FastFrames-S runs at 36 ms per frame on a single Nvidia B200 GPU. They say that matches the quality of a leading model that is almost 8 times slower. FastFrames-L runs at 45 ms per frame on an 8-GPU B200 node, and the team says it delivers clearly better realism and text rendering. Both fall under the 50 ms target the paper uses for interactive latency.

## What it's for

Autoregressive video models generate each new frame from fresh inputs, so they can be steered while they run. The researchers show this with camera control and physics-based dragging. They also say applying their optimizations to the LingBot 1.3B world model made it 16 times faster.

FastFrames-L was built by distilling the open Wan2.1-14B model into a two-step causal generator, and Apple has published every intermediate checkpoint. The FastFrames code is under the Apple Sample Code License, and the bundled LingBot components keep their upstream non-commercial CC BY-NC-SA 4.0 license.
