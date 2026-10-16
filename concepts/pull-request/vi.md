---
label: "Pull request (PR)"
aliases:
  - "PR"
  - "Pull request"
  - "Yêu cầu hợp nhất mã"
loanwords:
  - "pull request"
  - "PR"
autolink:
  aliases:
    PR: always
plain_descriptions:
  - "lời đề nghị chính thức gửi đồng nghiệp xem xét để gộp nhánh tính năng vào mã nguồn chung"
  - "giao diện trực tuyến hiển thị các thay đổi mã nguồn cần trao đổi và duyệt trước khi hợp nhất"
summary: "Cơ chế trên các nền tảng quản lý mã nguồn phân tán cho phép lập trình viên thông báo về các thay đổi trên nhánh làm việc và yêu cầu rà soát trước khi gộp vào nhánh đích."
confusable_notes:
  {}
follow_up_questions:
  - "Các chiến lược hợp nhất như squash merge, rebase merge hay merge commit phù hợp với những quy trình làm việc nào?"
  - "Các bài kiểm tra CI/CD tự động bảo vệ pull request khỏi nguy cơ hỏng bản dựng ra sao?"
translation: translated
translated_from: en
translated_by: ai
translated_at: '2026-10-16'
---

## Giải thích dễ hiểu
Gửi bản thảo bài làm nhóm cho nhóm trưởng kiểm tra và ký duyệt trước khi dán vào báo cáo tổng kết chung của cả tổ.

## Chi tiết
Pull request (hoặc merge request trong GitLab) tập hợp toàn bộ các commit thay đổi, giao diện so sánh mã nguồn và kết quả chạy kiểm thử tự động. Đồng nghiệp có thể để lại bình luận chi tiết trên từng dòng, yêu cầu sửa đổi hoặc bấm nút phê duyệt. Khi vượt qua đủ số phiếu duyệt và các bước kiểm tra tự động, nhánh sẽ được gộp an toàn vào nhánh chính.

## Định nghĩa chuyên ngành
Mô hình cộng tác kiểm soát mã nguồn trên nền tảng Git hỗ trợ thẩm định chéo, kích hoạt các cổng kiểm thử tự động và quản lý việc tích hợp nhánh mã nguồn vào nhánh chuẩn.

## Ví dụ
Lập trình viên tạo một pull request từ nhánh feature/thanh-toan-vnpay vào nhánh main để nhóm kiểm thử và kỹ sư trưởng đánh giá trước khi phát hành.
