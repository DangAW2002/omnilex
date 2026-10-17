---
label: Domain-driven design (DDD)
aliases:
  - DDD
loanwords: []
autolink:
  aliases:
    DDD: always
plain_descriptions:
  - software design methodology centering code around business models and shared language
  - structuring complex enterprise software according to real-world domain rules
summary: A software architectural methodology centering system design and implementation around core business models, ubiquitous language, and bounded contexts.
confusable_notes: {}
follow_up_questions:
  - How do bounded contexts delineate boundaries between distinct domain models?
  - What role does an aggregate root play in enforcing transactional consistency?
translation: native
---

## Easy explanation
Like creating an architectural blueprint where doctors, nurses, and hospital software engineers use the exact same clinical terminology, ensuring everyone agrees on what an admission or prescription means.

## Details
Domain-Driven Design (DDD) addresses software complexity by connecting implementation deeply to evolving business models. It introduces strategic design tools such as Ubiquitous Language—a rigorous shared vocabulary used by both domain experts and developers—and Bounded Contexts, which establish clear linguistic and conceptual boundaries across large systems. Tactically, it structures code into Entities (identifiable objects), Value Objects (immutable descriptors), Aggregates (transactional clusters), and Repositories (persistence abstractions).

## Technical definition
A software architectural methodology prioritizing deep modeling of real-world business domains through explicit context boundaries, shared ubiquitous vocabularies, and aggregate-centric consistency boundaries.

## Examples
A logistics platform dividing its codebase into separate Bounded Contexts for FleetManagement and FreightBilling, allowing the term Vehicle to have specialized properties tailored to maintenance versus depreciation.
