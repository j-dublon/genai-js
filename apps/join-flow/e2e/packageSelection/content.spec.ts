import { test, expect, Page } from "@playwright/test";

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
      currentStep: 1,
      selectedPackage: {
        id: "c-900",
        name: "C-900",
        speed: { download: 900, upload: 900 },
        price: { monthly: 41, setup: 0 },
        priceIncrease: { nextYearIncrease: 0, followingYearIncrease: 0 },
        contractLength: 24,
        description: "Fast broadband",
        features: [],
      },
      serviceAddress: {
        line1: "Test Address Line 1",
        line2: "Test Address Line 2",
        line3: "London",
        postcode: "SW1A 2AA",
        identifiers: [],
        id: "test-address-id",
        selectionIdentifier: "test-selection-id",
      },
      quoteResponse: {
        documentID: "test-doc-id",
        response: {
          products: [
            {
              selectionIdentifier: "test-selection-id",
              id: "test-product-id",
            },
          ],
          quotingCode: "test-quote-code",
        },
      },
      accessibilityRequirements: null,
      affiliateSession: {
        affiliateName: "test-affiliate-name",
        cuckooAffiliate: "",
        doEmailValidation: true,
        id: "1645",
        useCreditCheckResult: true,
      },
      personalDetails: null,
      eeroSelection: null,
      switchingDetails: null,
      paymentDetails: null,
      goLiveDetails: null,
      basket: null,
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
      reviewsCount: ':text-matches("1[,.]?234")',
    },
    packageCards: {
      title: 'text="Pick the speed you need"',
      c150: 'h2:has-text("C-150")',
      c500: 'h2:has-text("C-500")',
      c900: 'h2:has-text("C-900")',
      c900Package: '[aria-label="C-900 broadband package"]',
      toggleSwitch: "role=switch",
      monthlyPrice: "41",
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

    await page.route("**/*", async (route) => {
      const url = route.request().url();
      const method = route.request().method();

      if (url.includes("baskets") && method === "POST") {
        await route.fulfill({
          status: 200,
          contentType: "application/json",
          body: JSON.stringify({
            doc: {
              id: "test-basket-id",
              locked: false,
              product: {
                quoteLookup: "test-doc-id",
                selectionIdentifier: "test-selection-id",
              },
              updatedAt: new Date().toISOString(),
              createdAt: new Date().toISOString(),
            },
          }),
        });
        return;
      }

      if (url.includes("trustpilot")) {
        await route.fulfill({
          status: 200,
          contentType: "application/json",
          body: JSON.stringify({
            trustScore: 4.5,
            numberOfReviews: 1234,
          }),
        });
        return;
      }

      await route.continue();
    });

    await setupInitialState(page);
    await page.goto("/join-flow/package-selection");
  });

  test("Page content and functionality verification", async ({ page }) => {
    await page.waitForSelector('[aria-label="Cuckoo Logo"]', {
      state: "visible",
    });
    await expect(page.locator(selectors.logo)).toBeVisible();

    await expect(page.locator(selectors.heroSection.title)).toBeVisible();
    await expect(
      page.locator(selectors.heroSection.changeAddressLink),
    ).toBeVisible();

    // Check Trustpilot elements if they exist
    const trustpilotLogo = page.locator(selectors.heroSection.trustpilotLogo);
    if (await trustpilotLogo.isVisible({ timeout: 2000 }).catch(() => false)) {
      await expect(trustpilotLogo).toBeVisible();
      await expect(
        page.locator(selectors.heroSection.trustpilotStars),
      ).toBeVisible();
      await expect(
        page.locator(selectors.heroSection.reviewsCount),
      ).toBeVisible();
    }

    await expect(page.locator(selectors.packageCards.title)).toBeVisible();
    await expect(page.locator(selectors.packageCards.c150)).toBeVisible();
    await expect(page.locator(selectors.packageCards.c500)).toBeVisible();
    await expect(page.locator(selectors.packageCards.c900)).toBeVisible();

    const c900Package = page.locator(selectors.packageCards.c900Package);
    await expect(
      c900Package.getByText(selectors.packageCards.monthlyPrice),
    ).toBeVisible();

    const toggleSwitch = page.getByRole("switch");
    await toggleSwitch.click();

    await expect(
      c900Package.getByText(selectors.packageCards.monthlyPrice),
    ).not.toBeVisible();

    await expect(page.locator(selectors.benefitsList.title)).toBeVisible();
    await expect(page.locator(selectors.benefitsList.freeMonths)).toBeVisible();
    await expect(page.locator(selectors.benefitsList.router)).toBeVisible();
    await expect(page.locator(selectors.benefitsList.speed)).toBeVisible();
    await expect(page.locator(selectors.benefitsList.setup)).toBeVisible();
    await expect(page.locator(selectors.benefitsList.support)).toBeVisible();

    await expect(page.locator(selectors.legal)).toBeVisible();

    const addToBagButton = page
      .locator(selectors.packageCards.c900Package)
      .getByRole("button", { name: "Add to bag" });

    await expect(addToBagButton).toBeVisible();
    await addToBagButton.click();

    await expect(page).toHaveURL(/personal-details/, { timeout: 10000 });
  });
});
