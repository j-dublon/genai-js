import { render, screen } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import { formatPricingDate, PriceDetail, PromotionCard } from "./index";

vi.mock("@icons/InfoIcon", () => ({
  InfoIcon: () => <div data-testid="info-icon">InfoIcon</div>,
}));

vi.mock("@icons/Present", () => ({
  Present: () => <div data-testid="present-icon">Present</div>,
}));

describe("PromotionCard", () => {
  const defaultProps = {
    heading: "Test Package",
    mainPrice: "25",
    buttonText: "Select Package",
    onButtonClick: vi.fn(),
    tint: "pink" as const,
  };

  describe("Basic rendering", () => {
    it("renders with required props", () => {
      render(<PromotionCard {...defaultProps} />);

      expect(screen.getByText("Test Package")).toBeInTheDocument();
      expect(screen.getByText("25")).toBeInTheDocument();
      expect(
        screen.getByRole("button", { name: "Select Package" }),
      ).toBeInTheDocument();
    });

    it("renders with subtitle", () => {
      render(<PromotionCard {...defaultProps} subtitle="Best value package" />);

      expect(screen.getByText("Best value package")).toBeInTheDocument();
    });
  });

  describe("Features", () => {
    const features = [
      {
        icon: <div data-testid="feature-icon">📶</div>,
        value: "100",
        label: "download speed",
        unit: "Mbps",
      },
    ];

    it("renders features when provided", () => {
      render(<PromotionCard {...defaultProps} features={features} />);

      expect(screen.getByText("100Mbps")).toBeInTheDocument();
      expect(screen.getByTestId("feature-icon")).toBeInTheDocument();
    });

    it("does not render features section when empty", () => {
      render(<PromotionCard {...defaultProps} features={[]} />);

      expect(screen.queryByTestId("feature-icon")).not.toBeInTheDocument();
    });
  });

  describe("Promotion badges", () => {
    it("renders single promotion badge", () => {
      render(
        <PromotionCard {...defaultProps} promotionPillsText={["Save £50"]} />,
      );

      expect(screen.getByText("Save £50")).toBeInTheDocument();
      expect(screen.getByTestId("present-icon")).toBeInTheDocument();
    });

    it("renders multiple promotion badges without icon", () => {
      render(
        <PromotionCard
          {...defaultProps}
          promotionPillsText={["Save £50", "Free Setup"]}
        />,
      );

      expect(screen.getByText("Save £50")).toBeInTheDocument();
      expect(screen.getByText("Free Setup")).toBeInTheDocument();
      expect(screen.queryByTestId("present-icon")).not.toBeInTheDocument();
    });
  });

  describe("Additional prices", () => {
    const additionalPrices = [
      { price: "30", label: "After 12 months" },
      { price: "35", label: "After 24 months", date: "2024-01-15" },
    ];

    it("renders additional prices", () => {
      render(
        <PromotionCard {...defaultProps} additionalPrices={additionalPrices} />,
      );

      expect(screen.getByText("After 12 months")).toBeInTheDocument();
      expect(screen.getByText("£30/month")).toBeInTheDocument();
      expect(
        screen.getByText("After 24 months 15 January 2024"),
      ).toBeInTheDocument();
      expect(screen.getByText("£35/month")).toBeInTheDocument();
    });
  });

  describe("Details button", () => {
    it("renders details button when provided", () => {
      const onDetailsClick = vi.fn();
      render(
        <PromotionCard
          {...defaultProps}
          detailsButtonText="View Details"
          onDetailsClick={onDetailsClick}
        />,
      );

      expect(screen.getByText("View Details")).toBeInTheDocument();
      expect(screen.getByTestId("info-icon")).toBeInTheDocument();
    });

    it("calls onDetailsClick when details button is clicked", async () => {
      const user = userEvent.setup();
      const onDetailsClick = vi.fn();
      const cardData = { id: "test-card" };
      render(
        <PromotionCard
          {...defaultProps}
          detailsButtonText="View Details"
          onDetailsClick={onDetailsClick}
          data={cardData}
        />,
      );

      await user.click(screen.getByText("View Details"));

      expect(onDetailsClick).toHaveBeenCalledWith(cardData);
    });

    it("does not render details button when not provided", () => {
      render(<PromotionCard {...defaultProps} />);

      expect(screen.queryByText("View Details")).not.toBeInTheDocument();
      expect(screen.queryByTestId("info-icon")).not.toBeInTheDocument();
    });
  });

  describe("Button interactions", () => {
    it("calls onButtonClick when button is clicked", async () => {
      const user = userEvent.setup();
      const onButtonClick = vi.fn();
      const cardData = { id: "test-card" };

      render(
        <PromotionCard
          {...defaultProps}
          onButtonClick={onButtonClick}
          data={cardData}
        />,
      );

      await user.click(screen.getByRole("button", { name: "Select Package" }));

      expect(onButtonClick).toHaveBeenCalledWith(cardData);
    });
  });

  describe("Accessibility", () => {
    it("has correct aria-label for the card", () => {
      render(<PromotionCard {...defaultProps} />);

      const card = screen.getByLabelText("Test Package card");

      expect(card).toBeInTheDocument();
    });

    it("has correct aria-label for promotion badge", () => {
      render(
        <PromotionCard {...defaultProps} promotionPillsText={["Save £50"]} />,
      );

      const badge = screen.getByLabelText("Promotion");

      expect(badge).toBeInTheDocument();
    });
  });
});

describe("PriceDetail", () => {
  const defaultProps = {
    price: "30",
    label: "After 12 months",
  };

  it("renders with required props", () => {
    render(<PriceDetail {...defaultProps} />);

    expect(screen.getByText("After 12 months")).toBeInTheDocument();
    expect(screen.getByText("£30/month")).toBeInTheDocument();
  });

  it("renders with date when provided", () => {
    render(<PriceDetail {...defaultProps} date="2024-01-15" />);

    expect(
      screen.getByText("After 12 months 15 January 2024"),
    ).toBeInTheDocument();
  });

  it("renders with custom currency", () => {
    render(<PriceDetail {...defaultProps} currency="$" />);

    expect(screen.getByText("$30/month")).toBeInTheDocument();
  });

  it("renders without date when not provided", () => {
    render(<PriceDetail {...defaultProps} />);

    expect(screen.getByText("After 12 months")).toBeInTheDocument();
    expect(
      screen.queryByText("After 12 months 15 January 2024"),
    ).not.toBeInTheDocument();
  });
});

describe("formatPricingDate", () => {
  it("formats date correctly", () => {
    const result = formatPricingDate("2024-01-15");
    expect(result).toBe("15 January 2024");
  });
});
