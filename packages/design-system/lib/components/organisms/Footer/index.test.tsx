import "@testing-library/jest-dom";

import { render, screen } from "@testing-library/react";

import { Footer, FooterProps } from ".";

const mockFooterProps: FooterProps = {
  titleText: "Fast, fair, feel-good broadband",
  trustScore: 4.8,
  footerSections: [
    {
      header: "Company",
      links: [
        { label: "About Us", href: "/about" },
        { label: "Careers", href: "/careers" },
      ],
    },
  ],
  footerDisclaimerText: "© 2025 Your Company. All rights reserved.",
};

describe("Footer Component", () => {
  it("renders the title text", () => {
    render(<Footer {...mockFooterProps} />);
    expect(screen.getByText(mockFooterProps.titleText)).toBeInTheDocument();
  });

  it("renders the footer sections and links", () => {
    render(<Footer {...mockFooterProps} />);
    mockFooterProps.footerSections.forEach((section) => {
      expect(screen.getByText(section.header)).toBeInTheDocument();
      section.links.forEach((link) => {
        expect(screen.getByText(link.label)).toBeInTheDocument();
      });
    });
  });

  it("renders the footer disclaimer text", () => {
    render(<Footer {...mockFooterProps} />);
    expect(
      screen.getByText(mockFooterProps.footerDisclaimerText),
    ).toBeInTheDocument();
  });
});
