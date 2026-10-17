---
label: "Hydration"
qualifier: "(Web)"
aliases:
  - "client-side hydration"
loanwords: []
autolink:
  label: auto
plain_descriptions:
  - "attaching click listeners and interactivity to a pre-rendered HTML page"
  - "the process of bringing static server HTML to life with client JavaScript"
summary: "The client-side process where framework JavaScript attaches event listeners and state management to server-rendered HTML markup."
confusable_notes: {}
follow_up_questions:
  - "What causes hydration mismatch warnings between server output and client rendering?"
  - "How do partial hydration and island architecture minimize JavaScript overhead?"
translation: native
---

## Easy explanation
Imagine receiving a frozen toy robot in the mail: it already looks like a robot, but you have to pour warm water over it (add JavaScript) so its gears turn and buttons click.

## Details
When server-rendered HTML arrives in the browser, the content is visually complete but inert; button clicks and state changes do not respond yet. The client-side framework script executes, walks the existing DOM tree, verifies that nodes match the virtual component tree, attaches event listeners, and initializes local state. Once hydration completes, the page functions as a responsive single-page application.

## Technical definition
A client-side reconciliation step where a frontend runtime binds event listeners, virtual DOM nodes, and component state to pre-existing server-rendered DOM elements.

## Examples
A server delivers a static shopping cart button; after 200ms of hydration script execution, clicking the button triggers the interactive checkout drawer without reloading.
