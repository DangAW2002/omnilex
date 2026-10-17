---
label: Toil
qualifier: (SRE)
aliases: []
loanwords: []
plain_descriptions:
  - repetitive, manual operational tasks that grow directly with service size and produce no lasting value
  - tedious administrative work like resetting servers or approving tickets that should be automated away by code
summary: >-
  Administrative operational effort within SRE comprising routine, automatable tasks that lack permanent architectural value and expand as fleet size increases.
confusable_notes: {}
follow_up_questions:
  - "What specific characteristics differentiate operational toil from meaningful engineering work?"
  - "Why does unchecked toil lead to engineer burnout and team turnover in operations organizations?"
translation: native
---

## Easy explanation
Like manually baling water out of a leaky boat every hour: it keeps you afloat for now, but fixing the leak with a permanent patch is true engineering that ends the chore forever.

## Details
Site reliability engineering identifies toil as operational maintenance characterized by hands-on routines, recurring steps, lack of permanent benefit, and effort that expands in direct proportion to service volume. Common examples include manually granting database permissions, resetting stuck batch jobs, approving routine quota requests, and running repetitive data cleanup scripts. While some overhead is unavoidable in operations, SRE mandates that teams measure their toil and keep it strictly below 50% of total working hours. The remaining time must be invested in engineering projects—such as writing automation software, improving architectural resiliency, and building self-healing capabilities—to eliminate the toil permanently.

## Technical definition
A categorized type of operational overhead characterized by repetitive, manual, automatable tasks that lack enduring value and scale linearly with system volume.

## Examples
An engineer who manually reviews and executes ten database index creation requests per day writes a self-service validation bot, converting eighty hours of monthly toil into permanent automation.
