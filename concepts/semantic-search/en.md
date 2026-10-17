---
label: Semantic search
aliases: []
loanwords: []
plain_descriptions:
  - search technology that understands the conceptual meaning of your query rather than matching exact keywords
  - retrieving relevant documents based on contextual intent even when different vocabulary is used
summary: >-
  A search methodology that evaluates the contextual intent and semantic meaning behind user queries and documents using vector embeddings rather than relying solely on lexical keyword matching.
confusable_notes: {}
follow_up_questions:
  - How do hybrid search architectures combine BM25 lexical scoring with dense vector semantic search?
  - What embedding distance metrics best reflect semantic relevance in multilingual queries?
translation: native
---

## Easy explanation
Think of asking a seasoned bookstore clerk for stories about brave journeys across the ocean; they bring you a novel about sailors even if the book cover never uses the word journey.

## Details
Traditional search algorithms (like TF-IDF and BM25) match literal text tokens, failing on synonyms, typos, and phrasing variations. Semantic search converts user queries and documents into high-dimensional vector embeddings using deep transformer encoders. In this embedding space, semantically related concepts reside close together, enabling approximate nearest neighbor (ANN) retrieval to identify relevant passages based on topical intent rather than string coincidence.

## Technical definition
An information retrieval paradigm that ranks documents according to geometric similarity in a learned semantic vector space rather than discrete lexical token intersection.

## Examples
A user queries a company portal with "fix laptop screen glitch", and the semantic search engine returns an IT repair guide entitled "Resolving Display Flickering" with 95% relevance.
