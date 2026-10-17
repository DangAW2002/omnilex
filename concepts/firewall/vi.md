---
label: Tường lửa
aliases: []
loanwords:
  - firewall
label_evidence:
  - ref: wikipedia-vi
    locator: https://vi.wikipedia.org/wiki/T%C6%B0%E1%BB%9Dng_l%E1%BB%ADa
    accessed: '2026-10-17'

plain_descriptions:
  - hệ thống rào chắn ngăn chặn các kết nối mạng trái phép vào máy tính
  - người gác cổng kỹ thuật số kiểm soát dữ liệu mạng truyền vào và ra
summary: Hệ thống an ninh mạng chuyên giám sát và lọc các gói dữ liệu truyền vào và ra dựa trên các quy tắc bảo mật được thiết lập trước.
confusable_notes: {}
follow_up_questions:
  - Sự khác biệt giữa tường lửa kiểm tra trạng thái (stateful) và bộ lọc gói tin tĩnh (stateless) là gì?
  - Tường lửa ứng dụng web (WAF) ở tầng 7 khác với tường lửa mạng thông thường ở tầng 3 và tầng 4 ra sao?
translation: translated
translated_from: en
translated_by: ai
translated_at: '2026-10-17'
---

## Giải thích dễ hiểu
Giống như chốt bảo vệ an ninh ở cổng tòa nhà: nhân viên bảo vệ kiểm tra giấy tờ và danh sách đăng ký khách ra vào trước khi cho phép một người lạ bước qua cửa.

## Chi tiết
Tường lửa kiểm tra các thông tin trong phần đầu gói tin như địa chỉ IP nguồn, IP đích, giao thức (TCP/UDP) và số hiệu cổng để quyết định chấp nhận hay từ chối lưu lượng. Tường lửa hiện đại duy trì bảng trạng thái kết nối để tự động mở đường cho gói tin phản hồi hợp lệ, đồng thời tích hợp khả năng nhận diện các cuộc tấn công như quét cổng hoặc từ chối dịch vụ.

## Định nghĩa chuyên ngành
Thiết bị phần cứng hoặc module phần mềm thiết lập ranh giới phòng thủ giữa mạng nội bộ đáng tin cậy và mạng bên ngoài, thực thi chính sách an ninh bằng cách phân tích tiêu đề gói tin và luồng kết nối.

## Ví dụ
Một nhóm bảo mật đám mây cấu hình tường lửa chỉ mở cổng TCP 443 cho khách vãng lai truy cập web mã hóa, đồng thời khóa chặt cổng SSH 22 ngoại trừ địa chỉ IP tĩnh của văn phòng công ty.
