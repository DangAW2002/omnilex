---
label: "LoRa"
qualifier: "(IoT)"
aliases:
  - "Long Range radio"
loanwords:
  - "lora"
plain_descriptions:
  - "long-distance, low-power radio modulation that sends small sensor messages across kilometers"
  - "chirp-based wireless technology that enables battery-operated sensors to transmit data across cities"
summary: "A proprietary physical-layer wireless radio frequency modulation technique derived from Chirp Spread Spectrum (CSS) that enables long-range, low-power data communications across license-free sub-gigahertz bands."
confusable_notes:
  lora: "LoRa (IoT) is a physical-layer long-range wireless chirp spread spectrum radio modulation technology, whereas LoRA (AI) stands for Low-Rank Adaptation, a parameter-efficient fine-tuning method for machine learning models."
  lorawan: "LoRa refers strictly to the proprietary physical-layer chirp spread spectrum radio modulation, whereas LoRaWAN is the upper-layer open networking and media access protocol (MAC) that governs network routing and gateway communications."
follow_up_questions:
  - "How does Chirp Spread Spectrum (CSS) modulation allow LoRa receivers to decode signals below the ambient RF thermal noise floor?"
  - "What trade-offs exist between the LoRa Spreading Factor (SF7 to SF12), receiver sensitivity, data rate, and battery consumption?"
translation: native
---

## Easy explanation
Think of a person using a loud whistle whose pitch glides smoothly upward: even across a noisy, windy valley miles away, your ear can easily recognize that unique sweeping whistle sound above the chaotic background roar.

## Details
Patented by Semtech, LoRa (short for Long Range) is a physical radio modulation technology (Layer 1). It uses Chirp Spread Spectrum (CSS) modulation, encoding data into radio pulses whose frequency increases or decreases linearly over time (chirps). This frequency-sweeping technique provides high resilience against Doppler shifts, multipath reflections, and electromagnetic interference, allowing receivers to demodulate packets even when signal strength drops 20 decibels below the thermal noise floor. LoRa signals regularly span 5 to 15 kilometers in rural terrain while drawing only tens of milliamperes during transmission.

## Technical definition
A proprietary physical-layer radio frequency modulation technique based on Chirp Spread Spectrum (CSS) encoding, providing high processing gain, robust multipath immunity, and sub-noise-floor demodulation for low-power wide-area networks.

## Examples
A soil moisture sensor deployed in a rural vineyard uses LoRa modulation on the 915 MHz band to transmit a 20-byte telemetry packet to an antenna gateway located 8 kilometers away.
