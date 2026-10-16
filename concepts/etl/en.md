---
label: Extract, Transform, Load (ETL)
aliases:
  - ETL
loanwords: []
autolink:
  aliases:
    ETL: always
plain_descriptions:
  - pulling data from various places, cleaning it up, and saving it into a central analytics database
  - the three-step data pipeline that prepares raw business numbers for dashboards and reports
summary: A data integration process that extracts data from multiple sources, transforms it to meet analytical requirements, and loads it into a destination store.
confusable_notes: {}
follow_up_questions:
  - Why has cloud storage adoption caused modern architectures to shift from ETL to ELT?
  - How do idempotent ETL job designs handle network failures and partial data loads?
translation: native
---

## Easy explanation
Like gathering fruits from different orchards, washing and chopping them into a ready-to-eat fruit salad, and packing them into supermarket containers.

## Details
ETL pipelines extract data from transactional databases, APIs, and log streams. During transformation, the engine handles data cleansing, deduplication, schema normalization, and aggregation. Finally, the prepared data is loaded into an analytical repository like a data warehouse.

## Technical definition
A foundational data warehousing pipeline pattern combining data extraction from heterogeneous source systems, rule-based transformation, and bulk loading into a target analytical repository.

## Examples
Extracting nightly sales logs from Shopify, converting foreign currencies into USD, and loading the cleaned records into Snowflake.
