import { useEffect, useRef } from "react";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  RotateCcw,
  BookOpen,
  ExternalLink,
} from "lucide-react";
import { findLesson, lessons, sources } from "./content";
import { Link } from "../../navigation";
import { useProgress, SaveStatus } from "./ProgressContext";
import {
  ensureSession,
  setDraft,
  submitSession,
  retrySession,
} from "./progress";
import { gradeAnswer } from "./quiz";
import type { Answer, Question } from "./types";
import Activities, { LessonDiagram } from "./Activities";
import { slotFor, nextSlot, modesFor } from "./curriculum";
import { setLearningPosition, objectiveState } from "./learning";
import { ModePicker, Flashcards, Practical } from "./LearningModes";
import BeginnerDiagram from "./BeginnerDiagram";
import { stateLabels } from "./Roadmap";
import { ActivityPersistence } from "./ActivityPersistence";

export default function LessonWorkspace({ slug }: { slug: string }) {
  const lesson = findLesson(slug),
    { progress, update } = useProgress(),
    resultRef = useRef<HTMLHeadingElement>(null);
  useEffect(() => {
    if (lesson)
      update((p) => {
        p = ensureSession(p, lesson);
        const saved = p.learning?.positions[lesson.id];
        const current = saved?.revision === lesson.revision ? saved : undefined;
        const hash = location.hash.slice(1);
        const section = [
          "theory",
          "activity",
          "quiz",
          "sources",
          "practical",
        ].includes(hash)
          ? hash
          : (current?.section ?? "theory");
        const needsCourse = [
          "theory",
          "activity",
          "quiz",
          "practical",
        ].includes(hash);
        return setLearningPosition(
          p,
          lesson,
          needsCourse ? "course" : (current?.mode ?? "course"),
          section,
        );
      });
  }, [lesson?.id, lesson?.revision, update]);
  useEffect(() => {
    const section =
      location.hash.slice(1) ||
      progress.learning?.positions[lesson?.id ?? ""]?.section;
    if (section)
      requestAnimationFrame(() =>
        document.getElementById(section)?.scrollIntoView({ block: "start" }),
      );
  }, [lesson?.id]);
  if (!lesson)
    return (
      <div className="a-empty">
        <h1>Không tìm thấy bài học</h1>
        <Link href="/academy">Quay lại Academy</Link>
      </div>
    );
  const session = progress.sessions[lesson.id],
    review = session?.phase === "review",
    last = session?.attempts.at(-1),
    automatic = lesson.questions.filter((q) => q.kind !== "open"),
    next = nextSlot(lesson.id),
    slot = slotFor(lesson.id),
    position = progress.learning?.positions[lesson.id],
    mode =
      position?.revision === lesson.revision &&
      modesFor(lesson).includes(position.mode)
        ? position.mode
        : "course";
  function submit() {
    if (!lesson) return;
    update((p) => submitSession(p, lesson));
    requestAnimationFrame(() => resultRef.current?.focus());
  }
  return (
    <div className="lesson-workspace" key={lesson.id}>
      <Link className="a-back" href="/academy/roadmap">
        <ArrowLeft size={16} />
        Lộ trình học
      </Link>
      <header className="lesson-hero">
        <span className="a-kicker">
          {slot?.id ?? lesson.id}{" "}
          {slot?.id !== lesson.id ? `· ${lesson.id}` : ""} / CƠ KHÍ TỪ SỐ 0
        </span>
        <h1>{lesson.title}</h1>
        <p>{lesson.deck}</p>
        <div className="a-heading-meta">
          <span>~{lesson.minutes} phút (ước tính)</span>
          <span>{lesson.questions.length} câu tự kiểm</span>
          <span>Personal preview</span>
        </div>
      </header>
      <SaveStatus />
      <ModePicker lesson={lesson} mode={mode} />
      <div className="lesson-reading-layout">
        <article className="lesson-reading">
          {mode === "cards" && <Flashcards lesson={lesson} />}
          {mode === "explore" && (
            <section className="f01-bridge">
              <h2>Quan sát trên F01</h2>
              <p>
                Chọn cánh, so cây cấu tạo và phân loại theo quy ước mô hình. Bài
                tự kiểm của mục tiêu này vẫn ở tab Luyện quiz. F01 lưu key
                riêng, không tự chuyển thành điểm bài này.
              </p>
              <Link
                className="a-button"
                href={`/explorer?lesson=F01&from=${lesson.id}`}
              >
                Mở F01 và quay lại
              </Link>
            </section>
          )}
          <div hidden={mode !== "course"}>
            <section className="objective-box">
              <span className="a-kicker">SAU BÀI NÀY, BẠN CÓ THỂ</span>
              <ul>
                {lesson.objectives.map((o) => (
                  <li key={o}>
                    <CheckCircle2 size={17} />
                    {o}
                  </li>
                ))}
              </ul>
            </section>
            <section id="theory" className="theory-section">
              <h2>Hiểu từ điều quen thuộc</h2>
              {lesson.id.startsWith("M") && <BeginnerDiagram id={lesson.id} />}
              {lesson.blocks.map((b, i) => (
                <section
                  key={b.id}
                  className={`theory-block ${b.kind ?? "theory"}`}
                >
                  <h3>{b.title}</h3>
                  {b.body.map((p, j) => (
                    <p key={j}>{p}</p>
                  ))}
                  {b.diagram && (
                    <figure>
                      <LessonDiagram kind={b.diagram} />
                      <figcaption>
                        Sơ đồ tự dựng · Giả thiết giáo dục, không phải bản vẽ
                        chế tạo.
                      </figcaption>
                    </figure>
                  )}
                  <div className="inline-sources">
                    Đối chiếu:{" "}
                    {b.sourceRefs.map((id) => (
                      <a key={id} href={`#source-${id}`}>
                        {sources.find((s) => s.id === id)?.publisher ?? id}
                      </a>
                    ))}
                  </div>
                </section>
              ))}
            </section>
            {(lesson.id === "C01" || lesson.id === "C02") && (
              <Link
                className="f01-bridge"
                href={`/explorer?lesson=F01&from=${lesson.id}`}
                onClick={() =>
                  update((p) =>
                    setLearningPosition(p, lesson, "explore", "theory"),
                  )
                }
              >
                <BookOpen size={24} />
                <div>
                  <strong>Chạm vào cấu tạo với bài F01</strong>
                  <span>
                    Mở mô hình quạt giáo dục; bài làm F01 trước đây vẫn giữ
                    nguyên.
                  </span>
                </div>
                <ArrowRight size={20} />
              </Link>
            )}
            {lesson.mistakes && (
              <section className="observation-task">
                <h2>Lỗi dễ gặp</h2>
                <ul>
                  {lesson.mistakes.map((m) => (
                    <li key={m}>{m}</li>
                  ))}
                </ul>
              </section>
            )}
          </div>
          <section
            id="activity"
            hidden={
              !modesFor(lesson).includes("lab") ||
              (mode !== "course" && mode !== "lab")
            }
            onClickCapture={(event) => {
              if (
                (event.target as HTMLElement)
                  .closest("a")
                  ?.getAttribute("href") === "#theory"
              ) {
                update((p) =>
                  setLearningPosition(p, lesson, "course", "theory"),
                );
                requestAnimationFrame(() =>
                  document
                    .getElementById("theory")
                    ?.scrollIntoView({ block: "start" }),
                );
              }
            }}
          >
            <div className="a-section-heading">
              <h2>Thử bằng tay, hiểu bằng lý do</h2>
              <span>HOẠT ĐỘNG</span>
            </div>
            <ActivityPersistence lesson={lesson}>
              <Activities kind={lesson.activity} />
            </ActivityPersistence>
          </section>
          <section
            id="quiz"
            className="lesson-quiz"
            hidden={mode !== "course" && mode !== "quiz"}
          >
            <span className="a-kicker">TỰ KIỂM · {lesson.id}</span>
            <h2>
              {review
                ? "Đọc lời giải, tìm chỗ cần ôn"
                : "Bạn sẽ giải thích thế nào?"}
            </h2>
            <p>
              Chọn hoặc nhập câu trả lời trước khi nộp. Đây là kiểm tra local
              theo đáp án biên soạn trên thiết bị; đây là bài học thử, chưa phải
              kết quả đánh giá năng lực được chứng nhận.
            </p>
            {lesson.questions.map((q, index) => (
              <QuestionCard
                key={`${q.id}-${session?.attempts.length}-${session?.phase}`}
                question={q}
                index={index}
                answer={session?.answers[q.id]}
                review={Boolean(review)}
                onChange={(answer) =>
                  update((p) => setDraft(p, lesson, q.id, answer))
                }
              />
            ))}
            {!review ? (
              <button className="a-button" onClick={submit}>
                Nộp bài tự kiểm
                <ArrowRight size={18} />
              </button>
            ) : (
              <div className="quiz-summary" role="status">
                <h3 ref={resultRef} tabIndex={-1}>
                  Đã trả lời đúng {last?.correctIds.length ?? 0}/
                  {automatic.length} câu tự chấm
                </h3>
                <p>
                  {last?.incorrectIds.length
                    ? "Những câu chưa đúng đã được đưa vào phần Ôn tập. Xem lại lý thuyết rồi làm một lượt mới."
                    : "Bạn đã làm đúng các câu tự chấm của lần này. Hãy thử tự giải thích hoặc quan sát ở một trường hợp khác."}
                  {lesson.questions.some((q) => q.kind === "open")
                    ? " Câu mở dùng rubric tự kiểm riêng, không cộng vào số câu đúng."
                    : ""}
                </p>
                <p>
                  Trạng thái mục tiêu:{" "}
                  {stateLabels[objectiveState(progress, lesson)]}.{" "}
                  {lesson.practicalRubric
                    ? "Còn cần bài thực hành và review phù hợp."
                    : "Kết quả chỉ phản ánh các câu hỏi và giả thiết của bài này."}
                </p>
                <button
                  className="a-button secondary"
                  onClick={() => update((p) => retrySession(p, lesson))}
                >
                  <RotateCcw size={17} />
                  Luyện lại bài này
                </button>
                <Link className="a-text-link" href="/practice">
                  Mở phần ôn tập
                  <ArrowRight size={16} />
                </Link>
              </div>
            )}
          </section>
          <div hidden={mode !== "course" && mode !== "quiz"}>
            <Practical lesson={lesson} />
          </div>
          <section
            className="observation-task"
            hidden={mode !== "course" || !!lesson.practicalRubric}
          >
            <span className="a-kicker">MANG KIẾN THỨC RA NGOÀI MÀN HÌNH</span>
            <h2>Một việc nhỏ để tự quan sát</h2>
            <p>{lesson.observation}</p>
            <p className="a-muted">
              Không có nút “đã xem” tự cấp thành tích; hoạt động quan sát cần
              bạn tự ghi lại bằng chứng.
            </p>
          </section>
          <section id="sources" className="lesson-source-list">
            <h2>Nguồn, phạm vi và điều chưa được duyệt</h2>
            <p>
              Đã đối chiếu tài liệu trong phạm vi dưới đây · Chưa duyệt chuyên
              môn · Personal-preview. Nội dung không thay thế bản vẽ hoặc hướng
              dẫn của nhà sản xuất.
            </p>
            {lesson.sourceRefs.map((id) => {
              const s = sources.find((s) => s.id === id);
              return s ? (
                <details id={`source-${id}`} key={id}>
                  <summary>
                    {s.publisher} — {s.title}
                    <ExternalLink size={15} />
                  </summary>
                  <p>
                    {s.author} · {s.version}
                  </p>
                  <p>
                    <strong>Vị trí đã đọc:</strong> {s.locator}
                  </p>
                  <p>
                    <strong>Phạm vi:</strong> {s.scope}
                  </p>
                  <p>
                    <strong>Quyền:</strong> {s.usage}
                  </p>
                  <p>
                    Đối chiếu ngày {s.checkedAt}. Trạng thái: {s.sourceStatus}.
                  </p>
                  <a href={s.url} target="_blank" rel="noreferrer">
                    Mở tài liệu gốc ↗
                  </a>
                </details>
              ) : null;
            })}
          </section>
          <nav className="lesson-next" aria-label="Tiếp tục học">
            <Link href="/academy/roadmap">Về lộ trình</Link>
            {next?.lessonId ? (
              <Link className="a-button" href={`/learn/${next.id}`}>
                Bài tiếp: {next.id}
                <ArrowRight size={17} />
              </Link>
            ) : next ? (
              <p>
                {next.id}: Chưa mở. Bạn có thể ôn hoặc khám phá các bài đã có
                trên lộ trình.
              </p>
            ) : null}
          </nav>
        </article>
        <aside className="lesson-aside">
          <h2>Bản đồ bài học</h2>
          <nav>
            {[
              { section: "theory", label: "01 · Đọc và quan sát" },
              { section: "quiz", label: "02 · Tự kiểm" },
              { section: "sources", label: "03 · Nguồn và giới hạn" },
            ].map((item) => (
              <a
                key={item.section}
                href={`#${item.section}`}
                onClick={() =>
                  update((p) =>
                    setLearningPosition(p, lesson, "course", item.section),
                  )
                }
              >
                {item.label}
              </a>
            ))}
          </nav>
          <h3>Nền tảng cần biết</h3>
          {(slot?.prerequisiteIds ?? lesson.prerequisites).length ? (
            (slot?.prerequisiteIds ?? lesson.prerequisites).map((id) => (
              <Link key={id} href={`/learn/${findLesson(id)?.slug ?? id}`}>
                {id} —{" "}
                {findLesson(id)?.title ??
                  "Trong kế hoạch; bạn vẫn được xem trước"}
              </Link>
            ))
          ) : (
            <p>Có thể bắt đầu ngay. Không có bài tiên quyết.</p>
          )}
          <div hidden={mode === "cards"}>
            <h3>Thuật ngữ đầu tiên</h3>
            <dl>
              {lesson.terms.map((t) => (
                <div key={t.term}>
                  <dt>{t.term}</dt>
                  <dd>{t.meaning}</dd>
                </div>
              ))}
            </dl>
          </div>
          <span className="preview-label">Nội dung học thử có nguồn</span>
        </aside>
      </div>
    </div>
  );
}
export function QuestionCard({
  question: q,
  index,
  answer,
  review,
  onChange,
}: {
  question: Question;
  index: number;
  answer: Answer | undefined;
  review: boolean;
  onChange: (a: Answer) => void;
}) {
  const result = review ? gradeAnswer(q, answer) : null;
  const numeric =
    typeof answer === "object" &&
    answer &&
    !Array.isArray(answer) &&
    "value" in answer
      ? (answer as { value: string; unit: string })
      : { value: "", unit: q.unit ?? "mm" };
  const pairs =
    typeof answer === "object" && answer && !Array.isArray(answer)
      ? (answer as Record<string, string>)
      : {};
  const choices = q.choices ?? [];
  return (
    <fieldset
      className={`a-question ${review ? (result?.correct ? "is-correct" : "is-review") : ""}`}
      disabled={review}
    >
      <legend>
        <span>{String(index + 1).padStart(2, "0")}</span>
        {q.prompt}
      </legend>
      {q.kind === "choice" &&
        choices.map((c) => (
          <label className="quiz-option" key={c.id}>
            <input
              type="radio"
              name={q.id}
              checked={answer === c.id}
              onChange={() => onChange(c.id)}
            />
            <span>{c.label}</span>
          </label>
        ))}
      {q.kind === "multi" && (
        <>
          <p className="question-rule">
            Chọn tất cả phương án đúng; cần đúng toàn bộ tập lựa chọn.
          </p>
          {choices.map((c) => (
            <label className="quiz-option" key={c.id}>
              <input
                type="checkbox"
                checked={Array.isArray(answer) && answer.includes(c.id)}
                onChange={(e) => {
                  const old = Array.isArray(answer) ? answer : [];
                  onChange(
                    e.target.checked
                      ? [...old, c.id]
                      : old.filter((id) => id !== c.id),
                  );
                }}
              />
              <span>{c.label}</span>
            </label>
          ))}
        </>
      )}
      {q.kind === "numeric" && (
        <div className="numeric-answer">
          <label>
            Giá trị
            <input
              aria-label={`Giá trị ${q.id}`}
              inputMode="decimal"
              value={numeric.value}
              onChange={(e) => onChange({ ...numeric, value: e.target.value })}
            />
          </label>
          <label>
            Đơn vị
            <select
              aria-label={`Đơn vị ${q.id}`}
              value={numeric.unit}
              onChange={(e) => onChange({ ...numeric, unit: e.target.value })}
            >
              {[
                ...new Set([
                  q.unit ?? "mm",
                  "mm",
                  "cm",
                  "m",
                  "N",
                  "N·m",
                  "N·mm",
                  "m/s²",
                  "°",
                ]),
              ].map((unit) => (
                <option key={unit}>{unit}</option>
              ))}
            </select>
          </label>
        </div>
      )}
      {q.kind === "matching" &&
        (q.items ?? []).map((item) => (
          <label className="matching-answer" key={item.id}>
            <span>{item.label}</span>
            <select
              aria-label={`${q.id}: ${item.label}`}
              value={pairs[item.id] ?? ""}
              onChange={(e) =>
                onChange({ ...pairs, [item.id]: e.target.value })
              }
            >
              <option value="">Chọn chức năng/khái niệm…</option>
              {choices.map((c) => (
                <option value={c.id} key={c.id}>
                  {c.label}
                </option>
              ))}
            </select>
          </label>
        ))}
      {q.kind === "open" && (
        <label className="open-answer">
          Câu trả lời của bạn
          <textarea
            value={typeof answer === "string" ? answer : ""}
            maxLength={2000}
            onChange={(e) => onChange(e.target.value)}
            rows={4}
          />
        </label>
      )}
      {result && (
        <div className={`question-feedback ${result.correct ? "correct" : ""}`}>
          <strong>
            {result.correct
              ? "Đúng trong phạm vi bài tập"
              : result.errorType === "self-review"
                ? "Tự kiểm bằng rubric"
                : "Cần xem lại"}
          </strong>
          <p>{result.feedback}</p>
          <p>
            <strong>Lời giải:</strong> {q.rationale}
          </p>
          {q.rubric && (
            <ul>
              {q.rubric.map((r) => (
                <li key={r}>{r}</li>
              ))}
            </ul>
          )}
        </div>
      )}
    </fieldset>
  );
}
