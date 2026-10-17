---
label: Data lineage
aliases:
  - pipeline lineage
loanwords: []
plain_descriptions:
  - tracing the full journey of information from where it was created to every final report
  - a visual family tree showing how raw database records get transformed along the way
summary: The recorded lifecycle and lifecycle path of data that documents its origin, movement, transformations, and destinations over time.
confusable_notes: {}
follow_up_questions:
  - How does automated column-level data lineage aid root-cause analysis during data pipeline failures?
  - Why is data lineage critical for demonstrating regulatory compliance under audit standards?
translation: native
---

## Easy explanation
Like a detailed shipment tracking receipt that shows where an organic fruit was grown, which packing stations processed it, and which delivery trucks carried it to your table.

## Details
Data lineage records metadata detailing data origins, schema transformations, joins, and movement across storage layers. Graph-based catalog systems track dependencies from upstream operational tables through Airflow DAGs down to specific reporting dashboard charts, giving engineers immediate visibility into upstream causes of corrupt metrics and downstream blast radius before altering database column definitions.

## Technical definition
The architectural representation and audit history detailing the origin, dependency sequence, programmatic transformations, and consumption endpoints of data entities.

## Examples
A data engineer looks at a data lineage graph to see that a corrupted monthly revenue metric was caused by an updated currency conversion script run two steps earlier.
