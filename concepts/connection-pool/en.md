---
label: Connection pool
aliases:
  - database connection pool
loanwords: []
plain_descriptions:
  - a shared cache of open database connections ready for apps to use without reconnecting
  - keeping pre-warmed database lines open so web requests avoid slow network handshakes
summary: A cache of open, reusable database connection objects maintained so that applications avoid the high overhead of establishing new connections for each request.
confusable_notes: {}
follow_up_questions:
  - Why does opening a fresh TCP and TLS connection to a database introduce significant latency overhead?
  - What parameters, like maximum pool size and idle connection timeouts, prevent pool exhaustion under load?
translation: native
---

## Easy explanation
Like a taxi rank at an airport terminal: several taxis sit idling in line with their engines running, allowing arriving passengers to hop in immediately without waiting 15 minutes for a cab to drive over from across town.

## Details
Creating a new database connection involves expensive operating system operations: TCP handshakes, TLS negotiation, authentication verification, and memory allocation on the database server. A connection pool initializes a fixed set of connections during application startup. When application threads execute queries, they borrow an idle connection from the pool, run the query, and return the connection object back to the pool for reuse.

## Technical definition
A software resource management design pattern that maintains an active pool of pre-established, reusable database network connections to minimize connection initialization latency.

## Examples
A web application uses a HikariCP connection pool of 20 active connections, serving 5,000 HTTP requests per minute without having to initiate a new database handshake for every API call.
