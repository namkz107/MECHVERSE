# MECHVERSE

Hai ứng dụng đã tách riêng. Không cần chạy lệnh từ thư mục gốc.

```text
MECHVERSE/
├── frontend/               React / TypeScript / Vite / R3F
│   ├── src/
│   ├── public/models/      GLB và manifest
│   ├── tests/
│   ├── package.json
│   └── yarn.lock
├── backend/                Express / TypeScript / Mongoose
│   ├── src/models/
│   ├── tests/
│   ├── .env.example
│   ├── package.json
│   └── yarn.lock
└── docs/                   Prompt, thiết kế, kế hoạch và ảnh QA
```

## Chạy như hai project thông thường

Mở hai terminal riêng bằng **chuột phải thư mục → Open in Integrated Terminal**:

| Thư mục terminal | Lệnh | Địa chỉ |
| --- | --- | --- |
| `backend/` | `yarn start` | http://localhost:3001/api/health |
| `frontend/` | `yarn start` | http://localhost:5173/ |

Dependencies đã được cài riêng trong hai thư mục. Trên máy mới, chạy `yarn install --frozen-lockfile` một lần ở mỗi thư mục trước khi start. Dùng Node >=22.12 và Yarn 1.22.22.

Workspace dùng profile **MECHVERSE PowerShell** trong `.vscode/settings.json`. Đóng terminal cũ bằng biểu tượng thùng rác, rồi chuột phải `frontend/` hoặc `backend/` → **Open in Integrated Terminal**. Nếu IDE chưa chọn profile mới, chọn **MECHVERSE PowerShell** trong menu terminal.

Ở terminal mới, bấm **↑** để chọn sẵn `yarn start`, rồi **Enter**. Frontend tự mở trình duyệt; backend chạy API. Lịch sử riêng của từng thư mục được lưu trong `.cache/terminal-history/`, giữ qua các phiên terminal. Lệnh `yarn` trong profile gọi `yarn.cmd`, không cần đổi execution policy của máy.

Phím ↑ dùng khi terminal đang ở dấu nhắc `PS ...>`. Nếu server đang chạy foreground, bấm `Ctrl+C` trước để quay về dấu nhắc. Cổng 5173/3001 đã có server thì dừng phiên cũ trước khi chạy thêm một phiên cùng cổng.

## Trạng thái thực tế

- Trang chủ mở Academy: 12 bài C01–C12, 48 câu tự kiểm có lời giải, hoạt động ghép chức năng/đơn vị/mô-men/hình chiếu. Nội dung có nguồn, ở personal-preview và chưa duyệt chuyên môn.
- Explorer 3D và F01 được giữ tại `/explorer`; bài làm F01 cũ không bị thay thế. Dashboard mới hiển thị tiến độ Academy trên thiết bị.
- Backend có `backend/.env`, API health/readiness và ba Mongoose model nền. Cấu hình `MONGODB_URI` trong `.env` rồi khởi động lại backend. Lượt nâng cấp này không đọc secrets hoặc kết nối Atlas thật; xem `/api/ready` để kiểm trạng thái kết nối trong môi trường của bạn.
- Frontend proxy `/api` sang backend. Tiến độ học vẫn ở trình duyệt; chưa có auth, ghi bài làm vào MongoDB hoặc XP server.
- Model 3D: `frontend/public/models/fan-edu-v1.glb`.
- Model database: `backend/src/models/`. Có schema không có nghĩa database đã có bản ghi.
- Tài liệu gốc trong `docs/` được giữ nguyên. npm lock cũ được lưu ở `docs/migrations/package-lock.frontend.before-yarn.json`; dependencies hiện tại dùng `yarn.lock` riêng mỗi ứng dụng.

Chi tiết: [Frontend](frontend/README.md), [Backend / cấu hình Atlas](backend/README.md), [QA](docs/QA-REPORT.md), [Backlog](docs/TASKS.md).

## Mở các màn hình

| URL | Nội dung |
| --- | --- |
| `/` | Trang bắt đầu và lộ trình |
| `/academy`, `/academy/foundations` | Tìm/lọc và mở 12 bài nền tảng |
| `/learn/san-pham-cum-va-chi-tiet` | C01: đọc → thử → nộp → lời giải → ôn |
| `/practice`, `/challenges` | Câu sai từ lần nộp gần nhất, bốn phòng thực hành |
| `/knowledge` | Thuật ngữ và nguồn có vị trí đối chiếu |
| `/dashboard` | Tiếp tục bài, xuất/nhập tiến độ Academy |
| `/explorer?lesson=F01` | Tiếp tục bài F01 cũ |

Tiến độ Academy lưu riêng, có bản sao trước khi nhập file và giữ lịch sử khi bài đổi revision. Xuất file để tự giữ dữ liệu; chưa đồng bộ tài khoản. Ảnh Noctua là case study ngoại hình riêng, không phải model quạt bàn đang xem. Asset 3D sản phẩm thật còn **Blocked** vì chưa đủ quyền phân phối và bằng chứng nội thất; xem [hồ sơ asset](docs/FAN-DATA-DOSSIER.md).

Tài liệu nâng cấp: [Lộ trình nội dung](docs/CURRICULUM.md), [chuẩn nội dung](docs/CONTENT-STANDARDS.md), [trạng thái triển khai](docs/IMPLEMENTATION-STATE.md), [hiệu năng Viewer](docs/VIEWER-PERFORMANCE.md).
