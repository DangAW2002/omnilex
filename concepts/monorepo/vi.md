---
label: "Monorepo"
aliases:
  - "Kho mã nguồn duy nhất"
loanwords:
  - "monorepo"
plain_descriptions:
  - "lưu trữ nhiều dự án, ứng dụng và thư viện dùng chung trong cùng một kho mã nguồn duy nhất"
  - "cách tổ chức mã nơi tất cả dịch vụ của công ty nằm chung trong một kho Git"
summary: "Chiến lược kiến trúc lưu trữ mã nguồn nơi nhiều dự án, ứng dụng và gói thư viện dùng chung được quản lý tập trung bên trong một kho lưu trữ phiên bản duy nhất."
confusable_notes:
  {}
follow_up_questions:
  - "Những công cụ nào (như bộ đệm bản dựng và điều phối tác vụ) là cần thiết để giữ tốc độ làm việc khi monorepo phình to?"
  - "Việc phân quyền truy cập mã và triển khai độc lập trong monorepo khác gì so với mô hình đa kho mã (polyrepo)?"
translation: translated
translated_from: en
translated_by: ai
translated_at: '2026-10-16'
---

## Giải thích dễ hiểu
Lưu toàn bộ hồ sơ, hợp đồng và tài liệu của tất cả các phòng ban trong một cuốn sổ cái tập trung thay vì để rải rác ở hàng chục ngăn kéo khác nhau.

## Chi tiết
Trong cấu trúc monorepo, việc chia sẻ thư viện giữa các ứng dụng diễn ra trực tiếp qua liên kết không gian làm việc cục bộ mà không cần tải lên các máy chủ thư viện công khai. Cách tổ chức này giúp việc tái cấu trúc mã toàn diện diễn ra an toàn trong một lượt commit. Dẫu vậy, khi quy mô lớn, monorepo đòi hỏi các công cụ hỗ trợ xây dựng nâng cao (như Turborepo, Nx, Bazel) để tối ưu bộ nhớ đệm và thời gian chạy CI.

## Định nghĩa chuyên ngành
Cấu trúc lưu trữ mã nguồn trong đó nhiều đơn vị phần mềm, vi dịch vụ và thư viện nội bộ có ranh giới kiến trúc độc lập được đặt chung trong một cây quản lý phiên bản.

## Ví dụ
Một công ty công nghệ đặt cả ứng dụng web React, ứng dụng di động Flutter và dịch vụ backend Node.js trong một kho Git duy nhất được điều phối bằng Turborepo.
