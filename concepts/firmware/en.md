---
label: Firmware
aliases: []
loanwords:
  - "firmware"
plain_descriptions:
  - permanent low level software programmed directly into device non volatile storage
  - foundational code that instructs hardware components how to communicate and operate
summary: Low-level software programmed directly into non-volatile memory that provides operational instructions and hardware abstraction for electronic devices.
confusable_notes: {}
follow_up_questions:
  - How does firmware differ from standard operating system application software?
  - What procedures ensure firmware integrity when recovering from an interrupted flash write?
translation: native
---

## Easy explanation
Firmware is the permanent foundational software burned into a device hardware chip: it serves as the instinct of the electronic device, teaching circuits how to wake up, understand button presses, and interact with the physical world.

## Details
Stored in non-volatile flash ROM, EEPROM, or OTP memory, firmware provides low-level control code for hardware components without passing through an external operating system layer. It initializes system clocks, configures input/output registers, manages low-level drivers, and exposes hardware abstractions to upper application logic. In modern connected equipment, firmware images are digitally signed and cryptographically validated during boot phases to prevent tampering and malicious firmware injection attacks.

## Technical definition
Software stored in a device's non-volatile memory (flash, EEPROM or ROM) that initialises the hardware and provides the low-level control logic the device runs.

## Examples
The embedded binary compiled and flashed onto a drone flight controller board that computes motor speed corrections hundreds of times per second based on gyroscope readings.
