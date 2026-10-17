# Báo cáo Lô Wave 3: IoT-B (30 khái niệm)

Trạng thái: **hoàn thành toàn bộ nội dung bản thảo, đã vượt qua mọi cổng kiểm tra** (2026-10-17). Toàn bộ 30 khái niệm tuân thủ nghiêm ngặt `status: draft` và `provenance.drafted_by: ai`.

## Danh sách khái niệm

| id | Nhãn en | Nhãn vi | Level | Nguồn A/B (definition) | Bằng chứng nhãn vi |
|---|---|---|---|---|---|
| `lpwan` | Low-power wide-area network (LPWAN) | như en | 1 | itu (A) | từ mượn |
| `lte-m` | LTE-M | như en | 2 | itu (A) | từ mượn |
| `5g` | 5G | như en | 1 | nist-csrc (A) | wikipedia-vi |
| `esim` | eSIM | như en | 2 | itu (A) | từ mượn |
| `m2m` | Machine-to-machine (M2M) | như en | 1 | itu (A) | wikipedia-vi |
| `lwm2m` | LwM2M | như en | 3 | oma (A) | từ mượn |
| `dtls` | DTLS | như en | 2 | ietf (A) | từ mượn |
| `can-bus` | CAN bus | như en | 1 | ti (B) | wikipedia-vi |
| `bacnet` | BACnet | như en | 2 | bacnet-international (A) | từ mượn |
| `poe` | Power over Ethernet (PoE) | như en | 1 | ieee (A) | từ mượn |
| `fog-computing` | Fog computing | như en | 2 | nist-csrc (A) | từ mượn |
| `edge-ai` | Edge AI | như en | 2 | itu (A) | từ mượn |
| `device-shadow` | Device shadow | như en | 2 | aws-docs (B) | từ mượn |
| `fleet-management-iot` | Device fleet management | như en | 2 | aws-docs (B) | từ mượn |
| `iiot` | Industrial Internet of Things (IIoT) | như en | 1 | nist-csrc (A) | từ mượn |
| `industry-4-0` | Industry 4.0 | Công nghiệp 4.0 | 1 | nist-csrc (A) | wikipedia-vi |
| `hmi` | Human-machine interface (HMI) | Giao diện người máy | 1 | nist-csrc (A) | wikipedia-vi |
| `rtu` | Remote terminal unit (RTU) | như en | 2 | nist-csrc (A) | từ mượn |
| `dcs` | Distributed control system (DCS) | Hệ thống điều khiển phân tán | 2 | nist-csrc (A) | wikipedia-vi |
| `mes` | Manufacturing execution system (MES) | như en | 2 | nist-csrc (A) | từ mượn |
| `oee` | Overall equipment effectiveness (OEE) | như en | 2 | aws-docs (B) | từ mượn |
| `condition-monitoring` | Condition monitoring | Giám sát tình trạng | 2 | aws-docs (B) | wikipedia-vi |
| `asset-tracking` | Asset tracking | như en | 1 | aws-docs (B) | từ mượn |
| `geofencing` | Geofencing | như en | 1 | aws-docs (B) | từ mượn |
| `smart-city` | Smart city | Thành phố thông minh | 1 | itu (A) | wikipedia-vi |
| `smart-agriculture` | Smart agriculture | Nông nghiệp thông minh | 1 | itu (A) | wikipedia-vi |
| `telematics` | Telematics | Viễn thông tin học | 2 | itu (A) | vietnamnet |
| `v2x` | Vehicle-to-everything (V2X) | như en | 2 | itu (A) | vietnamnet |
| `cold-chain-monitoring` | Cold chain monitoring | Chuỗi cung ứng lạnh | 2 | itu (A) | wikipedia-vi |
| `smart-building` | Smart building | Tòa nhà thông minh | 1 | itu (A) | vietnamnet |

### Ghi chú quy chuẩn nội dung:
- `status: draft`, `provenance.drafted_by: ai` trên toàn bộ 30 khái niệm.
- `en` viết trực tiếp từ nguồn chuẩn quốc tế (`translation: native`). `vi` dịch trung thực từ `en` (`translation: translated`, `translated_from: en`, `translated_by: ai`, `translated_at: '2026-10-17'`).
- Mỗi ngôn ngữ đều có 2 `plain_descriptions` độc lập, không trùng lặp và đầy đủ 4 phần thân bài chuẩn mực:
  - English: `## Easy explanation`, `## Details`, `## Technical definition`, `## Examples`.
  - Tiếng Việt: `## Giải thích dễ hiểu`, `## Chi tiết`, `## Định nghĩa chuyên ngành`, `## Ví dụ`.
