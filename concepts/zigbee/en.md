---
label: Zigbee
aliases: []
loanwords:
  - "zigbee"
plain_descriptions:
  - low power wireless mesh networking standard commonly used in home automation systems
  - radio protocol that routes sensor messages across interconnected household devices
summary: A low-power, wireless mesh networking standard built upon IEEE 802.15.4, designed for multi-device home automation and smart energy management.
confusable_notes:
  z-wave: Zigbee operates predominantly in the globally available 2.4 GHz spectrum sharing frequencies with Wi-Fi and Bluetooth, whereas Z-Wave operates in dedicated sub-GHz radio spectrum without 2.4 GHz interference.
follow_up_questions:
  - How do Zigbee Coordinators, Routers, and End Devices interact across a mesh topology?
  - How does Zigbee channel management mitigate radio interference with concurrent 2.4 GHz Wi-Fi networks?
translation: native
---

## Easy explanation
Zigbee is a wireless standard where powered devices like smart bulbs and wall switches act as signal relays: instead of every device trying to shout directly to a faraway internet router, messages hop from lamp to switch until they reach the central hub.

## Details
Governed by the Connectivity Standards Alliance (CSA), Zigbee builds on top of the physical and MAC layers defined in IEEE 802.15.4 (typically in the 2.4 GHz band with data rates up to 250 kbps). A Zigbee network consists of a single Coordinator (initiating the network and managing security keys), multiple Routers (mains-powered nodes that forward packets), and End Devices (sleepy, battery-powered sensors). Its self-healing mesh routing protocol dynamically establishes alternative paths when any router node fails or becomes obstructed.

## Technical definition
An open global wireless specification for high-density, low-power mesh networking based on the IEEE 802.15.4 radio standard, engineered for control and monitoring applications.

## Examples
A mesh of twenty wireless Zigbee radiator valves across an office building hopping data through ceiling light fixtures back to a central boiler thermostat.
