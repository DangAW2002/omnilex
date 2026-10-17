---
label: "Device shadow"
aliases:
  - "Device twin"
loanwords:
  - "device shadow"
plain_descriptions:
  - "cloud-hosted digital document that stores and syncs the current and desired state of an iot device"
  - "virtual proxy that allows apps to send commands and read settings even when the device is offline"
summary: "A cloud-based virtual document that records, synchronizes, and persists the reported operational state and desired configuration of an IoT device across intermittent network connectivity."
confusable_notes:
  digital-twin: "A device shadow is a lightweight state-synchronization JSON document tracking desired versus reported settings, whereas a digital twin is an expansive physics-based or data-driven computational model simulating operational behavior over time."
  lwm2m: "A device shadow is a specific cloud data caching pattern that mirrors device states as JSON documents, whereas LwM2M is a complete device management standard utilizing standardized numerical object models and CoAP verbs."
follow_up_questions:
  - "How does a device shadow resolve state conflicts between desired cloud states and reported device states?"
  - "What MQTT topics facilitate asynchronous delta synchronization when an offline IoT device reconnects?"
translation: native
---

## Easy explanation
Like a whiteboard outside a meeting room where you write down instructions for an assistant who is currently out of the building; as soon as they step inside, they read the whiteboard, make the changes, and write back confirmation.

## Details
In modern IoT platforms like AWS IoT and Azure IoT Hub, a device shadow (or device twin) is represented as a structured JSON document. The document maintains two primary sections: "desired" state, updated by web applications to request changes (such as target thermostat temperatures), and "reported" state, published by the device to confirm its actual state. When network connectivity drops, applications can still inspect the last known reported state or write new desired commands. Once the physical device reconnects over MQTT, the platform pushes a "delta" document representing the discrepancy, which the device applies and confirms.

## Technical definition
A persistent, cloud-managed virtual document and state-broker service that decouples application interactions from direct hardware communication by maintaining synchronized records of reported and desired device states.

## Examples
A homeowner uses a smartphone app to set an electric water heater to eco-mode while the house internet is temporarily disconnected; the cloud device shadow stores the desired state and updates the heater the moment home connectivity recovers.
