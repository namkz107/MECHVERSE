import { useEffect, useRef, useState } from "react";
import { useStore } from "zustand";
import {
  ArrowRight,
  Check,
  CheckCircle2,
  RotateCcw,
  Target,
} from "lucide-react";
import { explorerStore, parts } from "../explorer/state";
import { advanceLesson, initialLesson, type LessonState } from "./lesson";
import { SourceDialog } from "../../components/SourceDialog";

export default function LessonPanel({
  lesson,
  setLesson,
  saved,
  retry,
}: {
  lesson: LessonState;
  setLesson: (s: LessonState) => void;
  saved: boolean | null;
  retry: () => void;
}) {
  const selected = useStore(explorerStore, (s) => s.selected);
  const [feedback, setFeedback] = useState("");
  const [answer, setAnswer] = useState(lesson.answer);
  const [identified, setIdentified] = useState(false);
  const stage = lesson.stage;
  const heading = useRef<HTMLHeadingElement>(null);
  useEffect(() => {
    heading.current?.focus({ preventScroll: true });
  }, [stage]);
  function identify() {
    if (selected === "blade") {
      setIdentified(true);
      setFeedback(
        "Bạn đã tìm đúng cánh quạt trong mô hình. Ba lá cánh cùng tâm cánh tạo thành một chi tiết theo quy ước bài tập.",
      );
    } else {
      setIdentified(false);
      setFeedback(
        selected
          ? `Bạn đang chọn ${parts.find((p) => p.id === selected)?.name.toLocaleLowerCase("vi")}. Hãy tìm phần có ba lá tỏa ra từ tâm, nằm giữa hai lồng.`
          : "Hãy chọn một bộ phận trên mô hình hoặc trong cây trước khi kiểm tra.",
      );
    }
  }
  function classify() {
    if (answer === "part") {
      setLesson(advanceLesson(lesson, { type: "classify", answer }));
      setFeedback("");
    } else
      setFeedback(
        answer
          ? "Hãy nhìn lại ranh giới: một cụm chứa nhiều chi tiết riêng. Trong bài tập này, ba lá cánh liền với tâm được tính là một chi tiết."
          : "Chọn một cách phân loại trước khi kiểm tra.",
      );
  }
  const index = ["observe", "find", "classify", "complete"].indexOf(stage);
  return (
    <section className="lesson-panel panel" aria-label="Nhiệm vụ bài học">
      <div className="panel-heading">
        <span className="eyebrow">F01 · BÀI DEMO</span>
        <Target size={18} />
      </div>
      <div
        className="lesson-progress"
        aria-label={`Bước ${Math.min(index + 1, 3)} trên 3`}
      >
        {[0, 1, 2].map((i) => (
          <span key={i} className={index >= i ? "active" : ""} />
        ))}
      </div>
      <span className="step-label">
        {stage === "complete" ? "ĐÃ HOÀN THÀNH" : `BƯỚC ${index + 1} / 3`}
      </span>
      {stage === "observe" && (
        <>
          <h2 ref={heading} tabIndex={-1}>
            Từ một chiếc quạt đến từng chi tiết
          </h2>
          <p>
            Mục tiêu: phân biệt một chi tiết với một cụm trong mô hình giáo dục.
          </p>
          <div className="lesson-callout">
            <BoxDiagram />
            <p>
              <strong>Chi tiết</strong> là một phần riêng theo quy ước mô hình.{" "}
              <strong>Cụm</strong> chứa nhiều chi tiết được nhóm với nhau.
            </p>
          </div>
          <p>
            Hãy xoay mô hình và nhìn cây cấu tạo. Bạn có thể chọn trong cây nếu
            không dùng được 3D.
          </p>
          <button
            className="button primary"
            onClick={() => {
              explorerStore.getState().reset();
              setLesson(advanceLesson(lesson, { type: "observe" }));
            }}
          >
            Bắt đầu quan sát
            <ArrowRight size={17} />
          </button>
        </>
      )}
      {stage === "find" && (
        <>
          <h2 ref={heading} tabIndex={-1}>
            Tìm cánh quạt
          </h2>
          <p>
            Chọn phần có ba lá tỏa ra từ tâm. Dùng mô hình hoặc cây bộ phận.
          </p>
          <div className="selection-readout">
            <span>Đang chọn</span>
            <strong>
              {parts.find((p) => p.id === selected)?.name ??
                "Chưa chọn bộ phận"}
            </strong>
          </div>
          {feedback && (
            <div
              className={`feedback ${identified ? "success" : ""}`}
              role="status"
            >
              {identified && <Check size={18} />}
              <p>{feedback}</p>
            </div>
          )}
          {identified ? (
            <button
              className="button primary"
              onClick={() => {
                setLesson(
                  advanceLesson(lesson, { type: "identify", part: "blade" }),
                );
                setFeedback("");
              }}
            >
              Tiếp tục phân biệt
              <ArrowRight size={17} />
            </button>
          ) : (
            <button className="button primary" onClick={identify}>
              Kiểm tra lựa chọn
              <ArrowRight size={17} />
            </button>
          )}
        </>
      )}
      {stage === "classify" && (
        <>
          <h2 ref={heading} tabIndex={-1}>
            Chi tiết hay một cụm?
          </h2>
          <p>
            Trong mô hình này, ba lá cánh liền với tâm cánh. Bạn sẽ xếp “Cánh
            quạt” vào loại nào?
          </p>
          <fieldset>
            <legend className="sr-only">Phân loại cánh quạt</legend>
            {[
              { value: "part", label: "Một chi tiết trong cụm đầu quạt" },
              { value: "assembly", label: "Một cụm gồm nhiều chi tiết" },
            ].map((o) => (
              <label
                className={`answer ${answer === o.value ? "chosen" : ""}`}
                key={o.value}
              >
                <input
                  type="radio"
                  name="classification"
                  value={o.value}
                  checked={answer === o.value}
                  onChange={() => {
                    setAnswer(o.value);
                    setLesson({ ...lesson, answer: o.value });
                    setFeedback("");
                  }}
                />
                <span>{o.label}</span>
              </label>
            ))}
          </fieldset>
          {feedback && (
            <div className="feedback" role="status">
              <p>{feedback}</p>
            </div>
          )}
          <button className="button primary" onClick={classify}>
            Kiểm tra câu trả lời
            <ArrowRight size={17} />
          </button>
        </>
      )}
      {stage === "complete" && (
        <>
          <CheckCircle2 className="complete-symbol" size={44} />
          <h2 ref={heading} tabIndex={-1}>
            Bạn đã hoàn thành demo F01
          </h2>
          <p>
            Bạn đã tìm được cánh quạt và phân biệt một chi tiết với cụm đầu quạt
            theo quy ước bài tập.
          </p>
          <div className="feedback success">
            <p>
              Kết quả chỉ phản ánh nhiệm vụ demo này. Nội dung chưa duyệt chuyên
              môn; không cấp XP hoặc chứng nhận năng lực.
            </p>
          </div>
          <button
            className="button secondary"
            onClick={() => {
              setLesson({ ...initialLesson });
              setAnswer("");
              setFeedback("");
              setIdentified(false);
              explorerStore.getState().reset();
            }}
          >
            <RotateCcw size={17} />
            Luyện lại demo
          </button>
        </>
      )}
      <div className="save-status" role="status">
        {saved === null
          ? "Demo chỉ lưu trên thiết bị này."
          : saved
            ? "Đã lưu demo trên thiết bị này"
            : "Chưa lưu được demo. Bài làm vẫn còn trong phiên này."}
        {saved === false && (
          <button className="text-link" onClick={retry}>
            Thử lưu lại
          </button>
        )}
      </div>
      <SourceDialog />
    </section>
  );
}
function BoxDiagram() {
  return (
    <div className="concept-diagram" aria-hidden="true">
      <span />
      <span />
      <span />
      <i />
    </div>
  );
}
