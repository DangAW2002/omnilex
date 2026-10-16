---
label: Model Context Protocol
aliases:
  - MCP
loanwords: []
autolink:
  aliases:
    MCP: always
plain_descriptions:
  - a standard plug that lets AI apps connect to tools and data
  - one common way for chatbots to talk to other software
summary: An open protocol that standardises how AI applications connect to external tools, data sources and workflows through MCP servers.
confusable_notes: {}
follow_up_questions:
  - What is the difference between an MCP host, client and server?
  - Why write an MCP server instead of a plugin for one app?
translation: native
---

## Easy explanation
It works like a standard wall socket: any appliance with the matching plug runs in any house, so a tool built once fits every compatible assistant.

## Details
MCP defines hosts (the AI application), the clients they run, and servers that offer tools, resources and prompt templates. A server is written once and works with every host that speaks the protocol, instead of one custom integration per app. Messages use JSON-RPC 2.0, sent over standard input/output to a local server process or over HTTP to a remote server.

## Technical definition
An open protocol through which AI applications reach outside systems: servers offer tools, resources and prompt templates, and client applications use them in one uniform way.

## Examples
A team installs an MCP server for its issue tracker; its coding assistant can then search and update tickets without a bespoke plug-in.
