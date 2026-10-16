---
label: Zero trust
aliases:
  - kiến trúc không tin cậy
  - mô hình zero trust
loanwords:
  - zero trust
plain_descriptions:
  - mô hình an ninh không bao giờ tin tưởng bất kỳ thiết bị nào, kể cả khi đang cắm mạng nội bộ công ty
  - nguyên tắc luôn xác minh danh tính và kiểm tra thiết bị cho từng thao tác truy cập dữ liệu
summary: Mô hình an ninh mạng yêu cầu liên tục xác minh danh tính của mọi người dùng và thiết bị, hoạt động trên giả định rằng mạng luôn tiềm ẩn nguy cơ bị xâm nhập.
confusable_notes: {}
follow_up_questions:
  - Kỹ thuật vi phân đoạn mạng (micro-segmentation) ngăn chặn kẻ tấn công di chuyển ngang bên trong mạng nội bộ như thế nào?
  - Điểm quyết định chính sách (PDP) và điểm thực thi chính sách (PEP) phối hợp ra sao trong kiến trúc Zero Trust?
translation: translated
translated_from: en
translated_by: ai
translated_at: '2026-10-16'
---

## Giải thích dễ hiểu
Giống như quy trình kiểm tra an ninh tại sân bay: hành khách phải xuất trình vé và căn cước công dân ở cửa vào, qua cổng soi chiếu và kiểm tra lại một lần nữa ngay tại cửa lên máy bay.

## Chi tiết
Khác với mô hình cũ coi mạng nội bộ là an toàn, Zero Trust xóa bỏ khái niệm tin cậy mặc định. Mọi yêu cầu truy cập tài nguyên đều phải vượt qua các bước xác thực đa yếu tố, kiểm tra tình trạng an toàn của thiết bị và mã hóa toàn bộ dữ liệu truyền tải.

## Định nghĩa chuyên ngành
Khung kiến trúc an toàn thông tin vận hành theo nguyên lý "không bao giờ tin tưởng, luôn luôn xác minh", đòi hỏi đánh giá rủi ro động trên từng giao dịch kết nối.

## Ví dụ
Kỹ sư ngồi làm việc tại trụ sở công ty vẫn phải xác thực vân tay và kiểm tra máy tính không nhiễm mã độc mới được truy cập vào cơ sở dữ liệu khách hàng.
