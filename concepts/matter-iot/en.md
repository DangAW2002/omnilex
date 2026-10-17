---
label: "Matter"
qualifier: "(IoT)"
aliases:
  - "Matter standard"
loanwords:
  - "matter"
autolink:
  label: never
plain_descriptions:
  - "unified smart home standard that lets Apple, Google, and Amazon devices work seamlessly together"
  - "universal language for smart lights, locks, and plugs across different smart home ecosystems"
summary: "An open-source, interoperable smart home connectivity standard operating over IP that allows certified devices to communicate seamlessly across Apple Home, Google Home, and Amazon Alexa ecosystems."
confusable_notes:
  thread-iot: "Matter is an application-layer interoperability specification (Layer 7), whereas Thread is a low-power wireless mesh network transport standard (Layer 3) that Matter uses for constrained battery devices."
follow_up_questions:
  - "How does Matter Multi-Admin capability enable a single smart plug to be controlled simultaneously from Apple Home and Google Home without vendor cloud bridges?"
  - "What role does the distributed compliance ledger (DCL) play in cryptographically verifying Matter device credentials during commissioning?"
translation: native
---

## Easy explanation
Think of a universal translator badge for smart home gadgets: previously, an Apple light bulb refused to talk to a Google speaker, but Matter gives them all a single shared language so everything works out of the box regardless of brand.

## Details
Developed by the Connectivity Standards Alliance (CSA) in collaboration with Apple, Google, Amazon, and Samsung, Matter operates as a unified application layer built entirely on Internet Protocol (IP). Certified Matter accessories communicate locally over standard home Wi-Fi, Ethernet, or Thread mesh networks without needing proprietary cloud servers. Security is foundational: every device possesses a cryptographic Device Attestation Certificate (DAC) verified during Bluetooth LE commissioning, and all payload data is encrypted end-to-end. Through its Multi-Admin feature, users can pair and control a device from multiple voice assistant apps simultaneously.

## Technical definition
An open-source, IP-based application-layer smart home interoperability standard defined by the Connectivity Standards Alliance, providing local device discovery, device-attestation security, and shared data schemas across Wi-Fi, Ethernet, and Thread networks.

## Examples
A homeowner scans a QR code to commission a Matter-certified smart power plug, instantly controlling it from an iPhone via Apple Home while family members control it through an Amazon Alexa smart speaker.
