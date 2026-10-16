---
label: GraphQL
aliases: []
loanwords: []
autolink:
  label: auto
plain_descriptions:
  - an API tool that lets client apps request only the exact data fields they need
  - a single query language for frontends to fetch custom data shapes in one go
summary: An open query language and runtime for APIs that allows clients to request exact data shapes and consolidate multiple resources in one request.
confusable_notes: {}
follow_up_questions:
  - How does GraphQL resolve the N+1 database query problem via DataLoader?
  - When is REST preferable to GraphQL for public developer APIs?
translation: native
---

## Easy explanation
Instead of ordering a pre-set meal combo where you end up throwing away the coleslaw, you hand the counter staff a customized list of ingredients and receive only what you asked for.

## Details
GraphQL exposes a single endpoint backed by a strictly typed schema. Clients write query documents specifying nested fields; the server runtime parses the document, validates it against the schema, and resolves each field dynamically, avoiding over-fetching and under-fetching.

## Technical definition
A schema-driven query language and server execution engine providing declarative data fetching, deterministic type contracts, and hierarchical client-controlled responses.

## Examples
A mobile app requesting only the title and avatar url of a user profile in a single query payload instead of hitting three separate REST endpoints.
