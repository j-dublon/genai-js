import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
import {
  acceptCookies,
  mockTrustpilotReviews,
  mockTrustpilotScore,
} from "../helpers";

test.describe("Homepage Accessibility", () => {
  test.beforeEach(async ({ page, context }) => {
    await context.clearCookies();
    await context.clearPermissions();
    await mockTrustpilotReviews(page);
    await mockTrustpilotScore(page);
    await acceptCookies(page);
    await page.goto("/");
    await page.getByTestId("hero-banner").locator("video").waitFor();
  });

  test("should not have any automatically detectable accessibility issues", async ({
    page,
    browserName,
  }) => {
    // Skip accessibility testing for Firefox
    test.skip(
      browserName === "firefox",
      "Accessibility testing is skipped in Firefox",
    );

    // Wait for content to be ready
    await Promise.all([
      page.getByTestId("hero-banner").locator("video").waitFor(),
      page.getByRole("region", { name: "Card Section" }).waitFor(),
      page.getByRole("region", { name: "Company Logo Strip" }).waitFor(),
      page.getByRole("region", { name: "Join The Flock" }).waitFor(),
      page.getByRole("region", { name: "Accordion Section" }).waitFor(),
    ]);

    const axeBuilder = new AxeBuilder({ page }).withTags([
      "wcag2a",
      "wcag2aa",
      "wcag21a",
      "wcag21aa",
      "wcag22a",
      "wcag22aa",
    ]);

    const accessibilityScanResults = await axeBuilder.analyze();
    expect(accessibilityScanResults.violations).toEqual([]);
  });
});
