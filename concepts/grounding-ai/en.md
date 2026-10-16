---
label: Grounding
qualifier: (AI)
aliases: []
loanwords: []
plain_descriptions:
  - anchoring an AI's answers in verified factual documents to prevent made-up facts
  - ensuring a model's statements are directly tied to real, verifiable source citations
summary: The process of constraining a model's outputs to factual, verifiable evidence retrieved from trusted external data sources.
confusable_notes: {}
follow_up_questions:
  - How does grounding differ from relying exclusively on a model's parametric memory?
  - What automated metrics quantify whether an answer is fully grounded or contains unverified claims?
translation: native
---

## Easy explanation
Instead of letting a tour guide answer historical questions from vague memory and potentially making up stories, grounding forces the guide to point directly to documented museum records before answering.

## Details
Large language models naturally generate plausible-sounding text based on statistical token associations, risking hallucinations. Grounding anchors generation by supplying authoritative reference materials—such as enterprise databases, live search results, or verified document extracts—directly in the context window. The model is instructed to synthesize answers strictly from these sources and provide verifiable citations, dramatically increasing reliability in high-stakes legal, medical, and financial use cases.

## Technical definition
The architectural and algorithmic constraint of natural language generation such that assertions correspond verifiably to supplied authoritative source records.

## Examples
A banking AI answering a home loan policy query by citing exact clause numbers from the current verified lending guidelines document.
