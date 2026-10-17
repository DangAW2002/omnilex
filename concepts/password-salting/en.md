---
label: Salt
qualifier: (Cryptography)
aliases:
  - cryptographic salt
loanwords: []
autolink:
  label: never
plain_descriptions:
  - random data added to a password before hashing to protect against lookup attacks
  - an extra secret ingredient mixed into stored passwords so identical passwords produce different hashes
summary: A non-secret random string appended to a plaintext password before hashing to ensure unique hash values and thwart precomputed table attacks.
confusable_notes: {}
follow_up_questions:
  - Why does salting prevent rainbow table attacks while failing to stop targeted brute-force guessing?
  - What is the difference between a cryptographic salt and an initialization vector (IV)?
translation: native
---

## Easy explanation
Imagine two people buying the exact same brand-new padlock: if each owner paints their lock with a completely unique random splash of color, a thief cannot use a single universal blueprint to pick both locks at the same time.

## Details
When a user sets a password, a secure randomness source produces a unique salt value (typically 16 bytes or longer). The authentication system concatenates this salt with the user's password before running a key derivation function such as Argon2id, bcrypt, or PBKDF2. Both the resulting hash and the salt are stored together in the user database. Because the salt is unique for every account, two users with identical passwords will never share the same stored hash, defeating precomputed rainbow tables and mass parallel dictionary attacks.

## Technical definition
A random or pseudorandom string of bits combined with a secret passphrase prior to cryptographic hashing or key derivation to prevent dictionary and rainbow table lookups.

## Examples
An authentication service generates a unique 128-bit random salt for each new account, appending it to the user's chosen password before computing an Argon2id hash.
