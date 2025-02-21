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

const renderNavBar = (openDropdown: string | null = null) => {
  return render(
    <NavBar
      logo={<h1>LOGO</h1>}
      links={testLinks}
      signupText="Sign up"
      toggled={false}
      setToggled={mockSetToggled}
      openDropdown={openDropdown}
      setOpenDropdown={mockSetOpenDropdown}
      drawerRef={{ current: document.createElement("div") }}
      useDropdown={(name, currentOpenDropdown) => ({
        isOpen: currentOpenDropdown === name,
        dropdownRef: { current: document.createElement("div") },
      })}
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
      expect(screen.getByText(link.name)).toBeInTheDocument();
    });
  });

  it("toggles dropdown on click", async () => {
    renderNavBar("About");

    const aboutButton = screen.getByText("About");
    fireEvent.click(aboutButton);

    await waitFor(() => {
      expect(screen.getByText("About Cuckoo")).toBeInTheDocument();
      expect(screen.getByText("Blog")).toBeInTheDocument();
    });
  });

  it("closes dropdown when clicking elsewhere", async () => {
    renderNavBar("About");

    const aboutButton = screen.getByText("About");
    fireEvent.click(aboutButton);

    await waitFor(() => {
      expect(screen.getByText("About Cuckoo")).toBeInTheDocument();
    });

    fireEvent.mouseDown(document.body);

    expect(mockSetOpenDropdown).toHaveBeenCalledWith(null);
  });

  it("closes dropdown when pressing Escape key", async () => {
    renderNavBar("About");

    const aboutButton = screen.getByText("About");
    fireEvent.click(aboutButton);

    await waitFor(() => {
      expect(screen.getByText("About Cuckoo")).toBeInTheDocument();
    });

    fireEvent.keyDown(document, { key: "Escape", code: "Escape" });

    expect(mockSetOpenDropdown).toHaveBeenCalledWith(null);
  });

  it("renders sign up button with correct text", () => {
    renderNavBar();
    expect(screen.getByText("Sign up")).toBeInTheDocument();
  });

  it("renders logo", () => {
    renderNavBar();
    expect(screen.getByText("LOGO")).toBeInTheDocument();
  });
});
