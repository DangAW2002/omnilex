---
label: Dynamic application security testing (DAST)
aliases:
  - DAST
  - dynamic vulnerability analysis
loanwords: []
autolink:
  aliases:
    DAST: always
plain_descriptions:
  - testing a running web application from the outside by sending simulated malicious requests
  - black-box security scanning that probes live applications for exploitable vulnerabilities
summary: A black-box testing methodology that assesses running applications from the outside by injecting fault payloads to detect runtime security vulnerabilities.
confusable_notes:
  sast: DAST analyzes running applications from the exterior during execution; SAST examines raw source code and dependencies from the inside without runtime execution.
follow_up_questions:
  - Why is authentication handling in DAST crawlers complex when navigating multi-page single-page applications?
  - How does DAST identify environment-specific misconfigurations that static analysis misses?
translation: native
---

## Easy explanation
Think of a crash-test inspector evaluating a brand-new car: instead of reviewing the factory blueprints, they drive the car at high speed into safety barriers to see if the airbags deploy and the frame protects the passengers in real life.

## Details
Dynamic application security testing (DAST) treats the application as a black box, possessing zero prior knowledge of internal source code or backend databases. Operating over HTTP/HTTPS, DAST tools crawl reachable endpoints, catalog form inputs and API parameters, and inject malicious payloads (such as cross-site scripting vectors or SQL fuzzing sequences). By analyzing HTTP response codes, server latency, and error responses, DAST identifies runtime flaws, authentication lapses, server misconfigurations, and third-party integration weaknesses that only emerge during live system execution.

## Technical definition
A black-box testing technique that exercises operational software applications by stimulating public interfaces with malicious inputs to identify observable security vulnerabilities during execution.

## Examples
A security team configures an automated DAST tool to crawl a staging web application overnight, uncovering a cross-site scripting flaw in the user feedback form that executes injected JavaScript in the browser.
