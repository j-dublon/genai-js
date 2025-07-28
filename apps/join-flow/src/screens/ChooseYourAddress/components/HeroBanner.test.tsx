import { render, screen, waitFor } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";

import { AffiliateSession } from "@/store/useJoinFlowStore";

import { HeroBanner } from "./HeroBanner";
import { heroBannerProps } from "./heroBannerProps";

vi.mock("next/image", () => ({
  default: ({
    src,
    alt,
    width,
    height,
    className,
  }: {
    src: string;
    alt: string;
    width: number;
    height: number;
    className?: string;
  }) => (
    <img
      src={src}
      alt={alt}
      width={width}
      height={height}
      className={className}
    />
  ),
}));

vi.mock("next/link", () => ({
  default: ({
    children,
    href,
    className,
    target,
  }: {
    children: React.ReactNode;
    href: string;
    className?: string;
    target?: string;
  }) => (
    <a href={href} className={className} target={target}>
      {children}
    </a>
  ),
}));

vi.mock("remark", () => ({
  remark: () => ({
    use: () => ({
      process: vi.fn().mockImplementation((text) => ({
        toString: () => `<span>${text}</span>`,
      })),
    }),
  }),
}));

describe("HeroBanner", () => {
  const mockAffiliateContent: AffiliateSession["displayItems"] = {
    landingPageBanner: [
      {
        primaryTitle: "Custom Primary Title",
        secondaryTitle: "Custom Secondary Title",
        descriptionText: "Custom description text",
        style: "default" as const,
        blockType: "basicLandingBannerBlock",
        image: {
          id: "test-image-id",
          url: "/test-image.png",
          alt: "Test image",
          updatedAt: "2025-01-01T00:00:00.000Z",
          createdAt: "2025-01-01T00:00:00.000Z",
        },
      },
    ],
    termsAndConditionsLink: "https://example.com/terms",
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders with custom affiliate content", async () => {
    render(<HeroBanner affiliateContent={mockAffiliateContent} />);

    await waitFor(() => {
      expect(screen.getByText("Custom Primary Title")).toBeInTheDocument();
    });
    expect(screen.getByText("Custom Secondary Title")).toBeInTheDocument();
    expect(screen.getByText("Custom description text")).toBeInTheDocument();
  });

  it("renders with default banner style when style is not specified", () => {
    const affiliateContentWithoutStyle = {
      ...mockAffiliateContent,
      landingPageBanner: undefined,
    };

    render(<HeroBanner affiliateContent={affiliateContentWithoutStyle} />);

    const banner = screen
      .getByText("Join the flock")
      .closest("div")?.parentElement;
    expect(banner).toHaveClass("bg-core-yellow");
    expect(banner).toHaveClass("text-core-black");
  });

  it("shows background image for default style", () => {
    render(<HeroBanner affiliateContent={mockAffiliateContent} />);

    const backgroundImage = document.querySelector('[class*="bg-contain"]');
    expect(backgroundImage).toBeInTheDocument();
  });

  it("hides background image for apfn style", () => {
    const apfnAffiliateContent = {
      ...mockAffiliateContent,
      landingPageBanner: [
        {
          ...mockAffiliateContent.landingPageBanner![0],
          style: "apfn" as const,
        },
      ],
    };

    render(<HeroBanner affiliateContent={apfnAffiliateContent} />);

    const backgroundImage = document.querySelector('[class*="bg-contain"]');
    expect(backgroundImage).not.toBeInTheDocument();
  });

  it("renders image when provided in affiliate content", () => {
    render(<HeroBanner affiliateContent={mockAffiliateContent} />);

    const image = screen.getByAltText("Test image");
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute("src", "/test-image.png");
  });

  it("does not render image when image is a string", () => {
    const affiliateContentWithStringImage = {
      ...mockAffiliateContent,
      landingPageBanner: [
        {
          ...mockAffiliateContent.landingPageBanner![0],
          image: "string-image",
        },
      ],
    };

    render(<HeroBanner affiliateContent={affiliateContentWithStringImage} />);

    const image = screen.queryByAltText("Test image");
    expect(image).not.toBeInTheDocument();
  });

  it("does not render image when image url is missing", () => {
    const affiliateContentWithoutImageUrl = {
      ...mockAffiliateContent,
      landingPageBanner: [
        {
          ...mockAffiliateContent.landingPageBanner![0],
          image: {
            id: "test-image-id",
            updatedAt: "2025-01-01T00:00:00.000Z",
            createdAt: "2025-01-01T00:00:00.000Z",
            alt: "Test image",
          },
        },
      ],
    };

    render(<HeroBanner affiliateContent={affiliateContentWithoutImageUrl} />);

    const image = screen.queryByAltText("Test image");
    expect(image).not.toBeInTheDocument();
  });

  it("renders terms and conditions link with custom URL", () => {
    render(<HeroBanner affiliateContent={mockAffiliateContent} />);

    const link = screen.getByText(heroBannerProps.tAndCLinkText);
    expect(link).toHaveAttribute("href", "https://example.com/terms");
    expect(link).toHaveAttribute("target", "_blank");
  });

  it("renders terms and conditions link with default URL when not provided", () => {
    const affiliateContentWithoutTermsLink = {
      ...mockAffiliateContent,
      termsAndConditionsLink: undefined,
    };

    render(<HeroBanner affiliateContent={affiliateContentWithoutTermsLink} />);

    const link = screen.getByText(heroBannerProps.tAndCLinkText);
    expect(link).toHaveAttribute("href", "/");
  });

  it("handles empty landing page banner array", () => {
    const affiliateContentWithEmptyBanner = {
      ...mockAffiliateContent,
      landingPageBanner: [],
    };

    render(<HeroBanner affiliateContent={affiliateContentWithEmptyBanner} />);

    expect(
      screen.getByText(heroBannerProps.defaultPrimaryTitle),
    ).toBeInTheDocument();
    expect(
      screen.getByText(heroBannerProps.defaultSecondaryTitle),
    ).toBeInTheDocument();
    expect(
      screen.getByText(heroBannerProps.defaultDescriptionText),
    ).toBeInTheDocument();
  });

  it("handles missing landing page banner property", () => {
    const affiliateContentWithoutBanner = {
      termsAndConditionsLink: "https://example.com/terms",
    };

    render(<HeroBanner affiliateContent={affiliateContentWithoutBanner} />);

    expect(
      screen.getByText(heroBannerProps.defaultPrimaryTitle),
    ).toBeInTheDocument();
    expect(
      screen.getByText(heroBannerProps.defaultSecondaryTitle),
    ).toBeInTheDocument();
    expect(
      screen.getByText(heroBannerProps.defaultDescriptionText),
    ).toBeInTheDocument();
  });
});
