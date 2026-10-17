---
label: "TypeScript"
aliases:
  - "TS"
loanwords: []
autolink:
  aliases:
    TS: never
plain_descriptions:
  - "a version of JavaScript that checks data types to prevent coding bugs"
  - "a typed superset of JavaScript that compiles down to plain JavaScript"
summary: "A strongly typed programming language that builds on JavaScript, giving developers better tooling and early error detection."
confusable_notes:
  javascript: "TypeScript introduces compile-time static type analysis and interfaces, whereas JavaScript evaluates types dynamically at runtime."
follow_up_questions:
  - "How does structural typing in TypeScript differ from nominal typing?"
  - "What advantages do generic types provide when designing reusable frontend components?"
translation: native
---

## Easy explanation
Think of TypeScript as JavaScript with an automated spell-checker and grammar proofreader that catches typos before your book goes to print.

## Details
Developed by Microsoft, TypeScript layers static type annotations, interfaces, generics, and enums on top of JavaScript syntax. During the build process, the TypeScript compiler (tsc) analyzes the codebase for type mismatches, missing object properties, or invalid function arguments, and then strips away type information to output clean JavaScript compatible with browsers and Node.js.

## Technical definition
A statically typed syntactic superset of JavaScript that compiles directly to clean, standard JavaScript across various target ECMAScript versions.

## Examples
Defining interface User { id: number; name: string; } ensures that any attempt to pass a string value for id triggers an immediate build-time compile error.
