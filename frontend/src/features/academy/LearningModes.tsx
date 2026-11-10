import { useState } from "react";
import { Link, navigate } from "../../navigation";
import { useProgress } from "./ProgressContext";
import {
  cardsFor,
  rateCard,
  setLearningPosition,
  savePractical,
} from "./learning";
import { modesFor, type Mode } from "./curriculum";
import type { Lesson } from "./types";
export const modeLabels: Record<Mode, string> = {
  course: "Học có hướng dẫn",
  cards: "Flashcards",
  quiz: "Luyện quiz",
  explore: "Khám phá 3D",
  lab: "Mini lab",
};
export function ModePicker({ lesson, mode }: { lesson: Lesson; mode: Mode }) {
  const { progress, update } = useProgress();
  function select(m: Mode) {
    // A prior anchor is superseded by an explicit mode choice, including on reload.
    if (location.hash)
      window.history.replaceState(
        window.history.state,
        "",
        location.pathname + location.search,
      );
    const section =
      m === "course"
        ? (progress.learning?.positions[lesson.id]?.courseSection ?? "theory")
        : m === "quiz"
          ? "quiz"
          : m === "lab"
            ? "activity"
            : "theory";
    update((p) => setLearningPosition(p, lesson, m, section));
    if (m === "explore") navigate(`/explorer?lesson=F01&from=${lesson.id}`);
    else if (m !== "cards")
      requestAnimationFrame(() =>
        document.getElementById(section)?.scrollIntoView({ block: "start" }),
      );
  }
  return (
    <>
      <div
        className="learning-modes"
        role="group"
        aria-label="Cách học bài này"
      >
        {modesFor(lesson).map((m) => (
          <button key={m} aria-pressed={mode === m} onClick={() => select(m)}>
            {modeLabels[m]}
          </button>
        ))}
      </div>
      <p className="a-muted mode-note">
        Cùng bài · revision {lesson.revision} · {lesson.sourceStatus} · Chưa
        duyệt chuyên môn. Đổi cách học giữ bài làm; thẻ tự nhớ không thay bài
        thực hành. Không phát XP.
      </p>
    </>
  );
}
export function Flashcards({ lesson }: { lesson: Lesson }) {
  const { progress, update } = useProgress(),
    cards = cardsFor(lesson);
  const pos = progress.learning?.positions[lesson.id];
  const index =
    pos?.revision === lesson.revision
      ? Math.min(pos.cardIndex, cards.length - 1)
      : 0;
  const [revealed, setRevealed] = useState(false);
  const card = cards[index];
  if (!card) return null;
  function move(i: number) {
    setRevealed(false);
    update((p) => setLearningPosition(p, lesson, "cards", "theory", i));
  }
  return (
    <section className="flashcard-panel" key={card.id}>
      <span className="a-kicker">
        TỰ NHỚ / THẺ {index + 1} TRÊN {cards.length}
      </span>
      <h2>{card.front}</h2>
      <p>
        Thử nói hoặc viết câu trả lời trước khi lật. Nhận ra đáp án sau khi lật
        chưa phải đã nhớ độc lập.
      </p>
      {revealed ? (
        <>
          <div className="flashcard-answer" role="status">
            <p>{card.back}</p>
          </div>
          <div className="flashcard-controls">
            {(["again", "remembered"] as const).map((r) => (
              <button
                className="a-button secondary"
                key={r}
                onClick={() => {
                  update((p) => rateCard(p, card, r));
                  move(Math.min(index + 1, cards.length - 1));
                }}
              >
                {r === "again" ? "Cần ôn lại" : "Đã nhớ độc lập"}
              </button>
            ))}
          </div>
        </>
      ) : (
        <button className="a-button" onClick={() => setRevealed(true)}>
          Tự nhớ xong, lật thẻ
        </button>
      )}
      <div className="flashcard-controls">
        <button
          className="a-text-button"
          disabled={index === 0}
          onClick={() => move(index - 1)}
        >
          Thẻ trước
        </button>
        <button
          className="a-text-button"
          disabled={index === cards.length - 1}
          onClick={() => move(index + 1)}
        >
          Thẻ sau
        </button>
      </div>
      <p className="a-muted">
        Lịch thử nghiệm: 1/3/7 ngày theo số lần nhớ, tính khoảng thời gian UTC.
        Tự đánh giá được lưu riêng, chưa xác nhận kỹ năng thiết kế.
      </p>
      <a className="a-text-link" href="#sources">
        Nguồn dùng chung của bài
      </a>
    </section>
  );
}
export function Practical({ lesson }: { lesson: Lesson }) {
  const { progress, update } = useProgress();
  if (!lesson.practicalRubric) return null;
  const saved = progress.learning?.practicals[lesson.id];
  return (
    <section id="practical" className="practical-task">
      <span className="a-kicker">BÀI LÀM / CẦN REVIEW</span>
      <h2>Tự phân tích và giữ lại bằng chứng</h2>
      <p>{lesson.observation}</p>
      <label>
        Bài thực hành của bạn
        <textarea
          rows={6}
          maxLength={4000}
          value={saved?.revision === lesson.revision ? saved.text : ""}
          onChange={(e) =>
            update((p) => savePractical(p, lesson, e.target.value))
          }
        />
      </label>
      <p>Đối chiếu từng tiêu chí:</p>
      <ul>
        {lesson.practicalRubric.map((r) => (
          <li key={r}>{r}</li>
        ))}
      </ul>
      <p role="status">Chưa review · Bài tự ghi</p>
      <p className="a-muted">
        Bài viết được lưu riêng theo revision. Tự đối chiếu rubric chưa thay
        review chuyên môn. Mở thẻ hoặc làm quiz không tự hoàn tất bài thực hành.
      </p>
    </section>
  );
}
export function ExploreReturn() {
  const id = new URLSearchParams(location.search).get("from");
  if (!["C01", "C02"].includes(id ?? "")) return null;
  return (
    <Link className="a-text-link" href={`/learn/${id}`}>
      Trở lại bài đang học
    </Link>
  );
}
