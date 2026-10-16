---
label: Quantization
qualifier: (AI)
aliases: []
loanwords: []
plain_descriptions:
  - compressing an AI model by using fewer bits to store each number
  - reducing model precision from 16-bit floats to 8-bit or 4-bit integers to save memory
summary: A model compression technique that maps high-precision numerical weights to lower-bit representations to reduce memory footprint and boost inference speed.
confusable_notes: {}
follow_up_questions:
  - What is the difference between Post-Training Quantization (PTQ) and Quantization-Aware Training (QAT)?
  - How much accuracy does a modern LLM typically sacrifice when quantized from 16-bit to 4-bit?
translation: native
---

## Easy explanation
Instead of writing down your measurements with eight decimal places on huge poster boards, you round them to the nearest half-inch on index cards, fitting four times as much information into your pocket with negligible loss in practical accuracy.

## Details
Deep neural models traditionally store parameter weights as 32-bit (FP32) or 16-bit (FP16/BF16) floating-point numbers. Quantization compresses these tensors into lower-precision formats such as INT8, INT4, or specialized floating formats like FP8. This reduces memory bandwidth requirements, shrinks disk and VRAM footprints, and leverages specialized integer arithmetic hardware units for faster execution. Techniques include Post-Training Quantization (PTQ) and Quantization-Aware Training (QAT).

## Technical definition
The mathematical mapping of continuous or high-bitwidth parameter tensors into discrete low-bitwidth representations through clipping, scaling, and zero-point calibration.

## Examples
Compressing a 70-billion parameter language model from 140 GB in 16-bit precision down to under 40 GB using 4-bit quantization so it runs locally on a single workstation GPU.
