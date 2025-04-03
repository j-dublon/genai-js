import { test, expect, Locator, Page } from "@playwright/test";

test.describe("Homepage Navigation", () => {
  test.beforeEach(async ({ page, context }) => {
    await context.clearCookies();
    await context.clearPermissions();
    await page.goto("/");
    await page.getByTestId("hero-banner").locator("video").waitFor();
  });

  test("Nav bar is present", async ({ page }) => {
    await expect(page.locator("nav")).toBeVisible();
  });

  test("logo links to homepage", async ({ page }) => {
    const logo = page.locator("nav img[alt='Cuckoo']");
    await expect(logo).toBeVisible();
    expect(logo).toHaveAttribute("src", /cuckoo_logo/);
  });

  test("navigation dropdowns are visible and clickable", async ({
    page,
    isMobile,
  }) => {
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

    // If mobile, open the menu first
    if (isMobile) {
      await page.getByRole("button", { name: /menu/i }).click();
      const mobileMenu = page.getByRole("complementary", {
        name: "Mobile navigation menu",
      });
      await expect(mobileMenu).toBeVisible();
    }

    for (const item of dropdownItems) {
      const headerItem = page.getByRole("button", { name: item.name });
      await expect(headerItem).toBeVisible();
      await headerItem.click();

      // Desktop shows a menu, mobile shows links directly
      if (!isMobile) {
        const menu = page.getByRole("menu");
        await expect(menu).toBeVisible();
        for (const dropdownItem of item.dropdownItems) {
          const link = menu.getByText(dropdownItem.name);
          await expect(link).toBeVisible();
          expect(link).toHaveAttribute("href", dropdownItem.href);
        }
      } else {
        const mobileMenu = page.getByRole("complementary", {
          name: "Mobile navigation menu",
        });
        for (const dropdownItem of item.dropdownItems) {
          const link = mobileMenu.getByRole("link", {
            name: dropdownItem.name,
          });
          await expect(link).toBeVisible();
          expect(link).toHaveAttribute("href", dropdownItem.href);
        }
      }
    }
  });

  test("login and signup links are visible and clickable", async ({
    page,
    isMobile,
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

    // If mobile, open the menu first
    if (isMobile) {
      await page.getByRole("button", { name: /menu/i }).click();
      const mobileMenu = page.getByRole("complementary", {
        name: "Mobile navigation menu",
      });
      await expect(mobileMenu).toBeVisible();
      await checkLinks(mobileMenu);
    } else {
      await checkLinks(page);
    }
  });

  test("dropdown external links open in new tab with correct attributes", async ({
    page,
    context,
    isMobile,
  }) => {
    test.skip(isMobile, "Dropdown external links are not present on mobile");

    const externalLinks = [
      {
        name: "Careers",
        parent: "About",
        href: "https://careers.cuckoo.co/",
      },
      {
        name: "Help centre",
        parent: "Support",
        href: "https://help.cuckoo.co/en/",
      },
    ];

    for (const link of externalLinks) {
      const parentButton = page.getByRole("button", {
        name: link.parent,
      });
      await parentButton.click();

      const menu = page.getByRole("menu");
      await expect(menu).toBeVisible();

      const linkElement = menu.getByText(link.name);
      await expect(linkElement).toBeVisible();
      expect(linkElement).toHaveAttribute("target", "_blank");
      expect(linkElement).toHaveAttribute("rel", "noopener noreferrer");

      const [newPage] = await Promise.all([
        context.waitForEvent("page"),
        linkElement.click(),
      ]);
      await expect(newPage).toHaveURL(link.href);
      await newPage.close();
    }
  });

  test("Footer section is present with social links and footer links", async ({
    page,
  }) => {
    const footer = page.locator("footer");
    await expect(footer).toBeVisible();

    const socialLinks = [
      {
        name: "Go to our X (formerly twitter) account",
        href: "https://twitter.com/cuckoointernet",
      },
      {
        name: "Go to our Instagram account",
        href: "https://www.instagram.com/cuckoobroadband/",
      },
      {
        name: "Go to our Facebook account",
        href: "https://www.facebook.com/cuckoointernet/",
      },
      {
        name: "Go to our Linkedin account",
        href: "https://www.linkedin.com/company/19113678/",
      },
    ];

    for (const link of socialLinks) {
      const socialLink = footer.getByRole("link", { name: link.name });
      await expect(socialLink).toBeVisible();
      expect(socialLink).toHaveAttribute("href", link.href);
    }

    const footerLinks = footer.getByTestId("footer-links");
    await expect(footerLinks).toBeVisible();

    // Verify that there are list items with links, and each contains a link
    const listItems = footerLinks.locator("li");
    const itemCount = await listItems.count();
    expect(listItems).toHaveCount(itemCount);
    const links = footerLinks.locator("li > a");
    expect(links).toHaveCount(itemCount);
  });
});
