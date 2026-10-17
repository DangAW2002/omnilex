---
label: "General-purpose input/output (GPIO)"
aliases:
  - "GPIO"
loanwords:
  - "gpio"
autolink:
  aliases:
    GPIO: always
plain_descriptions:
  - "physical pins on a microchip that software can toggle on, off, or read as digital signals"
  - "programmable electrical pins used to communicate with switches, LEDs, and external circuits"
summary: "An uncommitted digital signal pin on an integrated circuit whose electrical direction and voltage state can be configured dynamically by software at runtime."
confusable_notes: {}
follow_up_questions:
  - "How do internal pull-up and pull-down resistors prevent floating logic states on GPIO input pins?"
  - "What hardware mechanism enables edge-triggered interrupts on GPIO lines to wake a suspended microprocessor?"
translation: native
---

## Easy explanation
Think of GPIO pins like a row of tiny electronic light switches and doorbells on a microchip: writing code can flip a switch to illuminate a light bulb, or listen for when a human presses a doorbell button.

## Details
General-Purpose Input/Output pins bridge digital software execution and physical electrical circuitry. Under software control, each pin can be assigned as an input (reading high or low voltage states) or an output (driving logic voltage or sinking current). Advanced microcontroller pin controllers allow software to activate integrated biasing resistors (pull-up or pull-down), map internal timer peripherals for pulse generation, or attach hardware interrupt routines that immediately execute on rising or falling signal edges.

## Technical definition
A configurable digital interface terminal on a semiconductor package whose operational behavior—directionality (input/output), electrical drive characteristics, and interrupt generation—is controlled programmatically via memory-mapped registers.

## Examples
An embedded Linux single-board computer configures GPIO pin 17 as an input with an internal pull-up resistor to detect when an industrial safety door switch opens.
