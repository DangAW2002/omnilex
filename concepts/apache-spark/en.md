---
label: Apache Spark
aliases:
  - Spark
loanwords: []
autolink:
  aliases:
    Spark: never
plain_descriptions:
  - a fast big-data computing engine that processes massive datasets in computer memory
  - an open-source framework for running large data transformations and machine learning across clusters
summary: An open-source distributed computing framework designed for fast processing of large-scale datasets using in-memory abstractions.
confusable_notes: {}
follow_up_questions:
  - How does Spark's in-memory Resilient Distributed Dataset (RDD) model outperform MapReduce disk I/O?
  - What role does the Catalyst Optimizer play in Spark SQL query execution plans?
translation: native
---

## Easy explanation
Think of a factory assembly line with dozens of workers sharing a huge central workbench in the same room, passing parts hand to hand instead of walking out to warehouse storage shelves between every tiny step.

## Details
Spark distributes computing tasks across a cluster of worker nodes coordinated by a central driver. It utilizes resilient in-memory collections (DataFrames and RDDs) to avoid expensive intermediary disk writes between transformation stages. Spark bundles unified components for SQL queries, machine learning algorithms, graph manipulation, and structured streaming over distributed storage systems.

## Technical definition
A unified distributed compute engine that provides distributed memory abstractions, directed acyclic graph (DAG) task scheduling, and optimized query execution for big-data workloads.

## Examples
A data science team uses Apache Spark on a 20-node cluster to train a product recommendation model across 50 million user browsing sessions in 12 minutes.
