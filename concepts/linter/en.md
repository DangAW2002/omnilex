---
label: "Linter"
aliases:
  []
loanwords: []
plain_descriptions:
  - "a tool that scans your code to find style errors, suspicious patterns, and potential bugs"
  - "an automated spell-checker for programming languages"
summary: "A static code analysis tool that inspects source code for programmatic errors, stylistic inconsistencies, security antipatterns, and non-standard syntax before runtime."
confusable_notes:
  {}
follow_up_questions:
  - "How does a linter differ from a code formatter like Prettier?"
  - "What are the productivity advantages of running linters in automated pre-commit Git hooks?"
translation: native
---

## Easy explanation
An automated grammar and spelling checker built into a word processor that flags typos, run-on sentences, and bad punctuation as you type.

## Details
Linters build an Abstract Syntax Tree (AST) from the source and evaluate it against configurable rule sets. They flag common mistakes such as unused variables, missing error handling, potential null pointer exceptions, and violations of team formatting standards without actually executing the code.

## Technical definition
A static analysis utility that parses source text into structured representations to evaluate compliance with grammatical, stylistic, syntactic, and structural rule constraints.

## Examples
Running ESLint on a JavaScript project to catch unhandled promise rejections and undeclared variables before code is pushed to production.
