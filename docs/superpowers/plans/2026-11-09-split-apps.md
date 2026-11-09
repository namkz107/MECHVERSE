# Tách frontend/backend — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Mở terminal trong `frontend/` hoặc `backend/`, chạy `yarn start` để khởi động đúng ứng dụng đó.

**Architecture:** Chuyển nguyên frontend sang thư mục riêng, không dựng lại. Backend Express/TypeScript riêng, MongoDB/Mongoose theo yêu cầu Atlas của người dùng. DB là cấu hình tùy chọn cho nền tảng API; liveness khác readiness. Không tuyên bố kết nối Atlas khi không có credentials.

**Tech Stack:** Frontend giữ nguyên React/Vite/R3F; backend Express/Mongoose/tsx; Yarn 1.22.22 đang có qua Corepack.

**Spec:** Yêu cầu người dùng 09/11/2026 tách hai thư mục; docs/FRONTEND-QUALITY.md và phạm vi demo hiện có.

## Constraints / review focus
- Giữ source, GLB, manifest, tests và hai prompt; không git init. Kiểm đường dẫn tuyệt đối nằm trong workspace trước mọi move thư mục trên Windows.
- Không đọc/in bí mật. Chỉ tạo `.env.example`, không đặt URI Atlas giả; `.env` bị ignore. Chưa seed hoặc ghi vào DB từ xa.
- `frontend/yarn start` cổng 5173; `backend/yarn start` cổng 3001. Root chỉ tài liệu/điều phối, không chứa một app Vite thứ hai.
- Sửa đường dẫn ảnh QA thành `../docs/qa`, giữ import và đường dẫn asset public sau di chuyển. Proxy `/api` từ frontend sang backend.
- Model nền: ProductVariant, AssetRevision, LessonRevision; đây là schema khởi đầu, chưa thay thế toàn bộ hệ dữ liệu blueprint hoặc kết quả học server.
- MongoDB không cấu hình/lỗi phải phân biệt rõ; API khởi động được để quan sát health; readiness không giả thành công.

## Tasks
1. [x] Chuyển frontend nguyên trạng bằng move đã kiểm target; package riêng, config/test đường dẫn; chạy unit và build.
2. [x] Backend riêng: test RED health/readiness/error và validation model trước implementation; cấu hình env, connect/disconnect, graceful shutdown, model tối thiểu. GREEN test và build.
3. [x] Yarn lockfiles và script start mỗi bên; giữ npm lock gốc làm bản lưu migration. README từng thư mục và hướng dẫn root.
4. [x] Chạy hai `yarn start` từ đúng cwd, HTTP health trực tiếp/proxy/asset, E2E và render lại một lượt có mục tiêu, review độc lập và QA report.

## Decisions / ledger
- Yêu cầu Atlas của người dùng xác định MongoDB/Mongoose cho backend mới, thay cho phương án PostgreSQL chưa triển khai. Chưa có DB hoặc schema cũ để migrate.
- Không có Git nên thao tác tại workspace; ghi lại các đường dẫn di chuyển trong báo cáo thay vì tạo worktree.
- Task 1 complete: chuyển đúng target, unit frontend 9/9 và build đạt, GLB giữ 648,824 byte.
- Task 2 complete: 9 backend test RED → GREEN, build đạt; kiểm thêm lỗi kết nối MongoDB thật trên loopback, không liên hệ Atlas hoặc ghi dữ liệu.
- Task 3 complete: Yarn 1.22.22, lock riêng, npm lock lưu migration, CMD default chỉ ở workspace để giữ nguyên execution policy hệ thống.
- Task 4 complete: chạy thật cả hai folder, proxy health đạt; E2E 12/12; ảnh desktop/mobile đã xem lại; review độc lập không có Critical/Important. Chi tiết bằng chứng tại QA-REPORT.md.
- Review ruling: shell không escalated không đọc được global Yarn shim do sandbox; CMD mới có quyền đọc công cụ đã tìm Yarn bằng PATH có sẵn, không có PATH tạm. Không sửa cấu hình hệ thống để xử lý một hạn chế của tool sandbox.
- Remaining limits: không chứng nhận Atlas/CRUD/auth hoặc toàn bộ blueprint; giữ localStorage demo và cảnh báo chunk viewer, dừng mở rộng phạm vi.
