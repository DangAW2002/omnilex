---
label: NB-IoT
aliases: []
loanwords:
  - "nb-iot"
autolink:
  label: always
plain_descriptions:
  - cellular radio standard optimized for low bandwidth high density iot device deployments
  - licensed telecom network specification enabling deep indoor coverage for battery powered meters
summary: A narrowband cellular radio technology standard developed by 3GPP, designed for massive machine-type communication on licensed telecommunication frequencies.
confusable_notes:
  lorawan: NB-IoT is a 3GPP cellular standard requiring dedicated telecom SIM subscriptions and mobile carrier base stations, whereas LoRaWAN uses unlicensed radio bands and private gateway infrastructure.
follow_up_questions:
  - How do Power Saving Mode (PSM) and extended Discontinuous Reception (eDRX) enable ten-year battery lifespans in NB-IoT?
  - How does NB-IoT achieve an additional 20 dB of link budget for deep indoor and underground penetration?
translation: native
---

## Easy explanation
NB-IoT is like a specialized lane on mobile telephone towers built exclusively for quiet machines: instead of streaming videos, water meters and streetlights send tiny bursts of data through regular cell towers with exceptional penetration through thick concrete and deep underground vaults.

## Details
Standardized by 3GPP as part of Release 13, NB-IoT occupies a narrow 200 kHz channel bandwidth deployed in-band within regular LTE spectrum, in guard bands, or standalone. It offers link budget gains of approximately 20 dB over standard GPRS, enabling connectivity in basements, manholes, and remote facilities. Key cellular power-saving mechanisms include Power Saving Mode (PSM), where the device powers down its transceiver while remaining registered on the network, and extended Discontinuous Reception (eDRX). Data rates reach tens of kilobits per second, ideal for low-throughput telemetry.

## Technical definition
A 3GPP cellular radio access technology standard optimized for low-throughput, delay-tolerant machine-to-machine telemetry with high connection density and deep signal penetration.

## Examples
A municipal water utility company installing thousands of underground smart water meters equipped with NB-IoT SIM cards that transmit water consumption readings once every midnight.
