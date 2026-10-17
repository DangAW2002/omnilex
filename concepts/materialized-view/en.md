---
label: Materialized view
aliases:
  - snapshot view
loanwords: []
plain_descriptions:
  - a saved database report whose calculated answers are written to disk for instant reading
  - pre-computing a slow multi-table join query and caching the result table physically on drive
summary: A database object that contains the pre-computed results of a query stored physically on disk for high-speed retrieval.
confusable_notes: {}
follow_up_questions:
  - What are the operational differences between complete refreshes and fast incremental refreshes of a materialized view?
  - When should an architect choose a materialized view over an application-level Redis cache?
translation: native
---

## Easy explanation
Like taking a photograph of a busy restaurant whiteboard menu: instead of re-calculating the chef's daily inventory and prices from scratch every time a customer asks, the waiter simply glances at the printed photo.

## Details
A standard database view is a virtual saved query that re-executes its underlying SQL joins and aggregations every time it is queried. In contrast, a materialized view executes the query once and physically writes the resulting rows to disk storage as a concrete table. It can be indexed directly with B-trees and refreshed periodically or incrementally, delivering millisecond query response times for expensive analytics.

## Technical definition
A persistent database schema object that caches the materialized, physical result set of a complex query on disk, supporting periodic, manual, or trigger-based refreshes.

## Examples
A finance portal runs a materialized view refreshing hourly that joins five transactional tables to show total daily regional transaction volumes, serving users in 2 milliseconds.
