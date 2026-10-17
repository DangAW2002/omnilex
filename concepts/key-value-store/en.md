---
label: Key-value store
aliases:
  - KV store
  - key-value database
loanwords: []
plain_descriptions:
  - a simple, ultra-fast database that saves and looks up records using unique label keys
  - a digital dictionary storage where you provide a word tag to get the matching value instantly
summary: A high-performance NoSQL database model utilizing a direct associative array data model where every data item is indexed by a distinct key.
confusable_notes: {}
follow_up_questions:
  - How do in-memory hash tables give key-value stores constant-time O(1) read operations?
  - When should architects transition from a simple key-value store to a document or relational database?
translation: native
---

## Easy explanation
Like a coat check room at a theatre: you hand over your jacket and receive a numbered plastic ticket (the key). Later, you present the ticket to get your exact jacket back immediately, without the attendant knowing or caring what is inside your pockets.

## Details
Key-value stores represent the simplest NoSQL data model. Data is stored as an arbitrary, opaque blob (the value) associated with a unique string or binary identifier (the key). The database does not inspect or enforce schemas on values, allowing operations (GET, SET, DELETE) to achieve constant-time O(1) performance and enabling seamless horizontal partitioning via consistent hashing.

## Technical definition
A non-relational storage system that maps unique cryptographic or string keys to opaque or typed data payloads, optimized for high-throughput single-key CRUD lookups.

## Examples
A shopping website saves user active session tokens and shopping cart contents in a key-value store under keys formatted like session:user_8912, retrieving carts in 1 millisecond.
