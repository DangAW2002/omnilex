---
label: Threat modeling
aliases:
  - mô hình hóa mối đe dọa
loanwords:
  - threat modeling
plain_descriptions:
  - phân tích bản thiết kế phần mềm để lường trước các cách mà tin tặc có thể tấn công
  - quy trình rà soát kiến trúc hệ thống nhằm tìm ra nguy cơ bảo mật và biện pháp phòng ngừa
summary: Phương pháp kỹ thuật có cấu trúc nhằm xác định, phân loại và ưu tiên xử lý các mối đe dọa an ninh tiềm ẩn đối với kiến trúc hệ thống.
confusable_notes: {}
follow_up_questions:
  - Khung phương pháp STRIDE phân loại các mối đe dọa kiến trúc thành những nhóm nào?
  - Thời điểm tối ưu nhất trong vòng đời phát triển phần mềm để tổ chức các buổi threat modeling là khi nào?
translation: translated
translated_from: en
translated_by: ai
translated_at: '2026-10-17'
---

## Giải thích dễ hiểu
Giống như kiến trúc sư và gia chủ cùng ngồi xem kỹ bản vẽ ngôi nhà trước khi đặt móng xây dựng: họ đặt câu hỏi "Nếu trộm muốn trèo qua ban công tầng hai hoặc cạy cửa sổ tầng hầm thì sẽ làm thế nào, và chúng ta cần lắp chốt khóa hay kính cường lực ở vị trí nào ngay từ đầu?"

## Chi tiết
Mô hình hóa mối đe dọa (threat modeling) là quy trình chủ động được thực hiện ngay từ giai đoạn thiết kế kiến trúc phần mềm. Các khung phương pháp phổ biến bao gồm STRIDE (Giả mạo, Can thiệp trái phép, Chối bỏ trách nhiệm, Lộ lọt thông tin, Từ chối dịch vụ, Leo thang đặc quyền) và PASTA. Các kỹ sư vẽ sơ đồ luồng dữ liệu (DFD), xác định các ranh giới tin cậy (trust boundaries) nơi dữ liệu di chuyển qua các vùng đặc quyền khác nhau, liệt kê các kịch bản tấn công tiềm năng và chấm điểm mức độ rủi ro theo mô hình DREAD. Việc phát hiện các lỗi kiến trúc cốt lõi ngay trên bản thiết kế giúp doanh nghiệp tiết kiệm đáng kể chi phí chỉnh sửa mã nguồn sau này.

## Định nghĩa chuyên ngành
Phương pháp kỹ thuật có cấu trúc nhằm phân tích kiến trúc hệ thống để phát hiện các khiếm khuyết an ninh và thiết lập các biện pháp phòng vệ cụ thể trước khi triển khai.

## Ví dụ
Trong giai đoạn thiết kế cổng thanh toán phân tán, đội ngũ kỹ sư tổ chức buổi hội thảo threat modeling theo khung STRIDE và phát hiện ra kênh kết nối gRPC nội bộ giữa hai dịch vụ chưa được bật xác thực TLS hai chiều khi truyền qua các nút mạng.
