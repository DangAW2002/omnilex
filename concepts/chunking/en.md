---
label: Chunking
qualifier: (RAG)
aliases: []
loanwords: []
plain_descriptions:
  - breaking long documents into smaller meaningful passages before storing them in an AI search database
  - splitting text files into bite-sized segments with overlap so language models can search them accurately
summary: >-
  The process of partitioning lengthy documents into smaller, cohesive textual segments to optimize semantic embedding density and retrieval precision in Retrieval-Augmented Generation systems.
confusable_notes: {}
follow_up_questions:
  - How does chunk overlap prevent the loss of semantic continuity across paragraph boundaries?
  - What advantages do hierarchical or recursive character chunkers provide over fixed token splitting?
translation: native
---

## Easy explanation
Imagine dividing an encyclopedia into index-card summaries: if a card is too large it contains too much irrelevant chatter, but if it is too small it loses the context of the story.

## Details
Large language models have finite context windows, and embedding models dilute semantic density when processing whole multi-page files. Chunking strategies segment raw text by token count, structural headers (Markdown/HTML), or semantic semantic shifts. Maintaining a sliding window with a small token overlap (e.g. 10-20%) preserves boundary relationships across neighboring chunks, preventing conversational context fragmentation during vector search.

## Technical definition
The deterministic algorithmic segmentation of unindexed text into discrete token windows calibrated to the receptive field of downstream dense embedding models.

## Examples
A 40-page software manual of 15,000 words is split into 35 chunks of 500 tokens each with a 50-token overlap, ensuring key configuration tables remain intact.
