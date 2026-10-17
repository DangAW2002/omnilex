---
label: Certificate authority (CA)
aliases:
  - CA
  - certification authority
loanwords: []
autolink:
  aliases:
    CA: always
plain_descriptions:
  - a trusted organization that issues digital certificates to verify website and entity identities
  - the digital passport agency of the internet that signs certificates
summary: A trusted third-party organization that validates the identity of entities and issues cryptographically signed digital certificates.
confusable_notes: {}
follow_up_questions:
  - How do root certificate authorities establish trust across major operating systems and browsers?
  - What security procedures govern private key management inside Hardware Security Modules (HSMs) at a CA?
translation: native
---

## Easy explanation
Think of a national passport agency: you submit your birth certificate and application documents, the government agency verifies your records, and then issues an official passport stamped with its seal that foreign airports and banks trust unconditionally.

## Details
A Certificate Authority (CA) forms the backbone of Public Key Infrastructure (PKI). Entities seeking a certificate generate a key pair and submit a Certificate Signing Request (CSR) to the CA. The CA verifies that the applicant controls the specified domain or represents the claimed legal entity. Once validation succeeds, the CA signs the certificate using its own private key. Operating systems and web browsers maintain pre-trusted root certificate stores; when a client encounters a certificate signed by a trusted CA, the browser accepts the server's identity automatically.

## Technical definition
A trusted entity in a public-key infrastructure responsible for verifying subject identities and issuing digitally signed public-key certificates.

## Examples
An internet infrastructure team requests a wildcard TLS certificate from Let's Encrypt, which validates DNS control records before issuing a signed digital certificate for `*.example.com`.
