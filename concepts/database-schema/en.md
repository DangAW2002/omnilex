---
label: Schema
qualifier: (Database)
aliases:
  - database schema
  - table schema
loanwords: []
autolink:
  label: never
plain_descriptions:
  - the overall architectural blueprint defining the tables, columns, and rules in a database
  - the formal structural layout describing what kinds of data a database is allowed to hold
summary: The formal structural blueprint of a database that defines tables, fields, data types, relationships, and integrity constraints.
confusable_notes: {}
follow_up_questions:
  - How does schema-on-write in relational databases contrast with schema-on-read in document stores?
  - What strategies prevent foreign key constraint violations during bulk data ingestion?
translation: native
---

## Easy explanation
Like the floor plan of an apartment complex: it dictates where the rooms are located, what dimensions they have, and where the connecting doorways lead.

## Details
Schemas define relational topology, establishing primary keys, foreign key references, nullability constraints, and column data types. Database engines use the schema to validate data upon insertion and enforce integrity across interconnected tables.

## Technical definition
The formal representation of a database's structure, organizations, relationships, and validation rules specified in a formal data definition language.

## Examples
Defining an e-commerce schema containing `customers`, `orders`, and `line_items` tables with foreign keys linking orders back to customer IDs.
