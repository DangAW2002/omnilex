---
label: SCADA
aliases: []
loanwords:
  - "scada"
autolink:
  label: always
plain_descriptions:
  - system architecture combining software and hardware to monitor and control expansive industrial facilities
  - supervisory control setup displaying plant telemetry graphics and handling operator commands
summary: An industrial control system architecture that gathers real-time telemetry from geographically dispersed field controllers, visualizes operational state, and allows supervisory commands.
confusable_notes: {}
follow_up_questions:
  - How does a SCADA system differ functionally and topologically from a Distributed Control System (DCS)?
  - What network segmentation rules under the Purdue Enterprise Reference Architecture isolate SCADA networks from corporate IT threats?
translation: native
---

## Easy explanation
SCADA is the central control room software for massive infrastructure like municipal water networks or regional electrical grids: it puts real-time animated dials, valve controls, and alarm panels onto computer monitors so human operators can oversee an entire power plant or water reservoir from a single chair.

## Details
A SCADA architecture integrates Remote Terminal Units (RTUs) and Programmable Logic Controllers (PLCs) in the field with central Human-Machine Interface (HMI) workstations, supervisory servers, and historical process databases (historians). Communication traverses industrial networks using protocols like DNP3, IEC 60870-5, Modbus, or OPC UA. SCADA focuses on supervisory-level setpoint adjustments and long-term alarm logging, delegating millisecond-level closed-loop safety controls to local PLCs.

## Technical definition
A category of software and hardware industrial automation systems that collects real-time operational data from remote locations to supervise and control critical infrastructure equipment.

## Examples
A regional electrical power dispatch center using SCADA software to monitor substation transmission voltages, detect circuit trips, and remotely open high-voltage switchgear breakers.
