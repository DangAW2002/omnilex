---
label: Blue-green deployment
aliases:
  - Triển khai xanh lam - xanh lục
  - Triển khai hai môi trường song song
loanwords:
  - blue-green deployment
plain_descriptions:
  - chạy hai môi trường giống hệt nhau song song và chuyển toàn bộ người dùng sang phiên bản mới trong tích tắc
  - kỹ thuật phát hành không gián đoạn bằng cách chuẩn bị sẵn bản cập nhật trên môi trường dự phòng
summary: >-
  Chiến lược triển khai duy trì hai môi trường máy chủ giống hệt nhau (Blue và Green), chuyển toàn bộ lưu lượng sang môi
  trường mới sau khi kiểm tra đạt chuẩn.
confusable_notes:
  canary-release: >-
    Blue-green deployment chuyển toàn bộ lưu lượng sang môi trường song song cùng một lúc, còn canary release điều hướng
    dần một tỷ lệ nhỏ người dùng sang phiên bản mới để thử nghiệm trước khi phát hành diện rộng.
follow_up_questions:
  - Blue-green deployment giúp khôi phục hệ thống (rollback) gần như tức thì như thế nào khi phát sinh lỗi?
  - Chiến lược đồng bộ cơ sở dữ liệu nào phù hợp khi vận hành song song hai môi trường Blue và Green?
translation: translated
translated_from: en
translated_by: ai
translated_at: '2026-10-16'
---

## Giải thích dễ hiểu
Tưởng tượng một nhà hát có hai sân khấu cạnh nhau: trong khi diễn viên biểu diễn trên sân khấu Xanh, hậu đài chuẩn bị sẵn đạo cụ trên sân khấu Đỏ. Đến cảnh tiếp theo, đèn chiếu chuyển phắt sang sân khấu Đỏ trong chớp mắt.

## Chi tiết
Trong mô hình blue-green, một môi trường (ví dụ Blue) tiếp nhận toàn bộ người dùng thật, còn môi trường còn lại (Green) cài đặt phiên bản mới. Kỹ sư chạy thử nghiệm đầy đủ trên Green mà không ảnh hưởng người dùng. Khi mọi thứ đạt yêu cầu, bộ cân bằng tải chuyển hướng toàn bộ người dùng sang Green chỉ bằng một thao tác đổi cấu hình mạng.

## Định nghĩa chuyên ngành
Mô hình triển khai hạ tầng song song duy trì hai ngăn xếp độc lập và hoán đổi đích định tuyến một cách nguyên tử tại cổng điều phối mạng.

## Ví dụ
Cổng thanh toán ngân hàng chạy trên cụm máy chủ Blue trong khi phiên bản 3.0 được kiểm tra hoàn chỉnh trên Green; đúng nửa đêm, bộ cân bằng tải chuyển toàn bộ kết nối mới sang Green.
