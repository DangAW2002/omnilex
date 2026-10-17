---
label: "Embedded system"
aliases: []
loanwords: []
plain_descriptions:
  - "specialized computer built inside a larger machine to run dedicated tasks"
  - "compact microprocessor hardware dedicated entirely to single-purpose equipment control"
summary: "A dedicated computing assembly combining a microprocessor, firmware, and peripheral interfaces engineered to execute predefined control operations within an encompassing machine."
confusable_notes:
  single-board-computer: "An embedded system is a broad engineering architecture tailored to specialized closed tasks, whereas a single-board computer is a complete, modular computing platform that often runs full general-purpose operating systems."
follow_up_questions:
  - "How do real-time latency guarantees dictate whether an embedded system requires a bare-metal loop or an RTOS?"
  - "In what ways do harsh thermal and electromagnetic operating environments alter embedded system hardware designs?"
translation: native
---

## Easy explanation
Think of a standard home microwave oven: instead of housing an entire desktop tower with keyboards and web browsers, it relies on a hidden microchip that reads numeric keypad inputs, counts down cooking durations, and powers the magnetron safely.

## Details
An embedded system integrates computing processing cores, volatile memory, flash storage, and input-output hardware into equipment ranging from vehicle anti-lock braking modules to medical infusion pumps. Because these systems focus on explicit operational profiles, engineers optimize them for physical size, minimum power draw, unit production cost, and deterministic execution timelines. Software on embedded units is typically stored as persistent firmware in non-volatile storage and boots instantly upon power application without human administrative intervention.

## Technical definition
A purpose-built electronic computing platform incorporating processing circuitry, dedicated firmware, and physical transducers to fulfill deterministic operational objectives inside a hosting physical apparatus.

## Examples
An automotive electronic control unit samples wheel-speed sensors fifty times per second and regulates hydraulic braking actuators when wheel slip occurs during sudden deceleration.
