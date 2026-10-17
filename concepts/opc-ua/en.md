---
label: OPC UA
aliases: []
loanwords:
  - "opc ua"
autolink:
  label: always
plain_descriptions:
  - cross platform industrial communication architecture providing semantic data modeling and secure transport
  - machine to machine standard ensuring interoperability between manufacturing hardware across vendors
summary: A platform-independent, service-oriented communication architecture designed for industrial automation that provides rich semantic information modeling and built-in cryptographic security.
confusable_notes:
  modbus: OPC UA is a platform-independent, object-oriented architecture offering rich semantic data types and built-in certificate-based encryption, whereas Modbus is a legacy register-based protocol lacking native authentication, encryption, or metadata models.
follow_up_questions:
  - How do OPC UA Companion Specifications standardize domain-specific data models across different machine tool manufacturers?
  - How does the OPC UA PubSub extension over Time-Sensitive Networking (TSN) provide deterministic real-time communication?
translation: native
---

## Easy explanation
OPC UA is like a universal digital passport and translator for industrial robots and machines: instead of every brand speaking its own private computer dialect, OPC UA gives machines a common language where data carries its own meaning, units, and strict security credentials.

## Details
Created by the OPC Foundation (IEC 62541), OPC UA breaks free from legacy Windows DCOM dependencies to run natively across Linux, embedded RTOS, and cloud containers. It implements an object-oriented address space where nodes expose properties, methods, historical telemetry, and semantic relationships. Communication supports both client-server RPC over binary TCP or WebSockets, and publisher-subscriber (PubSub) architectures. Built-in security enforces X.509 certificate authentication, mutual TLS encryption, and granular user authorization down to individual node attributes.

## Technical definition
An open, platform-neutral, service-oriented industrial interoperability standard providing semantic information modeling, multi-layered data transport, and end-to-end cryptographic protection.

## Examples
An automotive welding robot exposing its operational torque, joint angles, and error diagnostics over an OPC UA server, allowing seamless data ingestion by an on-premise MES system without custom vendor drivers.
