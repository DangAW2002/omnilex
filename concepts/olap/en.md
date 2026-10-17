---
label: Online Analytical Processing (OLAP)
aliases:
  - OLAP
loanwords: []
autolink:
  aliases:
    OLAP: always
plain_descriptions:
  - computing systems designed to analyze historical business numbers across many angles quickly
  - database software built for executives asking big-picture questions about sales trends over years
summary: A category of software tools and database engines optimized for performing multidimensional analysis across massive archives of historical metrics with sub-second latency.
confusable_notes:
  oltp: OLAP engines are optimized for heavy read-heavy queries and multidimensional aggregations across historical data, whereas OLTP systems handle rapid, low-latency row read-write transactions.
follow_up_questions:
  - Why do columnar database structures outperform row-based databases for OLAP aggregation queries?
  - How do roll-up, drill-down, and slice-and-dice operations function on an OLAP cube?
translation: native
---

## Easy explanation
Like an executive viewing a year-end company financial overview from a helicopter: zooming in on sales by region, quarter, or product category without worrying about individual register receipts.

## Details
OLAP databases are architected for complex analytical queries spanning millions of rows, such as calculating average profit margins per product line across five fiscal years. They typically store records in columnar formats, pre-computing multidimensional cubes and aggregations to deliver responsive query results for business intelligence tools without locking operational transaction tables.

## Technical definition
A computing architecture and query processing approach designed for complex aggregations, multidimensional calculations, and analytical reporting over large historical data repositories.

## Examples
A marketing director runs an OLAP query across 40 million customer purchase records to compare regional sunscreen sales between summer 2025 and summer 2026.
