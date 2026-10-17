---
label: "Radio-frequency identification (RFID)"
aliases:
  - "RFID"
loanwords:
  - "rfid"
autolink:
  aliases:
    RFID: always
plain_descriptions:
  - "wireless technology using radio waves to identify and track tags attached to objects"
  - "electronic tagging system that scans toll transponders and inventory tags from meters away"
summary: "A wireless identification technology employing electromagnetic radio frequency fields to automatically detect and read encoded data stored on passive or active electronic tags."
confusable_notes:
  nfc: "RFID covers short to long wireless tracking ranges (up to dozens of meters) using various frequency bands primarily for one-way asset tracking, whereas NFC is a specialized short-range (under 4 cm) two-way interactive subset operating at 13.56 MHz."
follow_up_questions:
  - "How does electromagnetic backscatter modulation allow passive RFID tags without batteries to transmit serial numbers back to readers?"
  - "What frequency and read-range differences distinguish Low Frequency (LF), High Frequency (HF), and Ultra-High Frequency (UHF) RFID systems?"
translation: native
---

## Easy explanation
Think of a wireless barcode that never requires line-of-sight laser scanning: a toll booth scanner or warehouse gate shoots out invisible radio waves, and microchip stickers on passing boxes reflect their serial numbers back automatically.

## Details
An RFID system consists of an electronic interrogator (reader) with an antenna and transponders (tags) affixed to assets. Passive tags contain no battery; they scavenge energy directly from the electromagnetic radio waves beamed by the reader, powering a tiny microchip that transmits back its unique Electronic Product Code (EPC) via backscatter reflection. Active tags incorporate an internal battery to broadcast beacons across hundreds of feet. Operating across LF, HF, and UHF frequency spectrums, RFID automates automated toll plazas, apparel retail inventory counts, and airline luggage tracking.

## Technical definition
An automatic identification and data-capture technology utilizing modulated radio-frequency electromagnetic fields to interrogate transponders containing digitally stored identification identifiers without requiring physical contact or optical sightlines.

## Examples
An automated highway toll gantry reads a passive UHF RFID sticker mounted behind a vehicle rearview mirror at 80 km/h, debiting the driver highway account without the car stopping.
