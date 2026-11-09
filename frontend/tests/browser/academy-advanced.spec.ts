import { test, expect } from "@playwright/test";

test("orthographic alternatives preserve one scale across width, depth and height", async ({
  page,
}) => {
  await page.goto("/learn/vat-the-va-hinh-chieu#activity");
  const paths = page.locator(".activity-projection-options svg path");
  await expect(paths).toHaveCount(3);
  const [front, top, right] = await paths.evaluateAll((nodes) =>
    nodes.map((node) => {
      const b = (node as SVGGraphicsElement).getBBox();
      return { width: b.width, height: b.height };
    }),
  );
  expect(front.width).toBe(top.width);
  expect(right.width).toBe(top.height);
  expect(right.height).toBe(front.height);
});

test("four activities give real feedback, retry variants and torque zero/right-angle results", async ({
  page,
}) => {
  await page.goto("/learn/chuc-nang-va-lien-ket#activity");
  let activity = page.locator(".learning-activity");
  await activity.getByRole("button", { name: "Kiểm tra các cặp" }).click();
  await expect(activity.locator(".activity-feedback")).toContainText(
    "Chưa ghép đủ",
  );
  await activity.getByRole("combobox").nth(0).selectOption("air");
  await activity.getByRole("combobox").nth(1).selectOption("rotation");
  await activity.getByRole("combobox").nth(2).selectOption("support");
  await activity.getByRole("button", { name: "Kiểm tra các cặp" }).click();
  await expect(activity.locator(".activity-feedback")).toHaveClass(
    /is-correct/,
  );
  await page.goto("/learn/don-vi-va-so-do#activity");
  activity = page.locator(".learning-activity");
  await activity.getByLabel("Giá trị", { exact: true }).fill("0,125");
  await activity.getByRole("combobox").selectOption("N");
  await activity.getByRole("button", { name: "Kiểm tra kết quả" }).click();
  await expect(activity.locator(".activity-feedback")).not.toHaveClass(
    /is-correct/,
  );
  await activity.getByRole("combobox").selectOption("m");
  await activity.getByRole("button", { name: "Kiểm tra kết quả" }).click();
  await expect(activity.locator(".activity-feedback")).toHaveClass(
    /is-correct/,
  );
  await activity.getByRole("button", { name: "Đổi đề" }).click();
  await expect(activity.getByLabel("Giá trị", { exact: true })).toHaveValue("");
  await expect(activity).toContainText("0,008 m");
  await page.goto("/learn/mo-men-va-canh-tay-don#activity");
  activity = page.locator(".learning-activity");
  await activity.getByRole("button", { name: "Góc 0°", exact: true }).click();
  await expect(activity.locator("output")).toHaveText("τ = 0 N·m");
  await activity.getByRole("button", { name: "Góc 90°", exact: true }).click();
  await expect(activity.locator("output")).toHaveText("τ = 6 N·m");
  await activity.getByLabel(/Lực F/).fill("0");
  await expect(activity.locator("output")).toHaveText("τ = 0 N·m");
  await activity.getByRole("button", { name: "Đặt lại phòng thử" }).click();
  await activity.getByLabel("Gấp đôi, với 0 vẫn là 0").check();
  await activity.getByRole("button", { name: "Kiểm tra dự đoán" }).click();
  await expect(activity.locator(".activity-feedback")).toHaveClass(
    /is-correct/,
  );
  await page.goto("/learn/vat-the-va-hinh-chieu#activity");
  activity = page.locator(".learning-activity");
  await activity.getByLabel(/Hình A/).check();
  await activity.getByRole("button", { name: "Kiểm tra hình chiếu" }).click();
  await expect(activity.locator(".activity-feedback")).toContainText(
    "Chưa đúng",
  );
  await activity.getByLabel(/Hình B/).check();
  await activity.getByRole("button", { name: "Kiểm tra hình chiếu" }).click();
  await expect(activity.locator(".activity-feedback")).toHaveClass(
    /is-correct/,
  );
  await page.goto("/challenges");
  await page.locator(".activity-theory-link").click();
  await expect(page).toHaveURL(/\/learn\/chuc-nang-va-lien-ket#theory$/);
});

test("a failed Academy route chunk offers recovery without a blank app", async ({
  page,
}) => {
  await page.route(
    /(?:\/src\/features\/academy\/LessonWorkspace\.tsx|\/assets\/LessonWorkspace-[^/]+\.js)(?:\?|$)/,
    (route) => route.abort(),
  );
  await page.goto("/learn/don-vi-va-so-do");
  await expect(
    page.getByRole("heading", { name: "Chưa mở được không gian này." }),
  ).toBeVisible();
  await expect(
    page.getByRole("button", { name: "Tải lại trang" }),
  ).toBeVisible();
});

test("advanced numeric drafts resume, grades respect tight tolerances and imports protect current data", async ({
  page,
}) => {
  await page.goto("/learn/dung-sai-va-tu-duy-lap#quiz");
  await page.getByLabel("Giá trị C12-Q1").fill("24,8");
  await page.getByLabel("Giá trị C12-Q3").fill("0,04");
  await page.reload();
  await expect(page.getByLabel("Giá trị C12-Q1")).toHaveValue("24,8");
  await page
    .getByRole("button", { name: "Nộp bài tự kiểm", exact: true })
    .click();
  await expect(page.locator(".a-question").nth(0)).toHaveClass(/is-correct/);
  await expect(page.locator(".a-question").nth(2)).toHaveClass(/is-review/);
  await page.goto("/dashboard");
  const before = await page.evaluate(() =>
    localStorage.getItem("mechverse:academy:progress"),
  );
  await page
    .getByLabel("Nhập tiến độ Academy")
    .setInputFiles({
      name: "invalid.json",
      mimeType: "application/json",
      buffer: Buffer.from('{"version":1,"sessions":{},"archives":[{}]}'),
    });
  await expect(
    page.getByRole("status").filter({ hasText: "Không nhập được" }),
  ).toBeVisible();
  expect(
    await page.evaluate(() =>
      localStorage.getItem("mechverse:academy:progress"),
    ),
  ).toBe(before);
  const download = page.waitForEvent("download");
  await page.getByRole("button", { name: "Xuất tiến độ Academy" }).click();
  expect((await download).suggestedFilename()).toBe(
    "mechverse-academy-progress.json",
  );
  await page
    .getByLabel("Nhập tiến độ Academy")
    .setInputFiles({
      name: "valid.json",
      mimeType: "application/json",
      buffer: Buffer.from(before!),
    });
  await expect(
    page.getByRole("status").filter({ hasText: "Đã nhập Academy" }),
  ).toBeVisible();
  expect(
    await page.evaluate(() =>
      localStorage.getItem("mechverse:academy:progress:backup"),
    ),
  ).toBe(before);
});

test("storage denied keeps answers in this session and exposes retry instead of claiming saved", async ({
  page,
}) => {
  await page.addInitScript(() => {
    Storage.prototype.setItem = () => {
      throw new DOMException("Blocked", "SecurityError");
    };
  });
  await page.goto("/learn/don-vi-va-so-do#quiz");
  await page.getByLabel("Giá trị C03-Q2").fill("0,008");
  await expect(
    page.getByRole("status").filter({ hasText: "Chưa lưu được" }),
  ).toBeVisible();
  await page.getByRole("button", { name: "Thử lưu lại" }).click();
  await expect(page.getByLabel("Giá trị C03-Q2")).toHaveValue("0,008");
  await page
    .getByRole("button", { name: "Nộp bài tự kiểm", exact: true })
    .click();
  await expect(page.locator(".a-question").nth(1)).toHaveClass(/is-correct/);
});

test("wrong answers remain in practice while a retry draft is in progress", async ({
  page,
}) => {
  await page.goto("/learn/san-pham-cum-va-chi-tiet#quiz");
  await page
    .getByRole("button", { name: "Nộp bài tự kiểm", exact: true })
    .click();
  await page
    .getByRole("button", { name: "Luyện lại bài này", exact: true })
    .click();
  await page.goto("/practice");
  await expect(page.locator(".practice-list article")).toHaveCount(4);
  await page.reload();
  await expect(page.locator(".practice-list article")).toHaveCount(4);
});

test("malformed lesson encodings render a usable missing-lesson screen", async ({
  page,
}) => {
  await page.goto("/academy");
  for (const path of ["/learn/%", "/learn/%E0%A4"]) {
    await page.evaluate((url) => {
      history.pushState({}, "", url);
      window.dispatchEvent(new PopStateEvent("popstate"));
    }, path);
    await expect(
      page.getByRole("heading", { name: "Không tìm thấy bài học" }),
    ).toBeVisible();
    await expect(
      page.getByRole("link", { name: "Quay lại Academy" }),
    ).toBeVisible();
  }
});
