---
label: "Accelerometer"
aliases: []
loanwords:
  - "accelerometer"
plain_descriptions:
  - "sensor that detects motion, shakes, and the pull of gravity on a device"
  - "microchip that measures changes in speed and tells a phone to rotate its screen"
summary: "An electromechanical sensor that measures proper acceleration—the physical acceleration experienced by an object relative to freefall, including the gravitational vector."
confusable_notes:
  imu: "An accelerometer measures solely linear acceleration and gravity vectors along orthogonal axes, whereas an IMU bundles accelerometers with angular rate gyroscopes."
follow_up_questions:
  - "How does a suspended microscopic proof mass on silicon springs alter electrical capacitance when subject to acceleration?"
  - "In what way does an accelerometer differentiate between static Earth gravity and sudden dynamic shock impacts?"
translation: native
---

## Easy explanation
Think of a tiny weight suspended on springs inside a box: when you shove the box forward or tilt it on its side, the weight lags behind or presses downward, stretching the springs by an amount that reveals your motion.

## Details
Micro-Electro-Mechanical Systems (MEMS) accelerometers measure proper acceleration along one, two, or three orthogonal axes. Inside the silicon chip, a microscopic seismic proof mass is anchored to flexible polysilicon springs between fixed sensing fingers. Acceleration displaces this proof mass, altering the minute electrical capacitance between the movable and stationary fingers. Onboard circuitry converts this capacitance shift into a voltage or digital register value proportional to acceleration in g-forces (where 1g ≈ 9.81 m/s²), enabling smartphone screen auto-rotation, automotive airbag deployment, and pedometer step counting.

## Technical definition
A transducer that measures proper acceleration—the rate of change of velocity per unit time along specified linear axes relative to an inertial free-falling reference frame—via internal mechanical displacement.

## Examples
A smartwatch accelerometer detects the rapid, repetitive upward and downward 1g shock profiles of a runner steps, counting running cadences and estimating distance traveled.
