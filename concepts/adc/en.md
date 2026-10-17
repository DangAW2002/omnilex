---
label: "Analog-to-digital converter (ADC)"
aliases:
  - "ADC"
loanwords:
  - "adc"
autolink:
  aliases:
    ADC: always
plain_descriptions:
  - "electronic circuit that converts smooth continuous physical voltages into discrete digital numbers"
  - "sensor-reading chip that turns real-world voltage levels into numbers a computer can process"
summary: "An electronic circuit system that samples a continuous analog voltage waveform and quantizes it into discrete multi-bit digital numeric values."
confusable_notes:
  pwm: "An ADC measures an incoming analog voltage and produces digital binary numbers, whereas PWM generates an artificial variable average voltage by rapidly pulsing digital outputs."
follow_up_questions:
  - "How does the bit resolution of an ADC dictate the minimum measurable voltage step (quantization error)?"
  - "What operational trade-offs distinguish successive-approximation (SAR) ADCs from delta-sigma ADCs in IoT sensor nodes?"
translation: native
---

## Easy explanation
Think of a ruler measuring liquid heights in a beaker: the water level can be at any continuous height, but your ruler rounds it off to the nearest millimeter marking so you can write the measurement down in a notebook.

## Details
The physical universe is analog, characterized by continuously variable temperatures, pressures, and acoustic vibrations converted into smooth voltages by sensors. Computers, however, operate purely on binary numbers. An Analog-to-Digital Converter (ADC) bridges this gap through two operational stages: sampling the voltage at fixed periodic intervals and quantizing that voltage against a known reference level. A 10-bit ADC, for instance, maps an analog voltage range from 0 to 3.3 volts across 1024 distinct numerical increments (0 to 1023), producing roughly 3.22 millivolts per step.

## Technical definition
An electronic device or integrated circuit sub-block that samples a continuous time-varying analog input signal and transforms its magnitude into proportional discrete digital representation words.

## Examples
A medical wristband uses a 12-bit ADC inside its microcontroller to sample microvolt electrical pulses from skin photodiode sensors, converting raw blood-pulse waveforms into numerical heart-rate measurements.
