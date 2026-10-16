---
label: Serverless
aliases:
  - Serverless computing
  - Function-as-a-Service
loanwords: []
plain_descriptions:
  - running code in the cloud without renting, managing, or patching any physical or virtual servers
  - a cloud pricing and compute model where you only pay for the exact milliseconds your code executes
summary: >-
  A cloud computing execution model where the cloud provider dynamically manages server infrastructure and charges only
  for resource consumption during code execution.
confusable_notes: {}
follow_up_questions:
  - What causes cold starts in serverless functions and how do provisioned instances mitigate them?
  - Why are stateless application architectures required for serverless horizontal scaling?
translation: native
---

## Easy explanation
Think of taking a taxi instead of owning a car: you do not worry about oil changes, tire rotations, or parking spaces; you simply hop in, pay for the exact distance driven, and step out.

## Details
Despite the name, serverless still uses servers, but the cloud provider handles provisioning, operating system maintenance, security patching, and capacity planning. Functions execute in response to events (such as HTTP requests, file uploads, or database changes), scaling instantly from zero instances to thousands and scaling back to zero when idle.

## Technical definition
An event-driven cloud architecture abstracting infrastructure provisioning, featuring automated per-request scaling and sub-second consumption-based billing.

## Examples
An image resizing function running on AWS Lambda that triggers whenever a user uploads an avatar to an S3 bucket, costing $0.0002 per invocation.
