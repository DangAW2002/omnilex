---
label: Subagent
aliases:
  - Tác tử phụ
loanwords:
  - subagent
plain_descriptions:
  - trợ lý AI chuyên trách được tác tử chính giao nhiệm vụ xử lý một phần việc nhỏ
  - tác tử con làm việc độc lập dưới sự điều phối của một tác tử trưởng
summary: Tác tử AI chuyên biệt được khởi tạo và điều phối bởi tác tử chính nhằm giải quyết một tác vụ độc lập trong hệ thống đa tác tử.
confusable_notes: {}
follow_up_questions:
  - Việc giao việc cho subagent giúp chống tràn và chống loãng cửa sổ ngữ cảnh chính ra sao?
  - Giao thức nào giúp truyền nhận dữ liệu tin cậy giữa tác tử cha và các tác tử phụ?
translation: translated
translated_from: en
translated_by: ai
translated_at: '2026-10-16'
---

## Giải thích dễ hiểu
Nếu tác tử chính giống như một tổng thầu quản lý việc xây nhà, thì các subagent chính là thợ điện, thợ sửa ống nước và thợ sơn được gọi đến để làm từng hạng mục chuyên biệt mà không cần bận tâm đến toàn bộ việc thi công khác.

## Chi tiết
Trong kiến trúc đa tác tử, các nhiệm vụ đồ sộ thường làm quá tải giới hạn của một cửa sổ ngữ cảnh đơn lẻ. Tác tử điều phối chính sẽ phân rã mục tiêu thành các việc độc lập và khởi tạo các subagent sở hữu không gian prompt riêng biệt, công cụ chuyên biệt và chỉ dẫn nghiệp vụ rõ ràng. Subagent hoàn thành phần việc được giao, gửi báo cáo tóm tắt trở lại cho tác tử chính rồi kết thúc, giúp tiết kiệm bộ nhớ token cho luồng xử lý trung tâm.

## Định nghĩa chuyên ngành
Thực thể tác tử tính toán phụ thuộc do một bộ điều phối giám sát khởi tạo, vận hành trong không gian ngữ cảnh cách ly để giải quyết một bài toán con chức năng xác định.

## Ví dụ
Tác tử điều phối phát triển phần mềm tạo một subagent riêng chỉ để quét mã nguồn tìm kiếm các lỗ hổng bảo mật theo danh mục OWASP và trả về danh sách cảnh báo.
