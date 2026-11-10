import { useState } from "react";
import { ArrowUpRight, Search, ArrowRight } from "lucide-react";
import { Link } from "../../navigation";
import { assets } from "./assets";
import "./catalog.css";
const research = [
  {
    id: "enclosure",
    category: "Vỏ tủ kỹ thuật",
    title: "Vỏ tủ kỹ thuật",
    text: "Đang kiểm dữ liệu panel, bản lề và mounting plate; chưa có assembly đủ điều kiện phân phối.",
  },
  {
    id: "sink",
    category: "Bồn rửa",
    title: "Bồn rửa & bộ thoát",
    text: "Đang khảo sát lòng chậu, vành và bộ thoát. BIM bề ngoài chưa đủ để xác nhận cấu tạo lắp.",
  },
];
export default function ProductCatalog() {
  const [category, setCategory] = useState("Tất cả"),
    [status, setStatus] = useState("Tất cả"),
    [query, setQuery] = useState("");
  const normalize = (v: string) =>
    v
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/đ/g, "d")
      .toLowerCase();
  const items = [...assets.filter((a) => a.id !== "fan"), assets[0]].filter(
    (a) =>
      (category === "Tất cả" || a.category === category) &&
      status !== "Đang khảo sát" &&
      normalize(`${a.title} ${a.code} ${a.category}`).includes(
        normalize(query),
      ),
  );
  const pending = research.filter(
    (a) =>
      (category === "Tất cả" || a.category === category) &&
      status !== "Có thể khám phá" &&
      normalize(a.title).includes(normalize(query)),
  );
  return (
    <div className="product-catalog">
      <header className="catalog-hero">
        <div className="catalog-hero-copy">
          <span className="catalog-overline">
            MECHVERSE / OBJECT STUDIES — 01
          </span>
          <h1>
            Thấy cấu tạo.
            <br />
            <em>Hiểu cách liên kết.</em>
          </h1>
          <p>
            Một bề mặt, nhiều quyết định kỹ thuật. Mở, tách và đọc từng liên kết
            trong không gian Studio / CAD.
          </p>
          <a href="#product-library">
            Khám phá bộ sưu tập <ArrowRight size={18} />
          </a>
        </div>
        <Link
          className="catalog-hero-object"
          href="/explorer?product=workbench"
        >
          <img
            src="/previews/workbench.png"
            alt="Render mẫu bàn cơ khí MV-WB01 với mặt gỗ và khung ống"
          />
          <span>
            <strong>MV-WB01</strong> Kết cấu cố định / Liên kết tháo được{" "}
            <ArrowUpRight size={20} />
          </span>
        </Link>
        <div className="catalog-hero-bottom">
          <span>03 mẫu tương tác / 05 nhóm nghiên cứu</span>
          <span>Geometry có nguồn · Tương tác có ý nghĩa</span>
        </div>
      </header>
      <section className="product-library" id="product-library">
        <div className="catalog-section-heading">
          <div>
            <span className="catalog-overline">THƯ VIỆN SẢN PHẨM</span>
            <h2>Đọc đồ vật từ bên trong.</h2>
          </div>
          <p>
            Ba thiết kế nghiên cứu minh họa của dự án. Xuất xứ, giả
            thiết và phần chưa biết được ghi ngay trong từng mẫu.
          </p>
        </div>
        <div className="catalog-filters">
          <div role="group" aria-label="Nhóm sản phẩm">
            {[
              "Tất cả",
              "Locker",
              "Workbench",
              "Quạt",
              "Vỏ tủ kỹ thuật",
              "Bồn rửa",
            ].map((v) => (
              <button
                key={v}
                aria-pressed={category === v}
                onClick={() => setCategory(v)}
              >
                {v}
              </button>
            ))}
          </div>
          <label className="catalog-search">
            <Search size={16} />
            <input
              aria-label="Tìm sản phẩm"
              placeholder="Tên, mã hoặc nhóm…"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </label>
          <select
            aria-label="Trạng thái dữ liệu"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            <option>Tất cả</option>
            <option>Có thể khám phá</option>
            <option>Đang khảo sát</option>
          </select>
        </div>
        <p className="catalog-count">
          {items.length} mẫu có thể mở · {pending.length} nhóm đang khảo sát
        </p>
        <div className="product-cards">
          {items.map((a, i) => (
            <article className={`product-card product-${a.id}`} key={a.id}>
              <Link
                className="product-image"
                href={`/explorer?product=${a.id}`}
                aria-label={`Mở ${a.title}`}
              >
                <span className="product-index">
                  0{i + 1} / {a.category.toUpperCase()}
                </span>
                <img
                  src={`/previews/${a.id}.png`}
                  alt={`Render đúng asset ${a.code}`}
                  loading="lazy"
                />
                <span className="product-open">
                  Khám phá 3D <ArrowUpRight size={18} />
                </span>
              </Link>
              <div className="product-card-copy">
                <div>
                  <span className="catalog-overline">
                    {a.code} / R{a.revision}
                  </span>
                  <h3>{a.title}</h3>
                </div>
                <span className="catalog-source">
                  {a.sourceKind === "original-design"
                    ? "Thiết kế minh họa"
                    : "Demo giản lược"}
                </span>
                <p>{a.description}</p>
                <small>
                  {a.occurrences.length} occurrence · Studio / CAD / Tách cụm
                  {a.capabilities.joints ? " · Mở cửa" : ""}
                  {a.capabilities.rotation ? " · Quay cánh" : ""}
                </small>
              </div>
            </article>
          ))}
          {pending.map((a) => (
            <article className="research-card" key={a.id}>
              <span className="catalog-overline">
                {a.category} / NGHIÊN CỨU
              </span>
              <h3>{a.title}</h3>
              <p>{a.text}</p>
              <span className="research-status">
                Chưa mở 3D · Cần dữ liệu và quyền phù hợp
              </span>
            </article>
          ))}
        </div>
        {!items.length && !pending.length && (
          <p className="catalog-empty">
            Không có kết quả. Thử tên hoặc nhóm khác.
          </p>
        )}
      </section>
      <aside className="catalog-learning">
        <span className="catalog-overline">CHƯA BIẾT BẮT ĐẦU Ở ĐÂU?</span>
        <h2>Quan sát trước. Học từng bước.</h2>
        <p>
          M01/M02 giải thích thuật ngữ và cách đọc cấu tạo từ số 0. Bạn vẫn giữ
          bài làm khi chuyển giữa không gian học và Explorer.
        </p>
        <Link href="/academy/roadmap">
          Bắt đầu từ số 0 <ArrowRight size={18} />
        </Link>
        <Link href="/explorer?lesson=F01">Tiếp tục F01 đã lưu</Link>
      </aside>
    </div>
  );
}
