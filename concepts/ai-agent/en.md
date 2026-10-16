---
label: Agent
qualifier: (AI)
aliases:
  - AI agent
loanwords: []
autolink:
  label: never
plain_descriptions:
  - an AI system that plans steps and uses tools to achieve goals independently
  - a software assistant that observes its environment, takes actions, and completes tasks
summary: An autonomous AI system that reasons over objectives, breaks goals into sequential steps, and interacts with tools and environments to complete tasks.
confusable_notes: {}
follow_up_questions:
  - How do agents maintain goal progress across multi-step execution loops?
  - What safety mechanisms prevent autonomous agents from triggering unintended side effects?
translation: native
---

## Easy explanation
Unlike a simple calculator that answers only when prompted, an agent acts like an autonomous administrative assistant: you give it a goal, and it looks up schedules, books flight tickets, checks hotel reviews, and handles follow-ups on its own.

## Details
An AI agent couples a foundation model core with external affordances: planning mechanisms, memory modules, and tool interfaces (APIs, web browsers, bash environments). Driven by an agentic loop, it perceives environmental feedback, deliberates on next actions, invokes functions, and assesses whether intermediate milestones satisfy the overarching goal before yielding a final status.

## Technical definition
An autonomous decision-making computational entity that processes state observations, formulates action sequences via policy inference, and executes tool calls to attain designated objectives.

## Examples
A coding assistant agent reading an error log from a continuous integration runner, locating the offending source file, writing a unit test, patching the bug, and verifying the fix.
