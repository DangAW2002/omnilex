---
label: "CAN bus"
aliases:
  - "Controller Area Network"
loanwords:
  - "can bus"
plain_descriptions:
  - "robust serial bus system allowing microcontrollers inside vehicles and machines to talk without a host computer"
  - "two-wire differential broadcast network engineered for electrical noise immunity in automotive and industrial machinery"
summary: "A robust, message-based broadcast bus standard designed to allow microcontrollers and electronic control units to communicate reliably in electrically harsh automotive and industrial environments."
confusable_notes:
  modbus: "CAN bus implements non-destructive bitwise arbitration where any node can initiate transmissions based on message priority, whereas Modbus strictly operates as a master-slave polling architecture where slaves only respond when interrogated."
  bacnet: "CAN bus is a low-level electrical serial bus designed for vehicle engines and industrial machinery controllers, whereas BACnet is an application-level facility automation standard tailored for HVAC, lighting, and elevator building infrastructure."
follow_up_questions:
  - "How does non-destructive bitwise arbitration resolve packet collisions between simultaneous node broadcasts?"
  - "Why does differential signaling on CAN High and CAN Low wires provide high immunity to electromagnetic interference?"
translation: native
---

## Easy explanation
Like a shared conference speakerphone line inside an automobile where the engine, brakes, and dashboard can instantly alert each other over a single pair of twisted wires, with critical brake alerts automatically overriding routine radio chatter.

## Details
Originally engineered by Bosch and standardized as ISO 11898, the Controller Area Network (CAN) utilizes a twisted-pair differential physical line (CAN_H and CAN_L). In CAN networks, transmissions are broadcast to all nodes without explicit station addresses; instead, each frame begins with an identifier field designating content priority. If two nodes broadcast concurrently, non-destructive bitwise arbitration ensures the node with the lower numerical identifier (dominant bits) continues transmitting while the other node yields without message corruption or delay.

## Technical definition
A multi-master, message-based broadcast serial communication bus protocol featuring differential signaling, hardware-level collision arbitration, and robust cyclical redundancy verification.

## Examples
A modern passenger car uses a 500 kbps high-speed CAN bus to exchange wheel rotation speeds, braking pedal pressures, and throttle positions between the engine control module and antilock braking system.
