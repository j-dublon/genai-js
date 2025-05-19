import { test, expect, Page } from "@playwright/test";
import { mockTrustpilotScore } from "../helpers";

interface HeroSectionSelectors {
  title: string;
  changeAddressLink: string;
  trustpilotLogo: string;
  trustpilotStars: string;
  reviewsCount: string;
}

interface PackageCardsSelectors {
  title: string;
  c150: string;
  c500: string;
  c900: string;
  c900Package: string;
  toggleSwitch: string;
  monthlyPrice: string;
}

interface BenefitsListSelectors {
  title: string;
  freeMonths: string;
  router: string;
  speed: string;
  setup: string;
  support: string;
}

interface PageSelectors {
  logo: string;
  heroSection: HeroSectionSelectors;
  packageCards: PackageCardsSelectors;
  benefitsList: BenefitsListSelectors;
  legal: string;
}

const setupInitialState = (page: Page) => {
  return page.addInitScript(() => {
    const initialState = {
      _hasHydrated: true,
      currentStep: 0,
      serviceAddress: {
        line1: "Test Address Line 1",
        line2: "Test Address Line 2",
        line3: "London",
        postcode: "SW1A 2AA",
        identifiers: [],
      },
      accessibilityRequirements: null,
      affiliateSession: {
        affiliateName: "test-affiliate-name",
        cuckooAffiliate: "",
        doEmailValidation: true,
        sessionId: "1645",
        useCreditCheckResult: true,
      },
      personalDetails: null,
      eeroSelection: null,
      switchingDetails: null,
      paymentDetails: null,
      goLiveDetails: null,
    };

    localStorage.setItem(
      "cuckoo-join-flow-storage",
      JSON.stringify({
        state: initialState,
        version: 0,
      }),
    );
  });
};

test.describe("Select package page", () => {
  const selectors: PageSelectors = {
    logo: '[aria-label="Cuckoo Logo"]',
    heroSection: {
      title:
        'text="Great news – you can get our fastest full fibre speed. Woohoo!"',
      changeAddressLink: 'button:has-text("Change my address")',
      trustpilotLogo: '[aria-label="TrustPilot Logo"]',
      trustpilotStars:
        '[aria-label*="Trustpilot stars: 4 full star(s) and a half-star"]',
      reviewsCount: 'text="1,234"',
    },
    packageCards: {
      title: 'text="Pick the speed you need"',
      c150: 'h2:has-text("C-150")',
      c500: 'h2:has-text("C-500")',
      c900: 'h2:has-text("C-900")',
      c900Package: '[aria-label="C-900 broadband package"]',
      toggleSwitch: "role=switch",
      monthlyPrice: "43",
    },
    benefitsList: {
      title: 'text="A quick reminder of why you\'ll love Cuckoo"',
      freeMonths: 'text="Get 3 months\' free with C-900"',
      router: 'text="eero Pro router included (worth £249.99)"',
      speed: 'text="Full fibre speeds up to 900Mbps"',
      setup: 'text="£0 set-up and installation"',
      support: 'text="UK-based Customer Care team"',
    },
    legal: 'text="Stats and claims"',
  };

  test.beforeEach(async ({ page, context }) => {
    await context.clearCookies();
    await context.clearPermissions();

    await mockTrustpilotScore(page);

    await setupInitialState(page);

    await page.goto("/join-flow/package-selection");
  });

  test("Page content and functionality verification", async ({ page }) => {
    await page.waitForSelector('[aria-label="Cuckoo Logo"]', {
      state: "visible",
    });
    await expect(page.locator(selectors.logo)).toBeVisible();

    await verifyHeroSection(page, selectors.heroSection);

    await verifyPackageCards(page, selectors.packageCards);

    await verifyBenefitsList(page, selectors.benefitsList);

    await expect(page.locator(selectors.legal)).toBeVisible();

    await goToPaymentDetails(page, selectors.packageCards);
  });

  const verifyHeroSection = async (
    page: Page,
    selectors: HeroSectionSelectors,
  ) => {
    await expect(page.locator(selectors.title)).toBeVisible();
    await expect(page.locator(selectors.changeAddressLink)).toBeVisible();
    await expect(page.locator(selectors.trustpilotLogo)).toBeVisible();
    await expect(page.locator(selectors.trustpilotStars)).toBeVisible();
    await expect(page.locator(selectors.reviewsCount)).toBeVisible();
  };

  const verifyPackageCards = async (
    page: Page,
    selectors: PackageCardsSelectors,
  ) => {
    await expect(page.locator(selectors.title)).toBeVisible();
    await expect(page.locator(selectors.c150)).toBeVisible();
    await expect(page.locator(selectors.c500)).toBeVisible();
    await expect(page.locator(selectors.c900)).toBeVisible();

    const c900Package = page.locator(selectors.c900Package);
    await expect(c900Package.getByText(selectors.monthlyPrice)).toBeVisible();

    const toggleSwitch = page.getByRole("switch");
    await toggleSwitch.click();

    await expect(
      c900Package.getByText(selectors.monthlyPrice),
    ).not.toBeVisible();
  };

  const verifyBenefitsList = async (
    page: Page,
    selectors: BenefitsListSelectors,
  ) => {
    await expect(page.locator(selectors.title)).toBeVisible();
    await expect(page.locator(selectors.freeMonths)).toBeVisible();
    await expect(page.locator(selectors.router)).toBeVisible();
    await expect(page.locator(selectors.speed)).toBeVisible();
    await expect(page.locator(selectors.setup)).toBeVisible();
    await expect(page.locator(selectors.support)).toBeVisible();
  };

  const goToPaymentDetails = async (
    page: Page,
    selectors: PackageCardsSelectors,
  ) => {
    await page
      .locator(selectors.c900Package)
      .getByRole("button", { name: "Add to bag" })
      .click();

    await expect(page).toHaveURL(/personal-details/);
  };
});
