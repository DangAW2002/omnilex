---
label: "Condition monitoring"
aliases:
  - "Machine condition monitoring"
  - "Asset condition monitoring"
loanwords:
  - "condition monitoring"
plain_descriptions:
  - "continuous measurement of machine parameters like vibration and temperature to detect developing mechanical faults"
  - "real-time health tracking of industrial motors and bearings to prevent unexpected machinery breakdowns"
summary: "The systematic, continuous monitoring of physical operating parameters—such as vibration, temperature, and acoustics—to identify mechanical changes indicative of developing faults."
confusable_notes:
  predictive-maintenance: "Condition monitoring is the real-time sensor measurement and trend-tracking process detecting abnormal physical indicators, whereas predictive maintenance is the complete maintenance strategy that utilizes condition data and algorithms to forecast remaining useful life and plan repairs."
  cold-chain-monitoring: "Condition monitoring tracks mechanical vibration, current, and health metrics of plant industrial machinery, whereas cold chain monitoring tracks thermal, humidity, and environmental storage limits of consumable biological goods and vaccines."
follow_up_questions:
  - "How does Fast Fourier Transform (FFT) vibration spectral analysis differentiate between inner bearing race flaws and shaft unbalance?"
  - "What threshold alert methods distinguish normal thermal expansion from catastrophic lubrication breakdown in industrial gearboxes?"
translation: native
---

## Easy explanation
Like wearing a smartwatch that continuously tracks your heart rate, skin temperature, and oxygen levels to spot signs of dehydration or exhaustion hours before you actually feel sick.

## Details
Condition monitoring replaces static periodic inspections with continuous sensor surveillance of critical rotating and reciprocating machinery. Specialized sensors measure high-frequency vibration acceleration, bearing surface temperature, acoustic emissions, and electrical motor current signature analysis (MCSA). The raw sensor streams are processed at the edge using spectral transformations like Fast Fourier Transform (FFT) to isolate distinct defect frequencies corresponding to inner raceway spalling, gear tooth pitting, or shaft misalignment, triggering tiered warnings before catastrophic seizure occurs.

## Technical definition
The continuous or periodic measurement and analysis of physical indicators indicative of machine condition to detect early-stage mechanical deterioration and degradation.

## Examples
A municipal water treatment facility installs triaxial piezoelectric vibration sensors on six main intake pumps, streaming spectral acceleration data to edge gateways that alert technicians when rotor imbalance exceeds ISO 10816 vibration severity limits.
