---
label: Data warehouse
aliases:
  - enterprise data warehouse
loanwords: []
plain_descriptions:
  - a central database designed specifically for business analysis and fast executive reporting
  - a giant organized filing room where companies store cleaned historical business records
summary: A centralized, relational repository that aggregates structured historical data from across an organization to power business intelligence and reporting.
confusable_notes:
  data-lake: A data warehouse stores structured, pre-processed data optimized for querying and reporting, whereas a data lake stores raw, unprocessed data in diverse formats for flexible exploration.
follow_up_questions:
  - How do star schemas and snowflake schemas differ in data warehouse dimensional modeling?
  - Why do columnar storage layouts provide superior query execution speed for analytical aggregations?
translation: native
---

## Easy explanation
Like a well-ordered department store warehouse where every box is barcode-labeled, cataloged, and placed on designated shelves for quick inventory audits.

## Details
Unlike transactional databases (OLTP) optimized for fast row writes, data warehouses (OLAP) use columnar storage, compression, and denormalized star schemas to execute complex aggregation queries over millions of historical records with minimal disk reads.

## Technical definition
A subject-oriented, integrated, non-volatile, and time-variant relational data repository structured to support executive decision-making and business intelligence.

## Examples
Querying historical sales trends over the past five years across all regional stores using Google BigQuery or Snowflake.
