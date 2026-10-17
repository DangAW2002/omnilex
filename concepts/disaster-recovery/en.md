---
label: Disaster recovery (DR)
aliases:
  - DR
loanwords: []
autolink:
  aliases:
    DR: always
plain_descriptions:
  - plan and technical process to restore systems after a major outage or disaster
  - procedures for reviving critical business data and servers following regional catastrophes
summary: A coordinated set of policies, tools, and technical procedures designed to recover and resume mission-critical technology infrastructure and operations after a catastrophic event.
confusable_notes:
  high-availability: Disaster recovery provides plans and mechanisms to rebuild and resume operations following catastrophic site-wide disasters, whereas high availability keeps systems operational during routine component failures without invoking disaster procedures.
follow_up_questions:
  - How do multi-region disaster recovery strategies balance cost against recovery speed across backup, pilot light, and active-active models?
  - Why is regular disaster recovery testing essential even when automated replication is in place?
translation: native
---

## Easy explanation
Like having a fully furnished second house in a different city with duplicate clothing, keys, and documents stored inside, ready to live in if a severe flood destroys your primary hometown.

## Details
While high availability protects against individual rack or server crashes within a data center, Disaster Recovery (DR) prepares organizations for widespread catastrophes like earthquakes, regional power blackouts, or massive cyberattacks. A formal DR plan outlines operational responsibilities, data replication schedules, and communication channels. Strategies vary from low-cost Backup and Restore to Pilot Light (running minimal core databases remotely), Warm Standby, and multi-region Active-Active setups, each measured against strict business recovery goals.

## Technical definition
An operational discipline encompassing infrastructure redundancy, data replication architectures, and validated recovery protocols to reestablish services following catastrophic disruptions.

## Examples
A financial institution maintaining an automated pilot-light environment in a secondary cloud region 800 kilometers away, capable of scaling to full production capacity within 30 minutes of a primary data center flood.
