---
label: Public-key cryptography
aliases:
  - asymmetric cryptography
loanwords: []
plain_descriptions:
  - encryption using a pair of keys where anyone can encrypt but only the private key holder can decrypt
  - a two-key security system enabling confidential messaging and digital signatures across open networks
summary: A cryptographic system that uses mathematically linked key pairs—a public key for encryption or verification and a private key for decryption or signing.
confusable_notes: {}
follow_up_questions:
  - Why is asymmetric encryption computationally slower than symmetric encryption like AES?
  - How do hybrid cryptosystems combine the strengths of both public-key and symmetric algorithms?
translation: native
---

## Easy explanation
Think of a mailbox with a drop slot: anyone passing by can drop a sealed envelope through the slit, but only the mail carrier holding the private metal key can unlock the door and retrieve the mail.

## Details
Public-key cryptography solves the fundamental problem of key distribution across unsecured channels. Instead of requiring both parties to share a single secret key beforehand, each party generates an asymmetric key pair. The public key is distributed openly to the world, while the private key is guarded securely. Messages encrypted with the public key can only be decrypted by the corresponding private key. In reverse, data signed with the private key can be authenticated by anyone holding the public key, establishing digital identity and non-repudiation. Modern implementations rely on mathematical problems such as prime factorization (RSA) or elliptic curves (ECDSA, Ed25519).

## Technical definition
A cryptographic paradigm utilizing asymmetric mathematical algorithms based on one-way trapdoor functions, wherein operations performed with a public key can only be inverted or validated using a corresponding secret private key.

## Examples
When establishing an encrypted SSH connection, a client encrypts an ephemeral handshake message with the server's public key, verifying that only the authentic server possessing the private key can establish the session.
