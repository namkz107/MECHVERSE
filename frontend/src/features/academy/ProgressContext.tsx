import {
  createContext,
  useCallback,
  useContext,
  useState,
  type ReactNode,
} from "react";
import { LocalProgressRepository, type Progress } from "./progress";
const repository = new LocalProgressRepository({
  getItem: (key) => window.localStorage.getItem(key),
  setItem: (key, value) => window.localStorage.setItem(key, value),
});
type Value = {
  progress: Progress;
  saved: boolean;
  loadStatus: string;
  update: (fn: (p: Progress) => Progress) => void;
  importData: (raw: string) => boolean;
  exportData: () => string;
  retrySave: () => void;
};
const Context = createContext<Value | null>(null);
export function ProgressProvider({ children }: { children: ReactNode }) {
  const [loaded] = useState(() => repository.load());
  const [progress, setProgress] = useState(loaded.progress);
  const [saved, setSaved] = useState(
    !["unavailable", "invalid"].includes(loaded.status),
  );
  const update = useCallback(
    (fn: (p: Progress) => Progress) =>
      setProgress((current) => {
        const next = fn(current);
        if (next !== current) setSaved(repository.save(next));
        return next;
      }),
    [],
  );
  return (
    <Context.Provider
      value={{
        progress,
        saved,
        loadStatus: loaded.status,
        update,
        importData: (raw) => {
          const ok = repository.importData(raw);
          if (ok) {
            setProgress(repository.load().progress);
            setSaved(true);
          }
          return ok;
        },
        exportData: () => repository.exportData(progress),
        retrySave: () => setSaved(repository.save(progress)),
      }}
    >
      {children}
    </Context.Provider>
  );
}
export function useProgress() {
  const value = useContext(Context);
  if (!value) throw new Error("ProgressProvider missing");
  return value;
}
export function SaveStatus() {
  const { saved, retrySave, loadStatus } = useProgress();
  return (
    <div className={`academy-save ${saved ? "" : "save-error"}`} role="status">
      {saved
        ? "Lưu trên thiết bị này · Bản học thử"
        : "Chưa lưu được. Bài làm vẫn trong phiên này."}
      {!saved && (
        <button className="a-text-button" onClick={retrySave}>
          Thử lưu lại
        </button>
      )}
      {loadStatus === "invalid" && (
        <span>
          Dữ liệu cũ không đọc được; giữ bản sao trước khi ghi bản mới.
        </span>
      )}
    </div>
  );
}
