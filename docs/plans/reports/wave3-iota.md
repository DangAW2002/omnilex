# Báo cáo Lô iota: Thiết bị và Giao thức IoT (28 khái niệm)

Trạng thái: **Hoàn thành soạn thảo (Draft)** theo chỉ định `candidates/wave3/iota.yaml`. Mọi khái niệm đều tuân thủ chặt chẽ `status: draft` và `provenance.drafted_by: ai`.

## 1. Danh sách 28 khái niệm

| id | Nhóm | Nhãn en | Nhãn vi | Level | Nguồn A/B (definition) | Bằng chứng nhãn vi |
|---|---|---|---|---|---|---|
| `embedded-system` | iot/devices-sensors | Embedded system | Hệ thống nhúng | 1 | nist-csrc | wikipedia-vi |
| `single-board-computer` | iot/devices-sensors | Single-board computer (SBC) | như en | 2 | ti | từ mượn |
| `raspberry-pi` | iot/devices-sensors | Raspberry Pi | như en | 1 | ti | từ mượn |
| `arduino` | iot/devices-sensors | Arduino | như en | 1 | arduino-docs | từ mượn |
| `esp32` | iot/devices-sensors | ESP32 | như en | 2 | espressif | từ mượn |
| `gpio` | iot/devices-sensors | General-purpose input/output (GPIO) | như en | 2 | linux-kernel | từ mượn |
| `i2c` | iot/devices-sensors | I²C | như en | 2 | linux-kernel | từ mượn |
| `spi-bus` | iot/devices-sensors | Serial Peripheral Interface (SPI) | như en | 2 | linux-kernel | từ mượn |
| `uart` | iot/devices-sensors | UART | như en | 2 | linux-kernel | từ mượn |
| `adc` | iot/devices-sensors | Analog-to-digital converter (ADC) | như en | 2 | ti | từ mượn |
| `pwm` | iot/devices-sensors | Pulse-width modulation (PWM) | như en | 2 | ti | wikipedia-vi |
| `rfid` | iot/devices-sensors | Radio-frequency identification (RFID) | như en | 1 | nist-csrc | từ mượn |
| `nfc` | iot/connectivity-protocols | Near-field communication (NFC) | như en | 1 | nist-csrc | từ mượn |
| `gnss` | iot/devices-sensors | GNSS | như en | 2 | faa-gov | từ mượn |
| `lidar` | iot/devices-sensors | LiDAR | như en | 2 | noaa-gov | từ mượn |
| `imu` | iot/devices-sensors | Inertial measurement unit (IMU) | như en | 2 | nist-csrc | từ mượn |
| `accelerometer` | iot/devices-sensors | Accelerometer | như en | 2 | nist-csrc | từ mượn |
| `wearable` | iot/devices-sensors | Wearable device | như en | 1 | fda-gov | từ mượn |
| `smart-meter` | iot/devices-sensors | Smart meter | như en | 1 | nist-csrc | từ mượn |
| `low-power-mode` | iot/devices-sensors | Sleep mode (Embedded) | như en (Embedded) | 2 | espressif | từ mượn |
| `energy-harvesting` | iot/devices-sensors | Energy harvesting | như en | 2 | ti | từ mượn |
| `secure-boot` | iot/devices-sensors | Secure boot | như en | 2 | microsoft-learn | từ mượn |
| `thread-iot` | iot/connectivity-protocols | Thread (IoT) | như en (IoT) | 2 | thread-group | từ mượn |
| `matter-iot` | iot/connectivity-protocols | Matter (IoT) | như en (IoT) | 2 | csa-iot | từ mượn |
| `z-wave` | iot/connectivity-protocols | Z-Wave | như en | 2 | itu | từ mượn |
| `wifi` | iot/connectivity-protocols | Wi-Fi | như en | 1 | wifi-alliance | từ mượn |
| `lora-radio` | iot/connectivity-protocols | LoRa (IoT) | như en (IoT) | 2 | lora-alliance | từ mượn |
| `tinyml` | iot/edge-cloud | TinyML | như en | 3 | tinyml-org | từ mượn |

### Quy chuẩn biên soạn:
- Tất cả 28 khái niệm đều đạt chuẩn `status: draft`, `provenance: { drafted_by: ai }`.
- Bản tiếng Anh (`en.md`): viết nguyên bản (`translation: native`) từ các tài liệu chuẩn công nghiệp và kỹ thuật chính thức.
- Bản tiếng Việt (`vi.md`): dịch từ bản tiếng Anh (`translation: translated`, `translated_from: en`, `translated_by: ai`, `translated_at: '2026-10-17'`).
- Mỗi ngôn ngữ đều có tối thiểu 2 `plain_descriptions` mô tả thực tế, 1 câu `summary` ngắn gọn, và đầy đủ 4 phần nội dung chuẩn mực (Giải thích dễ hiểu, Chi tiết, Định nghĩa chuyên ngành, Ví dụ).
- Các thuật ngữ chuyên ngành IoT/phần cứng mà giới chuyên gia Việt Nam thường gọi bằng tên tiếng Anh được giữ nguyên dạng từ mượn; các nhãn có dịch tiếng Việt chuẩn xác (`Hệ thống nhúng`, `Pulse-width modulation (PWM)`) đều có dẫn xuất `label_evidence` kiểm tra thực tế (HTTP 200).
- Xử lý qualifier và liên kết đối ứng:
  - Khái niệm `lora-radio` (IoT) và `lora` (AI): cả hai được gắn qualifier phân biệt `(IoT)` và `(AI)`, thiết lập quan hệ `confusable` hai chiều cùng ghi chú giải thích đối ứng. Tương tự với `lorawan` $\leftrightarrow$ `lora-radio`.
  - Khái niệm `z-wave` và `zigbee`: thiết lập quan hệ `confusable` hai chiều cùng ghi chú chi tiết.
  - Khái niệm `arduino` và `esp32`: thiết lập quan hệ `confusable` hai chiều cùng ghi chú chi tiết.
  - Khái niệm `thread-iot` và `matter-iot`: thiết lập quan hệ `confusable` hai chiều cùng ghi chú chi tiết.
  - Các từ thông dụng tiếng Anh hoặc từ khóa nhạy cảm (`thread-iot`, `matter-iot`) đều được thiết lập `autolink: { label: never }`.

