import { lazy, Suspense, useCallback, useEffect, useState } from "react";
import { useStore } from "zustand";
import {
  ArrowRight,
  BookOpen,
  Box,
  ChevronRight,
  Compass,
  Expand,
  Eye,
  EyeOff,
  Focus,
  GraduationCap,
  LayoutDashboard,
  Layers3,
  LoaderCircle,
  Pause,
  Play,
  RotateCcw,
  ShieldCheck,
  Target,
} from "lucide-react";
import { explorerStore, parts } from "./state";
import {
  initialLesson,
  restoreLesson,
  saveLesson,
  STORAGE_KEY,
  type LessonState,
} from "../lesson/lesson";
import PartTree from "./PartTree";
import Inspector from "./Inspector";
import LessonPanel from "../lesson/LessonPanel";
import RenderBoundary from "../../components/RenderBoundary";
import Dashboard from "../dashboard/Dashboard";

function getLesson() {
  try {
    return restoreLesson(localStorage.getItem(STORAGE_KEY));
  } catch {
    return { ...initialLesson };
  }
}
function useReducedMotion() {
  const [reduced, setReduced] = useState(
    () => window.matchMedia("(prefers-reduced-motion: reduce)").matches,
  );
  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const change = () => setReduced(media.matches);
    media.addEventListener("change", change);
    return () => media.removeEventListener("change", change);
  }, []);
  return reduced;
}

