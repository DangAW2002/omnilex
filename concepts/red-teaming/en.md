---
label: Red teaming
qualifier: (AI)
aliases: []
loanwords: []
plain_descriptions:
  - structured security testing where friendly experts try to trick an AI into saying harmful or prohibited things
  - probing AI systems with adversarial prompts to uncover vulnerabilities and safety flaws before launch
summary: >-
  A disciplined adversarial testing process where internal experts or automated agents simulate malicious attacks and prompt injections to identify model safety vulnerabilities, bias, and policy flaws.
confusable_notes: {}
follow_up_questions:
  - How do automated red-teaming agents scale jailbreak discovery beyond manual human testing?
  - What criteria define successful prompt extraction or safety guardrail circumvention during audits?
translation: native
---

## Easy explanation
Think of hiring an ethical locksmith to try picking all the locks on your new house before you move in, ensuring any weak latches are discovered and reinforced.

## Details
Adapted from cybersecurity traditions, AI red teaming tests frontier models against unexpected user prompts and malicious exploits. Testers craft adversarial prompts designed to bypass content filters, induce toxic generation, reveal sensitive system prompts, or elicit instructions for dangerous activities (jailbreaking). Insights gathered from red teaming guide safety fine-tuning, system prompt hardening, and input/output guardrail configuration prior to public release.

## Technical definition
The systematic empirical evaluation of an artificial intelligence system through adversarial probing to identify safety failures, alignment vulnerabilities, and security risks.

## Examples
A safety team conducts a two-week red-teaming exercise with 1,200 adversarial jailbreak prompts, discovering 14 edge cases where the assistant bypassed safety filters, which were promptly patched.
