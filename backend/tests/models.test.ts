import assert from "node:assert/strict";
import { test } from "node:test";
import { ProductVariant } from "../src/models/ProductVariant.js";
import { AssetRevision } from "../src/models/AssetRevision.js";
import { LessonRevision } from "../src/models/LessonRevision.js";
test("product variants default to educational demo and reject missing identity", async () => {
  await assert.rejects(new ProductVariant({}).validate());
  const product = new ProductVariant({
    code: "EDU-FAN-01",
    name: "Quạt giáo dục",
  });
  await product.validate();
  assert.equal(product.status, "educational-demo");
});
test("asset revisions require unique occurrence IDs and a positive integer revision", async () => {
  const base = {
    assetId: "edu-fan",
    productCode: "EDU-FAN-01",
    revision: 1,
    geometryPath: "/models/fan-edu-v1.glb",
    occurrenceIds: ["blade", "cap"],
  };
  await new AssetRevision(base).validate();
  await assert.rejects(new AssetRevision({ ...base, revision: 0 }).validate());
  await assert.rejects(
    new AssetRevision({ ...base, revision: 1.5 }).validate(),
  );
  await assert.rejects(
    new AssetRevision({
      ...base,
      occurrenceIds: ["blade", "blade"],
    }).validate(),
  );
});
test("lesson revisions never default to reviewed and require release and objective", async () => {
  await assert.rejects(new LessonRevision({ code: "F01" }).validate());
  const lesson = new LessonRevision({
    code: "F01",
    releaseId: "edu-fan-f01-demo-v1",
    revision: 1,
    title: "Chi tiết và cụm",
    objective: "Phân biệt chi tiết với cụm",
  });
  await lesson.validate();
  assert.equal(lesson.status, "draft-demo");
});
