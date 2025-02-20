import { fireEvent, render, screen } from "@testing-library/react";

import { NavBar } from "./index";

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

describe("NavBar", () => {
  it("renders links correctly", () => {
    render(
      <NavBar logo={<h1>LOGO</h1>} links={testLinks} signupText="Sign up" />,
    );
    expect(screen.getByText("Broadband")).toBeInTheDocument();
    expect(screen.getByText("About")).toBeInTheDocument();
    expect(screen.getByText("Support")).toBeInTheDocument();
    expect(screen.getByText("Log in")).toBeInTheDocument();
  });

  it("toggles dropdown on click", () => {
    render(
      <NavBar logo={<h1>LOGO</h1>} links={testLinks} signupText="Sign up" />,
    );

    const aboutButton = screen.getByText("About");
    fireEvent.click(aboutButton);

    expect(screen.getByText("About Cuckoo")).toBeInTheDocument();
    expect(screen.getByText("Blog")).toBeInTheDocument();

    fireEvent.click(aboutButton);
    expect(screen.queryByText("About Cuckoo")).not.toBeInTheDocument();
  });

  it("closes dropdown on outside click", async () => {
    render(
      <NavBar logo={<h1>LOGO</h1>} links={testLinks} signupText="Sign up" />,
    );

    const aboutButton = screen.getByText("About");
    fireEvent.click(aboutButton);

    expect(screen.getByText("About Cuckoo")).toBeInTheDocument();

    fireEvent.click(document.body);

    expect(await screen.queryByText("About Cuckoo")).not.toBeInTheDocument();
  });

  it("closes dropdown when pressing Escape key", async () => {
    render(
      <NavBar logo={<h1>LOGO</h1>} links={testLinks} signupText="Sign up" />,
    );

    const aboutButton = screen.getByText("About");
    fireEvent.click(aboutButton);

    expect(screen.getByText("About Cuckoo")).toBeInTheDocument();

    fireEvent.keyDown(document, { key: "Escape", code: "Escape" });

    expect(await screen.queryByText("About Cuckoo")).not.toBeInTheDocument();
  });
});
