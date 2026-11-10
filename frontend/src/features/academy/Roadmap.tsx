import { useState } from "react";
import { ArrowRight, BookOpen, Route } from "lucide-react";
import { Link, navigate } from "../../navigation";
import { modules, slots, branches, validateCurriculum } from "./curriculum";
import { findLesson, lessons, sources } from "./content";
import { useProgress, SaveStatus } from "./ProgressContext";
import { emptyLearning, objectiveState, dueCards } from "./learning";
export const stateLabels = {
  unseen: "Chưa học",
  viewed: "Đã xem",
  practice: "Đang luyện · cần bằng chứng",
  demonstrated: "Đã chứng minh ở bài này",
  review: "Cần ôn",
};
export default function Roadmap() {
  const { progress, update } = useProgress();
  const [goal, setGoal] = useState(
    progress.learning?.onboarding?.goal ?? "Tôi chưa biết gì",
  );
  const [minutes, setMinutes] = useState(
    progress.learning?.onboarding?.minutes ?? 20,
  );
  const recent = Object.entries(progress.learning?.positions ?? {})
    .sort(([, a], [, b]) => b.updatedAt.localeCompare(a.updatedAt))
    .find(([id]) => findLesson(id));
  const resume = recent ? findLesson(recent[0]) : undefined;
  const due = dueCards(progress, lessons);
  const errors = validateCurriculum(slots, branches, lessons, sources);
  function start() {
    update((p) => ({
      ...p,
      learning: {
        ...(p.learning ?? emptyLearning()),
        onboarding: { goal, minutes },
      },
    }));
    navigate("/learn/M01-L01");
  }
  return (
    <div className="academy-page roadmap-page">
      <header className="a-page-heading">
        <span className="a-kicker">MECHVERSE / LỘ TRÌNH CƠ KHÍ</span>
        <h1>Từ số 0 đến thiết kế cơ khí.</h1>
        <p>
          Biết bắt đầu ở đâu, học gì tiếp và cần chứng minh điều gì. Học có
          hướng dẫn trước, chọn cách ôn theo bài khi bạn cần.
        </p>
        <div className="a-heading-meta">
          <span>16 module · 96 bài trong kế hoạch</span>
          <span>
            {slots.filter((s) => s.coverage === "authored").length} bài đủ phạm
            vi nhập môn
          </span>
          <span>
            {slots.filter((s) => s.coverage === "partial").length} bài kế thừa
            một phần
          </span>
        </div>
      </header>
      <SaveStatus />
      {errors.length > 0 && (
        <p role="alert">Lộ trình có lỗi dữ liệu cần sửa: {errors.join("; ")}</p>
      )}
      <section className="roadmap-start" aria-labelledby="zero-heading">
        <div>
          <span className="a-kicker">KHÔNG CẦN KIẾN THỨC TRƯỚC</span>
          <h2 id="zero-heading">Bắt đầu bằng một đồ vật quen thuộc.</h2>
          <p>
            M01-L01 chỉ có ba thuật ngữ đầu tiên. Bạn không cần tự chọn khóa hay
            làm bài kiểm tra đầu vào.
          </p>
          <label>
            Mục tiêu lúc này
            <select value={goal} onChange={(e) => setGoal(e.target.value)}>
              <option>Tôi chưa biết gì</option>
              <option>Tôi muốn học CAD</option>
              <option>Tôi muốn hiểu cấu tạo đồ vật</option>
            </select>
          </label>
          <label>
            Thời gian mỗi lần học
            <select
              value={minutes}
              onChange={(e) => setMinutes(Number(e.target.value))}
            >
              <option value={10}>Khoảng 10 phút</option>
              <option value={20}>Khoảng 20 phút</option>
              <option value={30}>Khoảng 30 phút</option>
            </select>
          </label>
          <p className="a-muted">
            Tùy chọn để chia thời gian học, không dùng để gán kiểu học hay đánh
            giá năng lực. Có thể bắt đầu ngay với mặc định.
          </p>
          <button className="a-button" onClick={start}>
            Bắt đầu từ số 0 <ArrowRight size={18} />
          </button>
        </div>
        <aside>
          <Route size={36} />
          <h3>Quan sát → hiểu → tự làm</h3>
          <p>
            Đọc định nghĩa và ví dụ, tự trả lời, xem vì sao đúng/sai, rồi ôn
            hoặc vận dụng. Không có điểm từ việc mở trang.
          </p>
          {resume && (
            <Link className="a-button secondary" href={`/learn/${resume.id}`}>
              Tiếp tục: {resume.title}
            </Link>
          )}
          <Link className="a-text-link" href="/practice">
            Ôn đến hạn: {due.length} thẻ <ArrowRight size={16} />
          </Link>
        </aside>
      </section>
      <section aria-label="Các module cốt lõi" className="module-grid">
        {modules.map((m) => (
          <article data-module={m.id} key={m.id} className="roadmap-module">
            <header>
              <span className="a-kicker">{m.id} / BẮT BUỘC THEO MỤC TIÊU</span>
              <h2>{m.title}</h2>
              <p>Đầu ra: {m.outcome}.</p>
              <p className="module-prerequisites">
                Đầu vào:{" "}
                {m.prerequisiteIds.length
                  ? m.prerequisiteIds.join(", ")
                  : "Không cần kiến thức trước"}
                . Các bài ghi tiên quyết cụ thể; bạn vẫn được xem trước.
              </p>
            </header>
            <ol>
              {slots
                .filter((s) => s.moduleId === m.id)
                .map((s) => {
                  const l = s.lessonId ? findLesson(s.lessonId) : undefined;
                  return (
                    <li key={s.id}>
                      <span className="a-kicker">{s.id}</span>
                      {l ? (
                        <Link href={`/learn/${s.id}`}>
                          <BookOpen size={16} />
                          <strong>{s.title}</strong>
                          <ArrowRight size={16} />
                        </Link>
                      ) : (
                        <strong>{s.title}</strong>
                      )}
                      <small>
                        {l
                          ? `${s.coverage === "partial" ? "Có bài nền; còn thiếu độ sâu module · " : ""}${stateLabels[objectiveState(progress, l)]}`
                          : "Chưa mở · Đang trong kế hoạch biên soạn"}
                      </small>
                    </li>
                  );
                })}
            </ol>
          </article>
        ))}
      </section>
      <section className="roadmap-branches">
        <span className="a-kicker">SAU NỀN TẢNG / CHƯA MỞ</span>
        <h2>Các nhánh chuyên sâu</h2>
        <p>
          Chọn nhánh theo công việc. Sáu bài mỗi module là khung tổ chức; các
          chủ đề CAD, tính toán và dung sai cần nhiều phiên thực hành.
        </p>
        <div>
          {branches.map((b) => (
            <article key={b.id}>
              <h3>
                {b.id} · {b.title}
              </h3>
              <p>{b.scope}.</p>
              <small>
                Đầu vào: {b.prerequisiteIds.join(", ")}. Chưa có gói nội dung và
                đánh giá cho nhánh này.
              </small>
            </article>
          ))}
        </div>
        <p>
          Bổ trợ xuyên suốt: toán ứng dụng, tiếng Anh kỹ thuật, đo lường/chất
          lượng, bảng tính, giá thành, quản lý phiên bản và tiêu chuẩn. M07 có
          thể bắt đầu sau nền hình học M02 và hình chiếu cơ bản M05; không cần
          học hết mọi lý thuyết trước CAD.
        </p>
      </section>
      <aside className="a-scope-note">
        <strong>Đủ kiến thức để làm việc có hướng dẫn, có bằng chứng.</strong>
        <p>
          Chưa có bài nào được chuyên gia duyệt. Những bài đã mở là
          personal-preview. Bài thực hành cần rubric và review phù hợp; các câu
          tự kiểm không cấp giấy hoàn thành khóa hay quyền vận hành máy. Khung
          96 bài là kế hoạch, không phải 96 bài đã viết.
        </p>
        <Link href="/academy">
          Thư viện bài hiện có <ArrowRight size={16} />
        </Link>
      </aside>
    </div>
  );
}
