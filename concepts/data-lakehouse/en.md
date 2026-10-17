---
label: Data lakehouse
aliases:
  - lakehouse
loanwords: []
plain_descriptions:
  - a modern data storage setup combining cheap file storage with fast database query tables
  - an architecture that lets companies run business reports and machine learning directly on raw data files
summary: A modern data management architecture that combines the cost-effective storage of data lakes with the ACID transactions of data warehouses.
confusable_notes: {}
follow_up_questions:
  - How do open table formats like Delta Lake, Iceberg, and Hudi bring ACID guarantees to object storage?
  - Why does a lakehouse eliminate the need for dual-system data duplication between lakes and warehouses?
translation: native
---

## Easy explanation
Like having a massive walk-in garage warehouse that stores raw wholesale supplies, with organized supermarket shelves and barcoded cash registers built right inside the same room.

## Details
Data lakehouses store primary data in open, low-cost cloud object storage (such as Parquet files in Amazon S3). An intelligent metadata table management layer (like Apache Iceberg or Delta Lake) provides ACID transaction semantics, schema enforcement, time travel versioning, and caching, enabling fast business intelligence SQL queries alongside raw machine learning training on a single unified copy of data.

## Technical definition
A hybrid data architecture that implements warehouse metadata governance, ACID transaction logging, and query optimizations directly on top of scalable object storage data lakes.

## Examples
A streaming media service saves 500 terabytes of video playback clickstream in Parquet files on S3, querying user metrics with SQL without copying records into a separate warehouse.
