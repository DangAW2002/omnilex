---
label: Relational database
aliases:
  - RDBMS
  - relational database management system
autolink:
  aliases:
    RDBMS: always
loanwords: []
plain_descriptions:
  - a digital filing system that organizes facts into neat tables linked by common keys
  - structured database software that uses SQL to keep table records connected and strictly accurate
summary: A type of database that stores and provides access to data points that are related to one another through organized tables with predefined schemas.
confusable_notes:
  nosql: Relational databases enforce strict tabular schemas, foreign-key relations, and ACID consistency using SQL, whereas NoSQL systems prioritize schema flexibility, horizontal scaling, and varied document/key-value models.
follow_up_questions:
  - How do relational integrity constraints and foreign keys prevent orphan records across related tables?
  - What are the architectural tradeoffs between vertical scaling in relational databases and horizontal scaling in distributed stores?
translation: native
---

## Easy explanation
Like an interconnected set of spreadsheet sheets in an office: one sheet lists customer names with unique IDs, and an orders sheet uses those customer IDs to look up who bought each item without rewriting customer addresses.

## Details
Invented by Edgar F. Codd, relational databases store records in tables (relations) comprising structured rows (tuples) and columns (attributes). Data relationships are defined using primary keys and foreign key constraints, which the database engine enforces automatically. Systems rely on the Structured Query Language (SQL) for declarative data manipulation, transactional guarantees (ACID), and query optimization via indexes.

## Technical definition
A database architecture based on the relational data model that organizes data into tables of rows and columns with enforced mathematical relations, schemas, and ACID transaction guarantees.

## Examples
A banking application runs on a relational PostgreSQL database to ensure that moving funds from a checking account table to a savings account table is strictly recorded without balance mismatches.
