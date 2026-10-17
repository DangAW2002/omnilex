---
label: Change data capture (CDC)
aliases:
  - CDC
loanwords: []
autolink:
  aliases:
    CDC: never
plain_descriptions:
  - identifying and tracking row changes in a database so other systems update automatically
  - watching the database transaction log to copy edits to search indexes and caches in real time
summary: A set of software design patterns and techniques used to capture and deliver row-level data modifications as they happen.
confusable_notes: {}
follow_up_questions:
  - Why is log-based CDC more efficient and less intrusive than polling timestamp columns?
  - How does CDC handle schema changes without breaking downstream event streams?
translation: native
---

## Easy explanation
Like setting up an automatic notification on your banking app that immediately pings your budgeting spreadsheet every time money enters or leaves your account.

## Details
Log-based CDC reads the internal write-ahead transaction log (WAL) of a database rather than executing repeated SELECT queries against production tables. It extracts row insertions, updates, and deletions into structured event records containing before-and-after values, streaming these deltas to downstream caches, search engines, or analytical data lakes without impacting transactional query latencies.

## Technical definition
A system technique that monitors and captures committed insert, update, and delete mutations directly from database transaction logs to publish granular change streams.

## Examples
A retail system reads PostgreSQL write-ahead logs via Debezium CDC to update Elasticsearch product indices within 200 milliseconds of inventory adjustments.
