---
label: Data lake
aliases:
  - cloud data lake
loanwords: []
plain_descriptions:
  - a huge digital reservoir where companies store raw data in any format until needed
  - a flexible storage pool holding audio, text, images, and logs without forcing strict table structures
summary: A scalable storage repository designed to retain massive volumes of raw multi-format information without requiring an upfront database schema.
confusable_notes:
  data-warehouse: A data lake holds vast amounts of raw, uncurated data with schema-on-read, while a data warehouse holds cleaned, structured data with predefined schema-on-write.
follow_up_questions:
  - What governance strategies prevent a data lake from turning into an unsearchable data swamp?
  - How does table format technology like Apache Iceberg or Delta Lake bring ACID transactions to data lakes?
translation: native
---

## Easy explanation
Like a natural lake fed by multiple mountain streams: water flows in continuously and settles in its natural state until someone pumps it out for drinking, farming, or power.

## Details
Data lakes store data using inexpensive cloud object storage (such as Amazon S3 or Google Cloud Storage). Instead of requiring a predefined schema before writing (schema-on-write), they adopt schema-on-read, allowing data scientists to query raw files directly using tools like Trino or Spark.

## Technical definition
A centralized architecture allowing persistent retention of raw, untransformed data at any scale under a schema-on-read model.

## Examples
Storing terabytes of IoT sensor logs, social media video uploads, and raw database exports in an Amazon S3 bucket.
