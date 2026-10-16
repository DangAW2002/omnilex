---
label: System prompt
aliases: []
loanwords: []
plain_descriptions:
  - hidden instructions an app gives the AI before you start chatting
  - the rules that set an assistant’s role and tone
summary: Instructions placed before the conversation that set the model’s role, rules and style for every later message.
confusable_notes: {}
follow_up_questions:
  - Can a user override a system prompt?
  - What belongs in a system prompt rather than in a user message?
translation: native
---

## Easy explanation
It is like the briefing a new receptionist gets before the first visitor arrives: which company they represent, what they may promise and how formal to be.

## Details
Chat APIs keep a system message apart from the user and assistant turns. Developers use it for the assistant’s role, constraints, tone and background facts. Models usually give it more weight than ordinary user text, but it is not a security boundary: users can still try to override it through prompt injection.

## Technical definition
The instruction block supplied to a chat model outside the user turns, defining its role, behaviour and context for the whole conversation.

## Examples
An online bank’s chatbot is told in its system prompt to answer only about the bank’s cards, in Vietnamese, and to hand account questions to a human agent.
