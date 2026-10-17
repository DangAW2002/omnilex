---
label: Full-text search
aliases:
  - FTS
  - text search
autolink:
  aliases:
    FTS: always
loanwords: []
plain_descriptions:
  - searching for words and phrases across large documents instead of exact database matches
  - a search technique that understands word roots, ignores common filler words, and handles typos
summary: A technique for searching computer-stored documents or database text fields by matching words, linguistic stems, and phrases against an inverted index.
confusable_notes: {}
follow_up_questions:
  - How do tokenization, stop-word removal, and stemming prepare raw text for inverted indexing?
  - How does TF-IDF or BM25 relevance scoring rank search results by keyword importance?
translation: native
---

## Easy explanation
Like searching for a phrase inside an e-book app: you type a couple of words, and the app instantly lists every sentence where those words appear, even if the word appears in plural form or capital letters.

## Details
Unlike basic database pattern matching (such as SQL LIKE '%term%') which forces slow full-table scans, full-text search processes text through a linguistic analyzer pipeline. It breaks text into tokens, strips punctuation and common stop words (such as "the", "is"), normalizes words to root stems, and populates an inverted index. When querying, search algorithms compute relevance scores (like BM25) to rank documents by keyword frequency and proximity.

## Technical definition
An information retrieval method that inspects all written words within document text fields using inverted indexes, linguistic normalization, and mathematical relevance scoring models.

## Examples
A legal database allows lawyers to search 50,000 court case transcripts for "intellectual property infringement", ranking cases by relevant keyword occurrences in under 50 milliseconds.
