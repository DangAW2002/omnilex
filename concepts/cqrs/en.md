---
label: Command Query Responsibility Segregation (CQRS)
aliases:
  - CQRS
loanwords: []
autolink:
  aliases:
    CQRS: always
plain_descriptions:
  - separating data update logic from data reading logic into distinct models
  - architectural pattern using different models to write and read data
summary: An architectural pattern that separates operations that mutate state from operations that read data into distinct models and pipelines.
confusable_notes:
  event-sourcing: CQRS splits read models from write models and can operate on conventional relational tables, whereas Event Sourcing specifically concerns how domain state mutations are logged as an immutable stream of historical events.
follow_up_questions:
  - What synchronization mechanisms ensure eventual consistency between write databases and read projections?
  - In what business scenarios does the complexity of CQRS deliver genuine architectural ROI?
translation: native
---

## Easy explanation
Like a restaurant kitchen: the order ticket written by the waiter goes straight to the cooking line to prepare the food, while the illustrated dining menu in the front room is designed exclusively for guests to browse dishes quickly.

## Details
In traditional software, a single domain model handles both writing state changes and serving complex query reads. This leads to contention, complex database joins, and unoptimized indexes. CQRS splits the application into two paths: Commands execute business rules, validate domain aggregates, and persist updates; Queries read denormalized, read-optimized projection stores (like Elasticsearch or Redis) without side effects. Changes synchronize asynchronously between write and read databases, enabling independent performance scaling for read-heavy workloads.

## Technical definition
An architectural design pattern segregating modification operations (Commands) from read operations (Queries), utilizing dedicated data schemas and execution pathways.

## Examples
An airline booking engine processing seat reservations on a relational write database with strict transactional locks, while projecting seat availability onto an in-memory cache answering 20,000 passenger flight searches per second.
