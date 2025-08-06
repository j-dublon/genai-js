import { render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import type { PricingCalculations } from "@/hooks/usePricingCalculations";
import type { EeroOption } from "@/lib/createEeroOptions";
import type {
  EeroProduct,
  StoreSelectedPackage,
} from "@/store/useJoinFlowStore";

import { Subtotal } from "./Subtotal";

describe("Subtotal", () => {
  const mockPricingText = {
    title: "Your Subtotal",
    subtitle: "Your total",
    perMonth: "/month",
    contractText: "-month contract",
    eeroRouters: "eero routers",
    installationText: "Installation / set-up fee",
    fullFiber: "full fibre",
    discountPeriodText: "/month for the first 6 months",
    afterText: "/month afterwards",
    savingText: "You're saving £TOTAL_PLAN_SAVING on this plan",
    promotionPillText: "PROMOTION_TEXT is in the bag",
  };

  const mockSelectedPackage: StoreSelectedPackage = {
    krakenProductCode: "BT-150-24M_38",
    frontendIdentifier: "150-24",
    termMonths: 24,
    frontendTitle: "C-150",
    selectionIdentifier: "0",
    installationRequired: true,
    appliedPromotionUUIDs: [],
    prices: {
      broadband: {
        basePrice: 3200,
        discount: 200,
        customerPriceIncDiscount: 3000,
        annualPriceRise: [
          {
            price: 3500,
            date: "2027-04-01T12:00:00.000Z",
            id: "test-rise-1",
          },
          {
            price: 3800,
            date: "2028-04-01T12:00:00.000Z",
            id: "test-rise-2",
          },
        ],
      },
    },
    speeds: {
      download: 150,
      upload: 30,
    },
    availableExtras: null,
    offers: [
      {
        blockType: "promotionBlock",
        promotion: {
          id: "test-promotion-id",
          term: "wholeContract",
          value: [
            {
              blockType: "fixedValue" as const,
              value: 2,
            },
          ],
        },
      },
    ],
    id: "test-pkg-id",
  };

  const mockEeroSelection: EeroProduct = {
    code: "EERO_MESH_ROUTER_X1",
    family: "mesh_routers",
    selectionIdentifier: "1",
    price: 0,
  };

  const mockEeroSelectionWithPrice: EeroProduct = {
    code: "EERO_MESH_ROUTER_X2",
    family: "mesh_routers",
    selectionIdentifier: "2",
    price: 500,
  };

  const mockEeroProducts: EeroOption[] = [
    {
      code: "EERO_MESH_ROUTER_X1",
      family: "mesh_routers",
      selectionIdentifier: "1",
      price: 0,
      heading: "No additional Eero needed",
      description: "Just one eero provided by us.",
      imageURL: "",
      totalCount: 1,
    },
    {
      code: "EERO_MESH_ROUTER_X2",
      family: "mesh_routers",
      selectionIdentifier: "2",
      price: 500,
      heading: "Add one extra eero to your plan",
      description: "2 eeros are amazing",
      imageURL: "",
      totalCount: 2,
    },
    {
      code: "EERO_MESH_ROUTER_X3",
      family: "mesh_routers",
      selectionIdentifier: "3",
      price: 1000,
      heading: "Add 2 extra eeros to your plan",
      description: "3 eeros are incredible",
      imageURL: "",
      totalCount: 3,
    },
  ];

  describe("when product has discounted pricing", () => {
    const mockDiscountedPricing: PricingCalculations = {
      monthlyPackagePrice: "32",
      discountedPrice: "30",
      monthlyEeroPrice: "0",
      monthlyTotal: "32",
      discountedMonthlyTotal: "30",
      predictedTotalNext: "38",
      predictedTotalFollowing: "42",
      nextPrice: "35",
      followingPrice: "38",
      totalPlanSaving: "48",
      monthlySaving: "2",
      nextPriceRiseAmount: "3",
      followingPriceRiseAmount: "3",
      packageName: "150Mbps",
    };

    it("should display discounted price with discount period text", () => {
      render(
        <Subtotal
          pricing={mockDiscountedPricing}
          selectedPackage={mockSelectedPackage}
          eeroSelection={mockEeroSelection}
          pricingText={mockPricingText}
          eeroProducts={mockEeroProducts}
        />,
      );

      expect(
        screen.getByText((content, element) => {
          return element?.textContent === "£30/month for the first 6 months";
        }),
      ).toBeInTheDocument();
    });

    it("should display original price with after text when discounted", () => {
      render(
        <Subtotal
          pricing={mockDiscountedPricing}
          selectedPackage={mockSelectedPackage}
          eeroSelection={mockEeroSelection}
          pricingText={mockPricingText}
          eeroProducts={mockEeroProducts}
        />,
      );

      expect(
        screen.getByText((content, element) => {
          return element?.textContent === "£32/month afterwards";
        }),
      ).toBeInTheDocument();
    });

    it("should display total with after discount period text", () => {
      render(
        <Subtotal
          pricing={mockDiscountedPricing}
          selectedPackage={mockSelectedPackage}
          eeroSelection={mockEeroSelection}
          pricingText={mockPricingText}
          eeroProducts={mockEeroProducts}
        />,
      );

      expect(
        screen.getByText((content, element) => {
          return element?.textContent === "£32/month afterwards";
        }),
      ).toBeInTheDocument();
    });

    it("should display future price increases when discounted", () => {
      render(
        <Subtotal
          pricing={mockDiscountedPricing}
          selectedPackage={mockSelectedPackage}
          eeroSelection={mockEeroSelection}
          pricingText={mockPricingText}
          eeroProducts={mockEeroProducts}
        />,
      );

      expect(
        screen.getByText((content, element) => {
          return element?.textContent === "£38/month from April 2027";
        }),
      ).toBeInTheDocument();

      expect(
        screen.getByText((content, element) => {
          return element?.textContent === "£42/month from April 2028";
        }),
      ).toBeInTheDocument();
    });

    it("should display offer text when provided", () => {
      render(
        <Subtotal
          pricing={mockDiscountedPricing}
          selectedPackage={mockSelectedPackage}
          eeroSelection={mockEeroSelection}
          pricingText={mockPricingText}
          eeroProducts={mockEeroProducts}
        />,
      );

      expect(
        screen.getByText("You're saving £48 on this plan"),
      ).toBeInTheDocument();
    });

    it("does not display offer pill when no offer text is provided", () => {
      render(
        <Subtotal
          pricing={mockDiscountedPricing}
          selectedPackage={mockSelectedPackage}
          eeroSelection={mockEeroSelection}
          pricingText={mockPricingText}
          eeroProducts={mockEeroProducts}
        />,
      );

      expect(
        screen.queryByText("You're saving £100 on this plan"),
      ).not.toBeInTheDocument();
    });
  });

  describe("when product has no discount", () => {
    const mockNonDiscountedPricing: PricingCalculations = {
      monthlyPackagePrice: "32",
      discountedPrice: "32", // Same as monthlyPackagePrice = no discount
      monthlyEeroPrice: "0",
      monthlyTotal: "32",
      discountedMonthlyTotal: "32",
      predictedTotalNext: "38",
      predictedTotalFollowing: "42",
      nextPrice: "35",
      followingPrice: "38",
      monthlySaving: "0",
      totalPlanSaving: "0",
      nextPriceRiseAmount: "3",
      followingPriceRiseAmount: "3",
      packageName: "150Mbps",
    };

    it("should display only the regular price with per month text", () => {
      render(
        <Subtotal
          pricing={mockNonDiscountedPricing}
          selectedPackage={mockSelectedPackage}
          eeroSelection={mockEeroSelection}
          pricingText={mockPricingText}
          eeroProducts={mockEeroProducts}
        />,
      );

      const packagePricing = screen.getByTestId("package-pricing");
      const totalPricing = screen.getByTestId("total-pricing");

      expect(within(packagePricing).getByText("£32")).toBeInTheDocument();
      expect(within(packagePricing).getByText("/month")).toBeInTheDocument();

      expect(within(totalPricing).getByText("£32")).toBeInTheDocument();
      expect(within(totalPricing).getByText("/month")).toBeInTheDocument();

      expect(
        screen.queryByText((content, element) => {
          return element?.textContent === "for the first 3 months";
        }),
      ).not.toBeInTheDocument();

      expect(
        screen.queryByText((content, element) => {
          return element?.textContent === "afterwards";
        }),
      ).not.toBeInTheDocument();
    });
  });

  describe("eero pricing section", () => {
    it("should display correct eero count and pricing", () => {
      const mockPricingWithEero: PricingCalculations = {
        monthlyPackagePrice: "32",
        discountedPrice: "32",
        monthlyEeroPrice: "5",
        monthlyTotal: "37",
        discountedMonthlyTotal: "37",
        predictedTotalNext: "43",
        predictedTotalFollowing: "46",
        nextPrice: "35",
        followingPrice: "38",
        totalPlanSaving: "0",
        monthlySaving: "0",
        nextPriceRiseAmount: "3",
        followingPriceRiseAmount: "3",
        packageName: "150Mbps",
      };

      render(
        <Subtotal
          pricing={mockPricingWithEero}
          selectedPackage={mockSelectedPackage}
          eeroSelection={mockEeroSelectionWithPrice}
          pricingText={mockPricingText}
          eeroProducts={mockEeroProducts}
        />,
      );

      const eeroSection = screen.getByTestId("eero-pricing");
      expect(eeroSection).toHaveTextContent("x2 eero routers");
      expect(eeroSection).toHaveTextContent("£5");
      expect(eeroSection).toHaveTextContent("Installation / set-up fee");
      expect(eeroSection).toHaveTextContent("£0");
    });
  });

  describe("package information", () => {
    it("should display package details correctly", () => {
      const mockPricing: PricingCalculations = {
        monthlyPackagePrice: "32",
        discountedPrice: "32",
        monthlyEeroPrice: "0",
        monthlyTotal: "32",
        discountedMonthlyTotal: "32",
        predictedTotalNext: "38",
        predictedTotalFollowing: "42",
        nextPrice: "35",
        followingPrice: "38",
        totalPlanSaving: "0",
        monthlySaving: "0",
        nextPriceRiseAmount: "3",
        followingPriceRiseAmount: "3",
        packageName: "150Mbps",
      };

      render(
        <Subtotal
          pricing={mockPricing}
          selectedPackage={mockSelectedPackage}
          eeroSelection={mockEeroSelection}
          pricingText={mockPricingText}
          eeroProducts={mockEeroProducts}
        />,
      );

      expect(screen.getByText("150-24 full fibre")).toBeInTheDocument();
      expect(screen.getByText("24-month contract")).toBeInTheDocument();
    });
  });

  describe("edge cases", () => {
    it("should return null when selectedPackage is null", () => {
      const { container } = render(
        <Subtotal
          pricing={{} as PricingCalculations}
          selectedPackage={null!}
          eeroSelection={mockEeroSelection}
          pricingText={mockPricingText}
          eeroProducts={mockEeroProducts}
        />,
      );

      expect(container.firstChild).toBeNull();
    });

    it("should handle package without price rises", () => {
      const packageWithoutRises: StoreSelectedPackage = {
        ...mockSelectedPackage,
        prices: {
          ...mockSelectedPackage.prices,
          broadband: {
            ...mockSelectedPackage.prices.broadband,
            annualPriceRise: undefined,
          },
        },
      };

      const mockPricing: PricingCalculations = {
        monthlyPackagePrice: "32",
        discountedPrice: "32",
        monthlyEeroPrice: "0",
        monthlyTotal: "32",
        discountedMonthlyTotal: "32",
        predictedTotalNext: "32",
        predictedTotalFollowing: "32",
        nextPrice: "32",
        followingPrice: "32",
        totalPlanSaving: "0",
        monthlySaving: "0",
        nextPriceRiseAmount: "0",
        followingPriceRiseAmount: "0",
        packageName: "150Mbps",
      };

      render(
        <Subtotal
          pricing={mockPricing}
          selectedPackage={packageWithoutRises}
          eeroSelection={mockEeroSelection}
          pricingText={mockPricingText}
          eeroProducts={mockEeroProducts}
        />,
      );
      const packagePricing = screen.getByTestId("package-pricing");
      const totalPricing = screen.getByTestId("total-pricing");

      expect(within(packagePricing).getByText("£32")).toBeInTheDocument();
      expect(within(packagePricing).getByText("/month")).toBeInTheDocument();

      expect(within(totalPricing).getByText("£32")).toBeInTheDocument();
      expect(within(totalPricing).getByText("/month")).toBeInTheDocument();

      expect(screen.queryByText("from April 2027")).not.toBeInTheDocument();
      expect(screen.queryByText("from April 2028")).not.toBeInTheDocument();
    });

    it("should return null when eeroSelection is null", () => {
      const { container } = render(
        <Subtotal
          pricing={{} as PricingCalculations}
          selectedPackage={mockSelectedPackage}
          eeroSelection={null!}
          pricingText={mockPricingText}
          eeroProducts={mockEeroProducts}
        />,
      );

      expect(container.firstChild).toBeNull();
    });
  });
});
