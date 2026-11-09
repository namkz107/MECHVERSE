import { useState } from "react";
import { useStore } from "zustand";
import {
  Check,
  ChevronDown,
  Eye,
  EyeOff,
  Layers3,
  Search,
  Shapes,
} from "lucide-react";
import { explorerStore, parts } from "./state";
export default function PartTree() {
  const state = useStore(explorerStore);
  const [query, setQuery] = useState("");
  return (
    <section className="part-tree panel" aria-label="Cây cấu tạo">
      <div className="panel-heading">
        <h2>Cấu tạo</h2>
        <span className="count">08</span>
      </div>
      <label className="search">
        <Search size={16} />
        <input
          aria-label="Tìm bộ phận"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Tìm bộ phận…"
        />
      </label>
      <div className="tree-root">
        <Layers3 size={17} />
        <strong>Quạt giáo dục</strong>
      </div>
      <div className="tree-list">
        {[
          { id: "head", name: "Cụm đầu quạt" },
          { id: "support", name: "Cụm giá đỡ" },
        ].map((group) => (
          <details key={group.id} open>
            <summary>
              <ChevronDown size={14} />
              <span>{group.name}</span>
              <span className="count">
                {parts.filter((p) => p.group === group.id).length}
              </span>
            </summary>
            {parts
              .filter(
                (p) =>
                  p.group === group.id &&
                  `${p.name} ${p.english}`
                    .toLocaleLowerCase("vi")
                    .includes(query.toLocaleLowerCase("vi")),
              )
              .map((p) => (
                <div
                  className={`tree-row ${state.selected === p.id ? "selected" : ""}`}
                  key={p.id}
                >
                  <button
                    className="tree-select"
                    aria-pressed={state.selected === p.id}
                    onClick={() => state.select(p.id)}
                  >
                    <Shapes size={15} />
                    <span>{p.name}</span>
                    {state.selected === p.id && <Check size={14} />}
                  </button>
                  <button
                    className="tree-eye"
                    aria-label={`${state.hidden.includes(p.id) ? "Hiện" : "Ẩn"} ${p.name.toLocaleLowerCase("vi")}`}
                    title={`${state.hidden.includes(p.id) ? "Hiện" : "Ẩn"} bộ phận`}
                    onClick={() => state.toggleHidden(p.id)}
                  >
                    {state.hidden.includes(p.id) ? (
                      <EyeOff size={15} />
                    ) : (
                      <Eye size={15} />
                    )}
                  </button>
                </div>
              ))}
          </details>
        ))}
      </div>
      {query &&
        !parts.some((p) =>
          `${p.name} ${p.english}`
            .toLocaleLowerCase("vi")
            .includes(query.toLocaleLowerCase("vi")),
        ) && <p className="empty">Không tìm thấy bộ phận. Thử tên khác.</p>}
      <div className="tree-note">
        <span className="tiny-dot" />8 bộ phận · Hình học giản lược
        <p>Chọn từ cây hoặc chạm vào mô hình để khám phá.</p>
      </div>
    </section>
  );
}
