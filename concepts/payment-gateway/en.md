---
label: Payment gateway
aliases: []
loanwords: []
plain_descriptions:
  - online checkout service that securely charges credit cards and digital wallets
  - digital intermediary passing customer payment details safely to banks
summary: A technology service that authorizes online credit card and digital payment transactions between e-commerce merchants and financial networks.
confusable_notes: {}
follow_up_questions:
  - What role does tokenization play in keeping payment gateways PCI-DSS compliant?
  - How does a payment gateway differ from a merchant acquiring account?
translation: native
---

## Easy explanation
A payment gateway is the secure digital cashier for an online storefront. When you type in your debit card number during checkout, it encrypts your information, asks the bank if you have enough money, and tells the store if the payment succeeded.

## Details
Payment gateways act as encrypted bridges between shopping carts and acquiring merchant banks. During a checkout call, the gateway validates card numbers, applies fraud detection checks, requests customer authentication via 3D Secure, and routes authorization requests to card networks. To minimize merchant compliance risk, modern gateways return randomized tokens so website servers never store raw sensitive card details.

## Technical definition
A cloud application service and API intermediary that captures, tokenizes, and routes encrypted customer payment credentials to financial card networks for authorization and settlement.

## Examples
An online fashion boutique uses an integrated payment gateway API to charge customer credit cards and accept QR code wallet payments during flash sale promotions.
