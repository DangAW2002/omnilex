---
label: SQL injection
aliases:
  - SQLi
loanwords: []
plain_descriptions:
  - a security hack where attackers trick a website into running rogue database commands
  - typing malicious sql codes into login forms to steal data or bypass passwords
summary: A web security vulnerability that allows an attacker to interfere with backend database queries by injecting malicious SQL statements into input fields.
confusable_notes: {}
follow_up_questions:
  - How do parameterized queries and prepared statements completely neutralize SQL injection risks?
  - What is blind SQL injection and how do attackers extract data through timing delays?
translation: native
---

## Easy explanation
Like filling out a paper form where, in the name box, someone writes "Tear up this contract and give me all the money," and an automated scanner obediently follows those written instructions.

## Details
SQL injection happens when untrusted user input is directly concatenated into dynamic SQL queries without sanitization or parameter binding. Attackers inject operators like `' OR '1'='1` to bypass authentication, read sensitive records, modify stored data, or drop entire tables.

## Technical definition
A code injection technique exploiting lack of input validation and parameterized queries, allowing unauthorized execution of arbitrary SQL syntax within a relational database.

## Examples
Entering `' OR 1=1; --` into a login username box to bypass authentication checks and log in as the administrator.
