---
label: Prompt caching
aliases: []
loanwords: []
plain_descriptions:
  - saving the unchanging start of a prompt so later calls are cheaper and faster
  - not paying full price to resend the same long instructions
summary: A provider feature that keeps the processed beginning of a prompt so later requests starting the same way cost less and answer faster.
confusable_notes: {}
follow_up_questions:
  - Why should the stable part of a prompt come first?
  - How long does a cached prefix usually stay available?
translation: native
---

## Easy explanation
Like a kitchen that prepares the base every order starts with in advance, so only the toppings are made when an order comes in.

## Details
Long system prompts, documents and tool definitions often stay identical across calls. With caching, the provider keeps the processed state of that opening part for a limited time; later requests that begin with exactly the same content reuse it and are billed at a lower rate. Any change inside the cached part means it must be processed again, so the stable content goes first.

## Technical definition
The reuse of previously computed model state for an identical prompt prefix across requests, reducing latency and the cost of input tokens.

## Examples
A support bot sends a 50-page product manual with every question; with caching, the first call writes the manual to the cache, and the calls that follow within its lifetime read it at a much lower price.
