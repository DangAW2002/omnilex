---
label: "Geofencing"
aliases:
  - "Geofence"
  - "Virtual perimeter"
loanwords:
  - "geofencing"
plain_descriptions:
  - "setting up a virtual perimeter boundary on a map that triggers automated alerts when entered or exited"
  - "location-based software feature executing actions when tracked assets cross defined geographical coordinates"
summary: "The use of location technologies to establish a virtual geographical perimeter, triggering automated computational actions or notifications whenever a monitored entity crosses the boundary."
confusable_notes:
  asset-tracking: "Asset tracking is the continuous logging and collection of raw geographic coordinates and telemetry, whereas geofencing is the spatial boundary evaluation engine that fires discrete business triggers upon boundary crossing events."
follow_up_questions:
  - "How does the point-in-polygon ray-casting algorithm evaluate whether a moving GPS coordinate lies inside an irregular boundary?"
  - "What hysteresis distance filtering prevents false enter/exit alert spam when assets linger near boundary edges?"
translation: native
---

## Easy explanation
Like drawing an invisible digital chalk circle around a construction site on a map, so that an automated alarm chimes on your phone whenever an expensive bulldozer drives outside that circle.

## Details
Geofencing services define virtual geographical zones represented as circular radii (center latitude, longitude, and radius) or complex polygons (GeoJSON coordinate arrays). In location platforms such as Amazon Location Service, spatial computing engines evaluate incoming asset telemetry against active geofence collections. Point-in-polygon computational geometry algorithms determine spatial relationships, classifying events into ENTER, EXIT, or DWELL. These triggers instantly dispatch push notifications, record payroll timestamps, immobilize rental scooters, or initiate automated gate-opening workflows.

## Technical definition
A spatial computing feature that establishes virtual geometric boundaries across geographic coordinate systems to trigger automated events upon the entry, exit, or dwell of monitored positioning entities.

## Examples
A municipal shared electric-kick-scooter fleet utilizes polygon geofencing around pedestrian plaza zones to automatically throttle scooter motors down to eight kilometers per hour when riders enter the plaza.
