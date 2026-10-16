---
label: Service Level Agreement (SLA)
aliases:
  - SLA
loanwords: []
plain_descriptions:
  - >-
    a formal contract between a service provider and a customer promising a level of uptime with financial penalties if
    missed
  - the business agreement that specifies compensation if a service suffers excessive outages
summary: >-
  A formal commitment between a service provider and clients specifying agreed service performance thresholds and
  contractual penalties for non-compliance.
confusable_notes:
  slo: >-
    An SLA is a business agreement with external customers that incurs penalties when breached, whereas an SLO is a
    stricter internal goal used by engineers to prevent SLA breaches.
  sli: >-
    An SLA is a business contract with customers, whereas an SLI is the technical metric used to calculate whether the
    service meets the agreed terms.
follow_up_questions:
  - Why do engineering organizations deliberately set internal SLOs tighter than external SLAs?
  - What forms do SLA remedies typically take, such as service credits versus direct refunds?
translation: native
autolink:
  aliases:
    SLA: always
---

## Easy explanation
Think of a commercial lease agreement: the landlord guarantees the building will have running water and electricity, and if outages exceed 24 hours, the tenant receives a rent discount.

## Details
An SLA is a legal and business document rather than purely technical guidance. It outlines expected uptime, support response hours, and explicit consequences if commitments are not met—most commonly billing credits applied to the customer account. Engineering teams maintain stricter internal SLOs so they can react long before an SLA breach occurs.

## Technical definition
A legally binding or formal operational contract stipulating minimum service availability standards and associated financial or contractual remedies.

## Examples
A cloud hosting company promises 99.95% monthly uptime in its enterprise agreement; falling below 99.0% triggers a mandatory 25% credit on the customer monthly bill.
