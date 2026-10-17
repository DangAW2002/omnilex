---
label: "Interpreter"
qualifier: "(Programming)"
aliases: []
loanwords: []
plain_descriptions:
  - "program that reads, translates, and executes source code instructions on the fly without producing a binary file"
  - "execution engine that processes code line by line directly at runtime"
summary: "A computer program that directly executes instructions written in a programming or scripting language without requiring prior compilation into machine code."
confusable_notes:
  compiler: "An interpreter reads and executes source code directly line by line at runtime, whereas a compiler translates the entire program ahead of time into machine code or bytecode."
follow_up_questions:
  - "How do Just-In-Time (JIT) compilers combine interpreting with dynamic machine code generation for hot loops?"
  - "Why do interpreted languages offer rapid developer feedback loops despite running slower than statically compiled code?"
translation: native
---

## Easy explanation
Think of a simultaneous live interpreter speaking at a United Nations summit. As the diplomat speaks a sentence in Spanish, the interpreter listens and translates it into Vietnamese over headphones sentence by sentence in real time, without waiting for the diplomat to finish their one-hour address.

## Details
An interpreter parses source code instructions and evaluates them directly within its runtime environment. Because it does not require a lengthy ahead-of-time compilation pass, developers can modify scripts and run them immediately, facilitating rapid experimentation and interactive REPL workflows. However, interpreting code line-by-line introduces runtime translation overhead, making pure interpreted execution slower than native compiled machine code. Modern execution engines bridge this gap using Just-In-Time (JIT) compilation, dynamically converting frequently executed code paths into native instructions.

## Technical definition
A computer program that analyzes and executes source code or intermediate bytecode representations directly at runtime, translating and dispatching operational instructions without generating an independent machine binary.

## Examples
The Python runtime engine executes a script: it reads `print("hello")`, parses the syntax, and immediately commands the terminal to output the text string without creating a compiled binary.
