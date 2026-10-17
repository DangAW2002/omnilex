---
label: Device provisioning
aliases: []
loanwords:
  - "device provisioning"
plain_descriptions:
  - process of enrolling configuring and registering a new hardware unit into a cloud service
  - initial automated onboarding workflow that assigns credentials and configurations to devices
summary: The automated onboarding process that authenticates, registers, and configures newly deployed hardware devices into a centralized cloud management platform.
confusable_notes: {}
follow_up_questions:
  - How do hardware secure elements and X.509 certificates achieve zero-touch device provisioning at factory scale?
  - How does an enrollment service route a connecting device to the nearest geographic cloud hub?
translation: native
---

## Easy explanation
Device provisioning is like onboarding a new employee on their first day at work: when an unconfigured sensor boots up initially in the field, it presents digital identification, receives its assigned operational parameters and security credentials, and gets registered automatically into the central database.

## Details
Provisioning eliminates the security risks and labor overhead of manually hardcoding unique credentials during assembly line production. When a device boots in the field, it connects to an enrollment endpoint (such as Microsoft Device Provisioning endpoints or AWS IoT Core Just-in-Time Provisioning). Using cryptographic proofs derived from a Trusted Platform Module (TPM), secure element, or factory-flashed X.509 certificate, the provisioning service authenticates the hardware, assigns it to a target application tenant, updates its initial device twin metadata, and delivers endpoint credentials.

## Technical definition
An automated administrative workflow that establishes cryptographic trust, assigns identity credentials, and applies operational configurations to connect new hardware to a fleet management network.

## Examples
A smart lighting gateway powering on for the first time in a new office tower, presenting its factory TPM certificate to an enrollment service, and receiving connection endpoints automatically.
