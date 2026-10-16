---
label: Multi-factor authentication (MFA)
aliases:
  - MFA
  - 2FA
  - two-factor authentication
loanwords: []
autolink:
  aliases:
    MFA: always
    2FA: always
plain_descriptions:
  - logging in with two different proofs such as your password plus a code sent to your phone
  - a security checkpoint requiring a password and a fingerprint before opening an account
summary: An authentication security method requiring users to supply two or more distinct evidence factors before granting access to a digital system.
confusable_notes: {}
follow_up_questions:
  - Why are SMS verification codes vulnerable to SIM-swapping attacks compared to FIDO2 security keys?
  - How does risk-based adaptive MFA prompt for additional factors only when anomalies are detected?
translation: native
---

## Easy explanation
Like an ATM transaction where having your plastic card is not enough; you must also type in your secret four-digit PIN to withdraw money.

## Details
MFA combines at least two distinct authentication categories: knowledge factors (something you know, like a password), possession factors (something you have, like a phone authenticator app or hardware security key), and inherence factors (something you are, like biometric facial recognition).

## Technical definition
A security verification mechanism that validates a digital identity using two or more independent credential categories to guard against compromised single credentials.

## Examples
Entering your bank password on a laptop and then approving a biometric prompt on your registered mobile phone.
