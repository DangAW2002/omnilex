---
label: Clean architecture
aliases:
  - Onion architecture
  - Hexagonal architecture
loanwords: []
plain_descriptions:
  - layering software so business rules stay independent of frameworks and databases
  - code design where internal logic points inward and knows nothing about external tools
summary: A software architectural paradigm structured in concentric layers where dependencies point strictly inward toward domain logic, decoupling business rules from frameworks and databases.
confusable_notes: {}
follow_up_questions:
  - How does the dependency inversion principle enforce the inward-pointing rule in Clean Architecture?
  - When does the boilerplate of mapping data across multiple layer boundaries become counterproductive?
translation: native
---

## Easy explanation
Like an onion with distinct protective layers: the delicate core in the center is the pure business idea, while outer layers handle cooking pans and seasonings that can be swapped without changing the core.

## Details
Formulated by Robert C. Martin, Clean Architecture organizes code into concentric rings: Entities at the center, surrounded by Use Cases, Interface Adapters, and Frameworks and Drivers at the outer edge. The fundamental Dependency Rule mandates that code dependencies must only point inward toward higher-level policies. Inner business logic has zero dependencies on databases, UI frameworks, or third-party SDKs; instead, outer layers implement abstractions declared by inner layers using dependency inversion.

## Technical definition
A domain-centric architectural pattern enforcing strict inward directional dependency flow, ensuring business logic remains independent of persistence mechanisms and delivery mechanisms.

## Examples
A banking application where loan calculation rules reside in an inner entity layer, allowing engineers to replace the outer database engine from PostgreSQL to MongoDB without modifying a single line of financial calculation code.
