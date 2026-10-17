---
label: "ESP32"
aliases: []
loanwords:
  - "esp32"
autolink:
  label: always
plain_descriptions:
  - "powerful, low-cost microchip with built-in Wi-Fi and Bluetooth for connected devices"
  - "dual-core microcontroller chip engineered specifically for wireless IoT gadgets"
summary: "A low-cost, low-power system on a chip microcontroller series featuring integrated Wi-Fi and dual-mode Bluetooth designed for wireless IoT product engineering."
confusable_notes:
  arduino: "ESP32 is a specific high-performance 32-bit dual-core wireless SoC created by Espressif Systems, whereas Arduino represents a wider ecosystem and traditionally refers to simpler 8-bit development boards."
follow_up_questions:
  - "How does FreeRTOS task scheduling manage dual-core execution across Protocol and Application workloads in the ESP32?"
  - "In what operational scenarios does the ESP32 ultra-low-power (ULP) co-processor sample sensors while main cores sleep?"
translation: native
---

## Easy explanation
Think of a tiny microchip the size of a postage stamp that not only calculates and operates switches, but also speaks fluent Wi-Fi and Bluetooth, allowing everyday home gadgets to join the internet directly.

## Details
Engineered by Espressif Systems, the ESP32 family incorporates single or dual-core 32-bit Xtensa or RISC-V processing cores running at frequencies up to 240 MHz. Alongside integrated 2.4 GHz 802.11 b/g/n Wi-Fi and Bluetooth 4.2 / 5.0 (BLE), it provides built-in hardware cryptographic accelerators, capacitive touch sensors, analog converters, and serial communication buses. Operating on an integrated FreeRTOS kernel via the ESP-IDF software framework or Arduino core, it powers battery-operated smart home devices, asset trackers, and industrial telematics.

## Technical definition
A monolithic system-on-a-chip microcontroller family featuring 32-bit processing architectures, integrated 2.4 GHz wireless transceivers (Wi-Fi and Bluetooth), and extensive peripheral interfaces optimized for connected embedded applications.

## Examples
A smart thermostat incorporates an ESP32 chip to read digital ambient temperature sensors, host a local setup webpage over Wi-Fi, and transmit hourly room telemetry to a cloud dashboard.
