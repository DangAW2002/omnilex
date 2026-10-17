---
label: Bluetooth Low Energy (BLE)
aliases:
  - "BLE"
loanwords:
  - "bluetooth low energy"
autolink:
  aliases:
    BLE: always
plain_descriptions:
  - short range wireless personal area network technology designed for minimal battery drain
  - power efficient radio specification for exchanging sensor data with nearby devices
summary: A power-optimized wireless personal area network technology designed for short-range communication with minimal electrical energy consumption.
confusable_notes: {}
follow_up_questions:
  - How does the Generic Attribute Profile (GATT) organize BLE data into services and characteristics?
  - What advantages does non-connectable advertising mode provide for location beacons?
translation: native
---

## Easy explanation
Unlike classic Bluetooth designed for continuous audio streaming that drains phone battery within hours, Bluetooth Low Energy stays asleep almost all the time, waking up for just a fraction of a millisecond to send quick sensor readings before sleeping again.

## Details
BLE operates in the globally unlicensed 2.4 GHz ISM band, dividing spectrum into 40 RF channels (3 channels reserved for discovery advertising and 37 for bidirectional data transfers). Its client-server data hierarchy is governed by the Generic Attribute Profile (GATT), structuring payload data into Services and readable/writable Characteristics identified by UUIDs. Because duty cycles are kept under one percent, small sensors and wearable peripherals can operate reliably for multiple years on a standard CR2032 coin cell.

## Technical definition
A wireless personal area network standard managed by the Bluetooth SIG designed to provide novel low-power, short-range radio communication for battery-constrained peripheral devices.

## Examples
A continuous glucose monitor worn on an arm that periodically transmits real-time blood sugar telemetry to a nearby smartphone app via BLE GATT notifications.
