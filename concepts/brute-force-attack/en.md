---
label: Brute-force attack
aliases:
  - exhaustive key search
loanwords: []
plain_descriptions:
  - systematically guessing every possible password until the correct one works
  - cracking a lock by trying every combination one by one at high speed
summary: An attack method that systematically checks all possible passwords, keys, or hashes until the correct combination is discovered.
confusable_notes: {}
follow_up_questions:
  - How does credential stuffing differ from a classic dictionary or brute-force attack?
  - What defenses prevent distributed brute-force attacks against cloud authentication endpoints?
translation: native
---

## Easy explanation
Imagine standing in front of a 4-digit bicycle combination lock and methodically dialing every single number from 0000 to 9999 until the lock snaps open.

## Details
Brute-force attacks rely on computational power rather than clever exploit code. Attackers use automated tools (such as Hydra or Hashcat) to test thousands or millions of credential permutations per second against authentication forms or offline password hashes. Variants include dictionary attacks (testing wordlists of common passwords), password spraying (trying a single common password across thousands of accounts to bypass lockout policies), and reverse brute forcing. Effective defenses include progressive account lockouts, CAPTCHAs, adaptive rate limiting, and mandatory multi-factor authentication.

## Technical definition
A trial-and-error cryptographic or authentication attack in which automated scripts systematically generate and evaluate every candidate credential in the search space.

## Examples
An automated script submits 500 password attempts per minute against an exposed SSH port, trying common variations of dictionary terms until it successfully matches the root password.
