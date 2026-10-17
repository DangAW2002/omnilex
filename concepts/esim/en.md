---
label: "eSIM"
aliases:
  - "eUICC"
  - "Embedded SIM"
loanwords:
  - "esim"
plain_descriptions:
  - "programmable microchip soldered inside devices replacing physical removable telecom cards"
  - "embedded secure hardware module enabling remote carrier subscription provisioning"
summary: "A tamper-resistant integrated secure element soldered onto circuit boards that allows remote over-the-air provisioning of mobile carrier profiles without physical card swaps."
confusable_notes:
  device-provisioning: "eSIM specifically manages mobile network operator credentials and cryptographically authenticated cellular subscriptions, whereas device provisioning configures the full software identities, application certificates, and cloud endpoints of an IoT unit."
follow_up_questions:
  - "How does Remote SIM Provisioning (RSP) authenticate subscription profile installation between carrier servers and embedded hardware?"
  - "What physical vibration and thermal benefits does a soldered MFF2 form factor offer compared to a removable plastic nano-SIM?"
translation: native
---

## Easy explanation
Instead of opening a slot with an ejection pin to swap small plastic chips when changing phone providers, the phone houses an unremovable microchip that downloads a new carrier profile over the air in seconds.

## Details
Defined by the GSMA under the embedded Universal Integrated Circuit Card (eUICC) technical architecture, an eSIM consists of a secure microcontroller packaged in microscopic form factors such as MFF2 surface-mount packages. It provides isolated cryptographic memory executing a secure operating system. Through standardized Remote SIM Provisioning (RSP) architectures, device operators can trigger Subscription Manager Data Preparation (SM-DP+) and Discovery Server workflows to download, install, enable, switch, or delete network operator credentials over cellular airwaves.

## Technical definition
A tamper-resistant hardware secure element embedded permanently onto an electronic circuit board, compliant with eUICC specifications for remote cryptographic profile provisioning.

## Examples
An electric motorcycle manufacturer solders eSIM chips directly into the digital dashboard motherboards of ten thousand scooters, remotely assigning local carrier data plans as vehicles are delivered to different international distributors.
