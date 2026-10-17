---
label: Event sourcing
aliases:
  - Event-sourced persistence
loanwords: []
plain_descriptions:
  - storing every change to application state as an append-only sequence of immutable events
  - tracking full history like an accounting ledger rather than only keeping current values
summary: A persistence design pattern where all state changes are stored as an append-only, ordered sequence of immutable domain events instead of overwriting current entity records.
confusable_notes:
  cqrs: Event sourcing is a persistence model storing historical state mutations as an append-only event stream, whereas CQRS is an architectural separation of read and write models that often consumes those events to build query projections.
follow_up_questions:
  - How do snapshots prevent performance degradation when reconstructing aggregate entities with long event histories?
  - How should schema changes to historical event definitions be managed over time?
translation: native
---

## Easy explanation
Like a bank checking account: the bank does not merely store your current balance as a single number; it records every single deposit, withdrawal, and fee, and your balance is calculated by replaying the whole statement.

## Details
Traditional CRUD applications modify tables in place, obliterating the context and sequence of previous states. Event Sourcing models every domain alteration as an immutable past-tense event (AccountCreated, MoneyDeposited, AddressUpdated) appended sequentially to an event store. An aggregate current state is reconstructed by replaying its historical stream from the beginning or from a recent periodic snapshot. This architecture guarantees a complete, tamper-evident audit log and enables retroactive temporal querying.

## Technical definition
An architectural persistence pattern that guarantees atomic state transitions by recording state evolutions strictly as an immutable, linearly ordered series of domain events.

## Examples
A logistics tracking service persisting 50 individual checkpoint events for a single delivery package, allowing operators to replay the entire journey and reconstruct its state at any exact minute.
