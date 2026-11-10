export default function BeginnerDiagram({ id }: { id: string }) {
  const geometric = id.startsWith("M02");
  return (
    <figure className="beginner-diagram">
      <svg
        viewBox="0 0 500 200"
        role="img"
        aria-label={
          geometric
            ? "Sơ đồ hình học và phép đo giả định"
            : "Chu trình từ nhu cầu đến thử và cải tiến"
        }
      >
        {id === "M02-L04" ? (
          <>
            <path
              d="M130 45V155H290"
              fill="none"
              stroke="currentColor"
              strokeWidth="3"
            />
            <path d="M130 130H155V155" fill="none" stroke="currentColor" />
            <path d="M130 155L240 65" stroke="#916343" strokeWidth="3" />
            <text x="165" y="110">
              90° chia thành hai góc
            </text>
            <text x="130" y="185">
              Tổng hai góc = 90°
            </text>
          </>
        ) : id === "M02-L06" ? (
          <>
            <path d="M40 135H460" stroke="currentColor" strokeWidth="2" />
            {Array.from({ length: 7 }, (_, i) => (
              <g key={i}>
                <path d={`M${40 + i * 60} 135v15`} stroke="currentColor" />
                <text x={30 + i * 60} y="177">
                  {i * 10}
                </text>
              </g>
            ))}
            <path d="M112 90H382" stroke="#64805c" strokeWidth="14" />
            <text x="92" y="65">
              12 mm
            </text>
            <text x="350" y="65">
              57 mm
            </text>
            <path
              d="M112 105V135M382 105V135"
              stroke="currentColor"
              strokeDasharray="4 4"
            />
          </>
        ) : geometric ? (
          <>
            <path
              d="M110 90H310V140H110ZM110 90L170 50H370V100L310 140M310 90L370 50"
              fill="#e3e9da"
              stroke="currentColor"
              strokeWidth="2"
            />
            <text x="170" y="175">
              X: 80 mm
            </text>
            <text x="370" y="80">
              Y: 40
            </text>
            <text x="315" y="125">
              Z: 6
            </text>
          </>
        ) : (
          <>
            {["Nhu cầu", "Phương án", "Tạo mẫu", "Kiểm / sửa"].map((t, i) => (
              <g key={t}>
                <rect
                  x={10 + i * 123}
                  y="65"
                  width="110"
                  height="65"
                  rx="8"
                  fill={i === 3 ? "#c5d59c" : "#e8eddf"}
                  stroke="currentColor"
                />
                <text x={65 + i * 123} y="103" textAnchor="middle">
                  {t}
                </text>
                {i < 3 && (
                  <path d={`M${120 + i * 123} 97h13`} stroke="currentColor" />
                )}
              </g>
            ))}
            <path
              d="M435 135v30H190v-25"
              fill="none"
              stroke="currentColor"
              strokeDasharray="5 4"
            />
          </>
        )}
      </svg>
      <figcaption>
        {geometric
          ? "Hình tự dựng · Số liệu bài tập giả định, không phải kích thước quạt."
          : "Sơ đồ tự dựng · Có thể quay lại sửa sau khi kiểm; không là quy trình vận hành máy."}
      </figcaption>
    </figure>
  );
}
