---
label: Certificate
qualifier: (TLS)
aliases:
  - SSL certificate
  - X.509 certificate
loanwords: []
autolink:
  label: never
  aliases:
    SSL certificate: auto
    X.509 certificate: auto
plain_descriptions:
  - a digital identity document that proves a website owns its public key and domain name
  - the security credential that enables the padlock icon and HTTPS encryption in browsers
summary: A digitally signed data file conforming to X.509 standards that binds a public key to an entity's domain name or identity.
confusable_notes: {}
follow_up_questions:
  - How does certificate transparency help detect rogue certificates issued by compromised authorities?
  - What occurs during the automated ACME protocol renewal process in services like Let's Encrypt?
translation: native
---

## Easy explanation
Think of a government-issued business permit hanging on a shop wall: it features the official city seal confirming the store's legal name, address, and license, reassuring visiting customers that the business is legitimate and not an impostor.

## Details
A TLS certificate follows the ITU-T X.509 standard. It encapsulates the subject's domain name (Common Name and Subject Alternative Names), the organization's details, the subject's public key, valid date ranges, cryptographic algorithms, and the digital signature of the issuing Certificate Authority (CA). When a web browser connects to an HTTPS server, it inspects this certificate, validates the chain of trust back to a pre-installed root certificate, and confirms that the domain name matches before establishing an encrypted session.

## Technical definition
A cryptographically signed data object conforming to the X.509 standard that definitively associates a public key with a specific subject identifier or domain name.

## Examples
A banking web server serves an X.509 TLS certificate to client browsers, proving its ownership of `bank.example.com` and providing the public key required to encrypt the TLS handshake.
