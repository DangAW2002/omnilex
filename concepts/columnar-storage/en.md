---
label: Columnar storage
aliases:
  - columnar database
  - column-oriented storage
loanwords: []
plain_descriptions:
  - organizing database records by columns instead of rows on disk
  - grouping all prices together on storage drives so summing sales skips reading customer names
summary: A database storage method where data blocks group values by column across records rather than by row, accelerating analytical aggregation queries.
confusable_notes: {}
follow_up_questions:
  - How does column data uniformity improve data compression algorithms like dictionary encoding and run-length encoding?
  - Why is row-based storage preferred over columnar storage for single-record insert operations?
translation: native
---

## Easy explanation
Like arranging a school roster into separate cards where one sheet lists only student heights, so measuring the average class height takes seconds without having to read through their home addresses.

## Details
Traditional row-oriented databases store entire rows sequentially on disk blocks, forcing disk readers to ingest unused fields during aggregation queries. Columnar storage groups all values of a single column together contiguously. Because columns share identical data types, engines achieve exceptional compression ratios (via snappy, zstd, or run-length encoding) and perform vectorized CPU operations directly over compressed blocks while skipping non-queried columns.

## Technical definition
A physical storage layout architecture that organizes database records by columns rather than rows, minimizing I/O read volume for analytical scan and aggregate queries.

## Examples
A data warehouse with 100 million sales records reads only the total_amount column from disk to calculate total revenue, skipping 45 other columns and completing 20 times faster.
