# MECHVERSE Backend

Chuột phải thư mục **backend** → **Open in Integrated Terminal** → chạy:

```sh
yarn start
```

API: **http://localhost:3001/**. Dependencies đã cài trong workspace này. Máy mới chạy `yarn install --frozen-lockfile` trước; Node >=22.12, Yarn 1.22.22.

Terminal workspace dùng **MECHVERSE PowerShell**: mở terminal mới, bấm **↑** để chọn `yarn start` rồi **Enter**. Lịch sử được giữ riêng cho backend. Terminal cũ cần đóng và mở lại. Khi server đang chạy, dùng `Ctrl+C` để về dấu nhắc trước khi gọi lịch sử. Nếu dùng PowerShell ngoài profile và bị chặn `.ps1`, chạy `yarn.cmd start`.

## MongoDB Atlas

Backend chạy được dù chưa cấu hình database. Để kết nối Atlas:

1. Mở `backend/.env` đã được tạo sẵn. `.env.example` là mẫu để copy khi cài trên máy mới; `.env` là file runtime thực và được cấu hình ignore.
2. Điền URI thật vào `MONGODB_URI` trong file `.env` trên máy bạn; không dán mật khẩu vào chat hoặc commit file này.
3. Đặt `MONGODB_DB_NAME` theo database bạn muốn dùng, kiểm tra database user và network access trong Atlas.
4. Dừng và chạy lại `yarn start` sau khi đổi `.env`.

Ứng dụng không ghi URI/mật khẩu ra log. Chỉ thông báo đã kết nối sau khi `mongoose.connect()` thực sự thành công. Chưa có URI ở lượt triển khai nên **chưa kiểm kết nối Atlas thật**.

## Endpoint hiện có

| Endpoint | Ý nghĩa |
| --- | --- |
| `GET /` | Nhận diện backend và đường dẫn kiểm tra |
| `GET /api/health` | API đang chạy; `database.status` báo trạng thái MongoDB thực |
| `GET /api/ready` | HTTP 200 chỉ khi MongoDB connected, còn lại HTTP 503 |

Health HTTP 200 không đồng nghĩa Atlas đã kết nối. Khi chưa đặt URI: `database.status = not_configured`, `connected = false`.

## Model dữ liệu

`src/models/` có các Mongoose schema nền:

- `ProductVariant.ts`: định danh cấu hình sản phẩm; mặc định giáo dục demo.
- `AssetRevision.ts`: phiên bản geometry và danh sách occurrence không trùng.
- `LessonRevision.ts`: mã bài, release, mục tiêu; mặc định nháp demo.

Chưa có CRUD, đăng nhập, quyền sở hữu, seed dữ liệu Atlas, lưu tiến độ server hoặc XP. Không tự tạo collection/index khi kết nối. Model chỉ là cấu trúc dữ liệu, không có nghĩa đã có bản ghi trong Atlas.

## Lệnh

```sh
yarn test
yarn build
yarn start:production
```

`start` dùng tsx watch để phát triển. `start:production` dùng `dist/server.js` sau build. `Ctrl+C` đóng server và kết nối MongoDB. Mặc định bind local ở cổng 3001; chỉnh `PORT`, `HOST`, `FRONTEND_ORIGIN` trong `.env` khi cần.
