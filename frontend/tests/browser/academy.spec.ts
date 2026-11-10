import { test, expect } from "@playwright/test";
const F01 = "mechverse:demo:f01";
test("U1 home to C01, draft resume, submit rationale and review while F01 stays unchanged", async ({
  page,
}) => {
  const f01 = JSON.stringify({
    release: "edu-fan-f01-demo-v1",
    stage: "classify",
    found: true,
    answer: "assembly",
  });
  await page.addInitScript(
    ({ key, value }) => {
      if (!localStorage.getItem(key)) localStorage.setItem(key, value);
    },
    { key: F01, value: f01 },
  );
  await page.goto("/");
  await expect(
    page.getByRole("heading", {
      name: "Từ đồ vật quen thuộc, đến tư duy kỹ thuật.",
    }),
  ).toBeVisible();
  await page
    .getByRole("link", { name: "Bắt đầu từ số 0", exact: true })
    .first()
    .click();
  await page
    .getByRole("link")
    .filter({ hasText: "Sản phẩm–cụm–chi tiết" })
    .first()
    .click();
  await expect(
    page.getByRole("heading", {
      name: "Nhìn đồ vật thành một hệ thống",
      exact: true,
    }),
  ).toBeVisible();
  await expect(page.locator(".question-feedback")).toHaveCount(0);
  await page.getByLabel("Một chi tiết vì nó nhỏ", { exact: true }).check();
  await page.getByLabel("Chi tiết theo mô tả đã cho", { exact: true }).check();
  await page
    .getByLabel("Danh sách bộ phận và cấu trúc cụm", { exact: true })
    .check();
  await page
    .getByLabel("Mô tả cấu tạo hoặc giả thiết rõ", { exact: true })
    .check();
  await page
    .getByLabel("Cánh là một chi tiết theo quy ước mô hình này", {
      exact: true,
    })
    .check();
  await page.reload();
  await expect(
    page.getByLabel("Một chi tiết vì nó nhỏ", { exact: true }),
  ).toBeChecked();
  await page
    .getByRole("button", { name: "Nộp bài tự kiểm", exact: true })
    .click();
  await expect(
    page.getByRole("heading", { name: "Đã trả lời đúng 3/4 câu tự chấm" }),
  ).toBeVisible();
  await expect(page.locator(".question-feedback")).toHaveCount(4);
  await page.getByRole("link", { name: "Mở phần ôn tập", exact: true }).click();
  await expect(page.locator(".practice-list article")).toHaveCount(1);
  expect(await page.evaluate((key) => localStorage.getItem(key), F01)).toBe(
    f01,
  );
  await page.goto("/explorer?lesson=F01");
  await expect(page.getByLabel("Một cụm gồm nhiều chi tiết")).toBeChecked();
});
test("catalog search works with Vietnamese without accents and browser back preserves progress", async ({
  page,
}) => {
  await page.goto("/academy");
  await page.getByLabel("Tìm bài học").fill("ban kinh");
  await expect(page.locator(".lesson-card")).toHaveCount(1);
  await page.locator(".lesson-card").click();
  await expect(page.locator("main h1")).toBeFocused();
  await expect(
    page.getByRole("heading", {
      name: "Đọc hình dạng bằng kích thước",
      exact: true,
    }),
  ).toBeVisible();
  await page.getByLabel("Giá trị C04-Q1").fill("30");
  await page.goBack();
  await expect(
    page.getByRole("heading", { name: "Học cách nhìn. Hiểu cách làm." }),
  ).toBeVisible();
  await page.goto("/learn/chieu-dai-ban-kinh-duong-kinh");
  await expect(page.getByLabel("Giá trị C04-Q1")).toHaveValue("30");
});
for (const size of [
  { width: 1440, height: 900 },
  { width: 1024, height: 768 },
  { width: 390, height: 844 },
]) {
  test(`Academy render ${size.width}×${size.height}`, async ({ page }) => {
    await page.setViewportSize(size);
    for (const [path, name] of [
      ["/", "home"],
      ["/academy", "academy"],
      ["/learn/don-vi-va-so-do", "lesson"],
    ]) {
      await page.goto(path);
      await expect(page.locator("main h1").first()).toBeVisible();
      if (path === "/")
        await expect(page.locator(".hero-visual img")).toHaveJSProperty(
          "complete",
          true,
        );
      expect(
        await page.evaluate(
          () => document.documentElement.scrollWidth <= window.innerWidth,
        ),
      ).toBe(true);
      await page.screenshot({
        path: `../docs/qa/u1/${name}-${size.width}.png`,
        fullPage: path !== "/learn/don-vi-va-so-do",
      });
    }
  });
}
