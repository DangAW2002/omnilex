---
label: "Process"
qualifier: "(Hệ điều hành)"
aliases:
  - "Tiến trình"
loanwords:
  - "process"
autolink:
  label: never
  aliases:
    Tiến trình: never
plain_descriptions:
  - "một phiên bản đang chạy của chương trình máy tính với không gian bộ nhớ riêng biệt"
  - "môi trường thực thi độc lập do hệ điều hành quản lý chứa mã nguồn, tài nguyên và các luồng"
summary: "Một thực thể thực thi của chương trình máy tính được hệ điều hành cấp phát không gian địa chỉ bộ nhớ độc lập và tài nguyên riêng."
confusable_notes:
  thread-programming: "Tiến trình sở hữu không gian bộ nhớ ảo độc lập và tài nguyên riêng, trong khi luồng là một nhánh thực thi con nằm bên trong và dùng chung bộ nhớ của tiến trình."
follow_up_questions:
  - "Cơ chế cô lập bộ nhớ ảo ngăn một tiến trình bị lỗi can thiệp hoặc làm hỏng dữ liệu của tiến trình khác ra sao?"
  - "Những giao thức nào như đường ống (pipe) hay socket giúp hai tiến trình trao đổi dữ liệu qua ranh giới cô lập?"
translation: translated
translated_from: en
translated_by: ai
translated_at: '2026-10-17'
label_evidence:
  - ref: wikipedia-vi
    locator: https://vi.wikipedia.org/wiki/Ti%E1%BA%BFn_tr%C3%ACnh_(khoa_h%E1%BB%8Dc_m%C3%A1y_t%C3%ADnh)
    accessed: '2026-10-17'
    note: "Wikipedia tiếng Việt ghi nhận thuật ngữ Tiến trình trong khoa học máy tính"
---

## Giải thích dễ hiểu
Hãy tưởng tượng các văn phòng độc lập trong một tòa nhà. Mỗi công ty thuê một phòng riêng có khóa cửa, bàn làm việc và tủ tài liệu riêng; nhân viên công ty này không thể tùy tiện sang xem giấy tờ của công ty bên cạnh nếu không có thư trao đổi chính thức.

## Chi tiết
Khi hệ điều hành khởi chạy một tệp tin thực thi, nó sẽ sinh ra một tiến trình mới. Nhân hệ điều hành cấp cho tiến trình một mã định danh duy nhất (PID), một vùng nhớ ảo riêng biệt và các tài nguyên như kết nối mạng, quyền truy cập tập tin. Nhờ cơ chế phân tách bộ nhớ phần cứng, lỗi sập ở một tiến trình sẽ không thể làm hỏng hoặc sập các tiến trình khác đang chạy song song. Để trao đổi dữ liệu giữa các tiến trình, hệ thống phải dùng các kênh giao tiếp chuyên biệt (IPC) như socket, đường ống hoặc vùng nhớ chia sẻ.

## Định nghĩa chuyên ngành
Cấu trúc trừu tượng của hệ điều hành đại diện cho một môi trường thực thi chủ động, bao gồm không gian địa chỉ ảo chuyên dụng, thông tin bảo mật, tài nguyên hệ thống và tối thiểu một luồng lệnh.

## Ví dụ
Một trình duyệt web hiện đại chạy mỗi thẻ trang web trong một tiến trình riêng; nếu thẻ thứ tư bị treo mã JavaScript, các thẻ khác vẫn hoạt động bình thường mà không bị tắt theo.
