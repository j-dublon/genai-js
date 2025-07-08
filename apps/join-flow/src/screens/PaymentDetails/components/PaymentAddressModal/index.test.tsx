import { render, screen } from "@testing-library/react";
import { createRef } from "react";
import { describe, expect, it, vi } from "vitest";

import { PaymentAddressModal } from "./index";

vi.mock("@react-component-library/ui", async () => {
  const actual = await vi.importActual("@react-component-library/ui");
  return {
    ...actual,
    InfoModal: vi.fn(({ title, children }) => (
      <div data-testid="info-modal" role="dialog" aria-labelledby="modal-title">
        <h2 id="modal-title">{title}</h2>
        <div>{children}</div>
      </div>
    )),
    TipCard: vi.fn(({ children, className }) => (
      <div data-testid="tip-card" className={className}>
        {children}
      </div>
    )),
  };
});

vi.mock("@/lib/get-asset-path", () => ({
  getAssetPath: vi.fn((path) => path),
}));

vi.mock("@/screens/PaymentDetails/forms/BillingAddressLookupForm", () => ({
  BillingAddressLookupForm: vi.fn(({ onAddressSelected, onError }) => (
    <div data-testid="billing-address-lookup-form">
      <button onClick={onAddressSelected}>Select Address</button>
      <button onClick={onError}>Trigger Error</button>
    </div>
  )),
}));

vi.mock("../PaymentAddressProps", () => ({
  paymentAddressModalText: {
    title: "Change my billing address",
    tipCardHighlight: "Important:",
    tipCardText: "Just so you know this will only affect your billing address.",
    paymentDetailsError: "Unable to update billing address, please try again.",
  },
}));

describe("PaymentAddressModal", () => {
  const renderComponent = () => {
    const modalRef = createRef<HTMLDialogElement>();
    return render(<PaymentAddressModal modalRef={modalRef} />);
  };

  it("renders InfoModal with correct title", () => {
    renderComponent();

    expect(screen.getByTestId("info-modal")).toBeInTheDocument();
    expect(screen.getByText("Change my billing address")).toBeInTheDocument();
  });

  it("renders TipCard with correct content", () => {
    renderComponent();

    expect(screen.getByTestId("tip-card")).toBeInTheDocument();
    expect(screen.getByText("Important:")).toBeInTheDocument();
    expect(
      screen.getByText(
        /Just so you know this will only affect your billing address/,
      ),
    ).toBeInTheDocument();
  });

  it("renders BillingAddressLookupForm", () => {
    renderComponent();

    expect(
      screen.getByTestId("billing-address-lookup-form"),
    ).toBeInTheDocument();
  });

  it("does not show error message initially", () => {
    renderComponent();

    expect(
      screen.queryByText("Unable to update billing address, please try again."),
    ).not.toBeInTheDocument();
  });
});
