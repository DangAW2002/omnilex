---
label: Zero-day vulnerability
aliases:
  - zero-day
  - 0-day
loanwords: []
autolink:
  aliases:
    0-day: always
plain_descriptions:
  - a newly discovered software bug that has no official fix or patch yet
  - an undisclosed security flaw that attackers exploit before developers know it exists
summary: A previously undisclosed software vulnerability that is actively exploitable or known to attackers before the vendor has developed and released a security patch.
confusable_notes: {}
follow_up_questions:
  - What mechanisms govern responsible disclosure between vulnerability researchers and software vendors?
  - How do virtual patching and runtime application self-protection (RASP) mitigate unpatched zero-day flaws?
translation: native
---

## Easy explanation
Think of a newly discovered secret tunnel leading straight under the fortress wall: only the thieves know it exists, while the fortress guards have zero days of advance warning to brick up the hole before an attack takes place.

## Details
The term "zero-day" refers to the number of days the vendor has known about the flaw to produce a remedy: zero days. Zero-day vulnerabilities represent the most hazardous tier of cybersecurity risks because signature-based antivirus tools and network intrusion devices lack rules to recognize the exploit payload. Sophisticated state-sponsored groups and private exploit brokers trade zero-day exploits on private markets for millions of dollars. Defense relies on behavioral heuristics, memory-safe programming languages, sandboxing, and rapid incident isolation while the vendor works under emergency protocol to engineer a software patch.

## Technical definition
A flaw in an information system or component unknown to the software creator or maintainer, for which no mitigating update or vendor patch is yet publicly available.

## Examples
Security researchers detect advanced spyware exploiting an unpatched zero-day remote code execution vulnerability in a popular smartphone operating system, prompting an emergency out-of-band firmware release.
