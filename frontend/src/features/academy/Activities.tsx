import { useId, useState, type ReactNode } from "react";
import { gradeAnswer, torque } from "./quiz";
import type { ActivityKind } from "./types";
import "./activities.css";
import { Link } from "../../navigation";

type Feedback = { correct: boolean; feedback: string };
const functions = [
  { id: "air", label: "Tác động lên không khí khi quay" },
  { id: "rotation", label: "Truyền chuyển động quay trong mô hình" },
  { id: "support", label: "Tạo vùng tựa cho toàn bộ mô hình" },
];
const matchItems = [
  { id: "blade", label: "Cánh quạt", answer: "air" },
  { id: "shaft", label: "Trục nối động cơ với cánh", answer: "rotation" },
  { id: "base", label: "Đế đặt trên bàn", answer: "support" },
];

export function gradeFunctionMatches(answer: Record<string, string>): Feedback {
  if (matchItems.some((item) => !answer[item.id]))
    return {
      correct: false,
      feedback:
        "Chưa ghép đủ ba bộ phận. Chọn một chức năng cho từng dòng trước khi kiểm tra.",
    };
  const wrong = matchItems.filter((item) => answer[item.id] !== item.answer);
  return {
    correct: wrong.length === 0,
    feedback: wrong.length
      ? `Cần xem lại: ${wrong.map((item) => item.label).join(", ")}. Cánh tác động lên không khí; trục truyền quay; đế tạo vùng tựa. Các vai trò này theo cấu tạo giả định của bài.`
      : "Đúng cả ba cặp. Cánh tác động lên không khí; trục nối truyền quay; đế tạo vùng tựa. Đây là vai trò trong mô hình đã mô tả, không phải bằng chứng cấu tạo cho mọi mẫu quạt.",
  };
}

export function gradeUnitChallenge(
  value: string,
  unit: string,
  expectedMm: number,
): Feedback {
  const trimmed = value.trim().replace(",", ".");
  if (!trimmed)
    return {
      correct: false,
      feedback: "Bạn chưa nhập số. Nhập giá trị và chọn đơn vị chiều dài.",
    };
  if (
    !/^(?:\d+(?:\.\d*)?|\.\d+)$/.test(trimmed) ||
    !Number.isFinite(Number(trimmed))
  )
    return {
      correct: false,
      feedback:
        "Chiều dài ở bài này phải là số hữu hạn không âm. Dùng dấu chấm hoặc phẩy thập phân, không ghép đơn vị vào ô số.",
    };
  const grade = gradeAnswer(
    {
      id: "activity-length",
      kind: "numeric",
      prompt: "",
      correct: expectedMm,
      unit: "mm",
      tolerance: 0.01,
      rationale: "",
      sourceRefs: [],
    },
    { value: trimmed, unit },
  );
  if (grade.correct)
    return {
      correct: true,
      feedback: `Đúng: ${expectedMm} mm = ${expectedMm / 1000} m. Hai cách ghi mô tả cùng một chiều dài. Sai số chấp nhận ±0,01 mm.`,
    };
  if (grade.errorType === "unit")
    return {
      correct: false,
      feedback:
        "Sai loại đơn vị: cần mm hoặc m cho chiều dài. N biểu diễn lực, không biểu diễn chiều dài.",
    };
  return {
    correct: false,
    feedback: `Giá trị chưa khớp. Nhớ 1 m = 1 000 mm; đổi từ mm sang m bằng cách chia 1 000. Chiều dài cần tìm là ${expectedMm} mm (${expectedMm / 1000} m).`,
  };
}

function Response({ result }: { result: Feedback | null }) {
  return (
    <div
      className={`activity-feedback${result?.correct ? " is-correct" : ""}`}
      role="status"
      aria-live="polite"
    >
      {result
        ? result.feedback
        : "Thử trước, rồi kiểm tra để xem phản hồi và cách giải."}
    </div>
  );
}

function Frame({
  title,
  children,
  theoryHref,
}: {
  title: string;
  children: ReactNode;
  theoryHref?: string;
}) {
  return (
    <section className="learning-activity" aria-label={title}>
      <div className="activity-heading">
        <span>THỬ · GIẢI THÍCH · THỬ LẠI</span>
        <h3>{title}</h3>
      </div>
      <p className="activity-assumption">
        Dữ liệu giả định để học; sơ đồ gốc do MECHVERSE dựng. Không dùng làm
        hướng dẫn tháo lắp hoặc thông số chế tạo.
      </p>
      {children}
      {window.location.pathname.startsWith("/learn/") ? (
        <a className="activity-theory-link" href="#theory">
          Đọc lại lý thuyết ↑
        </a>
      ) : (
        <Link
          className="activity-theory-link"
          href={theoryHref ?? "/academy/foundations"}
        >
          Đọc lý thuyết liên quan →
        </Link>
      )}
    </section>
  );
}

