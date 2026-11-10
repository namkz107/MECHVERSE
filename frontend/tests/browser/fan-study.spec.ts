import { test, expect } from "@playwright/test";

test("product study loads the new revision and exposes internals without changing F01 storage", async ({
  page,
}) => {
  const errors: string[] = [];
  page.on("pageerror", (e) => errors.push(e.message));
  await page.goto("/explorer?product=fan");
  await expect(page.getByTestId("model-status")).toHaveText("Mô hình sẵn sàng");
  expect(
    await page.evaluate(() =>
      performance
        .getEntriesByType("resource")
        .some((r) => r.name.includes("fan-study-r2.glb")),
    ),
  ).toBe(true);
  expect(
    await page.evaluate(() =>
      performance
        .getEntriesByType("resource")
        .some((r) => r.name.includes("fan-edu-v1.glb")),
    ),
  ).toBe(false);
  await expect(
    page.getByRole("heading", {
      name: /^Quạt bàn · nghiên cứu cấu tạo.*MV-FN02 \/ R2$/,
    }),
  ).toBeVisible();
  await page
    .getByRole("button", { name: "Tách theo cụm", exact: true })
    .click();
  await expect(page.locator("canvas")).toHaveAttribute("data-explode", "100");
  await page
    .getByRole("button", { name: "Lõi stator minh họa", exact: true })
    .click();
  await expect(page.locator(".industrial-inspector>h2")).toHaveText(
    "Lõi stator minh họa",
  );
  await page.getByRole("button", { name: "Xem riêng", exact: true }).click();
  await page
    .getByRole("button", { name: "CAD · Cạnh hình", exact: true })
    .click();
  await expect(page.locator("canvas")).toHaveAttribute("data-shade", "cad");
  await page
    .getByRole("button", { name: "Đặt lại mô hình", exact: true })
    .click();
  await expect(page.locator("canvas")).toHaveAttribute("data-explode", "0");
  expect(
    await page.evaluate(() => localStorage.getItem("mechverse:demo:f01")),
  ).toBeNull();
  expect(errors).toEqual([]);
});

test("study assembly works at mobile width with its own tree and preview", async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/explorer?product=fan");
  await expect(page.getByTestId("model-status")).toHaveText("Mô hình sẵn sàng");
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= innerWidth,
    ),
  ).toBe(true);
  await page.getByRole("tab", { name: "Cấu tạo", exact: true }).click();
  await page
    .getByRole("button", { name: "Cụm cuộn dây minh họa", exact: true })
    .click();
  await page.getByRole("tab", { name: "Thông tin", exact: true }).click();
  await expect(page.locator(".industrial-inspector>h2")).toHaveText(
    "Cụm cuộn dây minh họa",
  );
});
