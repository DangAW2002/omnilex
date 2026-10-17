---
label: Security patch
aliases:
  - security update
loanwords: []
plain_descriptions:
  - a software update designed specifically to fix security holes and prevent hacks
  - a quick code fix released by vendors to protect systems against known vulnerabilities
summary: A software update specifically engineered to remediate identified security vulnerabilities and prevent malicious exploitation.
confusable_notes: {}
follow_up_questions:
  - What risks arise when organizations delay patch deployment due to legacy software compatibility?
  - How do automated patch management platforms test and roll out kernel-level updates without service disruption?
translation: native
---

## Easy explanation
Think of a tailor mending a ripped seam on an armored jacket: instead of throwing the entire jacket away and buying a new one, the tailor sews a tough patch over the hole to stop sharp objects from piercing through.

## Details
A security patch delivers modified binary libraries, configuration scripts, or compiled packages that eliminate known security flaws (cataloged under CVE identifiers). Software vendors distribute patches via routine release cycles (such as "Patch Tuesday") or emergency out-of-band updates when active exploitation occurs in the wild. Enterprise patch management lifecycles involve discovering affected systems, testing patches in staging environments to verify backwards compatibility, deploying updates systematically, and verifying remediation through vulnerability scans. Neglecting patch application remains the primary vector for widespread network intrusions.

## Technical definition
An update designed to correct, modify, or mitigate vulnerabilities in a software release or hardware firmware, restoring the system to an acceptable security posture.

## Examples
An operating system vendor issues an urgent cumulative security patch addressing a memory corruption vulnerability in the network stack, requiring a prompt reboot on affected servers.
