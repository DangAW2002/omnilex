---
label: Subagent
aliases: []
loanwords: []
plain_descriptions:
  - a specialized helper AI spawned by a main agent to handle a specific subtask
  - a secondary AI assistant focused on one piece of a larger project
summary: A specialized agent spawned and coordinated by a primary supervisor agent to execute an isolated, narrow task within a multi-agent system.
confusable_notes: {}
follow_up_questions:
  - How does delegating tasks to subagents prevent primary context window pollution?
  - What coordination protocols enable reliable handoffs between parent agents and subagents?
translation: native
---

## Easy explanation
If the primary agent is a general contractor managing a home renovation, subagents are the specialized electrician, plumber, and painter called in to complete specific jobs without worrying about the whole house schedule.

## Details
In multi-agent architectures, complex goals often overwhelm a single context window. A primary agent decomposes requirements into modular tasks and orchestrates specialized subagents with isolated prompt contexts, dedicated toolsets, and scoped system instructions. Subagents execute their assignment, report structured findings back to the supervisor, and terminate, keeping the primary agent's token budget focused and unpolluted.

## Technical definition
A subsidiary computational agent instantiated by a supervisory orchestrator, operating within an isolated context envelope to solve a delimited functional subproblem.

## Examples
A lead documentation agent spawning a dedicated subagent to grep through a repository codebase and extract API route definitions, returning only the final summary table.