export default function App() {
  useEffect(() => {
    explorerStore.getState().setAsset("fan");
  }, []);
  const [page, setPage] = useState<"explorer" | "dashboard">(() =>
    new URLSearchParams(location.search).get("view") === "dashboard"
      ? "dashboard"
      : "explorer",
  );
  const [mode, setMode] = useState<"explore" | "learn">(() =>
    new URLSearchParams(location.search).get("lesson") === "F01"
      ? "learn"
      : "explore",
  );
  const [tab, setTab] = useState<"parts" | "info">(() =>
    new URLSearchParams(location.search).get("lesson") === "F01"
      ? "info"
      : "parts",
  );
  const [lesson, setLessonState] = useState<LessonState>(getLesson);
  const [saved, setSaved] = useState<boolean | null>(null);
  const [ready, setReady] = useState(false);
  const [revision, setRevision] = useState(0);
  const [Viewer, setViewer] = useState(() => lazy(() => import("./Viewer")));
  const [reloadNeeded, setReloadNeeded] = useState(false);
  const state = useStore(explorerStore);
  const selected = parts.find((p) => p.id === state.selected);
  const reduced = useReducedMotion();
  const onReady = useCallback(() => setReady(true), []);
  const save = useCallback((value: LessonState) => {
    try {
      setSaved(saveLesson(value, localStorage));
    } catch {
      setSaved(false);
    }
  }, []);
  function setLesson(value: LessonState) {
    setLessonState(value);
    save(value);
  }
  function startLesson() {
    setPage("explorer");
    setMode("learn");
    setTab("info");
    state.reset();
  }
  async function retryModel() {
    try {
      const module = await import("./Viewer");
      module.clearModel();
      setViewer(() => lazy(() => Promise.resolve(module)));
      setReloadNeeded(false);
      setReady(false);
      setRevision((v) => v + 1);
    } catch {
      setReloadNeeded(true);
    }
  }
  useEffect(() => {
    if (reduced && explorerStore.getState().playing)
      explorerStore.setState({ playing: false });
  }, [reduced]);
  return (
    <div className="app-shell">
      <a className="skip-link" href="#main-content">
        Đến nội dung chính
      </a>
      <aside className="app-sidebar">
        <a className="brand" href="/" aria-label="MECHVERSE trang khám phá">
          <span className="brand-mark">
            <Box size={24} />
          </span>
          <span>
            MECH<span className="brand-light">VERSE</span>
            <small>HIỂU TỪ BÊN TRONG</small>
          </span>
        </a>
        <div className="sidebar-label">KHÔNG GIAN HỌC TẬP</div>
        <nav aria-label="Điều hướng chính">
          <button
            aria-label="Khám phá 3D"
            title="Khám phá 3D"
            className={
              page === "explorer" && mode === "explore" ? "active" : ""
            }
            onClick={() => {
              setPage("explorer");
              setMode("explore");
            }}
          >
            <Compass size={20} />
            <span>Khám phá 3D</span>
            <ChevronRight size={16} />
          </button>
          <button
            aria-label="Bài học demo"
            title="Bài học demo"
            className={page === "explorer" && mode === "learn" ? "active" : ""}
            onClick={startLesson}
          >
            <GraduationCap size={20} />
            <span>Bài học demo</span>
          </button>
          <button
            aria-label="Tổng quan"
            title="Tổng quan"
            className={page === "dashboard" ? "active" : ""}
            onClick={() => setPage("dashboard")}
          >
            <LayoutDashboard size={20} />
            <span>Tổng quan</span>
          </button>
        </nav>
        <div className="sidebar-bottom">
          <div className="sidebar-demo">
            <span className="tiny-dot" />
            PHIÊN DEMO
          </div>
          <p>
            Bắt đầu từ điều quen thuộc.
            <br />
            Hiểu thêm mỗi lần khám phá.
          </p>
          <div className="sidebar-footer">
            <span className="avatar">M</span>
            <div>
              Người khám phá<small>Tiến độ trên thiết bị</small>
            </div>
          </div>
        </div>
      </aside>
      <div className="workspace">
        <header className="topbar">
          <div className="breadcrumb">
            <span>Không gian học tập</span>
            <ChevronRight size={14} />
            <strong>
              {page === "dashboard"
                ? "Tổng quan"
                : mode === "learn"
                  ? "Bài học F01"
                  : "Explorer"}
            </strong>
          </div>
          <span className="local-label">
            <span className="tiny-dot" />
            Bản trải nghiệm v0.1
          </span>
        </header>
        <main id="main-content">
          {page === "dashboard" ? (
            <Dashboard
              lesson={lesson}
              saved={saved}
              retry={() => save(lesson)}
              onLearn={startLesson}
              onExplore={() => {
                setPage("explorer");
                setMode("explore");
              }}
            />
          ) : (
            <>
              <div className="page-heading">
                <div>
                  <div className="eyebrow">
                    <span className="section-number">01</span> PHÒNG KHÁM PHÁ CƠ
                    KHÍ
                  </div>
                  <h1>
                    Khám phá chiếc quạt<span className="title-dot">.</span>
                  </h1>
                  <p>
                    Từ một đồ vật quen thuộc, hiểu cách từng bộ phận làm việc
                    cùng nhau.
                  </p>
                </div>
                <div className="model-label">
                  <span className="badge amber">
                    <span className="tiny-dot" />
                    Mô hình giáo dục
                  </span>
                  <span>EDU-FAN-01 / REV. 01</span>
                </div>
              </div>
              <div className="workspace-heading">
                <div className="product-name">
                  <span className="product-icon">
                    <Box size={21} />
                  </span>
                  <div>
                    <strong>Quạt bàn</strong>
                    <span>8 bộ phận · Cấu hình giản lược</span>
                  </div>
                </div>
                <div className="mode-switch" aria-label="Chế độ trải nghiệm">
                  <button
                    className={mode === "explore" ? "active" : ""}
                    aria-pressed={mode === "explore"}
                    onClick={() => setMode("explore")}
                  >
                    <Compass size={16} />
                    Khám phá tự do
                  </button>
                  <button
                    className={mode === "learn" ? "active" : ""}
                    aria-pressed={mode === "learn"}
                    onClick={startLesson}
                  >
                    <BookOpen size={16} />
                    Học có hướng dẫn
                  </button>
                </div>
              </div>
              <div className="explorer-layout">
                <div
                  id="parts-panel"
                  className={`tree-slot ${tab === "parts" ? "mobile-active" : ""}`}
                >
                  <PartTree />
                </div>
                <section
                  className="viewer-panel"
                  aria-label="Không gian quan sát 3D"
                >
                  <div className="viewport">
                    <div className="viewport-top">
                      <span className="view-label">
                        <span className="tiny-dot" />
                        GÓC NHÌN TỰ DO
                      </span>
                      <span className="view-format">3D / GLB</span>
                    </div>
                    <RenderBoundary
                      key={revision}
                      fallback={
                        <div className="model-fallback">
                          <Box size={32} />
                          <h2>Không tải được mô hình 3D</h2>
                          <p>
                            File có thể chưa tải được hoặc WebGL không khả dụng.
                            Bạn vẫn học được qua sơ đồ và cây bộ phận.
                          </p>
                          <FanDiagram />
                          {reloadNeeded ? (
                            <>
                              <p role="status">
                                Tệp giao diện 3D chưa tải được. Thử tải lại
                                trang.
                                {saved === false
                                  ? " Bài làm chưa lưu sẽ mất khi tải lại trang."
                                  : ""}
                              </p>
                              <button
                                className="button secondary"
                                onClick={() => location.reload()}
                              >
                                Tải lại ứng dụng
                              </button>
                            </>
                          ) : (
                            <button
                              className="button secondary"
                              onClick={() => void retryModel()}
                            >
                              Thử tải lại mô hình
                            </button>
                          )}
                        </div>
                      }
                    >
                      <Suspense
                        fallback={
                          <div className="model-loading">
                            <LoaderCircle size={26} />
                            <span>Đang mở không gian 3D…</span>
                          </div>
                        }
                      >
                        <Viewer teaching reduced={reduced} onReady={onReady} />
                      </Suspense>
                      {!ready && (
                        <div className="asset-loading" role="status">
                          Đang tải mô hình giáo dục…
                        </div>
                      )}
                    </RenderBoundary>
                    <div className="viewport-bottom">
                      <span className="model-status" data-testid="model-status">
                        {ready ? "Mô hình sẵn sàng" : "Chờ mô hình"}
                      </span>
                      <span className="axis-indicator" aria-hidden="true">
                        <i>Y</i>
                        <b>Z</b>
                        <em>X</em>
                      </span>
                    </div>
                  </div>
                  <div className="viewer-controls">
                    <div
                      className="toolbar"
                      role="group"
                      aria-label="Công cụ quan sát"
                    >
                      <button
                        className="tool"
                        disabled={!selected}
                        title={
                          !selected
                            ? "Chọn bộ phận trước"
                            : "Đưa camera đến bộ phận"
                        }
                        onClick={state.focus}
                      >
                        <Focus size={18} />
                        <span>Đến bộ phận</span>
                      </button>
                      <button
                        className={`tool ${state.isolated ? "tool-active" : ""}`}
                        disabled={!selected}
                        aria-pressed={Boolean(state.isolated)}
                        onClick={state.toggleIsolate}
                      >
                        <Expand size={18} />
                        <span>
                          {state.isolated ? "Xem toàn bộ" : "Xem riêng"}
                        </span>
                      </button>
                      <button
                        className="tool"
                        disabled={!selected}
                        onClick={() =>
                          selected && state.toggleHidden(selected.id)
                        }
                      >
                        {selected && state.hidden.includes(selected.id) ? (
                          <Eye size={18} />
                        ) : (
                          <EyeOff size={18} />
                        )}
                        <span>
                          {selected && state.hidden.includes(selected.id)
                            ? "Hiện phần chọn"
                            : "Ẩn phần chọn"}
                        </span>
                      </button>
                      <span className="toolbar-divider" />
                      <button
                        className={`tool ${state.playing ? "tool-active" : ""}`}
                        aria-pressed={state.playing}
                        onClick={state.togglePlaying}
                      >
                        {state.playing ? (
                          <Pause size={18} />
                        ) : (
                          <Play size={18} />
                        )}
                        <span>
                          {state.playing ? "Dừng quay" : "Xem chuyển động"}
                        </span>
                      </button>
                      <button
                        className="tool reset-tool"
                        aria-label="Đặt lại mô hình"
                        title="Đặt lại mô hình"
                        onClick={state.reset}
                      >
                        <RotateCcw size={18} />
                        <span>Đặt lại</span>
                      </button>
                    </div>
                    <div className="explode-control">
                      <label htmlFor="explode">
                        <Layers3 size={17} />
                        Tách cụm
                      </label>
                      <input
                        id="explode"
                        aria-label="Mức tách cụm"
                        type="range"
                        min="0"
                        max="100"
                        value={state.explode}
                        onChange={(e) =>
                          state.setExplode(Number(e.target.value))
                        }
                      />
                      <output htmlFor="explode">{state.explode}%</output>
                    </div>
                  </div>
                  <div className="viewer-hint">
                    <span>Kéo để xoay · Cuộn / chụm để phóng to</span>
                    <button onClick={state.reset}>
                      <RotateCcw size={13} />
                      {mode === "learn"
                        ? "Về góc nhìn bài học"
                        : "Góc nhìn ban đầu"}
                    </button>
                  </div>
                  {state.playing && (
                    <p className="motion-note">
                      Minh họa quay cánh/trục; không thể hiện tốc độ hoặc nguyên
                      lý điện thực tế.
                    </p>
                  )}
                </section>
                <div
                  className="mobile-panel-tabs"
                  role="tablist"
                  aria-label="Panel khám phá"
                  onKeyDown={(e) => {
                    if (
                      ["ArrowLeft", "ArrowRight", "Home", "End"].includes(e.key)
                    ) {
                      e.preventDefault();
                      const next =
                        e.key === "Home"
                          ? "parts"
                          : e.key === "End"
                            ? "info"
                            : tab === "parts"
                              ? "info"
                              : "parts";
                      setTab(next);
                      document.getElementById(`${next}-tab`)?.focus();
                    }
                  }}
                >
                  <button
                    role="tab"
                    tabIndex={tab === "parts" ? 0 : -1}
                    aria-selected={tab === "parts"}
                    aria-controls="parts-panel"
                    id="parts-tab"
                    onClick={() => setTab("parts")}
                  >
                    <Layers3 size={17} />
                    Bộ phận
                  </button>
                  <button
                    role="tab"
                    tabIndex={tab === "info" ? 0 : -1}
                    aria-selected={tab === "info"}
                    aria-controls="info-panel"
                    id="info-tab"
                    onClick={() => setTab("info")}
                  >
                    {mode === "learn" ? (
                      <Target size={17} />
                    ) : (
                      <BookOpen size={17} />
                    )}{" "}
                    {mode === "learn" ? "Bài học" : "Thông tin"}
                  </button>
                </div>
                <div
                  id="info-panel"
                  className={`inspector-slot ${tab === "info" ? "mobile-active" : ""}`}
                >
                  {mode === "learn" ? (
                    <LessonPanel
                      lesson={lesson}
                      setLesson={setLesson}
                      saved={saved}
                      retry={() => save(lesson)}
                    />
                  ) : (
                    <Inspector onLearn={startLesson} />
                  )}
                </div>
              </div>
              <div className="learning-strip">
                <span className="learning-icon">
                  <GraduationCap size={25} />
                </span>
                <div>
                  <span className="eyebrow">QUAN SÁT → THAO TÁC → HIỂU</span>
                  <h2>
                    {mode === "learn"
                      ? "Tự khám phá, rồi thử giải thích."
                      : "Không chỉ nhìn. Hãy thử một nhiệm vụ."}
                  </h2>
                  <p>
                    {mode === "learn"
                      ? "Đổi góc nhìn hoặc tách cụm bất cứ lúc nào. Đặt lại mô hình không xóa bài làm."
                      : "Bài F01 giúp bạn phân biệt một chi tiết với một cụm ngay trên mô hình."}
                  </p>
                </div>
                {mode === "explore" && (
                  <button className="button secondary" onClick={startLesson}>
                    Mở bài F01
                    <ArrowRight size={17} />
                  </button>
                )}
              </div>
              <footer className="content-footer">
                <span>
                  <ShieldCheck size={15} />
                  Minh bạch nguồn và giới hạn
                </span>
                <span>
                  Demo chưa duyệt chuyên môn · Không có thông số chế tạo
                </span>
              </footer>
            </>
          )}
        </main>
      </div>
    </div>
  );
}

function FanDiagram() {
  return (
    <svg
      className="fan-diagram"
      viewBox="0 0 280 180"
      role="img"
      aria-label="Sơ đồ 2D: cụm đầu quạt chứa lồng và cánh, nối với trụ và đế"
    >
      <circle
        cx="90"
        cy="60"
        r="43"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      />
      <path d="M90 103v43m-28 8h56" stroke="currentColor" strokeWidth="7" />
      <path
        d="M90 60c-28-40 26-40 10 0c48-4 26 40-7 9c-24 40-47 0-9-12"
        fill="#328f89"
      />
      <circle cx="90" cy="60" r="6" fill="#b45309" />
      <g fontSize="12" fill="currentColor">
        <text x="150" y="35">
          Cụm đầu quạt
        </text>
        <text x="150" y="65">
          Cánh quạt
        </text>
        <text x="150" y="120">
          Trụ đỡ
        </text>
        <text x="150" y="157">
          Đế quạt
        </text>
      </g>
      <g stroke="currentColor" strokeWidth="1">
        <path d="M122 30h22M105 60h39M97 117h47M120 153h24" />
      </g>
    </svg>
  );
}
