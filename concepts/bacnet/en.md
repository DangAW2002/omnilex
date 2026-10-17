---
label: "BACnet"
aliases:
  - "Building Automation and Control Networks"
loanwords:
  - "bacnet"
autolink:
  label: always
plain_descriptions:
  - "open standard communications protocol designed specifically for commercial building automation systems"
  - "standardized networking language interconnecting heating, air conditioning, and lighting controllers in facilities"
summary: "A standardized communication protocol engineered specifically for building automation and control systems, facilitating multi-vendor interoperability across HVAC, lighting, and access control hardware."
confusable_notes:
  can-bus: "BACnet is an application-level facility automation standard tailored for HVAC, lighting, and elevator building infrastructure, whereas CAN bus is a low-level electrical bus designed for vehicle engines and industrial machinery controllers."
follow_up_questions:
  - "How does BACnet/SC (Secure Connect) implement encrypted WebSocket channels over TLS in building networks?"
  - "What object models and property representations standardize multi-vendor HVAC chiller interoperability in BACnet?"
translation: native
---

## Easy explanation
Like a universal translator for a commercial high-rise building, allowing chillers made by one vendor, lighting controllers made by another, and thermostats made by a third to share temperature data and schedule power-down routines seamlessly.

## Details
Developed under the auspices of ASHRAE and recognized globally as ANSI/ASHRAE Standard 135 and ISO 16484-5, BACnet defines an object-oriented model representing physical building inputs and outputs. Devices expose capabilities through standard objects like Analog Inputs, Binary Outputs, and Schedules, accessed through services like ReadProperty and WriteProperty. BACnet operates across diverse physical media, including Ethernet, IP networks (BACnet/IP), twisted-pair RS-485 serial loops (BACnet MS/TP), and modern encrypted WebSocket transports (BACnet/SC).

## Technical definition
An open, standardized communications protocol and semantic object specification designed by ASHRAE for interoperable building automation and facility control networks.

## Examples
A thirty-story hospital facility integrates eight hundred BACnet-compatible variable air volume (VAV) controllers and central rooftop chillers to regulate airflow and maintain sterile room pressurization.
