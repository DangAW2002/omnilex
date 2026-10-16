---
label: "Velocity"
qualifier: "(Agile)"
aliases: []
loanwords:
  - "velocity"
autolink:
  label: never
plain_descriptions:
  - "average amount of work a development team delivers during a single sprint"
  - "historical metric measuring how many story points a squad completes per iteration"
summary: "A planning metric tracking the average volume of story points or backlog items completed by a team per sprint."
confusable_notes:
  story-point: "Story points estimate the relative effort of individual tasks, while velocity measures the aggregate story points completed by a team during an iteration."
follow_up_questions:
  - "Why should velocity never be weaponized to compare productivity across different teams?"
  - "How does an established rolling velocity assist release forecasting?"
translation: native
---

## Easy explanation
Think of velocity as a cargo boat's typical cruising speed measured in containers delivered per week; knowing this baseline helps harbor dispatchers predict how long it will take to move an entire shipment.

## Details
Velocity is calculated by summing the story point values of all backlog items satisfying the Definition of Done by the end of a sprint. Incomplete tasks contribute zero points. Over several stable sprints, the rolling average provides an empirical baseline for capacity forecasting during sprint planning. Because different teams possess unique estimation calibrations and skills, velocity is strictly an internal calibration tool and must not be used as an inter-team benchmark.

## Technical definition
A metric in agile development capturing the sum of story point units delivered to production-ready completion by an engineering team within a standard iteration.

## Examples
A development squad completes 32, 28, and 30 story points across three consecutive sprints, giving them an average velocity of 30 points for future planning.
