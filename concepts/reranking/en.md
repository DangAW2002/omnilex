---
label: Reranking
aliases: []
loanwords: []
plain_descriptions:
  - a second-stage scoring step that re-orders search results to put the most helpful answers at the very top
  - using a deep cross-encoder model to re-evaluate the relevance of initial search candidates
summary: >-
  A two-stage information retrieval technique where a computationally intensive secondary model re-evaluates and re-orders a candidate pool of retrieved documents to optimize top-k relevance.
confusable_notes: {}
follow_up_questions:
  - Why are cross-encoder architectures more expressive but more computationally demanding than bi-encoders for reranking?
  - How does reranking improve the precision of context retrieved for retrieval-augmented generation pipelines?
translation: native
---

## Easy explanation
Think of hiring an executive assistant: first, HR filters 500 applicants down to 10 qualified resumes, then the hiring manager reads those 10 carefully to pick the single best candidate.

## Details
First-stage retrieval systems (such as bi-encoders or BM25) prioritize low-latency recall, fetching 50 to 100 candidate documents from a corpus of millions. Reranking applies a more expressive cross-encoder model that processes the query and each candidate passage jointly through all attention layers. This deep token-level cross-attention resolves subtle semantic relations and negation, reliably promoting the most contextually relevant documents to the top positions.

## Technical definition
A secondary scoring pipeline that evaluates full cross-attention interactions between query and candidate sequences to re-sort an initial set of retrieved passages.

## Examples
An enterprise knowledge base retrieves 50 candidate articles using fast vector search, then applies a reranker that promotes the 3 most precise policy documents to the top positions.
