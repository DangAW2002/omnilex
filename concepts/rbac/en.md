---
label: Role-based access control (RBAC)
aliases:
  - RBAC
loanwords: []
autolink:
  aliases:
    RBAC: always
plain_descriptions:
  - assigning system permissions to job roles instead of individual people
  - managing user access through predefined groups of privileges
summary: An access control model where permissions are grouped into roles and assigned to users based on their organizational responsibilities.
confusable_notes: {}
follow_up_questions:
  - How does role explosion occur in large organizations and how can it be mitigated?
  - When should an engineering team transition from RBAC to attribute-based access control (ABAC)?
translation: native
---

## Easy explanation
Think of a hospital staff roster: rather than creating a separate list of room keys and medical file permissions for every new nurse or doctor hired, the hospital defines a "Nurse" profile and a "Doctor" profile; each new employee immediately receives the permissions tied to their role.

## Details
In role-based access control, administrators bind operations on specific resources to abstract roles rather than directly to user accounts. Users become members of one or more roles. When an employee changes teams or leaves the organization, administrators simply modify role memberships instead of editing hundreds of individual permission rules across multiple systems. RBAC simplifies auditing, enforces consistency, and forms the bedrock of enterprise identity management.

## Technical definition
An access policy framework in which system permissions are authorized based on user membership in specific functional roles rather than individual subject identity.

## Examples
A cloud database grants read and write access to the "Backend-Engineer" role, while assigning only read-only query capabilities to the "Data-Analyst" role.
