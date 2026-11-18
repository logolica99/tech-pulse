---
title: "Anthropic and Google Project Zero shorten bug disclosure deadlines as AI speeds up discovery"
date: "2026-11-17"
published: "2026-11-17T17:07:53-08:00"
summary: "Anthropic will publish serious vulnerabilities it reports after 30 days instead of 90 starting January 2027, and Google Project Zero plans to cut its 90-day fix window to 60 days, then 30, because AI now finds and rediscovers bugs much faster."
tags:
  - AI
  - Security
category: AI
sources:
  - title: "Updating our coordinated vulnerability disclosure policy timelines (Anthropic)"
    url: "https://www.anthropic.com/research/coordinated-vulnerability-disclosure-timelines"
  - title: "Anthropic vulnerability disclosure deadline drops to 30 days for serious bugs (Help Net Security)"
    url: "https://www.helpnetsecurity.com/2026/11/17/anthropic-vulnerability-disclosure-days/"
  - title: "Google, Anthropic slash disclosure timelines amid AI rush (TechTarget)"
    url: "https://www.techtarget.com/news/google-anthropic-slash-disclosure-timelines-amid-ai-rush/874950/"
draft: false
---

For years the standard deal in security research was simple: report a bug privately, then give the vendor about 90 days before going public. Two of the biggest AI labs now say that clock no longer fits a world where models can find bugs in bulk.

## Anthropic's new timelines

In a post from its Frontier Red Team dated 16 November, Anthropic said it will cut its coordinated vulnerability disclosure window from 90 days to 30 days for high- and critical-severity issues, and to 45 days for everything else. The change applies to reports sent to vendors and maintainers on or after 1 January 2027; reports already open on that date keep their original deadlines.

Two related clocks are getting shorter too. If a maintainer doesn't answer the first report, Anthropic will aim to bring in an external vulnerability coordinator after 15 days instead of 30. And once a patch ships, it will wait 30 days instead of 45 before publishing full technical details. The seven-day window for bugs that are already being exploited stays the same.

Anthropic also said it is giving maintainers of older serious reports, which are already past the 90-day deadline and still undisclosed, an extra 30 days before it publishes them on its dashboard.

## Why

Anthropic's reasoning is that the old norms assumed fixes moved at human speed and that the same bug was unlikely to be found twice independently. It says neither holds now: models help write fixes, and it is seeing more rediscovery of the same vulnerabilities as AI capabilities grow.

The company says it will still negotiate longer timelines for hard-to-patch cases, such as critical infrastructure or flaws that need a change to a specification or RFC. The policy doesn't cover AI findings that haven't had human review, such as those from its OSS Scanner service.

## Google moves in the same direction

TechTarget reports that Google Project Zero announced a similar overhaul this week. Its current policy gives vendors 90 days to fix a bug, plus 30 days of patch "soak time." According to TechTarget, Google will cut the fix window to 60 days starting in February 2027 and to 30 days by January 2028, and will drop grace periods and negotiations over whether a bug is fixed.

## What it means

Shorter deadlines put more pressure on vendors and open-source maintainers, who now have a third of the time to triage and patch a serious flaw found by Anthropic. To offset that, Anthropic says it will keep sending patches or mitigations with its reports where it can, and pointed maintainers to its free OSS Scanner and Claude for Open Source programs.
