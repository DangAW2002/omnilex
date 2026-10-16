---
label: Environment variable
aliases:
  - Env var
  - System environment variable
loanwords: []
plain_descriptions:
  - a dynamic key-value setting stored outside software code to configure how it behaves in different environments
  - a configuration variable provided by the operating system to running programs
summary: >-
  A dynamic key-value pair stored in the operating system environment that configures program behavior without altering
  application source code.
confusable_notes: {}
follow_up_questions:
  - Why does the Twelve-Factor App methodology recommend storing configuration strictly in environment variables?
  - How do container orchestration systems pass environment variables securely into runtime processes?
translation: native
---

## Easy explanation
Think of name badges or sticky notes on a desk: before an employee starts work, the manager sticks a note saying "Office Location: Floor 3", which the worker reads without having their training manuals reprinted.

## Details
Environment variables decouple configuration from source code. Developers use standard variables like `PORT=8080`, `DATABASE_URL`, or `NODE_ENV=production`. Because operating systems inherit environment variables down process trees, container engines and CI/CD tools inject specific settings dynamically at startup across staging and production clusters.

## Technical definition
A process-level key-value string mapping maintained in operating system memory and inherited by child processes to parameterize runtime execution.

## Examples
Setting `PORT=3000` and `LOG_LEVEL=debug` before starting an API server, allowing the exact same binary to run locally or in the cloud without recompilation.