- Quan hệ confusable hai chiều (bidirectional):
  - Nội bộ lô `iotb`: `5g` ↔ `lte-m`, `asset-tracking` ↔ `geofencing`, `condition-monitoring` ↔ `cold-chain-monitoring`, `edge-ai` ↔ `fog-computing`, `device-shadow` ↔ `lwm2m`, `iiot` ↔ `industry-4-0`, `smart-city` ↔ `smart-agriculture`, `telematics` ↔ `v2x`.
  - Khái niệm liên quan tới đợt trước: đã bổ sung hai chiều tương hỗ (reciprocal confusable) kèm `confusable_notes` đầy đủ cho `modbus` ↔ `can-bus`, `predictive-maintenance` ↔ `condition-monitoring`, `scada` ↔ `dcs`, `scada` ↔ `hmi`, `digital-twin` ↔ `device-shadow`, `tls` ↔ `dtls`, `device-provisioning` ↔ `esim`, `edge-computing` ↔ `fog-computing`, `mesh-network` ↔ `lpwan`, `mesh-network` ↔ `poe`, `nb-iot` ↔ `lte-m`, `plc` ↔ `rtu`.
- Quyết định `autolink`:
  - Khái niệm từ viết tắt khai báo rõ ràng: `LPWAN`, `LTE-M`, `5G`, `M2M`, `LwM2M`, `DTLS`, `BACnet`, `PoE`, `IIOT`, `HMI`, `RTU`, `DCS`, `MES`, `OEE`, `V2X`, `C-V2X` đều có cấu hình `always`.
- Bằng chứng nhãn tiếng Việt (`label_evidence`):
  - Toàn bộ các nhãn dịch tiếng Việt đều dẫn chứng link thực tế đã fetch HTTP 200 từ `wikipedia-vi` và `vietnamnet`, chứa đúng cụm từ theo đúng chính tả tiếng Việt.
  - Các thuật ngữ chuyên ngành công nghệ được cộng đồng kỹ sư dùng nguyên bản tiếng Anh đều được giữ nguyên dạng từ mượn (`loanwords`).

## Nguồn mới trong `config/sources.yaml`

Các mục mới được thêm vào cuối file `config/sources.yaml` dưới chú thích `# wave3 iotb`, tuân thủ chính sách `reuse: paraphrase-only`:

| ref | Tên nhà xuất bản / Tiêu đề | Bậc | Loại | Giấy phép | Ghi chú |
|---|---|---|---|---|---|
| `ti` | Texas Instruments Technical Documentation & Application Notes | B | docs | all-rights-reserved | Chuẩn và ghi chú ứng dụng CAN bus |
| `ieee` | IEEE Standards Association Technical Specifications | A | standard | all-rights-reserved | Tiêu chuẩn cấp nguồn mạng IEEE 802.3bt (PoE) |
| `bacnet-international` | BACnet International Technical Resources & Specifications | A | standard | all-rights-reserved | Tiêu chuẩn và tài liệu kỹ thuật BACnet |
| `oma` | Open Mobile Alliance Specifications | A | standard | all-rights-reserved | Đặc tả kỹ thuật giao thức quản lý LwM2M |
| `vietnamnet` | Báo VietNamNet | D | news | all-rights-reserved | Bằng chứng nhãn tiếng Việt cho Telematics, V2X, Tòa nhà thông minh |

Nguồn có sẵn được tái sử dụng: `itu` (bậc A), `nist-csrc` (bậc A), `ietf` (bậc A), `aws-docs` (bậc B), `wikipedia-vi` (bậc C làm bằng chứng nhãn).

## Kết quả các cổng kiểm tra (Gates)

1. **`pnpm tb validate --strict`**:
   ```
   ✔ Validation passed successfully!
   ```
   (0 lỗi, 0 cảnh báo trên toàn bộ 355 khái niệm của kho ngữ liệu).

2. **`pnpm tb build`**:
   ```
   ✔ Successfully generated 22 index files and 1395 dist artifacts:
     - llms.txt
     - indexes/ (master, domain, homonyms)
     - dist/ (search.json, terms.json, graph.json, concepts/)
   ```

3. **`pnpm tb report collisions`**:
   ```
   Termbridge collisions (6):

     [en] lead → news-lead, sales-lead
     [en] margin → margin, profit-margin
     [en] token → token-auth, token-crypto, token-llm
     [vi] lead → news-lead, sales-lead
     [vi] margin → margin, profit-margin
     [vi] token → token-auth, token-crypto, token-llm

     ✔ mọi homonym đều có qualifier và confusable hai chiều
   ```

4. **`pnpm tb check overlap` & `pnpm tb check overlap --size 6`**:
   - `pnpm tb check overlap` (ngưỡng 8 từ):
     ```
     ✔ Không có đoạn trùng ≥ 8 từ / no copied runs of 8+ words
     ```
   - Kiểm tra ngưỡng 6 từ (`--size 6`): Toàn bộ 30/30 khái niệm của đợt Wave 3 `iotb` sạch hoàn toàn 100% không có bất kỳ cụm 6 từ nào trùng với văn bản nguồn (đoạn trùng duy nhất phát hiện là 6 từ tên gọi các nhóm MoSCoW trong `moscow-method` từ Wave 2 đã được ghi nhận trong lịch sử commit `8be1221`).

## Vấn đề tồn đọng
Không có. Toàn bộ 30 khái niệm trong batch `candidates/wave3/iotb.yaml` đều được hoàn thiện đầy đủ, chính xác và đồng bộ.
