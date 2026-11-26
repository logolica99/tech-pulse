---
title: "Microsoft: six threat groups, including Salt Typhoon, now run attacks through the ARTEX AI framework"
date: "2026-11-26"
published: "2026-11-26T09:20:00-08:00"
summary: "Microsoft Threat Intelligence says state-backed and criminal groups have folded ARTEX, an open AI-agent penetration testing framework released in July, into their tooling, and that its machine-speed behavior is the best way to spot it."
tags:
  - Cybersecurity
  - AI agents
  - Microsoft
  - ARTEX
category: AI
sources:
  - title: "Microsoft Security Blog: What defenders need to know about ARTEX, the agentic AI framework threat actors abuse"
    url: "https://www.microsoft.com/en-us/security/blog/2026/11/25/what-defenders-need-to-know-artex-agentic-ai-framework-threat-actors-abuse/"
draft: false
---

Microsoft Threat Intelligence has published a detailed breakdown of ARTEX, a publicly available AI-powered penetration testing framework that it says attackers have widely abused since its release in July 2026.

## Who is using it

As of November, Microsoft says it has seen both state-sponsored and financially motivated groups add ARTEX to their tooling: Storm-0940, Storm-3358, Onyx Sleet, Pearl Sleet, Crystal Typhoon and Salt Typhoon. In recent weeks Microsoft has reported separate ARTEX campaigns that searched public code repositories for exposed secrets, enabled a supply chain compromise and scanned internet-facing systems for holes.

## What it does

The attacker sets the scope and targets. ARTEX's AI agents then set goals, plan the steps for each stage, run tools against the target, keep a graph of the systems and results they find, and report back. Depending on how it's configured and how well the target is defended, Microsoft says it can go from reconnaissance to persistent, privileged access in minutes.

Microsoft stresses that ARTEX doesn't invent new attack techniques. It chains common, existing penetration testing tools. What's new is the speed.

## How to catch it

Attackers change surface details like IP addresses and user-agent strings, so Microsoft says the most reliable signal is behavior: a wide burst of varied requests in a short window, and retries or next-stage moves at machine speed. Its advice is to shrink internet-facing exposure, lock down credentials and secrets, limit lateral movement paths and turn on automatic attack disruption in Defender XDR.
