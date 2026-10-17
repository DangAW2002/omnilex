---
label: "Tìm kiếm nhị phân"
aliases: []
loanwords:
  - "binary search"
plain_descriptions:
  - "thuật toán tìm kiếm nhanh trên danh sách đã sắp xếp bằng cách liên tục chia đôi khoảng tìm kiếm"
  - "kỹ thuật tra cứu so sánh giá trị cần tìm với phần tử ở chính giữa mảng có thứ tự"
summary: "Thuật toán tìm kiếm hiệu quả xác định vị trí của giá trị đích trong mảng đã sắp xếp bằng cách liên tục chia đôi phạm vi tìm kiếm."
confusable_notes: {}
follow_up_questions:
  - "Vì sao thuật toán tìm kiếm nhị phân bắt buộc dữ liệu đầu vào phải được sắp xếp thứ tự từ trước?"
  - "Cách tính chỉ số giữa mảng bằng công thức `low + (high - low) / 2` giúp tránh lỗi tràn số nguyên (integer overflow) như thế nào?"
translation: translated
translated_from: en
translated_by: ai
translated_at: '2026-10-17'
label_evidence:
  - ref: wikipedia-vi
    locator: https://vi.wikipedia.org/wiki/T%C3%ACm_ki%E1%BA%BFm_nh%E1%BB%8B_ph%C3%A2n
    accessed: '2026-10-17'
    note: "Wikipedia tiếng Việt ghi nhận thuật ngữ Tìm kiếm nhị phân trong khoa học máy tính"
---

## Giải thích dễ hiểu
Hãy tưởng tượng trò chơi đoán một số bí mật từ 1 đến 100. Khi bạn đoán số 50, người quản trò nói "lớn hơn"; ngay lập tức bạn loại bỏ được toàn bộ 50 số đầu tiên chỉ sau một lượt đoán, và chỉ cần tập trung tìm kiếm trong nửa còn lại từ 51 đến 100.

## Chi tiết
Tìm kiếm nhị phân áp dụng trên các tập hợp đã được sắp xếp thứ tự và cho phép truy cập ngẫu nhiên (như mảng). Tại mỗi bước, thuật toán so sánh giá trị cần tìm với phần tử nằm chính giữa mảng. Nếu trùng khớp, thuật toán trả về vị trí phần tử. Nếu giá trị cần tìm nhỏ hơn, phạm vi tìm kiếm thu hẹp về nửa đầu; nếu lớn hơn, phạm vi chuyển sang nửa sau. Nhờ việc giảm một nửa số lượng dữ liệu sau mỗi lượt so sánh, thuật toán đạt độ phức tạp thời gian logarit ($O(\log n)$), giúp tìm kiếm trong 1.000.000 phần tử chỉ với tối đa 20 lần so sánh.

## Định nghĩa chuyên ngành
Giải thuật tìm kiếm theo chiến lược chia để trị xác định vị trí khóa trong một dãy đơn điệu với độ phức tạp $O(\log n)$ bằng cách liên tục kiểm tra điểm giữa và loại bỏ một nửa không gian tìm kiếm còn lại.

## Ví dụ
Tìm số 67 trong mảng gồm 16 phần tử đã sắp xếp: thuật toán kiểm tra vị trí số 8, loại bỏ 8 phần tử đầu, kiểm tra tiếp vị trí 12 và tìm thấy số 67 sau đúng 4 lần so sánh.
