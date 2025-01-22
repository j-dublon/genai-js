import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
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
  trustPilotLogo: {
    altText: "Trustpilot Logo",
    imgSrc: "https://via.placeholder.com/150",
  },
};

describe("Footer Component", () => {
  it("renders the title text", () => {
    render(<Footer {...mockFooterProps} />);
    expect(screen.getByText(mockFooterProps.titleText)).toBeInTheDocument();
  });

  it("renders the social media links with accessibility labels", () => {
    render(<Footer {...mockFooterProps} />);
    expect(screen.getByLabelText("Instagram")).toBeInTheDocument();
    expect(screen.getByLabelText("Twitter")).toBeInTheDocument();
    expect(screen.getByLabelText("Facebook")).toBeInTheDocument();
    expect(screen.getByLabelText("LinkedIn")).toBeInTheDocument();
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

  it("renders the Trustpilot logo with alt text", () => {
    render(<Footer {...mockFooterProps} />);
    const logo = screen.getByAltText(mockFooterProps.trustPilotLogo.altText);
    expect(logo).toHaveAttribute("src", mockFooterProps.trustPilotLogo.imgSrc);
  });

  it("renders the footer disclaimer text", () => {
    render(<Footer {...mockFooterProps} />);
    expect(
      screen.getByText(mockFooterProps.footerDisclaimerText)
    ).toBeInTheDocument();
  });
});
