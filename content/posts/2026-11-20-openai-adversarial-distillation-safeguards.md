---
title: "OpenAI details how it fights adversarial distillation of its models"
date: "2026-11-20"
published: "2026-11-20T18:15:00-08:00"
summary: "OpenAI says copying a frontier model's outputs to train another model can strip away its safeguards, and reports that new protections cut attacks extracting GPT-6.2 Astra's hidden reasoning from a 54% success rate to 0.2%."
tags:
  - AI
  - OpenAI
  - AI Safety
  - Security
category: AI
sources:
  - title: "Combatting adversarial distillation (OpenAI)"
    url: "https://openai.com/index/combatting-adversarial-distillation/"
draft: false
---

OpenAI has published how it detects and blocks adversarial distillation, the practice of training a new model on another model's outputs without permission.

## Why OpenAI calls it a safety issue

Distillation is a normal machine-learning technique, but OpenAI argues that unauthorized copying is more than an intellectual property problem. A copied model can pick up frontier skills, such as finding software vulnerabilities or helping with biology research, without the safeguards that limit how the original uses them. The company gives the example of an attacker distilling a model's cyber skills and then using the copy for attacks the original would have refused.

## Protecting hidden reasoning

OpenAI says it puts special weight on protecting a model's chain of thought, the intermediate reasoning it produces before answering. Those traces can contain information missing from the final answer, which makes them especially useful for training a copy.

The company says it strengthened these protections in GPT-6.2 Astra and GPT-6.2 Sol. In an internal test with automated red-teaming, the average success rate of attacks trying to recover earlier hidden reasoning fell from 54.0% against GPT-6 Astra to 0.2% against GPT-6.2 Astra. That figure is OpenAI's own evaluation.

## The playbook

OpenAI's approach mixes adversarial testing, training, classifiers and API-level limits with investigations into coordinated extraction campaigns. It recommends that other developers check both responses and tool calls for reasoning leaks, keep successful attacks as regression tests, pair per-request defenses with campaign-level enforcement, and share findings with other labs, which OpenAI says it already does through the Frontier Model Forum and government channels.
