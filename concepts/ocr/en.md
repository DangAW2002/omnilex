---
label: Optical character recognition (OCR)
aliases:
  - OCR
loanwords: []
autolink:
  aliases:
    OCR: always
plain_descriptions:
  - software that extracts editable text from scanned documents, receipts, or photos of signs
  - computational scanning that turns photographed printed words into machine-readable characters
summary: >-
  A computer vision technology that detects, segments, and converts printed, typed, or handwritten text inside visual images into machine-encoded editable text.
confusable_notes: {}
follow_up_questions:
  - How do text detection algorithms separate overlapping text lines in degraded paper scans?
  - What post-processing techniques resolve spelling confusions between visually similar glyphs?
translation: native
---

## Easy explanation
Think of taking a photo of a restaurant receipt and having an app immediately let you copy and paste the dishes and prices directly into a spreadsheet.

## Details
Optical character recognition bridges physical documentation and digital indexing through a two-stage computer vision workflow: text detection and text recognition. First, deep neural networks locate bounding polygons encircling individual text lines or words. Second, sequence recognition models—combining convolutional feature extractors with recurrent or transformer decoders—predict character glyph sequences, handling variations in font styling, skew angles, paper creases, and low contrast.

## Technical definition
The algorithmic identification, geometric segmentation, and translation of optical glyph patterns from bitmap images into standard character encoding formats.

## Examples
An accounts payable workflow ingests a scanned invoice image, detecting 35 line items and extracting the total payable amount of $4,250.00 in 200 milliseconds.
