---
label: Diffusion model
aliases: []
loanwords: []
plain_descriptions:
  - generative AI that creates crisp images by progressively cleaning up random visual noise
  - machine learning models that learn to reverse a gradual noise destruction process to synthesize pictures
summary: >-
  A class of generative neural networks trained to synthesize high-fidelity data, particularly images, by learning to iteratively reverse a progressive Markovian noise-diffusion process.
confusable_notes: {}
follow_up_questions:
  - How does operating within a compressed latent space accelerate diffusion model sampling?
  - Why does classifier-free guidance improve textual alignment in text-to-image synthesis?
translation: native
---

## Easy explanation
Think of looking at a photograph obscured by dense television static: step by step, an artist carefully cleans away the static until a clear, vivid image appears on the canvas.

## Details
Diffusion models synthesize data via a two-stage thermodynamic analogy. During the forward process, Gaussian noise is incrementally injected into a training sample until it degenerates into pure random noise. The neural network (typically a U-Net or transformer) is trained on the reverse process to predict and subtract the added noise conditioned on a text prompt or class embedding. Latent diffusion models execute this iterative denoising loop inside a compressed lower-dimensional latent space to minimize GPU latency.

## Technical definition
A parameterized generative model that estimates the score or reverse transition kernels of a continuous-time or discrete Markov chain that diffuses a data distribution into a tractable prior.

## Examples
A graphic designer enters a 10-word prompt, and a diffusion model runs 30 denoising iterations across a latent grid to generate a 1024x1024 high-resolution illustration in two seconds.
