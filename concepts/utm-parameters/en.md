---
label: UTM parameters
aliases:
  - UTM codes
  - UTM tags
  - Urchin Tracking Module parameters
loanwords: []
plain_descriptions:
  - extra text tags added to the end of a web link to track where visitors came from
  - snippets of code in a URL showing which specific ad or post generated a click
summary: Five standardized query parameters appended to URLs that allow analytics platforms to track the source, medium, and campaign details of inbound web traffic.
confusable_notes: {}
follow_up_questions:
  - What are the differences between utm_source, utm_medium, and utm_campaign?
  - Why is consistent parameter naming and case normalization essential for clean campaign attribution?
translation: native
---

## Easy explanation
Think of a return mailing envelope printed with a tiny colored stamp indicating whether it came from a newspaper coupon, a street flyer, or a magazine insert so the postal clerk knows exactly which advertisement prompted the reply.

## Details
Named after the Urchin Tracking Module (the web analytics technology acquired by Google in 2005 that formed the foundation of Google Analytics), UTM parameters are key-value pairs appended after a question mark (`?`) in a target URL. Standard implementations employ five primary dimensions: `utm_source` (identifying the referring platform, such as newsletter or facebook), `utm_medium` (the marketing channel type, such as cpc, email, or social), `utm_campaign` (the specific promotion name), `utm_term` (paid search keywords), and `utm_content` (differentiating specific links or creative variations within the same ad). When a visitor clicks a tagged link, analytics scripts parse these parameters, attributing session performance and revenue back to exact promotional activities.

## Technical definition
Standardized URL query string key-value attributes consumed by web analytics telemetry engines to populate multi-channel campaign attribution dimensions upon HTTP request parsing.

## Examples
A marketing agency promotes a seasonal sale on social media by sharing a link structured as `https://example.com/shop?utm_source=facebook&utm_medium=paid-social&utm_campaign=summer-sale-2026`, enabling analytics reports to isolate sales driven specifically by that campaign.
