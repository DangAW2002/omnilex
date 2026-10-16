---
label: Guardrail
qualifier: (AI)
aliases:
  - guardrails
loanwords: []
plain_descriptions:
  - safety filters around a chatbot
  - rules that block harmful or off-topic AI answers
summary: A control around a model’s inputs or outputs that detects and blocks unsafe, off-policy or off-topic content.
confusable_notes: {}
follow_up_questions:
  - Why run guardrails outside the model itself?
  - Can a guardrail check an answer against source documents?
translation: native
---

## Easy explanation
Like the barriers along a mountain road: they do not drive the car, but they stop it from going over the edge.

## Details
Guardrails can filter harmful categories, refuse listed topics, mask personal data, compare answers with source documents and enforce formats. They run as separate checks or classifiers before and after the model, so they still work when the model itself misbehaves. Managed services such as Amazon Bedrock Guardrails expose these checks as configurable policies.

## Technical definition
A configurable safeguard that evaluates prompts and model responses against policies (content, topics, sensitive information, grounding) and blocks or alters them.

## Examples
A bank’s assistant has a guardrail that masks card numbers in its answers and declines investment advice, passing such questions to staff.
