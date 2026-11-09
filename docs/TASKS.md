# Milestone và backlog

## Phạm vi lượt này
- T01: cấu hình giáo dục EDU-FAN-01, giới hạn và nguồn hình học tự dựng; không tuyên bố mô hình sản phẩm thật.
- T02: generator, GLB, manifest và occurrence mapping; tỷ lệ chỉ minh họa, không có kích thước kỹ thuật đã kiểm.
- T03: Explorer thật, responsive, fallback và công cụ tương tác; đã kiểm qua unit/asset và browser trong phạm vi nêu tại QA-REPORT.md.
- T04: một hành trình F01 demo đầy đủ. Điều kiện nội dung được chuyên gia duyệt của T04 production **chưa đạt**.
- Dashboard áp dụng cùng tokens sau khi luồng Explorer/F01 đã qua lượt E2E đầu.

## Sau khi demo được kiểm
- Duyệt cơ khí/sư phạm theo từng claim và quy ước mô hình; nguồn phải có vị trí bằng chứng.
- Chọn asset sản phẩm thật nếu cần, hồ sơ biến thể và quyền dùng; tạo release mới, không ghi đè demo.
- Backend hiện dùng MongoDB/Mongoose theo hướng Atlas mà người dùng yêu cầu sau đó; có health/readiness và schema nền. Chưa có URI, chưa kiểm kết nối Atlas thật hoặc ghi dữ liệu.
- T05: gói bài có nguồn và tiên quyết. Không mở bài nội thất khi chưa có dữ liệu.
- T06: còn auth/session, ownership, API nghiệp vụ, lưu dữ liệu, đánh giá server và idempotency; nền tảng backend và local demo chưa thay thế milestone này.
- T07: AI theo bài, nguồn được duyệt, kiểm injection và hành động theo schema; không chat giả.
- T08–T09: pilot, quyền sử dụng, accessibility đa thiết bị và phát hành có rollback.

## Giới hạn kiểm tra
WebGL trên browser headless không thay thế thiết bị Android/iOS thật hoặc benchmark GPU. Không công bố FPS/retention/hiệu quả học tập từ QA giao diện.