function Matching() {
  const [answer, setAnswer] = useState<Record<string, string>>({});
  const [result, setResult] = useState<Feedback | null>(null);
  const prefix = useId();
  return (
    <Frame
      title="Ghép bộ phận với chức năng"
      theoryHref="/learn/chuc-nang-va-lien-ket#theory"
    >
      <p>
        Mô hình giả định có cánh lắp trên trục nối với động cơ, toàn bộ cụm được
        đế đỡ trên bàn. Ghép đủ ba cặp. Dùng Tab và phím mũi tên trong hộp chọn;
        không cần kéo thả.
      </p>
      <LessonDiagram kind="matching" />
      <form
        onSubmit={(event) => {
          event.preventDefault();
          setResult(gradeFunctionMatches(answer));
        }}
      >
        <div className="activity-match-list">
          {matchItems.map((item) => (
            <label key={item.id} htmlFor={`${prefix}-${item.id}`}>
              <strong>{item.label}</strong>
              <select
                id={`${prefix}-${item.id}`}
                value={answer[item.id] ?? ""}
                onChange={(event) => {
                  setAnswer({ ...answer, [item.id]: event.target.value });
                  setResult(null);
                }}
              >
                <option value="">Chọn chức năng…</option>
                {functions.map((fn) => (
                  <option key={fn.id} value={fn.id}>
                    {fn.label}
                  </option>
                ))}
              </select>
            </label>
          ))}
        </div>
        <div className="activity-actions">
          <button type="submit">Kiểm tra các cặp</button>
          <button
            type="button"
            className="activity-secondary"
            onClick={() => {
              setAnswer({});
              setResult(null);
            }}
          >
            Ghép lại
          </button>
        </div>
      </form>
      <Response result={result} />
    </Frame>
  );
}

const unitVariants = [
  {
    prompt: "Một thanh mẫu dài 125 mm. Ghi lại cùng chiều dài bằng m hoặc mm.",
    expected: 125,
  },
  {
    prompt: "Một tấm mẫu dày 0,008 m. Ghi lại cùng độ dày bằng mm hoặc m.",
    expected: 8,
  },
  {
    prompt:
      "Một đoạn trục mẫu dài 0,24 m. Ghi lại cùng chiều dài bằng mm hoặc m.",
    expected: 240,
  },
];
const diameterVariants = [
  {
    prompt:
      "Một đĩa tròn giả định có bán kính r = 35 mm. Nhập đường kính d của đĩa bằng mm hoặc m.",
    expected: 70,
  },
  {
    prompt:
      "Một đĩa tròn giả định có bán kính r = 0,025 m. Nhập đường kính d bằng mm hoặc m.",
    expected: 50,
  },
  {
    prompt:
      "Một đĩa tròn giả định có bán kính r = 60 mm. Nhập đường kính d bằng mm hoặc m.",
    expected: 120,
  },
];
function Numeric({ geometry }: { geometry: boolean }) {
  const [variant, setVariant] = useState(0);
  const [value, setValue] = useState("");
  const [unit, setUnit] = useState("mm");
  const [result, setResult] = useState<Feedback | null>(null);
  const id = useId();
  const variants = geometry ? diameterVariants : unitVariants;
  const task = variants[variant];
  function reset(next = variant) {
    setVariant(next);
    setValue("");
    setResult(null);
  }
  return (
    <Frame
      theoryHref={
        geometry
          ? "/learn/chieu-dai-ban-kinh-duong-kinh#theory"
          : "/learn/don-vi-va-so-do#theory"
      }
      title={
        geometry ? "Từ bán kính đến đường kính" : "Một chiều dài, hai cách ghi"
      }
    >
      <p>{task.prompt} Sai số chấp nhận ±0,01 mm. Có ba đề để luyện lại.</p>
      <LessonDiagram kind={geometry ? "geometry" : "units"} />
      <form
        onSubmit={(event) => {
          event.preventDefault();
          const grade = gradeUnitChallenge(value, unit, task.expected);
          setResult({
            ...grade,
            feedback: `${grade.feedback}${geometry ? " Với đường tròn, d = 2r: đường kính đi qua tâm nối hai điểm trên đường tròn." : ""}`,
          });
        }}
      >
        <div className="activity-number-row">
          <label htmlFor={`${id}-value`}>
            Giá trị
            <input
              id={`${id}-value`}
              inputMode="decimal"
              value={value}
              onChange={(event) => {
                setValue(event.target.value);
                setResult(null);
              }}
              placeholder="Nhập số"
              autoComplete="off"
            />
          </label>
          <label htmlFor={`${id}-unit`}>
            Đơn vị
            <select
              id={`${id}-unit`}
              value={unit}
              onChange={(event) => {
                setUnit(event.target.value);
                setResult(null);
              }}
            >
              <option value="mm">mm</option>
              <option value="m">m</option>
              <option value="N">N — lực</option>
            </select>
          </label>
        </div>
        <div className="activity-actions">
          <button type="submit">Kiểm tra kết quả</button>
          <button
            type="button"
            className="activity-secondary"
            onClick={() => reset()}
          >
            Thử lại đề này
          </button>
          <button
            type="button"
            className="activity-secondary"
            onClick={() => reset((variant + 1) % variants.length)}
          >
            Đổi đề
          </button>
        </div>
      </form>
      <Response result={result} />
    </Frame>
  );
}

