---
label: End-to-end encryption (E2EE)
aliases:
  - E2EE
loanwords: []
autolink:
  aliases:
    E2EE: always
plain_descriptions:
  - encrypting messages so only the sender and receiver can read them, locking out servers in between
  - private communication where even the messaging company cannot see the plaintext
summary: A secure communication system where data is encrypted on the sender's device and decrypted only by the intended recipient, preventing intermediate parties from accessing the content.
confusable_notes: {}
follow_up_questions:
  - How do protocols like the Double Ratchet Protocol achieve forward secrecy in messaging apps?
  - What metadata remains exposed to service providers even when payload contents are protected by E2EE?
translation: native
---

## Easy explanation
Think of putting a letter inside a locked steel strongbox before handing it to a courier: you give the key directly to your friend in advance, so the delivery driver and warehouse staff only see the heavy locked box and cannot inspect the message inside.

## Details
In end-to-end encryption (E2EE), cryptographic keys are generated and stored exclusively on client endpoints. When Alice sends a message to Bob, Alice's device encrypts the payload using Bob's public key (or a session key derived via an asymmetric handshake). The intermediate routing servers, telecommunication carriers, and cloud providers forward the ciphertext without possessing the corresponding private keys required for decryption. Modern E2EE protocols (such as Signal Protocol) incorporate ephemeral key exchange to guarantee both forward secrecy (compromised future keys cannot decrypt past sessions) and break-in recovery.

## Technical definition
A communications security architecture in which payload data remains encrypted throughout its entire path between communicating endpoints, ensuring confidentiality against intermediate nodes, service providers, and network operators.

## Examples
A chat application uses E2EE to protect voice calls and texts, ensuring that even if law enforcement subpoenas the app server logs, no readable conversations can be retrieved.
