import { useState } from "react";
import {
  ArrowRight,
  Download,
  Upload,
  BookOpen,
  RotateCcw,
  Check,
  Search,
} from "lucide-react";
import { lessons, sources, findLesson } from "./content";
import { Link } from "../../navigation";
import { useProgress, SaveStatus } from "./ProgressContext";
import Activities from "./Activities";
import { restoreLesson, STORAGE_KEY as F01_KEY } from "../lesson/lesson";
import type { ActivityKind } from "./types";
import { dueCards, emptyLearning, setLearningPosition } from "./learning";
import { slotFor } from "./curriculum";
export default function StudyPages({ page }: { page: string }) {
  const { progress, importData, exportData, update } = useProgress(),
    [query, setQuery] = useState(""),
    [message, setMessage] = useState(""),
    [activity, setActivity] = useState<ActivityKind>("matching");
  const errors = lessons.flatMap((l) => {
    const s = progress.sessions[l.id],
      a = s?.revision === l.revision ? s.attempts.at(-1) : undefined;
    return a
      ? (a?.incorrectIds ?? []).map((id) => ({
          lesson: l,
          question: l.questions.find((q) => q.id === id),
        }))
      : [];
  });
  const submitted = Object.values(progress.sessions).filter(
      (s) => s.attempts.length > 0,
    ),
    working = lessons.filter(
      (l) => progress.sessions[l.id]?.phase === "working",
    );
  const title =
    page === "practice"
      ? "Ôn đúng chỗ còn vướng."
      : page === "challenges"
        ? "Hiểu bằng một lần thử."
        : page === "knowledge"
          ? "Một khái niệm, nhiều liên hệ."
          : "Góc học tập của bạn.";
  const due = dueCards(progress, lessons);
  const recent = Object.entries(progress.learning?.positions ?? {})
    .sort(([, a], [, b]) => b.updatedAt.localeCompare(a.updatedAt))
    .find(([id]) => findLesson(id));
  const resume = recent ? findLesson(recent[0]) : working[0];
  const activityList: { kind: ActivityKind; title: string; id: string }[] = [
    { kind: "matching", title: "Ghép bộ phận & chức năng", id: "C02" },
    { kind: "units", title: "Xưởng đơn vị & đường kính", id: "C03" },
    ...(findLesson("C07")
      ? [
          {
            kind: "torque" as ActivityKind,
            title: "Phòng thử mô-men",
            id: "C07",
          },
        ]
      : []),
    ...(findLesson("C11")
      ? [
          {
            kind: "projection" as ActivityKind,
            title: "Đọc hình chiếu",
            id: "C11",
          },
        ]
      : []),
  ];
  function exportFile() {
    const blob = new Blob([exportData()], { type: "application/json" });
    const url = URL.createObjectURL(blob),
      a = document.createElement("a");
    a.href = url;
    a.download = "mechverse-academy-progress.json";
    a.click();
    URL.revokeObjectURL(url);
    setMessage(
      "Đã tạo file xuất Academy. Bài F01 trên thiết bị vẫn được giữ riêng.",
    );
  }
  let legacy;
  try {
    const raw = window.localStorage.getItem(F01_KEY);
    legacy = raw ? restoreLesson(raw) : undefined;
  } catch {
    /* local status covers unavailable storage */
  }
  return (
    <div className="academy-page study-page">
      <header className="a-page-heading">
        <span className="a-kicker">
          MECHVERSE /{" "}
          {page === "practice"
            ? "ÔN TẬP"
            : page === "challenges"
              ? "PHÒNG THỰC HÀNH"
              : page === "knowledge"
                ? "SỔ TAY"
                : "TIẾN ĐỘ TRÊN THIẾT BỊ"}
        </span>
        <h1>{title}</h1>
        <p>
          {page === "challenges"
            ? "Dữ liệu giả định rõ ràng. Thử, kiểm tra và giải thích lại kết quả."
            : page === "knowledge"
              ? "Tra thuật ngữ từ các bài đang mở và tìm đúng nguồn gốc của một giải thích."
              : "Kết quả là bằng chứng của từng nhiệm vụ học thử, chưa phải năng lực đã kiểm chứng."}
        </p>
      </header>
      <SaveStatus />
      {page === "dashboard" && (
        <>
          <div className="progress-overview">
            <div>
              <strong>{working.length}</strong>
              <span>Bài đang học</span>
            </div>
            <div>
              <strong>{submitted.length}</strong>
              <span>Bài đã nộp tự kiểm</span>
            </div>
            <div>
              <strong>{errors.length}</strong>
              <span>Câu cần ôn từ lần nộp gần nhất</span>
            </div>
          </div>
          <section className="study-continue">
            <span className="a-kicker">BƯỚC TIẾP THEO</span>
            <h2>{resume?.title ?? "Một điều mới để bắt đầu."}</h2>
            <p>
              {resume?.deck ??
                "Bắt đầu M01-L01 bằng một đồ vật quen thuộc, chưa cần kiến thức cơ khí."}
            </p>
            <Link
              className="a-button"
              href={resume ? `/learn/${resume.id}` : "/academy/roadmap"}
            >
              {resume ? "Tiếp tục bài học" : "Bắt đầu từ số 0"}
              <ArrowRight size={17} />
            </Link>
          </section>
          <div className="dashboard-new-grid">
            <section>
              <BookOpen size={25} />
              <h2>Bài làm Academy</h2>
              {lessons
                .filter((l) => progress.sessions[l.id])
                .map((l) => (
                  <Link
                    className="progress-row"
                    href={`/learn/${l.slug}`}
                    key={l.id}
                  >
                    <span>
                      {l.id} · {l.title}
                    </span>
                    <small>
                      {progress.sessions[l.id].phase === "working"
                        ? "Đang làm"
                        : "Đã nộp · Xem lại"}
                    </small>
                    <ArrowRight size={15} />
                  </Link>
                ))}
              {!Object.keys(progress.sessions).length && (
                <p>
                  Bạn chưa bắt đầu bài Academy nào. Không có thành tích được tạo
                  sẵn.
                </p>
              )}
            </section>
            <section>
              <RotateCcw size={25} />
              <h2>F01 vẫn ở đây</h2>
              <p>
                {legacy
                  ? legacy.stage === "complete"
                    ? "Đã hoàn thành demo F01"
                    : "Có bài F01 đang dở trên thiết bị"
                  : "Chưa có bài làm F01 trên thiết bị này."}
              </p>
              <p>
                Bài F01 trước đây vẫn được giữ. Hoàn thành demo không tự cộng
                kết quả cho C01/C02.
              </p>
              <Link className="a-text-link" href="/explorer?lesson=F01">
                Mở F01
                <ArrowRight size={16} />
              </Link>
            </section>
          </div>
          <section className="progress-tools">
            <h2>Dữ liệu của bạn</h2>
            <p>
              Xuất tiến độ để giữ một bản riêng. Nhập file sẽ lưu bản sao dữ
              liệu Academy cũ trước khi thay thế; bài F01 trên thiết bị vẫn giữ
              nguyên. Bản F01 trong file chỉ để tham khảo, chưa thể khôi phục
              bài này trên máy khác.
            </p>
            <button className="a-button secondary" onClick={exportFile}>
              <Download size={17} />
              Xuất tiến độ Academy
            </button>
            <label className="a-button secondary">
              <Upload size={17} />
              Nhập file JSON
              <input
                className="sr-only"
                type="file"
                accept="application/json,.json"
                aria-label="Nhập tiến độ Academy"
                onChange={async (e) => {
                  const file = e.target.files?.[0];
                  if (!file) return;
                  if (file.size > 2_000_000) {
                    setMessage("File quá lớn, giới hạn 2 MB.");
                    return;
                  }
                  try {
                    const ok = importData(await file.text());
                    setMessage(
                      ok
                        ? "Đã nhập Academy và giữ bản sao trước đó. F01 trên thiết bị không đổi."
                        : "Không nhập được: file sai phiên bản/cấu trúc hoặc bộ nhớ đang bị chặn.",
                    );
                  } catch {
                    setMessage("Không đọc được file đã chọn.");
                  }
                  e.target.value = "";
                }}
              />
            </label>
            {message && <p role="status">{message}</p>}
          </section>
        </>
      )}
      {page === "practice" && (
        <>
          <section className="review-due">
            <h2>Ôn đến hạn</h2>
            <p>
              {due.length} thẻ đến hạn trên thiết bị này. Thời điểm lưu bằng
              UTC, hiển thị theo múi giờ máy; lịch 1/3/7 ngày là cấu hình thử
              nghiệm.
            </p>
            {due.map((card) => {
              const l = findLesson(card.lessonId)!;
              return (
                <Link
                  key={card.id}
                  href={`/learn/${l.id}`}
                  onClick={() =>
                    update((p) =>
                      setLearningPosition(
                        p,
                        l,
                        "cards",
                        "theory",
                        Number(card.id.split("-T").at(-1)) - 1,
                      ),
                    )
                  }
                >
                  {slotFor(l.id)?.id} · {card.front}
                </Link>
              );
            })}
            {!due.length && (
              <Link href="/academy/roadmap">
                Tiếp tục lộ trình hoặc mở flashcards trong bài
              </Link>
            )}
          </section>
          <div className="a-section-heading">
            <h2>Cần xem lại từ bài làm của bạn</h2>
            <span>{errors.length} câu</span>
          </div>
          {errors.length ? (
            <div className="practice-list">
              {errors.map(({ lesson, question }, i) => (
                <article key={question?.id ?? i}>
                  <span className="a-kicker">
                    {lesson.id} · LẦN NỘP GẦN NHẤT
                  </span>
                  <h3>{question?.prompt}</h3>
                  <p>
                    Khái niệm: {lesson.conceptIds.join(", ")}.{" "}
                    {question?.rationale} Quay lại bài để xem đáp án đã nộp, tìm
                    nguyên nhân và thử lại. Không cộng điểm từ bấm lặp.
                  </p>
                  <Link
                    className="a-text-link"
                    href={`/learn/${lesson.slug}#quiz`}
                  >
                    Ôn {lesson.id}
                    <ArrowRight size={16} />
                  </Link>
                </article>
              ))}
            </div>
          ) : (
            <div className="a-empty">
              <Check size={30} />
              <h2>Chưa có câu cần ôn từ bài đã nộp.</h2>
              <p>
                Hãy làm một bài tự kiểm. Những câu chưa đúng sẽ xuất hiện ở đây,
                không được suy từ số lượt xem.
              </p>
              <Link className="a-button" href="/academy/foundations">
                Chọn bài để học
              </Link>
            </div>
          )}
          <section className="practice-general">
            <h2>Luyện một kỹ năng cụ thể</h2>
            <p>Bài luyện độc lập không tự đánh dấu đã hoàn thành khóa.</p>
            <Activities kind="units" />
          </section>
        </>
      )}
      {page === "challenges" && (
        <>
          <div
            className="challenge-tabs"
            role="group"
            aria-label="Chọn hoạt động"
          >
            {activityList.map((item) => (
              <button
                key={item.kind}
                aria-pressed={activity === item.kind}
                onClick={() => setActivity(item.kind)}
              >
                {item.title}
              </button>
            ))}
          </div>
          <Activities key={activity} kind={activity} />
          <Link
            className="a-text-link"
            href={`/learn/${findLesson(activityList.find((a) => a.kind === activity)?.id ?? "C02")?.slug}`}
          >
            Đọc bài lý thuyết liên quan
            <ArrowRight size={16} />
          </Link>
        </>
      )}
      {page === "knowledge" && (
        <>
          <label className="a-search">
            <Search size={19} />
            <input
              aria-label="Tìm thuật ngữ"
              placeholder="Tìm mô-men, bán kính, đơn vị…"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </label>
          <div className="knowledge-grid">
            {lessons
              .flatMap((l) => l.terms.map((t) => ({ ...t, lesson: l })))
              .filter((t) =>
                `${t.term} ${t.meaning}`
                  .toLowerCase()
                  .includes(query.toLowerCase()),
              )
              .map((t) => (
                <article key={`${t.lesson.id}-${t.term}`}>
                  <span className="a-kicker">{t.lesson.id}</span>
                  <h2>{t.term}</h2>
                  <p>{t.meaning}</p>
                  <Link href={`/learn/${t.lesson.slug}`}>
                    Học trong ngữ cảnh
                    <ArrowRight size={14} />
                  </Link>
                </article>
              ))}
          </div>
          <section className="knowledge-sources">
            <h2>Kho nguồn đang dùng</h2>
            <p>
              Chỉ dùng tài liệu đã đối chiếu trong đúng phạm vi. Quyền sử dụng
              khác nhau theo nguồn; ứng dụng không lập corpus AI.
            </p>
            {sources.map((s) => (
              <details key={s.id}>
                <summary>
                  {s.publisher} — {s.title}
                </summary>
                <p>
                  {s.author} · {s.version}
                </p>
                <p>{s.locator}</p>
                <p>{s.scope}</p>
                <p>{s.usage}</p>
                <p>
                  Ngày đối chiếu {s.checkedAt}; {s.sourceStatus}. Không có
                  review chuyên gia.
                </p>
                <a href={s.url} target="_blank" rel="noreferrer">
                  Mở nguồn gốc ↗
                </a>
              </details>
            ))}
          </section>
        </>
      )}
    </div>
  );
}
