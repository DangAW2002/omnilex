---
label: "Energy harvesting"
aliases:
  - "Power harvesting"
loanwords:
  - "energy harvesting"
plain_descriptions:
  - "capturing ambient energy from light, heat, or vibrations to power electronics without batteries"
  - "technology that scavenges electricity from the environment for maintenance-free sensors"
summary: "The process of capturing minute quantities of energy from ambient environmental sources—such as light, thermal gradients, mechanical vibrations, or radio waves—and converting it into electrical power for electronics."
confusable_notes: {}
follow_up_questions:
  - "How do Maximum Power Point Tracking (MPPT) circuits maximize energy capture from fluctuating photovoltaic and thermoelectric transducers?"
  - "Why do energy harvesting sensor nodes use supercapacitors instead of rechargeable chemical batteries for long-term charge buffering?"
translation: native
---

## Easy explanation
Think of a pocket solar calculator: it never needs its battery replaced because the ceiling lights in the room generate enough electricity to power the screen and buttons indefinitely.

## Details
Energy harvesting enables autonomous, maintenance-free IoT sensor nodes by scavenging energy from the immediate environment. Transducers convert external physical phenomena into electrical energy: photovoltaic cells capture ambient light, thermoelectric generators (TEGs) exploit temperature differences (Seebeck effect), piezoelectric materials convert mechanical motion and vibrations, and RF receivers harvest broadcast radio signals. Because captured energy is often intermittent and tiny (microwatts to milliwatts), power management ICs accumulate the energy into supercapacitors to periodically power low-power microcontrollers.

## Technical definition
The technological process of capturing, converting, and storing ambient environmental energy—derived from light, thermal differentials, kinetic motion, or electromagnetic fields—to supply electrical power to autonomous electronic systems.

## Examples
A structural vibration sensor mounted on a highway bridge converts vibrations from passing trucks into electricity using a piezoelectric cantilever, powering a wireless crack sensor without batteries.
