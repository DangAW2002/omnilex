---
label: "Machine-to-machine (M2M)"
aliases:
  - "M2M"
loanwords:
  - "m2m"
autolink:
  aliases:
    M2M: always
plain_descriptions:
  - "direct automated communication between devices without requiring human interaction"
  - "automated point-to-point data exchange connecting remote equipment to central management software"
summary: "Direct point-to-point or networked communication between automated devices without manual human intervention."
confusable_notes:
  iiot: "M2M traditionally focuses on isolated, point-to-point telemetry channels connecting single machines to proprietary backends, whereas IIoT integrates diverse industrial assets across enterprise analytics, cloud systems, and open data platforms."
follow_up_questions:
  - "How does modern IoT architecture expand upon early point-to-point M2M telemetry pipelines?"
  - "What data formatting protocols enable automated peer-to-peer telemetry parsing in M2M setups?"
translation: native
---

## Easy explanation
Like an automated vending machine sensing a low beverage rack and quietly transmitting a replenishment order to the distributor's dispatch server without cashier intervention.

## Details
M2M refers to technologies enabling devices to collect internal telemetry and send it directly to remote applications or peer hardware over cellular, wired, or satellite channels. Early M2M systems relied primarily on point-to-point connections, cellular SMS, or direct serial modems coupled to dedicated client software. Modern deployments leverage internet protocols, automated message brokers, and standardized device management suites to process transactions, report mechanical failures, and trigger automated downstream actions with complete operational independence from human operators.

## Technical definition
Automated, bidirectional telecommunication frameworks facilitating programmatic information exchange between machines and backend computation platforms without manual intervention.

## Examples
An automated teller machine (ATM) network uses encrypted M2M cellular channels to broadcast cash vault levels and mechanical transport status to the central bank operations center every five minutes.
