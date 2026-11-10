import { test, expect } from "@playwright/test";
test("beginner roadmap to real lesson, feedback and reload retains work", async ({
  page,
}) => {
  await page.goto("/academy/roadmap");
  await expect(
    page.getByRole("heading", { name: "Từ số 0 đến thiết kế cơ khí." }),
  ).toBeVisible();
  await expect(page.locator('[data-module="M01"] li')).toHaveCount(6);
  await expect(
    page.locator('[data-module="M16"] a[href^="/learn/"]'),
  ).toHaveCount(0);
  await page
    .getByRole("button", { name: "Bắt đầu từ số 0", exact: true })
    .click();
  await expect(page.locator("main h1")).toHaveText(
    "Cơ khí bắt đầu từ đồ vật quanh bạn",
  );
  await page
    .getByLabel("Làm rõ điện thoại, nơi dùng và việc giá cần đáp ứng", {
      exact: true,
    })
    .check();
  await page
    .getByLabel("Nắp đang che vùng đầu bút; chưa biết kiểu ghép bên trong", {
      exact: true,
    })
    .check();
  await page
    .getByLabel("Có biểu diễn hình học; vẫn cần kiểm theo yêu cầu", {
      exact: true,
    })
    .check();
  await page
    .getByLabel("Bài thực hành của bạn")
    .fill("Hộp dùng chứa bút; nắp che miệng hộp, chưa biết kiểu ghép.");
  await page.getByRole("button", { name: "Flashcards", exact: true }).click();
  await expect(
    page.getByRole("button", { name: "Tự nhớ xong, lật thẻ" }),
  ).toBeVisible();
  await expect(page.locator(".flashcard-answer")).toHaveCount(0);
  await page.getByRole("button", { name: "Tự nhớ xong, lật thẻ" }).click();
  await page
    .getByRole("button", { name: "Đã nhớ độc lập", exact: true })
    .click();
  await page.getByRole("button", { name: "Luyện quiz", exact: true }).click();
  await expect(
    page.getByLabel("Làm rõ điện thoại, nơi dùng và việc giá cần đáp ứng", {
      exact: true,
    }),
  ).toBeChecked();
  await page.reload();
  await expect(
    page.getByRole("button", { name: "Luyện quiz", exact: true }),
  ).toHaveAttribute("aria-pressed", "true");
  await page
    .getByRole("button", { name: "Nộp bài tự kiểm", exact: true })
    .click();
  await expect(
    page.getByRole("heading", { name: "Đã trả lời đúng 3/3 câu tự chấm" }),
  ).toBeVisible();
  await page.reload();
  await expect(page.locator(".question-feedback")).toHaveCount(3);
  await expect(page.getByLabel("Bài thực hành của bạn")).toHaveValue(
    "Hộp dùng chứa bút; nắp che miệng hộp, chưa biết kiểu ghép.",
  );
  await expect(
    page.getByText("Chưa review · Bài tự ghi", { exact: true }),
  ).toBeVisible();
  const p = await page.evaluate(() =>
    JSON.parse(localStorage.getItem("mechverse:academy:progress")!),
  );
  expect(p.sessions["M01-L01"].attempts).toHaveLength(1);
  expect(p.learning.events).toHaveLength(1);
  await page.getByRole("link", { name: "Bài tiếp: M01-L02" }).click();
  await expect(page.locator("main h1")).toHaveText(
    "Nhìn đồ vật thành một hệ thống",
  );
});
test("C alias, shared 3D return, old F01 and sources remain intact", async ({
  page,
}) => {
  const raw = JSON.stringify({
    release: "edu-fan-f01-demo-v1",
    stage: "classify",
    found: true,
    answer: "assembly",
  });
  await page.goto("/");
  await page.evaluate(
    (v) => localStorage.setItem("mechverse:demo:f01", v),
    raw,
  );
  await page.goto("/learn/M01-L02");
  await page.getByLabel("Một chi tiết vì nó nhỏ", { exact: true }).check();
  await page.getByRole("button", { name: "Khám phá 3D", exact: true }).click();
  await expect(
    page.getByRole("link", { name: "Trở lại bài đang học", exact: true }),
  ).toBeVisible();
  await page
    .getByRole("link", { name: "Trở lại bài đang học", exact: true })
    .click();
  await page.getByRole("button", { name: "Luyện quiz", exact: true }).click();
  await expect(
    page.getByLabel("Một chi tiết vì nó nhỏ", { exact: true }),
  ).toBeChecked();
  expect(
    await page.evaluate(() => localStorage.getItem("mechverse:demo:f01")),
  ).toBe(raw);
  await expect(page.locator("#sources")).toContainText("Chưa duyệt chuyên môn");
});
test("mini lab inputs and latest resume persist across modes and reload", async ({
  page,
}) => {
  await page.goto("/learn/M02-L01");
  await page.getByRole("button", { name: "Mini lab", exact: true }).click();
  await page
    .locator("#activity")
    .getByLabel("Giá trị", { exact: true })
    .fill("17,5");
  await page
    .locator("#activity")
    .getByRole("combobox", { name: "Đơn vị", exact: true })
    .selectOption("m");
  await page.getByRole("button", { name: "Flashcards", exact: true }).click();
  await page.reload();
  await page.getByRole("button", { name: "Mini lab", exact: true }).click();
  await expect(
    page.locator("#activity").getByLabel("Giá trị", { exact: true }),
  ).toHaveValue("17,5");
  await expect(
    page
      .locator("#activity")
      .getByRole("combobox", { name: "Đơn vị", exact: true }),
  ).toHaveValue("m");
  await page
    .getByRole("link", { name: "Đọc lại lý thuyết ↑", exact: true })
    .click();
  await expect(page.locator("#theory")).toBeVisible();
  await page.goto("/learn/M01-L01");
  await page.goto("/learn/M02-L01");
  await page.goto("/dashboard");
  await expect(page.locator(".study-continue h2")).toHaveText(
    "Một con số luôn cần đơn vị",
  );
});
test("wrong-answer review opens quiz even after the learner switches to cards", async ({
  page,
}) => {
  await page.goto("/learn/M01-L02");
  await page
    .getByRole("button", { name: "Nộp bài tự kiểm", exact: true })
    .click();
  await page.getByRole("button", { name: "Flashcards", exact: true }).click();
  await page.goto("/practice");
  await page.getByRole("link", { name: "Ôn C01", exact: true }).first().click();
  await expect(page.locator("#quiz")).toBeVisible();
  await expect(page.locator(".question-feedback").first()).toBeVisible();
});
test("explicit mode survives reload after entering through a quiz anchor", async ({
  page,
}) => {
  await page.goto("/learn/M02-L01#quiz");
  await page.getByRole("button", { name: "Flashcards", exact: true }).click();
  await page.reload();
  await expect(
    page.getByRole("button", { name: "Flashcards", exact: true }),
  ).toHaveAttribute("aria-pressed", "true");
  await expect(page.locator(".flashcard-panel")).toBeVisible();
});
test("invalid matching import preserves current work and the lesson remains usable", async ({
  page,
}) => {
  const errors: string[] = [];
  page.on("pageerror", (error) => errors.push(error.message));
  await page.goto("/learn/M01-L03");
  await page.getByRole("button", { name: "Mini lab", exact: true }).click();
  await page.locator("#activity select").first().selectOption("air");
  const before = await page.evaluate(() =>
    localStorage.getItem("mechverse:academy:progress")!,
  );
  const invalid = JSON.parse(before);
  invalid.learning.activities.C02.values.answer = null;
  await page.goto("/dashboard");
  await page.getByLabel("Nhập tiến độ Academy").setInputFiles({
    name: "invalid-matching.json",
    mimeType: "application/json",
    buffer: Buffer.from(JSON.stringify(invalid)),
  });
  await expect(
    page.getByText(
      "Không nhập được: file sai phiên bản/cấu trúc hoặc bộ nhớ đang bị chặn.",
      { exact: true },
    ),
  ).toBeVisible();
  expect(
    await page.evaluate(() =>
      localStorage.getItem("mechverse:academy:progress"),
    ),
  ).toBe(before);
  await page.goto("/learn/M01-L03");
  await page.reload();
  await expect(page.locator("#activity select").first()).toHaveValue("air");
  expect(errors).toEqual([]);
});
for (const width of [1440, 1024, 390])
  test(`roadmap and modes responsive ${width}`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 });
    for (const url of ["/academy/roadmap", "/learn/M02-L06"]) {
      await page.goto(url);
      await expect(page.locator("main h1")).toBeVisible();
      expect(
        await page.evaluate(
          () => document.documentElement.scrollWidth <= innerWidth,
        ),
      ).toBe(true);
      await page.screenshot({
        path: `../docs/qa/curriculum/${url.includes("roadmap") ? "roadmap" : "measurement"}-${width}.png`,
        fullPage: false,
      });
    }
    await page.getByRole("button", { name: "Flashcards", exact: true }).click();
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= innerWidth,
      ),
    ).toBe(true);
    await page.screenshot({ path: `../docs/qa/curriculum/cards-${width}.png` });
  });
