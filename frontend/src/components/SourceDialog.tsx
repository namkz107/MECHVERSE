import { useRef } from "react";
import { ArrowUpRight, BookOpen, X } from "lucide-react";
export function SourceDialog() {
  const ref = useRef<HTMLDialogElement>(null);
  return (
    <>
      <button className="source-link" onClick={() => ref.current?.showModal()}>
        <BookOpen size={16} />
        Nguồn và giới hạn
        <ArrowUpRight size={15} />
      </button>
      <dialog
        ref={ref}
        aria-labelledby="source-title"
        onClick={(e) => {
          if (e.target === e.currentTarget) ref.current?.close();
        }}
      >
        <div className="dialog-head">
          <span className="eyebrow">HỒ SƠ NỘI DUNG · REVISION 1</span>
          <button
            className="icon-button"
            aria-label="Đóng nguồn và giới hạn"
            onClick={() => ref.current?.close()}
          >
            <X size={20} />
          </button>
        </div>
        <h2 id="source-title">Hiểu đúng mô hình bạn đang xem</h2>
        <span className="badge amber">
          Demo giáo dục · Chưa duyệt chuyên môn
        </span>
        <h3>Hình học và cách phân nhóm</h3>
        <p>
          EDU-FAN-01 được dựng riêng bằng mã nguồn của MECHVERSE. Trong bài F01,
          ba lá cánh và tâm cánh được quy ước là một chi tiết; cụm đầu quạt chứa
          nhiều chi tiết riêng.
        </p>
        <p>
          Đây là dữ liệu bài tập, không phải hồ sơ của một mẫu quạt thương mại.
          Không có nguồn hãng xác nhận vật liệu, kích thước, kiểu ổ đỡ hoặc nội
          thất động cơ.
        </p>
        <h3>Phạm vi sử dụng</h3>
        <p>
          Dùng để quan sát, chọn bộ phận và phân biệt chi tiết với cụm. Tách cụm
          chỉ là cách sắp xếp để nhìn rõ, không hướng dẫn tháo hoặc sửa thiết bị
          điện.
        </p>
        <a
          className="text-link"
          href="/models/fan-edu-v1.manifest.json"
          target="_blank"
          rel="noreferrer"
        >
          Mở manifest của mô hình <ArrowUpRight size={15} />
        </a>
        <h3>Kiểm chứng trước khi phát hành</h3>
        <p>
          Nội dung chưa được chuyên gia cơ khí duyệt. Kết quả bài demo chỉ lưu
          trên thiết bị, không phải chứng nhận năng lực và không cấp XP.
        </p>
        <form method="dialog">
          <button className="button primary">Đã hiểu phạm vi</button>
        </form>
      </dialog>
    </>
  );
}
