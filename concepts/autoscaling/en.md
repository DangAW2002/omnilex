---
label: Autoscaling
aliases:
  - Auto-scaling
  - Dynamic scaling
  - Horizontal Pod Autoscaler
loanwords: []
plain_descriptions:
  - automatically adding more servers when traffic spikes and removing them when things quiet down to save money
  - the system capability that expands or shrinks computing power based on real-time demand
summary: >-
  A cloud mechanism that automatically adjusts the number of active computing resources up or down based on real-time
  demand metrics.
confusable_notes: {}
follow_up_questions:
  - How do cooldown periods prevent rapid thrashing between scaling up and scaling down?
  - What is the architectural difference between horizontal scaling (scaling out) and vertical scaling (scaling up)?
translation: native
---

## Easy explanation
Like a highway toll plaza: when rush hour arrives and lines grow long, the station opens additional toll booths automatically, closing them down when evening traffic thins out.

## Details
Autoscaling monitors health metrics such as average CPU utilization, memory pressure, or incoming request rates. When thresholds are breached, the scaling controller launches additional instances or pods and registers them with the load balancer. Once traffic drops, it gracefully drains connections and terminates excess nodes to minimize cloud costs.

## Technical definition
A feedback-driven control loop that dynamically adjusts workload instance capacity in response to observed telemetry metrics against defined threshold policies.

## Examples
An online ticketing cluster configured to maintain 5 server instances at baseline, expanding automatically to 35 instances when concert tickets go on sale.
