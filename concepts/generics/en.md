---
label: "Generics"
qualifier: "(Programming)"
aliases: []
loanwords: []
plain_descriptions:
  - "feature that lets developers write classes and functions with placeholder types supplied later"
  - "code templates that provide strong type safety across different data types without repeating logic"
summary: "A language feature that allows algorithms and data structures to be defined with placeholder types, deferred until instantiation or invocation."
confusable_notes: {}
follow_up_questions:
  - "How does C# reification of generic types at runtime differ from Java’s compile-time type erasure?"
  - "In what scenarios do generic type constraints restrict type parameters to specific interfaces or base classes?"
translation: native
---

## Easy explanation
Think of a clear plastic shipping crate marked with an insertable label slot. The warehouse uses the exact same sturdy crate design whether packing books, electronics, or vegetables; the label slot specifies the cargo type, ensuring handlers don't accidentally mix books into an electronics crate.

## Details
Generics allow developers to author reusable classes, structures, interfaces, and methods parameterized over data types. Instead of hardcoding concrete types or resorting to untyped objects that require dangerous runtime casting, generics defer type specification until the code is consumed (such as `List<T>`). The compiler validates type safety at build time, preventing runtime type mismatches. Furthermore, generics eliminate boxing and unboxing performance penalties for value types in systems like .NET, combining maximal code reuse with optimal execution efficiency.

## Technical definition
A language facility enabling parametric polymorphism, where routines and data types are declared with generalized type parameters that are resolved concretely during compilation or execution.

## Examples
A developer declares a generic list `List<int> scores = new List<int>();`; the compiler enforces that only 32-bit integers can be added, catching attempted string insertions at build time.
