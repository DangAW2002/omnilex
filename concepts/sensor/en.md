---
label: Sensor
aliases: []
loanwords: []
plain_descriptions:
  - electronic part that detects physical changes like temperature or motion
  - hardware module that converts real world signals into digital data
summary: An input hardware component that senses physical attributes of the environment and converts them into measurable electrical signals.
confusable_notes: {}
follow_up_questions:
  - What is the difference between an analog sensor and a digital sensor?
  - How do calibration errors impact data reliability in connected sensor fleets?
translation: native
---

## Easy explanation
A sensor acts like sensory organs for machines: just as eyes sense incoming light or skin senses ambient temperature, a sensor observes physical conditions in its surroundings and translates that information into electrical pulses that a circuit can interpret.

## Details
Sensors work by detecting changes in physical properties such as thermal expansion, electrical resistance, capacitance, or magnetic flux. The detected physical stimulus generates an analog voltage or current, which is conditioned, filtered, and digitized by an analog-to-digital converter (ADC). Factors governing sensor performance include measurement range, sensitivity, resolution, linearity, and response latency. In connected environments, low power draw and resistance to environmental drift are critical for prolonged field operation.

## Technical definition
A transducer device that measures a physical quantity, environmental condition, or mechanical variable and transforms the observed state into an analog or digital electrical output signal for acquisition and computational processing.

## Examples
A digital DHT22 module measuring ambient temperature and relative humidity inside an agricultural greenhouse, reporting data every sixty seconds over an I2C bus.
