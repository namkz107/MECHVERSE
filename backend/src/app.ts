import express, { type ErrorRequestHandler } from "express";
import cors from "cors";
export type AppOptions = {
  getDatabaseStatus: () => string;
  frontendOrigins: string[];
};
export function createApp(options: AppOptions) {
  const app = express();
  app.disable("x-powered-by");
  app.use(
    cors({
      origin: (origin, callback) =>
        callback(null, !origin || options.frontendOrigins.includes(origin)),
    }),
  );
  app.use(express.json({ limit: "32kb" }));
  app.get("/", (_req, res) =>
    res.json({
      service: "mechverse-backend",
      health: "/api/health",
      readiness: "/api/ready",
    }),
  );
  app.get("/api/health", (_req, res) => {
    const status = options.getDatabaseStatus();
    res.setHeader("Cache-Control", "no-store");
    res.json({
      service: "mechverse-backend",
      status: "ok",
      database: { status, connected: status === "connected" },
    });
  });
  app.get("/api/ready", (_req, res) => {
    const status = options.getDatabaseStatus();
    const ready = status === "connected";
    res.setHeader("Cache-Control", "no-store");
    res
      .status(ready ? 200 : 503)
      .json({ ready, database: { status, connected: ready } });
  });
  app.use((_req, res) =>
    res
      .status(404)
      .json({
        error: { code: "NOT_FOUND", message: "Endpoint không tồn tại." },
      }),
  );
  const onError: ErrorRequestHandler = (error, _req, res, _next) => {
    const malformed =
      error instanceof SyntaxError && "status" in error && error.status === 400;
    const tooLarge = "status" in error && error.status === 413;
    res
      .status(malformed ? 400 : tooLarge ? 413 : 500)
      .json({
        error: {
          code: malformed
            ? "INVALID_JSON"
            : tooLarge
              ? "PAYLOAD_TOO_LARGE"
              : "INTERNAL_ERROR",
          message: malformed
            ? "JSON không hợp lệ."
            : tooLarge
              ? "Dữ liệu vượt giới hạn."
              : "Không xử lý được yêu cầu.",
        },
      });
  };
  app.use(onError);
  return app;
}
