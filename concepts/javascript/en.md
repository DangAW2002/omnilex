---
label: "JavaScript"
aliases:
  - "JS"
loanwords: []
autolink:
  aliases:
    JS: always
plain_descriptions:
  - "the programming language that makes websites interactive and dynamic"
  - "the standard scripting engine running inside modern web browsers"
summary: "A dynamic multi-paradigm programming language featuring prototype inheritance that powers client-side web browser behavior."
confusable_notes:
  typescript: "JavaScript is dynamically typed and executed directly, whereas TypeScript adds static compile-time type checking before compiling to JavaScript."
follow_up_questions:
  - "How does JavaScript handle asynchronous tasks using the event loop?"
  - "What is prototype-based inheritance and how does it relate to ES6 class syntax?"
translation: native
---

## Easy explanation
If HTML is the frame of the car and CSS is the paint job, JavaScript is the engine and steering wheel that make the car move and respond to driver input.

## Details
JavaScript features dynamic typing, prototype-based object orientation, and asynchronous non-blocking I/O driven by an event loop. Standardized under the ECMAScript specification, it originally ran exclusively within client browsers to manipulate the DOM, validate forms, and execute animations. With runtimes such as Node.js, it now also powers backend web servers, desktop apps, and embedded scripting platforms.

## Technical definition
A multi-paradigm, dynamically typed, prototype-based scripting language adhering to ECMAScript standards with an event-driven single-threaded execution model.

## Examples
Adding an event listener document.querySelector("button").addEventListener("click", () => alert("Saved")) triggers an interactive popup when clicked by the user.
