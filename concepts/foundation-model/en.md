---
label: Foundation model
aliases: []
loanwords: []
plain_descriptions:
  - a massive AI model trained on broad data that serves as a general base for many specialized applications
  - a versatile large-scale neural network that can be adapted to language, vision, or coding tasks
summary: >-
  A large-scale artificial intelligence model trained on vast, broad datasets at scale that can be adapted and fine-tuned across a wide variety of downstream specialized applications.
confusable_notes: {}
follow_up_questions:
  - How does emergent capability correlate with parameter scaling in foundation architectures?
  - What systemic risks stem from widespread societal dependence on a small cluster of foundation models?
translation: native
---

## Easy explanation
Think of a versatile steel chassis produced in a modern automotive factory: companies take that identical sturdy frame and turn it into delivery vans, ambulances, or family sedans.

## Details
Coined by Stanford researchers, foundation models designate deep learning architectures trained predominantly through self-supervised objectives on broad, multi-modal web-scale corpora. Rather than training bespoke models for translation, summarization, and sentiment, engineers adapt a single foundation model using prompting, instruction tuning, or low-rank adapters (LoRA). Their broad capability comes with challenges in alignment, computational cost, hallucination, and data provenance.

## Technical definition
A high-capacity neural network trained on extensive, diverse data via self-supervision, characterized by broad transferability across downstream tasks.

## Examples
A financial institution takes a 70-billion-parameter foundation model and fine-tunes it on regulatory filings, deploying it across 8 distinct internal compliance tools.
