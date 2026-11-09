export function loadConfig(env: NodeJS.ProcessEnv) {
  const port = Number(env.PORT ?? 3001);
  if (!Number.isInteger(port) || port < 1 || port > 65535)
    throw new Error("PORT phải là số nguyên từ 1 đến 65535.");
  const mongodbUri = env.MONGODB_URI?.trim() ?? "";
  if (mongodbUri && !/^mongodb(?:\+srv)?:\/\//.test(mongodbUri))
    throw new Error(
      "MONGODB_URI phải dùng giao thức mongodb:// hoặc mongodb+srv://.",
    );
  const frontendOrigins = (
    env.FRONTEND_ORIGIN ?? "http://localhost:5173,http://127.0.0.1:5173"
  )
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);
  for (const origin of frontendOrigins) {
    try {
      const url = new URL(origin);
      if (
        !["http:", "https:"].includes(url.protocol) ||
        url.username ||
        url.password ||
        url.origin !== origin
      )
        throw new Error();
    } catch {
      throw new Error(
        "FRONTEND_ORIGIN phải là các origin HTTP/HTTPS, ngăn cách bằng dấu phẩy.",
      );
    }
  }
  return {
    port,
    host: env.HOST?.trim() || "127.0.0.1",
    mongodbUri,
    mongodbDbName: env.MONGODB_DB_NAME?.trim() || "mechverse",
    frontendOrigins,
  };
}
