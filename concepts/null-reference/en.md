---
label: "Null reference"
aliases:
  - "Null pointer"
loanwords: []
plain_descriptions:
  - "pointer or variable that deliberately points to no valid memory address or object"
  - "unassigned reference state that triggers runtime crashes if dereferenced without checks"
summary: "A pointer or reference value that signifies the absence of an object or points to an invalid address in memory."
confusable_notes: {}
follow_up_questions:
  - "Why did language designer Tony Hoare describe the invention of the null reference as his billion-dollar mistake?"
  - "How do modern languages use Option/Maybe monads and nullable reference typing to eliminate NullPointerExceptions at compile time?"
translation: native
---

## Easy explanation
Think of an envelope sent through the postal service with the recipient address line left completely blank. When the letter carrier picks up the envelope to deliver it, there is no destination to walk toward, causing delivery operations to halt in confusion.

## Details
In computer memory, a reference variable normally stores the numeric address of an object allocated on the heap. A null reference assigns this pointer a reserved indicator value (typically represented as numeric 0x0) signifying that the variable purposefully refers to no existing instance. Attempting to access fields or invoke methods on a null reference triggers immediate fatal runtime faults, such as a `NullPointerException` in Java or a segmentation fault in C. Modern programming languages combat these defects using compile-time nullable analysis, safe-navigation operators (`?.`), and optional wrapper types.

## Technical definition
A sentinel value assigned to a reference variable indicating that it does not point to a valid runtime object or memory location within the application address space.

## Examples
An application initializes `User user = null;`; attempting to evaluate `user.getName()` before assigning an actual user object crashes the thread with a null reference exception.
