---
label: "GNSS"
aliases:
  - "Global Navigation Satellite System"
  - "GPS"
loanwords:
  - "gnss"
  - "gps"
autolink:
  label: always
  aliases:
    GNSS: always
    GPS: always
plain_descriptions:
  - "umbrella term for satellite constellations like GPS, Galileo, and BeiDou that provide global positioning"
  - "satellite navigation technology that calculates exact latitude, longitude, and time anywhere on Earth"
summary: "The worldwide collection of satellite constellations and augmentation systems that transmit radio signals used by ground receivers to compute autonomous geospatial positioning and atomic time."
confusable_notes: {}
follow_up_questions:
  - "How does a GNSS receiver perform trilateration across four satellite timing signals to resolve receiver clock bias?"
  - "What positioning accuracy improvements do multi-band (L1/L5) receivers provide in dense urban canyon environments?"
translation: native
---

## Easy explanation
Think of a celestial cluster of orbiting lighthouses, each broadcasting an exact timestamp: by clocking the subtle arrival delays from at least four lighthouses at once, an earthbound traveler can pinpoint their precise location on the planet.

## Details
Global Navigation Satellite System (GNSS) is the formal international term encompassing all orbital navigation constellations: the United States GPS, Europe's Galileo, China's BeiDou, and Russia's GLONASS. Orbiting approximately 20,000 kilometers above the Earth, each satellite carries atomic clocks and broadcasts precise orbital ephemeris data. Receivers measure the time of flight of radio signals from at least four satellites to solve four unknowns: three-dimensional latitude, longitude, and altitude, along with receiver clock bias error.

## Technical definition
A constellation of orbiting artificial satellites transmitting synchronized radio-frequency signals enabling terrestrial receiver hardware to calculate three-dimensional coordinates, velocity vectors, and coordinated universal time via geometric trilateration.

## Examples
A marine cargo vessel tracks shipping containers using a multi-constellation GNSS receiver module that combines signals from 18 GPS and Galileo satellites to achieve sub-meter geolocation accuracy.
