---
label: "Stack"
qualifier: "(Data structure)"
aliases: []
loanwords: []
autolink:
  label: never
plain_descriptions:
  - "last-in, first-out container where items are added and removed strictly from the top"
  - "vertical data structure operating on LIFO order with push and pop operations"
summary: "A linear collection following the Last-In, First-Out (LIFO) access discipline, restricting insertions and deletions to a single endpoint."
confusable_notes: {}
follow_up_questions:
  - "How does the runtime hardware call stack rely on stack semantics to manage nested function activation records?"
  - "In what ways do graph depth-first searches and expression evaluators employ auxiliary stack data structures?"
translation: native
---

## Easy explanation
Picture a spring-loaded plate dispenser in a cafeteria. Dishwashers stack fresh clean plates on top of the pile; patrons taking plates pull only the topmost plate off. The plate placed last onto the stack is always the very first one picked up.

## Details
A stack is an abstract data type governed by the Last-In, First-Out (LIFO) discipline. Primary operations include `push` (placing an element onto the top of the stack), `pop` (removing and returning the top element), and `peek` (reading the top value without removing it), all completing in $O(1)$ constant time. Stacks are fundamental across computer science: central processing units use hardware call stacks to manage return pointers and stack frames during function invocations; parsing engines use stacks to validate balanced parentheses and evaluate postfix expressions; and web browsers maintain undo/redo histories using twin stack structures.

## Technical definition
A linear abstract data structure enforcing a restricted access policy where all additions and removals occur exclusively at a single designated terminal node called the top.

## Examples
A text editor maintains an undo history: typing "abc" pushes state 1, typing "def" pushes state 2; clicking Undo pops state 2 immediately, reverting the document to "abc".
