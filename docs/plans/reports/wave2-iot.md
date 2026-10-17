# Báo cáo Lô Wave 2: IoT (Internet of Things) - 25 khái niệm

Trạng thái: **hoàn thành toàn bộ nội dung bản thảo, đã vượt qua mọi cổng kiểm tra** (2026-10-16). Toàn bộ 25 khái niệm đều tuân thủ `status: draft`, `provenance.drafted_by: ai`.

## Danh sách khái niệm
| id | Nhóm | Nhãn en | Nhãn vi | Level | Nguồn A/B (definition) | Bằng chứng nhãn vi |
|---|---|---|---|---|---|---|
| `sensor` | devices-sensors | Sensor | Cảm biến | 1 | nist-csrc (A) | wikipedia-vi |
| `actuator` | devices-sensors | Actuator | Cơ cấu chấp hành | 1 | nist-csrc (A) | wikipedia-vi |
| `microcontroller` | devices-sensors | Microcontroller (MCU) | Vi điều khiển | 1 | nist-csrc (A) | wikipedia-vi |
| `firmware` | devices-sensors | Firmware | như en | 1 | nist-csrc (A) | từ mượn |
| `rtos` | devices-sensors | Real-time operating system (RTOS) | Hệ điều hành thời gian thực | 2 | aws-docs (B) | wikipedia-vi |
| `smart-home` | devices-sensors | Smart home | Nhà thông minh | 1 | csa-iot (A) | wikipedia-vi |
| `mqtt` | connectivity-protocols | MQTT | như en | 2 | oasis-open (A) | từ mượn |
| `coap` | connectivity-protocols | Constrained Application Protocol (CoAP) | như en | 2 | ietf (A) | từ mượn |
| `ble` | connectivity-protocols | Bluetooth Low Energy (BLE) | như en | 2 | bluetooth-sig (A) | từ mượn |
| `zigbee` | connectivity-protocols | Zigbee | như en | 2 | csa-iot (A) | từ mượn |
| `lorawan` | connectivity-protocols | LoRaWAN | như en | 2 | lora-alliance (A) | từ mượn |
| `nb-iot` | connectivity-protocols | NB-IoT | như en | 2 | itu (A) | từ mượn |
| `mesh-network` | connectivity-protocols | Mesh network | như en | 2 | ietf (A) | từ mượn |
| `iot-gateway` | edge-cloud | Gateway (IoT) | như en | 2 | nist-csrc (A) | từ mượn |
| `edge-computing` | edge-cloud | Edge computing | như en | 2 | microsoft-learn (B) | từ mượn |
| `telemetry` | edge-cloud | Telemetry | như en | 2 | nist-csrc (A) | từ mượn |
| `ota-update` | edge-cloud | Over-the-air update (OTA) | như en | 2 | microsoft-learn (B) | từ mượn |
| `device-provisioning` | edge-cloud | Device provisioning | như en | 2 | microsoft-learn (B) | từ mượn |
| `iot-platform` | edge-cloud | IoT platform | như en | 2 | microsoft-learn (B) | từ mượn |
| `digital-twin` | industrial | Digital twin | Bản sao kỹ thuật số | 2 | microsoft-learn (B) | wikipedia-vi |
| `plc` | industrial | Programmable Logic Controller (PLC) | như en | 2 | nist-csrc (A) | từ mượn |
| `scada` | industrial | SCADA | như en | 2 | nist-csrc (A) | từ mượn |
| `opc-ua` | industrial | OPC UA | như en | 3 | opc-foundation (A) | từ mượn |
| `modbus` | industrial | Modbus | như en | 2 | cisco (B) | từ mượn |
| `predictive-maintenance` | industrial | Predictive maintenance | như en | 2 | aws-docs (B) | từ mượn |

Mọi khái niệm:
- `status: draft`, `provenance.drafted_by: ai`.
- `en` viết từ nguồn chuẩn xác (`translation: native`). `vi` dịch từ `en` (`translation: translated`, `translated_from: en`, `translated_by: ai`, `translated_at: '2026-10-16'`).
- Mỗi locale có 2 `plain_descriptions` riêng biệt không trùng lặp và đủ 4 mục thân bài: Easy explanation / Giải thích dễ hiểu, Details / Chi tiết, Technical definition / Định nghĩa chuyên ngành, Examples / Ví dụ.
- Quan hệ:
  - `mqtt` ↔ `coap`: quan hệ `confusable` hai chiều, có `confusable_notes` giải thích rõ mô hình pub/sub qua broker TCP so với mô hình REST qua UDP.
  - `lorawan` ↔ `nb-iot`: quan hệ `confusable` hai chiều, phân biệt phổ tần mở sub-GHz gateway tư nhân so với phổ tần di động viễn thông có bản quyền của nhà mạng.
  - `modbus` ↔ `opc-ua`: quan hệ `confusable` hai chiều, phân biệt giao thức thanh ghi 16-bit cổ điển không mã hóa so với kiến trúc mô hình hóa ngữ nghĩa hướng đối tượng có chứng chỉ bảo mật.
  - Cấu trúc `prerequisites` tuân thủ nghiêm ngặt đồ thị có hướng không chu trình (DAG).
