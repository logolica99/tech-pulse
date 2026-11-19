---
title: "Penn's self-sensing artificial muscle lets robot hands play softly and robot eyes hold a gaze"
date: "2026-11-19"
published: "2026-11-19T05:13:00-08:00"
summary: "University of Pennsylvania engineers built a soft artificial muscle fiber with a built-in copper coil that both heats it and senses its temperature, so it can hold precise positions instead of drifting back."
tags:
  - Robotics
  - Research
  - Soft Robotics
category: Robotics
sources:
  - title: "Robots can do backflips but can't hold a gaze or press piano keys, and scientists think they've fixed that (TechSpot)"
    url: "https://www.techspot.com/news/114610-robots-can-do-backflips-but-cant-hold-gaze.html"
draft: false
---

Robots can walk and flip, but small, steady movements are still hard for the rigid motors inside them. Engineers at the University of Pennsylvania have built an artificial muscle fiber aimed at exactly that gap, modeled on the fine muscles that move human fingers and eyes. The work is published in *Advanced Functional Materials*.

## How the fiber works

The moving part is a rubber-like liquid crystal elastomer that contracts and stretches when heated. Graphene mixed into it makes the fiber softer and tougher, so it survives being pulled by an opposing muscle.

On its own, though, the fiber cools quickly and creeps back to its resting length. The fix is an ultrathin copper coil built into the fiber that acts as both heater and thermometer. The team reads the coil's resistance as a feedback signal and adjusts heating power in real time to hold a target value, so no separate sensor is needed. That keeps the design simple as muscles get smaller and packed more tightly.

## Tests

- **Piano hand:** fitted into a 3D-printed robot hand, the fibers pressed piano keys with different forces and speeds on command, measured by sensors under the keys.
- **Robot eyes:** mounted in opposing pairs around two robotic eyeballs on free-rotating joints, they shifted gaze in controlled, repeatable movements.

## Next steps

The researchers plan to combine many fibers into larger systems, such as faces where dozens of small muscles work together, and eventually to explore using AI computer vision to coordinate them.
