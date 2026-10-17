---
label: "Low-power wide-area network (LPWAN)"
aliases:
  - "LPWAN"
loanwords:
  - "lpwan"
autolink:
  aliases:
    LPWAN: always
plain_descriptions:
  - "long-range wireless transmission category engineered for battery-driven sensor units"
  - "telecommunications umbrella covering power-frugal radio links spanning broad geographical areas"
summary: "A category of wireless wide-area telecommunication technologies designed for power-efficient, low-bitrate data transmissions across kilometer-scale ranges."
confusable_notes:
  mesh-network: "LPWAN connects endpoints directly to regional base stations or gateways over kilometers in a star topology, whereas a mesh network relays packets hop-by-hop across nearby peer nodes."
follow_up_questions:
  - "What spectral trade-offs govern the selection between licensed and unlicensed LPWAN frequencies?"
  - "How do asynchronous duty-cycle limits influence downlink response latencies for field endpoints?"
translation: native
---

## Easy explanation
Imagine a battery-powered utility meter hidden in a basement sending a short meter reading directly to a distant cell tower twice a day, lasting a decade on a single battery cell.

## Details
LPWAN architectures prioritize extreme link budget sensitivity and battery conservation over raw bandwidth capacity. By utilizing sub-gigahertz radio spectrum, narrow carrier bandwidths, and advanced digital modulation techniques like chirp spread spectrum or narrowband frequency-division multiplexing, these networks achieve propagation ranges exceeding fifteen kilometers in rural expanses and multiple kilometers within dense urban masonry. Endpoints remain asleep in deep low-power states for over ninety-nine percent of their lifespan, awakening briefly to transmit brief telemetry payloads before returning to microampere-level dormancy.

## Technical definition
A class of telecommunication network architectures optimized for low-bitrate wireless communication among battery-constrained endpoints distributed across wide metropolitan or rural expanses.

## Examples
An environmental monitoring initiative deploys five hundred soil-moisture probes across a ten-square-kilometer watershed, relaying moisture readings every six hours through two central LPWAN collector gateways.
