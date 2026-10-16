---
label: Low-Rank Adaptation
aliases:
  - LoRA
loanwords: []
autolink:
  aliases:
    LoRA: always
plain_descriptions:
  - a cheap way to fine-tune by training only a small add-on
  - small adapter files that teach a big model a new skill
summary: A parameter-efficient fine-tuning method that freezes the original weights and trains small low-rank matrices that represent the weight update.
confusable_notes: {}
follow_up_questions:
  - Why is a LoRA adapter so much smaller than the base model?
  - Can several LoRA adapters share one base model?
translation: native
---

## Easy explanation
Like clipping a small lens onto a camera instead of rebuilding it: the body stays the same and the add-on changes the picture.

## Details
LoRA keeps the pre-trained weights fixed and, for selected layers, learns two small matrices whose product stands in for the needed weight change. Training needs far less memory, the result is a small adapter file, and different adapters can be swapped on one base model. For many tasks the quality comes close to full fine-tuning.

## Technical definition
A fine-tuning technique that adds trainable low-rank decomposition matrices to a frozen pre-trained model, greatly reducing the number of parameters to train.

## Examples
An image-generation community shares LoRA adapters of a few dozen megabytes, each teaching the same base model a particular art style.
