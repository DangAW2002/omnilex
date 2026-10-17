---
label: Foreign key
aliases:
  - FK
autolink:
  aliases:
    FK: always
loanwords: []
plain_descriptions:
  - a column in one table that points to the unique identifier of a row in another table
  - a database link ensuring an order cannot be created for a customer who does not exist
summary: A column or set of columns in a relational database table that provides a link between data in two tables by referencing the primary key of another table.
confusable_notes:
  primary-key: A primary key uniquely identifies records within its own table, while a foreign key references a primary key in another table to preserve referential integrity.
follow_up_questions:
  - How do cascade delete and cascade update rules function in foreign key constraint definitions?
  - Why can unindexed foreign key columns cause severe performance bottlenecks during parent table updates?
translation: native
---

## Easy explanation
Like writing a student's ID number at the top of a library book checkout card: it connects that specific borrowed book directly to the student record on file in the school registry.

## Details
Foreign keys enforce referential integrity across relational schemas. When a foreign key constraint is active, the database validates that every value entered into the child column already exists in the parent table's referenced primary or unique key column. It also prevents parent rows from being deleted if dependent child records exist, unless explicit cascade rules (such as ON DELETE CASCADE) are specified.

## Technical definition
A referential integrity constraint that links one table's attribute to the primary key or candidate key of another table, guaranteeing valid relationship references.

## Examples
An orders table includes a customer_id column defined as a foreign key referencing the customers table, rejecting any order that specifies a non-existent customer number.