function TorqueLab() {
  const [force, setForce] = useState(20);
  const [radius, setRadius] = useState(0.3);
  const [angle, setAngle] = useState(90);
  const [prediction, setPrediction] = useState("");
  const [result, setResult] = useState<Feedback | null>(null);
  const id = useId();
  const valid =
    force >= 0 &&
    force <= 100 &&
    radius >= 0 &&
    radius <= 1 &&
    angle >= 0 &&
    angle <= 180;
  const moment = valid ? torque(force, radius, angle) : null;
  const radians = (angle * Math.PI) / 180;
  const tipX = 240 + Math.cos(radians) * 70;
  const tipY = 115 - Math.sin(radians) * 70;
  function reset() {
    setForce(20);
    setRadius(0.3);
    setAngle(90);
    setPrediction("");
    setResult(null);
  }
  return (
    <Frame
      title="Phòng thử mô-men phẳng"
      theoryHref="/learn/mo-men-va-canh-tay-don#theory"
    >
      <p>
        Chốt O cố định. Lực tác dụng ở đầu tay đòn cách O một khoảng r. θ là góc
        giữa vectơ r (từ O đến điểm đặt lực) và vectơ F. Tính độ lớn τ = rF sin
        θ; không mô phỏng biến dạng hoặc động lực học.
      </p>
      <svg
        className="activity-torque-diagram"
        viewBox="0 0 380 205"
        role="img"
        aria-label={`Sơ đồ tay đòn quanh O, r ${radius} m, lực ${force} N tạo góc ${angle} độ với r`}
      >
        <defs>
          <marker
            id={`${id}-arrow`}
            markerWidth="8"
            markerHeight="8"
            refX="7"
            refY="3"
            orient="auto"
          >
            <path d="M0 0 L7 3 L0 6Z" fill="currentColor" />
          </marker>
        </defs>
        <line
          x1="55"
          y1="115"
          x2="240"
          y2="115"
          stroke="#a85f37"
          strokeWidth="9"
        />
        <circle cx="55" cy="115" r="10" fill="#19251f" />
        <text x="38" y="145">
          O
        </text>
        <text x="125" y="145">
          r = {radius.toFixed(2)} m
        </text>
        <line
          x1="240"
          y1="115"
          x2="330"
          y2="115"
          stroke="#68716a"
          strokeDasharray="5 4"
        />
        <line
          x1="240"
          y1="115"
          x2={tipX}
          y2={tipY}
          stroke="currentColor"
          strokeWidth="3"
          markerEnd={`url(#${id}-arrow)`}
        />
        {angle > 0 && (
          <path
            d={`M272 115 A32 32 0 0 0 ${240 + Math.cos(radians) * 32} ${115 - Math.sin(radians) * 32}`}
            fill="none"
            stroke="#a85f37"
            strokeWidth="2"
          />
        )}
        <text x="246" y="178">
          θ = {angle}°
        </text>
        <text x="60" y="30">
          F = {force} N · sơ đồ hướng lực
        </text>
      </svg>
      <p className="activity-assumption">
        Sơ đồ chỉ biểu diễn hướng: độ dài mũi tên và tay đòn trên màn hình không
        theo tỉ lệ. Khi F = 0, hướng vẽ là hướng giả định của lực nếu có.
      </p>
      <div className="activity-sliders">
        {[
          {
            key: "force",
            label: "Lực F",
            value: force,
            min: 0,
            max: 100,
            step: 1,
            unit: "N",
            change: setForce,
          },
          {
            key: "radius",
            label: "Khoảng cách r",
            value: radius,
            min: 0,
            max: 1,
            step: 0.01,
            unit: "m",
            change: setRadius,
          },
          {
            key: "angle",
            label: "Góc θ giữa r và F",
            value: angle,
            min: 0,
            max: 180,
            step: 1,
            unit: "°",
            change: setAngle,
          },
        ].map((control) => (
          <label key={control.key} htmlFor={`${id}-${control.key}`}>
            <span>
              {control.label}
              <strong>
                {control.value} {control.unit}
              </strong>
            </span>
            <input
              id={`${id}-${control.key}`}
              type="range"
              min={control.min}
              max={control.max}
              step={control.step}
              value={control.value}
              onChange={(event) => {
                control.change(Number(event.target.value));
                setResult(null);
              }}
            />
          </label>
        ))}
      </div>
      <div className="activity-actions">
        <button
          type="button"
          className="activity-secondary"
          onClick={() => {
            setAngle(0);
            setResult(null);
          }}
        >
          Góc 0°
        </button>
        <button
          type="button"
          className="activity-secondary"
          onClick={() => {
            setAngle(90);
            setResult(null);
          }}
        >
          Góc 90°
        </button>
        <button type="button" className="activity-secondary" onClick={reset}>
          Đặt lại phòng thử
        </button>
      </div>
      <output className="activity-live-result" aria-live="polite">
        {moment === null
          ? "Dữ liệu ngoài phạm vi. Hãy đặt lại phòng thử."
          : `τ = ${moment.toLocaleString("vi-VN", { maximumFractionDigits: 3 })} N·m`}
      </output>
      <p>
        {angle === 0 || angle === 180
          ? "Lực có đường tác dụng đi qua O: cánh tay đòn vuông góc bằng 0 nên mô-men bằng 0."
          : angle === 90
            ? "Lực vuông góc với r: sin 90° = 1 nên mô-men đạt rF với F và r đang chọn."
            : "Chỉ thành phần lực vuông góc với r tạo mô-men quanh O."}{" "}
        N·m ở đây đo mô-men; không gọi là năng lượng hay joule.
      </p>
      <form
        onSubmit={(event) => {
          event.preventDefault();
          setResult(
            prediction
              ? {
                  correct: prediction === "double",
                  feedback:
                    prediction === "double"
                      ? "Đúng. Giữ r và θ, τ tỉ lệ thuận với F: tăng F gấp đôi làm τ gấp đôi. Nếu τ ban đầu bằng 0 thì kết quả vẫn bằng 0."
                      : "Xem τ = rF sin θ: khi giữ r và θ, thay F bằng 2F làm biểu thức thành 2τ. Trường hợp τ = 0 vẫn cho 0.",
                }
              : {
                  correct: false,
                  feedback: "Chọn một dự đoán trước khi kiểm tra.",
                },
          );
        }}
      >
        <fieldset>
          <legend>
            Giữ r và θ, tăng F gấp đôi (vẫn trong phạm vi): τ thay đổi thế nào?
          </legend>
          {[
            { id: "double", label: "Gấp đôi, với 0 vẫn là 0" },
            { id: "same", label: "Luôn giữ nguyên" },
            { id: "half", label: "Còn một nửa" },
          ].map((option) => (
            <label className="activity-choice" key={option.id}>
              <input
                type="radio"
                name={`${id}-prediction`}
                checked={prediction === option.id}
                onChange={() => {
                  setPrediction(option.id);
                  setResult(null);
                }}
              />
              {option.label}
            </label>
          ))}
        </fieldset>
        <div className="activity-actions">
          <button type="submit">Kiểm tra dự đoán</button>
          <button
            type="button"
            className="activity-secondary"
            onClick={() => {
              setPrediction("");
              setResult(null);
            }}
          >
            Dự đoán lại
          </button>
        </div>
      </form>
      <Response result={result} />
    </Frame>
  );
}

