---
label: "Document Object Model (DOM)"
aliases:
  - "DOM"
loanwords: []
autolink:
  aliases:
    DOM: always
plain_descriptions:
  - "the internal tree structure of a webpage that scripts can read and change"
  - "the programming interface representing webpage elements as interactive objects"
summary: "A cross-platform, language-independent programming interface that treats an HTML or XML document as a tree structure of nodes."
confusable_notes: {}
follow_up_questions:
  - "Why can frequent direct DOM manipulation cause layout thrashing and performance lag?"
  - "How does a Virtual DOM mitigate costly real DOM update cycles?"
translation: native
---

## Easy explanation
The DOM is like an interactive family tree of your webpage: every section, box, button, and sentence is a member node that you can reach, rename, or reorder.

## Details
When a browser downloads an HTML file, its rendering engine parses the tags into an in-memory hierarchical tree of node objects. Each node exposes properties, methods, and event handlers accessible via JavaScript (e.g., document.getElementById, element.appendChild). This programmatic interface enables dynamic DOM mutations, such as inserting new cards, toggling CSS classes, or removing form fields without triggering full-page browser reloads.

## Technical definition
An object-oriented API representing document content and structure as a tree of node objects with standardized traversal and manipulation methods.

## Examples
Executing const heading = document.createElement("h2"); heading.textContent = "New Item"; document.body.appendChild(heading); dynamically appends a new title into the document.
