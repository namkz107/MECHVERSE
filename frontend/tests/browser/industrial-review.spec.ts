import { test, expect } from "@playwright/test";
test("paused rotor pose survives selection, shading and camera preset until explicit reset", async ({
  page,
}) => {
  await page.goto("/explorer?product=fan");
  await expect(page.getByTestId("model-status")).toHaveText("Mô hình sẵn sàng");
  const canvas = page.locator("canvas"),
    angle = async () => Number(await canvas.getAttribute("data-rotor-angle"));
  await page.getByRole("button", { name: "Quay cánh", exact: true }).click();
  await expect.poll(async () => Math.abs(await angle())).toBeGreaterThan(0.1);
  await page.getByRole("button", { name: "Dừng quay", exact: true }).click();
  await page.waitForTimeout(100);
  const paused = await angle();
  await page.getByRole("button", { name: "Cánh quạt", exact: true }).click();
  await page
    .getByRole("button", { name: "CAD · Cạnh hình", exact: true })
    .click();
  await page.getByRole("button", { name: "Front", exact: true }).click();
  await expect.poll(angle).toBeCloseTo(paused, 5);
  await page
    .getByRole("button", { name: "Đặt lại mô hình", exact: true })
    .click();
  await expect.poll(angle).toBe(0);
});
test("selected handle callout follows its door hinge without needing a second UI change", async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/explorer?product=locker");
  await expect(page.getByTestId("model-status")).toHaveText("Mô hình sẵn sàng");
  await page
    .getByRole("button", { name: "Tay nắm cửa trên", exact: true })
    .click();
  await page.getByRole("button", { name: "Nhãn", exact: true }).click();
  await page.waitForTimeout(700);
  const label = page.locator(".scene-callout"),
    before = (await label.boundingBox())!;
  await page.getByLabel("Góc cửa trên", { exact: true }).fill("90");
  await expect
    .poll(async () => Math.abs((await label.boundingBox())!.x - before.x))
    .toBeGreaterThan(20);
});