const choicesByKind: Partial<
  Record<
    ActivityKind,
    {
      title: string;
      prompt: string;
      choices: string[];
      correct: number;
      rationale: string;
    }
  >
> = {
  identify: {
    title: "Chi tiết hay cụm?",
    prompt:
      "Theo giả thiết, vòng đệm được chế tạo từ một phôi liền; bộ đầu quạt gồm vòng đệm, trục và cánh lắp với nhau. Vòng đệm là gì?",
    choices: [
      "Một chi tiết",
      "Một cụm gồm nhiều chi tiết",
      "Không thể kết luận dù đã có giả thiết",
    ],
    correct: 0,
    rationale:
      "Trong giả thiết đã nêu, vòng đệm là một chi tiết liền; bộ đầu quạt là cụm lắp. Không suy ra cấu tạo chỉ từ kích thước hay ảnh ngoài.",
  },
  coordinates: {
    title: "Đọc hướng trên mặt phẳng",
    prompt:
      "Chọn hệ trục trong sơ đồ: +x sang phải, +y lên trên. Đi từ O sang phải 30 mm, rồi lên 20 mm. Tọa độ cuối là gì?",
    choices: ["(30; 20) mm", "(20; 30) mm", "(-30; 20) mm"],
    correct: 0,
    rationale:
      "Tọa độ ghi theo thứ tự (x; y). Sang phải cho x dương, đi lên cho y dương trong hệ trục đã quy định.",
  },
  forces: {
    title: "Hai lực cùng đường tác dụng",
    prompt:
      "Vật mô hình chịu hai lực ngang cùng đường tác dụng: 10 N sang phải và 6 N sang trái. Hợp lực ngang là gì?",
    choices: ["16 N sang phải", "4 N sang phải", "4 N sang trái"],
    correct: 1,
    rationale:
      "Chọn phải là dương: tổng lực ngang = 10 − 6 = 4 N. Đây là hợp lực; chưa đủ dữ liệu để tính gia tốc vì chưa cho khối lượng.",
  },
  bearings: {
    title: "Vai trò của ổ đỡ",
    prompt:
      "Mô hình giả định có trục quay trong ổ trượt cố định trên thân. Chức năng phù hợp của ổ đỡ là gì?",
    choices: [
      "Đỡ và định vị trục, cho phép chuyển động quay tương đối",
      "Tự sinh năng lượng cho trục",
      "Loại bỏ hoàn toàn mọi ma sát",
    ],
    correct: 0,
    rationale:
      "Ổ đỡ chịu tải và định vị trục trong phạm vi thiết kế. Ổ trượt vẫn có ma sát; không được suy rằng mọi quạt có ổ bi hay cùng loại ổ.",
  },
  materials: {
    title: "Chọn theo yêu cầu, không theo màu",
    prompt:
      "Hai vật liệu giả định A và B có cùng hình học. A: khối lượng riêng 2 700 kg/m³, giới hạn chảy 100 MPa. B: 7 800 kg/m³, 250 MPa. Chỉ yêu cầu khối lượng nhỏ nhất; cả hai đã đạt bền. Chọn vật liệu nào?",
    choices: ["A", "B", "Chọn bằng màu bề mặt"],
    correct: 0,
    rationale:
      "Cùng thể tích, m = ρV nên A nhẹ hơn. Đây là dữ liệu giả định, chưa đủ để kết luận lựa chọn thực tế khi còn nhiệt độ, ăn mòn, giá và chế tạo.",
  },
  manufacturing: {
    title: "Quy trình theo giả thiết",
    prompt:
      "Chi tiết mẫu là trục bậc tròn xoay từ phôi thanh; chọn gia công tiện ngoài, sau đó khoan lỗ dọc trục theo bản vẽ. Phương án phù hợp là gì?",
    choices: [
      "Tiện bề mặt tròn xoay rồi khoan lỗ theo yêu cầu",
      "Xem exploded view là trình tự tháo thật",
      "Đoán quy trình chỉ từ màu vật",
    ],
    correct: 0,
    rationale:
      "Bài đã cho phôi, hình dạng và phương pháp. Trình tự này chỉ là minh họa, không bao gồm gá đặt, dung sai hay thông số máy; không dùng làm chỉ dẫn vận hành.",
  },
  tolerance: {
    title: "Đọc khoảng kích thước cho phép",
    prompt:
      "Đường kính mẫu được ghi 20,00 ± 0,05 mm. Số đo nào nằm trong khoảng cho phép (kể cả hai biên)?",
    choices: ["19,94 mm", "20,05 mm", "20,06 mm"],
    correct: 1,
    rationale:
      "Giới hạn dưới 19,95 mm; giới hạn trên 20,05 mm. Cả hai biên đều được chấp nhận. Chưa thể kết luận kiểu lắp nếu chưa có kích thước và dung sai chi tiết ghép.",
  },
};

