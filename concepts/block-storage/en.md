---
label: Block storage
aliases: []
loanwords: []
plain_descriptions:
  - raw virtual hard disk volume attached directly to a cloud virtual machine
  - high-speed storage split into fixed-size blocks for databases and operating systems
summary: A storage architecture that splits data into evenly sized raw blocks, exposed as virtual disk volumes attached to compute instances for high-speed I/O.
confusable_notes:
  object-storage: Block storage acts as raw local hard disk partitions for operating systems and databases, whereas object storage stores discrete web-accessible files via HTTP APIs.
follow_up_questions:
  - How do provisioned IOPS (input/output operations per second) and throughput limits govern database performance on block storage volumes?
  - How do point-in-time snapshots of block volumes enable backup and disaster recovery across availability zones?
translation: native
---

## Easy explanation
Like plugging an external solid-state drive (SSD) directly into your laptop’s USB port: the operating system formats it with a file system like ext4 or NTFS and reads raw sectors at high speed.

## Details
Block storage decouples physical storage drives from compute hosts via high-speed storage area networks (SAN). Virtual machines attach block volumes as virtual block devices (such as /dev/xvdf). The guest operating system writes filesystem structures or database pages directly into individual 4 KB or 512-byte blocks with low latency and dedicated IOPS guarantees.

## Technical definition
A storage technology that presents raw block-level storage volumes across a storage network protocol (such as NVMe-over-Fabrics or iSCSI) to compute instances, allowing operating systems to manage partitions and filesystem structures directly.

## Examples
A production PostgreSQL database runs on a cloud instance with an attached 500 GB block storage volume provisioned with 3,000 IOPS to ensure low write latency for transactional queries.
