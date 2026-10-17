---
label: Monolithic architecture
aliases:
  - Monolith
  - Monolithic system
loanwords: []
autolink:
  aliases:
    Monolith: auto
plain_descriptions:
  - single software application built and deployed as a unified codebase
  - system where all features run inside one process and database
summary: An architectural model where all business capabilities, user interfaces, and database operations are packaged and deployed as a single combined system.
confusable_notes: {}
follow_up_questions:
  - Why is starting with a monolith often recommended before splitting into microservices?
  - How do modular monoliths prevent architectural decay without distributed complexity?
translation: native
---

## Easy explanation
Think of a Swiss Army knife where every blade, screwdriver, and scissor is cast into one solid metal frame: convenient to hold and carry anywhere, but modifying or replacing a single tool requires altering the whole piece.

## Details
In a monolith, the presentation layer, business rules, and data access routines compile into one artifact, such as a single binary executable or WAR file. Components interact through in-process memory calls rather than remote network protocols. This structure avoids distributed networking latency, simplifies transactional integrity with local database locks, and makes end-to-end debugging straightforward. However, as organizations expand, scaling requires duplicating the entire application stack across servers, and any critical bug can take down the whole operational process.

## Technical definition
A software design style where functional components are tightly coupled into a single executable unit sharing memory space, runtime lifecycle, and backing persistence stores.

## Examples
An early-stage retail application deploying its web storefront, payment processing logic, inventory manager, and reporting engine inside a single server cluster of 4 nodes sharing one relational database.
