---
label: Document database
aliases:
  - document-oriented database
  - document store
loanwords: []
plain_descriptions:
  - a database that stores records as self-contained JSON-like digital files
  - a flexible system where customer records hold their own nested lists without joining tables
summary: A specialized NoSQL database architecture built to store, retrieve, and manage semi-structured data formatted as documents like JSON or BSON.
confusable_notes: {}
follow_up_questions:
  - How does embedding nested objects in documents differ from normalizing data across relational foreign keys?
  - How do secondary indexes operate on specific fields inside nested JSON documents?
translation: native
---

## Easy explanation
Like keeping tax files in physical labeled manila folders: each folder contains all receipts, forms, and notes for that one person inside one folder, without ripping receipts into separate binders.

## Details
Document databases store each logical record as an independent document, typically using hierarchical formats such as JSON, BSON, or XML. Unlike flat key-value pairs, document databases understand document internal structure, allowing developers to query, filter, and index nested attributes and arrays directly without executing expensive relational joins across multiple tables.

## Technical definition
A semi-structured NoSQL database system that models records as self-describing, hierarchical documents (typically JSON/BSON) with support for rich internal field indexing and querying.

## Examples
A blogging platform stores an article, its author metadata, tag list, and reader comments together in a single JSON document, loading the complete blog post page in a single read.
