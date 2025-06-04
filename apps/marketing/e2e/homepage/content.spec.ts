import { test, expect } from "@playwright/test";
import {
  acceptCookies,
  checkPostcodeChecker,
  checkTrustpilotLogo,
  mockTrustpilotReviews,
  mockTrustpilotScore,
} from "e2e/helpers";

test.describe("Homepage Navigation", () => {
  test.beforeEach(async ({ page, context }) => {
    await context.clearCookies();
    await context.clearPermissions();
    await mockTrustpilotReviews(page);
    await mockTrustpilotScore(page);
    await acceptCookies(page);
    await page.goto("/");
    await page.getByTestId("hero-banner").locator("video").waitFor();
  });

  test.describe("Content Sections and functionality", () => {
    test("hero banner section is present and has working postcode checker and video", async ({
      page,
    }) => {
      const heroBanner = page.getByTestId("hero-banner");
      await expect(heroBanner).toBeVisible();

      const video = heroBanner.locator("video");
      await expect(video).toBeVisible();
      expect(video).toHaveAttribute("autoPlay");
      expect(video).toHaveAttribute("playsInline");
      expect(video).toHaveAttribute("loop");

      // Check muted state using JavaScript evaluation
      const isMuted = await video.evaluate((el: HTMLVideoElement) => el.muted);
      expect(isMuted).toBe(true);

      const source = video.locator("source");
      expect(source).toHaveAttribute("type", "video/mp4");
      expect(source).toHaveAttribute(
        "src",
        "https://cuckoo-egg.cdn.prismic.io/cuckoo-egg/Z9vpgDiBA97Gisse_0325_MarketingWebsite_Homepage_3DWorld_Animation.mp4",
      );

      await checkPostcodeChecker(heroBanner, page);
    });

    test("Major content sections are present", async ({ page, isMobile }) => {
      const cardSection = page.getByRole("region", {
        name: "Card Section",
      });
      await expect(cardSection).toBeVisible();

      const clickSwitchSection = page.getByRole("region", {
        name: "Click Switch Done Section",
      });
      await expect(clickSwitchSection).toBeVisible();

      const joinSection = page.getByRole("region", {
        name: "Join The Flock",
      });
      await expect(joinSection).toBeVisible();
      await checkTrustpilotLogo(joinSection);

      const guidesSection = page.getByRole("region", {
        name: "Cuckoo Guides",
      });
      await expect(guidesSection).toBeVisible();

      const scrollbar = guidesSection.getByRole("scrollbar");
      if (isMobile) {
        await expect(scrollbar).toBeHidden();
      } else {
        await expect(scrollbar).toBeVisible();
      }

      const legalSection = page.getByRole("region", { name: "Legal" });
      await expect(legalSection).toBeVisible();

      await checkPostcodeChecker(joinSection, page);
    });

    test("Company logo strip is present and animated", async ({
      page,
      isMobile,
    }) => {
      const logoStrip = page.getByRole("region", {
        name: "Company Logo Strip",
      });
      await expect(logoStrip).toBeVisible();

      if (isMobile) {
        const mobileContainer = logoStrip.getByTestId("mobile-logo-container");
        await expect(mobileContainer).toBeVisible();

        const marqueeElements = mobileContainer.locator(":scope > div");
        expect(marqueeElements).toHaveCount(2);

        expect(marqueeElements.nth(0)).toHaveClass(/ds:animate-marquee/);
        expect(marqueeElements.nth(1)).toHaveClass(/ds:animate-marquee/);
        expect(marqueeElements.nth(1)).toHaveAttribute("aria-hidden", "true");
      } else {
        const desktopContainer = logoStrip.getByTestId(
          "desktop-logo-container",
        );
        await expect(desktopContainer).toBeVisible();
        expect(desktopContainer).toHaveClass(/ds:hidden ds:md:flex/);

        const marqueeElements = desktopContainer.locator(":scope > div");
        await expect(marqueeElements).toHaveCount(1);
      }
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

    test("TrustPilot review section is present", async ({ page, isMobile }) => {
      await page.waitForSelector(
        'section[aria-labelledby="trust-pilot-heading"]',
        { state: "visible" },
      );
      const trustPilotSection = page.locator(
        'section[aria-labelledby="trust-pilot-heading"]',
      );
      await expect(trustPilotSection).toBeVisible();

      const scrollbar = trustPilotSection.getByRole("scrollbar");
      if (isMobile) {
        await expect(scrollbar).toBeHidden();
      } else {
        await expect(scrollbar).toBeVisible();
      }
    });

    test("Mobile App section is present and phone screen changes automatically", async ({
      page,
    }) => {
      const mobileAppSection = page.getByRole("region", {
        name: "Mobile App Wrapper",
      });
      await expect(mobileAppSection).toBeVisible();

      const mobileScreen = mobileAppSection.getByTestId("mobile-screen");
      await expect(mobileScreen).toBeVisible();

      const phoneScreens = [
        "Phone displaying the account overview",
        "Phone displaying the bills overview",
        "Phone displaying the plan details",
        "Phone displaying the eero screen",
      ];

      // Wait for any screen to be attached first
      const initialScreen = await Promise.any(
        phoneScreens.map(async (screen) => {
          await mobileScreen.getByTestId(screen).waitFor({ state: "attached" });
          return screen;
        }),
      );

      // Then wait for a different screen to be attached
      await Promise.any(
        phoneScreens
          .filter((screen) => screen !== initialScreen)
          .map(async (screen) => {
            await mobileScreen
              .getByTestId(screen)
              .waitFor({ state: "attached", timeout: 10000 });
            return screen;
          }),
      );
    });

    test("Life at Cuckoo section is present with animated image carousel", async ({
      page,
    }) => {
      const lifeAtCuckooSection = page.getByRole("region", {
        name: "Life at Cuckoo",
      });
      await expect(lifeAtCuckooSection).toBeVisible();

      const imageSets = lifeAtCuckooSection.getByTestId("image-marquee-set");
      expect(imageSets).toHaveCount(2);
      expect(imageSets.first()).toHaveClass(/ds:animate-marquee-slow/);
      expect(imageSets.nth(1)).toHaveClass(/ds:animate-marquee-slow/);

      // Verify that set2 is marked as hidden to screen readers for accessibility
      expect(imageSets.nth(1)).toHaveAttribute("aria-hidden", "true");
    });

    test("How Fast Can You Go section is present with video and postcode checker", async ({
      page,
    }) => {
      const speedSection = page.getByRole("region", {
        name: "How Fast Can You Go",
      });
      await expect(speedSection).toBeVisible();

      const video = speedSection.locator("video");
      await expect(video).toBeVisible();
      expect(video).toHaveAttribute("autoPlay");
      expect(video).toHaveAttribute("playsInline");
      expect(video).toHaveAttribute("loop");

      // Check muted state using JavaScript evaluation
      const isMuted = await video.evaluate((el: HTMLVideoElement) => el.muted);
      expect(isMuted).toBe(true);

      const sources = video.locator("source");
      expect(sources).toHaveCount(2);
      expect(sources.nth(0)).toHaveAttribute("type", "video/webm");
      expect(sources.nth(0)).toHaveAttribute("src", /CK_Flex_Master\.webm$/);
      expect(sources.nth(1)).toHaveAttribute("type", "video/mp4");
      expect(sources.nth(1)).toHaveAttribute("src", /CK_Flex_Master\.mp4$/);

      await checkPostcodeChecker(speedSection, page);
    });
  });
});
