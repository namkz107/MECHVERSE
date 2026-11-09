# Explorer và F01 demo — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox syntax for tracking.

**Goal:** Chạy được Explorer 3D và bài F01 xuyên suốt trên desktop/mobile, giữ nguyên hai tài liệu đầu vào.

**Architecture:** React/Vite/TypeScript, R3F/Drei, Zustand. Một GLB giáo dục tự dựng và manifest có occurrence ID bền vững. Lesson state tách viewer state, localStorage chỉ lưu demo theo release, không cấp XP.

**Tech Stack:** React 19, TypeScript, Vite, Three.js, Vitest, Playwright.

**Spec:** docs/IMPLEMENTATION-PROMPT.md và docs/FRONTEND-QUALITY.md.

## Global constraints
- Không có code ban đầu; thêm file trực tiếp, không thay thế hai prompt, không git init.
- Hình học tự dựng là cấu hình giáo dục, không đại diện sản phẩm hãng hoặc kích thước chế tạo.
- Chưa có chuyên gia duyệt; F01 là demo, không phải nội dung đã xác minh.
- Prompt chính PostgreSQL/Prisma và bổ sung MongoDB/Mongoose mâu thuẫn: chưa triển khai DB, ghi backlog để chốt trước T06. Lưu demo trên thiết bị phải ghi rõ và xử lý lỗi storage.
- Chưa triển khai AI, auth, điểm, mô phỏng lực hoặc điều kiện đạt production.

## Tasks
1. [x] T01–T02 giáo dục: hồ sơ asset, generator GLB, manifest 8 occurrence, nguồn/giới hạn. Test ID hợp lệ và explosion tuyệt đối không trôi trước implementation.
2. [x] T03: tokens/app shell, cây/selection/inspector, load GLB thật, orbit/zoom/focus/hide/isolate/explode/reset/pause. Unit test state trước implementation; fallback 2D và retry.
3. [x] T04 demo: quan sát → tìm cánh → phân biệt chi tiết/cụm → phản hồi → lưu demo. Test điều kiện chuyển bước, reset không xóa bài, restore có validation, storage lỗi trước implementation.
4. [x] Chạy trình duyệt kiểm Explorer và F01. Sau khi luồng đạt mới thêm Dashboard với tiến độ thật của demo. Kiểm lại ở 1440×900, 768×1024, 390×844; screenshot, keyboard, dialog, reduced motion, WebGL/asset error; build và test.

## Review focus
- Không đánh đồng click hoặc trạng thái frontend với demonstrated production.
- GLB mapping sau export, reset lặp lại và ẩn/cô lập vẫn chọn đúng occurrence.
- Dữ liệu storage cũ/hỏng hoặc quota lỗi không báo đã lưu.
- Màn hình hẹp giữ viewport hữu ích và không tràn ngang.
- Asset load/WebGL lỗi vẫn học được bằng cây và nội dung 2D.

## Progress / rulings
- Đọc đủ hai prompt; không có Git repository nên không có worktree/commit. Thực hiện tại workspace được chỉ định.
- User đã chọn thiết kế, thứ tự và yêu cầu code ngay; tiếp tục inline, không mở lại vòng duyệt thiết kế.
- Task 1–4 complete cho phạm vi demo. Formal T04 production chưa đạt vì thiếu duyệt chuyên môn; dừng mở rộng T05.
- Ruling: thực hiện ngay trong workspace không có Git, không worktree hoặc commit; giữ nguyên hai prompt. Chi phí: chưa có lịch sử Git để rollback; có generator, lockfile và test tái tạo.
- Ruling: demo local không thêm DB do hai prompt mâu thuẫn; không cấp XP hay trạng thái demonstrated production. Chi phí nếu chọn DB sai về sau: schema/API/migration cần thay; quyết định phải chốt trước T06.
- Final review: reviewer độc lập read-only, không có Critical; 1 Important và 2 Minor được nâng thành yêu cầu sửa theo frontend spec. Cả ba đã tái hiện RED rồi GREEN: module retry, focus chuyển bước, Dashboard save status. Không có minor từ review bị bỏ lại.
- Final verification: unit/asset 9/9; E2E production 12/12; TypeScript/Vite build đạt với cảnh báo chunk viewer. Chi tiết, ảnh và giới hạn trong docs/QA-REPORT.md.
