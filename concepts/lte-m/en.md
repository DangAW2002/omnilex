---
label: "LTE-M"
aliases:
  - "eMTC"
  - "LTE Cat-M1"
loanwords:
  - "lte-m"
autolink:
  label: always
plain_descriptions:
  - "cellular iot standard enabling moderate data throughput and mobile voice on existing 4g towers"
  - "low-power cellular connection supporting roaming asset trackers and over-the-air firmware updates"
summary: "A 3GPP cellular standard for machine-type communication that delivers moderate bandwidth, mobility support, and voice capabilities over LTE spectrum."
confusable_notes:
  nb-iot: "LTE-M provides higher throughput up to 1 Mbps, seamless cell handover for moving assets, and VoLTE voice support, whereas NB-IoT offers narrower 200 kHz bandwidth, longer battery life, and lacks cell handover mobility."
  5g: "LTE-M is a narrow low-power subset anchored strictly inside 4G LTE, whereas 5G spans high-bandwidth gigabit services, millisecond-level industrial control, and massive sensor networks."
follow_up_questions:
  - "How does Extended Discontinuous Reception (eDRX) reduce idle power consumption on LTE-M modems?"
  - "Why is LTE-M preferred over NB-IoT for tracking moving vehicles and cold-chain containers?"
translation: native
---

## Easy explanation
Like a smartphone data plan trimmed down to the essentials, allowing a shipping tracker to send location updates seamlessly across cell towers while using a tiny rechargeable battery.

## Details
Standardized by 3GPP as enhanced Machine-Type Communication (eMTC), LTE-M operates within a 1.4 MHz channel carved out of standard LTE cellular carriers. It achieves uplink and downlink speeds of up to 1 Mbps while incorporating power-saving mechanisms such as Power Saving Mode (PSM) and extended Discontinuous Reception (eDRX). Crucially, LTE-M supports connected-mode handover between cellular base stations, ensuring uninterrupted connectivity for tracking freight, wearable devices, and emergency call systems without dropping active sessions.

## Technical definition
A 3GPP radio access specification tailored for intermediate-rate machine communications, providing extended coverage, mobile handover, and voice support on LTE networks.

## Examples
A logistics provider outfits refrigerated shipping containers with LTE-M modems to transmit continuous temperature readings and GPS coordinates while containers transit between regional depots.
