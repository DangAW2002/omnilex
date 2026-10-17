---
label: "LiDAR"
aliases:
  - "Lidar"
  - "LIDAR"
loanwords:
  - "lidar"
autolink:
  aliases:
    LiDAR: always
    LIDAR: always
plain_descriptions:
  - "sensor that shoots laser beams and times reflections to create accurate 3D maps"
  - "laser-scanning distance measurement system used in self-driving vehicles and robotic vacuums"
summary: "A remote-sensing method that illuminates a target with pulsed laser light and measures reflected return times to generate high-resolution three-dimensional spatial coordinates."
confusable_notes: {}
follow_up_questions:
  - "How do solid-state LiDAR sensors eliminate mechanical spinning assemblies to improve shock resistance in automotive vehicles?"
  - "What wavelength choices balance atmospheric eye-safety regulations against detection range in outdoor autonomous driving?"
translation: native
---

## Easy explanation
Think of a bat navigating in darkness using echolocation squeaks, but replacing sound with millions of invisible laser flashes that bounce off walls and furniture to sketch an instant three-dimensional blueprint of the room.

## Details
LiDAR (Light Detection and Ranging) systems fire narrow laser pulses in the infrared or near-infrared spectrum and record the flight time (Time-of-Flight or ToF) for each beam to return to a photodetector. By knowing the constant speed of light, the sensor computes exact distance with millimeter precision. When paired with mechanical rotating mirrors or phased optical arrays, the sensor sweeps horizontal and vertical fields of view, producing dense point clouds containing millions of spatial coordinates used by autonomous cars, robotic vacuums, and aerial terrain mappers.

## Technical definition
An optical remote-sensing technology that measures the range to distant targets by illuminating them with modulated or pulsed coherent laser emissions and analyzing the reflected time-of-flight, wavelength phase shift, or spectral backscatter.

## Examples
An autonomous delivery rover spins a 16-channel LiDAR pod on its roof, firing 300,000 laser pulses per second to detect curbs, pedestrians, and obstacles up to 50 meters away.
