---
title: "OpenRouter drops three AI providers after researchers catch prompts leaking"
date: "2026-11-22"
published: "2026-11-22T09:15:00-08:00"
summary: "After Dragos researcher HD Moore planted about two million canary prompts across AI services, OpenRouter off-boarded three inference providers and pulled 125 endpoints from its Zero Data Retention list."
tags:
  - AI
  - Security
  - Privacy
  - OpenRouter
category: AI
sources:
  - title: "Data Processing Incidents on Inference Providers (OpenRouter)"
    url: "https://openrouter.ai/blog/announcements/data-processing-incidents-on-inference-providers/"
  - title: "OpenRouter Drops 3 Providers After Researchers Catch Months of Prompt Theft at AI Hosting Firms (The Hacker News)"
    url: "https://thehackernews.com/2026/11/openrouter-drops-3-providers-after.html"
draft: false
---

OpenRouter, the gateway that sends customers' AI requests to a pool of third-party model hosts, said on November 22 that it has removed three inference providers from its platform. It also pulled 125 endpoints from its Zero Data Retention (ZDR) list, the setting meant to promise that prompts are not stored. OpenRouter says the findings showed no breach of its own systems and that it has notified every customer who may have been affected.

## How the leaks were found

The trigger was research from industrial security firm Dragos, led by chief research officer HD Moore. According to The Hacker News, the team seeded about two million prompts with unique links and fake credentials between July and November, then watched for anyone using them. Because each secret was sent only once, any use proved someone had read that prompt.

The research reports three providers compromised by attackers, the earliest from mid-July. In one case, AWS keys planted during short windows in late October were all stolen and tested, sometimes within hours. It also describes marketplace sellers who listed models cheaply with request logging turned on and then harvested the traffic, plus prompts marked ZDR that were still fetched by a model developer's crawler. Neither Dragos nor OpenRouter has named the three providers, or said whether they are the same three.

## What providers have disclosed

OpenRouter links to notices from three providers. Phala says an attacker controlled one of its inference servers until November 8. Together AI says an outsider downloaded stored prompt samples from June and July after an AI coding agent committed a credential to a public repository. Novita says a routing error sent some MiniMax requests on to MiniMax's own API.

OpenRouter says it will run the researchers' style of testing on an ongoing basis, trace network paths to find hidden forwarding to third parties, and require proof from providers before giving any endpoint back its ZDR status.
