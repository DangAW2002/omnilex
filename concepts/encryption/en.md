---
label: Encryption
aliases:
  - data encryption
loanwords: []
plain_descriptions:
  - scrambling secret information into unreadable code that only someone with the correct key can unlock
  - locking confidential data with a digital key so eavesdroppers see only scrambled nonsense
summary: The cryptographic process of encoding plaintext into ciphertext so that only authorized parties with the matching decryption key can read it.
confusable_notes:
  hashing: Encryption is a reversible transformation that preserves the original data for authorized keyholders, whereas hashing produces an irreversible fixed-length digest.
follow_up_questions:
  - What computational differences exist between symmetric ciphers like AES and asymmetric ciphers like RSA?
  - How does envelope encryption protect large data blobs using data encryption keys and key encryption keys?
translation: native
---

## Easy explanation
Like placing a private letter inside a locked steel strongbox: only someone possessing the matching physical key can unlock the box and read the message inside.

## Details
Encryption operates in two primary modes: symmetric encryption (like AES), where sender and recipient share the identical secret key, and asymmetric encryption (like RSA), which uses a public key for encryption and a private key for decryption.

## Technical definition
The reversible algorithmic transformation of readable data (plaintext) into an unintelligible format (ciphertext) using cryptographic keys to preserve data confidentiality.

## Examples
Encrypting customer credit card numbers on disk using AES-256 so stolen database backups cannot be deciphered.
