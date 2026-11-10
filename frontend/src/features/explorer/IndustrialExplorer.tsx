import { lazy, Suspense, useCallback, useEffect, useState } from "react";
import { useStore } from "zustand";
import {
  ArrowLeft,
  ChevronRight,
  Box,
  Eye,
  EyeOff,
  Focus,
  Layers,
  RotateCcw,
  PanelLeftClose,
  PanelRightClose,
} from "lucide-react";
import { assets, getAsset } from "./assets";
import { explorerStore } from "./state";
import type { CameraPreset, Occurrence } from "./assetTypes";
import RenderBoundary from "../../components/RenderBoundary";
import { Link, navigate } from "../../navigation";
import "./industrial.css";
const Viewer = lazy(() => import("./Viewer"));
export default function IndustrialExplorer({ assetId }: { assetId: string }) {
  const asset = getAsset(assetId),
    s = useStore(explorerStore),
    [ready, setReady] = useState(false),
    [retry, setRetry] = useState(0),
    [query, setQuery] = useState(""),
    [tab, setTab] = useState("model"),
    [left, setLeft] = useState(true),
    [right, setRight] = useState(true),
    [reduced, setReduced] = useState(
      () => matchMedia("(prefers-reduced-motion: reduce)").matches,
    );
  const onReady = useCallback(() => setReady(true), []);
  useEffect(() => {
    if (reduced) explorerStore.setState({ playing: false });
  }, [reduced]);
  useEffect(() => {
    explorerStore.getState().setAsset(asset.id);
    setReady(false);
    setQuery("");
  }, [asset]);
  useEffect(() => {
    const media = matchMedia("(prefers-reduced-motion: reduce)"),
      change = () => setReduced(media.matches);
    media.addEventListener("change", change);
    return () => media.removeEventListener("change", change);
  }, []);
  useEffect(() => {
    const key = (e: KeyboardEvent) => {
      if (
        e.ctrlKey ||
        e.metaKey ||
        e.altKey ||
        (e.target as HTMLElement)?.closest(
          "input,textarea,select,button,a,summary,[contenteditable=true]",
        )
      )
        return;
      const state = explorerStore.getState();
      if (e.key.toLowerCase() === "f") state.setCamera("iso");
      if (e.key.toLowerCase() === "r") state.reset();
      if (e.key.toLowerCase() === "c")
        state.setShade(state.shade === "cad" ? "studio" : "cad");
    };
    window.addEventListener("keydown", key);
    return () => window.removeEventListener("keydown", key);
  }, []);
  const selected = asset.occurrences.find((p) => p.id === s.selected),
    source =
      asset.sourceKind === "original-design"
        ? "Thiết kế minh họa MECHVERSE"
        : "Demo giáo dục giản lược";
  const filtered = asset.occurrences.filter((p) =>
    `${p.name} ${p.id}`
      .toLocaleLowerCase("vi")
      .includes(query.toLocaleLowerCase("vi")),
  );
  function row(p: Occurrence, depth = 0): React.ReactNode {
    return (
      <div key={p.id} style={{ paddingLeft: depth * 12 }}>
        <div
          className={`industrial-tree-row ${s.selected === p.id ? "selected" : ""}`}
        >
          <button
            onClick={() => s.select(p.id)}
            aria-pressed={s.selected === p.id}
          >
            <Box size={14} />
            <span>{p.name}</span>
          </button>
          <button
            aria-label={`${s.hidden.includes(p.id) ? "Hiện" : "Ẩn"} ${p.name}`}
            onClick={() => s.toggleHidden(p.id)}
          >
            {s.hidden.includes(p.id) ? <EyeOff size={14} /> : <Eye size={14} />}
          </button>
        </div>
        {!query &&
          asset.occurrences
            .filter((c) => c.parentId === p.id)
            .map((c) => row(c, depth + 1))}
      </div>
    );
  }
  if (!assets.some((a) => a.id === assetId))
    return (
      <main className="a-empty">
        <h1>Chưa có sản phẩm này</h1>
        <Link href="/products">Về thư viện sản phẩm</Link>
      </main>
    );
  return (
    <main className="industrial-workspace" data-product={asset.id}>
      <header className="industrial-heading">
        <div>
          <Link href="/products">
            <ArrowLeft size={15} /> Thư viện sản phẩm
          </Link>
          <h1>
            {asset.title}
            <span>
              {asset.code} / R{asset.revision}
            </span>
          </h1>
        </div>
        <label className="product-switch">
          Đổi sản phẩm
          <select
            aria-label="Đổi sản phẩm"
            value={asset.id}
            onChange={(e) => navigate(`/explorer?product=${e.target.value}`)}
          >
            {assets.map((a) => (
              <option key={a.id} value={a.id}>
                {a.title}
              </option>
            ))}
          </select>
        </label>
      </header>
      <div className="industrial-bar">
        <span>{source}</span>
        <div role="group" aria-label="Chế độ hiển thị">
          <button
            aria-pressed={s.shade === "studio"}
            onClick={() => s.setShade("studio")}
          >
            Studio
          </button>
          <button
            aria-pressed={s.shade === "cad"}
            onClick={() => s.setShade("cad")}
          >
            CAD · Cạnh hình
          </button>
        </div>
        <span>{asset.dimensions}</span>
      </div>
      <div
        className="industrial-mobile-tabs"
        role="tablist"
        aria-label="Panel Explorer"
        onKeyDown={(event) => {
          const ids = ["model", "parts", "info"],
            index = ids.indexOf(tab);
          const next =
            event.key === "ArrowRight"
              ? ids[(index + 1) % 3]
              : event.key === "ArrowLeft"
                ? ids[(index + 2) % 3]
                : event.key === "Home"
                  ? ids[0]
                  : event.key === "End"
                    ? ids[2]
                    : undefined;
          if (next) {
            event.preventDefault();
            setTab(next);
            document.getElementById(`tab-${next}`)?.focus();
          }
        }}
      >
        {[
          ["model", "Mô hình"],
          ["parts", "Cấu tạo"],
          ["info", "Thông tin"],
        ].map(([id, label]) => (
          <button
            role="tab"
            id={`tab-${id}`}
            aria-controls={`industrial-${id}`}
            aria-selected={tab === id}
            tabIndex={tab === id ? 0 : -1}
            key={id}
            onClick={() => setTab(id)}
          >
            {label}
          </button>
        ))}
      </div>
      <div
        className={`industrial-grid ${left ? "" : "no-left"} ${right ? "" : "no-right"}`}
        data-tab={tab}
      >
        <aside
          id="industrial-parts"
          className={`industrial-tree ${left ? "" : "collapsed"}`}
        >
          <div className="industrial-panel-title">
            <h2>
              Cây assembly <small>{asset.occurrences.length}</small>
            </h2>
            <button aria-label="Thu gọn cây" onClick={() => setLeft(false)}>
              <PanelLeftClose size={18} />
            </button>
          </div>
          <input
            aria-label="Tìm bộ phận"
            placeholder="Tên hoặc mã bộ phận…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <div className="industrial-tree-scroll">
            {asset.groups.map((g) => (
              <details key={g.id} open>
                <summary>{g.name}</summary>
                {filtered
                  .filter((p) => p.group === g.id && (query || !p.parentId))
                  .map((p) => row(p))}
              </details>
            ))}
            {!filtered.length && <p>Không tìm thấy bộ phận.</p>}
          </div>
          <p className="industrial-panel-foot">
            Tấm, liên kết và cụm có ID riêng.
            <br />
            Chọn từ cây hoặc chạm mô hình.
          </p>
        </aside>
        <section
          id="industrial-model"
          className="industrial-stage"
          aria-label="Không gian quan sát 3D"
        >
          <div className="stage-top">
            <div>
              {!left && (
                <button onClick={() => setLeft(true)}>Mở cây cấu tạo</button>
              )}
              <span>
                {s.shade === "cad"
                  ? "SHADED WITH EDGES"
                  : "STUDIO / MATERIAL STUDY"}
              </span>
            </div>
            {!right && (
              <button onClick={() => setRight(true)}>Mở thông tin</button>
            )}
            <span className="stage-axis">Y↑ · Z trước</span>
          </div>
          <div className="industrial-canvas">
            <RenderBoundary
              key={retry}
              resetKey={asset.id}
              fallback={
                <div className="industrial-fallback">
                  <h2>Không tải được mô hình 3D</h2>
                  <p>
                    File tải lỗi hoặc WebGL không khả dụng. Cây cấu tạo và thông
                    tin vẫn dùng được.
                  </p>
                  <svg
                    viewBox="0 0 220 180"
                    role="img"
                    aria-label={`Sơ đồ 2D khái niệm ${asset.title}, không theo tỷ lệ`}
                  >
                    <rect
                      x="40"
                      y="15"
                      width="90"
                      height="145"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    />
                    <path
                      d="M40 88h90m-75-60h60m-60 75h60M145 45h50m-50 45h50m-50 45h50"
                      stroke="currentColor"
                    />
                    <text x="20" y="177" fontSize="10">
                      Sơ đồ khái niệm · xem cấu tạo trong cây
                    </text>
                  </svg>
                  <button
                    onClick={() => {
                      setReady(false);
                      setRetry((v) => v + 1);
                    }}
                  >
                    Thử tải lại mô hình
                  </button>
                </div>
              }
            >
              <Suspense
                fallback={
                  <div className="industrial-loading">Đang mở viewer…</div>
                }
              >
                <Viewer onReady={onReady} reduced={reduced} />
              </Suspense>
            </RenderBoundary>
          </div>
          <div className="stage-bottom">
            <span data-testid="model-status">
              {ready ? "Mô hình sẵn sàng" : "Đang tải mô hình…"}
            </span>
            <span>Kéo để xoay · cuộn để phóng</span>
          </div>
          {s.labels && !s.selected && (
            <p className="stage-hint">Chọn một bộ phận để hiện nhãn.</p>
          )}
        </section>
        <aside
          id="industrial-info"
          className={`industrial-inspector ${right ? "" : "collapsed"}`}
        >
          <div className="industrial-panel-title">
            <h2>Đọc cấu tạo</h2>
            <button
              aria-label="Thu gọn thông tin"
              onClick={() => setRight(false)}
            >
              <PanelRightClose size={18} />
            </button>
          </div>
          <span className="industrial-kicker">
            {selected ? selected.id : "THIẾT KẾ / QUAN HỆ LẮP"}
          </span>
          <h2>{selected?.name ?? "Từ bề mặt, đến liên kết."}</h2>
          <p>{selected?.description ?? asset.description}</p>
          {selected && (
            <>
              <span className="connection-tag">
                {selected.connection === "fixed"
                  ? "Kết cấu cố định"
                  : selected.connection === "hinge"
                    ? "Liên kết bản lề"
                    : "Liên kết tháo được"}
              </span>
              <p>{selected.relation}</p>
              <dl>
                <dt>Cụm cha</dt>
                <dd>
                  {asset.occurrences.find((p) => p.id === selected.parentId)
                    ?.name ?? asset.code}
                </dd>
                <dt>Part definition</dt>
                <dd>{selected.definitionId}</dd>
              </dl>
            </>
          )}
          {asset.capabilities.joints && (
            <section className="joint-controls">
              <h3>Mở khoang để quan sát</h3>
              {asset.occurrences
                .filter((p) => p.joint)
                .map((p) => (
                  <label key={p.id}>
                    {p.name}
                    <output>{s.joints[p.id] ?? 0}°</output>
                    <input
                      aria-label={`Góc ${p.name.toLowerCase()}`}
                      type="range"
                      min="0"
                      max={p.joint!.limits[1]}
                      value={s.joints[p.id] ?? 0}
                      onChange={(e) => s.setJoint(p.id, Number(e.target.value))}
                    />
                  </label>
                ))}
              <p>Mở cửa sẽ trở về trạng thái lắp; tách cụm sẽ đóng cửa.</p>
            </section>
          )}
          <details className="industrial-provenance">
            <summary>Nguồn và điều chưa biết</summary>
            <strong>
              {source} · revision {asset.revision}
            </strong>
            {asset.limitations.map((v) => (
              <p key={v}>{v}</p>
            ))}
            <p>
              Vật liệu trên màn hình là diễn họa; cấp vật liệu kỹ thuật chưa xác
              minh.
            </p>
          </details>
          {asset.id === "fan" && (
            <Link className="industrial-link" href="/explorer?lesson=F01">
              Mở bài F01 với tiến độ đã lưu <ChevronRight size={16} />
            </Link>
          )}
        </aside>
      </div>
      <footer className="industrial-tools">
        <div className="camera-presets" role="group" aria-label="Góc nhìn">
          {(
            [
              ["iso", "Isometric"],
              ["front", "Front"],
              ["side", "Side"],
              ["top", "Top"],
              ["under", "Mặt dưới"],
            ] as [CameraPreset, string][]
          ).map(([v, label]) => (
            <button
              key={v}
              aria-pressed={s.cameraPreset === v}
              onClick={() => s.setCamera(v)}
            >
              {label}
            </button>
          ))}
          <button onClick={() => s.setCamera("iso")}>Fit view</button>
        </div>
        <div className="observation-tools">
          <button disabled={!selected} onClick={s.focus}>
            <Focus size={16} /> Đến bộ phận
          </button>
          <button
            disabled={!selected}
            aria-pressed={!!s.isolated}
            onClick={s.toggleIsolate}
          >
            <Layers size={16} />
            {s.isolated ? "Xem toàn bộ" : "Xem riêng"}
          </button>
          <button aria-pressed={s.labels} onClick={s.toggleLabels}>
            Nhãn
          </button>
          <button onClick={s.reset}>
            <RotateCcw size={16} /> Đặt lại mô hình
          </button>
        </div>
        <div className="assembly-controls">
          <label>
            Tách cụm <output>{s.explode}%</output>
            <input
              type="range"
              aria-label="Mức tách cụm"
              min="0"
              max="100"
              value={s.explode}
              onChange={(e) => s.setExplode(Number(e.target.value))}
            />
          </label>
          <button
            onClick={() => {
              s.setExplode(s.explode ? 0 : asset.id === "fan" ? 100 : 65);
              s.setCamera("iso");
            }}
          >
            {s.explode ? "Lắp lại" : "Tách theo cụm"}
          </button>
          {asset.capabilities.rotation && (
            <button aria-pressed={s.playing} onClick={s.togglePlaying}>
              {s.playing ? "Dừng quay" : "Quay cánh"}
            </button>
          )}
          <span>Trình bày cấu tạo · chưa phải quy trình tháo</span>
          <details>
            <summary>Phím tắt</summary>F: fit · R: reset · C: Studio/CAD. Bỏ qua
            khi đang nhập liệu.
          </details>
        </div>
      </footer>
    </main>
  );
}
