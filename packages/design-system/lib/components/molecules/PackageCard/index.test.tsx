import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import { PackageCard } from "./index";

describe("PackageCard", () => {
  const mockPackage = {
    id: "test-id",
    name: "Test Package",
    speed: {
      download: 100,
      upload: 20,
    },
    price: {
      monthly: 25,
      setup: 0,
    },
    priceIncrease: {
      nextYearIncrease: 5,
      followingYearIncrease: 5,
    },
    contractLength: 12,
    description: "Test description",
    features: ["Feature 1", "Feature 2"],
  };

  const defaultProps = {
    pkg: mockPackage,
    onPackageSelect: vi.fn(),
    tint: "blue" as const,
    buttonText: "Add to bag",
  };

  it("renders correctly with default props", () => {
    render(<PackageCard {...defaultProps} />);

    expect(screen.getByText(defaultProps.pkg.name)).toBeInTheDocument();
    expect(screen.getByText(defaultProps.pkg.description)).toBeInTheDocument();

    expect(
      screen.getByText(`${defaultProps.pkg.speed.download}Mbps`),
    ).toBeInTheDocument();
    expect(
      screen.getByText(`${defaultProps.pkg.speed.upload}Mbps`),
    ).toBeInTheDocument();
    expect(screen.getByText("download speed")).toBeInTheDocument();
    expect(screen.getByText("upload speed")).toBeInTheDocument();
    expect(
      screen.getByText(defaultProps.pkg.price.monthly),
    ).toBeInTheDocument();

    expect(screen.getByText("Add to bag")).toBeInTheDocument();
    expect(screen.getByText("Is this plan for me?")).toBeInTheDocument();
  });

  it("calls onPackageSelect when Add to bag button is clicked", async () => {
    const onPackageSelect = vi.fn();
    render(<PackageCard {...defaultProps} onPackageSelect={onPackageSelect} />);

    await userEvent.click(screen.getByText("Add to bag"));

    expect(onPackageSelect).toHaveBeenCalledWith(mockPackage);
  });

  it("renders with feature package styling when featurePackage is true", () => {
    render(<PackageCard {...defaultProps} featurePackage={true} />);

    const container = screen.getByLabelText(
      `${mockPackage.name} broadband package`,
    );
    expect(container).toHaveClass("ds:border-core-black");
  });

  it("renders with different tint colors", () => {
    const { rerender } = render(<PackageCard {...defaultProps} tint="pink" />);
    expect(screen.getByText(defaultProps.pkg.name).closest("div")).toHaveClass(
      "ds:bg-secondary-pink",
    );

    rerender(<PackageCard {...defaultProps} tint="yellow" />);
    expect(screen.getByText(defaultProps.pkg.name).closest("div")).toHaveClass(
      "ds:bg-core-yellow",
    );
  });

  it("displays correct annual price increases", () => {
    render(<PackageCard {...defaultProps} />);

    expect(
      screen.getByText(
        `£${defaultProps.pkg.price.monthly + defaultProps.pkg.priceIncrease.nextYearIncrease}/month`,
      ),
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        `£${defaultProps.pkg.price.monthly + defaultProps.pkg.priceIncrease.nextYearIncrease + defaultProps.pkg.priceIncrease.followingYearIncrease}/month`,
      ),
    ).toBeInTheDocument();
  });

  it("applies custom className when provided", () => {
    render(<PackageCard {...defaultProps} className="custom-class" />);

    const container = screen.getByLabelText(
      `${mockPackage.name} broadband package`,
    );
    expect(container).toHaveClass("custom-class");
  });

  it("renders promotion pill when promotion prop is provided", () => {
    const promotionText = "Special Offer";
    render(<PackageCard {...defaultProps} promotion={promotionText} />);

    const promotionPill = screen.getByLabelText("Promotion");
    expect(promotionPill).toHaveClass("ds:bg-offer-gradient");
    expect(promotionPill).toHaveTextContent(promotionText);
  });
});
