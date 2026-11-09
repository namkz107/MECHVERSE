import {
  ArrowRight,
  BookOpen,
  Check,
  Compass,
  Layers3,
  RotateCcw,
  Target,
} from "lucide-react";
import type { LessonState } from "../lesson/lesson";
export default function Dashboard({
  lesson,
  onLearn,
  onExplore,
  saved,
  retry,
}: {
  lesson: LessonState;
  onLearn: () => void;
  onExplore: () => void;
  saved: boolean | null;
  retry: () => void;
}) {
  const complete = lesson.stage === "complete";
  const started = lesson.stage !== "observe";
  return (
    <div className="dashboard">
      <div className="eyebrow">
        <span className="section-number">02</span> KHÔNG GIAN CỦA BẠN
      </div>
      <h1>Học cơ khí, bắt đầu từ điều quen thuộc.</h1>
      <p>
        Quan sát một đồ vật. Tìm hiểu từng bộ phận. Tự giải thích điều bạn vừa
        khám phá.
      </p>
      <section className="continue-card">
        <div>
          <span className="badge amber">
            Bài học demo · Chưa duyệt chuyên môn
          </span>
          <h2>
            {complete
              ? "Thử giải thích lại bằng lời của bạn."
              : started
                ? "Tiếp tục từ chỗ bạn đã dừng."
                : "Bài học đầu tiên của bạn."}
          </h2>
          <p>F01 — Phân biệt chi tiết và cụm qua mô hình chiếc quạt.</p>
          <span className="lesson-state">
            {complete ? <Check size={17} /> : <Target size={17} />}{" "}
            {complete
              ? "Đã hoàn thành demo"
              : started
                ? "Đang luyện demo"
                : "Chưa bắt đầu"}
          </span>
          <button className="button primary" onClick={onLearn}>
            {complete
              ? "Xem lại kết quả demo"
              : started
                ? "Tiếp tục demo F01"
                : "Bắt đầu demo F01"}
            <ArrowRight size={17} />
          </button>
        </div>
        <div className="dashboard-diagram" aria-hidden="true">
          <div className="diagram-ring">
            <Layers3 size={68} />
          </div>
          <span>ĐỒ VẬT → CỤM → CHI TIẾT</span>
          <i>EDU-FAN-01</i>
        </div>
      </section>
      <div className="dashboard-grid">
        <section className="dashboard-card panel">
          <Compass size={24} />
          <h2>Tự do khám phá</h2>
          <p>
            Xoay, tách cụm và chọn từng bộ phận. Những lượt khám phá không tự
            chuyển thành kết quả đã hiểu.
          </p>
          <button className="text-link" onClick={onExplore}>
            Mở Explorer 3D
            <ArrowRight size={16} />
          </button>
        </section>
        <section className="dashboard-card panel">
          <BookOpen size={24} />
          <h2>Bằng chứng từ bài làm</h2>
          {complete ? (
            <p>
              Bạn đã tìm được cánh quạt và phân loại đúng trong mô hình demo.
              Thử chỉ ra một chi tiết khác và cụm chứa nó bằng lời của bạn.
            </p>
          ) : (
            <p>
              Chưa có bài demo hoàn thành. Sau khi làm F01, kết quả của chính
              nhiệm vụ đó sẽ xuất hiện tại đây.
            </p>
          )}
          <span className="dashboard-note">
            Demo trên thiết bị · Không cấp XP
          </span>
        </section>
        <section className="dashboard-card panel">
          <RotateCcw size={24} />
          <h2>Ôn lại để hiểu rõ hơn</h2>
          <p>
            {complete
              ? "Đổi góc nhìn, bỏ nhãn và tự tìm cánh quạt một lần nữa. Việc này là gợi ý tự ôn, chưa có đánh giá chuyển giao sang sản phẩm khác."
              : "Hoàn thành nhiệm vụ đầu tiên rồi quay lại quan sát theo một góc nhìn khác."}
          </p>
          <span className="dashboard-note">
            Không suy năng lực từ thời gian xem
          </span>
        </section>
      </div>
      {saved === false && (
        <div className="feedback" role="status">
          <p>Chưa lưu được demo. Kết quả hiện chỉ còn trong phiên này.</p>
          <button className="text-link" onClick={retry}>
            Thử lưu lại
          </button>
        </div>
      )}
      <div className="dashboard-limits">
        <span className="tiny-dot" />
        <p>
          Đây là bản demo có nội dung và hình học giản lược. Chưa có tài khoản
          hoặc đồng bộ máy chủ; dữ liệu có thể mất nếu bạn xóa dữ liệu trình
          duyệt.
        </p>
      </div>
    </div>
  );
}
