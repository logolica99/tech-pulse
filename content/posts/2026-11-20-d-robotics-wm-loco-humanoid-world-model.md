---
title: "D-Robotics' WM-LOCO uses a world model to help humanoids cross beams and stepping stones"
date: "2026-11-20"
published: "2026-11-20T09:31:00-08:00"
summary: "D-Robotics unveiled WM-LOCO, a humanoid walking system trained jointly with a predictive world model; deployed with no extra tuning on a Unitree G1, it crossed trenches, stairs, stepping posts and beams in 92.5% of tests."
tags:
  - Robotics
  - Humanoids
  - World Models
  - Reinforcement Learning
category: Robotics
sources:
  - title: "D-Robotics Launches WM-LOCO Solution (Gasgoo)"
    url: "https://autonews.gasgoo.com/articles/news/d-robotics-launches-wm-loco-solution-2123785542550147073"
draft: false
---

Walking on flat floors is mostly solved for humanoid robots. Walking where there are only a few safe places to put a foot is not. Chinese robotics computing company D-Robotics says its new WM-LOCO system makes progress on that problem, Gasgoo reports.

## How it works

WM-LOCO trains a predictive world model and a reinforcement learning walking policy together, end to end, which the company says is a first for this kind of task. The world model takes in depth images from the robot's cameras, the robot's own body signals and its recent actions, and learns how each movement will change what the robot feels and sees next.

Those predictions feed straight into the controller, so the robot can coordinate its body with where its feet land without first planning out several steps ahead. The approach also skips hand-labeled footholds and the separate "teacher" models that many walking systems rely on, going directly from vision to joint commands.

## The results

In simulation, the company says WM-LOCO cleared nearly 100% of runs across four tricky terrains: stepping posts, stairs, trenches and balance beams. When the same trained model was loaded onto a physical Unitree G1 humanoid with no extra tuning, it succeeded in 92.5% of 40 trials, 10 per terrain type. The robot crossed a trench 0.8 meters wide and a beam just 10 centimeters across.

D-Robotics says it has shown the system running live at public events on its Sunrise S600 computing platform and has published technical papers and a project page. The figures are the company's own.
