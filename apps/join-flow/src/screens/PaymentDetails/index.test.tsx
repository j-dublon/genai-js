import useJoinFlowStore from "@store/useJoinFlowStore";
import { render, waitFor } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import { useRouter } from "next/navigation";
import { beforeEach, describe, expect, it, vi } from "vitest";

import { updateBasket } from "@/services/helpers/updateBasket";

import { PaymentDetails } from "./index";

vi.mock("next/navigation", () => ({
  useRouter: vi.fn(),
}));

vi.mock("@/services/helpers/updateBasket", () => ({
  updateBasket: vi.fn(),
}));

vi.mock("@/services/helpers/isBillingAddressEqual", () => ({
  isBillingAddressesEqual: vi.fn(),
}));

vi.mock("@/services/helpers/getCICS", () => ({
  getCICS: vi.fn().mockReturnValue({
    success: true,
    data: {
      contractSummary: "https://s3.cuckoo.co/contractSummary",
      contractInformation: "https://s3.cuckoo.co/contractInformation",
    },
  }),
}));

vi.mock("@react-component-library/ui", () => ({
  Button: ({
    children,
    onClick,
    disabled,
    type,
  }: {
    children: React.ReactNode;
    onClick?: () => void;
    disabled?: boolean;
    type?: "button" | "submit" | "reset";
  }) => (
    <button onClick={onClick} disabled={disabled} type={type}>
      {children}
    </button>
  ),
}));

vi.mock("@/components/Footer", () => ({
  Footer: () => <div data-testid="footer" />,
}));

vi.mock("@/components/StepNavigationWithBasket", () => ({
  StepNavigationWithBasket: ({ step }: { step: number }) => (
    <div data-testid={`step-${step}`} />
  ),
}));

vi.mock("./components/PaymentAddressDetails", () => ({
  default: () => <div data-testid="payment-address-details" />,
}));

vi.mock("./components/PaymentConfirmation", () => ({
  default: ({
    onGoBack,
    onComplete,
  }: {
    onGoBack: () => void;
    onComplete: () => void;
  }) => (
    <div data-testid="payment-confirmation">
      <button onClick={onGoBack}>Go Back</button>
      <button onClick={onComplete}>Complete</button>
    </div>
  ),
}));

vi.mock("./components/PaymentConfirmation/PaymentSummary", () => ({
  default: () => <div data-testid="payment-summary" />,
}));

vi.mock("./forms/PaymentForm", () => ({
  PaymentForm: ({
    onSubmit,
  }: {
    onSubmit: (data: {
      accountholderName: string;
      accountNumber: string;
      sortCode: string;
      sameAsServiceAddress: boolean;
      isAccountHolder: boolean;
    }) => void;
  }) => (
    <form
      data-testid="payment-form"
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit({
          accountholderName: "Test User",
          accountNumber: "12345678",
          sortCode: "12-34-56",
          sameAsServiceAddress: true,
          isAccountHolder: true,
        });
      }}
    >
      <button type="submit">Submit</button>
    </form>
  ),
}));

vi.mock("./PaymentDetailsProps", () => ({
  paymentDetailsText: {
    title: "Payment Details",
    paymentDetailsTitle: "Payment Details",
    directDebitDetailsTitle: "Direct Debit",
    backButtonText: "Back",
    submitButtonText: "Continue",
    submittingButtonText: "Processing...",
    addressDetailsTitle: "Address Details",
  },
}));

const mockUpdateBasket = vi.mocked(updateBasket);

describe("PaymentDetails", () => {
  const mockRouter = {
    push: vi.fn(),
  };
  beforeEach(() => {
    vi.clearAllMocks();
    (useRouter as unknown as ReturnType<typeof vi.fn>).mockReturnValue(
      mockRouter,
    );
    mockUpdateBasket.mockResolvedValue({ error: undefined });

    const store = useJoinFlowStore.getState();
    store.setCurrentStep(4);
    store.setBasket({
      id: "basket-123",
      updatedAt: new Date().toISOString(),
      createdAt: new Date().toISOString(),
    });
    store.setServiceAddress({
      line1: "123 Test St",
      line2: "Test Area",
      line3: "Test City",
      postcode: "TE5T 123",
      identifiers: [{ value: "", scheme: "", id: "0" }],
      id: "",
      selectionIdentifier: "",
    });
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it("renders payment form when not showing confirmation", () => {
    const { getByTestId } = render(<PaymentDetails />);

    expect(getByTestId("payment-form")).toBeInTheDocument();
    expect(getByTestId("payment-address-details")).toBeInTheDocument();
    expect(getByTestId("payment-summary")).toBeInTheDocument();
  });

  it("calls updateBasket when payment details have changed", async () => {
    const user = userEvent.setup();

    const store = useJoinFlowStore.getState();
    store.setPaymentDetails({
      accountholderName: "Old Name",
      accountNumber: "87654321",
      sortCode: "65-43-21",
      billingAddress: undefined,
      isAccountHolder: true,
      termsAgreed: false,
      directDebitAgreed: false,
      creditSearchAgreed: false,
      allTermsAgreed: false,
    });

    const { getByRole } = render(<PaymentDetails />);

    const submitButton = getByRole("button", { name: /submit/i });
    await user.click(submitButton);

    await waitFor(() => {
      expect(mockUpdateBasket).toHaveBeenCalledWith("basket-123", {
        billingAddress: {
          line1: "123 Test St",
          line2: "Test Area",
          line3: "Test City",
          postcode: "TE5T 123",
        },
        optIns: {
          isAccountHolder: true,
        },
        payment: {
          bankAccountHolder: "Test User",
          bankAccountNumber: "12345678",
          bankSortCode: "123456",
        },
      });
    });
  });

  it("updates payment details in store after successful API call", async () => {
    const user = userEvent.setup();
    const { getByRole } = render(<PaymentDetails />);

    const submitButton = getByRole("button", { name: /submit/i });
    await user.click(submitButton);

    await waitFor(() => {
      const paymentDetails = useJoinFlowStore.getState().paymentDetails;
      expect(paymentDetails).toEqual(
        expect.objectContaining({
          accountholderName: "Test User",
          accountNumber: "12345678",
          sortCode: "12-34-56",
          billingAddress: {
            line1: "123 Test St",
            line2: "Test Area",
            line3: "Test City",
            postcode: "TE5T 123",
          },
          sameAsServiceAddress: true,
          isAccountHolder: true,
          termsAgreed: false,
          directDebitAgreed: false,
          creditSearchAgreed: false,
          allTermsAgreed: false,
        }),
      );
    });

    const cics = useJoinFlowStore.getState().basket?.cics;
    expect(cics).toStrictEqual({
      summaryHref: "https://s3.cuckoo.co/contractSummary",
      informationHref: "https://s3.cuckoo.co/contractInformation",
    });
  });
});
