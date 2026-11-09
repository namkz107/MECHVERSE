import { fileURLToPath } from "node:url";
import dotenv from "dotenv";
import { createApp } from "./app.js";
import { loadConfig } from "./config.js";
import { createDatabase } from "./database.js";

// Resolve beside the package, so both src/ and dist/ load backend/.env.
dotenv.config({
  path: fileURLToPath(new URL("../.env", import.meta.url)),
  quiet: true,
});
const config = loadConfig(process.env);
const database = createDatabase(config.mongodbUri, config.mongodbDbName);
const app = createApp({
  getDatabaseStatus: () => database.status(),
  frontendOrigins: config.frontendOrigins,
});
const server = app.listen(config.port, config.host, () => {
  console.info(`[api] MECHVERSE backend: http://${config.host}:${config.port}`);
  console.info("[api] Health: /api/health | Database readiness: /api/ready");
  void database.connect();
});
server.on("error", (error: NodeJS.ErrnoException) => {
  console.error(
    `[api] Không mở được server (${error.code ?? "UNKNOWN"}). Kiểm tra PORT và tiến trình đang dùng cổng.`,
  );
  process.exit(1);
});
let stopping = false;
async function shutdown() {
  if (stopping) return;
  stopping = true;
  const timeout = setTimeout(() => process.exit(1), 8000);
  timeout.unref();
  server.closeIdleConnections();
  try {
    await Promise.all([
      new Promise<void>((resolve, reject) =>
        server.close((error) => (error ? reject(error) : resolve())),
      ),
      database.disconnect(),
    ]);
    clearTimeout(timeout);
    process.exit(0);
  } catch {
    clearTimeout(timeout);
    process.exit(1);
  }
}
process.on("SIGINT", () => void shutdown());
process.on("SIGTERM", () => void shutdown());
