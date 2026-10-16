---
label: Object detection
aliases: []
loanwords: []
plain_descriptions:
  - an AI vision task that identifies multiple items in a photo and draws bounding boxes around them
  - finding where objects are located in an image and labeling each one
summary: A computer vision technique that simultaneously identifies the semantic class and spatial coordinates of multiple individual objects within an image.
confusable_notes:
  image-classification: Image classification assigns one overall label to an entire picture, whereas object detection identifies multiple entities and pinpoints their exact bounding box coordinates.
follow_up_questions:
  - What are the operational trade-offs between two-stage detectors (like Faster R-CNN) and single-stage detectors (like YOLO)?
  - How does non-maximum suppression (NMS) clean up duplicate overlapping bounding boxes?
translation: native
---

## Easy explanation
If image classification is saying "this street has cars and people," object detection is drawing red boxes around all five pedestrians and green boxes around all three cars, showing exactly where each one is on the road.

## Details
Object detection combines classification with spatial localization. For each recognized instance, models output a class label, confidence probability, and bounding box coordinates (typically x, y, width, height). Architectures divide into two-stage detectors (like Faster R-CNN, prioritizing precision) and single-stage detectors (like YOLO or SSD, optimized for real-time video inference). Modern architectures increasingly leverage transformer backbones (DETR) to predict bounding boxes directly without anchor heuristics.

## Technical definition
A computer vision task that predicts bounding box coordinate tuples and associated categorical probability vectors for multiple discrete object instances within a visual scene.

## Examples
An autonomous delivery drone camera detecting pedestrians, utility poles, and parked bicycles in real-time video frames to navigate safely around obstacles.
