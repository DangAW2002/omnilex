---
label: Dependency injection
aliases:
  - DI
  - Inversion of control
loanwords: []
autolink:
  aliases:
    DI: always
plain_descriptions:
  - passing required objects into a component from outside rather than creating them inside
  - supplying dependencies to a class via constructors or setters to improve testability
summary: A software design pattern where an object receives its dependencies from an external assembler rather than instantiating them internally, implementing inversion of control.
confusable_notes: {}
follow_up_questions:
  - Why is constructor injection generally preferred over field or setter injection?
  - How do dependency injection containers manage object lifecycles like transient, scoped, and singleton?
translation: native
---

## Easy explanation
Like plugging a desk lamp into an electrical wall socket: the lamp does not generate its own electricity or care which power plant made it, it simply expects an external outlet to feed it power.

## Details
When classes directly construct their own dependencies using hardcoded instantiation (such as new DatabaseConnection()), they become tightly coupled and impossible to isolate during unit testing. Dependency Injection (DI) inverts this control: dependencies are defined as interfaces and supplied from the outside, most commonly through constructor parameters. An external container or framework resolves the dependency graph at startup and wires components together, making code modular, configurable, and easily mockable in test suites.

## Technical definition
A creational design pattern realizing inversion of control by passing collaborator instances into dependent objects via constructor parameters, setters, or interfaces.

## Examples
An OrderService receiving an IPaymentGateway interface via its constructor, enabling production code to inject a Stripe client while automated unit tests inject an in-memory mock payment service.
