---
label: Normalization
qualifier: (Database)
aliases:
  - database normalization
  - relational normalization
loanwords: []
autolink:
  label: never
plain_descriptions:
  - organizing database tables to eliminate duplicate copies of the same information
  - structuring relational tables so every piece of data is stored in exactly one logical place
summary: The process of structuring a relational database in accordance with normal forms to reduce data redundancy and improve data integrity.
confusable_notes: {}
follow_up_questions:
  - How does Third Normal Form (3NF) eliminate transitive functional dependencies between non-key columns?
  - When is intentional denormalization justified for read-heavy analytical reporting systems?
translation: native
---

## Easy explanation
Like cleaning up a cluttered address book: instead of writing down the company's full office address next to every single coworker's name, you create one company directory page and just write the company name on each person's card.

## Details
Normalization applies progressive mathematical rules (Normal Forms: 1NF, 2NF, 3NF, BCNF) to relational schemas. It decomposes wide, unorganized tables into smaller, focused tables linked by foreign keys. By eliminating redundant copies of facts, normalization prevents insertion, update, and deletion anomalies, guaranteeing that updating a customer's address requires editing only a single row in the database.

## Technical definition
A systematic schema design technique that decomposes relations to eliminate update anomalies, functional dependencies, and redundant storage through adherence to progressive normal forms.

## Examples
A store normalizes its sales records by separating customer phone numbers into a dedicated customers table, so changing a customer's phone number updates one row instead of 50 past order records.
