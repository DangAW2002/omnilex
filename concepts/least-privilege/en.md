---
label: Principle of least privilege
aliases:
  - least privilege
  - PoLP
loanwords: []
plain_descriptions:
  - giving users and apps only the exact minimum permissions required to perform their daily job
  - the security rule that people should never have admin access unless strictly necessary
summary: A core cybersecurity principle dictating that users, accounts, and processes are granted only the minimum permissions necessary to perform their assigned functions.
confusable_notes: {}
follow_up_questions:
  - How does just-in-time access provisioning help maintain least privilege for cloud infrastructure engineers?
  - What automated auditing strategies identify dormant privileges and permission creep across enterprise roles?
translation: native
---

## Easy explanation
Giving a hotel housekeeper a room keycard that opens guest bedrooms on the 3rd floor, rather than giving them a master key that also opens the hotel manager's safe.

## Details
Enforcing least privilege limits the blast radius of compromises. If an employee account or application service credential is compromised, attackers cannot move laterally across unrelated databases, change infrastructure settings, or access restricted financial records.

## Technical definition
A foundational security design concept requiring that each system entity be allocated only the minimum set of rights and privileges essential to execute its authorized responsibilities.

## Examples
Granting a customer support dashboard read-only access to customer shipping addresses without giving it permission to view credit card numbers or delete accounts.
