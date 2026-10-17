---
label: Edge computing
aliases: []
loanwords:
  - "edge computing"
plain_descriptions:
  - computing paradigm that analyzes and processes information near the data source location
  - decentralized framework running analytics directly on local hardware instead of remote servers
summary: A distributed computing paradigm that brings computational logic and data storage closer to the physical devices and sensors where information is generated.
confusable_notes: {}
follow_up_questions:
  - How does edge computing eliminate round-trip network latency for real-time robotic vision systems?
  - How do containerized deployment platforms (such as Azure IoT Edge or K3s) synchronize machine learning models to the edge?
translation: native
---

## Easy explanation
Instead of mailing every security camera video frame all the way to a faraway server across the world just to check for an open door, edge computing runs the smart computer vision chip right inside the camera box itself for instant local answers.

## Details
Edge computing counters the latency, bandwidth consumption, and availability constraints of pure centralized cloud computing. By placing processing nodes (smart cameras, micro-edge gateways, on-premise industrial IPCs) on the local network periphery, telemetry is filtered and evaluated at microsecond latencies. Architectures often deploy containerized microservices (using lightweight Docker engines or Kubernetes variants) managed remotely from the cloud, achieving local autonomy during network partitions while maintaining centralized management.

## Technical definition
A distributed information technology architecture in which client data is processed at the periphery of the network, as close to the originating physical data source as possible.

## Examples
An on-premise edge server analyzing video frames from production assembly cameras in real time to trigger immediate mechanical ejection of defective semiconductor chips.
