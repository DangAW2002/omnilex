---
label: "Fog computing"
aliases:
  - "Fogging"
  - "Fog networking"
loanwords:
  - "fog computing"
plain_descriptions:
  - "decentralized computing structure placing compute and storage resources between edge devices and the cloud"
  - "intermediate architecture that filters and analyzes telemetry on local gateways before uploading to remote servers"
summary: "A decentralized computing architecture that distributes computation, storage, and networking services across the continuum between edge endpoints and centralized cloud datacenters."
confusable_notes:
  edge-computing: "Edge computing focuses directly on computations executed on endpoints or immediate local gateways, whereas fog computing emphasizes an organized, multi-layered hierarchical network fabric bridging local nodes to the cloud."
  edge-ai: "Fog computing is a comprehensive multi-tier networking and compute architecture handling general workloads, whereas Edge AI focuses specifically on hosting and executing machine learning models directly on localized hardware for inference."
follow_up_questions:
  - "How does fog computing reduce wide-area network bandwidth costs in multi-site industrial manufacturing?"
  - "What governance policies determine whether an analytical workload executes at the fog gateway versus central cloud warehouses?"
translation: native
---

## Easy explanation
If cloud computing is like a distant central weather laboratory analyzing global storms, fog computing is like neighborhood weather monitoring stations placed down at ground level to issue instant hail warnings before the central lab even gets the data.

## Details
Defined by NIST in SP 500-325, fog computing extends cloud virtualization and orchestration capabilities closer to the operational edge. Fog nodes encompass industrial personal computers, programmable automation controllers, and regional micro-datacenters situated on factory floors, electrical substations, or cellular base stations. These intermediary nodes perform data validation, deduplication, protocol transformation, and real-time inference, transmitting only aggregated anomalies or model summaries to distant cloud datacenters across WAN links.

## Technical definition
A horizontal, system-level architecture that distributes computation, storage, control, and networking services along the continuum between cloud repositories and edge endpoints.

## Examples
An oil refinery runs fog computing nodes inside local control rooms to process vibration signals from five thousand pump bearings, alerting technicians within milliseconds while transmitting hourly health summaries to the corporate cloud.
