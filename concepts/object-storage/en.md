---
label: Object storage
aliases: []
loanwords: []
plain_descriptions:
  - flat cloud file storage accessible over web HTTP using unique keys
  - storing photos, videos, and backups as discrete objects without directory hierarchies
summary: A scalable storage architecture that manages data as distinct objects paired with rich metadata and a unique identifier in a flat address space accessed via HTTP APIs.
confusable_notes:
  block-storage: Object storage stores whole discrete files with metadata accessed via HTTP APIs, whereas block storage provides raw disk sectors attached directly to virtual machines as local drives.
follow_up_questions:
  - How does eventual consistency or strong read-after-write consistency affect distributed object storage operations?
  - What lifecycle tiering policies help organizations transition infrequently accessed objects to cold archive storage?
translation: native
---

## Easy explanation
Like a coat check room at a theatre: you hand over your jacket and receive a numbered plastic token; when you return, you present the token to retrieve the exact jacket without knowing which rack it hung on.

## Details
Unlike hierarchical file systems (with folders and directories) or block storage (with raw sector blocks), object storage organizes unstructured data into flat buckets. Each object comprises the raw data payload, an extensible set of custom metadata tags, and a globally unique key. Access occurs over standard RESTful HTTP methods (GET, PUT, DELETE), providing limitless horizontal scalability.

## Technical definition
A distributed data storage architecture managing unstructured binary payloads as immutable discrete objects within a flat namespace, utilizing HTTP REST endpoints for programmatic storage, retrieval, and access control.

## Examples
A media streaming platform uploads millions of video thumbnail images to an Amazon S3 bucket, fetching each image via HTTPS URL (like https://bucket.s3.amazonaws.com/thumbs/vid123.jpg) across a global content delivery network.
