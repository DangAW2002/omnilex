---
label: "Story point"
aliases:
  - "Point"
loanwords:
  - "story point"
plain_descriptions:
  - "abstract measurement unit used to estimate the relative effort, complexity, and risk of a software task"
  - "scoring system that rates user story difficulty using relative comparisons rather than calendar hours"
summary: "A relative number that agile teams use to estimate how much total effort a backlog item will take, compared with other items."
confusable_notes:
  velocity-agile: "A story point rates the isolated effort of a single backlog deliverable, whereas velocity tracks the aggregate points a team completes per sprint."
follow_up_questions:
  - "Why does estimating in relative points produce more consistent forecasts than estimating in hours?"
  - "How does using modified Fibonacci numbers (1, 2, 3, 5, 8, 13) expose estimation uncertainty?"
translation: native
---

## Easy explanation
Think of story points like sizing t-shirts (S, M, L, XL) or coffee cups: you instinctively know a grande beverage is twice as large as a small espresso without needing a stopwatch to measure how long it takes to drink.

## Details
Story points detach estimation from emotional debates over hourly duration, factoring in three interrelated dimensions: the amount of work, technical complexity, and inherent uncertainty or risk. Teams frequently use the modified Fibonacci sequence (1, 2, 3, 5, 8, 13, 21) during planning poker sessions. By comparing new user stories against established benchmark tasks, developers reach rapid consensus on relative scope without getting bogged down in individual speed disparities.

## Technical definition
A dimensionless relative metric adopted by agile development squads to represent the composite effort, technical difficulty, and risk of an item in the product backlog.

## Examples
A team assigns 2 points to adding a database column and 8 points to rebuilding the checkout payment flow, acknowledging the latter involves higher complexity and third-party dependencies.