function ConceptChoice({ kind }: { kind: ActivityKind }) {
  const task = choicesByKind[kind] ?? choicesByKind.identify!;
  const [answer, setAnswer] = useState<number | null>(null);
  const [result, setResult] = useState<Feedback | null>(null);
  const id = useId();
  return (
    <Frame title={task.title}>
      <LessonDiagram kind={kind} />
      <form
        onSubmit={(event) => {
          event.preventDefault();
          setResult(
            answer === null
              ? {
                  correct: false,
                  feedback:
                    "Bạn chưa chọn đáp án. Dùng Tab và phím mũi tên để chọn, rồi kiểm tra.",
                }
              : {
                  correct: answer === task.correct,
                  feedback: `${answer === task.correct ? "Đúng. " : "Cần xem lại. "}${task.rationale}`,
                },
          );
        }}
      >
        <fieldset>
          <legend>{task.prompt}</legend>
          {task.choices.map((choice, index) => (
            <label className="activity-choice" key={choice}>
              <input
                type="radio"
                name={id}
                checked={answer === index}
                onChange={() => {
                  setAnswer(index);
                  setResult(null);
                }}
              />
              {choice}
            </label>
          ))}
        </fieldset>
        <div className="activity-actions">
          <button type="submit">Kiểm tra suy luận</button>
          <button
            type="button"
            className="activity-secondary"
            onClick={() => {
              setAnswer(null);
              setResult(null);
            }}
          >
            Thử lại
          </button>
        </div>
      </form>
      <Response result={result} />
    </Frame>
  );
}

