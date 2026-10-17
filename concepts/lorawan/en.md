---
label: LoRaWAN
aliases: []
loanwords:
  - "lorawan"
plain_descriptions:
  - long range low power wireless networking protocol for remote sensor deployments
  - wide area communication standard that connects battery powered iot devices over kilometers
summary: A point-to-multipoint Low-Power Wide-Area Network (LPWAN) protocol designed for wireless, battery-operated devices communicating over long distances on unlicensed radio spectrum.
confusable_notes:
  nb-iot: LoRaWAN operates on unlicensed sub-gigahertz radio spectrum through customer-deployed or community gateways, whereas NB-IoT operates on licensed cellular bands managed exclusively by mobile telecom operators.
  lora-radio: LoRaWAN is the upper-layer MAC and networking protocol system, whereas LoRa is the physical chirp spread spectrum radio modulation layer underneath.
follow_up_questions:
  - How do device reception behaviors differ across LoRaWAN Class A, Class B, and Class C operating modes?
  - How does Adaptive Data Rate (ADR) optimize wireless airtime and device battery consumption?
translation: native
---

## Easy explanation
LoRaWAN is like a long-range walkie-talkie protocol for outdoor sensors: it allows a weather station on a distant mountaintop or a soil probe across an orchard to beam tiny packets of data ten kilometers away to a gateway using almost zero battery power.

## Details
Governed by the LoRa Alliance, LoRaWAN sits on top of proprietary chirp spread spectrum (CSS) LoRa radio modulation in sub-GHz bands (such as 868 MHz in Europe, 915 MHz in North America, and 923 MHz in Asia). Deployments follow an inverted tree layout in which regional gateways relay packets transparently between end devices and a centralized Network Server. Security is enforced through AES-128 encryption with distinct Network Session Keys (NwkSKey) for routing integrity and Application Session Keys (AppSKey) for end-to-end payload confidentiality.

## Technical definition
A point-to-multipoint media access control (MAC) protocol specification for low-power wide-area wireless networks designed to interconnect battery-operated sensors over multi-kilometer spans.

## Examples
A municipal smart agriculture project deploying hundreds of soil moisture sensors across coffee plantations, relaying readings every two hours over LoRaWAN to a mountain gateway eight kilometers away.
