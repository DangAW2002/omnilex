---
label: Static application security testing (SAST)
aliases:
  - SAST
  - static code analysis
loanwords: []
autolink:
  aliases:
    SAST: always
plain_descriptions:
  - scanning software source code for security flaws without actually running the program
  - automated code review that finds vulnerabilities inside application repositories
summary: A white-box testing methodology that analyzes source code, byte code, or binaries at rest to detect security vulnerabilities before execution.
confusable_notes:
  dast: SAST inspects static source code or binaries without executing them; DAST assesses running applications from the outside by sending simulated malicious requests.
follow_up_questions:
  - How do modern SAST tools trace data flows from user input sources to dangerous sinks?
  - What techniques reduce false-positive fatigue when integrating SAST into CI/CD pipelines?
translation: native
---

## Easy explanation
Think of an editor proofreading an architect's paper blueprints before groundbreaking: they check the structural formulas and room measurements with a ruler on the desk to catch design flaws before any concrete is poured.

## Details
Static application security testing (SAST) inspects uncompiled source code, intermediate bytecode, or compiled binaries from the inside out (white-box testing). SAST analyzers parse code into Abstract Syntax Trees (ASTs), construct Control Flow Graphs (CFGs), and run taint analysis to trace untrusted inputs from sources (such as HTTP request parameters) to sensitive execution sinks (such as database queries or OS commands). Integrating SAST into continuous integration pipelines enables developers to remediate vulnerabilities (such as SQL injections or buffer overflows) early in the development lifecycle (shifting security left).

## Technical definition
A static analysis method that evaluates source code or binary representations for security weaknesses and compliance violations without requiring runtime execution of the software.

## Examples
A GitHub Actions workflow runs a SAST scanner on every pull request, flagging an unescaped SQL query in a new payment service controller before the commit merges.
