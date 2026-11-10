import {
  ArrowRight,
  ArrowUpRight,
  Compass,
  BookOpen,
  MoveUpRight,
  MousePointer2,
} from "lucide-react";
import { Link } from "../../navigation";
import { lessons, findLesson } from "./content";
import { useProgress } from "./ProgressContext";
export default function Home() {
  const { progress } = useProgress();
  const recent = Object.entries(progress.learning?.positions ?? {})
    .sort(([, a], [, b]) => b.updatedAt.localeCompare(a.updatedAt))
    .find(([id]) => findLesson(id));
  const current =
    (recent ? findLesson(recent[0]) : undefined) ??
    lessons.find((l) => progress.sessions[l.id]?.phase === "working") ??
    findLesson("M01-L01")!;
  return (
    <div className="academy-home">
      <section className="home-hero">
        <div className="hero-copy">
          <span className="a-kicker">HỌC CƠ KHÍ / TỪ SỐ 0</span>
          <h1>
            Từ đồ vật
            <br />
            quen thuộc,
            <br />
            <em>
              đến tư duy
              <br />
              kỹ thuật.
            </em>
          </h1>
          <p>
            Nhìn rõ cấu tạo. Hiểu vì sao nó hoạt động.
            <br />
            Từng bài nhỏ, có lý thuyết, tương tác và lời giải để bạn tự kiểm.
          </p>
          <div className="hero-actions">
            <Link className="a-button sage" href="/academy/roadmap">
              Bắt đầu từ số 0<ArrowUpRight size={19} />
            </Link>
            <Link className="hero-secondary" href={`/learn/${current.slug}`}>
              Tiếp tục học
              <ArrowRight size={17} />
            </Link>
          </div>
          <span className="hero-footnote">
            {lessons.length} bài có nội dung · Học thử có nguồn · Không cần tài
            khoản
          </span>
        </div>
        <div className="hero-visual">
          <span className="hero-image-note">
            CASE STUDY / NGOẠI HÌNH SẢN PHẨM
          </span>
          <picture>
            <source
              srcSet="/images/noctua-case-640.webp 640w, /images/noctua-case-1280.webp 1280w"
              sizes="(max-width: 700px) 92vw, 45vw"
              type="image/webp"
            />
            <img
              src="/images/noctua-case-640.webp"
              alt="Ảnh sản phẩm chính hãng quạt máy tính Noctua NF-A12x25r PWM, khung nâu và cánh sáng trên nền trắng"
              width="640"
              height="771"
              fetchPriority="high"
            />
          </picture>
          <div className="hero-image-caption">
            <div>
              <strong>Noctua NF-A12x25r PWM</strong>
              <span>Quạt máy tính · case study riêng</span>
            </div>
            <ArrowUpRight size={24} />
          </div>
        </div>
      </section>
      <div className="photo-credit">
        Ảnh sản phẩm:{" "}
        <a
          href="https://www.noctua.at/en/products/nf-a12x25r-pwm/downloads"
          target="_blank"
          rel="noreferrer"
        >
          Noctua
        </a>{" "}
        ·{" "}
        <a
          href="https://www.noctua.at/en/legal-information"
          target="_blank"
          rel="noreferrer"
        >
          Quyền sử dụng ảnh
        </a>
        . Ảnh này không phải model quạt bàn EDU-FAN-01; không chứng minh nội
        thất.
      </div>
      <section className="home-product-entry">
        <div>
          <strong>Studio / CAD — Thư viện sản phẩm</strong>
          <p>
            Locker hai ngăn, bàn cơ khí và quạt giáo dục. Quan sát chi tiết, thử
            chuyển động và đọc liên kết.
          </p>
        </div>
        <Link href="/products">
          Mở thư viện sản phẩm <ArrowUpRight size={18} />
        </Link>
      </section>
      <section className="home-learning-intro">
        <div>
          <span className="a-kicker">KHÔNG CẦN BIẾT TRƯỚC MỌI THỨ</span>
          <h2>
            Một câu hỏi nhỏ.
            <br />
            Một cách nhìn mới.
          </h2>
        </div>
        <p>
          Bắt đầu bằng cách gọi tên và phân biệt các phần của một đồ vật. Rồi
          đến đơn vị, hình học, lực và cách thiết kế. Bạn học bằng cách làm, và
          luôn biết dữ liệu nào là giả định.
        </p>
      </section>
      <section className="home-course-section">
        <div className="a-section-heading">
          <div>
            <span className="a-kicker">LỘ TRÌNH NỀN TẢNG</span>
            <h2>Học từ những điều chạm được.</h2>
          </div>
          <Link className="a-text-link" href="/academy">
            Xem tất cả bài học
            <ArrowRight size={16} />
          </Link>
        </div>
        <div className="home-course-grid">
          {lessons.slice(0, 3).map((l, i) => (
            <Link
              className={`home-course-card course-${i}`}
              href={`/learn/${l.slug}`}
              key={l.id}
            >
              <span className="a-kicker">
                {l.id} / {l.questions.length} CÂU TỰ KIỂM
              </span>
              <span className="home-course-number" aria-hidden="true">
                0{i + 1}
              </span>
              <div>
                <h3>{l.title}</h3>
                <p>{l.deck}</p>
                <ArrowUpRight size={24} />
              </div>
            </Link>
          ))}
        </div>
      </section>
      <section className="home-method">
        <span className="a-kicker">HỌC THEO MỘT VÒNG LẶP NHỎ</span>
        <h2>Đọc. Thử. Giải thích lại.</h2>
        <div>
          {[
            {
              icon: BookOpen,
              title: "Có nền để hiểu",
              text: "Lý thuyết vừa sức, thuật ngữ tại chỗ và nguồn theo mục.",
              href: "/academy",
            },
            {
              icon: MousePointer2,
              title: "Có việc để làm",
              text: "Ghép chức năng, đổi đơn vị, thử mô-men và đọc hình.",
              href: "/challenges",
            },
            {
              icon: Compass,
              title: "Có chỗ để quan sát",
              text: "Sandbox quạt 3D, gắn với F01 và nhãn giản lược rõ ràng.",
              href: "/explorer",
            },
          ].map(({ icon: Icon, ...item }) => (
            <Link href={item.href} key={item.title}>
              <Icon size={26} strokeWidth={1.4} />
              <h3>{item.title}</h3>
              <p>{item.text}</p>
              <ArrowRight size={18} />
            </Link>
          ))}
        </div>
      </section>
      <section className="home-closing">
        <span className="a-kicker">
          BẮT ĐẦU Ở ĐÂU CŨNG ĐƯỢC. HÃY HIỂU ĐIỀU MÌNH CHỌN.
        </span>
        <h2>
          Chiếc quạt đầu tiên.
          <br />
          Bài học đầu tiên.
        </h2>
        <p>Giữ lại sự tò mò, thêm vào cách suy luận.</p>
        <Link className="a-button" href="/academy/foundations">
          Mở khóa nền tảng
          <ArrowRight size={17} />
        </Link>
      </section>
    </div>
  );
}
