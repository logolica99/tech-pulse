---
title: "Google turns Antigravity into a robotics workbench for Gemini 4 Hydrogen"
date: "2026-11-17"
summary: "Google launched a Robotics plugin for its Antigravity tool that handles robot bring-up, MuJoCo simulation and control, built around Gemini 4 Hydrogen, a fast Gemini 4 model with embodied reasoning that Google says rivals Argon on a real robot-arm benchmark."
tags:
  - Robotics
  - AI
  - Google
category: Robotics
sources:
  - title: "Gemini 4 Hydrogen: a faster model for general purpose robotics (Google Developers Blog)"
    url: "https://developers.googleblog.com/gemini-hydrogen-for-robotics/"
draft: false
---

Google has launched a Robotics plugin for Google Antigravity. It packages the work of setting up and programming a robot arm into skills that Gemini can carry out for a developer. The plugin is built around Gemini 4 Hydrogen, a faster Gemini 4 model that Google introduced last week. Google says the pair can take a developer from a robot in a box to a working application in an afternoon.

## The model

Google says Hydrogen keeps the ability of the larger Gemini 4 Argon and Carbon models to drive a robot arm directly. Given a plain-language goal and a camera view, it plans the task, writes and runs control code, and keeps adjusting until the job is done. On the Artificial Analysis Robotics 0.1 benchmark, where a model controls a real 6-axis arm through eight tabletop tasks, Google says Hydrogen scores 58, close to Argon but at a lower cost per token.

Hydrogen also folds in the skills of Google's separate Gemini Robotics ER 2 embodied-reasoning models. Google says it beats ER 2 on spatial reasoning tasks in the public ERQA benchmark and recommends that ER 2 users try it.

## The plugin

According to Google, the Robotics plugin covers:

- **Bring-up:** installing drivers, finding cameras, calibrating the arm and checking safe motion, starting from a USB connection.
- **Simulation:** building and previewing MuJoCo scenes and assets inside Antigravity, so ideas can be tested in sim first.
- **Perception and control:** finding objects, planning grasps and running the robot in a closed loop.
- **Application building:** generating controllers and simulations for a full real-to-sim-to-real workflow.

In Google's demo, an I2RT YAM arm with a depth camera went from a USB connection to calibrated and ready for tasks in about 10 minutes. Google says similar flows work for the low-cost SO-ARM101 arm and an FR3 Duo. Developers can install the plugin from the Customizations section in Antigravity.
