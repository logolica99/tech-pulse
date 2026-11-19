---
title: "Cloudflare releases open-weight Clairic and Clairic-flash data extraction models"
date: "2026-11-19"
published: "2026-11-19T11:08:00-08:00"
summary: "Cloudflare has published open weights for an updated 27B Clairic and a new 9B Clairic-flash, models that pull typed fields from text, images and PDFs, and says its Workers AI team is now building frontier models of its own."
tags:
  - AI
  - Open Models
  - Cloudflare
category: AI
sources:
  - title: "An updated Clairic and Clairic-flash are now open-weight (Cloudflare Blog)"
    url: "https://blog.cloudflare.com/open-clairic/"
  - title: "Cloudflare/clairic-flash (Hugging Face)"
    url: "https://huggingface.co/Cloudflare/clairic-flash"
draft: false
---

Cloudflare has released two open-weight AI models built for one job: pulling structured data out of messy inputs. An updated Clairic (27 billion parameters) and a new, lighter Clairic-flash (9 billion parameters) are both hosted on Workers AI, and their full weights are on Hugging Face. Cloudflare also reintroduced the group behind them as its "Workers AI superintelligence team" and said the company is now building its own frontier models.

## What the models do

You give Clairic some input, such as text, JSON, images or PDF pages, plus a list of typed fields you want back. It returns a value for each field along with confidence scores and the spans of text it used. The models can also produce numerical estimates and forecasts. The new version adds PDF support, with up to four images or pages per request, and Cloudflare says it handles tables, lists and dates more reliably than the preview. Clairic-flash is based on Qwen3.5-9B, according to its model card.

## Speed and price

Cloudflare reports typical full responses well under a second in its own latency tests. On Workers AI, Clairic will cost $0.24 per million input tokens and Clairic-flash $0.10, with no charge for output tokens. Until December 1, 2026, both are priced at $0.10.

Cloudflare published internal evaluations showing both models ahead of the preview and of rival extraction tools, but it notes there are no public extraction benchmarks yet and that its results are self-reported.