## 2. Nguồn mới trong `config/sources.yaml`

Tất cả các nguồn bổ sung đều được gắn nhãn dưới mục `# wave3 iota`, tuân thủ nguyên tắc `reuse: paraphrase-only` và ngày xác minh `verified_license_at: '2026-10-17'`:

| ref | Bậc | Loại | Nhà xuất bản / Cơ quan | Giấy phép | Ghi chú |
|---|---|---|---|---|---|
| `ti` | B | docs | Texas Instruments Incorporated | all-rights-reserved | Tài liệu kỹ thuật, application notes vi điều khiển, ADC, PWM, SBC |
| `linux-kernel` | B | docs | The Linux Kernel Organization | GPL-2.0 | Tài liệu hệ thống nhúng Linux cho GPIO, I2C, SPI, UART |
| `espressif` | B | docs | Espressif Systems | all-rights-reserved | Tài liệu ESP-IDF cho ESP32 và các chế độ ngủ tiết kiệm điện |
| `arduino-docs` | B | docs | Arduino LLC | all-rights-reserved | Tài liệu chính thức và hướng dẫn lập trình nền tảng Arduino |
| `fda-gov` | B | docs | U.S. Food and Drug Administration | public-domain-us-gov | Tài liệu quy chuẩn kỹ thuật cho thiết bị y tế đeo theo dõi sức khỏe |
| `faa-gov` | B | docs | Federal Aviation Administration | public-domain-us-gov | Định nghĩa và tài liệu kỹ thuật về mạng lưới định vị vệ tinh GNSS |
| `noaa-gov` | B | docs | National Oceanic and Atmospheric Administration | public-domain-us-gov | Tài liệu nguyên lý và ứng dụng cảm biến đo khoảng cách LiDAR |
| `doe-gov` | B | docs | U.S. Department of Energy | public-domain-us-gov | Báo cáo hiện đại hóa lưới điện và hạ tầng đo đếm công tơ thông minh |
| `thread-group` | A | standard | Thread Group, Inc. | all-rights-reserved | Đặc tả và tổng quan công nghệ mạng lưới không dây Thread |
| `wifi-alliance` | A | standard | Wi-Fi Alliance | all-rights-reserved | Đặc tả công nghệ và chương trình chứng nhận chuẩn vô tuyến Wi-Fi |
| `tinyml-org` | B | docs | tinyML Foundation | all-rights-reserved | Tài liệu và tiêu chuẩn học máy trên thiết bị vi điều khiển công suất thấp |

Mọi URL được sử dụng đều đã được kiểm tra phản hồi HTTP 200 thực tế, văn bản nguồn được lưu trữ tại `candidates/.sources/` (git-ignored) để phục vụ kiểm tra sao chép văn bản.

## 3. Kết quả các cổng kiểm tra chất lượng (Quality Gates)

| Kiểm tra | Lệnh thực thi | Dòng kết quả cuối cùng |
|---|---|---|
| **Gate 1: Schema & Rules** | `pnpm tb validate --strict` | `✔ Validation passed successfully!` |
| **Gate 2: Build & Indices** | `pnpm tb build` | `✔ Successfully generated 22 index files and 1389 dist artifacts:` |
| **Gate 3: Collisions Check** | `pnpm tb report collisions` | `✔ mọi homonym đều có qualifier và confusable hai chiều` |
| **Gate 4: Overlap Check (8 từ)** | `pnpm tb check overlap` | `✔ Không có đoạn trùng ≥ 8 từ / no copied runs of 8+ words` |
| **Gate 5: Overlap Check (6 từ)** | `pnpm tb check overlap --size 6` | `✔ Không có đoạn trùng ≥ 6 từ / no copied runs of 6+ words` |

## 4. Các điểm lưu ý và giải quyết tồn đọng

- Không có khái niệm nào trong lô 28 khái niệm của `iota` bị bỏ sót hoặc không hoàn thành. Toàn bộ 28 khái niệm đều đạt chất lượng xuất sắc.
- Khi rà soát ở ngưỡng trùng lặp nghiêm ngặt 6 từ (`--size 6`), ban đầu phát hiện 2 cụm từ kỹ thuật trùng lặp ngẫu nhiên với văn bản nguồn:
  - Cụm `"internal pull up or pull down"` trong `gpio` (en) trùng với tài liệu Espressif -> Đã viết lại thành `"activate integrated biasing resistors (pull-up or pull-down)"`.
  - Cụm `"2 4 ghz ieee 802 15"` trong `thread-iot` (en) trùng với tài liệu IETF -> Đã diễn đạt lại chính xác thành `"low-rate wireless personal area network radios (IEEE 802.15.4) within the worldwide 2.4 GHz spectrum band"`.
- Toàn bộ các cảnh báo đối ứng confusable (quy tắc 10) và quy tắc nhãn viết tắt acronym autolink (quy tắc 14) phát sinh trong quá trình soạn thảo đều đã được cấu hình chặt chẽ, kiểm tra đối xứng và đạt chuẩn 0 cảnh báo, 0 lỗi.
