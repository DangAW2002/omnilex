---
label: Function calling
aliases:
  - tool use
  - tool calling
loanwords: []
plain_descriptions:
  - letting the AI press buttons in other apps
  - the AI asking your code to fetch data or run an action
summary: A model capability to reply with a structured request to call a tool the developer defined; the app runs it and returns the result.
confusable_notes: {}
follow_up_questions:
  - Who actually runs the function the model asks for?
  - How does the Model Context Protocol relate to function calling?
translation: native
---

## Easy explanation
Think of a manager who cannot use the warehouse system but can fill in a request slip; a clerk carries it out and reports back.

## Details
The developer describes each tool with a name, what it is for and a JSON schema of its inputs. When a tool would help, the model answers with the tool name and arguments instead of plain text. The application executes the call and sends the result back, and the model uses it in its next turn. The model never runs code by itself.

## Technical definition
An interface in which a language model emits structured calls to externally defined functions that the client application executes, returning their outputs to the model.

## Examples
Asked “Will it rain in Đà Nẵng tomorrow?”, the model calls get_weather with the city and date, then answers from the forecast the app returns.
