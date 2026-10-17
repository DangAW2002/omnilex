---
label: "Secure boot"
aliases: []
loanwords:
  - "secure boot"
plain_descriptions:
  - "security check that ensures a computer or chip only boots trusted, authorized software"
  - "cryptographic startup process that stops malicious firmware from running on a device"
summary: "A security standard ensuring that an electronic device boots using only firmware and software that is verified and cryptographically signed by trusted manufacturers."
confusable_notes: {}
follow_up_questions:
  - "How does an immutable hardware Root of Trust (RoT) anchored in One-Time Programmable (OTP) eFuses establish a cryptographic chain of trust?"
  - "What rollback prevention mechanisms ensure an attacker cannot re-flash an older, vulnerable bootloader version?"
translation: native
---

## Easy explanation
Think of a strict security guard at a building entrance checking official stamped badges: if a visitor arrives with a forged or expired pass, the guard firmly shuts the door and refuses to let them take a single step inside.

## Details
Secure Boot establishes a hardware-anchored Chain of Trust during system power-on. The process begins inside a read-only Mask ROM or hardware Root of Trust (RoT) that cannot be modified. Before executing the initial bootloader stage, the ROM reads the public key burned into hardware fuses and verifies the cryptographic digital signature (e.g., RSA or ECDSA) of the firmware image stored in flash. If the signature is valid and untampered, execution proceeds; otherwise, the device halts. Each validated software stage subsequently verifies the next stage before handing over execution control.

## Technical definition
A cryptographic boot verification mechanism rooted in immutable hardware that ensures only cryptographically signed, authenticated, and untampered code images execute across the boot sequence.

## Examples
An electric utility smart meter verifies the SHA-256 hash and digital signature of its new OTA firmware update against public keys locked in hardware fuses, aborting the flash rewrite if the signature fails.
