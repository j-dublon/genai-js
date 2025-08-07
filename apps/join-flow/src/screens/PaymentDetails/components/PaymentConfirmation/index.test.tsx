import { submitBasket } from "@services/helpers/submitBasket";
import { updateBasket } from "@services/helpers/updateBasket";
import useJoinFlowStore from "@store/useJoinFlowStore";
import { act, render, screen, within } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import { useRouter } from "next/navigation";
import { beforeEach, describe, expect, it, vi } from "vitest";

import { accessibilityModalText } from "./Accessibility/AccessibilityProps";
import { PaymentConfirmation } from "./index";
import { paymentConfirmationText } from "./PaymentConfirmationProps";

vi.mock("@cuckoointernet/util-squid-network-requests", () => ({
  squidAPI: {
    getBasket: vi.fn().mockReturnValue({
      id: "123",
      updatedAt: new Date().toISOString(),
      createdAt: new Date().toISOString(),
      cics: {
        summaryHref: "https://s3.cuckoo.co/contractSummary",
        informationHref: "https://s3.cuckoo.co/contractInformation",
      },
    }),
  },
}));

vi.mock("next/navigation", () => ({
  useRouter: vi.fn(),
}));

vi.mock("@/components/Stepper", () => ({
  default: () => <div data-testid="stepper">Stepper Component</div>,
}));

vi.mock("@/components/StepNavigationWithBasket", () => ({
  StepNavigationWithBasket: () => (
    <div data-testid="step-navigation">Step Navigation</div>
  ),
}));

interface PaymentDocumentItem {
  name: string;
  text: string;
  href: string;
}

vi.mock("../PaymentDocuments", () => ({
  PaymentDocuments: ({ items }: { items: PaymentDocumentItem[] }) => (
    <div data-testid="payment-documents">
      {items.map((item: PaymentDocumentItem) => (
        <a key={item.name} data-testid={item.text} href={item.href}>
          {item.text}
        </a>
      ))}
    </div>
  ),
}));

vi.mock("./PaymentSummary", () => ({
  default: () => <div data-testid="payment-summary">Payment Summary</div>,
}));

vi.mock("./PaymentAccountDetails", () => ({
  default: () => (
    <div data-testid="payment-account-details">Payment Account Details</div>
  ),
}));

vi.mock("./PaymentGoLiveDetails", () => ({
  default: () => (
    <div data-testid="payment-go-live-details">Payment Go Live Details</div>
  ),
}));

interface TermsState {
  termsAgreed: boolean;
  directDebitAgreed: boolean;
  creditSearchAgreed: boolean;
}

vi.mock("./PaymentTermsAndConditions", () => ({
  default: ({
    onChange,
    initialState,
  }: {
    onChange: (allChecked: boolean, state: TermsState) => void;
    initialState: TermsState;
  }) => {
    const handleChange = (field: keyof TermsState) => {
      const newState = { ...initialState, [field]: !initialState[field] };
      const allChecked =
        newState.termsAgreed &&
        newState.directDebitAgreed &&
        newState.creditSearchAgreed;
      onChange(allChecked, newState);
    };
    return (
      <div data-testid="payment-terms">
        <input type="checkbox" onChange={() => handleChange("termsAgreed")} />
        <input
          type="checkbox"
          onChange={() => handleChange("directDebitAgreed")}
        />
        <input
          type="checkbox"
          onChange={() => handleChange("creditSearchAgreed")}
        />
      </div>
    );
  },
}));

vi.mock("./Accessibility/AccessibilityRequirements", () => ({
  AccessibilityRequirements: () => {
    const { setAccessibilityRequirements } = useJoinFlowStore();
    return (
      <div data-testid="accessibility-requirements">
        <input
          type="checkbox"
          aria-label="Yes, I have specific requirements or needs"
          onChange={(e) => {
            if (e.target.checked) {
              const dialog = document.querySelector(
                '[data-testid="accessibility-modal"]',
              ) as HTMLDialogElement;
              dialog?.showModal();
            }
          }}
        />
        <dialog data-testid="accessibility-modal">
          <h2 id="modal-title">
            {accessibilityModalText.accessibilityRequirementsModalTitle}
          </h2>
          <button
            onClick={() =>
              setAccessibilityRequirements({ blindVisionImpaired: true })
            }
          >
            Blind or Vision impaired
          </button>
          <button
            onClick={() => {
              const dialog = document.querySelector(
                '[data-testid="accessibility-modal"]',
              ) as HTMLDialogElement;
              dialog?.close();
            }}
          >
            {accessibilityModalText.submitButtonText}
          </button>
        </dialog>
      </div>
    );
  },
}));

vi.mock("@services/helpers/updateBasket", () => ({
  updateBasket: vi.fn(),
}));
const mockUpdateBasket = vi.mocked(updateBasket);

vi.mock("@services/helpers/submitBasket", () => ({
  submitBasket: vi.fn(),
}));
const mockSubmitBasket = vi.mocked(submitBasket);

