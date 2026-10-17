---
label: Application performance monitoring (APM)
aliases:
  - APM
  - Giám sát hiệu năng ứng dụng
loanwords:
  - application performance monitoring
  - apm
autolink:
  aliases:
    APM: always
plain_descriptions:
  - công cụ theo dõi hoạt động sâu bên trong ứng dụng giúp tìm ra hàm chạy chậm và lệnh cơ sở dữ liệu bị nghẽn
  - giải pháp giám sát toàn diện đo lường thời gian phản hồi, tỷ lệ lỗi và trải nghiệm của người dùng cuối
summary: >-
  Bộ giải pháp giám sát chuyên sâu nhằm theo dõi tính sẵn sàng, phát hiện lỗi mã nguồn và phân tích độ trễ giao dịch trong các ứng dụng phần mềm.
confusable_notes: {}
follow_up_questions:
  - "Cơ chế can thiệp trực tiếp vào mã thực thi (instrumentation) giúp công cụ APM đo thời gian chạy của từng hàm ra sao?"
  - "Điểm khác biệt cốt lõi giữa giám sát ứng dụng APM và việc theo dõi thông số phần cứng máy chủ thông thường là gì?"
translation: translated
translated_from: en
translated_by: ai
translated_at: '2026-10-17'
---

## Giải thích dễ hiểu
Giống như thiết bị đo sức khỏe thông minh gắn trên người vận động viên: đo nhịp tim, nhịp thở và mức tiêu hao năng lượng để kịp thời chỉ ra cơ bắp nào đang bị quá tải trước khi kiệt sức.

## Chi tiết
Application Performance Monitoring (APM) là giải pháp giám sát chuyên sâu hành vi hoạt động bên trong của các ứng dụng phần mềm. Khác với các công cụ giám sát hạ tầng chỉ nhìn thấy mức tiêu thụ CPU hay RAM ở bề ngoài, các tác nhân APM được cài cắm trực tiếp vào môi trường chạy mã nguồn để theo dõi từng luồng xử lý. Chúng đo thời gian chạy của từng hàm lập trình, ghi nhận câu lệnh cơ sở dữ liệu bị chậm, vẽ bản đồ kết nối giữa các dịch vụ và bắt trọn các lỗi biệt lệ đi kèm dấu vết ngăn xếp.

## Định nghĩa chuyên ngành
Phương pháp và hệ thống công cụ giám sát theo dõi chuyên sâu hiệu năng giao dịch, độ trễ và các lỗi thời gian chạy bên trong mã nguồn ứng dụng.

## Ví dụ
Công cụ APM tự động phát hiện một hàm xác thực người dùng mất tới 3 giây để hoàn thành do đang gọi lặp lại một lệnh truy vấn cơ sở dữ liệu không cần thiết trong vòng lặp.
