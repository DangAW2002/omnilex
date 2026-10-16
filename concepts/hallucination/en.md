---
label: Hallucination
qualifier: (AI)
aliases: []
loanwords: []
plain_descriptions:
  - when the AI confidently makes things up
  - a made-up fact or fake citation from a chatbot
summary: Output from a generative model that sounds plausible but is false or unsupported, presented as if it were fact.
confusable_notes: {}
follow_up_questions:
  - How does retrieval-augmented generation reduce hallucinations?
  - Why are made-up citations especially risky?
translation: native
---

## Easy explanation
It resembles a student who never answers “I don’t know” and fills every gap in an exam with confident inventions that read well.

## Details
A language model produces likely text rather than looking facts up, so it can invent names, numbers, quotations or sources. The risk grows with obscure topics, long reasoning and missing context. Common counter-measures are grounding answers in supplied documents, asking the model to quote its sources, letting it say it is unsure, and having a person check important claims.

## Technical definition
The generation of fluent, plausible-looking content that is factually wrong or not supported by the input or by reliable sources.

## Examples
Asked for a court ruling, a chatbot cites a case number and a date that do not exist; a lawyer who files it without checking has been misled.