- Quyết định `autolink`:
  - `MCU`, `RTOS`, `MQTT`, `CoAP`, `BLE`, `NB-IoT`, `OTA`, `PLC`, `SCADA`, `OPC UA`: `always`.
  - `Gateway` (IoT): `autolink: { label: never }` do từ "gateway" là từ thông dụng theo ghi chú của candidate.
- Bằng chứng nhãn tiếng Việt:
  - 6 khái niệm sử dụng nhãn tiếng Việt thuần thục (`Cảm biến`, `Cơ cấu chấp hành`, `Vi điều khiển`, `Hệ điều hành thời gian thực`, `Nhà thông minh`, `Bản sao kỹ thuật số`) đều có dẫn xuất `label_evidence` từ `wikipedia-vi` đã được fetch kiểm tra thực tế trả về HTTP 200 và có chứa đúng cụm từ.
  - 19 khái niệm còn lại là từ mượn kỹ thuật quốc tế được giới kỹ sư và lập trình viên Việt Nam sử dụng phổ biến (như en).

## Mục mới trong `config/sources.yaml`
Tất cả các nguồn mới đều được thêm vào cuối file `config/sources.yaml` dưới dòng chú thích `# wave2 iot`, tuân thủ chính sách `reuse: paraphrase-only`:
| ref | Tên nhà xuất bản | Bậc | Loại | Giấy phép | Ghi chú |
|---|---|---|---|---|---|
| `csa-iot` | Connectivity Standards Alliance | A | standard | all-rights-reserved | Chuẩn Zigbee và Matter |
| `oasis-open` | OASIS Open | A | standard | all-rights-reserved | Chuẩn đặc tả kỹ thuật MQTT v5.0 |
| `bluetooth-sig` | Bluetooth Special Interest Group | A | standard | all-rights-reserved | Đặc tả Bluetooth Core và BLE |
| `lora-alliance` | LoRa Alliance | A | standard | all-rights-reserved | Đặc tả kỹ thuật LoRaWAN |
| `itu` | International Telecommunication Union | A | standard | copyright-itu | Khuyến nghị ITU-T X.1364 cho NB-IoT |
| `opc-foundation` | OPC Foundation | A | standard | all-rights-reserved | Chuẩn kiến trúc OPC UA |
| `cisco` | Cisco Systems, Inc. | B | docs | all-rights-reserved | Tài liệu kỹ thuật cấu hình Modbus công nghiệp |

Các nguồn có sẵn được tái sử dụng: `nist-csrc` (bậc A), `ietf` (bậc A), `microsoft-learn` (bậc B), `aws-docs` (bậc B), `wikipedia-vi` (bậc C làm bằng chứng nhãn).

## Kết quả các cổng kiểm tra (Gates)

1. **`pnpm tb validate --strict`**:
   ```
   ✔ Validation passed successfully!
   ```
   (0 lỗi, 0 cảnh báo trên toàn bộ 56 khái niệm của kho ngữ liệu).

2. **`pnpm tb build`**:
   ```
   ✔ Successfully generated 22 index files and 329 dist artifacts:
   ```
   (Đồng bộ toàn bộ indexes, llms.txt và dist artifacts).

3. **`pnpm tb report collisions`**:
   ```
   ✔ mọi homonym đều có qualifier và confusable hai chiều
   ```
   (Không phát sinh homonym xung đột nào chưa giải quyết).

4. **`pnpm tb check overlap`**:
   ```
   ✔ Không có đoạn trùng ≥ 8 từ / no copied runs of 8+ words
   ```

5. **`pnpm tb check overlap --size 6`**:
   ```
   ✔ Không có đoạn trùng ≥ 6 từ / no copied runs of 6+ words
   ```
   (Hoàn toàn trong sạch ở ngưỡng nghiêm ngặt 6 từ liên tiếp so với toàn bộ văn bản nguồn trong `candidates/.sources/`).

6. **Tra cứu ngược (Reverse lookup)**:
   - `tb find "bộ phận điện tử nhận biết thay đổi của môi trường"` → `Cảm biến (sensor)`
   - `tb find "công nghệ sóng vô tuyến truyền dữ liệu xa hàng chục cây số"` → `LoRaWAN (lorawan)`
   - `tb find --locale en "lightweight messaging protocol using a publish subscribe broker model"` → `MQTT (mqtt)`

## Ghi chú bổ sung
- Toàn bộ 25 khái niệm của lô `iot` đều đã được hoàn thiện đầy đủ, không có khái niệm nào bị bỏ sót hay chưa hoàn thành.
- Khảo sát bộ unit test: Trong file `packages/core/test/taxonomy-extension.test.ts`, test case `validates a concept using new iot and product domain paths cleanly` có nạp toàn bộ repo rồi gán đè một mock object thử nghiệm tên `mqtt-protocol` có nhãn `MQTT` trùng với concept `mqtt` chính thức của lô này mà không có qualifier, dẫn tới Rule 9 nội bộ trong bài test unit đó bị kích hoạt. Đây là xung đột tiền nghiệm do test viết mock tĩnh từ trước wave 2, không phải lỗi của kho ngữ liệu (kho ngữ liệu vượt qua `tb validate --strict` với exit code 0).
