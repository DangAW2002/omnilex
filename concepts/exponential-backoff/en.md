---
label: Exponential backoff
aliases:
  - Exponential retry
loanwords: []
plain_descriptions:
  - waiting progressively longer between retries when an operation fails
  - retry strategy that doubles the sleep interval after each successive error
summary: An algorithm that progressively multiplies the delay interval between successive retries to prevent overwhelming struggling network services.
confusable_notes: {}
follow_up_questions:
  - Why is adding randomized jitter essential to prevent the thundering herd problem?
  - How do client SDKs balance maximum retry delays against user-perceived timeouts?
translation: native
---

## Easy explanation
When knocking on a locked office door and getting no answer, knocking again every single second only irritates the occupant; waiting 2 seconds, then 4 seconds, then 8 seconds gives them time to finish their task.

## Details
When distributed services fail due to transient blips or high CPU load, retrying immediately with tight loops multiplies traffic, guaranteeing that the target server remains overloaded. Exponential backoff increases the sleep duration before attempt n using the formula T(n) = B * 2^(n-1). Production implementations inject full jitter (randomizing the sleep between 0 and T(n)) to spread out simultaneous client retry bursts across a wide time window.

## Technical definition
A rate-shaping error-recovery algorithm that increases retry delays exponentially as consecutive failure counts escalate, mitigating congestion collapse.

## Examples
An IoT fleet retrying a failed telemetry upload after 100 milliseconds, then 200 milliseconds, 400 milliseconds, and 800 milliseconds, bounded by a maximum ceiling of 30 seconds.
