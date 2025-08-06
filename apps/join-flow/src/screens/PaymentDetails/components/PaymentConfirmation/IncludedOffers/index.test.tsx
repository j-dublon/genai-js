import useJoinFlowStore from "@store/useJoinFlowStore";
import { render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";

import { usePricingCalculations } from "@/hooks/usePricingCalculations";

import { IncludedOffers } from "./index";

vi.mock("@store/useJoinFlowStore", () => ({
  default: vi.fn(),
}));
const mockUseJoinFlowStore = vi.mocked(useJoinFlowStore);

vi.mock("@/hooks/usePricingCalculations", () => ({
  usePricingCalculations: vi.fn(),
}));
const mockUsePricingCalculations = vi.mocked(usePricingCalculations);

vi.mock("next/link", () => ({
  default: ({
    children,
    href,
    target,
    className,
  }: {
    children: React.ReactNode;
    href: string;
    target?: string;
    className?: string;
  }) => (
    <a href={href} target={target} className={className}>
      {children}
    </a>
  ),
}));

vi.mock("./includedOffersProps", () => ({
  includedOffersProps: {
    promotionBlock: {
      title: "Your monthly discount offer",
      content:
        "As a new customer, you'll get £DISCOUNT_VALUE off your bill each month for your first DISCOUNT_TERM months. The discount is automatically applied, starting from your first bill. ",
      linkText: "See more: cuckoo.co/terms",
    },
    giftCardBlock: {
      title: "Your gift card offer",
      content:
        "If you're eligible (you can't have been a Cuckoo customer before), you'll get a gift card by email after 90 days. This is where you can pick the retailer you'd like to shop with. ",
      linkText: "See more: cuckoo.co/terms",
    },
    billCreditBlock: {
      title: "Your bill credit offer",
      content:
        "As a new customer, you'll save £CREDIT_AMOUNT off your bill. The credit will be added to your account after the order's been placed and before your first bill. It can only be used as credit. ",
      linkText: "See more terms to find out more",
    },
  },
}));

describe("IncludedOffers", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockUsePricingCalculations.mockReturnValue({
      monthlySaving: "5",
      monthlyPackagePrice: "25",
      discountedPrice: "20",
      nextPrice: "25",
      followingPrice: "25",
      monthlyEeroPrice: "0",
      monthlyTotal: "25",
      discountedMonthlyTotal: "20",
      predictedTotalNext: "25",
      predictedTotalFollowing: "25",
      totalPlanSaving: "120",
      nextPriceRiseAmount: "0",
      followingPriceRiseAmount: "0",
      packageName: "150Mbps",
    });
  });

  it("should return null if offers is null", () => {
    mockUseJoinFlowStore.mockReturnValue({
      selectedPackage: {
        offers: null,
      },
      eeroSelection: null,
      affiliateSession: null,
    });

    const { container } = render(<IncludedOffers />);
    expect(container).toBeEmptyDOMElement();
  });

  it("should return null if offers is an empty array", () => {
    mockUseJoinFlowStore.mockReturnValue({
      selectedPackage: {
        offers: [],
      },
      eeroSelection: null,
      affiliateSession: null,
    });

    const { container } = render(<IncludedOffers />);
    expect(container).toBeEmptyDOMElement();
  });

  it("should render a bill credit offer correctly", () => {
    const mockAffiliateSession = {
      displayItems: {
        termsAndConditionsLink: "https://example.com/terms",
      },
    };

    mockUseJoinFlowStore.mockReturnValue({
      selectedPackage: {
        offers: [
          {
            blockType: "billCreditBlock",
            value: 50,
          },
        ],
      },
      eeroSelection: null,
      affiliateSession: mockAffiliateSession,
    });

    render(<IncludedOffers />);

    expect(screen.getByText("Your bill credit offer")).toBeInTheDocument();
    expect(
      screen.getByText(
        /As a new customer, you'll save £50 off your bill\. The credit will be added to your account after the order's been placed and before your first bill\. It can only be used as credit\./,
      ),
    ).toBeInTheDocument();
    const link = screen.getByRole("link", {
      name: "See more terms to find out more",
    });
    expect(link).toBeInTheDocument();
    expect(link.closest("a")).toHaveAttribute(
      "href",
      "https://example.com/terms",
    );
    expect(link.closest("a")).toHaveAttribute("target", "_blank");
  });

  it("should render both a gift card and a discount promotion correctly", () => {
    const mockAffiliateSession = {
      displayItems: {
        termsAndConditionsLink: "https://example.com/terms",
      },
    };
    mockUseJoinFlowStore.mockReturnValue({
      selectedPackage: {
        offers: [
          {
            blockType: "giftCardBlock",
            value: 25,
          },
          {
            blockType: "promotionBlock",
            promotion: {
              id: "promo-1",
              term: "wholeContract",
              value: [
                {
                  value: 5,
                  blockType: "fixedValue",
                },
              ],
            },
          },
        ],
      },
      eeroSelection: null,
      affiliateSession: mockAffiliateSession,
    });

    render(<IncludedOffers />);

    expect(screen.getByText("Your gift card offer")).toBeInTheDocument();
    expect(screen.getByText("Your monthly discount offer")).toBeInTheDocument();
    expect(
      screen.getByText(
        /If you're eligible \(you can't have been a Cuckoo customer before\), you'll get a gift card by email after 90 days\. This is where you can pick the retailer you'd like to shop with\./,
      ),
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        /As a new customer, you'll get £5 off your bill each month for your first 24 months\. The discount is automatically applied, starting from your first bill\./,
      ),
    ).toBeInTheDocument();
    const links = screen.getAllByRole("link", {
      name: "See more: cuckoo.co/terms",
    });
    expect(links).toHaveLength(2);
    links.forEach((link) => {
      expect(link.closest("a")).toHaveAttribute(
        "href",
        "https://example.com/terms",
      );
      expect(link.closest("a")).toHaveAttribute("target", "_blank");
      expect(link.closest("a")).toHaveClass("text-ui-link");
    });
  });
});
