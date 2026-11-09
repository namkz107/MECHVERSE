import { useStore } from "zustand";
import { ArrowRight, Box, Info, Scan, Shapes } from "lucide-react";
import { explorerStore, parts } from "./state";
import { SourceDialog } from "../../components/SourceDialog";
export default function Inspector({ onLearn }: { onLearn: () => void }) {
  const selected = useStore(explorerStore, (s) => s.selected);
  const part = parts.find((p) => p.id === selected);
  return (
    <section className="inspector panel" aria-label="Thông tin bộ phận">
      <div className="panel-heading">
        <h2>{part ? "Bộ phận đang chọn" : "Bắt đầu khám phá"}</h2>
        <Info size={17} />
      </div>
      {part ? (
        <>
          <div className="part-identity">
            <span className="part-symbol">
              <Shapes size={30} />
            </span>
            <span className="badge amber">Đã chọn · Chi tiết</span>
            <h2>{part.name}</h2>
            <span className="english">{part.english}</span>
          </div>
          <p className="readable">{part.description}</p>
          <div className="related">
            <span className="eyebrow">LÀM VIỆC CÙNG NHAU</span>
            <p>{part.relation}</p>
          </div>
          <details className="more">
            <summary>Khám phá thêm</summary>
            <dl>
              <div>
                <dt>Vật liệu kỹ thuật</dt>
                <dd>Chưa xác minh</dd>
              </div>
              <div>
                <dt>Kích thước thực</dt>
                <dd>Chưa xác minh</dd>
              </div>
              <div>
                <dt>Quy trình chế tạo</dt>
                <dd>Chưa xác minh</dd>
              </div>
            </dl>
          </details>
        </>
      ) : (
        <>
          <div className="intro-graphic">
            <Box size={44} />
            <span>01</span>
          </div>
          <h2>
            Một đồ vật quen thuộc.
            <br />
            Nhiều điều để khám phá.
          </h2>
          <p className="readable">
            Chọn một bộ phận để tìm hiểu tên, vai trò và cách nó liên hệ với
            phần còn lại.
          </p>
          <div className="tip">
            <Scan size={19} />
            <p>
              Thử chọn <strong>cánh quạt</strong> trong cây, rồi dùng “Xem
              riêng” để quan sát rõ hơn.
            </p>
          </div>
        </>
      )}
      <SourceDialog />
      <div className="inspector-lesson">
        <span className="eyebrow">HỌC QUA QUAN SÁT</span>
        <h3>Chi tiết hay một cụm?</h3>
        <p>Thử một nhiệm vụ ngắn với chính mô hình này.</p>
        <button className="button primary" onClick={onLearn}>
          Bắt đầu bài demo
          <ArrowRight size={17} />
        </button>
      </div>
    </section>
  );
}
