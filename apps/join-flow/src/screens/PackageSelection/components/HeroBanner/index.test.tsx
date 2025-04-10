import { render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";

import { getAssetPath } from "@/lib/get-asset-path";
import { HeroBanner } from "@/screens/PackageSelection/components/HeroBanner";
import { bannerTitle } from "@/screens/PackageSelection/components/HeroBanner/HeroBannerProps";

vi.mock("@/screens/PackageSelection/components/Address", () => ({
  Address: () => <div data-testid="address-mock">Address Mock</div>,
}));

const mockUseTrustpilotScore = vi.fn().mockReturnValue({
  data: null,
  loading: false,
  error: null,
});

vi.mock("@react-component-library/ui", () => ({
  TrustpilotHorizontal: () => (
    <div data-testid="trustpilot-mock">Trustpilot Mock</div>
  ),
  useTrustpilotScore: () => mockUseTrustpilotScore(),
}));

vi.mock("@/lib/get-asset-path", () => ({
  getAssetPath: vi.fn((path) => `/mocked-path${path}`),
}));

describe("HeroBanner", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockUseTrustpilotScore.mockReturnValue({
      data: null,
      loading: false,
      error: null,
    });
  });

  it("renders the banner title", () => {
    render(<HeroBanner />);
    expect(screen.getByText(bannerTitle)).toBeInTheDocument();
  });

  it("renders the Address component", () => {
    render(<HeroBanner />);
    expect(screen.getByTestId("address-mock")).toBeInTheDocument();
  });

  it("renders the background image with the correct URL", () => {
    render(<HeroBanner />);

    const backgroundDiv = document.querySelector(
      ".bg-no-repeat.bg-right.bg-contain",
    );
    expect(backgroundDiv).toBeInTheDocument();
    expect(backgroundDiv).toHaveStyle({
      backgroundImage: `url(/mocked-path/images/hero-background.png)`,
    });
    // background image hidden on mobile
    expect(backgroundDiv).toHaveClass("hidden md:block");

    expect(getAssetPath).toHaveBeenCalledWith("/images/hero-background.png");
  });

  it("renders the Trustpilot component when trustScore is provided", () => {
    mockUseTrustpilotScore.mockReturnValue({
      data: { trustScore: 4.5, numberOfReviews: 100 },
      loading: false,
      error: null,
    });

    render(<HeroBanner />);
    expect(screen.getByTestId("trustpilot-mock")).toBeInTheDocument();
  });

  it("does not render the Trustpilot component when trustScore is not provided", () => {
    render(<HeroBanner />);
    expect(screen.queryByTestId("trustpilot-mock")).not.toBeInTheDocument();
  });
});
