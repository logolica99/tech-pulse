---
title: "NVIDIA open-sources MotionBricks, a real-time motion model for characters and humanoid robots"
date: "2026-11-21"
published: "2026-11-21T18:11:00-08:00"
summary: "NVIDIA has released MotionBricks, a generative motion model that fills in movement between target poses in real time, with pretrained models for a human body model and the Unitree G1 humanoid robot."
tags:
  - Robotics
  - NVIDIA
  - Humanoids
  - Open Source
category: Robotics
sources:
  - title: "MotionBricks project page (NVIDIA Research)"
    url: "https://nvlabs.github.io/motionbricks/"
  - title: "NVlabs/motionbricks (GitHub)"
    url: "https://github.com/NVlabs/motionbricks"
  - title: "NVIDIA just open-sourced the motion engine behind its humanoid stack (Humanoid Beat)"
    url: "https://humanoidbeat.com/news/nvidia-motionbricks-open-source-real-time-motion-model-unitree-g1-soma.html"
draft: false
---

NVIDIA has open-sourced MotionBricks, a model that generates smooth body motion in real time for animated characters and humanoid robots. The release includes a runtime plus pretrained models for SOMA, a human body model, and for Unitree's G1 humanoid, along with demos and editing tools.

## How it works

Instead of animating every step, a user sets the poses a character or robot should reach and the model generates the movement in between. NVIDIA's project page describes a single generative backbone trained on more than 350,000 motion clips and claims 15,000 frames per second with 2 ms latency. Those speed figures are NVIDIA's own and have not been independently tested.

The second piece is what NVIDIA calls smart primitives: reusable building blocks for navigation and for interacting with objects, such as vaulting a ledge or sitting on a chair. NVIDIA says the system works on new tasks zero-shot, with no fine-tuning or task-specific tagging, so scenes can be assembled "like stacking bricks". The work was published at SIGGRAPH 2026.

## Why it matters for robots

According to Humanoid Beat, NVIDIA says MotionBricks is now a core part of its GR00T Whole-Body Control effort, where it drives the motion-generation layer. Shipping a ready model for the widely used Unitree G1 gives robot builders a free starting point for natural-looking movement. Humanoid Beat reports the code is under the Apache 2.0 license and the model weights under NVIDIA's Open Model Agreement, which allows commercial use.
