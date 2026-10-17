---
label: "Arduino"
aliases: []
loanwords:
  - "arduino"
plain_descriptions:
  - "open-source microcontroller board and software platform for controlling physical electronics"
  - "easy-to-program electronic prototyping board that reads buttons and turns on motors"
summary: "An open-source electronics prototyping platform encompassing programmable microcontroller hardware boards and a simplified software development environment for controlling physical actuators and sensors."
confusable_notes:
  single-board-computer: "Arduino is a microcontroller development platform that runs a single firmware binary directly on hardware without an OS, unlike SBCs which run rich multitasking operating systems."
  raspberry-pi: "Arduino executes compiled C++ loops directly on silicon without boot delays, while a Raspberry Pi boots an operating system and handles high-level multitasking tasks."
  esp32: "Arduino is an open prototyping ecosystem traditionally centered on simpler 8-bit AVR boards, whereas ESP32 is a high-performance 32-bit dual-core wireless SoC with native Wi-Fi and Bluetooth."
follow_up_questions:
  - "How does the Arduino setup() and loop() programming abstraction simplify bare-metal microcontroller control?"
  - "What considerations dictate migrating an Arduino prototype from an 8-bit AVR board to a 32-bit ARM or ESP platform?"
translation: native
---

## Easy explanation
Think of Arduino as an electric brain for DIY gadgets: you write simple code on your computer telling it when to flash LEDs or spin small wheels, and the board executes those commands tirelessly the moment electricity flows.

## Details
The Arduino ecosystem unites hardware reference schematics based on microcontrollers (such as Microchip AVR or ARM Cortex-M) with an intuitive integrated development environment (IDE). Programmers write firmware sketches in simplified C/C++ structured around two mandatory routines: setup() for one-time hardware configuration and loop() for repetitive execution cycles. The board offers breadboard-friendly pin headers conveying digital I/O, pulse-width modulation (PWM), and analog-to-digital converter (ADC) channels to interface directly with switches, relays, and sensors.

## Technical definition
An open-source computing platform consisting of programmable microcontroller development boards, standard input-output pin header layouts, and a cross-platform toolchain supporting embedded firmware compilation and direct device flashing.

## Examples
A high-school engineering student writes thirty lines of Arduino code to measure soil moisture with an analog probe and trigger a 5V relay to water a potted plant when soil dryness exceeds a threshold.
