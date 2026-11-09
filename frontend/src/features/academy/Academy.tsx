import { useState } from "react";
import {
  ArrowRight,
  BookOpen,
  Search,
  Check,
  ArrowUpRight,
} from "lucide-react";
import { lessons, contentErrors } from "./content";
import { Link } from "../../navigation";
import { useProgress, SaveStatus } from "./ProgressContext";
export default function Academy({ course = false }: { course?: boolean }) {
  const [query, setQuery] = useState(""),
    [group, setGroup] = useState("all");
  const { progress } = useProgress();
  const normalized = (s: string) =>
    s
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/đ/g, "d")
      .toLowerCase();
  const filtered = lessons.filter(
    (l) =>
      (group === "all" || l.group === group) &&
      normalized(
        `${l.id} ${l.title} ${l.deck} ${l.terms.map((t) => t.term).join(" ")}`,
      ).includes(normalized(query)),
  );
  return (
    <div className="academy-page">
      <header className="a-page-heading">
        <span className="a-kicker">MECHVERSE ACADEMY / KHỞI ĐẦU</span>
        <h1>
          {course
            ? "Cơ khí, từ những điều căn bản."
            : "Học cách nhìn. Hiểu cách làm."}
        </h1>
        <p>
          Mỗi bài bắt đầu từ một câu hỏi nhỏ. Đọc, thao tác, tự kiểm và quay lại
          đúng chỗ chưa rõ.
        </p>
        <div className="a-heading-meta">
          <span>{lessons.length} bài có nội dung</span>
          <span>Dữ liệu bài tập có nhãn</span>
          <span>Chưa duyệt chuyên môn</span>
        </div>
      </header>
      {!course && (
        <Link className="course-banner" href="/academy/foundations">
          <div>
            <span className="a-kicker">LỘ TRÌNH 01 · CHO NGƯỜI MỚI</span>
            <h2>Bắt đầu từ số 0</h2>
            <p>
              Cấu tạo, đơn vị và hình học trước; lực và thiết kế sau. Tiên quyết
              được ghi ở từng bài, bạn có thể xem trước.
            </p>
          </div>
          <ArrowUpRight size={30} />
        </Link>
      )}
      <SaveStatus />
      {contentErrors.length > 0 && (
        <p className="a-warning" role="alert">
          Registry đang có lỗi; các bài chưa sẵn sàng phát hành.
        </p>
      )}
      <section className="catalog-section" aria-labelledby="catalog-heading">
        <div className="a-section-heading">
          <h2 id="catalog-heading">
            {course
              ? "Các bài trong khóa nền tảng"
              : "Chọn một điều bạn muốn hiểu"}
          </h2>
          <span>{filtered.length} bài</span>
        </div>
        <div className="a-filters">
          <label className="a-search">
            <Search size={19} />
            <input
              aria-label="Tìm bài học"
              placeholder="Tìm đơn vị, bán kính, mô-men…"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </label>
          <label className="a-filter-label">
            Nhóm bài
            <select
              aria-label="Lọc nhóm bài"
              value={group}
              onChange={(e) => setGroup(e.target.value)}
            >
              <option value="all">Tất cả</option>
              <option value="foundation">Nền tảng</option>
              <option value="mechanics">Lực & chuyển động</option>
              <option value="design">Thiết kế & chế tạo</option>
            </select>
          </label>
        </div>
        <div className="lesson-catalog">
          {filtered.map((l, index) => {
            const session = progress.sessions[l.id],
              last = session?.attempts.at(-1);
            return (
              <Link
                href={`/learn/${l.slug}`}
                className="lesson-card"
                key={l.id}
              >
                <div
                  className={`card-diagram card-diagram-${l.activity}`}
                  aria-hidden="true"
                >
                  <span className="card-id">{l.id}</span>
                  <BookOpen size={42} strokeWidth={1} />
                  <span className="card-rule" />
                </div>
                <div className="lesson-card-body">
                  <div className="card-meta">
                    <span>
                      {l.group === "foundation"
                        ? "NỀN TẢNG"
                        : l.group === "mechanics"
                          ? "CƠ HỌC"
                          : "THIẾT KẾ"}
                    </span>
                    <span>~{l.minutes} phút</span>
                  </div>
                  <h3>{l.title}</h3>
                  <p>{l.deck}</p>
                  <div className="lesson-card-bottom">
                    <span>
                      {session?.phase === "review"
                        ? last?.incorrectIds.length
                          ? "Cần ôn"
                          : "Đã làm bài tự kiểm"
                        : session
                          ? "Đang học"
                          : "Học thử có nguồn"}
                    </span>
                    {session?.phase === "review" &&
                    !last?.incorrectIds.length ? (
                      <Check size={18} />
                    ) : (
                      <ArrowRight size={18} />
                    )}
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
        {!filtered.length && (
          <div className="a-empty">
            <h3>Chưa tìm thấy bài phù hợp.</h3>
            <p>Thử bỏ bộ lọc hoặc dùng từ ngắn hơn.</p>
            <button
              className="a-button secondary"
              onClick={() => {
                setQuery("");
                setGroup("all");
              }}
            >
              Xóa bộ lọc
            </button>
          </div>
        )}
      </section>
      <aside className="a-scope-note">
        <strong>Học thử, có nguồn và có giới hạn.</strong>
        <p>
          Các bài là personal-preview: đã đối chiếu tài liệu trong phạm vi ghi
          rõ, chưa có người duyệt chuyên môn. Bài làm local không phải chứng
          nhận năng lực hoặc điểm tài khoản.
        </p>
        <Link href="/knowledge">
          Tra thuật ngữ và nguồn <ArrowRight size={15} />
        </Link>
      </aside>
    </div>
  );
}
