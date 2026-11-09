import mongoose from "mongoose";
export type DatabaseStatus =
  "not_configured" | "connecting" | "connected" | "disconnected" | "error";
export function createDatabase(uri: string, dbName: string) {
  let failed = false;
  mongoose.set("bufferCommands", false);
  mongoose.connection.on("error", () => {
    failed = true;
  });
  return {
    status(): DatabaseStatus {
      if (!uri) return "not_configured";
      if (mongoose.connection.readyState === 1) return "connected";
      if (mongoose.connection.readyState === 2) return "connecting";
      return failed ? "error" : "disconnected";
    },
    async connect() {
      if (!uri) {
        console.info(
          "[database] Chưa cấu hình MONGODB_URI. API chạy không có database.",
        );
        return;
      }
      try {
        await mongoose.connect(uri, {
          dbName,
          serverSelectionTimeoutMS: 5000,
          autoCreate: false,
          autoIndex: false,
        });
        failed = false;
        console.info("[database] MongoDB đã kết nối.");
      } catch {
        failed = true;
        console.error(
          "[database] Kết nối MongoDB thất bại. Kiểm tra URI, tài khoản và network access trong Atlas; URI và mật khẩu không được ghi log.",
        );
      }
    },
    async disconnect() {
      await mongoose.disconnect();
    },
  };
}
