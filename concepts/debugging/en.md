---
label: "Debugging"
aliases: []
loanwords: []
plain_descriptions:
  - "investigative process of identifying, reproducing, and fixing defects in software"
  - "methodical workflow of diagnosing anomalous behavior using logs, assertions, and stepping tools"
summary: "The systematic engineering process of detecting, isolating, and rectifying software defects or anomalies."
confusable_notes:
  breakpoint: "Debugging is the comprehensive engineering workflow of locating and fixing bugs, whereas a breakpoint is an intentional pause point inserted into code during a debugging session."
follow_up_questions:
  - "How does interactive stepping with a debugger compare to structured telemetry and logging in production diagnostics?"
  - "What strategies distinguish bisecting code regressions from memory heap inspections during root cause analysis?"
translation: native
---

## Easy explanation
Think of an automotive mechanic diagnosing an engine that sputters at high speeds. The mechanic connects diagnostic sensors, listens to the pistons firing, checks spark plug voltages, and swaps worn ignition coils until the motor runs smoothly again.

## Details
Debugging begins when observed software behavior deviates from expected specifications. The engineering workflow involves establishing a reproducible test case, inspecting runtime execution states via specialized tools (debuggers), analyzing logs, and isolating root causes. Techniques include step-by-step code execution, setting memory watchpoints, evaluating expressions in a suspended process, and using static analyzers. Once the underlying flaw is identified, engineers develop a fix and run automated regression tests to verify that the defect is resolved without introducing collateral regressions.

## Technical definition
A multi-stage engineering practice involving the systematic observation, diagnosis, and correction of latent defects, logic errors, or resource bottlenecks within a software system.

## Examples
An engineer tracks down a shopping cart calculation defect: using a debugger, they step through `applyDiscount()` and discover that an off-by-one error deducted a 20 percent voucher twice on orders over 100 dollars.
