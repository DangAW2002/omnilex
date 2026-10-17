---
label: Mesh network
aliases: []
loanwords:
  - "mesh network"
plain_descriptions:
  - network topology where nodes interconnect directly to dynamically relay data for each other
  - decentralized layout where each participant acts as a forwarding router without a single failure point
summary: A decentralized network topology where interconnected nodes collaborate to dynamically relay data across multiple hops without relying on a single central hub.
confusable_notes: {}
follow_up_questions:
  - How does a self-healing routing protocol recompute paths when an intermediate mesh node unexpectedly fails?
  - Why does protocol packet overhead scale significantly as node density expands in large wireless meshes?
translation: native
---

## Easy explanation
A mesh network is like a bucket brigade: instead of every person running individually back to the lake to fetch water, people stand in a line and pass buckets from hand to hand, automatically shifting position if one person steps out.

## Details
In a mesh architecture, participating nodes possess routing capabilities, allowing packets to traverse multiple wireless hops to reach a destination or root gateway. Standardized implementations include IETF RPL (RFC 6550) for IPv6 constrained networks, Bluetooth Mesh, Thread (based on 6LoWPAN), and Zigbee. Mesh topologies provide high resilience and expanded radio range without high-power antennas. However, multi-hop packet routing introduces cumulative transmission latency and consumes battery power on nodes designated as active routing relays.

## Technical definition
A network topology without a central hub, in which each node links to several neighbours and forwards traffic for them, so data can take multi-hop paths and reroute when a node fails.

## Examples
A networked municipal street lighting deployment where each connected lamp fixture routes diagnostic telemetry across neighboring lamps back to a central pole gateway.
