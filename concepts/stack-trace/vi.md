---
label: "Stack trace"
aliases:
  - "Vết ngăn xếp"
  - "Dấu vết ngăn xếp"
loanwords:
  - "stack trace"
plain_descriptions:
  - "báo cáo hiển thị chuỗi các hàm đang hoạt động tại thời điểm phần mềm phát sinh lỗi"
  - "dấu vết chẩn đoán ghi lại tên tệp nguồn và số dòng nơi chương trình gặp sự cố"
summary: "Bản báo cáo chẩn đoán liệt kê chi tiết các khung ngăn xếp cuộc gọi, tên hàm và số dòng mã nguồn tại một thời điểm thực thi cụ thể."
confusable_notes: {}
follow_up_questions:
  - "Tệp bản đồ nguồn (source map) giúp khôi phục số dòng mã ban đầu từ tệp đã nén nhỏ trên môi trường thực tế ra sao?"
  - "Vì sao các lỗi trong chuỗi promise bất đồng bộ có thể làm mất dấu vết khung ngăn xếp trước đó?"
translation: translated
translated_from: en
translated_by: ai
translated_at: '2026-10-17'
---

## Giải thích dễ hiểu
Hãy tưởng tượng một điều tra viên lần theo dấu chân dẫn tới khung cửa sổ bị vỡ trong một ngôi nhà. Việc đi ngược theo vết chân chỉ rõ lộ trình di chuyển: bắt đầu từ cổng trước, đi xuyên qua hàng hiên và dẫn thẳng tới điểm xảy ra sự cố.

## Chi tiết
Khi một ngoại lệ được ném ra hoặc khi tạm dừng bộ gỡ lỗi, hệ thống sẽ trích xuất ngăn xếp cuộc gọi hiện tại. Bản ghi này liệt kê hàm trên cùng nơi phát sinh sự cố, tiếp theo là hàm gọi đã kích hoạt nó, kéo dài ngược về điểm khởi đầu của chương trình (như hàm `main`). Mỗi khung ghi lại tên mô-đun, tên tệp mã nguồn cùng số dòng và cột chính xác. Lập trình viên căn cứ vào dấu vết này để nắm bắt chính xác chuỗi sự kiện dẫn tới trạng thái lỗi của phần mềm.

## Định nghĩa chuyên ngành
Bản kê chẩn đoán tuần tự hóa các khung kích hoạt đang hiện diện trên ngăn xếp cuộc gọi của luồng, ánh xạ địa chỉ trở về của lệnh tới các hàm mã nguồn và tọa độ dòng lệnh tương ứng.

## Ví dụ
Ứng dụng ghi nhận vết ngăn xếp khi gặp sự cố: dòng đầu tiên chỉ rõ `parseJSON()` bị lỗi ở dòng 45 tệp `parser.js`, được gọi bởi `handleRequest()` tại dòng 112 tệp `server.js`.
