---
label: "Serial Peripheral Interface (SPI)"
aliases:
  - "SPI"
loanwords:
  - "spi"
  - "spi bus"
autolink:
  aliases:
    SPI: always
plain_descriptions:
  - "high-speed, four-wire data connection between a microchip and external memory or displays"
  - "synchronous serial communication interface using separate lines for sending and receiving data simultaneously"
summary: "A high-speed, synchronous four-wire serial interface providing full-duplex data transfer between a master device and one or more selected peripheral devices using dedicated chip select lines."
confusable_notes:
  i2c: "SPI offers much higher data throughput (tens of MHz) using four dedicated wires and hardware chip-select lines, whereas I²C operates at lower speeds over two shared wires using software addressing."
  uart: "SPI relies on a shared master clock line for synchronous full-duplex transfers, whereas UART operates asynchronously without a clock wire at agreed baud rates."
follow_up_questions:
  - "How do clock polarity (CPOL) and clock phase (CPHA) define the four standard SPI communication modes?"
  - "What hardware routing disadvantages arise when connecting ten or more SPI peripheral chips to a single controller?"
translation: native
---

## Easy explanation
Imagine two conveyor belts running side-by-side between a supervisor and a worker: one belt brings incoming reports while the other carries outgoing instructions at the exact same rhythm set by a ticking metronome.

## Details
Motorola originally designed the Serial Peripheral Interface (SPI) for fast, short-distance peripheral communications on circuit boards. The interface utilizes four primary traces: Serial Clock (SCLK), Master Out Slave In (MOSI), Master In Slave Out (MISO), and Chip Select (CS or SS). Because transmission is synchronous and full-duplex, the master and selected slave exchange bits simultaneously on every clock cycle. Operating clock rates routinely reach 10 MHz to 80 MHz, making SPI ideal for SD card storage, TFT graphical displays, high-resolution ADCs, and flash memory.

## Technical definition
A synchronous, full-duplex four-wire serial communication interface using dedicated clock and data lines alongside hardware chip-select signaling to govern byte exchanges between a single controller and peripheral devices.

## Examples
An embedded graphics engine transmits full-color frame data to a 320x240 LCD display panel over an SPI bus running at 40 MHz, updating the visual interface sixty times per second.
