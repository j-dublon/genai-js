import { render, screen } from "@testing-library/react";

import { StoreSelectedPackage } from "@/store/useJoinFlowStore";

import { PackageTitle } from "./PackageTitle";

describe("PackageTitle", () => {
  it("renders package name and details correctly", () => {
    const mockPackage: StoreSelectedPackage = {
      krakenProductCode: "BT-100-24M_30",
      frontendIdentifier: "150-24",
      frontendTitle: "C-150",
      termMonths: 24,
      selectionIdentifier: "0",
      installationRequired: true,
      appliedPromotionUUIDs: [],
      prices: {
        broadbandAndCurrentExtras: {
          basePrice: 3000,
          discount: 0,
          customerPriceIncDiscount: 3000,
          annualPriceRise: [
            {
              price: 3300,
              date: "2026-04-01T12:00:00.000Z",
              id: "rise-1",
            },
          ],
        },
        currentExtras: {
          basePrice: 0,
          discount: 0,
          customerPriceIncDiscount: 0,
        },
        broadband: {
          basePrice: 3000,
          discount: 0,
          customerPriceIncDiscount: 3000,
          annualPriceRise: [
            {
              price: 3300,
              date: "2026-04-01T12:00:00.000Z",
              id: "rise-1",
            },
          ],
        },
      },
      speeds: {
        download: 100,
        upload: 20,
      },
      availableExtras: null,
      offers: null,
      id: "c-150",
    };

    render(<PackageTitle pkg={mockPackage} />);

    expect(screen.getByText("C-150")).toBeInTheDocument();

    expect(
      screen.getByText("100Mbps full fibre speed, 24-month contract"),
    ).toBeInTheDocument();
  });
});
