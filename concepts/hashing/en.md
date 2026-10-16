---
label: Hashing
qualifier: (Cryptography)
aliases:
  - cryptographic hashing
  - hash function
loanwords: []
plain_descriptions:
  - turning any piece of text into a unique fixed-length fingerprint that cannot be reversed
  - a one-way mathematical transformation commonly used to store passwords safely
summary: A cryptographic process that transforms arbitrary input data into a fixed-length string of characters using an irreversible one-way mathematical algorithm.
confusable_notes:
  encryption: Hashing is a one-way mathematical function that cannot be reversed, whereas encryption is a two-way process designed to be decrypted using a key.
follow_up_questions:
  - How does cryptographic salt prevent precomputed rainbow table attacks against stored password hashes?
  - Why are key derivation functions like Argon2 and bcrypt intentionally designed to be computationally slow?
translation: native
---

## Easy explanation
Like grinding fresh beef into a hamburger patty: you can easily turn beef into minced meat, but no one on earth can reconstruct the original steak from the cooked patty.

## Details
Cryptographic hash functions (like SHA-256 or bcrypt) satisfy three core properties: deterministic output for identical input, pre-image resistance (impossible to deduce the input from the hash), and collision resistance (nearly impossible for two distinct inputs to produce the same digest).

## Technical definition
An irreversible, deterministic mathematical algorithm mapping arbitrary-size bit sequences into fixed-size digest values while maintaining collision resistance and one-way characteristics.

## Examples
Storing user passwords as salted bcrypt hashes in a database so administrators and hackers cannot read the plaintext passwords.
