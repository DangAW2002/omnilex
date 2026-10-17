---
label: "React"
qualifier: "(Thư viện)"
aliases:
  - "React.js"
  - "ReactJS"
loanwords:
  - "React"
  - "React.js"
  - "ReactJS"
autolink:
  label: never
plain_descriptions:
  - "công cụ JavaScript phổ biến giúp lắp ráp giao diện web từ các mảnh ghép thành phần"
  - "thư viện lập trình giao diện theo mô hình thành phần tái sử dụng và cập nhật tự động"
summary: "Thư viện JavaScript mã nguồn mở chuyên dùng để xây dựng giao diện người dùng dựa trên các thành phần (component)."
confusable_notes: {}
follow_up_questions:
  - "Thuật toán đối soát (reconciliation) của React tối ưu hóa việc cập nhật DOM như thế nào?"
  - "Mô hình React Server Components (RSC) mang lại lợi ích gì so với Component truyền thống?"
translation: translated
translated_from: en
translated_by: ai
translated_at: '2026-10-17'
---

## Giải thích dễ hiểu
React giúp bạn xây dựng trang web giống như chơi xếp hình Lego: bạn tạo ra các mảnh ghép như nút bấm hay thẻ sản phẩm một lần, rồi gắn chúng vào trang và dữ liệu đổi đến đâu thì hình đổi đến đó.

## Chi tiết
Do Meta phát triển và duy trì, React đưa ra mô hình giao diện khai báo (declarative) dựa trên các component viết bằng cú pháp JSX. Khi dữ liệu (state) thay đổi, React so sánh cây DOM ảo (Virtual DOM) với trạng thái trước đó để chỉ cập nhật đúng những phần tử có thay đổi trên màn hình thật, giúp ứng dụng mượt mà và dễ bảo trì.

## Định nghĩa chuyên ngành
Thư viện phát triển giao diện người dùng dựa trên mô hình luồng dữ liệu một chiều và cơ chế DOM ảo để tối ưu hóa hiệu năng kết xuất đồ họa.

## Ví dụ
Đoạn mã khai báo function Counter() { const [count, setCount] = useState(0); return <button onClick={() => setCount(count + 1)}>Đã bấm: {count}</button>; } tạo nút bấm tăng dần số lần nhấp chuột.
