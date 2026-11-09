import assert from "node:assert/strict";
import { test } from "node:test";
import type { Server } from "node:http";
import { createApp } from "../src/app.js";

async function request(
  path: string,
  status = "not_configured",
  options?: RequestInit,
) {
  const app = createApp({
    getDatabaseStatus: () => status,
    frontendOrigins: ["http://localhost:5173"],
  });
  const server = await new Promise<Server>((resolve) => {
    const s = app.listen(0, "127.0.0.1", () => resolve(s));
  });
  try {
    const address = server.address();
    assert(address && typeof address !== "string");
    const response = await fetch(
      `http://127.0.0.1:${address.port}${path}`,
      options,
    );
    return {
      status: response.status,
      headers: response.headers,
      body: await response.json(),
    };
  } finally {
    await new Promise<void>((resolve, reject) =>
      server.close((e) => (e ? reject(e) : resolve())),
    );
  }
}
test("API can run without Atlas and reports missing database truthfully", async () => {
  const result = await request("/api/health");
  assert.equal(result.status, 200);
  assert.equal(result.body.service, "mechverse-backend");
  assert.equal(result.body.database.status, "not_configured");
  assert.equal(result.body.database.connected, false);
});
test("readiness is unavailable until database connection is actually ready", async () => {
  for (const state of [
    "not_configured",
    "connecting",
    "disconnected",
    "error",
  ]) {
    const result = await request("/api/ready", state);
    assert.equal(result.status, 503);
    assert.equal(result.body.ready, false);
  }
  const ready = await request("/api/ready", "connected");
  assert.equal(ready.status, 200);
  assert.equal(ready.body.ready, true);
});
test("unknown endpoints return structured 404 and no Express fingerprint", async () => {
  const result = await request("/api/missing");
  assert.equal(result.status, 404);
  assert.equal(result.body.error.code, "NOT_FOUND");
  assert.equal(result.headers.get("x-powered-by"), null);
});
test("only configured frontend origins receive a CORS allow-origin response", async () => {
  const allowed = await request("/api/health", "not_configured", {
    headers: { Origin: "http://localhost:5173" },
  });
  assert.equal(
    allowed.headers.get("access-control-allow-origin"),
    "http://localhost:5173",
  );
  const rejected = await request("/api/health", "not_configured", {
    headers: { Origin: "https://unrelated.example" },
  });
  assert.equal(rejected.headers.get("access-control-allow-origin"), null);
});
