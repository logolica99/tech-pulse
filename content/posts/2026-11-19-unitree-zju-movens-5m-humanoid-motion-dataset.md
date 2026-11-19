---
title: "Zhejiang University and Unitree open-source Movens-5M, 5 million robot-ready motions learned from web video"
date: "2026-11-19"
published: "2026-11-19T04:14:00-08:00"
summary: "A Zhejiang University and Unitree lab released Movens-5M, 5 million simulation-verified humanoid motions (10,000+ hours) built from internet video, plus Movens-Zero models that turn text, speech, music or video into whole-body robot movement."
tags:
  - Robotics
  - Humanoids
  - Open Source
  - AI
category: Robotics
sources:
  - title: "Movens-Zero: Scaling Humanoid Motion Foundation Models (project page)"
    url: "https://movens-zero.github.io/"
  - title: "Movens-5M dataset on Hugging Face"
    url: "https://huggingface.co/datasets/wendell0218/Movens-5M"
  - title: "浙大宇树开源500万条机器人预训练数据 (NetEase / 机器之心)"
    url: "https://www.163.com/dy/article/LC0V9FEE0511AQHO.html"
draft: false
---

Teaching humanoid robots to move like people usually depends on motion capture, which is precise but slow and expensive to scale. A joint embodied-intelligence lab from Zhejiang University and Unitree Robotics is betting on a different source: ordinary internet video.

The team has open-sourced **Movens-5M**, a dataset of 5 million humanoid motions that were checked in simulation to make sure a robot can actually execute them. It totals more than 10,000 hours of behavior and over a billion motion frames, drawn from about 15 million recovered human motions. The clips cover 297 fine-grained actions, such as walking, squatting, mopping, boxing and lifting weights, across 16 kinds of scenes from home life to fitness and outdoor activities.

To get there, the team built a five-stage pipeline: it cuts raw video into clips, filters out low-quality footage, adds text descriptions of what each body part does over time, reconstructs the person's 3D motion, and then retargets and repairs that motion for Unitree's G1 humanoid before verifying it in simulation.

Each motion is paired with text and, where available, video, speech and music. Using this data the team trained **Movens-Zero**, a family of motion models from about 64 million to 910 million parameters that can generate whole-body movement from any of those four inputs. Demos on a real G1 show it dancing hip-hop from a text prompt, saluting on a spoken command and moving to music. The team also ran scaling experiments to test whether more data and bigger models keep improving results.

The code and model checkpoints are public alongside the dataset. The dataset carries a custom license, so anyone planning to reuse it should check the release terms.
