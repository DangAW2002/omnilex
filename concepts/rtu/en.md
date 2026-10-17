---
label: "Remote terminal unit (RTU)"
aliases:
  - "RTU"
loanwords:
  - "rtu"
autolink:
  aliases:
    RTU: always
plain_descriptions:
  - "microprocessor-based device designed to gather sensor data at remote unstaffed sites and transmit to central scada"
  - "ruggedized telemetry field unit converting analog signals into digital streams across long-distance radio or cellular links"
summary: "A ruggedized, microprocessor-controlled electronic device deployed at remote geographical sites to collect sensor telemetry, convert signals, and transmit data back to central supervisory systems over wide-area links."
confusable_notes:
  plc: "An RTU is optimized for wide-area telemetry over solar, battery, and low-bandwidth wireless links across remote geographic terrain, whereas a PLC is engineered for high-speed, deterministic millisecond loop control inside factory enclosures."
follow_up_questions:
  - "How do RTU power-management states enable multi-month battery operation at solar-powered pipeline monitoring stations?"
  - "What telemetry protocols (such as DNP3 or Modbus over cellular) handle intermittent transmission link disconnects in RTU networks?"
translation: native
---

## Easy explanation
Like an autonomous weather and valve outpost situated high on a remote mountain pass, quietly measuring river heights and pipeline pressures on solar power and radioing status reports back to the valley dam operators.

## Details
RTUs serve as remote field outposts for supervisory SCADA architectures in water networks, electrical transmission grids, and oil and gas pipelines. Built to withstand extreme thermal fluctuations from minus forty to plus seventy degrees Celsius, RTUs feature specialized analog and digital I/O channels with surge suppression. They execute autonomous onboard logic, log events with precise millisecond GPS timestamps, and communicate across long-distance, low-bandwidth mediums like satellite modems, cellular radios, or UHF serial lines using telemetry protocols such as DNP3 and IEC 60870-5-104.

## Technical definition
A hardened, microprocessor-based data acquisition and control apparatus installed at remote outposts to gather field sensor inputs, execute local control sequences, and communicate with supervisory master stations over wide-area networks.

## Examples
A natural gas utility installs solar-powered RTUs along a four-hundred-kilometer desert pipeline to monitor pipe pressure, detect acoustic leaks, and close safety shut-off valves remotely via satellite.
