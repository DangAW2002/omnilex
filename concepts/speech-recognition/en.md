---
label: Speech recognition
aliases:
  - ASR
loanwords: []
autolink:
  aliases:
    ASR: always
plain_descriptions:
  - software capability that converts spoken words and voice audio into written digital text
  - automated voice-to-text transcription technology used in dictation and virtual assistants
summary: >-
  An artificial intelligence capability that processes acoustic audio signals to accurately transcribe human spoken vocabulary into digital text representations.
confusable_notes: {}
follow_up_questions:
  - How do acoustic models separate phonetic sounds from background ambient noise?
  - Why are end-to-end neural transducers preferred over modular acoustic-language pipelines?
translation: native
---

## Easy explanation
Think of an attentive stenographer living inside your phone that listens to your voice through the microphone and instantly types out every spoken sentence on screen.

## Details
Automatic speech recognition (ASR) operates by sampling continuous analog sound waves into discrete frequency spectrograms. Historically, systems coupled separate acoustic models, pronunciation lexicons, and n-gram language decoders. Modern implementations employ unified end-to-end deep learning networks—such as Connectionist Temporal Classification (CTC), recurrent neural transducers, and attention-based encoder-decoders—that directly map acoustic features to character or subword sequences while mitigating speaker accent variability and ambient reverberation.

## Technical definition
The computational conversion of raw continuous acoustic waveforms into structured textual orthography using statistical acoustic, phonetic, and language modeling.

## Examples
A medical dictation app listens to a physician speaking for 60 seconds and converts the recorded clinical audio into a structured 120-word patient progress note with zero misspellings.
