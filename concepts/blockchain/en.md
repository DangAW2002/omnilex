---
label: Blockchain
aliases:
  - distributed ledger technology
  - DLT
loanwords: []
plain_descriptions:
  - a shared digital record book where transactions are grouped into blocks and locked together cryptographically
  - a decentralized ledger maintained by a network of computers rather than a central server or bank
summary: A decentralized, tamper-resistant digital ledger of transactions recorded cryptographically in linked chronological blocks across a distributed network.
confusable_notes: {}
follow_up_questions:
  - How do consensus mechanisms like proof of work and proof of stake secure a blockchain network?
  - What is the difference between permissionless public blockchains and private permissioned enterprise ledgers?
translation: native
autolink:
  aliases:
    DLT: always
---

## Easy explanation
A blockchain is like a shared digital notebook that hundreds of people keep identical copies of: whenever someone writes down a verified payment, every person updates their copy at the same time, making it impossible for any single individual to secretly erase or fake an entry.

## Details
A blockchain groups validated transaction data into sequential structures called blocks. Each block contains a cryptographic hash of the preceding block, a timestamp, and a Merkle tree of recent transactions. This chaining structure creates an immutable historical audit trail, because modifying any historical record requires recalculating every subsequent hash across the network. Nodes achieve synchronization and reject double-spending attacks through distributed consensus protocols (such as Proof of Work or Proof of Stake). Blockchains can also execute self-enforcing smart contracts directly on-chain without intermediaries.

## Technical definition
A distributed database maintaining an append-only sequence of cryptographically linked data blocks validated through a decentralized consensus mechanism across independent network peers.

## Examples
The Bitcoin network records peer-to-peer monetary transfers across thousands of global validating nodes, minting a new block roughly every ten minutes that references the cryptographic header of the prior block.
