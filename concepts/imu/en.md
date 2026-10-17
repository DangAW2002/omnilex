---
label: "Inertial measurement unit (IMU)"
aliases:
  - "IMU"
loanwords:
  - "imu"
autolink:
  aliases:
    IMU: always
plain_descriptions:
  - "sensor pack combining an accelerometer and gyroscope to track orientation and movement"
  - "electronic motion sensor that measures how fast a device is tilting, turning, and accelerating"
summary: "An integrated multi-axis sensor package combining accelerometers, gyroscopes, and frequently magnetometers to measure a body linear acceleration, angular velocity, and heading."
confusable_notes:
  accelerometer: "An accelerometer measures only linear acceleration along coordinate axes, whereas an IMU fuses accelerometers with gyroscopes to track rotational angular rates and complete orientation."
follow_up_questions:
  - "How do sensor fusion algorithms like Kalman or Madgwick filters combine gyroscope and accelerometer inputs to compensate for gyroscope drift?"
  - "What distinguishes a 6-Degrees-of-Freedom (6-DOF) IMU from a 9-Degrees-of-Freedom (9-DOF) unit containing magnetometers?"
translation: native
---

## Easy explanation
Think of the balance mechanism inside the human inner ear: tiny fluid canals and hairs tell your brain whether you are leaning forward, spinning on a chair, or stepping onto an elevator even when your eyes are closed.

## Details
An Inertial Measurement Unit (IMU) integrates micro-electro-mechanical systems (MEMS) sensors into a single semiconductor package. A standard 6-axis IMU incorporates a 3-axis accelerometer (measuring linear forces along X, Y, and Z axes) and a 3-axis gyroscope (measuring rotational pitch, roll, and yaw velocity). 9-axis IMUs add a 3-axis magnetic compass. Embedded software fuses these sensor feeds using Kalman filters to compute real-time spatial orientation, enabling drone stabilization, VR headset head tracking, and dead-reckoning navigation when GPS signals drop.

## Technical definition
An electronic device comprising orthogonal multi-axis accelerometers and angular rate gyroscopes that measures and reports a vehicle or object specific force, angular rate, and orientation relative to an inertial reference frame.

## Examples
A quadcopter drone reads its onboard 6-axis MEMS IMU five hundred times per second to sense unexpected wind gusts and instantly adjust motor throttle speeds to maintain a steady hover.
