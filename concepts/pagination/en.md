---
label: Pagination
aliases:
  - API pagination
  - paging
loanwords: []
plain_descriptions:
  - dividing huge lists of data into smaller chunks across multiple pages
  - loading search results ten or twenty items at a time instead of everything at once
summary: A design technique that breaks large data sets into discrete subsets or pages to manage bandwidth and system performance.
confusable_notes: {}
follow_up_questions:
  - Why does keyset or cursor-based pagination outperform offset pagination on massive tables?
  - How should hypermedia links like next and prev be formatted in API responses?
translation: native
---

## Easy explanation
Reading a thick encyclopedia by turning through numbered pages one at a time rather than unrolling a continuous parchment mile long.

## Details
APIs implement pagination using offset-limit pairs, page numbers, or sequential cursor tokens. Cursor-based pagination uses unique indexed pointers to maintain consistent ordering and avoid duplicate or skipped records when underlying tables experience concurrent insertions.

## Technical definition
The computational practice of partitioning extensive query result collections into bounded segments requested through offset parameters or cursor tokens.

## Examples
Requesting `GET /products?page=2&limit=20` to view items 21 through 40 on a retail store page.
