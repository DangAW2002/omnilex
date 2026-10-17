---
label: "Sleep mode"
qualifier: "(Embedded)"
aliases:
  - "Low-power mode"
  - "Deep sleep"
loanwords:
  - "sleep mode"
  - "deep sleep"
autolink:
  aliases:
    Deep sleep: always
plain_descriptions:
  - "power-saving state where a microchip shuts down most circuits to preserve battery life"
  - "standby mode that drops microchip power consumption from milliamps to microamps"
summary: "A reduced-consumption operational state in microcontrollers where clock oscillators, high-speed peripherals, and processing cores are gated off until an external interrupt or timer triggers awakening."
confusable_notes: {}
follow_up_questions:
  - "How does deep sleep differ from light sleep regarding the preservation of internal SRAM contents and peripheral register states?"
  - "What wake-up sources (such as RTC timers or external pin interrupts) can successfully restore a sleeping core to active execution?"
translation: native
---

## Easy explanation
Think of a hibernating bear in winter: instead of burning energy walking around continuously, it drops its breathing and heart rate to almost zero, waking up briefly only when spring arrives or a loud noise echoes through the cave.

## Details
Battery-powered IoT sensors cannot afford to run their processors continuously, as doing so would drain batteries in days. Microcontrollers offer layered sleep modes—such as Light Sleep, Deep Sleep, and Standby. In deep sleep, high-frequency crystal oscillators and CPU cores shut down, reducing electrical current consumption from 50 milliamperes to under 10 microamperes. A dedicated low-power Real-Time Clock (RTC) domain or external wake-up pin remains energized, restoring full operating frequency only when a scheduled timer expires or an external event occurs.

## Technical definition
A hardware-managed low-power operating state wherein internal clock distribution networks, processing pipelines, and volatile peripheral domains are disabled, preserving minimal static leakage power until qualified wake-up triggers initiate reinitialization.

## Examples
An outdoor agricultural soil probe enters deep sleep for 59 minutes every hour, consuming just 5 microamps, before waking for 10 seconds to sample moisture and transmit a radio packet.
