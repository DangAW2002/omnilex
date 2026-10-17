---
label: Reinforcement learning
aliases:
  - RL
loanwords: []
autolink:
  aliases:
    RL: always
plain_descriptions:
  - training an AI agent to make decisions through trial and error guided by rewards and penalties
  - machine learning where an algorithm learns optimal behaviors by interacting with an environment
summary: >-
  A machine learning paradigm where an autonomous agent learns to select sequential actions in an environment to maximize cumulative scalar reward signals over time.
confusable_notes: {}
follow_up_questions:
  - How do reinforcement learning algorithms navigate the exploration versus exploitation tradeoff?
  - Why does reward shaping become critical in environments with sparse delayed feedback?
translation: native
---

## Easy explanation
Think of training a puppy: when it performs a desired trick it receives a tasty treat, and when it misbehaves it gets nothing, gradually learning which actions earn the most treats.

## Details
Reinforcement learning models decision-making using Markov Decision Processes (MDPs), defined by state spaces, action spaces, transition dynamics, and reward functions. Unlike supervised paradigms that receive instant correct answers, the RL agent encounters delayed feedback and must balance exploration (trying new actions to gather information) with exploitation (executing proven high-reward actions). Prominent algorithms include Q-learning, Policy Gradients, and Proximal Policy Optimization (PPO).

## Technical definition
An algorithmic framework for learning an optimal policy that maps environmental states to action distributions in order to maximize expected discounted cumulative returns.

## Examples
A robotic cooling controller tests small fan adjustments in a server room every minute, learning over 30 days to reduce electricity consumption by 15% while keeping temperatures within 22°C.
