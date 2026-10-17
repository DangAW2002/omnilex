---
label: Toil
qualifier: (SRE)
aliases:
  - Công việc lao dịch
loanwords:
  - toil
plain_descriptions:
  - các công việc vận hành thủ công lặp đi lặp lại không tạo ra giá trị lâu dài và ngày càng phình to khi dịch vụ mở rộng
  - những việc vặt như khởi động lại máy hay duyệt phiếu yêu cầu bằng tay mà lẽ ra phải được viết mã tự động hóa
summary: >-
  Trong mô hình SRE, toil là loại công việc vận hành thủ công, lặp lại và có thể tự động hóa, thường tăng tuyến tính theo quy mô của dịch vụ mà không mang lại giá trị bền vững.
confusable_notes: {}
follow_up_questions:
  - "Những tiêu chí cụ thể nào giúp phân biệt giữa công việc lao dịch (toil) và công việc kỹ thuật tạo ra giá trị bền vững?"
  - "Làm thế nào để đội ngũ kỹ thuật đo đạc và tự động hóa nhằm giảm thiểu các công việc lặp đi lặp lại hàng ngày?"
translation: translated
translated_from: en
translated_by: ai
translated_at: '2026-10-17'
---

## Giải thích dễ hiểu
Giống như việc dùng xô múc nước tràn vào thuyền mỗi giờ: nó giúp thuyền không chìm ngay lúc đó, nhưng việc bịt kín lỗ thủng mới là kỹ thuật thực sự giúp giải quyết triệt để vấn đề.

## Chi tiết
Trong mô hình SRE của Google, toil được định nghĩa rõ ràng là những công việc thủ công, lặp đi lặp lại, mang tính đối phó, không tạo ra giá trị lâu dài và có xu hướng tăng tỷ lệ thuận theo quy mô hệ thống. Ví dụ điển hình gồm việc bấm nút khởi động lại tiến trình bị kẹt, cấp quyền truy cập thủ công cho từng tài khoản hoặc chạy lại các tệp sao lưu dữ liệu bằng tay. SRE đưa ra quy định nghiêm ngặt: các kỹ sư phải dành ít nhất 50% thời gian để viết phần mềm và tự động hóa nhằm triệt tiêu các công việc dạng này, bảo vệ đội ngũ khỏi tình trạng kiệt sức.

## Định nghĩa chuyên ngành
Khái niệm chỉ các tác vụ vận hành mang tính thủ công, lặp lại, có thể tự động hóa và tăng tuyến tính theo lưu lượng mà không đóng góp vào sự phát triển lâu dài của hệ thống.

## Ví dụ
Thay vì mỗi ngày mất hai tiếng đăng nhập vào từng máy chủ để dọn dẹp các tệp nhật ký cũ, kỹ sư viết một tập lệnh tự động hóa dọn dẹp theo chu kỳ và loại bỏ hoàn toàn công việc thủ công này.
