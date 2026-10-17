---
label: Site reliability engineering (SRE)
aliases:
  - SRE
loanwords:
  - site reliability engineering
  - sre
autolink:
  aliases:
    SRE: always
plain_descriptions:
  - applying software engineering practices to solve IT operations, scaling, and system reliability challenges
  - discipline where developers write code and automate tasks to keep massive cloud services online and resilient
summary: >-
  An engineering discipline that applies software development practices to automate operational tasks and maintain service reliability at scale.
confusable_notes:
  devops: >-
    SRE applies software engineering principles to operations using concrete mechanisms like error budgets and SLAs, whereas DevOps describes the broader organizational mindset and cultural goals.
follow_up_questions:
  - "Why does SRE enforce a fifty percent cap on manual operational toil for engineers?"
  - "How does blameless postmortem culture encourage transparent learning from production failures?"
translation: native
---

## Easy explanation
Like asking software architects to build the airport control tower and write self-flying autopilot software, rather than hiring people to manually steer every plane through turbulence.

## Details
Formulated by Ben Treynor Sloss at Google, Site Reliability Engineering represents the application of software engineering methods directly to system operations. Rather than relying on traditional manual systems administration, SRE teams apply software engineering rigor to infrastructure availability, latency, performance, efficiency, and capacity management. SRE defines clear numerical contracts using SLIs (Service Level Indicators) and SLOs (Service Level Objectives) to establish an error budget balancing feature velocity with stability. Additionally, teams enforce strict rules ensuring that no more than 50% of an engineer time is spent on repetitive manual toil, reserving the remaining time for engineering automation.

## Technical definition
An engineering discipline that incorporates aspects of software development and applies them to infrastructure and operations problems to create scalable and highly reliable software systems.

## Examples
An SRE team creates an automated service mesh controller that dynamically routes traffic away from degraded database nodes, replacing manual on-call failover intervention.
