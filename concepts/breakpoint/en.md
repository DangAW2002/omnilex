---
label: "Breakpoint"
qualifier: "(Debugging)"
aliases: []
loanwords: []
plain_descriptions:
  - "intentional pause point placed in code that halts program execution so developers can inspect state"
  - "marker set on a specific line of source code where a debugger suspends the running thread"
summary: "An intentional stopping point configured in source code or instruction addresses where a debugger suspends execution to allow state inspection."
confusable_notes:
  debugging: "A breakpoint is a discrete pause trigger set on an instruction, whereas debugging is the entire workflow of troubleshooting and repairing software defects."
follow_up_questions:
  - "How do hardware breakpoints implemented in CPU debug registers differ from software interrupt instructions?"
  - "When should developers configure conditional breakpoints that trigger only upon specific predicate evaluations?"
translation: native
---

## Easy explanation
Think of a director yelling "Freeze!" on a movie set. All actors immediately hold their exact physical poses in place, allowing the camera crew to measure lighting and inspect costume details before letting action continue.

## Details
A breakpoint commands the runtime execution environment or processor to halt execution immediately before executing a designated instruction. Modern debuggers implement software breakpoints by temporarily patching the target instruction address with an interrupt opcode (like `INT 3` on x86 processors). When hit, the debugger captures current thread register values, stack frame states, and variable environments, granting engineers an interactive session to evaluate expressions, step line-by-line (`step over`, `step into`), or configure conditional criteria (such as pausing only when `userId === 104`).

## Technical definition
A configurable instruction trap inserted into executable code or CPU debug registers that causes the runtime engine to suspend thread execution and transfer control to an attached diagnostic supervisor.

## Examples
A developer sets a breakpoint at line 54 of `orderProcessor.js`; when submitting a test checkout, execution freezes at that line, revealing that `shippingAddress` was null.
