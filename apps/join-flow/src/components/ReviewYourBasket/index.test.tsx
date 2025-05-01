import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";

import useJoinFlowStore from "@/store/useJoinFlowStore";

import { ReviewYourBasket } from "./index";

vi.mock("@/store/useJoinFlowStore", () => ({
  default: vi.fn(),
}));

HTMLDialogElement.prototype.showModal = vi.fn();
HTMLDialogElement.prototype.close = vi.fn();

describe("ReviewYourBasket", () => {
  beforeEach(() => {
    vi.clearAllMocks();

    (useJoinFlowStore as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
      selectedPackage: {
        name: "Test Package",
        speed: { download: "100Mbps", upload: "20Mbps" },
        price: { monthly: 29.99 },
      },
      eeroSelection: {
        name: "eero Pro 6",
        description: "Test description",
        price: 9.99,
      },
      serviceAddress: {
        line1: "123 Test Street",
        line2: "Test Town",
        line3: "Test City",
      },
    });
  });

  it("should render basket button", () => {
    render(<ReviewYourBasket />);
    const button = screen.getByText("View Basket");
    expect(button).toBeInTheDocument();
  });

  it("should open dialog when button is clicked", async () => {
    render(<ReviewYourBasket />);
    const user = userEvent.setup();
    const button = screen.getByText("View Basket");

    await user.click(button);

    expect(HTMLDialogElement.prototype.showModal).toHaveBeenCalled();
  });

  it("should close dialog when close button is clicked", async () => {
    render(<ReviewYourBasket />);
    const user = userEvent.setup();
    const button = screen.getByText("View Basket");
    await user.click(button);
    const closeButton = screen.getByLabelText("Close dialog");
    await user.click(closeButton);
    expect(HTMLDialogElement.prototype.close).toHaveBeenCalled();
  });

  it("should display package information when available", async () => {
    render(<ReviewYourBasket />);
    const user = userEvent.setup();
    const button = screen.getByText("View Basket");
    await user.click(button);
    expect(screen.getByText("Review my basket")).toBeInTheDocument();
    const packageElements = screen.getAllByText(/Test Package/);
    expect(packageElements.length).toBeGreaterThan(0);
    const speedElements = screen.getAllByText(/100Mbps/);
    expect(speedElements.length).toBeGreaterThan(0);
    const priceElement = screen.getByText((content) => {
      return content.includes("29.99");
    });
    expect(priceElement).toBeInTheDocument();
  });

  it("should display eero information when available", async () => {
    render(<ReviewYourBasket />);
    const user = userEvent.setup();
    const button = screen.getByText("View Basket");
    await user.click(button);
    expect(screen.getByText("Your mesh network:")).toBeInTheDocument();
    const eeroElements = screen.getAllByText(/eero Pro 6/);
    expect(eeroElements.length).toBeGreaterThan(0);
    expect(screen.getByText("Test description")).toBeInTheDocument();
  });

  it("should display address information when available", async () => {
    render(<ReviewYourBasket />);
    const user = userEvent.setup();
    const button = screen.getByText("View Basket");
    await user.click(button);
    expect(
      screen.getByText(/123 Test Street, Test Town, Test City/),
    ).toBeInTheDocument();
  });

  it("should show error message when no package is selected", () => {
    (useJoinFlowStore as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
      selectedPackage: null,
      eeroSelection: null,
      serviceAddress: null,
    });

    render(<ReviewYourBasket />);

    expect(
      screen.getByText("Oops have you selected a package"),
    ).toBeInTheDocument();
  });
});
