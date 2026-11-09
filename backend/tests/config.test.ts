import assert from "node:assert/strict";
import { test } from "node:test";
import { loadConfig } from "../src/config.js";
test("default configuration starts locally without inventing a MongoDB URI", () => {
  const config = loadConfig({});
  assert.equal(config.port, 3001);
  assert.equal(config.host, "127.0.0.1");
  assert.equal(config.mongodbUri, "");
  assert(config.frontendOrigins.includes("http://localhost:5173"));
  assert(config.frontendOrigins.includes("http://127.0.0.1:5173"));
});
test("invalid ports and non-MongoDB URIs are rejected without disclosing credentials", () => {
  for (const port of ["0", "65536", "3001.5", "NaN"])
    assert.throws(() => loadConfig({ PORT: port }));
  assert.throws(
    () => loadConfig({ MONGODB_URI: "https://user:secret@some-host" }),
    (e) => {
      assert(e instanceof Error);
      assert(!e.message.includes("secret"));
      return true;
    },
  );
  assert.equal(
    loadConfig({
      MONGODB_URI: "mongodb+srv://user:secret@cluster.example/mechverse",
    }).mongodbUri,
    "mongodb+srv://user:secret@cluster.example/mechverse",
  );
});
