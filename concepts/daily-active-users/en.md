---
label: "Daily active users (DAU)"
aliases:
  - "DAU"
loanwords:
  - "daily active users"
  - "dau"
autolink:
  aliases:
    DAU: always
plain_descriptions:
  - "count of unique people who open and interact with an application in a single day"
  - "vital metric tracking daily user volume and ongoing product engagement"
summary: "The total count of unique individuals who initiate a meaningful interaction with a software application within a 24-hour day."
confusable_notes: {}
follow_up_questions:
  - "How does dividing DAU by Monthly Active Users (MAU) calculate product stickiness?"
  - "Why must engineering teams establish a strict definition of what qualifying action counts as an active user event?"
translation: native
---

## Easy explanation
Think of DAU as the turnstile counter at the entrance of a public library: it registers each unique visitor who walks through the doors each day, counting each person only once regardless of how many books they check out.

## Details
Daily active users serves as a foundational measurement of user engagement and product growth. Crucially, tracking unique users rather than raw sessions or page views prevents heavy power users from artificially skewing activity totals. Teams must strictly define what constitutes an "active" interaction—such as sending a chat message or completing a transaction—rather than counting passive background app refreshes. Comparing DAU against Monthly Active Users (the DAU/MAU ratio) reveals product stickiness.

## Technical definition
A product analytics metric capturing the number of unique logged or verified individuals who complete at least one designated qualifying action within a calendar day.

## Examples
A social media platform logs 5 million DAU; if a user opens the mobile application twelve times throughout Monday, they are counted as exactly one unique daily active user.
