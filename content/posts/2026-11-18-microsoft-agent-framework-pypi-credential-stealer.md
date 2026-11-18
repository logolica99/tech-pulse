---
title: "Poisoned releases of Microsoft's agent-framework package on PyPI stole cloud credentials"
date: "2026-11-18"
published: "2026-11-18T08:11:00-08:00"
summary: "Versions 1.26.1 and 1.26.2 of Microsoft's agent-framework Python package carried a credential stealer that ran on every Python start-up before being pulled from PyPI within about an hour; 1.26.0 is the last clean release."
tags:
  - AI
  - Security
  - Open Source
category: AI
sources:
  - title: "Microsoft agent-framework Compromised: Credential Stealer Targets Azure and CI Pipelines (Wiz)"
    url: "https://www.wiz.io/blog/malicious-version-of-microsofts-agent-framework-published-to-pypi"
  - title: "Malicious code in agent-framework (PyPI), GHSA-764m-3ppc-5m73 (GitHub Advisory Database)"
    url: "https://github.com/advisories/GHSA-764m-3ppc-5m73"
  - title: "Microsoft Agent Framework Releases Poisoned With Credential Stealer (SecurityWeek)"
    url: "https://www.securityweek.com/microsoft-agent-framework-releases-poisoned-with-credential-stealer/"
draft: false
---

Two malicious versions of `agent-framework`, the Python package for the Microsoft Agent Framework, were published to PyPI on November 17 with a credential stealer added. Version 1.26.1 went up at 20:35 UTC and 1.26.2 at 21:08 UTC; according to Wiz, both were gone from PyPI by 21:30 UTC. The package gets roughly 200,000 downloads a month.

## How it worked

The bad releases dropped a `.pth` file into site-packages. Python runs those files whenever an interpreter starts, so the stealer ran in any Python process in that environment, even if the package was never imported. It gathered environment variables with names like TOKEN, SECRET, KEY, AZURE, AWS and GITHUB, read secrets from other processes, collected credential files for Azure CLI, npm, pip, git, Docker and Hugging Face, and requested Azure managed-identity and Azure DevOps OIDC tokens. Version 1.26.2 also went after GitHub Actions OIDC tokens. Everything was sent to a webhook.site address.

Wiz says the attacker appears to have compromised a certificate and key for Microsoft's internal release-signing pipeline; how they were obtained is not yet known. Wiz also found the tooling identified itself as Cairn, an open-source AI penetration-testing framework.

## What to do

The GitHub advisory and Wiz say 1.26.0 is the last clean version. Researchers advise finding and removing the `.pth` hooks (`agent_framework_meta.pth` or `af_runtime_diag.pth`) before running pip, pinning to 1.26.0, rebuilding affected environments and images, and rotating any credentials that were reachable on affected machines.
