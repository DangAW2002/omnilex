---
label: "UART"
aliases:
  - "Bộ thu phát bất đồng bộ vạn năng"
loanwords:
  - "uart"
autolink:
  label: always
  aliases:
    UART: always
plain_descriptions:
  - "mạch giao tiếp hai dây truyền nhận ký tự từng chút một không cần dây xung nhịp"
  - "cổng nối tiếp bất đồng bộ hay dùng để xuất thông báo gỡ lỗi vi điều khiển lên máy tính"
summary: "Khối phần cứng điện tử chuyển đổi dữ liệu song song nội bộ thành chuỗi bit nối tiếp bất đồng bộ trên hai đường truyền phát (TX) và nhận (RX) độc lập."
confusable_notes:
  i2c: "UART truyền bất đồng bộ không cần dây xung nhịp giữa hai thiết bị nối trực tiếp, trong khi I²C là bus đồng bộ có dây xung nhịp chung cho phép gắn nhiều chip."
  spi-bus: "UART chỉ cần hai dây tín hiệu chéo nhau để truyền dữ liệu điểm-tới-điểm với tốc độ vừa phải, trong khi SPI dùng bốn dây với xung nhịp đồng bộ tốc độ rất cao."
follow_up_questions:
  - "Tại sao hai thiết bị nối qua UART bắt buộc phải cài đặt trùng khớp hoàn toàn tốc độ baud và số bit dừng?"
  - "Các đường bắt tay phần cứng RTS và CTS có vai trò gì trong việc chống tràn bộ nhớ đệm khi truyền dữ liệu liên tục?"
translation: translated
translated_from: en
translated_by: ai
translated_at: '2026-10-17'
---

## Giải thích dễ hiểu
Hãy tưởng tượng hai người nói chuyện với nhau bằng mã Morse qua hai sợi dây điện: chỉ cần cả hai đã thỏa thuận trước với nhau về tốc độ gõ phím nhanh hay chậm, họ có thể truyền tin trơn tru mà không cần có người thứ ba đứng gõ nhịp.

## Chi tiết
Bộ thu phát bất đồng bộ vạn năng (UART) là khối mạch phần cứng tích hợp sẵn bên trong hầu hết các chip vi điều khiển. Nó nhận các byte dữ liệu song song từ bộ nhớ của chip rồi xếp chúng thành từng bit tuần tự trên đường truyền, kẹp giữa bằng một bit bắt đầu (start bit), dữ liệu, một bit kiểm tra chẵn lẻ (parity bit) và bit kết thúc (stop bit). Quá trình truyền diễn ra qua hai chân cắm chéo: chân phát TX nối với chân nhận RX của phía đối diện. Do không có dây xung nhịp đồng bộ, hai bên bắt buộc phải được cài đặt cùng một tốc độ truyền (tốc độ baud), phổ biến như 9600 hay 115200 bit/giây.

## Định nghĩa chuyên ngành
Khối vi mạch phần cứng chuyển đổi dữ liệu song song thành khung dữ liệu nối tiếp bất đồng bộ có kèm các bit đồng bộ hóa khung truyền để thực hiện giao tiếp điểm-điểm không dây xung nhịp.

## Ví dụ
Một kỹ sư cắm cáp chuyển đổi USB sang cổng nối tiếp vào hai chân TX và RX của thiết bị IoT để theo dõi nhật ký khởi động hệ thống trên màn hình máy tính ở tốc độ 115.200 baud.
