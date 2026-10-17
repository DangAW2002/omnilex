---
label: Cold start
aliases: []
qualifier: (Serverless)
loanwords: []
plain_descriptions:
  - delay when a serverless function starts up from scratch after idle time
  - initial pause while the cloud provider spins up a new container for your code
summary: The initial invocation latency experienced in serverless computing when the platform must download code, initialize a container, and boot the runtime.
confusable_notes: {}
follow_up_questions:
  - How does provisioned concurrency eliminate cold start latency for latency-critical serverless endpoints?
  - How do lightweight runtime choices (like Rust or Go vs. JVM runtimes) impact cold start initialization duration?
translation: native
---

## Easy explanation
Like turning on a car engine on a freezing winter morning: you have to let the engine crank and warm up for a minute before driving smoothly, whereas a warm engine restarts immediately.

## Details
In serverless platforms (such as AWS Lambda or Google Cloud Functions), functions scale to zero when idle to minimize costs. When a new invocation arrives without an existing warm container, the platform allocates a sandbox, downloads the deployment package, boots the language runtime, and executes top-level initialization code before handling the request.

## Technical definition
The initialization phase of an on-demand serverless execution environment involving micro-VM or container allocation, code package loading, runtime bootstrapping, and external connection initialization prior to event handler execution.

## Examples
An API endpoint using Python Lambda experiences an initial 800ms latency on the first request of the morning due to cold start container bootstrapping, while subsequent requests process in under 15ms.
