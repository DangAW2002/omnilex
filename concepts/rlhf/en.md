---
label: Reinforcement learning from human feedback (RLHF)
aliases:
  - RLHF
loanwords: []
autolink:
  aliases:
    RLHF: always
plain_descriptions:
  - tuning language models using human preferences so they produce more helpful and safer responses
  - training AI using reward scores derived from human rankings of alternative model answers
summary: >-
  A post-training optimization technique that aligns large language model behaviors with human intentions by training a reward model on human comparative preferences and optimizing policy outputs via reinforcement learning.
confusable_notes: {}
follow_up_questions:
  - How does a reward model learn to score candidate model responses from pairwise comparisons?
  - Why is a Kullback-Leibler penalty incorporated into the policy optimization objective during RLHF?
translation: native
---

## Easy explanation
Picture an author writing two different drafts of an essay; human editors choose which draft is clearer and kinder, and a coach rewards the author whenever future writings mirror the chosen style.

## Details
RLHF bridges the gap between next-token prediction objectives and human expectations regarding helpfulness, accuracy, and safety. The pipeline proceeds in three phases: supervised fine-tuning (SFT) on curated demonstration data, training a scalar reward model on human pairwise rankings of candidate outputs, and optimizing the base policy using algorithms like Proximal Policy Optimization (PPO). A KL divergence penalty prevents the policy from drifting too far from the initial model distribution.

## Technical definition
A reinforcement learning fine-tuning framework wherein a policy model is optimized against an empirical reward model trained on human preference comparison datasets.

## Examples
Human evaluators compare 10,000 paired chatbot answers, rating concise responses higher than verbose ones, enabling an RLHF tuning run that lowers average response length by 25% while maintaining accuracy.
