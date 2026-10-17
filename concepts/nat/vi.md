---
label: Network Address Translation (NAT)
aliases:
  - NAT
autolink:
  aliases:
    NAT: always
loanwords:
  - network address translation (nat)
plain_descriptions:
  - chia sẻ một địa chỉ mạng công khai cho nhiều thiết bị nội bộ cùng vào internet
  - kỹ thuật đổi địa chỉ IP riêng của máy tính thành địa chỉ IP công cộng
summary: Phương pháp mạng ánh xạ không gian địa chỉ IP này sang không gian địa chỉ IP khác bằng cách sửa đổi phần đầu gói tin IP khi đang truyền tải.
confusable_notes: {}
follow_up_questions:
  - Cơ chế dịch số hiệu cổng (PAT) giúp hàng nghìn kết nối nội bộ dùng chung một địa chỉ IPv4 công cộng ra sao?
  - Tại sao các ứng dụng gọi thoại trực tiếp ngang hàng (P2P) thường cần thêm giao thức vượt rào NAT như STUN hoặc TURN?
translation: translated
translated_from: en
translated_by: ai
translated_at: '2026-10-17'
---

## Giải thích dễ hiểu
Giống như phòng văn thư của một công ty: mọi thư từ từ thế giới bên ngoài gửi đến cùng một địa chỉ trụ sở chính, nhân viên văn thư nhìn số phòng ban ghi trên phong bì để chuyển tiếp đến đúng bàn làm việc.

## Chi tiết
NAT hoạt động trên router biên hoặc cổng chuyển tiếp liên kết mạng cục bộ với mạng internet. Khi máy tính nội bộ mang địa chỉ IP riêng (như dải 192.168.x.x) gửi dữ liệu ra ngoài, thiết bị NAT sẽ thay thế IP và số cổng nguồn bằng IP công khai duy nhất của nó, đồng thời lưu vết vào bảng dịch trạng thái để khi có gói tin hồi đáp sẽ trả về chính xác máy nội bộ ban đầu.

## Định nghĩa chuyên ngành
Giao thức định tuyến chuẩn hóa theo RFC 3022 thực hiện chuyển đổi địa chỉ IP nguồn hoặc đích và số hiệu cổng trong tiêu đề gói tin IP, giúp làm chậm quá trình cạn kiệt dải địa chỉ IPv4 và ẩn giấu sơ đồ mạng nội bộ.

## Ví dụ
Cổng NAT trên đám mây cho phép các máy chủ xử lý dữ liệu trong mạng nội bộ (IP 10.0.1.50) tải các bản vá phần mềm từ internet về máy, trong khi chặn đứng hoàn toàn người lạ từ internet tự ý kết nối vào máy chủ đó.
