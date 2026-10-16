---
label: Uptime
aliases:
  - System uptime
  - Service availability
loanwords: []
plain_descriptions:
  - the percentage of time a computer system or website is running and ready for users
  - how long a service stays available without crashing or going offline
summary: >-
  The proportion or duration of time that a computer system, network, or application remains fully functional and
  accessible to users.
confusable_notes: {}
follow_up_questions:
  - What is the practical downtime allowed by "three nines" (99.9%) versus "five nines" (99.999%) per year?
  - How do synthetic heartbeat pingers calculate uptime across global regions?
translation: native
---

## Easy explanation
Think of an electric light bulb at home: uptime is the percentage of the year the light turns on whenever you flip the switch, compared to the rare minutes the power is out.

## Details
Uptime is commonly expressed as a percentage known as "nines of availability." For example, 99.9% uptime ("three nines") permits about 43.8 minutes of unplanned downtime per month, whereas 99.999% uptime ("five nines") allows only 26 seconds of downtime per month. Uptime monitoring uses external polling probes to test HTTP endpoints continuously.

## Technical definition
A quantitative availability metric measuring the ratio of operational runtime duration to total scheduled time interval.

## Examples
A cloud payments platform reports 99.98% uptime over the past 365 days, experiencing a total of just one hour and 45 minutes of cumulative downtime.
