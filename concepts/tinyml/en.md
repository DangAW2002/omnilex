---
label: "TinyML"
aliases:
  - "Tiny Machine Learning"
loanwords:
  - "tinyml"
plain_descriptions:
  - "running artificial intelligence models directly on tiny, low-power microcontrollers"
  - "smart machine learning algorithms optimized to execute inside microchips using milliwatts of power"
summary: "A subfield of machine learning focused on optimizing and executing neural network models directly on resource-constrained microcontrollers operating in the milliwatt or microwatt power envelope."
confusable_notes: {}
follow_up_questions:
  - "How do 8-bit integer quantization (INT8) and weight pruning compress neural network models to fit within 256 kilobytes of microcontroller SRAM?"
  - "What advantages does running voice wake-word inference locally via TinyML provide for user privacy and response latency?"
translation: native
---

## Easy explanation
Think of training a full-sized search and rescue dog, and then condensing its sharp scent-tracking skill into a tiny electronic chip small enough to run inside a battery-powered smoke alarm without connecting to the cloud.

## Details
TinyML brings machine learning inference to ultra-low-power edge hardware. While typical AI models demand massive cloud GPUs consuming hundreds of watts, TinyML architectures fit compressed deep neural networks onto 32-bit microcontrollers (such as ARM Cortex-M or ESP32) equipped with less than 512 kilobytes of RAM and milliwatt power budgets. Model optimization pipelines employ INT8 post-training quantization, structured weight pruning, and lightweight frameworks like TensorFlow Lite for Microcontrollers. Applications include keyword spotting (such as voice wake words), machine vibration anomaly detection, and real-time gesture tracking.

## Technical definition
The discipline and engineering practices of executing machine learning models on resource-constrained embedded systems and microcontrollers operating typically within the sub-milliwatt power consumption regime.

## Examples
An industrial bearing sensor uses an onboard TinyML neural network running on an ARM Cortex-M4 microcontroller to analyze continuous vibration patterns, flagging bearing wear anomalies locally without streaming audio data to the cloud.
