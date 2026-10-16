---
label: "RICE scoring"
aliases:
  - "RICE"
loanwords:
  - "rice scoring"
  - "rice"
autolink:
  aliases:
    RICE: always
plain_descriptions:
  - "formula to rank features by multiplying reach, impact, and confidence, then dividing by effort"
  - "scoring model helping product managers objectively decide which projects deliver the highest return on investment"
summary: "A quantitative prioritization framework that scores potential initiatives by multiplying Reach, Impact, and Confidence and dividing by Effort."
confusable_notes:
  moscow-method: "RICE calculates a numerical priority score using a mathematical formula, while MoSCoW sorts requirements into qualitative categorical buckets."
follow_up_questions:
  - "How does factoring in a confidence rating minimize subjective bias when evaluating high-impact ideas?"
  - "What units of measurement are commonly applied to estimate effort in the RICE denominator?"
translation: native
---

## Easy explanation
Think of RICE scoring as deciding which household renovation to tackle first: you calculate how many family members use the room (Reach), how much better it makes daily life (Impact), how sure you are about the costs (Confidence), and divide that by the weekends of labor required (Effort).

## Details
Developed by messaging platform Intercom, the RICE model brings mathematical rigor to backlog prioritization. The components include:
- Reach: The number of users affected over a specific timeframe (e.g., customers per quarter).
- Impact: The degree of value delivered to individual users, scored on a fixed scale where 3 means massive impact, then 2 (high), 1 (medium), 0.5 (low) and 0.25 (minimal).
- Confidence: A percentage score (100% for high data backing, 80% for medium, 50% for low) mitigating optimism bias.
- Effort: Total person-months or weeks required across product, design, and engineering teams.
The composite score equals (Reach × Impact × Confidence) / Effort.

## Technical definition
A quantitative decision-making algorithm in product management that ranks prospective initiatives by dividing the product of Reach, Impact, and Confidence by estimated Effort.

## Examples
An initiative reaching 2,000 customers with massive impact (3) and 80% confidence requiring 2 person-months yields a score of (2000 × 3 × 0.8) / 2 = 2,400 points, winning out over lower-scoring proposals.
