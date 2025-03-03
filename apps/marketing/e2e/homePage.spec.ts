import { test, expect } from "@playwright/test";

test.describe("Home Page", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
    await page.waitForLoadState("networkidle");
  });

  test("should display main components of the home page", async ({ page }) => {
    await expect(page.locator("nav")).toBeVisible();
  });

  test("hero banner has working call-to-action button", async ({ page }) => {
    const heroBanner = page.locator("header, section").first();
    await expect(heroBanner).toBeVisible();

    const ctaButton = heroBanner.locator("a, button").first();
    await expect(ctaButton).toBeVisible();
  });
});
