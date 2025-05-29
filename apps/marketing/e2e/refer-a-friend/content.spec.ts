import { test, expect } from "@playwright/test";

test.describe("Refer a Friend Page", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/refer-a-friend");
  });

  test.describe("Hero Section", () => {
    test("should display hero section with correct content", async ({
      page,
    }) => {
      await expect(
        page.getByText("Share the love and get £50 each"),
      ).toBeVisible();
      await expect(page.getByText("Get rewarded!")).toBeVisible();
      await expect(
        page.getByText(/Invite your nearest and dearest to join Cuckoo/),
      ).toBeVisible();
      const tcLink = page.getByRole("link", { name: /t&cs/i });
      await expect(tcLink).toBeVisible();
      await expect(tcLink).toHaveAttribute("href", "/legal/promotional-terms");
    });

    test('should have working "Get your referral code" button', async ({
      page,
    }) => {
      const referralButton = page
        .getByRole("button", { name: /get your referral code/i })
        .or(page.getByRole("link", { name: /get your referral code/i }));
      await expect(referralButton).toBeVisible();
      await expect(referralButton).toHaveAttribute("href", "/account/login");
    });

    test("should navigate to login when clicking referral button", async ({
      page,
    }) => {
      const referralButton = page
        .getByRole("button", { name: /get your referral code/i })
        .or(page.getByRole("link", { name: /get your referral code/i }));
      await referralButton.click();
      await expect(page).toHaveURL(/\/account\/login/);
    });
  });
});
