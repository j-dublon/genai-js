import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

test.describe("Home Page Desktop", () => {
  test.use({ viewport: { width: 1280, height: 720 } });
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

  test("should not have any automatically detectable accessibility issues", async ({
    page,
  }) => {
    await page.goto("/");

    const accessibilityScanResults = await new AxeBuilder({ page })
      .withTags([
        "wcag2a",
        "wcag2aa",
        "wcag21a",
        "wcag21aa",
        "wcag22a",
        "wcag22aa",
      ])
      .analyze();

    expect(accessibilityScanResults.violations).toEqual([]);
  });
});

test.describe("Home Page Mobile", () => {
  test.use({ viewport: { width: 412, height: 915 } });
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
