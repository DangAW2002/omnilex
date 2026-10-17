---
label: gRPC
aliases:
  - gRPC Remote Procedure Call
loanwords: []
plain_descriptions:
  - high-speed framework for calling functions on remote servers using Protocol Buffers
  - binary RPC framework running over HTTP/2 for efficient microservice communication
summary: A high-performance, open-source universal RPC framework that uses Protocol Buffers for structured binary serialization and HTTP/2 for efficient multiplexed transport.
confusable_notes: {}
follow_up_questions:
  - How does binary serialization in Protocol Buffers outperform standard JSON payloads?
  - What challenges arise when exposing gRPC services directly to web browsers?
translation: native
---

## Easy explanation
Like pressing a remote control button to change a channel: you call a local function in your program, but the actual work happens instantly on a distant server across the room or across the globe.

## Details
Created originally by Google, gRPC enables software programs to trigger remote subroutines hosted across distinct network hardware with the ergonomic simplicity of calling internal memory functions. It defines service contracts using Protocol Buffers (.proto files) that generate strongly-typed client stubs and server skeletons across multiple programming languages. By running natively over HTTP/2, gRPC supports bidirectional streaming, header compression, and multiplexed requests over a single TCP connection, drastically cutting CPU serialization overhead compared to REST over JSON.

## Technical definition
A language-agnostic remote procedure call framework utilizing strongly typed protocol buffer schemas and HTTP/2 multiplexed streaming transports.

## Examples
A payment microservice invoking an internal currency exchange service via gRPC, serializing 10,000 binary requests per second with an average network latency of 3 milliseconds.
