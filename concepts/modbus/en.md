---
label: Modbus
aliases: []
loanwords:
  - "modbus"
plain_descriptions:
  - de facto standard industrial protocol that queries memory registers using master client polling
  - simple serial and tcp communication format widely implemented across manufacturing equipment
summary: A de facto industrial request-response communication protocol that reads and writes discrete memory coils and 16-bit numerical registers across serial and Ethernet links.
confusable_notes:
  opc-ua: Modbus communicates using plain, unauthenticated numerical memory tables (coils and 16-bit registers), whereas OPC UA features a structured, object-oriented semantic framework with native cryptographic security.
follow_up_questions:
  - What are the structural differences between binary Modbus RTU frames over RS-485 and Modbus TCP packets over Ethernet port 502?
  - Why does native Modbus lack authentication, and how do modern industrial firewalls inspect register traffic to enforce security?
translation: native
---

## Easy explanation
Modbus is like an old-fashioned paper ledger with numbered rows: a master computer calls up a machine and says "read row 40001", and the machine reads back the number written in that box without any complex grammar or password checks.

## Details
Published by Modicon in 1979, Modbus employs a simple master/slave (or client/server) polling model. Data is organized into four memory tables: Discrete Inputs (read-only binary bits), Coils (read-write binary bits), Input Registers (read-only 16-bit words), and Holding Registers (read-write 16-bit words). Common physical transport modes include Modbus RTU (compact binary over RS-485 with CRC error checking) and Modbus TCP (encapsulating frames with an MBAP header on port 502). Because raw Modbus lacks encryption or authentication, security relies on isolated network perimeters or VPN tunneling.

## Technical definition
An open, master-slave application-layer messaging protocol designed for client-server communication between intelligent devices connected on serial lines or Ethernet networks.

## Examples
A building energy monitor querying a power meter over Modbus RTU at 9600 baud to read total kilowatt-hour usage stored in Holding Register 40010.
