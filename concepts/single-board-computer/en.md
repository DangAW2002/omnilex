---
label: "Single-board computer (SBC)"
aliases:
  - "SBC"
loanwords:
  - "single-board computer"
  - "sbc"
autolink:
  aliases:
    SBC: always
plain_descriptions:
  - "complete computer built entirely onto one single circuit board"
  - "compact circuit board containing processor, memory, and ports capable of booting an OS"
summary: "A complete functional computer whose microprocessor, system memory, storage interfaces, input-output controllers, and networking ports are assembled onto a single physical printed circuit board."
confusable_notes:
  embedded-system: "A single-board computer is an all-in-one printed circuit board hardware form factor, while an embedded system represents the overall functional role of specialized computing in machines."
  arduino: "Arduino boards generally host low-power microcontrollers executing bare-metal control scripts, whereas SBCs host multi-core application processors running rich multitasking operating systems like Linux."
follow_up_questions:
  - "What architectural trade-offs make an SBC preferable over a discrete motherboard assembly for edge automation?"
  - "How do developers manage thermal throttling on fanless compact single-board computers during heavy compute loads?"
translation: native
---

## Easy explanation
Imagine taking all the separate pieces inside a bulky office desktop—processor, RAM chips, storage slots, USB sockets, and network jacks—and shrinking them down onto a single credit-card-sized board.

## Details
Single-board computers assemble application-class System-on-Chips (SoCs), volatile system memory (DRAM), power management chips, video outputs, wireless chips, and physical expansion headers onto one unified circuit board. Unlike conventional modular computers, SBC components cannot be upgraded or unslotted. They run fully featured operating systems like Debian Linux or Android and provide direct hardware control via exposed general-purpose input/output pins, making them popular for IoT edge gateways, robotics brains, and smart retail kiosks.

## Technical definition
A complete computing architecture where central processing, primary volatile memory, power management, display drivers, and external input-output interfaces reside monolithically on a single printed circuit board without requiring auxiliary backplane cards.

## Examples
A highway surveillance gateway uses a multi-core ARM single-board computer running Linux to capture high-definition camera feeds, run local plate recognition algorithms, and transmit alert packages over cellular modems.
