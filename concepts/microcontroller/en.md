---
label: Microcontroller (MCU)
aliases:
  - "MCU"
loanwords: []
autolink:
  aliases:
    MCU: always
plain_descriptions:
  - compact single chip computer designed to govern dedicated hardware tasks
  - integrated circuit containing a processor core memory and input output peripherals
summary: A compact integrated circuit containing a processor core, memory, and programmable input/output peripherals designed for embedded control operations.
confusable_notes: {}
follow_up_questions:
  - What distinguishes a microcontroller from a general-purpose microprocessor?
  - Why are deep sleep power modes essential for battery-powered microcontroller designs?
translation: native
---

## Easy explanation
A microcontroller is essentially an entire computer shrunk onto a single fingernail-sized microchip, built not to run office spreadsheets or complex games, but to reliably manage a single appliance like a microwave oven, a washing machine, or a thermostat.

## Details
An MCU integrates a central processing unit (CPU), static RAM, non-volatile flash memory, timers, and input/output interfaces (GPIO, UART, SPI, I2C, ADC) on a single silicon substrate. Unlike desktop processors that depend on external memory chips and support chipsets, microcontrollers are self-contained, power-efficient, and optimized for real-time control. They operate at lower clock frequencies (typically tens to hundreds of megahertz) and feature advanced power-saving states to sustain years of operation on coin-cell batteries.

## Technical definition
A monolithic integrated circuit containing a central processor unit, integrated program and data memory, and programmable hardware peripherals dedicated to executing targeted embedded firmware routines.

## Examples
An Espressif ESP32 dual-core microcontroller orchestrating sensor readings, Wi-Fi telemetry transmissions, and local encryption inside a home air quality monitor.
