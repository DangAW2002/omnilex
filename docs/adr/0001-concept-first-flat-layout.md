# ADR 0001: Concept-First Flat Directory Layout

## Status
Accepted

## Context
Traditional terminology vocabularies frequently organize files hierarchically by domain folders (e.g., `finance/saving/compound-interest.yaml`). However:
1. Many vital concepts span multiple disciplines (e.g., `ROI` spans Finance and Digital Marketing; `Token` spans Security, AI, and Distributed Ledgers; `Cookie` spans Web Engineering and Digital Advertising).
2. Deep folder hierarchies lead to duplicated records or brittle symlinks.
3. Domain re-classifications cause breaking path mutations across Git history.

## Decision
We store all concepts in a flat directory structure directly under `concepts/<id>/`.
- The folder name strictly matches the immutable concept ID.
- Multi-domain membership is declared as an array in `concept.yaml` under `domains`.
- All domain browsing and hierarchical grouping are synthesized during build into `indexes/` and `dist/`.

## Consequences
### Positive
- A concept belonging to 3 domains is represented by a single file set without duplication.
- Domain taxonomy can be refactored without moving concept directories or altering git history.
- Concept IDs remain completely stable and permanent.

### Tradeoffs
- Browsing raw `concepts/` via a basic file explorer does not reflect taxonomy hierarchy (addressed by `indexes/` and the web UI).
