---
label: Authentication
aliases:
  - AuthN
loanwords: []
autolink:
  aliases:
    AuthN: always
plain_descriptions:
  - verifying that a user or service matches their stated digital identity
  - checking user credentials such as passwords or biometrics to prove identity
summary: The security process of verifying the claimed identity of a user, device, or system.
confusable_notes:
  authorization: Authentication verifies who the user or service is; authorization determines what actions or resources they are permitted to access.
follow_up_questions:
  - What are the three primary authentication factors used in access security?
  - How do passwordless protocols like FIDO2 reduce credential harvesting risks?
translation: native
---

## Easy explanation
Imagine showing your passport at border control: the officer checks your photograph, biometric chip, and official seals to confirm you are indeed the traveler named in the document before letting you through.

## Details
Authentication validates credentials presented by an entity against stored reference data. Common authentication factors include knowledge factors (passwords, PINs), possession factors (smartcards, security keys, authenticator apps), and inherence factors (fingerprints, facial geometry). Robust implementations combine multiple independent factors, apply cryptographic challenges rather than transmitting static secrets in plain text, and issue time-bounded session tokens upon successful verification.

## Technical definition
The provision of assurance that a claimed characteristic or identity of an entity is correct through cryptographic or credential verification mechanisms.

## Examples
A developer signs in to a corporate code repository using an SSH key pair and an authenticator app prompt, confirming their identity before push access is granted.
