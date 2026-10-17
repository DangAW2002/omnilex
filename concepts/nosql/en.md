---
label: NoSQL
aliases:
  - non-relational database
loanwords: []
plain_descriptions:
  - modern databases that store unstructured or changing data without rigid spreadsheet tables
  - flexible database systems designed to spread easily across hundreds of cloud servers
summary: A broad class of non-relational database systems designed to handle flexible data models, high velocity, and horizontal scalability.
confusable_notes:
  relational-database: NoSQL databases offer flexible, non-tabular schemas (document, key-value, wide-column, graph) and horizontal scaling, unlike relational databases that enforce rigid schemas and ACID transactions via SQL.
follow_up_questions:
  - How do the four primary NoSQL data models (document, key-value, column-family, graph) address different workload patterns?
  - What are the tradeoffs between eventual consistency in NoSQL systems and immediate consistency in relational stores?
translation: native
---

## Easy explanation
Like keeping information in flexible plastic folders where each folder can hold different types of documents and photos, rather than forcing every piece of paper into a rigid, pre-printed form with fixed boxes.

## Details
NoSQL emerged to address the scalability and schema rigidity limitations of traditional relational systems when handling internet-scale, semi-structured data. Rather than enforcing fixed tables and joins, NoSQL technologies encompass four main categories: document stores (JSON), key-value databases, wide-column stores, and graph engines. They frequently adopt distributed, partition-tolerant designs prioritizing horizontal cluster expansion.

## Technical definition
A category of distributed non-relational database management systems that utilize dynamic schemas, horizontal partitioning, and flexible data models for high-throughput, unstructured workloads.

## Examples
A mobile gaming app uses a NoSQL document database to store player inventory items as nested JSON objects, allowing developers to add new sword and armor attributes without running database migration scripts.
