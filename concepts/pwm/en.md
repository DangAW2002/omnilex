---
label: "Pulse-width modulation (PWM)"
aliases:
  - "PWM"
loanwords:
  - "pwm"
autolink:
  aliases:
    PWM: always
plain_descriptions:
  - "rapidly switching a digital signal on and off to simulate variable electrical power"
  - "flickering a voltage line fast enough to dim lights or adjust electric motor speeds"
summary: "A modulation method that regulates the effective average power delivered to a load by varying the duty cycle of a rapid square-wave switching signal."
confusable_notes:
  adc: "PWM generates simulated analog power levels by varying the pulse width of digital square waves, whereas an ADC reads actual analog voltages and converts them into digital numbers."
follow_up_questions:
  - "Why does increasing the PWM switching frequency prevent audible acoustic coil whine and visible light flicker?"
  - "How does an H-bridge motor driver combine directional logic pins with PWM duty cycles to control motor velocity and torque?"
translation: native
---

## Easy explanation
Imagine rapidly flipping a lamp switch on and off hundreds of times every second: because the light pulses faster than human eyes can perceive, the lamp appears smoothly dimmed rather than flashing.

## Details
Because digital microcontrollers can only output discrete full-voltage (HIGH) or ground (LOW) states, they cannot naturally output a true analog voltage like 1.5 volts. Pulse-Width Modulation solves this by pulsing the output pin at a fixed switching frequency (often hundreds of hertz to tens of kilohertz). By altering the duty cycle—the proportion of time the signal spends HIGH versus LOW during each cycle—the average electrical power delivered to the target load changes proportionally. A 25% duty cycle delivers one-quarter power, while a 75% duty cycle delivers three-quarters power, running cool without wasting energy as heat.

## Technical definition
A technique of controlling analog circuit loads using digital outputs by adjusting the width of pulses in a constant-frequency pulse train, thereby controlling the average power supplied to the system.

## Examples
A 3D printer controller applies a 20 kHz PWM signal at a 30% duty cycle to an extruder cooling fan, making it spin quietly at approximately one-third of its maximum speed.
