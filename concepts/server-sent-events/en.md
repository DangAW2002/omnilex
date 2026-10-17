---
label: Server-sent events (SSE)
aliases:
  - SSE
  - EventSource API
loanwords: []
autolink:
  aliases:
    SSE: always
plain_descriptions:
  - server pushing automatic live text updates to a web browser over a single HTTP connection
  - one-way streaming protocol delivering real-time events from server to client
summary: A web technology where a browser client receives automatic real-time event streams from a server over an open standard HTTP connection.
confusable_notes:
  websocket: Server-Sent Events provides a lightweight, unidirectional stream from server to client over plain HTTP with built-in reconnection, whereas WebSocket offers bidirectional, binary communication requiring a distinct protocol.
follow_up_questions:
  - Why is SSE exceptionally well-suited for streaming tokens from large language model inferences?
  - How does HTTP/2 multiplexing resolve the browser connection limit constraint inherent to SSE over HTTP/1.1?
translation: native
---

## Easy explanation
Like a stock ticker display in a newsroom: the ticker screen remains on, and the wire service continuously prints out fresh stock prices and news alerts as soon as they break.

## Details
Server-Sent Events (SSE) defines an HTTP-based standard where a client initiates a persistent GET request specifying the text/event-stream MIME type. The server leaves the connection open and pushes text events formatted with field prefixes like data:, event:, and id:. The browser native EventSource API parses incoming events automatically and handles connection drops with built-in automatic reconnects and last-event-ID resumption. Unlike WebSockets, SSE works seamlessly through corporate firewalls and load balancers without special protocol upgrades.

## Technical definition
A unidirectional HTTP streaming specification that enables servers to push asynchronously generated UTF-8 text records to client user agents over a single persistent channel.

## Examples
An AI chat assistant streaming generated answer tokens one word at a time over an SSE connection, delivering immediate visual feedback to the user as inference progresses.
