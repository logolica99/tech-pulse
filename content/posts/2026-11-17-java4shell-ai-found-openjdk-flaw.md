---
title: "Java4Shell: an AI-assisted audit finds a critical remote-code flaw in Java's Base64 decoder"
date: "2026-11-17"
published: "2026-11-17T23:11:18-08:00"
summary: "Security startup Calif disclosed Java4Shell (CVE-2026-114938), a memory-corruption bug in OpenJDK's hardware-accelerated Base64 decoder that its researcher found with OpenAI's Codex; Oracle has patched it and CISA urges immediate updates."
tags:
  - AI
  - Security
  - Java
category: AI
sources:
  - title: "Java4Shell: Write once, RCE everywhere (Calif)"
    url: "https://calif.io/java4shell/"
  - title: "Critical Java Vulnerability Requires Immediate Patching (CISA)"
    url: "https://www.cisa.gov/news-events/alerts/2026/11/17/critical-java-vulnerability-requires-immediate-patching"
  - title: "Critical Java4Shell flaw allows RCE attacks on major Java applications (BleepingComputer)"
    url: "https://www.bleepingcomputer.com/news/security/critical-java4shell-flaw-allows-rce-attacks-on-major-java-applications/"
draft: false
---

Security startup Calif, the group behind the recent PHP2Shell disclosure, has published details of **Java4Shell** (CVE-2026-114938), a memory-corruption bug in OpenJDK, the most widely used Java runtime. Calif scores it 9.2 out of 10 (critical) under CVSS 4.0; BleepingComputer reports that Oracle rated it 8.1 (high) under CVSS 3.1.

## What the bug is

To decode Base64 faster, OpenJDK uses hand-written assembly that relies on AVX-512 VBMI instructions on supported x86-64 chips. Calif found that this code mishandles a stray `=` at the end of certain inputs and computes a negative output length. The result is a write that spills past the end of the output array. A string of 64 `A` characters followed by `=` is enough to trigger it. Java rejects the input in the end, but by then nearby memory may already be corrupted.

According to Calif, careful exploitation can leak memory, in the style of Heartbleed, or reach remote code execution. Its researchers showed pre-authentication code execution against default setups of Keycloak, Jira, Confluence, JFrog Artifactory, Jenkins and PingFederate. They also got post-authentication code execution in Kafka, Solr, Elasticsearch, Gerrit and Spinnaker. Calif notes there is no universal exploit, because each attack depends on how an application feeds Base64 data to the decoder.

## Who is affected

The flaw affects OpenJDK 17.0.6 and later, plus distributions built from it, including Oracle Java SE, Amazon Corretto, Eclipse Temurin, Microsoft Build of OpenJDK, Azul Zulu and Red Hat OpenJDK. It only applies on x86-64 processors with AVX-512 VBMI, such as recent Intel Xeon generations and AMD Zen 4 or newer. ARM64 machines are not affected.

## The AI angle

Calif says researcher Quang Luong pointed OpenAI's Codex at OpenJDK's JIT compiler, intrinsics and cryptography code. He found the bug in about an hour and had a first working exploit two hours later, for less than $200 in tokens. AI agents then built most of the later application-specific exploit chains almost on their own. Calif has released a proof of concept for the memory corruption but not its weaponized exploits.

## What to do

OpenJDK published an advisory, and Oracle shipped a fix on November 17 in its November Critical Security Patch Update. CISA is urging organizations to find every Java runtime they run, including copies bundled inside other products and containers, and patch internet-facing systems first. If patching has to wait, Calif suggests starting the JVM with `-XX:-UseBASE64Intrinsics`, or with `-XX:UseAVX=2` on x86-64 hosts only.
