---
label: Index
qualifier: (Database)
aliases:
  - database index
  - table index
loanwords: []
autolink:
  label: never
plain_descriptions:
  - a sorted lookup helper that lets the database find specific rows in milliseconds instead of scanning the whole disk
  - an alphabetical index at the back of a book pointing directly to table rows
summary: A specialized data structure associated with a database table that accelerates record retrieval at the expense of extra storage and slower writes.
confusable_notes: {}
follow_up_questions:
  - Why does having too many indexes degrade database write and insert performance?
  - What is the structural difference between a clustered and a non-clustered B-tree index?
translation: native
---

## Easy explanation
Like the alphabetical index at the back of a thick textbook: instead of reading all 800 pages to find a term, you look up its page number in five seconds.

## Details
Without an index, the database engine must execute a full table scan, checking every single record sequentially. Indexes (commonly organized as balanced B-Trees or hash tables) maintain ordered references to specific column values, turning linear scans into logarithmic tree lookups.

## Technical definition
An auxiliary data structure that organizes key pointers on disk or memory to enable rapid access paths for search conditions without exhaustive relation scans.

## Examples
Creating a B-tree index on the `email` column of a users table so checking login credentials walks a few levels of the B-tree instead of scanning every row.
