---
label: OpenTelemetry
aliases: []
loanwords: []
plain_descriptions:
  - standardized open toolkit that collects traces, metrics, and logs across cloud services without vendor lock-in
  - universal framework providing code libraries and agents to export telemetry data to any monitoring backend
summary: >-
  An open-source observability framework under the CNCF providing vendor-neutral APIs, SDKs, and tooling to generate and export telemetry data.
confusable_notes: {}
follow_up_questions:
  - "How does adopting the OpenTelemetry Collector decouple application code from specific monitoring vendors?"
  - "Why does standardizing trace context propagation enable seamless observability across microservices written in different languages?"
translation: native
---

## Easy explanation
Like a universal power adapter: instead of soldering different proprietary plugs to every home appliance, you use one standardized connector that plugs into any wall outlet worldwide.

## Details
Formed by the merger of OpenTracing and OpenCensus under the Cloud Native Computing Foundation, OpenTelemetry (commonly abbreviated as OTel) is the industry standard for telemetry data collection. It provides a standardized data model, language-specific APIs and SDKs for tracing, metrics, and logs, and a standalone proxy service known as the OpenTelemetry Collector. By instrumenting applications with OpenTelemetry libraries, developers avoid vendor lock-in; telemetry data can be exported simultaneously or switched between various commercial backends and open-source tools without changing a single line of business code.

## Technical definition
A vendor-neutral observability framework and specification standardizing the instrumentation, generation, collection, and export of distributed traces, metrics, and logs.

## Examples
A fintech microservices application instruments its Java and Python services using OpenTelemetry SDKs, routing all traces through a local collector that forwards them to both Jaeger and Datadog.
