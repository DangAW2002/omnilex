---
label: "Class"
qualifier: "(Programming)"
aliases: []
loanwords: []
autolink:
  label: never
plain_descriptions:
  - "architectural template for manufacturing objects with shared attributes and behaviors"
  - "code blueprint specifying what variables and methods an instantiated entity will possess"
summary: "An extensible code template that defines the state properties and callable behaviors for constructing objects."
confusable_notes: {}
follow_up_questions:
  - "How does class inheritance differ from object composition in large system architectures?"
  - "In what ways do access modifiers enforce data encapsulation within a class declaration?"
translation: native
---

## Easy explanation
Consider an architect's blueprint for a residential townhouse. The blueprint is not a building itself, but builders follow its precise measurements to erect dozens of physical houses, each possessing distinct paint colors yet identical structural layouts.

## Details
A class bundles data fields and executable methods into a cohesive definition. Instantiating a class produces an object in memory, initialized through a specialized constructor routine that sets initial attribute states. Classes support inheritance, allowing subclass specializations to adopt, expand, or override behaviors established by parent constructs. Encapsulation mechanisms like private, protected, and public visibility controls restrict direct manipulation of internal properties, exposing only audited operational interfaces.

## Technical definition
A construct that defines a composite data type, encapsulating state representations and behavioral routines to serve as an authoritative template for runtime object instantiation.

## Examples
A `BankAccount` class declares a balance variable and a `deposit(amount)` method; instantiating it with a 200 dollar starting deposit creates a dedicated account entity.
