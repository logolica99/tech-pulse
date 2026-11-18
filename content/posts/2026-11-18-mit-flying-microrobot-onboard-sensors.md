---
title: "MIT's paperclip-weight flying robot now carries its own sensors and computer"
date: "2026-11-18"
published: "2026-11-18T12:20:00-08:00"
summary: "MIT researchers built a flapping-wing microrobot that senses and computes onboard, flying precise paths and landing on a sunflower without a lab motion-capture system, though it still draws power through a tether."
tags:
  - Robotics
  - Microrobots
  - Research
category: Robotics
sources:
  - title: "This featherweight, flying robot carries its own sensors and computers (MIT News)"
    url: "https://news.mit.edu/2026/featherweight-flying-robot-carries-its-own-sensors-and-computers-1118"
draft: false
---

MIT's insect-scale flying robots have been fast and agile for years, but they always needed a room full of motion-capture cameras to know where they were. A new version, described in Science Robotics, does its own sensing and computing in flight.

## Making room for electronics

The four-winged robot, about the size of a microcassette and lighter than a paperclip, flaps its wings with soft artificial muscles. The team enlarged those actuators by 50 percent and tuned their geometry so net lift rose 46 percent, reaching a lift-to-weight ratio of 1.9. That headroom lets it carry a 244-milligram electronics package with a microcontroller, an inertial measurement unit for attitude, an optical flow sensor for sideways speed and position, and a time-of-flight sensor for height.

## Fast beats perfect

Without external cameras the robot tends to drift, so the researchers wrote a simplified estimator that updates position very quickly. They found frequent, cheaper estimates worked better than slower, more accurate ones. In tests it hovered and followed point-to-point paths with errors of a few centimeters, and, guided by joystick setpoints, wove around plants and landed on a sunflower outside the motion-capture area. MIT's Kevin Chen called it the first aerial microrobot that is autonomous in both sensing and computation.

## Still on a leash

The robot still gets power through a tether. The electronics use only about 6 percent of its power; the rest drives the wings. Next steps are an onboard camera for obstacle avoidance and onboard batteries for untethered outdoor flight, with uses such as crop pollination and monitoring in mind.
