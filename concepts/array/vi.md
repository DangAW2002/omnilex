---
label: "Array"
qualifier: "(Lập trình)"
aliases:
  - "Mảng"
loanwords:
  - "array"
autolink:
  label: never
  aliases:
    Mảng: never
plain_descriptions:
  - "tập hợp có thứ tự các phần tử được lưu liền kề trong bộ nhớ và truy cập bằng chỉ số"
  - "danh sách tuần tự cơ bản trong đó mỗi phần tử được định vị bằng vị trí số nguyên"
summary: "Cấu trúc dữ liệu tuyến tính lưu trữ tập hợp các phần tử tại các ô nhớ liên tiếp, được định danh thông qua chỉ số vị trí."
confusable_notes:
  hash-table: "Mảng sắp xếp các phần tử liên tiếp trong bộ nhớ đánh số bằng chỉ số nguyên, trong khi bảng băm liên kết dữ liệu với các khóa tùy ý thông qua hàm băm."
follow_up_questions:
  - "Tính cục bộ không gian (spatial locality) giúp việc duyệt qua mảng tận dụng bộ đệm CPU cache nhanh vượt trội ra sao?"
  - "Các mảng động duy trì thời gian thêm phần tử khấu hao O(1) khi mở rộng kích thước gấp đôi như thế nào?"
translation: translated
translated_from: en
translated_by: ai
translated_at: '2026-10-17'
---

## Giải thích dễ hiểu
Hãy hình dung một vỉ đựng trứng có các ô tròn đánh số từ 0 đến 11. Đặt một quả trứng vào ô số 4 cho phép bạn với tay lấy thẳng quả trứng ở ô số 4 ra ngay lập tức mà không cần chạm vào hay mở kiểm tra các ô 0, 1, 2 hay 3.

## Chi tiết
Trong khoa học máy tính truyền thống, mảng lưu trữ các phần tử cùng kiểu dữ liệu trong một khối ô nhớ RAM liền kề không ngắt quãng. Do kích thước mỗi phần tử bằng nhau, việc tìm địa chỉ bộ nhớ của phần tử thứ $i$ chỉ tốn một phép tính đơn giản: $\text{địa chỉ} = \text{địa chỉ gốc} + i \times \text{kích thước phần tử}$, mang lại khả năng truy cập ngẫu nhiên tức thì với độ phức tạp $O(1)$. Tuy nhiên, việc chèn hoặc xóa phần tử ở giữa mảng đòi hỏi phải dịch chuyển toàn bộ các phần tử phía sau, tốn thời gian $O(n)$. Các mảng động mở rộng kích thước gấp đôi khi đầy để giữ thời gian thêm phần tử vào cuối ở mức hằng số.

## Định nghĩa chuyên ngành
Khối phân bổ bộ nhớ liên tục có chỉ số chứa chuỗi các giá trị có thể đánh địa chỉ thông qua độ dời số nguyên so với con trỏ cơ sở ban đầu.

## Ví dụ
Một mảng chứa nhiệt độ trong tuần `[28, 31, 29, 32]` lưu 4 số đo; truy cập phần tử tại chỉ số 2 trả về ngay giá trị 29 độ C chỉ trong một lệnh đọc bộ nhớ.
