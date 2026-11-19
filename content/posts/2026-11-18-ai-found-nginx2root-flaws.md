---
title: "AI-assisted researchers uncover critical remote code execution flaws in NGINX"
date: "2026-11-18"
published: "2026-11-18T17:13:00-08:00"
summary: "F5 patched NGINX after several security teams, most using AI agents, found critical HTTP/2 bugs, including a decade-old remote code execution flaw that Xint chained with a Linux kernel bug to get root."
tags:
  - AI
  - Security
  - Open Source
category: AI
sources:
  - title: "AI unearths 'internet breaker' flaws in Nginx web server (CSO Online)"
    url: "https://www.csoonline.com/article/4250460/ai-unearths-internet-breaker-flaws-in-nginx-web-server.html"
  - title: "It's NGINX's turn to cause vulnpocalypse headaches (CyberScoop)"
    url: "https://cyberscoop.com/nginx-critical-vulnerabilities-exploits/"
draft: false
---

NGINX, the web server that handles traffic for about a third of websites, has shipped fixes for a set of serious vulnerabilities. Several security teams found them on their own, and most of those teams used AI agents. It's the latest in a run of AI-discovered bugs in core internet software, coming a day after a critical Java flaw was disclosed.

## The flaws

The worst bug, CVE-2026-123007, is in NGINX's HTTP/2 flow-control handling. F5 rates it critical, at 9.2 on the CVSS scale. If a client cancels a request while response data is still queued, NGINX can return unused send credit without checking a limit. The math then wraps around and causes an out-of-bounds memory copy. According to CSO, the bug has existed in every official release since version 1.9.5 in 2015. A second HTTP/2 bug, CVE-2026-123633, is a use-after-free that affects releases 1.19.7 through 1.31.8. Both are fixed in NGINX 1.31.9 and 1.30.7.

## How AI was used

Xint says its autonomous AI harness found four of the five flaws it reported, with no human guidance. CyberScoop reports that a researcher pointed the tool at about 50,000 lines of NGINX code, it turned up high-severity findings in about 90 minutes, and a working exploit followed within 10 more. Xint then chained the HTTP/2 bug with an unpatched Linux kernel flaw in the SCTP networking code to get root on the host. In tests, the chain also escaped a Docker container. Wiz, Metnir, and Ikotas Labs also used AI tools and found overlapping bugs. Rapid7 built its own working exploit without mentioning AI.

## How risky is it

According to CSO, CISA says no exploitation in the wild has been seen yet. Rapid7's exploit is hard to pull off. It needs about 128 GB of HTTP/2 traffic and a glibc memory-copy routine used on CPUs with AVX-512. But Xint's Shodan snapshot found that 98.9% of version-identifiable NGINX hosts ran affected releases. F5 recommends updating right away, or disabling HTTP/2 on affected ports, which blocks the two worst bugs but not the others. Until a kernel patch ships, admins who don't use SCTP can block that module from loading.
