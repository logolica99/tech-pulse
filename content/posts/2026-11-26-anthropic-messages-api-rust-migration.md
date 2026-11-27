---
title: "Anthropic moves its Messages API from Python to Rust, cutting CPU per request by about 70%"
date: "2026-11-26"
published: "2026-11-26T18:30:00-08:00"
summary: "Anthropic says it rebuilt the Messages API behind Claude in Rust, with Claude writing much of the code, and verified it against live production traffic. The new version uses about 70% less CPU per request and cuts median time to first token by about 20%."
tags:
  - AI
  - Anthropic
  - Claude
  - Rust
  - Infrastructure
category: AI
sources:
  - title: "Anthropic: Migrating our Messages API to Rust"
    url: "https://www.anthropic.com/research/migrating-api-to-rust"
  - title: "TechRepublic: Anthropic Used Claude to Rebuild Its API in Rust, Cutting CPU Use 70%"
    url: "https://www.techrepublic.com/article/news-anthropic-claude-messages-api-rust-migration/"
draft: false
---

Anthropic has replaced the Python code behind its Messages API, the main way customers and its own apps such as Claude Code reach Claude, with a new version written in Rust. In a technical write-up, the company says the Rust API uses about 70% less CPU per request and cuts median time to first token by about 20%, and that it shipped without taking the service offline or freezing feature work.

## Why it moved

Anthropic built the API in Python in 2023, when it was little more than a request forwarder. Over time every request picked up more steps: validation, prompt conversion, tokenization and safety screening, plus sorting each streamed token into text, thinking or tool calls. Anthropic says API traffic grew roughly 1,800 times from early 2024 to fall 2026, and Python's overhead on each of those steps added up.

An earlier partial fix, rewriting just the output parser in Rust and calling it from Python, cut CPU use by about 8% to 10%, but each token then crossed between the two languages three times. With Claude writing more than 80% of the code Anthropic merged by May 2026, the company decided a full rewrite was now practical. Claude wrote a first version of the core request path in about a week.

## Verification was the hard part

Anthropic's main point is that writing the code was easy compared with proving it behaved the same. The Python API kept changing during the migration, Claude can answer the same request differently, and engineers could not read customer requests to see where the versions diverged. Tests alone were not enough: the Rust version passed about 98% of its tests in April, yet only about a quarter of inputs matched on production traffic. When the team audited the ported tests, it found more than 100 weakened assertions.

So Anthropic used the production Python API itself as the reference, compared the Rust version against it on real traffic, and automatically dispatched agents to fix the differences it found.