function ProjectionChoice() {
  const [answer, setAnswer] = useState("");
  const [result, setResult] = useState<Feedback | null>(null);
  const id = useId();
  return (
    <Frame
      title="Chọn hình chiếu bằng của khối bậc"
      theoryHref="/learn/vat-the-va-hinh-chieu#theory"
    >
      <p>
        Khối bậc kín có phần cao ở bên trái khi nhìn từ trước, đùn đều theo
        chiều sâu, không có lỗ. Dùng phép chiếu vuông góc góc thứ ba: hình chiếu
        bằng đặt trên hình chiếu đứng; hình chiếu cạnh phải đặt bên phải. Chọn
        hình nhìn từ trên xuống (các cạnh thấy vẽ liền).
      </p>
      <LessonDiagram kind="projection" />
      <form
        onSubmit={(event) => {
          event.preventDefault();
          setResult(
            !answer
              ? {
                  correct: false,
                  feedback: "Chọn một hình chiếu trước khi kiểm tra.",
                }
              : {
                  correct: answer === "top",
                  feedback:
                    answer === "top"
                      ? "Đúng. Nhìn từ trên: bao ngoài là hình chữ nhật theo chiều rộng × chiều sâu; đường phân bậc thẳng đứng chia phần cao bên trái và thấp bên phải. Hình chữ L là hình chiếu đứng; hình chữ nhật có đường ngang là hình chiếu cạnh phải."
                      : "Chưa đúng hướng nhìn. Hình chiếu bằng nhìn từ trên xuống: hai phần cao và thấp đều có mặt trên, tạo bao ngoài chữ nhật với đường phân bậc theo chiều sâu. Hình chữ L biểu diễn độ cao khi nhìn từ trước.",
                },
          );
        }}
      >
        <fieldset>
          <legend>Hình nào là hình chiếu bằng?</legend>
          <div className="activity-projection-options">
            {[
              {
                value: "front",
                label: "Hình A",
                shape: "M20 90V20H55V55H125V90Z",
              },
              {
                value: "top",
                label: "Hình B",
                shape: "M20 20H125V90H20Z M55 20V90",
              },
              {
                value: "right",
                label: "Hình C",
                shape: "M20 20H90V90H20Z M20 55H90",
              },
            ].map((option) => (
              <label className="activity-choice" key={option.value}>
                <input
                  type="radio"
                  name={id}
                  checked={answer === option.value}
                  onChange={() => {
                    setAnswer(option.value);
                    setResult(null);
                  }}
                />
                <span>
                  {option.label}
                  <svg
                    viewBox="0 0 145 110"
                    role="img"
                    aria-label={
                      option.value === "front"
                        ? "Đường bao chữ L, phần cao bên trái"
                        : option.value === "top"
                          ? "Chữ nhật chia bằng một đường dọc ở một phần ba chiều rộng"
                          : "Chữ nhật chia bằng đường ngang ở giữa"
                    }
                  >
                    <path
                      d={option.shape}
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="3"
                    />
                  </svg>
                </span>
              </label>
            ))}
          </div>
        </fieldset>
        <div className="activity-actions">
          <button type="submit">Kiểm tra hình chiếu</button>
          <button
            type="button"
            className="activity-secondary"
            onClick={() => {
              setAnswer("");
              setResult(null);
            }}
          >
            Chọn lại
          </button>
        </div>
      </form>
      <Response result={result} />
    </Frame>
  );
}

export default function Activities({ kind }: { kind: ActivityKind }) {
  if (kind === "matching") return <Matching key={kind} />;
  if (kind === "units" || kind === "geometry")
    return <Numeric key={kind} geometry={kind === "geometry"} />;
  if (kind === "torque") return <TorqueLab key={kind} />;
  if (kind === "projection") return <ProjectionChoice key={kind} />;
  return <ConceptChoice key={kind} kind={kind} />;
}

