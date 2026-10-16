---
label: Endpoint
qualifier: (API)
aliases:
  - API endpoint
loanwords: []
plain_descriptions:
  - the specific web address where an app sends requests to get certain information
  - a digital front door where external software asks a server to do something
summary: A dedicated network address and URL path exposed by an API where clients access a specific service or resource.
confusable_notes: {}
follow_up_questions:
  - How should API endpoints be versioned to avoid breaking mobile clients?
  - What distinguishes a resource endpoint from an RPC action endpoint?
translation: native
---

## Easy explanation
Like an office building where each department has a specific room number: you go to room 101 for customer support and room 202 for billing.

## Details
Endpoints combine a host domain, a URL path, and an HTTP method. When a client makes a network request to an endpoint, backend routing tables inspect the path and execute the corresponding controller function to process the payload and formulate a response.

## Technical definition
A targeted communication gateway represented as a uniform resource locator (URL) that receives remote method invocations and returns structured digital resources.

## Examples
Pointing a payment checkout webhook to `https://api.example.com/v1/payments/charge` using an HTTP POST method.
