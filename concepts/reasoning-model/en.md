---
label: Reasoning model
aliases: []
loanwords: []
plain_descriptions:
  - an AI model that spends extra computational time thinking step-by-step before answering
  - an advanced language model trained to reason through complex math and logic puzzles internally
summary: A language model trained to produce intermediate reasoning tokens, often hidden or summarized for the user, to deliberate and verify multi-step plans before emitting final answers.
confusable_notes: {}
follow_up_questions:
  - How does inference-time compute scaling differ from standard pre-training compute scaling?
  - Why do reasoning models perform significantly better on formal logic, competitive programming, and math?
translation: native
---

## Easy explanation
Instead of blurting out the first word that pops into its head like someone guessing in a speed quiz, a reasoning model grabs a pencil, quietly works through scratch calculations in its head, double-checks its logic, and only then speaks the verified answer.

## Details
Unlike standard autoregressive models that generate output tokens immediately, reasoning models produce an internal chain-of-thought (often called thinking tokens or scratchpad reasoning) before providing user-visible output. Trained via reinforcement learning on verified outcomes, these models learn to break problems down, explore alternative solution paths, detect intermediate errors, and self-correct during the inference phase.

## Technical definition
A generative foundation model optimized through reinforcement learning to allocate variable test-time compute toward structured internal deliberation and logical verification before generating outputs.

## Examples
Asked to write a cryptographic verification routine, the model spends about fifteen seconds working through edge cases and checking its own intermediate steps before it returns the code, which is still worth reviewing and testing.
