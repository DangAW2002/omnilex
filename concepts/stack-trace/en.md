---
label: "Stack trace"
aliases: []
loanwords: []
plain_descriptions:
  - "report showing the active sequence of function calls at the moment an error occurred"
  - "diagnostic breadcrumb trail of source files and line numbers where a program crashed"
summary: "A diagnostic report detailing the active call stack frames, function names, and file line numbers at a specific moment during execution."
confusable_notes: {}
follow_up_questions:
  - "How do source maps reconstruct original TypeScript lines from minified production stack traces?"
  - "Why can deep asynchronous promise rejections lose call stack frames unless long stack traces are enabled?"
translation: native
---

## Easy explanation
Imagine a forensic investigator tracking footsteps backward from a broken window in a mansion. Tracing the footsteps reveals the path the intruder took: through the back garden, across the terrace, and originating at the outer front gate.

## Details
When an exception is thrown or a debugger pauses, the runtime inspects the execution call stack. It extracts the stack frames, listing the topmost function that raised the issue, followed by the caller function that invoked it, continuing down to the initial application entrypoint (such as `main`). Each frame in the report typically displays the module name, source code filename, and precise line and column numbers. Developers use this forensic trail to pinpoint exactly how application state traveled into an invalid branch.

## Technical definition
A serialized diagnostic listing of active activation frames currently resident on the thread call stack, mapping execution return addresses to source code routines and line coordinates.

## Examples
An application logs a stack trace during a crash: the top entry shows `parseJSON()` failed at `parser.js:45`, called by `handleRequest()` at `server.js:112`, pointing directly to the bad line.
