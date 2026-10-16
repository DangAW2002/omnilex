---
label: Rollback
aliases:
  - Hoàn nguyên
  - Khôi phục phiên bản trước
loanwords:
  - rollback
plain_descriptions:
  - chuyển nhanh về phiên bản phần mềm cũ đang chạy ổn định khi bản phát hành mới phát sinh lỗi nặng
  - hoạt động quay xe hủy bản cập nhật để khôi phục hệ thống về trạng thái bình thường
summary: >-
  Hành động vận hành hoàn nguyên ứng dụng, tệp cấu hình hoặc cơ sở dữ liệu về phiên bản ổn định đã được kiểm chứng trước
  đó.
confusable_notes: {}
follow_up_questions:
  - Những thay đổi cơ sở dữ liệu không tương thích ngược gây khó khăn thế nào cho việc rollback?
  - Những chỉ số giám sát vượt ngưỡng nào nên được cài đặt để kích hoạt rollback tự động?
translation: translated
translated_from: en
translated_by: ai
translated_at: '2026-10-16'
---

## Giải thích dễ hiểu
Giống như việc bước lùi ngay lại bậc thềm chắc chắn khi bạn vừa bước thử lên một tấm ván gỗ ọp ẹp và nghe thấy tiếng răng rắc.

## Chi tiết
Khi bản phát hành mới gây ra lỗi nghiêm trọng, làm chậm hệ thống hoặc gây sập dịch vụ trên môi trường sản xuất, đội ngũ kỹ thuật thực hiện rollback. Thao tác này điều chuyển lưu lượng về phiên bản cũ hoặc triển khai lại mã bản dựng trước đó. Các nền tảng hiện đại lưu sẵn lịch sử sửa đổi giúp quá trình hoàn nguyên diễn ra trong vài giây.

## Định nghĩa chuyên ngành
Quy trình khắc phục sự cố khôi phục phiên bản triển khai, cấu hình hoặc mã nhị phân chuẩn trước đó nhằm lấy lại tính sẵn sàng của dịch vụ.

## Ví dụ
Sau khi phát hành phiên bản mới khiến tỷ lệ lỗi phản hồi 500 tăng vọt lên 15%, hệ thống giám sát tự động kích hoạt lệnh rollback về bản cũ trong vòng 90 giây.
