---
label: Single sign-on (SSO)
aliases:
  - SSO
loanwords: []
autolink:
  aliases:
    SSO: always
plain_descriptions:
  - logging into multiple applications using just one set of credentials
  - signing in once to unlock access across all work tools
summary: An authentication scheme that allows a user to log in once and gain access to multiple connected applications without re-entering credentials.
confusable_notes: {}
follow_up_questions:
  - Why does SSO increase the importance of multi-factor authentication on the identity provider?
  - What security trade-offs arise when an identity provider experiences an outage?
translation: native
---

## Easy explanation
Think of a theme park all-day wristband: instead of purchasing and showing a separate ticket at every single roller coaster and ride, you buy one wristband at the main entrance gate and show it to board every attraction.

## Details
Single sign-on establishes a trust relationship between a central Identity Provider (IdP) and multiple Service Providers (SPs). When a user requests access to an application, the service redirects the user to the IdP. The IdP verifies credentials once, creates an authenticated session, and returns a cryptographically signed assertion or token to the service provider. SSO drastically reduces password fatigue, eliminates repeated login prompts, and centralizes account revocation when employees depart.

## Technical definition
A centralized credential management mechanism in which a single authentication event enables seamless access to multiple independent software systems across security domains.

## Examples
An employee signs into their company Google Workspace account in the morning and automatically gains access to Slack, Jira, and GitHub without typing their password again.
