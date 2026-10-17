---
label: Online Transaction Processing (OLTP)
aliases:
  - OLTP
loanwords: []
autolink:
  aliases:
    OLTP: always
plain_descriptions:
  - database systems that handle thousands of immediate everyday customer clicks and payments
  - the software engine processing debit card withdrawals and order confirmations in real time
summary: A category of data processing focused on executing and recording a high volume of short, immediate database transactions.
confusable_notes:
  olap: OLTP systems are optimized for fast, reliable transaction processing and low-latency single-row lookups, whereas OLAP systems are optimized for scanning and aggregating millions of historical records.
follow_up_questions:
  - How do database indexing strategies differ between OLTP write-heavy tables and OLAP read-heavy tables?
  - Why is relational database normalization primarily used to protect OLTP data integrity?
translation: native
---

## Easy explanation
Like a busy supermarket checkout counter: scanning barcodes, ringing up single customer bills, and taking payments one after another within seconds.

## Details
OLTP engines are engineered for high concurrency, low latency, and absolute data integrity. They handle continuous streams of atomic INSERT, UPDATE, and DELETE queries (such as banking transfers or flight seat bookings). Data models are heavily normalized to 3NF to avoid update anomalies and minimize row lock contention, guaranteeing ACID compliance for mission-critical operations.

## Technical definition
A computing paradigm and transactional database model characterized by high-concurrency, sub-second execution of granular CRUD operations under strict transactional isolation.

## Examples
An airline reservation system relies on an OLTP database to reserve flight seats and charge credit cards for 1,200 travelers simultaneously without double-booking.
