---
label: Elasticsearch
aliases: []
loanwords: []
plain_descriptions:
  - a fast search and analytics engine that combs through millions of documents in seconds
  - software built to search articles by keywords, filter store catalogs, and monitor server log errors
summary: A distributed, JSON-based search and analytics engine built on Apache Lucene, designed for horizontal scalability, reliability, and real-time search.
confusable_notes: {}
follow_up_questions:
  - How does inverted index construction enable Elasticsearch to search terms across text collections so quickly?
  - What are the differences between text fields (analyzed for full-text search) and keyword fields (exact match)?
translation: native
---

## Easy explanation
Like the index pages at the very back of a massive encyclopedia: instead of reading through 2,000 pages to find where "dinosaurs" are mentioned, you look up the word in the back and find the exact page numbers instantly.

## Details
Elasticsearch leverages the core Apache Lucene search library engine. It stores documents as JSON structures and constructs inverted indexes that map individual words (tokens) back to the documents containing them. With distributed sharding and replication, it enables instant keyword searches, typo-tolerant fuzzy matching, relevance scoring (BM25), and complex metric aggregations across billions of log lines.

## Technical definition
A distributed, multitenant-capable full-text search and analytical database engine based on Apache Lucene, providing schema-free JSON storage, RESTful APIs, and inverted indexing.

## Examples
An e-commerce app searches 2 million product listings with Elasticsearch, returning relevant matching shoes in 30 milliseconds even when users misspell "sneakers" as "sneekers".
