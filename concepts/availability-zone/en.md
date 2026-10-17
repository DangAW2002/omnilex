---
label: Availability zone (AZ)
aliases:
  - AZ
autolink:
  aliases:
    AZ: always
loanwords: []
plain_descriptions:
  - isolated data center location within a cloud region with its own power
  - discrete fault domain designed to keep systems running if another center fails
summary: One or more discrete physical data centers within a region with independent power, cooling, and networking designed for fault tolerance.
confusable_notes:
  cloud-region: An availability zone is a specific isolated data center facility inside a region, whereas a region is the broader geographical boundary.
follow_up_questions:
  - How does synchronous multi-AZ database replication maintain zero data loss during power failure?
  - What cross-AZ network transfer charges apply when distributing traffic across multiple zones?
translation: native
---

## Easy explanation
Like redundant electrical backup generators situated in completely separate buildings on a hospital campus: if generator A catches fire, generator B continues supplying electricity.

## Details
Each Availability Zone (AZ) consists of physical facilities located kilometers apart to mitigate localized threats like fires or utility blackouts while remaining close enough for synchronous sub-millisecond replication. Architecting workloads across multiple AZs ensures that if a utility failure halts an entire facility, active-active failover mechanisms sustain service availability.

## Technical definition
An isolated physical location within a cloud geographic region featuring redundant power feeds, uninterruptible cooling infrastructure, and isolated network switching fabrics, linked to other zones via dedicated dark fiber.

## Examples
An ecommerce application runs instances in two separate availability zones (us-east-1a and us-east-1b) behind a load balancer; when a flood disables power in zone 1a, zone 1b handles all checkout traffic without interruption.
