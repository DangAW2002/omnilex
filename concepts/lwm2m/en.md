---
label: "LwM2M"
aliases:
  - "Lightweight M2M"
loanwords:
  - "lwm2m"
autolink:
  label: always
plain_descriptions:
  - "lightweight open protocol standardizing device management and firmware updates on resource-limited iot hardware"
  - "structured client-server protocol built on CoAP to monitor and configure low-power field microcontrollers"
summary: "An open device management protocol standardized by the Open Mobile Alliance, designed for sensor telemetry, configuration, and firmware updates across constrained embedded hardware."
confusable_notes:
  device-shadow: "LwM2M is a complete device management standard utilizing standardized numerical object models and CoAP verbs, whereas a device shadow is a specific cloud data caching pattern that mirrors device states as JSON documents."
follow_up_questions:
  - "How does the LwM2M Object and Resource registry enforce interoperability across multi-vendor smart meters?"
  - "What specific advantages does LwM2M provide when deploying delta firmware updates over low-bandwidth NB-IoT connections?"
translation: native
---

## Easy explanation
Think of a universal remote control language that lets city engineers check the battery, update software, and read water usage on thousands of meters from different brands using identical menu commands.

## Details
Developed by the Open Mobile Alliance (OMA), Lightweight M2M runs on top of CoAP, UDP, and SMS, secured with DTLS or OSCORE. The protocol defines an extensible object-oriented data structure where standardized numerical identifiers represent device capabilities, such as Object 3 for device information and Object 5 for firmware updates. LwM2M specifies four logical interfaces: Bootstrap for credential provisioning, Device Registration for network rendezvous, Device Management and Service Enablement for configuration, and Information Reporting for sensor telemetry.

## Technical definition
An application-layer protocol and resource management standard designed by the Open Mobile Alliance for telemetry, configuration, and over-the-air firmware maintenance on low-power, constrained embedded nodes.

## Examples
A national water utility uses an LwM2M server to query battery voltages, update radio reporting intervals, and deliver firmware packages to eighty thousand subterranean water meters.
