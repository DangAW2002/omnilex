---
label: "Object-oriented programming (OOP)"
aliases:
  - "OOP"
loanwords: []
autolink:
  aliases:
    OOP: always
plain_descriptions:
  - "programming approach that structures code around self-contained objects holding data and behavior"
  - "software design philosophy based on modeling real world concepts as interacting entities"
summary: "A paradigm centered on modeling software as collections of cooperating objects that encapsulate state and behavior."
confusable_notes:
  functional-programming: "Object-oriented programming organizes systems into stateful, mutable entities communicating via methods, whereas functional programming relies on stateless evaluations of pure functions."
follow_up_questions:
  - "How do polymorphism and dynamic dispatch enable extensible plugin architectures?"
  - "Why does excessive reliance on deep class inheritance hierarchies lead to the fragile base class problem?"
translation: native
---

## Easy explanation
Think of an international airport terminal. Rather than having one central person control luggage, ticketing, and fueling, the facility assigns clear duties to autonomous entities: ticketing desks issue passes, baggage conveyors move luggage, and aircraft manage flight controls.

## Details
Object-oriented programming builds software around four cornerstone principles: abstraction, encapsulation, inheritance, and polymorphism. Abstraction hides intricate internal mechanics behind straightforward interfaces. Encapsulation protects private object states against outside interference. Inheritance allows specialized classes to derive capabilities from base templates. Polymorphism enables distinct object types to respond to identical method invocations through their own tailored implementations.

## Technical definition
A programming paradigm organized around modular objects encapsulating state variables and operational methods, characterized by dynamic dispatch, subtyping, and data hiding.

## Examples
A simulator implements a base `Vehicle` class; distinct instances of `Truck` and `Sedan` each implement a common `steer()` method while maintaining individual payload capacities of 5,000 kg and 400 kg.
