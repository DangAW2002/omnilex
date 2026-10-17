---
label: Primary key
aliases:
  - PK
autolink:
  aliases:
    PK: always
loanwords: []
plain_descriptions:
  - a unique tag or number that tells one row apart from every other row in a database table
  - the unique identification column (like a national ID number) that ensures no duplicate records exist
summary: A specific column or set of columns in a relational database table that uniquely identifies each individual record in that table.
confusable_notes:
  foreign-key: A primary key uniquely identifies rows within its own table, whereas a foreign key in another table points back to that primary key to build relations.
follow_up_questions:
  - What are the architectural tradeoffs between auto-incrementing integer primary keys and UUIDs in distributed databases?
  - Why must a primary key strictly enforce both uniqueness and a non-null constraint?
translation: native
---

## Easy explanation
Like a citizen's national identification number: no two living citizens in the country can ever share the exact same ID number, guaranteeing that records never get mixed up.

## Details
In relational schema design, every table should define a primary key comprising one or more columns (composite key). The database engine automatically constructs a unique index (typically a clustered B-tree) around the key, rejecting any insert or update operation attempting to create duplicate values or NULL entries. This ensures entity integrity and enables fast row lookup by key value.

## Technical definition
A candidate key chosen in a relational schema that enforces uniqueness and NOT NULL constraints on table attributes, uniquely identifying each relation tuple.

## Examples
An employee database assigns each worker a unique numeric employee_id as its primary key, ensuring payroll records for two employees named "John Smith" are kept completely separate.
