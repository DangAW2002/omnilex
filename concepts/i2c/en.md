---
label: "I²C"
aliases:
  - "I2C"
  - "Inter-Integrated Circuit"
loanwords:
  - "i2c"
  - "i²c"
autolink:
  aliases:
    I2C: always
plain_descriptions:
  - "two-wire communication bus for connecting multiple sensors to a microchip"
  - "serial data protocol using a clock line and a data line with unique device addresses"
summary: "A synchronous, multi-controller, multi-target serial communication bus that uses two bidirectional open-drain lines (SCL and SDA) pulled high by resistors to network peripheral ICs."
confusable_notes:
  spi-bus: "I²C uses only two shared wires with software device addressing, whereas SPI typically requires four wires and a dedicated Chip Select trace per peripheral device."
  uart: "I²C is a synchronous bus governed by a shared clock line supporting multiple addressed chips on a single bus, whereas UART is an asynchronous point-to-point protocol without a clock wire."
follow_up_questions:
  - "How does open-drain signaling with external pull-up resistors enable multiple devices to share an I²C bus without electrical contention?"
  - "What mechanism does I²C clock stretching use when a peripheral device needs extra time to process incoming data bytes?"
translation: native
---

## Easy explanation
Think of a classroom where the teacher and students share one intercom wire for talking and a second wire for metronome ticks: anyone can be spoken to individually because every student has a unique numbered seat tag.

## Details
Invented by Philips Semiconductor, the Inter-Integrated Circuit (I²C) protocol connects low-speed peripherals across short distances on circuit boards. The bus uses two bidirectional lines pulled high to power rails: Serial Clock (SCL) and Serial Data (SDA). The controller initiates transactions by generating a START condition, broadcasting a 7-bit or 10-bit device address with a read/write bit, and listening for an acknowledgment (ACK) pulse. Common operational speeds span standard mode (100 kbps), fast mode (400 kbps), and fast mode plus (1 Mbps).

## Technical definition
A synchronous serial computer bus architecture employing two bidirectional open-collector or open-drain lines (clock and data) with hardware addressing and collision arbitration for inter-IC communications.

## Examples
A weather monitoring circuit connects a barometric pressure sensor, a relative humidity sensor, and a real-time clock chip to a microcontroller over the same two I²C pins using addresses 0x76, 0x40, and 0x68.
