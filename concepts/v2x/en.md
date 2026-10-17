---
label: "Vehicle-to-everything (V2X)"
aliases:
  - "V2X"
  - "Cellular V2X"
  - "C-V2X"
loanwords:
  - "v2x"
autolink:
  aliases:
    V2X: always
    C-V2X: always
plain_descriptions:
  - "communication system allowing vehicles to exchange safety data directly with other cars, pedestrians, and traffic lights"
  - "connected vehicle radio network transmitting collision warnings and intersection signal timing in milliseconds"
summary: "A vehicular communication technology suite facilitating direct, low-latency information exchange between a vehicle and its surrounding environment, including other vehicles, roadside infrastructure, pedestrians, and networks."
confusable_notes:
  telematics: "V2X is a safety-critical peer-to-peer radio link operating with sub-twenty-millisecond reflexes between cars and traffic signals, whereas telematics communicates vehicle diagnostics back to cloud software servers."
follow_up_questions:
  - "How does direct Sidelink (PC5) communication operate between moving vehicles in the complete absence of cellular base station coverage?"
  - "What cryptographic public key infrastructure (PKI) validates pseudonym certificates to prevent malicious road hazard spoofing?"
translation: native
---

## Easy explanation
Like giving cars a wireless sixth sense that whispers warnings to the brakes when a hidden truck is about to run a red light around a blind corner, or alerts the dashboard when a pedestrian steps into a crosswalk behind a parked bus.

## Details
Specified by 3GPP as Cellular Vehicle-to-Everything (C-V2X), V2X encompasses four specialized transmission pathways: Vehicle-to-Vehicle (V2V) for collision avoidance, Vehicle-to-Infrastructure (V2I) for traffic signal timing and roadwork alerts, Vehicle-to-Pedestrian (V2P) for vulnerable road user protection, and Vehicle-to-Network (V2N) for cloud navigation. Crucially, C-V2X implements direct PC5 Sidelink channels running in the 5.9 GHz Intelligent Transportation System (ITS) band, allowing vehicles to broadcast Basic Safety Messages (BSMs) ten times per second with latencies below ten milliseconds without touching telecom cellular towers.

## Technical definition
A suite of direct vehicular telecommunication architectures enabling peer-to-peer and infrastructure wireless data dissemination for real-time situational awareness, cooperative driving maneuvers, and collision mitigation.

## Examples
An emergency ambulance approaching an intersection broadcasts V2I priority preemption requests via 5.9 GHz V2X, triggering traffic light controllers to turn oncoming signals red and provide a green corridor.
