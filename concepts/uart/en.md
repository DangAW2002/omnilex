---
label: "UART"
aliases:
  - "Universal Asynchronous Receiver-Transmitter"
loanwords:
  - "uart"
autolink:
  label: always
  aliases:
    UART: always
plain_descriptions:
  - "two-wire hardware circuit that sends and receives data character by character without a shared clock"
  - "asynchronous serial communication module commonly used for terminal logs and debugging"
summary: "A physical integrated circuit hardware block that translates parallel computing data into sequential asynchronous serial bitstreams over paired transmit (TX) and receive (RX) wires."
confusable_notes:
  i2c: "UART operates asynchronously without a shared clock between two dedicated peers, whereas I²C is a synchronous multi-drop bus with shared clock and data traces."
  spi-bus: "UART requires only two signal wires without a shared clock for point-to-point text and control links, whereas SPI uses four wires with high-speed synchronous clocks."
follow_up_questions:
  - "Why must both communicating devices match their baud rate, parity bit, and stop bits precisely before UART transmission begins?"
  - "How do hardware flow control lines (RTS and CTS) prevent buffer overruns during high-throughput UART communication?"
translation: native
---

## Easy explanation
Think of two people sending Morse code telegrams over a pair of string wires: as long as both agree in advance on how fast letters will be tapped, they can chat back and forth without needing an external metronome.

## Details
A Universal Asynchronous Receiver-Transmitter (UART) is a dedicated silicon module embedded inside microcontrollers and System-on-Chips. It accepts bytes from internal parallel data buses and serializes them into individual bits framed by a start bit, 5 to 9 data bits, an optional parity check bit, and 1 or 2 stop bits. Communication occurs across two cross-connected lines: Transmit (TX) to Receive (RX). Because no clock line is routed, both endpoints independently generate matching bit sampling clocks locked to identical predefined baud rates (such as 9600 or 115200 bps).

## Technical definition
An asynchronous serial communication hardware interface that converts parallel data words into serial bit frames equipped with start, parity, and stop delimitations for point-to-point asynchronous data exchange.

## Examples
An engineer connects a USB-to-serial adapter cable to the TX and RX pins of an IoT gateway to read boot diagnostic logs on a computer terminal at 115,200 baud.
