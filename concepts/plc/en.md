---
label: Programmable Logic Controller (PLC)
aliases:
  - "PLC"
loanwords:
  - "programmable logic controller"
autolink:
  aliases:
    PLC: always
plain_descriptions:
  - ruggedized industrial computer built to execute deterministic automated factory workflows
  - hardened controller that reads field sensors and governs machinery through programmed logic
summary: A ruggedized industrial digital computer designed to execute deterministic, real-time control logic over manufacturing machinery and industrial processes.
confusable_notes:
  rtu: "A PLC is engineered for high-speed, deterministic millisecond loop control inside factory enclosures, whereas an RTU is optimized for wide-area telemetry over solar, battery, and low-bandwidth wireless links across remote geographic terrain."
follow_up_questions:
  - How do Ladder Logic and Structured Text program representations compare under the IEC 61131-3 standard?
  - What physical and electrical hardening techniques protect PLCs from electrical transients and thermal extremes on the factory floor?
translation: native
---

## Easy explanation
A PLC is a heavy-duty, ultra-reliable industrial computer built inside a rugged metal casing: while regular PCs would crash from factory dust, intense vibration, and electrical surges, a PLC runs uninterrupted for decades turning assembly line conveyor belts, robotic arms, and packaging presses on and off.

## Details
PLCs operate on a continuous, deterministic scan cycle: reading inputs from field devices, executing user-programmed logic routines, and writing outputs to actuators within tight, predictable cycle times (often 1 to 10 milliseconds). Programming adheres to the international IEC 61131-3 standard, which encompasses graphical languages like Ladder Diagram (LD) and Function Block Diagram (FBD), alongside textual languages like Structured Text (ST). Modern industrial PLCs integrate fieldbus interfaces (Profinet, EtherNet/IP, Modbus TCP) and secure edge computing stacks.

## Technical definition
A solid-state, microprocessor-based industrial control computer that monitors input signals from field sensors, processes logic according to user programming, and drives output actuators deterministically.

## Examples
A Siemens S7-1500 PLC controlling the robotic sorting, capping, and label application sequence along an automated brewery bottling conveyor line.
