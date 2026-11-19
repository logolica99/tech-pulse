---
title: "Google Labs unveils Stitch Loop, an always-on agent that keeps improving shipped products"
date: "2026-11-18"
published: "2026-11-18T21:06:00-08:00"
summary: "Stitch Loop connects to a team's codebase and live metrics, suggests improvements, writes fixes in a sandbox and opens GitHub pull requests that a human must approve. A waitlist is open now."
tags:
  - AI
  - Agents
  - Google
  - Developer Tools
category: AI
sources:
  - title: "Introducing Stitch Loop: A new way to build and evolve products (Google blog)"
    url: "https://blog.google/innovation-and-ai/models-and-research/google-labs/stitch-loop/"
draft: false
---

Google Labs has introduced Stitch Loop, an experimental long-running "product agent" meant to pick up where coding agents stop: after a feature ships. It connects to a team's GitHub repo and product context, such as logs, user behavior and feedback, through more than 180 integrations, custom MCP servers or CLI uploads, then works continuously toward goals the team sets.

## How it works

Each "loop" goes through four steps, according to Google. It surfaces suggestions backed by evidence from the product, offers one or more solutions with tradeoffs, writes the chosen fix in an isolated cloud sandbox and opens a pull request, then watches live data to learn whether the change helped. Nothing merges until a person approves the PR.

Three loops come built in, for security, latency and accessibility, and teams can add custom ones like improving checkout conversion. The security loop pairs Gemini 4 Carbon with CodeMender, Google DeepMind's code-security agent, to find vulnerabilities and propose fixes.

## Availability

Stitch Loop can feed product context to other coding agents, such as Google Antigravity, through the Stitch CLI and MCP, and it works in Slack via @stitch. The waitlist is open globally now, with priority access for eligible Google AI Ultra subscribers.
