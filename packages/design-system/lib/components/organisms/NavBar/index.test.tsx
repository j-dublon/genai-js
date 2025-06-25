import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { vi } from "vitest";

import { NavBar } from "./index";

const mockSetOpenDropdown = vi.fn();
const mockSetToggled = vi.fn();

const testLinks = [
  {
    name: "Broadband",
    dropdownLinks: [
      { name: "Our broadband", href: "/broadband" },
      { name: "Switching", href: "/switching" },
    ],
  },
  {
    name: "About",
    dropdownLinks: [
      { name: "About Cuckoo", href: "/about" },
      { name: "Blog", href: "/blog" },
    ],
  },
  {
    name: "Support",
    dropdownLinks: [
      {
        name: "Careers",
        href: "https://careers.cuckoo.co/",
        external: true,
      },
      {
        name: "Support",
        href: "https://help.cuckoo.co/en/",
        external: true,
      },
    ],
  },
  {
    name: "Log in",
    dropdownLinks: [
      { name: "Guides", href: "/guide" },
      { name: "Log in", href: "/account/login" },
    ],
  },
];

const renderNavBar = (options = {}) => {
  const defaultProps = {
    toggled: false,
    openDropdown: null,
  };

  const props = { ...defaultProps, ...options };

  return render(
    <NavBar
      logo={<h1>LOGO</h1>}
      links={testLinks}
      signupText="Sign up"
      setToggled={mockSetToggled}
      setOpenDropdown={mockSetOpenDropdown}
      drawerRef={{ current: document.createElement("div") }}
      useDropdown={(name, currentOpenDropdown) => ({
        isOpen: currentOpenDropdown === name,
        dropdownRef: { current: document.createElement("div") },
      })}
      {...props}
    />,
  );
};

describe("NavBar", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders links correctly", () => {
    renderNavBar();
    testLinks.forEach((link) => {
      expect(
        screen.getByRole("button", { name: link.name }),
      ).toBeInTheDocument();
    });
  });

  it("toggles dropdown on click when not toggled", async () => {
    renderNavBar({ openDropdown: "About" });

    const aboutButton = screen.getByText("About");
    fireEvent.click(aboutButton);

    await waitFor(() => {
      const dropdown = document.getElementById("dropdown-about");
      expect(dropdown).toBeInTheDocument();
      expect(dropdown?.getAttribute("aria-hidden")).toBe("false");
      expect(dropdown).toHaveClass("ds:visible");
    });
  });

  it("hides dropdown content when toggled is true", async () => {
    renderNavBar({ toggled: true, openDropdown: "About" });

    const dropdown = document.getElementById("dropdown-about");
    expect(dropdown).not.toBeNull();

    expect(dropdown?.getAttribute("aria-hidden")).toBe("true");
    expect(dropdown).toHaveClass("ds:invisible");
  });

  it("closes dropdown when clicking elsewhere", async () => {
    renderNavBar({ openDropdown: "About" });

    const aboutButton = screen.getByText("About");
    fireEvent.click(aboutButton);

    await waitFor(() => {
      const dropdown = document.getElementById("dropdown-about");
      expect(dropdown).toBeInTheDocument();
      expect(dropdown?.getAttribute("aria-hidden")).toBe("false");
      expect(dropdown).toHaveClass("ds:visible");
    });

    fireEvent.mouseDown(document.body);

    expect(mockSetOpenDropdown).toHaveBeenCalledWith(null);
  });

  it("closes dropdown when pressing Escape key", async () => {
    renderNavBar({ openDropdown: "About" });

    const aboutButton = screen.getByText("About");
    fireEvent.click(aboutButton);

    await waitFor(() => {
      const dropdown = document.getElementById("dropdown-about");
      expect(dropdown).toBeInTheDocument();
      expect(dropdown?.getAttribute("aria-hidden")).toBe("false");
      expect(dropdown).toHaveClass("ds:visible");
    });

    fireEvent.keyDown(document, { key: "Escape", code: "Escape" });

    expect(mockSetOpenDropdown).toHaveBeenCalledWith(null);
  });

  it("renders sign up button with correct text", () => {
    renderNavBar();
    const signUpButtons = screen.getAllByText("Sign up");
    expect(signUpButtons.length).toBeGreaterThan(0);
  });

  it("renders logo", () => {
    renderNavBar();
    expect(screen.getByText("LOGO")).toBeInTheDocument();
  });

  it("renders sign up button in desktop nav when toggled is true", () => {
    renderNavBar({ toggled: true });

    const signUpButtons = screen.getAllByText("Sign up");
    expect(signUpButtons.length).toBeGreaterThan(0);

    const desktopNavContainer = document.querySelector(
      ".ds\\:hidden.ds\\:md\\:flex",
    );
    expect(desktopNavContainer).toBeInTheDocument();
    expect(desktopNavContainer).toContainHTML("Sign up");
  });

  it("does not render CTA when toggled is true", () => {
    renderNavBar({ toggled: true });
    expect(screen.queryByText("Refer a friend.")).not.toBeInTheDocument();
  });

  it("renders CTA when toggled is false", () => {
    renderNavBar({ toggled: false });
    expect(screen.getByText(/Refer a friend/i)).toBeInTheDocument();
  });

  it("renders mobile menu when toggled is true", () => {
    renderNavBar({ toggled: true });

    const mobileMenu = document.querySelector("aside");
    expect(mobileMenu).toBeInTheDocument();
  });

  it("does not render mobile menu when toggled is false", () => {
    renderNavBar({ toggled: false });

    const mobileMenu = document.querySelector("aside");
    expect(mobileMenu).not.toBeInTheDocument();
  });

  it("renders RAF banner when showReferFriendCTA is true", () => {
    renderNavBar({ showReferFriendCTA: true });

    expect(screen.getByText(/Refer a friend/i)).toBeInTheDocument();
  });

  it("does not render RAF banner when showReferFriendCTA is false", () => {
    renderNavBar({ showReferFriendCTA: false });

    expect(screen.queryByText(/Refer a friend/i)).not.toBeInTheDocument();
  });
});
