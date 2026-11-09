# MECHVERSE Frontend

Chuột phải thư mục **frontend** → **Open in Integrated Terminal** → chạy:

```sh
yarn start
```

Frontend tự mở trình duyệt tại **http://127.0.0.1:5173/**. Academy: `/academy`; Dashboard: `/dashboard`; Explorer và demo cũ: `/explorer?lesson=F01`. Link dashboard cũ `/?view=dashboard` vẫn chuyển hướng được.

Dependencies đã được cài ở workspace này. Trên máy mới, chạy `yarn install --frozen-lockfile` trước. Node >=22.12 và Yarn 1.22.22.

Terminal workspace dùng **MECHVERSE PowerShell**: mở terminal mới, bấm **↑** để chọn `yarn start` rồi **Enter**. Lịch sử lưu riêng cho frontend. Terminal cũ phải đóng và mở lại để nhận profile mới. Khi server đang chạy, dùng `Ctrl+C` để về dấu nhắc trước khi gọi lịch sử. Nếu dùng PowerShell ngoài profile và bị chặn `.ps1`, chạy `yarn.cmd start`.

- `src/features/academy/`: 12 bài, 48 câu, hoạt động tương tác và tiến độ local có version.
- `src/features/explorer/`: Explorer và logic demo cũ được giữ.
- `public/models/`: file GLB và manifest của mô hình quạt giáo dục giản lược, chưa phải CAD sản phẩm thật.
- `public/images/`: ảnh case study Noctua có attribution; `public/licenses/`: giấy phép font.
- `scripts/build-fan.ts`: generator hình học.
- `tests/`: unit/asset và E2E.
- `package.json`, `yarn.lock`: dependencies và lệnh riêng của frontend.

`yarn test`, `yarn build`, `yarn test:e2e`, `yarn asset:build` chạy từ thư mục này. E2E cần browser Playwright; có thể đặt `PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH` cho browser đã có. Ảnh QA ghi vào `../docs/qa/`.

Vite proxy `/api` sang `http://127.0.0.1:3001`. Frontend demo vẫn mở được khi backend chưa chạy; tiến độ hiện vẫn ở localStorage, chưa chuyển sang database hoặc chấm bài server.
