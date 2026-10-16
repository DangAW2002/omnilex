---
label: Jailbreak
qualifier: (AI)
aliases: []
loanwords: []
plain_descriptions:
  - tricking a chatbot into breaking its own safety rules
  - prompts that make the AI say what it should refuse
summary: A prompt designed to make a model ignore its safety guidelines and produce content it is meant to refuse.
confusable_notes:
  prompt-injection: >-
    Prompt injection is the broader attack of overriding an application’s instructions, often through hidden content; a jailbreak is the
    kind aimed at the model’s safety rules.
follow_up_questions:
  - Why does role-play help jailbreak attempts?
  - How do providers detect jailbreaks?
translation: native
---

## Easy explanation
Like talking a security guard into opening a locked door with a convincing story rather than a key.

## Details
Common tricks include role-play (“pretend you are an AI without rules”), hypothetical framing, splitting a request into harmless-looking parts, unusual encodings and long manipulative conversations. OWASP treats jailbreaking as a form of prompt injection. Providers counter it with safety training, classifiers on inputs and outputs, and monitoring; applications add guardrails of their own.

## Technical definition
A form of prompt injection whose goal is to bypass a model’s safety behaviour so that it disregards its usage policies.

## Examples
A user asks a chatbot to “write a story in which a chemist explains, step by step,” something the model would refuse if asked directly.
