import { lazy, Suspense, useEffect } from "react";
import {
  Box,
  ArrowUpRight,
  BookOpen,
  Compass,
  GraduationCap,
} from "lucide-react";
import { Link, navigate, useRoute } from "./navigation";
import { ProgressProvider } from "./features/academy/ProgressContext";
import RenderBoundary from "./components/RenderBoundary";
import "./academy.css";
import "./curriculum.css";
import "./features/explorer/catalog.css";
import { ExploreReturn } from "./features/academy/LearningModes";
const Home = lazy(() => import("./features/academy/Home"));
const Academy = lazy(() => import("./features/academy/Academy"));
const Roadmap = lazy(() => import("./features/academy/Roadmap"));
const LessonWorkspace = lazy(
  () => import("./features/academy/LessonWorkspace"),
);
const StudyPages = lazy(() => import("./features/academy/StudyPages"));
const Explorer = lazy(() => import("./features/explorer/ExplorerApp"));
const IndustrialExplorer = lazy(
  () => import("./features/explorer/IndustrialExplorer"),
);
const ProductCatalog = lazy(() => import("./features/explorer/ProductCatalog"));
function lessonSlug(path: string) {
  try {
    return decodeURIComponent(path.slice(7));
  } catch {
    return "";
  }
}
function PageError() {
  return (
    <div className="a-empty" role="alert">
      <h1>Chưa mở được không gian này.</h1>
      <p>
        Kiểm tra kết nối rồi thử tải lại. Bài đã lưu trên thiết bị vẫn được giữ.
      </p>
      <button className="a-button" onClick={() => window.location.reload()}>
        Tải lại trang
      </button>
      <a href="/academy">Về Academy</a>
    </div>
  );
}
export default function App() {
  return (
    <ProgressProvider>
      <RoutedApp />
    </ProgressProvider>
  );
}
function RoutedApp() {
  const route = useRoute(),
    path = new URL(route, window.location.origin).pathname,
    explorer = path === "/explorer" || path.startsWith("/explorer/");
  useEffect(() => {
    document.title = path.startsWith("/learn/")
      ? "MECHVERSE Academy — Bài học cơ khí"
      : "MECHVERSE — Học cơ khí từ đồ vật";
    if (
      path === "/" &&
      new URLSearchParams(location.search).get("view") === "dashboard"
    ) {
      navigate("/dashboard");
      return;
    }
    window.scrollTo(0, 0);
    if (explorer) return;
    const focusHeading = () => {
      const heading = document.querySelector<HTMLHeadingElement>("main h1");
      if (!heading) return false;
      heading.tabIndex = -1;
      heading.focus({ preventScroll: true });
      return true;
    };
    if (focusHeading()) return;
    const observer = new MutationObserver(() => {
      if (focusHeading()) observer.disconnect();
    });
    observer.observe(document.getElementById("root")!, {
      childList: true,
      subtree: true,
    });
    return () => observer.disconnect();
  }, [path]);
  if (explorer)
    return (
      <div className="legacy-explorer">
        <div className="legacy-academy-bar">
          <Link href="/academy">
            <GraduationCap size={17} />
            Học cơ khí
          </Link>
          <Link href="/products">Thư viện sản phẩm · Studio / CAD</Link>
          <Link href="/dashboard">Tiến độ học</Link>
          <ExploreReturn />
        </div>
        <RenderBoundary key={path} fallback={<PageError />}>
          <Suspense fallback={<PageLoading />}>
            {new URLSearchParams(location.search).get("product") &&
            new URLSearchParams(location.search).get("lesson") !== "F01" ? (
              <IndustrialExplorer
                assetId={new URLSearchParams(location.search).get("product")!}
              />
            ) : (
              <Explorer />
            )}
          </Suspense>
        </RenderBoundary>
      </div>
    );
  let content;
  if (path === "/") content = <Home />;
  else if (path === "/products") content = <ProductCatalog />;
  else if (path === "/academy/roadmap") content = <Roadmap />;
  else if (path === "/academy" || path === "/academy/foundations")
    content = <Academy course={path.endsWith("/foundations")} />;
  else if (path.startsWith("/learn/"))
    content = <LessonWorkspace key={path} slug={lessonSlug(path)} />;
  else if (
    ["/practice", "/challenges", "/knowledge", "/dashboard"].includes(path)
  )
    content = <StudyPages page={path.slice(1)} />;
  else
    content = (
      <div className="a-empty">
        <h1>Trang này không tồn tại.</h1>
        <Link href="/academy">Mở Academy</Link>
      </div>
    );
  return (
    <div className={`academy-app ${path === "/" ? "is-home" : ""}`}>
      <a className="skip-link" href="#academy-main">
        Đến nội dung học
      </a>
      <header className="academy-header">
        <Link className="a-brand" href="/" aria-label="MECHVERSE trang chủ">
          <Box size={23} />
          <span>
            MECH<span>VERSE</span>
          </span>
        </Link>
        <nav aria-label="Điều hướng học tập">
          <Link
            aria-current={
              path.startsWith("/academy") && path !== "/academy/roadmap"
                ? "page"
                : undefined
            }
            href="/academy"
          >
            Học cơ khí
          </Link>
          <Link
            href="/academy/roadmap"
            aria-current={path === "/academy/roadmap" ? "page" : undefined}
          >
            Lộ trình
          </Link>
          <Link
            aria-current={path === "/practice" ? "page" : undefined}
            href="/practice"
          >
            Luyện tập
          </Link>
          <Link
            aria-current={path === "/products" ? "page" : undefined}
            href="/products"
          >
            Khám phá 3D
          </Link>
          <Link
            aria-current={path === "/knowledge" ? "page" : undefined}
            href="/knowledge"
          >
            Kiến thức
          </Link>
        </nav>
        <Link className="a-header-cta" href="/dashboard">
          Góc học tập
          <ArrowUpRight size={15} />
        </Link>
      </header>
      <main id="academy-main">
        <RenderBoundary key={path} fallback={<PageError />}>
          <Suspense fallback={<PageLoading />}>{content}</Suspense>
        </RenderBoundary>
      </main>
      <footer className="academy-footer">
        <div>
          <Link className="a-brand" href="/">
            <Box size={22} />
            MECHVERSE
          </Link>
          <p>
            Quan sát kỹ hơn.
            <br />
            Hiểu từ bên trong.
          </p>
        </div>
        <nav aria-label="Điều hướng cuối trang">
          <Link href="/academy/roadmap">Bắt đầu từ số 0</Link>
          <Link href="/challenges">Phòng thực hành</Link>
          <Link href="/knowledge">Nguồn & thuật ngữ</Link>
          <Link href="/explorer?lesson=F01">Bài F01 đã có</Link>
        </nav>
        <p className="footer-scope">
          Personal-preview · Chưa duyệt chuyên môn.
          <br />
          Tiến độ lưu trên thiết bị. Không có XP tài khoản hoặc AI live.
        </p>
        <span className="footer-wordmark" aria-hidden="true">
          MECHVERSE
        </span>
      </footer>
    </div>
  );
}
function PageLoading() {
  return (
    <div className="a-loading" role="status">
      <BookOpen size={25} />
      <p>Đang mở không gian học…</p>
    </div>
  );
}
