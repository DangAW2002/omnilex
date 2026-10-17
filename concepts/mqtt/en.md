---
label: MQTT
aliases: []
loanwords:
  - "mqtt"
autolink:
  label: always
plain_descriptions:
  - lightweight messaging protocol using a publish subscribe broker model for iot devices
  - network standard for sending small data packets between sensors and servers over tcp
summary: A lightweight publish-subscribe network messaging protocol running over TCP, designed for constrained hardware and low-bandwidth connections.
confusable_notes:
  coap: MQTT utilizes a central publish/subscribe broker over persistent TCP streams, whereas CoAP implements client-server RESTful transactions over lightweight UDP datagrams.
follow_up_questions:
  - What operational trade-offs exist between MQTT Quality of Service (QoS) levels 0, 1, and 2?
  - How does the Last Will and Testament (LWT) feature help detect ungraceful client disconnections?
translation: native
---

## Easy explanation
MQTT is like a community noticeboard: instead of sensors sending individual messages directly to every interested computer, sensors pin short notices to a central board (the broker) under specific topic names, and any device interested in that topic immediately reads the notice.

## Details
MQTT functions over TCP/IP with a tiny two-byte header footprint, significantly conserving network bandwidth compared to HTTP. Clients connect to a centralized broker and publish telemetry on hierarchical topics (e.g., factory/line1/temp), while subscribers listen to exact or wildcard topics. The standard defines three delivery semantics: QoS 0 (at most once), QoS 1 (at least once, requiring acknowledgment), and QoS 2 (exactly once, using a four-step handshake). Features introduced in MQTT v5 include user properties, message expiry, and shared subscriptions.

## Technical definition
An open OASIS standard publish-subscribe message transport protocol designed for lightweight telemetry exchange across constrained client devices and high-latency networks over TCP.

## Examples
A smart electrical meter publishing voltage telemetry every ten seconds to an MQTT broker topic at meter/042/power with QoS level 1.
