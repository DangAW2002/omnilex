---
label: Canary release
aliases:
  - Canary deployment
loanwords: []
plain_descriptions:
  - testing a new software version on a tiny percentage of real users before releasing it to everyone
  - a gradual rollout technique that exposes early bugs safely without risking the entire user base
summary: >-
  A deployment technique that exposes a new software release to a small fraction of production traffic to validate
  behavior before broader rollout.
confusable_notes:
  blue-green-deployment: >-
    A canary release introduces the new version incrementally to a small slice of live users to monitor errors, whereas
    blue-green deployment provisions a full duplicate environment and switches 100% of traffic simultaneously.
follow_up_questions:
  - How do automated observability metrics decide whether to promote or abort a canary release?
  - What routing mechanisms direct internal staff or beta testers to canary instances?
translation: native
---

## Easy explanation
Like coal miners carrying a canary into a mine shaft: if the sensitive bird detected dangerous gases early, the miners evacuated safely before anyone was harmed.

## Details
A canary deployment directs a tiny portion of user requests (such as 2% or 5%) to a fleet subset running the updated code. Telemetry systems closely observe error logs, latency spikes, and resource saturation against the baseline version. If all metrics remain healthy, traffic routing increases incrementally until 100% of workloads run on the new version.

## Technical definition
A progressive traffic-splitting deployment pattern that routes a controlled percentage of live inbound requests to an experimental release cohort.

## Examples
A video streaming service directs 1% of live connections to a newly compiled player version for twenty minutes, confirming no playback crashes before ramping up.
