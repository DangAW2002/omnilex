---
label: Health check
qualifier: (Software)
aliases: []
loanwords: []
plain_descriptions:
  - periodic ping or request sent to an app to verify whether it is still running properly
  - dedicated endpoint like /health that returns status 200 when internal dependencies are functioning
summary: >-
  A diagnostic request executed automatically against a software component to determine its operational status and readiness to serve traffic.
confusable_notes: {}
follow_up_questions:
  - "Why should shallow health checks be used by load balancers instead of deep checks that query slow databases?"
  - "How does a failing health check help orchestrators isolate faulty nodes automatically?"
translation: native
---

## Easy explanation
Like a security guard tapping on a sentry box every fifteen minutes; if the guard inside taps back on time, the post is secure; if there is no response, relief troops are sent immediately.

## Details
A health check is an automated mechanism where an external system—such as a load balancer, orchestrator, or monitoring agent—probes a software service to determine if it is functioning. Common implementations expose an HTTP endpoint (such as /healthz or /health) that returns an HTTP 200 OK status when the application is healthy. Checks are categorized as shallow (testing only the web process itself) or deep (verifying database connections, cache availability, and message queues). If a health check fails repeatedly beyond a configured threshold, the load balancer stops routing traffic to that instance, preventing users from seeing errors.

## Technical definition
A standardized automated diagnostic routine executed over a network protocol to evaluate the operational status and functional integrity of a software instance.

## Examples
An AWS Application Load Balancer queries the /healthz endpoint every ten seconds; when a web server returns a 503 error three consecutive times, it is removed from the routing pool.
