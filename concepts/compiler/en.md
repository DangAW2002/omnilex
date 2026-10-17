---
label: "Compiler"
aliases: []
loanwords: []
plain_descriptions:
  - "tool that translates entire source code files into machine code or bytecode before execution"
  - "program that analyzes human-readable code and converts it into a runnable standalone binary"
summary: "A computer program that translates software source code written in a high-level programming language into machine code or an intermediate representation prior to execution."
confusable_notes:
  interpreter: "A compiler translates entire source programs ahead of time into machine code or bytecode before execution, whereas an interpreter reads and executes source instructions directly on the fly."
follow_up_questions:
  - "What discrete processing phases occur between lexical tokenization and intermediate code generation in modern compilers?"
  - "How do optimizing compilers perform dead-code elimination and loop unrolling to maximize CPU efficiency?"
translation: native
---

## Easy explanation
Think of a professional literary translator commissioned to translate an entire English novel into Vietnamese. The translator works for months to produce a finished, bound book in Vietnamese; readers can then purchase the book and read it fluently from cover to cover without needing the original English text beside them.

## Details
A compiler performs transformation ahead of execution through sequential architectural phases: lexical analysis breaks text into tokens, syntax analysis builds an abstract syntax tree (AST), semantic analysis validates typing and scopes, and intermediate representation (IR) optimizations streamline logic. Finally, the code generator emits target machine architecture instructions or virtual machine bytecode (like Java bytecode or .NET CIL). Compiled executables run with high efficiency directly on the hardware without translation overhead during runtime.

## Technical definition
A translation system that processes high-level programming source code in its entirety, transforming language syntax through semantic analysis and optimization into lower-level target machine code or bytecode.

## Examples
Running `gcc main.c -o app` compiles 400 lines of C source code into a standalone ELF binary executable file, ready to launch directly on Linux.