export function LessonDiagram({ kind }: { kind: ActivityKind }) {
  const id = useId();
  const isGeometry = kind === "geometry";
  const isAxes =
    kind === "coordinates" || kind === "forces" || kind === "torque";
  const titles: Record<ActivityKind, string> = {
    identify: "Cụm giả định gồm ba chi tiết liền",
    matching: "Cánh, trục và đế trong mô hình giả định",
    units: "Cùng chiều dài: 1 m bằng 1 000 mm",
    geometry: "Bán kính từ tâm đến biên; đường kính đi qua tâm",
    coordinates: "Trục x sang phải, y lên trên",
    forces: "Hai lực ngang ngược chiều trên cùng đường tác dụng",
    torque: "Khoảng cách r và lực vuông góc tạo mô-men quanh O",
    bearings: "Ổ trượt giả định đỡ trục quay",
    materials: "Hai mẫu cùng thể tích để so sánh dữ liệu vật liệu",
    manufacturing: "Phôi thanh, tiện trục bậc và khoan lỗ: minh họa giả định",
    projection: "Khối bậc có phần cao bên trái, đùn đều theo chiều sâu",
    tolerance: "Khoảng kích thước từ 19,95 đến 20,05 mm gồm cả hai biên",
  };
  return (
    <figure className="lesson-diagram">
      <svg viewBox="0 0 420 230" role="img" aria-labelledby={`${id}-title`}>
        <title id={`${id}-title`}>{titles[kind]}</title>
        <defs>
          <marker
            id={`${id}-head`}
            markerWidth="8"
            markerHeight="8"
            refX="7"
            refY="3"
            orient="auto"
          >
            <path d="M0 0L7 3L0 6Z" fill="currentColor" />
          </marker>
        </defs>
        {isGeometry ? (
          <>
            <circle
              cx="210"
              cy="110"
              r="75"
              fill="#e4e8da"
              stroke="currentColor"
              strokeWidth="2"
            />
            <line
              x1="135"
              y1="110"
              x2="285"
              y2="110"
              stroke="#a85f37"
              strokeWidth="3"
            />
            <line
              x1="210"
              y1="110"
              x2="210"
              y2="35"
              stroke="currentColor"
              strokeWidth="3"
            />
            <circle cx="210" cy="110" r="4" fill="currentColor" />
            <text x="219" y="77">
              r
            </text>
            <text x="200" y="137">
              d
            </text>
            <text x="163" y="213">
              d = 2r
            </text>
          </>
        ) : isAxes ? (
          <>
            <line
              x1="75"
              y1="175"
              x2="345"
              y2="175"
              stroke="currentColor"
              strokeWidth="2"
              markerEnd={`url(#${id}-head)`}
            />
            <line
              x1="75"
              y1="175"
              x2="75"
              y2="35"
              stroke="currentColor"
              strokeWidth="2"
              markerEnd={`url(#${id}-head)`}
            />
            <text x="55" y="199">
              O
            </text>
            <text x="355" y="180">
              +x
            </text>
            <text x="42" y="29">
              +y
            </text>
            {kind === "coordinates" ? (
              <>
                <path
                  d="M245 175V75H75"
                  fill="none"
                  stroke="#a85f37"
                  strokeDasharray="5 4"
                />
                <circle cx="245" cy="75" r="6" fill="#a85f37" />
                <text x="255" y="70">
                  (x; y)
                </text>
              </>
            ) : kind === "forces" ? (
              <>
                <rect
                  x="170"
                  y="95"
                  width="70"
                  height="45"
                  fill="#c5d59c"
                  stroke="currentColor"
                />
                <path
                  d="M240 117H340 M170 117H110"
                  stroke="currentColor"
                  strokeWidth="3"
                  markerEnd={`url(#${id}-head)`}
                />
                <text x="275" y="96">
                  10 N
                </text>
                <text x="105" y="96">
                  6 N
                </text>
              </>
            ) : (
              <>
                <path
                  d="M75 175H260V60"
                  fill="none"
                  stroke="#a85f37"
                  strokeWidth="4"
                  markerEnd={`url(#${id}-head)`}
                />
                <text x="155" y="160">
                  r
                </text>
                <text x="275" y="85">
                  F
                </text>
                <text x="275" y="150">
                  90°
                </text>
              </>
            )}
          </>
        ) : kind === "projection" ? (
          <>
            <path
              d="M100 180V80H150V130H270V180Z"
              fill="#d9dfcc"
              stroke="currentColor"
              strokeWidth="2"
            />
            <path
              d="M100 80L55 50H105L150 80Z M150 130L105 100H225L270 130Z"
              fill="#c5d59c"
              stroke="currentColor"
              strokeWidth="2"
            />
            <path
              d="M55 50V150L100 180V80Z"
              fill="#b8c4a0"
              stroke="currentColor"
              strokeWidth="2"
            />
            <path
              d="M150 80L105 50V100L150 130Z"
              fill="#a8b58c"
              stroke="currentColor"
              strokeWidth="2"
            />
            <path
              d="M270 130L225 100V150L270 180Z"
              fill="#a8b58c"
              stroke="currentColor"
              strokeWidth="2"
            />
            <text x="286" y="85">
              Nhìn từ trên ↓
            </text>
            <path
              d="M190 220V185"
              stroke="currentColor"
              strokeWidth="2"
              markerEnd={`url(#${id}-head)`}
            />
            <text x="22" y="218">
              Hướng nhìn trước
            </text>
            <text x="282" y="145">
              Khối bậc
            </text>
          </>
        ) : kind === "units" ? (
          <>
            <rect
              x="45"
              y="80"
              width="330"
              height="65"
              fill="#e4e8da"
              stroke="currentColor"
            />
            <path
              d="M45 80V110 M111 80V100 M177 80V100 M243 80V100 M309 80V100 M375 80V110"
              stroke="currentColor"
              strokeWidth="2"
            />
            <text x="40" y="172">
              0
            </text>
            <text x="310" y="172">
              1 000 mm
            </text>
            <text x="147" y="45">
              1 m = 1 000 mm
            </text>
            <text x="85" y="213">
              Sơ đồ · không theo tỉ lệ đo
            </text>
          </>
        ) : kind === "tolerance" ? (
          <>
            <line
              x1="55"
              y1="120"
              x2="365"
              y2="120"
              stroke="#b6beb5"
              strokeWidth="3"
            />
            <line
              x1="110"
              y1="120"
              x2="310"
              y2="120"
              stroke="#19251f"
              strokeWidth="9"
            />
            <circle cx="110" cy="120" r="7" fill="#19251f" />
            <circle cx="310" cy="120" r="7" fill="#19251f" />
            <text x="73" y="160">
              19,95
            </text>
            <text x="172" y="94">
              20,00
            </text>
            <text x="276" y="160">
              20,05 mm
            </text>
            <text x="108" y="205">
              Hai biên đều thuộc khoảng
            </text>
          </>
        ) : kind === "materials" ? (
          <>
            <rect
              x="70"
              y="65"
              width="110"
              height="90"
              fill="#c5d59c"
              stroke="currentColor"
            />
            <rect
              x="240"
              y="65"
              width="110"
              height="90"
              fill="#d7d7ca"
              stroke="currentColor"
            />
            <text x="115" y="115">
              A
            </text>
            <text x="285" y="115">
              B
            </text>
            <text x="105" y="192">
              Cùng thể tích · m = ρV
            </text>
          </>
        ) : kind === "manufacturing" ? (
          <>
            <path d="M30 80H120V140H30Z" fill="#d9dfcc" stroke="currentColor" />
            <path
              d="M163 97H190V76H235V144H190V123H163Z"
              fill="#c5d59c"
              stroke="currentColor"
            />
            <path
              d="M285 97H310V76H355V144H310V123H285Z M285 106H355V114H285Z"
              fill="#d9dfcc"
              stroke="currentColor"
            />
            <text x="26" y="180">
              Phôi thanh
            </text>
            <text x="180" y="180">
              Tiện
            </text>
            <text x="288" y="180">
              Khoan
            </text>
            <path
              d="M130 110H153 M245 110H275"
              stroke="currentColor"
              markerEnd={`url(#${id}-head)`}
            />
          </>
        ) : kind === "bearings" ? (
          <>
            <rect
              x="140"
              y="65"
              width="140"
              height="110"
              fill="#c5d59c"
              stroke="currentColor"
            />
            <rect
              x="165"
              y="95"
              width="90"
              height="50"
              fill="#f3f0e7"
              stroke="currentColor"
            />
            <rect
              x="50"
              y="108"
              width="320"
              height="24"
              fill="#b8b8ab"
              stroke="currentColor"
            />
            <text x="180" y="46">
              Ổ trượt
            </text>
            <text x="320" y="157">
              Trục
            </text>
            <text x="80" y="210">
              Mặt cắt minh họa · không theo tỉ lệ
            </text>
          </>
        ) : (
          <>
            <circle
              cx="110"
              cy="90"
              r="52"
              fill="#e4e8da"
              stroke="currentColor"
            />
            <path
              d="M110 90C50 20 150 20 110 90C190 50 190 145 110 90C110 175 30 120 110 90"
              fill="#c5d59c"
              stroke="currentColor"
            />
            <path
              d="M165 90H290V155"
              fill="none"
              stroke="#a85f37"
              strokeWidth="14"
            />
            <rect
              x="240"
              y="156"
              width="110"
              height="25"
              rx="6"
              fill="#c5d59c"
              stroke="currentColor"
            />
            <text x="83" y="174">
              Cánh
            </text>
            <text x="215" y="70">
              Trục nối
            </text>
            <text x="282" y="210">
              Đế
            </text>
          </>
        )}
      </svg>
      <figcaption>{titles[kind]}. Sơ đồ giáo dục, không theo tỉ lệ.</figcaption>
    </figure>
  );
}
