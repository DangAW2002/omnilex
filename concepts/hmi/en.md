---
label: "Human-machine interface (HMI)"
aliases:
  - "HMI"
  - "Operator Interface"
loanwords:
  - "hmi"
autolink:
  aliases:
    HMI: always
plain_descriptions:
  - "touchscreen or control console display allowing factory operators to interact with industrial machines"
  - "visual operator panel displaying machine dials, diagnostic indicators, and process pushbuttons"
summary: "A hardware and software user interface that displays operational graphics, process variables, and alarms, allowing human operators to monitor and interact with automated industrial equipment."
confusable_notes:
  scada: "An HMI is typically a localized touchscreen panel mounted directly on an individual machine or cell for local operator control, whereas SCADA is an expansive multi-station supervisory control network managing entire regional facilities."
follow_up_questions:
  - "How do high-performance HMI design standards (such as ISA-101) minimize operator cognitive overload during plant alarm floods?"
  - "What communication drivers link touch panels to programmable logic controllers across serial RS-485 and Ethernet networks?"
translation: native
---

## Easy explanation
Like the dashboard and touchscreen console inside a car that lets the driver see vehicle speed, engine temperature, and fuel level while providing buttons to adjust climate control and headlights.

## Details
An HMI bridges human operators and automated industrial controllers like PLCs. Modern HMIs consist of ruggedized industrial touchscreens, embedded PCs, or web-based software panels mounted directly on machinery enclosures or swing arms. The software communicates over industrial protocols such as Modbus, Profinet, or Ethernet/IP to poll controller memory registers. The interface renders graphical gauges, tank fill levels, dynamic trend charts, and prioritized alarm banners, translating operator button presses into setpoint adjustments, emergency motor stops, and recipe parameters.

## Technical definition
The localized hardware apparatus and graphical software presentation layer that facilitates bidirectional interaction, process visualization, and supervisory manipulation between a human operator and automated control systems.

## Examples
An operator at a bottling plant uses a color touchscreen HMI on an automated labeling machine to clear bottle-feed jam alarms and adjust labeling conveyor speeds between different batch runs.
