---
label: "Edge AI"
aliases:
  - "Edge Artificial Intelligence"
  - "On-device AI"
loanwords:
  - "edge ai"
plain_descriptions:
  - "running artificial intelligence models locally on devices without sending raw data to remote servers"
  - "executing neural network inferences directly on microchips attached to cameras and sensors"
summary: "The execution of artificial intelligence algorithms and deep learning models directly on physical edge hardware without dependency on cloud infrastructure."
confusable_notes:
  fog-computing: "Edge AI focuses specifically on hosting and executing machine learning models directly on localized hardware for inference, whereas fog computing is a comprehensive multi-tier networking and compute architecture handling general workloads."
follow_up_questions:
  - "How do 8-bit integer quantization (INT8) and weight pruning allow neural networks to fit within embedded microcontroller SRAM?"
  - "What latency and privacy advantages does local Edge AI computer vision provide for autonomous drones?"
translation: native
---

## Easy explanation
Like having an experienced inspector with a trained eye standing right inside the camera lens inspecting manufactured parts instantly, rather than mailing photos of every single bolt to headquarters for someone to look at.

## Details
Edge AI shifts the inference stage of machine learning from high-powered cloud clusters to specialized embedded silicon, such as Neural Processing Units (NPUs), embedded GPUs, and microcontrollers. Through optimization techniques including post-training quantization (reducing FP32 weights to INT8), model distillation, and tensor pruning, convolutional and transformer architectures run within strict power envelopes under ten watts. Running models locally guarantees deterministic response times under ten milliseconds, safeguards sensitive video feeds against cloud data breaches, and maintains complete operational autonomy during network disconnects.

## Technical definition
The deployment and execution of trained machine learning inference pipelines natively on localized processing hardware embedded within or positioned adjacent to physical endpoints.

## Examples
A highway speed monitoring system uses on-device Edge AI cameras with integrated NPUs to recognize license plates and detect reckless lane changes in real time without streaming raw video to a central cloud server.
