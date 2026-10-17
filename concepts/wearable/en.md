---
label: "Wearable device"
aliases:
  - "Wearable"
loanwords:
  - "wearable"
  - "wearable device"
autolink:
  aliases:
    Wearable: always
plain_descriptions:
  - "electronic gadget worn directly on the human body to monitor activity and health"
  - "body-worn tech like smartwatches, fitness rings, and biometric patches"
summary: "A category of compact electronic devices designed to be comfortably worn on the body or clothing, incorporating sensors, processing, and wireless transceivers for continuous biometric tracking."
confusable_notes: {}
follow_up_questions:
  - "How do wearable optical photoplethysmography (PPG) sensors measure pulse rate and blood oxygen levels through human skin?"
  - "What ultra-low-power sleep architectures allow modern smart rings to operate for a week on a miniature 20 mAh battery?"
translation: native
---

## Easy explanation
Think of a pocket doctor or personal fitness coach packed into a wristband or ring that silently measures your pulse, monitors your sleep stages, and alerts your phone without getting in the way of your day.

## Details
Wearable devices incorporate miniature low-power microcontrollers, optical biosensors, accelerometers, battery charging circuits, and Bluetooth radios into water-resistant form factors like watches, rings, earbuds, and smart patches. They continuously monitor physical parameters such as heart rate, heart rate variability, skin temperature, blood oxygen saturation (SpO2), and activity exertion. Due to severe volume and weight constraints, firmware engineers rely heavily on low-power sensor polling and efficient local data filtering before offloading metrics to mobile phones.

## Technical definition
A wearable electronic system equipped with embedded processing units, physiological and kinetic sensors, and wireless connectivity interfaces engineered for persistent, non-invasive attachment to the human body.

## Examples
A fitness tracker worn on the wrist continuously illuminates green LED light into skin capillaries to calculate resting heart rate and uploads the daily biometric graph over BLE to a smartphone.
