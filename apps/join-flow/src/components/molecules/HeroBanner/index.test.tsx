import { render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";

import { getAssetPath } from "@/lib/get-asset-path";

import { bannerTitle } from "./HeroBannerProps";
import { HeroBanner } from "./index";

vi.mock("@/components/atoms/Address", () => ({
  Address: () => <div data-testid="address-mock">Address Mock</div>,
}));

vi.mock("@react-component-library/ui", () => ({
  TrustpilotHorizontal: () => (
    <div data-testid="trustpilot-mock">Trustpilot Mock</div>
  ),
}));

vi.mock("@/lib/get-asset-path", () => ({
  getAssetPath: vi.fn((path) => `/mocked-path${path}`),
}));

describe("HeroBanner", () => {
  beforeEach(() => {
    vi.clearAllMocks();
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
    render(<HeroBanner trustScore={4.5} numberOfReviews={100} />);
    expect(screen.getByTestId("trustpilot-mock")).toBeInTheDocument();
  });

  it("does not render the Trustpilot component when trustScore is not provided", () => {
    render(<HeroBanner />);
    expect(screen.queryByTestId("trustpilot-mock")).not.toBeInTheDocument();
  });
});
