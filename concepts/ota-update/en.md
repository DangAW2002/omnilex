---
label: Over-the-air update (OTA)
aliases:
  - "OTA"
loanwords:
  - "over-the-air update"
autolink:
  aliases:
    OTA: always
plain_descriptions:
  - remote wireless delivery of firmware and software updates to connected hardware fleets
  - process of patching device software over network connections without physical physical contact
summary: The remote wireless distribution and installation of new software or firmware updates to connected hardware without physical tethering.
confusable_notes: {}
follow_up_questions:
  - How does dual-bank (A/B) flash partitioning safeguard an embedded microcontroller against bricking during power interruptions?
  - How are asymmetric digital signatures verified on an edge node before committing a downloaded firmware payload?
translation: native
---

## Easy explanation
An OTA update is like an overnight software upgrade for your smart devices: just as your smartphone updates its operating system while charging without you plugging in a computer cable, remote connected sensors and smart appliances download bug fixes silently through the air.

## Details
OTA systems distribute signed binary update payloads over wide-area wireless connections. Safe embedded OTA implementations rely on dual-bank flash memory architectures (A/B partitioning). The active firmware executes from partition A while the new image writes into partition B. After download, the bootloader validates the binary integrity and cryptographic signature, switches the boot flag, and performs a test boot; if system health checks fail, the bootloader automatically rolls back to partition A to prevent catastrophic field bricking.

## Technical definition
The delivery and installation of software or firmware packages to networked devices across wireless cellular, Wi-Fi, or satellite links without physical equipment interaction.

## Examples
An automotive manufacturer pushing an over-the-air firmware update overnight to recalibrate battery management algorithms across an entire fleet of electric vehicles.
