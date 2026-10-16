---
label: Object-Relational Mapping (ORM)
aliases:
  - ORM
loanwords: []
autolink:
  aliases:
    ORM: always
plain_descriptions:
  - a programming bridge that lets developers query database tables using normal code objects
  - software that translates programming objects into SQL database rows automatically
summary: A software technique that bridges object-oriented code and relational databases by mapping database tables to programming language classes.
confusable_notes: {}
follow_up_questions:
  - What causes the object-relational impedance mismatch in complex enterprise domain models?
  - How can developers identify and eliminate unintended N+1 database queries when using an ORM?
translation: native
---

## Easy explanation
Like an automatic language translator who converts words spoken in French directly into written Italian records without you needing to memorize Italian grammar rules.

## Details
ORMs inspect object schemas defined in languages like TypeScript, Python, or Java and generate corresponding SQL statements behind the scenes. Developers manipulate local class instances, and the ORM handles database connections, transactions, type casting, and SQL generation.

## Technical definition
A persistence abstraction framework that maps relational database schemas to object-oriented programming entities, automating data synchronization and schema translation.

## Examples
Calling `user.save()` in Prisma or Hibernate to execute an SQL `UPDATE users SET name = ...` without writing manual query strings.
