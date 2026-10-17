---
label: "Variable"
qualifier: "(Lập trình)"
aliases:
  - "Biến"
  - "Biến số"
loanwords:
  - "variable"
autolink:
  label: never
  aliases:
    Biến: never
    Biến số: never
plain_descriptions:
  - "hộp chứa có tên để lưu dữ liệu trong bộ nhớ khi phần mềm vận hành"
  - "nhãn đại diện trỏ đến một giá trị có thể đọc hoặc thay đổi trong mã nguồn"
summary: "Vùng lưu trữ có định danh trong bộ nhớ dùng để chứa dữ liệu mà chương trình có thể thao tác và cập nhật."
confusable_notes: {}
follow_up_questions:
  - "Phạm vi của biến (scope) ảnh hưởng thế nào đến vòng đời giải phóng bộ nhớ?"
  - "Sự khác biệt giữa biến thông thường và liên kết bất biến trong các trình biên dịch hiện đại là gì?"
translation: translated
translated_from: en
translated_by: ai
translated_at: '2026-10-17'
---

## Giải thích dễ hiểu
Hình dung một chiếc hộp có dán nhãn trong nhà kho. Khi viết nhãn "ốc vít dự phòng" ở ngoài vỏ, thợ có thể mở ra xem số lượng, lấy ốc ra dùng hoặc bỏ thêm ốc mới vào mà không cần thay đổi vị trí của giá để đồ.

## Chi tiết
Biến liên kết một tên gọi với địa chỉ ô nhớ chứa giá trị mang kiểu dữ liệu cụ thể. Tùy thuộc vào ngôn ngữ, biến được định kiểu tĩnh ngay khi biên dịch hoặc nhận kiểu động trong lúc thực thi. Phạm vi hoạt động giới hạn các khu vực mà mã nguồn truy cập được biến, từ phạm vi toàn cục, tập tin mô-đun, thân hàm cho đến các khối lệnh cục bộ. Dữ liệu của biến thường nằm trên ngăn xếp (stack) đối với kiểu nguyên thủy hoặc trên vùng nhớ heap đối với đối tượng phức tạp.

## Định nghĩa chuyên ngành
Một trừu tượng mang tính biểu tượng đại diện cho vị trí lưu trữ trong bộ nhớ có thể đánh địa chỉ, liên kết với một định danh để đọc hoặc biến đổi trạng thái trong ngữ cảnh thực thi.

## Ví dụ
Khai báo `let retryCount = 0;` cấp phát ô nhớ cho số lần thử kết nối; mỗi lần mạng lỗi thì giá trị này tăng thêm một đơn vị cho đến khi chạm mốc 3 lần.
