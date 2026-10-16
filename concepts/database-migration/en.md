---
label: Migration
qualifier: (Database)
aliases:
  - schema migration
  - database migration
loanwords: []
autolink:
  label: never
plain_descriptions:
  - a version-controlled script that safely updates database table layouts as software evolves
  - a step-by-step code file for adding new columns or tables to live databases
summary: A version-controlled set of programmatic scripts that safely alter database schemas over time without losing existing data.
confusable_notes: {}
follow_up_questions:
  - How can engineering teams execute zero-downtime database migrations with backwards compatibility?
  - What risks arise from running long data migrations inside a single database transaction?
translation: native
---

## Easy explanation
Like an architectural renovation blueprint that specifies exactly which walls to move and which pipes to add, ensuring changes happen systematically without damaging the building.

## Details
Migrations track schema changes alongside application code in git. Each migration script defines an "up" routine to apply structural alterations (like adding tables, columns, or indexes) and a corresponding "down" routine to roll back changes if deployment fails.

## Technical definition
A structured, programmatic mechanism for applying incremental, reversible versioned transformations to a database schema across distinct deployment environments.

## Examples
Running `npm run migrate` in production to add a nullable `phone_number` column to an active `users` table.
