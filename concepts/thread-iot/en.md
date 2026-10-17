---
label: "Thread"
qualifier: "(IoT)"
aliases:
  - "Thread protocol"
loanwords:
  - "thread"
autolink:
  label: never
plain_descriptions:
  - "secure, self-healing wireless mesh networking standard designed for smart home gadgets"
  - "IPv6-based mesh radio protocol that lets home devices talk to each other without single failure points"
summary: "An IPv6-based, low-power wireless mesh networking protocol built on IEEE 802.15.4 that provides reliable, secure, and self-healing connectivity for smart home devices without requiring a central hub."
confusable_notes:
  thread-programming: "Thread (IoT) is a wireless mesh networking protocol, whereas Thread (Programming) is a unit of execution scheduled inside an operating system process."
  matter-iot: "Thread is a low-power wireless mesh network transport layer (Layer 3), whereas Matter is an overarching application layer (Layer 7) that runs on top of Thread, Wi-Fi, and Ethernet."
follow_up_questions:
  - "How does 6LoWPAN packet compression enable full IPv6 addressing across constrained 127-byte 802.15.4 radio frames?"
  - "How do Thread Border Routers connect 802.15.4 mesh nodes seamlessly to standard home Wi-Fi and Ethernet LANs?"
translation: native
---

## Easy explanation
Think of a spiderweb of smart home gadgets talking in a circle: if one smart light bulb is unplugged, the neighboring plugs and switches simply reroute messages through another path without dropping your connection to the cloud.

## Details
Created by the Thread Group, Thread operates on top of low-rate wireless personal area network radios (IEEE 802.15.4) within the worldwide 2.4 GHz spectrum band. Crucially, Thread is built natively on IPv6 using 6LoWPAN header compression, meaning every connected light bulb, lock, and thermostat receives an individual IP address and can communicate using standard UDP/IPv6 sockets. The network possesses no single point of failure: if a device acting as the Leader router disconnects, another eligible Router automatically assumes leadership. Thread Border Routers bridge the low-power mesh directly onto standard home Wi-Fi and Ethernet networks.

## Technical definition
An open, IPv6-addressable wireless mesh networking protocol operating at 2.4 GHz over IEEE 802.15.4 physical layers, incorporating DTLS security, self-healing routing topologies, and Border Router internetworking.

## Examples
A smart home installation connects 30 door sensors, temperature probes, and smart light switches across a Thread mesh network, allowing a smart deadbolt to respond in under 100 milliseconds even when internet access goes down.
