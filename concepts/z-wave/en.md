---
label: "Z-Wave"
aliases: []
loanwords:
  - "z-wave"
plain_descriptions:
  - "sub-gigahertz wireless mesh protocol for smart homes that avoids crowded Wi-Fi channels"
  - "reliable home automation radio standard operating on dedicated sub-1GHz frequencies"
summary: "A wireless communications protocol operating in the sub-gigahertz frequency spectrum designed specifically for reliable, interference-free mesh networking in residential home automation."
confusable_notes:
  zigbee: "Z-Wave operates in sub-GHz radio spectrum (around 908/868 MHz) completely isolated from 2.4 GHz Wi-Fi and Bluetooth interference, whereas Zigbee predominantly shares the crowded 2.4 GHz band."
follow_up_questions:
  - "How does operating below 1 GHz allow Z-Wave signals to penetrate concrete walls and wooden floors more effectively than 2.4 GHz radios?"
  - "What security advantages does the mandatory Z-Wave Security 2 (S2) framework provide against smart lock intercept attacks?"
translation: native
---

## Easy explanation
Think of a walkie-talkie channel reserved strictly for home appliances: because it broadcasts on a deep radio frequency far away from busy Wi-Fi routers and microwave ovens, signals travel effortlessly through thick concrete walls.

## Details
Originally designed by Zensys (now Silicon Labs), Z-Wave operates in dedicated sub-1 GHz Industrial, Scientific, and Medical (ISM) radio bands (such as 908.42 MHz in North America and 868.42 MHz in Europe). This frequency allocation gives it superior physical penetration through walls and floors while completely circumventing the congested 2.4 GHz spectrum utilized by Wi-Fi, Bluetooth, and Zigbee. Z-Wave forms a source-routed mesh network supporting up to 232 nodes with a maximum of four wireless hops. All modern devices mandate the Z-Wave S2 framework, which uses elliptic-curve Diffie-Hellman key exchanges and AES-128 encryption.

## Technical definition
A proprietary-origin, standardized (ITU-T G.9959) narrow-band sub-gigahertz wireless radio communications protocol configured for low-throughput, low-latency control mesh networks in automated residential environments.

## Examples
A residential security system uses Z-Wave to connect deadbolts, glass-break sensors, and wall sirens across a two-story home, penetrating concrete foundations without packet loss from nearby Wi-Fi streaming.
