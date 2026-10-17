---
label: Digital signature
aliases:
  - cryptographic signature
loanwords: []
plain_descriptions:
  - a mathematical stamp that proves who created a file and ensures it was not altered
  - an electronic seal providing proof of authorship and data integrity
summary: A mathematical scheme that binds an identity to digital data using asymmetric cryptography, providing authentication, data integrity, and non-repudiation.
confusable_notes: {}
follow_up_questions:
  - Why does a digital signature hash the document before applying the private key?
  - How does a digital signature provide non-repudiation in legal and regulatory contexts?
translation: native
---

## Easy explanation
Think of a royal wax seal pressed onto a royal proclamation: only the king possesses the unique signet ring to stamp the crest into the wax, and anyone who reads the scroll can verify the seal remains unbroken and genuine.

## Details
To create a digital signature, the sender computes a cryptographic hash of the document and encrypts that hash value using their private key. The resulting digital signature is attached to the payload. Upon receiving the message, the recipient decrypts the signature using the sender's public key to recover the original hash, while independently recalculating the hash of the received document. If the two hash digests match exactly, the recipient gains mathematical certainty that the message originated from the private key holder and suffered zero alterations during transit.

## Technical definition
An asymmetric cryptographic transformation of data that provides a recipient with proof of the origin, authenticity, and integrity of the data while offering non-repudiation by the signer.

## Examples
A software vendor signs an operating system kernel update with their private signing key so devices only install firmware that matches the vendor's verified public key.
