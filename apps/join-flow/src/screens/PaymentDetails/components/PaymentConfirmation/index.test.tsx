import useJoinFlowStore from "@store/useJoinFlowStore";
import { act, fireEvent, render, screen, within } from "@testing-library/react";
import { useRouter } from "next/navigation";
import { beforeEach, describe, expect, it, vi } from "vitest";

import { PaymentConfirmation } from "./index";
import { paymentConfirmationText } from "./PaymentConfirmationProps";

vi.mock("next/navigation", () => ({
  useRouter: vi.fn(),
}));

vi.mock("@/components/Stepper", () => ({
  default: () => <div data-testid="stepper">Stepper Component</div>,
}));

describe("PaymentConfirmation", () => {
  const mockRouter = {
    push: vi.fn(),
  };

  beforeAll(() => {
    HTMLDialogElement.prototype.show = vi.fn();
    HTMLDialogElement.prototype.showModal = vi.fn();
    HTMLDialogElement.prototype.close = vi.fn();
  });

  beforeEach(() => {
    vi.clearAllMocks();
    (useRouter as unknown as ReturnType<typeof vi.fn>).mockReturnValue(
      mockRouter,
    );

    const store = useJoinFlowStore.getState();
    store.setPaymentDetails({
      accountholderName: "Test User",
      cardToken: "bank_account",
      accountNumber: "12345678",
      sortCode: "12-34-56",
      isAccountHolder: true,
      billingAddress: null,
      sameAsServiceAddress: true,
      termsAgreed: false,
      directDebitAgreed: false,
      creditSearchAgreed: false,
      allTermsAgreed: false,
    });
  });

  afterAll(() => {
    vi.clearAllMocks();
  });

  it("renders the main sections", () => {
    render(<PaymentConfirmation />);
    expect(
      screen.getByRole("heading", { name: paymentConfirmationText.title }),
    ).toBeInTheDocument();
    expect(
      screen.getByText(paymentConfirmationText.directDebitDetailsTitle),
    ).toBeInTheDocument();
    expect(
      screen.getByText(paymentConfirmationText.accountDetailsTitle),
    ).toBeInTheDocument();
    expect(
      screen.getByText(paymentConfirmationText.goLiveDetailsTitle),
    ).toBeInTheDocument();
    expect(
      screen.getByText(paymentConfirmationText.termsAndConditionsTitle),
    ).toBeInTheDocument();
  });

  it("handles back button click correctly", () => {
    render(<PaymentConfirmation />);

    const backButton = screen.getByRole("button", { name: /back/i });
    fireEvent.click(backButton);

    expect(mockRouter.push).toHaveBeenCalledWith("/join-flow/payment-details");
  });

  it("handles confirm button click correctly when terms are agreed", async () => {
    render(<PaymentConfirmation />);

    await act(async () => {
      const termsSection = screen.getByText(
        paymentConfirmationText.termsAndConditionsTitle,
      ).nextSibling;
      const termsCheckboxes = within(termsSection as HTMLElement).getAllByRole(
        "checkbox",
      );

      termsCheckboxes.forEach((checkbox) => {
        fireEvent.click(checkbox);
      });
    });

    const confirmButton = screen.getByRole("button", {
      name: paymentConfirmationText.signUpText,
    });
    fireEvent.click(confirmButton);

    const paymentDetails = useJoinFlowStore.getState().paymentDetails;
    expect(paymentDetails).toEqual(
      expect.objectContaining({
        termsAgreed: true,
        directDebitAgreed: true,
        creditSearchAgreed: true,
        allTermsAgreed: true,
      }),
    );

    expect(mockRouter.push).toHaveBeenCalledWith("/join-flow/order-summary");
  });

  it("confirm button is disabled when terms are not agreed", () => {
    render(<PaymentConfirmation />);

    const confirmButton = screen.getByRole("button", {
      name: paymentConfirmationText.signUpText,
    });
    expect(confirmButton).toBeDisabled();
  });

  it("opens accessibility modal when accessibility requirements checkbox is clicked", async () => {
    render(<PaymentConfirmation />);

    const accessibilityCheckbox = screen.getByRole("checkbox", {
      name: "Yes, I have specific requirements or needs",
    });

    await act(async () => {
      fireEvent.click(accessibilityCheckbox);
    });

    expect(HTMLDialogElement.prototype.showModal).toHaveBeenCalled();

    expect(
      screen.getByText(
        paymentConfirmationText.accessibilityRequirementsModalTitle,
      ),
    ).toBeInTheDocument();
  });
});
