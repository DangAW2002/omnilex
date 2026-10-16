---
label: "Framework"
qualifier: "(Software)"
aliases:
  - "Software framework"
loanwords: []
autolink:
  label: never
plain_descriptions:
  - "a foundational software skeleton that dictates how your application is built and executed"
  - "a platform that calls your custom code within a predefined structural architecture"
summary: "A comprehensive structural foundation providing generic functionality, application lifecycle control, and architectural conventions into which custom code is inserted."
confusable_notes:
  software-library: "A framework controls the execution flow and invokes user-provided code, whereas a library is a collection of helper routines invoked at will by user code."
follow_up_questions:
  - "What is the Hollywood Principle (\"Don't call us, we'll call you\") in software framework design?"
  - "How do opinionated frameworks speed up team onboarding while reducing architectural drift?"
translation: native
---

## Easy explanation
The prefabricated steel frame and foundation of a house: the frame dictates where the rooms, windows, and doors go, and your job is to install the interior decor and paint the walls.

## Details
Frameworks enforce the architectural pattern known as Inversion of Control (IoC). Rather than your code driving the program, the framework manages the execution loop, event routing, and lifecycle states, calling your custom event handlers or controllers when appropriate. Frameworks typically bundle routing, data access, state management, and dependency injection.

## Technical definition
A reusable semi-complete software environment that defines application architecture and execution control, invoking user-supplied components via inversion of control hooks.

## Examples
Developing a web application using Angular or Spring Boot, where the framework handles HTTP request lifecycle and invokes your annotated controller methods.
