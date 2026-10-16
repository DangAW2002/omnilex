---
label: SQL
aliases:
  - Structured Query Language
loanwords: []
autolink:
  label: always
plain_descriptions:
  - the standard computer language used to ask questions and edit data in relational databases
  - the command language for reading, filtering, and inserting rows in tables like postgres or mysql
summary: A standardized declarative programming language used to manage, query, and manipulate data stored in relational database management systems.
confusable_notes: {}
follow_up_questions:
  - How does a SQL query planner decide between an index seek and a full table scan?
  - What distinguishes ANSI SQL compliance across commercial engines like PostgreSQL and SQL Server?
translation: native
---

## Easy explanation
Like asking a librarian questions using clear sentences: "Show me all books written by Tolkien published after 1950 sorted by title."

## Details
SQL operates declaratively; users specify what records they want rather than writing step-by-step memory algorithms. Commands encompass Data Query Language (SELECT), Data Manipulation Language (INSERT, UPDATE, DELETE), and Data Definition Language (CREATE, ALTER).

## Technical definition
An ANSI/ISO standardized domain-specific declarative language designed for managing stream-oriented data structures and relational tables.

## Examples
Executing `SELECT name, email FROM customers WHERE active = true ORDER BY created_at DESC;` to list registered customers.
