---
label: "Asset tracking"
aliases:
  - "Asset location tracking"
  - "Cargo tracking"
loanwords:
  - "asset tracking"
plain_descriptions:
  - "monitoring the physical location and movement of valuable equipment and shipping containers"
  - "system using gps, bluetooth, or cellular tags to locate freight and warehouse inventory"
summary: "The method of tracking the geographical position, transit status, and physical condition of physical assets and cargo utilizing wireless positioning and telemetry technologies."
confusable_notes:
  fleet-management-iot: "Asset tracking focuses on locating and monitoring non-powered or mobile goods, shipping pallets, and machinery, whereas device fleet management oversees the firmware, credentials, and software configuration of the compute nodes themselves."
  geofencing: "Asset tracking is the continuous logging and collection of raw geographic coordinates and telemetry, whereas geofencing is the spatial boundary evaluation engine that fires discrete business triggers upon boundary crossing events."
follow_up_questions:
  - "How does hybrid positioning combine GNSS satellite positioning with Wi-Fi BSSID and cellular triangulation indoors?"
  - "What energy-harvesting and accelerometer sleep triggers extend tracker battery life on shipping pallets across overseas voyages?"
translation: native
---

## Easy explanation
Like attaching an AirTag or cellular luggage tag to every shipping crate, allowing logistics managers to pull up a digital map and see exactly which warehouse aisle, harbor terminal, or highway truck contains their cargo.

## Details
Asset tracking architectures combine location determination hardware with wireless wide-area communication links. For outdoor transit, trackers utilize GNSS (GPS, Galileo, BeiDou) modules; for indoor warehouse depots where satellite signals attenuate, devices scan surrounding Wi-Fi access points or Bluetooth Low Energy (BLE) beacons to resolve location via signal fingerprinting. Onboard motion accelerometers awaken tracking units only when movement is detected, transmitting coordinates, battery voltage, and ambient shock data over cellular or LPWAN networks before resuming ultra-low-power sleep.

## Technical definition
The technological system and logistical discipline of continuously monitoring the geographical coordinates, physical location, and environmental status of physical assets throughout their lifecycle.

## Examples
An air freight handling company outfits fifteen thousand aircraft baggage containers with BLE and cellular tracking beacons, reducing container misplacement across thirty-five international airport hubs.