vi.mock("@services/helpers/createVulnerabilityAndAccessibility", () => ({
  createVulnerabilityAndAccessibility: vi.fn().mockResolvedValue({
    vulnerabilityAndAccessibility: { blindVisionImpaired: true },
  }),
}));

const scrollToTopMock = vi.fn();
vi.mock("@/hooks/useScrollToElement", () => ({
  useScrollToElement: () => scrollToTopMock,
}));

describe("PaymentConfirmation", () => {
  const mockRouter = {
    push: vi.fn(),
  };

  beforeAll(() => {
    HTMLDialogElement.prototype.show = vi.fn(function mock(
      this: HTMLDialogElement,
    ) {
      this.open = true;
    });
    HTMLDialogElement.prototype.showModal = vi.fn(function mock(
      this: HTMLDialogElement,
    ) {
      this.open = true;
    });
    HTMLDialogElement.prototype.close = vi.fn(function mock(
      this: HTMLDialogElement,
    ) {
      this.open = false;
    });
  });

  beforeEach(() => {
    vi.clearAllMocks();
    (useRouter as unknown as ReturnType<typeof vi.fn>).mockReturnValue(
      mockRouter,
    );
    mockUpdateBasket.mockResolvedValue({
      basket: {
        id: "123",
        updatedAt: new Date().toISOString(),
        createdAt: new Date().toISOString(),
      },
    });
    mockSubmitBasket.mockResolvedValue({
      type: "success",
    });

    const store = useJoinFlowStore.getState();
    store.setPaymentDetails({
      accountholderName: "Test User",
      accountNumber: "12345678",
      sortCode: "12-34-56",
      isAccountHolder: true,
      billingAddress: undefined,
      sameAsServiceAddress: true,
      termsAgreed: false,
      directDebitAgreed: false,
      creditSearchAgreed: false,
      allTermsAgreed: false,
    });
    store.setBasket({
      id: "123",
      updatedAt: new Date().toISOString(),
      createdAt: new Date().toISOString(),
      cics: {
        summaryHref: "https://s3.cuckoo.co/contractSummary",
        informationHref: "https://s3.cuckoo.co/contractInformation",
      },
    });
    store.setAccessibilityRequirements(null);
    store.setAffiliateSession({
      id: "abc",
      sessionId: "6852b406eb7af90001c66918",
      affiliateName: "default",
      displayItems: {
        termsAndConditionsLink: "https://cms.cuckoo.co/tacs",
        privacyPolicyLink: "https://cms.cuckoo.co/privacy",
      },
    });
    store.setGoLiveDetails({
      selectedDate: "2024-01-15",
      engineerTimeSlot: {
        startDateTime: "2024-01-15T09:00:00Z",
        endDateTime: "2024-01-15T11:00:00Z",
        selectionIdentifier: "slot-123",
      },
    });
  });

  afterAll(() => {
    vi.clearAllMocks();
  });

  const { accountDetailsTitle, signUpText } = paymentConfirmationText;

  it("renders the main sections", () => {
    render(<PaymentConfirmation onGoBack={() => {}} onComplete={() => {}} />);
    expect(screen.getByText(accountDetailsTitle)).toBeInTheDocument();
    expect(screen.getByTestId("termsAndConditions")).toBeInTheDocument();
    expect(scrollToTopMock).toHaveBeenCalled();
  });

  it("handles back button click correctly", async () => {
    const user = userEvent.setup();
    const mockOnGoBackHandler = vi.fn();
    render(
      <PaymentConfirmation
        onGoBack={mockOnGoBackHandler}
        onComplete={() => {}}
      />,
    );
    const backButton = screen.getByRole("button", { name: /back/i });
    await user.click(backButton);
    expect(mockOnGoBackHandler).toHaveBeenCalled();
  });

  it("handles confirm button click correctly when terms are agreed", async () => {
    const user = userEvent.setup();
    const mockOnCompleteHandler = vi.fn();
    render(
      <PaymentConfirmation
        onGoBack={() => {}}
        onComplete={mockOnCompleteHandler}
      />,
    );
    await act(async () => {
      const termsSection = screen.getByTestId("payment-terms");
      const termsCheckboxes = within(termsSection as HTMLElement).getAllByRole(
        "checkbox",
      );
      for (const checkbox of termsCheckboxes) {
        await user.click(checkbox);
      }
    });
    const confirmButton = screen.getByRole("button", { name: signUpText });
    await user.click(confirmButton);
    const paymentDetails = useJoinFlowStore.getState().paymentDetails;
    expect(paymentDetails).toEqual(
      expect.objectContaining({
        termsAgreed: true,
        directDebitAgreed: true,
        creditSearchAgreed: true,
        allTermsAgreed: true,
      }),
    );
    expect(mockUpdateBasket).toHaveBeenCalledWith("123", {
      optIns: {
        creditSearchAgreed: true,
        directDebitAgreed: true,
        termsAgreed: true,
      },
      vulnerabilityAndAccessibility: undefined,
    });
    expect(mockSubmitBasket).toHaveBeenCalledWith("123");
    expect(mockOnCompleteHandler).toHaveBeenCalled();
  });

  it("confirm button is disabled when terms are not agreed", () => {
    render(<PaymentConfirmation onGoBack={() => {}} onComplete={() => {}} />);
    const confirmButton = screen.getByRole("button", {
      name: paymentConfirmationText.signUpText,
    });
    expect(confirmButton).toBeDisabled();
  });

  it("handles confirm button click correctly when terms are agreed and accessibility requirements are selected", async () => {
    const user = userEvent.setup();
    const mockOnCompleteHandler = vi.fn();
    render(
      <PaymentConfirmation
        onGoBack={() => {}}
        onComplete={mockOnCompleteHandler}
      />,
    );
    await act(async () => {
      const termsSection = screen.getByTestId("payment-terms");
      const termsCheckboxes = within(termsSection as HTMLElement).getAllByRole(
        "checkbox",
      );
      for (const checkbox of termsCheckboxes) {
        await user.click(checkbox);
      }
    });
    const accessibilityCheckbox = screen.getByRole("checkbox", {
      name: "Yes, I have specific requirements or needs",
    });
    await user.click(accessibilityCheckbox);
    const blindVisionButton = screen.getByText("Blind or Vision impaired");
    await user.click(blindVisionButton);
    const submitButton = screen.getByRole("button", {
      name: accessibilityModalText.submitButtonText,
    });
    await user.click(submitButton);
    const confirmButton = screen.getByRole("button", { name: signUpText });
    await user.click(confirmButton);
    const accessibilityRequirements =
      useJoinFlowStore.getState().accessibilityRequirements;
    expect(accessibilityRequirements).toEqual(
      expect.objectContaining({ blindVisionImpaired: true }),
    );
    expect(mockUpdateBasket).toHaveBeenCalledWith("123", {
      optIns: {
        creditSearchAgreed: true,
        directDebitAgreed: true,
        termsAgreed: true,
      },
      vulnerabilityAndAccessibility: { blindVisionImpaired: true },
    });
    expect(mockOnCompleteHandler).toHaveBeenCalled();
  });

  it("opens accessibility modal when accessibility requirements checkbox is clicked", async () => {
    const user = userEvent.setup();
    render(<PaymentConfirmation onGoBack={() => {}} onComplete={() => {}} />);
    const accessibilityCheckbox = screen.getByRole("checkbox", {
      name: "Yes, I have specific requirements or needs",
    });
    const accessibilityModal = screen.getByTestId(
      "accessibility-modal",
    ) as HTMLDialogElement;
    expect(accessibilityModal).toBeInTheDocument();
    expect(accessibilityModal.open).toBe(false);
    await user.click(accessibilityCheckbox);
    expect(accessibilityModal.open).toBe(true);
    expect(screen.getByText("Blind or Vision impaired")).toBeVisible();
  });

  it("shows the CICS buttons that link to the intended resources", () => {
    render(<PaymentConfirmation onGoBack={() => {}} onComplete={() => {}} />);
    expect(screen.getByTestId("Contract Summary")).toHaveAttribute(
      "href",
      "https://s3.cuckoo.co/contractSummary",
    );
    expect(screen.getByTestId("Contract Information")).toHaveAttribute(
      "href",
      "https://s3.cuckoo.co/contractInformation",
    );
    expect(screen.getByTestId("Terms & Conditions")).toHaveAttribute(
      "href",
      "https://cms.cuckoo.co/tacs",
    );
    expect(screen.getByTestId("Privacy Notice")).toHaveAttribute(
      "href",
      "https://cms.cuckoo.co/privacy",
    );
  });

  it("handles missing basket ID", async () => {
    const user = userEvent.setup();
    const consoleErrorSpy = vi
      .spyOn(console, "error")
      .mockImplementation(() => {});
    const store = useJoinFlowStore.getState();
    store.setBasket({
      id: undefined as unknown as string,
      updatedAt: new Date().toISOString(),
      createdAt: new Date().toISOString(),
    });
    render(<PaymentConfirmation onGoBack={() => {}} onComplete={() => {}} />);
    const termsSection = screen.getByTestId("payment-terms");
    const termsCheckboxes = within(termsSection as HTMLElement).getAllByRole(
      "checkbox",
    );
    for (const checkbox of termsCheckboxes) {
      await user.click(checkbox);
    }
    const confirmButton = screen.getByRole("button", { name: signUpText });
    await user.click(confirmButton);
    expect(consoleErrorSpy).toHaveBeenCalledWith(
      "Basket ID is required to update basket",
    );
    expect(mockUpdateBasket).not.toHaveBeenCalled();
    expect(mockSubmitBasket).not.toHaveBeenCalled();
    consoleErrorSpy.mockRestore();
  });
});
