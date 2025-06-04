import { render, screen } from "@testing-library/react";

import { PackageTitle } from "./PackageTitle";

describe("PackageTitle", () => {
  it("renders package name and details correctly", () => {
    const mockPackage = {
      id: "c-150",
      name: "Super Fast Broadband",
      speed: {
        download: 100,
        upload: 20,
      },
      price: {
        monthly: 30,
        setup: 0,
      },
      priceIncrease: {
        nextYearIncrease: 3.0,
        followingYearIncrease: 3.0,
      },
      contractLength: 24,
      description: "Full fibre speed",
    };

    render(<PackageTitle pkg={mockPackage} />);

    expect(screen.getByText("Super Fast Broadband")).toBeInTheDocument();

    expect(
      screen.getByText("100Mbps full fibre speed, 24-month contract"),
    ).toBeInTheDocument();
  });
});
