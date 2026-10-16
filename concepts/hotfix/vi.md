---
label: "Hotfix"
aliases:
  - "Bản vá nóng"
  - "Vá lỗi khẩn cấp"
loanwords:
  - "hotfix"
plain_descriptions:
  - "bản vá khẩn cấp được triển khai thẳng lên máy chủ thực tế để sửa lỗi nghiêm trọng"
  - "giải pháp sửa nhanh sự cố sập hệ thống nằm ngoài chu kỳ phát hành định kỳ"
summary: "Bản sửa lỗi khẩn cấp được tạo và đưa thẳng lên môi trường sản xuất ngoài quy trình phát hành thông thường nhằm khắc phục các sự cố gián đoạn hoặc lỗ hổng bảo mật nghiêm trọng."
confusable_notes:
  {}
follow_up_questions:
  - "Làm cách nào để đảm bảo mã sửa đổi trên nhánh hotfix được gộp ngược lại đầy đủ vào các nhánh phát triển khác?"
  - "Tiêu chí nào giúp phân biệt một lỗi cần tạo hotfix tức thì với một lỗi có thể chờ đợt phát hành định kỳ?"
translation: translated
translated_from: en
translated_by: ai
translated_at: '2026-10-16'
---

## Giải thích dễ hiểu
Thợ sửa xe tức tốc đến vá bánh xe bị thủng ngay trên đường cao tốc để xe chở hàng tiếp tục chạy, thay vì chờ xe về xưởng bảo dưỡng định kỳ.

## Chi tiết
Hotfix được dùng khi hệ thống gặp sự cố khẩn cấp như lỗi thanh toán, rò rỉ dữ liệu hoặc sập dịch vụ máy chủ. Trong mô hình Gitflow, nhánh hotfix được tạo trực tiếp từ nhánh phát hành sản phẩm (production/main), chỉ áp dụng đúng đoạn mã sửa lỗi tối thiểu, rồi lập tức gộp vào cả nhánh sản xuất và nhánh phát triển (develop) để tránh tái phát lỗi trong tương lai.

## Định nghĩa chuyên ngành
Quy trình triển khai bản vá khuyết tật phần mềm khẩn cấp ngoài chu kỳ chuẩn nhắm vào các lỗi vận hành nguy cấp trên môi trường thực tế, thông qua lộ trình kiểm định rút gọn.

## Ví dụ
Đội ngũ phát triển ứng dụng ngân hàng phát hành một bản hotfix trong đêm để vá lỗ hổng xác thực vân tay vừa phát hiện trên môi trường thực tế.
