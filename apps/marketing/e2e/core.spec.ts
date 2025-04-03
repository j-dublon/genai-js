import { test, expect, Locator, Page } from "@playwright/test";
import {
  checkPostcodeChecker,
  checkVisibility,
  mockTrustpilotReviews,
} from "./helpers";
import type { TestCase } from "./helpers";

test.describe("Home Page", () => {
  test.beforeEach(async ({ page, context }) => {
    await context.clearCookies();
    await context.clearPermissions();
    await mockTrustpilotReviews(page);
    await page.goto("/");
    await page.getByTestId("hero-banner").locator("video").waitFor();
  });

  test.describe("Navigation", () => {
    test("Nav bar is present", async ({ page }) => {
      await expect(page.locator("nav")).toBeVisible();
    });

    test("navigation dropdowns are visible and clickable", async ({ page }) => {
      const dropdownItems = [
        {
          name: "Broadband",
          dropdownItems: [
            { name: "Our broadband", href: "/broadband" },
            { name: "Switching", href: "/switching" },
          ],
        },
        {
          name: "About",
          dropdownItems: [
            { name: "About Cuckoo", href: "/about" },
            { name: "Blog", href: "/blog" },
            { name: "Careers", href: "https://careers.cuckoo.co/" },
          ],
        },
        {
          name: "Support",
          dropdownItems: [
            { name: "Help centre", href: "https://help.cuckoo.co/en/" },
            { name: "Guides", href: "/guide" },
          ],
        },
      ];

      await page.getByRole("button", { name: /menu/i }).click();
      const mobileMenu = page.getByRole("complementary", {
        name: "Mobile navigation menu",
      });
      await expect(mobileMenu).toBeVisible();

      for (const item of dropdownItems) {
        const headerItem = page.getByRole("button", { name: item.name });
        await expect(headerItem).toBeVisible();
        await headerItem.click();

        for (const dropdownItem of item.dropdownItems) {
          const link = mobileMenu.getByRole("link", {
            name: dropdownItem.name,
          });
          await expect(link).toBeVisible();
          expect(link).toHaveAttribute("href", dropdownItem.href);
        }
      }
    });

    test("login and signup links are visible and clickable", async ({
      page,
    }) => {
      const authLinks = [
        { name: "Log in", href: "/account/login" },
        { name: "Sign up", href: "/join/find-your-address" },
      ];

      const checkLinks = async (parent: Locator | Page) => {
        for (const link of authLinks) {
          const element = parent.getByRole("link", { name: link.name });
          await expect(element).toBeVisible();
          expect(element).toHaveAttribute("href", link.href);
        }
      };

      await page.getByRole("button", { name: /menu/i }).click();
      const mobileMenu = page.getByRole("complementary", {
        name: "Mobile navigation menu",
      });
      await expect(mobileMenu).toBeVisible();
      await checkLinks(mobileMenu);
    });
  });

  test.describe("Content Sections", () => {
    test("major content sections are present", async ({ page }) => {
      const sections: TestCase[] = [
        { selector: "hero-banner", type: "testId" },
        { selector: "Card Section", type: "role" },
        { selector: "Click Switch Done Section", type: "role" },
        { selector: "Join The Flock", type: "role" },
        { selector: "Cuckoo Guides", type: "role" },
        { selector: "Legal", type: "role" },
        { selector: "Company Logo Strip", type: "role" },
        {
          selector: 'section[aria-labelledby="trust-pilot-heading"]',
          type: "locator",
        },
        { selector: "Mobile App Wrapper", type: "role" },
        { selector: "Life at Cuckoo", type: "role" },
        { selector: "How Fast Can You Go", type: "role" },
        { selector: "footer", type: "locator" },
      ];

      await Promise.all(
        sections.map((section) => checkVisibility(page, section)),
      );
    });

    test("FAQ section is present and accordion works", async ({ page }) => {
      const faqSection = page.getByRole("region", {
        name: "Accordion Section",
      });
      await expect(faqSection).toBeVisible();
      const firstAccordionButton = faqSection.getByRole("button").first();
      await expect(firstAccordionButton).toBeVisible();

      // Check content is initially hidden
      const panel = faqSection.getByTestId("collapser-content").first();
      await expect(panel).not.toBeVisible();
      await firstAccordionButton.click();
      await expect(panel).toBeVisible();
    });

    test("Cuckoo Protect section visibility matches environment configuration", async ({
      page,
    }) => {
      const protectSection = page.getByRole("region", {
        name: "Cuckoo Protect Section",
      });

      if (process.env.NEXT_PUBLIC_ENABLE_CUCKOO_PROTECT === "true") {
        await expect(protectSection).toBeVisible();
      } else {
        await expect(protectSection).toHaveCount(0);
      }
    });

    test.describe("PostcodeChecker", () => {
      [
        {
          name: "hero banner",
          selector: "hero-banner",
          type: "testId" as const,
        },
        {
          name: "join section",
          selector: "Join The Flock",
          type: "role" as const,
        },
        {
          name: "speed section",
          selector: "How Fast Can You Go",
          type: "role" as const,
        },
      ].forEach(({ name, selector, type }) => {
        test(`works in ${name}`, async ({ page }) => {
          const parent =
            type === "testId"
              ? page.getByTestId(selector)
              : page.getByRole("region", { name: selector });
          await checkPostcodeChecker(parent, page);
        });
      });
    });
  });
});
