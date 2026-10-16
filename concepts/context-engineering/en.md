---
label: Context engineering
aliases: []
loanwords: []
plain_descriptions:
  - the practice of carefully designing and managing everything fed into an AI's context window
  - organizing tokens, instructions, tools, and history to maximize AI accuracy and reduce cost
summary: The disciplined practice of curating, structuring, compressing, and caching the information loaded into a model's context window to optimize performance and efficiency.
confusable_notes: {}
follow_up_questions:
  - How does context engineering differ from traditional short-form prompt engineering?
  - What role does prompt caching play in making context engineering cost-effective for large enterprise codebases?
translation: native
---

## Easy explanation
If prompt engineering is writing a clear memo to an executive, context engineering is designing their entire briefing folder: ordering the reports, summarizing attachments, weeding out duplicate emails, and highlighting key data so they make decisions without information overload.

## Details
As context windows expanded from thousands to millions of tokens, simple prompt wording gave way to broader context engineering. The discipline involves strategically organizing system rules, dynamic few-shot examples, tool schemas, conversation histories, retrieved documents, and cached artifacts. It addresses failure modes like "lost-in-the-middle" attention degradation, context truncation, latency spikes, and token costs by employing compaction, pruning, and structured markup.

## Technical definition
The architectural discipline of designing, orchestrating, and optimizing the tokenized information payload presented to language models to maximize reasoning quality while minimizing latency and cost.

## Examples
An engineering team structuring a large codebase context using hierarchical XML tags, cached system headers, and compact symbol summaries, reducing token usage by 60% while improving bug resolution rates.
