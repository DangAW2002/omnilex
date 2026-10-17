---
label: Gateway
qualifier: (IoT)
aliases:
  - "IoT gateway"
loanwords:
  - "gateway"
autolink:
  label: never
plain_descriptions:
  - bridge unit connecting field sensors with external cloud networks and translating protocols
  - physical hub that aggregates local device signals and forwards filtered payloads upstream
summary: A bridging hardware device or software appliance that aggregates field sensor data, translates communication protocols, and securely routes telemetry to cloud networks.
confusable_notes: {}
follow_up_questions:
  - How does an IoT gateway perform protocol conversion between industrial Modbus and cloud-bound MQTT?
  - What local processing capabilities allow an IoT gateway to operate during wide area network outages?
translation: native
---

## Easy explanation
An IoT gateway is like an international border translator and postal hub: it collects chatter from local sensors speaking short-range dialects like Zigbee or Bluetooth, translates that information into standardized internet language, and ships it securely to the cloud.

## Details
Positioned at the boundary between operational technology (OT) field devices and information technology (IT) networks, an IoT gateway acts as an aggregation and mediation layer. It bridges disparate local communication media (RS-485, CAN bus, Zigbee, LoRa) to wide area IP networks (Ethernet, Wi-Fi, 4G/5G cellular). Gateways perform protocol normalization, local telemetry buffering, cryptographic device identity proxying, and local data filtering to reduce cellular uplink bandwidth charges.

## Technical definition
An interface node providing data translation, protocol conversion, local compute aggregation, and network bridging between local sensor fieldbuses and external wide-area networks.

## Examples
An industrial DIN-rail gateway collecting Modbus RS-485 temperature readings from ten factory refrigeration units, converting the data into JSON, and publishing it over MQTT via 4G cellular.
