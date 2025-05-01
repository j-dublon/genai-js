import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";

import { paymentDetailsText } from "@/components/ReviewYourBasket/ReviewYourBasketProps";
import { BroadbandPackage, EeroProduct } from "@/store/useJoinFlowStore";

import { BasketDialog } from "./index";

describe("BasketDialog", () => {
  const mockOnClose = vi.fn();
  const mockOnPlanChange = vi.fn();
  const mockOnEeroSelect = vi.fn();
  const mockOnEeroRemove = vi.fn();
  const mockOnAddressChange = vi.fn();

  const mockSelectedPackage: BroadbandPackage = {
    id: "test-pkg",
    name: "Test Package",
    speed: {
      download: 150,
      upload: 30,
    },
    price: {
      monthly: 32,
      setup: 0,
    },
    priceIncrease: {
      nextYearIncrease: 3,
      followingYearIncrease: 3,
    },
    contractLength: 12,
    description: "Test package description",
  };

  const mockEeroSelection: EeroProduct = {
    id: "no-additional-eero",
    name: "No additional eero device",
    description: "Just one eero provided by us.",
    price: 0,
    isSelected: true,
  };

  const mockEeroProducts: EeroProduct[] = [
    mockEeroSelection,
    {
      id: "eero-6",
      name: "eero 6",
      description: "Enhanced coverage with one additional eero.",
      price: 5,
      isSelected: false,
    },
    {
      id: "eero-6-plus",
      name: "eero 6 Plus",
      description: "Maximum coverage with two additional eeros.",
      price: 8,
      isSelected: false,
    },
  ];

  const mockAvailablePackages: BroadbandPackage[] = [
    {
      id: "test-pkg-2",
      name: "Test Package 2",
      speed: {
        download: 300,
        upload: 50,
      },
      price: {
        monthly: 38,
        setup: 0,
      },
      priceIncrease: {
        nextYearIncrease: 4,
        followingYearIncrease: 4,
      },
      contractLength: 12,
      description: "Another test package",
    },
  ];

  const mockServiceAddress = {
    line1: "123 Test Street",
    line2: "Test Area",
    line3: "Test City",
  };

  const mockNextPage = { name: "Next Page" };

  const renderComponent = (
    props: Partial<Parameters<typeof BasketDialog>[0]> = {},
  ) => {
    return render(
      <BasketDialog
        isOpen={true}
        onClose={mockOnClose}
        nextPage={mockNextPage}
        selectedPackage={mockSelectedPackage}
        eeroSelection={mockEeroSelection}
        availablePackages={mockAvailablePackages}
        eeroProducts={mockEeroProducts}
        serviceAddress={mockServiceAddress}
        onPlanChange={mockOnPlanChange}
        onEeroSelect={mockOnEeroSelect}
        onEeroRemove={mockOnEeroRemove}
        onAddressChange={mockOnAddressChange}
        {...props}
      />,
    );
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should not be open when isOpen is false", () => {
    render(
      <BasketDialog
        isOpen={false}
        onClose={mockOnClose}
        nextPage={mockNextPage}
        selectedPackage={mockSelectedPackage}
        eeroSelection={mockEeroSelection}
        availablePackages={mockAvailablePackages}
        eeroProducts={mockEeroProducts}
        serviceAddress={mockServiceAddress}
        onPlanChange={mockOnPlanChange}
        onEeroSelect={mockOnEeroSelect}
        onEeroRemove={mockOnEeroRemove}
        onAddressChange={mockOnAddressChange}
      />,
    );

    const dialog = screen.queryByRole("dialog");
    expect(dialog).not.toBeInTheDocument();
  });

  it("should render the dialog title when open", () => {
    renderComponent();
    expect(screen.getByText(paymentDetailsText.title)).toBeInTheDocument();
  });

  it("should display service address when provided", () => {
    renderComponent();

    expect(
      screen.getByText(paymentDetailsText.yourAddress),
    ).toBeInTheDocument();
    expect(
      screen.getByText(/123 Test Street, Test Area, Test City/),
    ).toBeInTheDocument();
  });

  it("should display the change plan option", async () => {
    renderComponent();
    const user = userEvent.setup();

    const changePlanButton = screen.getByText(paymentDetailsText.changePlan);
    expect(changePlanButton).toBeInTheDocument();

    await user.click(changePlanButton);

    expect(
      screen.getByText(paymentDetailsText.selectDifferentPlan),
    ).toBeInTheDocument();
  });

  it("should not display eero section when eeroSelection is null", () => {
    renderComponent({ eeroSelection: null });

    expect(
      screen.queryByText(paymentDetailsText.yourMeshNetwork),
    ).not.toBeInTheDocument();
    expect(
      screen.queryByText("No additional eero device"),
    ).not.toBeInTheDocument();
  });

  it("should not display the subtotal section when eeroSelection is null", () => {
    renderComponent({ eeroSelection: null });

    expect(
      screen.queryByText(paymentDetailsText.yourSubtotal),
    ).not.toBeInTheDocument();
    expect(
      screen.queryByText(paymentDetailsText.yourTotal),
    ).not.toBeInTheDocument();
  });

  it("should call onClose when the close button is clicked", async () => {
    renderComponent();
    const user = userEvent.setup();

    const closeButton = screen.getByRole("button", { name: "" });
    await user.click(closeButton);

    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });

  it("should show eero selection form when add more eeros is clicked", async () => {
    renderComponent();
    const user = userEvent.setup();

    const addMoreEerosButton = screen.getByText(
      paymentDetailsText.addMoreEeros,
    );
    await user.click(addMoreEerosButton);

    expect(
      screen.getByText(paymentDetailsText.chooseEeroSetup),
    ).toBeInTheDocument();
  });

  it("should call onAddressChange when start again is clicked", async () => {
    renderComponent();
    const user = userEvent.setup();

    const startAgainButton = screen.getByText(paymentDetailsText.startAgain);
    await user.click(startAgainButton);

    expect(mockOnAddressChange).toHaveBeenCalledTimes(1);
  });

  it("should handle eero selection", async () => {
    renderComponent();
    const user = userEvent.setup();

    const addMoreEerosButton = screen.getByText(
      paymentDetailsText.addMoreEeros,
    );
    await user.click(addMoreEerosButton);

    const eero6 = screen.getByText("eero 6");
    await user.click(eero6);

    expect(mockOnEeroSelect).toHaveBeenCalledWith(mockEeroProducts[1]);
  });

  it("should show eero price in subtotal when premium eero is selected", () => {
    const premiumEero: EeroProduct = {
      id: "eero-6",
      name: "eero 6",
      description: "Enhanced coverage with one additional eero.",
      price: 5,
      isSelected: true,
    };

    renderComponent({ eeroSelection: premiumEero });

    const eeroPrice = screen.getAllByText((content) =>
      content.includes("£5"),
    )[0];
    expect(eeroPrice).toBeInTheDocument();

    const monthlyTotal = screen.getAllByText((content) =>
      content.includes("£37"),
    )[0];
    expect(monthlyTotal).toBeInTheDocument();
  });
});
