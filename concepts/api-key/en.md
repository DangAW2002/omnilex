---
label: API key
aliases: []
loanwords: []
plain_descriptions:
  - a unique secret string that an application sends to identify itself when calling a web service
  - a digital password used by programs to track usage and control access to an API
summary: A unique alphanumeric string passed by an application to authenticate the calling program and track its API consumption.
confusable_notes: {}
follow_up_questions:
  - Why should developers avoid hardcoding API keys inside frontend source code?
  - How do modern cloud platforms implement automatic API key rotation and scoping?
translation: native
---

## Easy explanation
Think of a customer account number printed on a business pass: whenever software orders supplies from a partner warehouse, it quotes this account code so the warehouse knows which company is placing the order and whether their account is active.

## Details
An API key is typically generated through a developer console and associated with a specific project or application. During HTTP communication, the client submits the key as an HTTP header (such as `X-API-Key` or `Authorization: Bearer`), a query parameter, or a cookie. Unlike user session tokens, API keys generally identify the calling software project rather than the individual end user, making them ideal for machine-to-machine integration, rate limiting, and consumption billing. Security best practices mandate restricting keys by IP address, domain, or HTTP method.

## Technical definition
An opaque token or identifier passed by an automated client to identify and authenticate the calling application project for access control, metering, and telemetry.

## Examples
A weather dashboard includes its 32-character API key in the header of each request sent to an external meteorological data provider to track quota limits.
