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

const mockGetCICS = vi.fn();
mockGetCICS.mockReturnValue({
  summaryHref: "https://s3.cuckoo.co/contractSummary",
  informationHref: "https://s3.cuckoo.co/contractInformation",
});

vi.mock("@/services/payloadClient", () => ({
  payloadAPI: {
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

vi.mock("@services/helpers/updateBasket", () => ({
  updateBasket: vi.fn(),
}));
const mockUpdateBasket = vi.mocked(updateBasket);

vi.mock("@services/helpers/submitBasket", () => ({
  submitBasket: vi.fn(),
}));
const mockSubmitBasket = vi.mocked(submitBasket);

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
      basket: {
        id: "123",
        updatedAt: new Date().toISOString(),
        createdAt: new Date().toISOString(),
      },
    });

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
    store.setBasket({
      id: "123",
      updatedAt: new Date().toISOString(),
      createdAt: new Date().toISOString(),
      cics: {
        summaryHref: "https://s3.cuckoo.co/some-out-of-date-value",
        informationHref: "https://s3.cuckoo.co/another-out-of-date-value",
      },
    });

    store.setAffiliateSession({
      id: "abc",
      sessionId: "6852b406eb7af90001c66918",
      affiliateName: "default",
      useCreditcheckResult: true,
      doEmailValidation: true,
      cuckooAffiliate: "",
      termsAndConditionsLink: "https://cms.cuckoo.co/tacs",
      privacyPolicyLink: "https://cms.cuckoo.co/privacy",
    });
  });

  afterAll(() => {
    vi.clearAllMocks();
  });

  const {
    title,
    directDebitDetailsTitle,
    accountDetailsTitle,
    goLiveDetailsTitle,
    signUpText,
  } = paymentConfirmationText;

  it("renders the main sections", () => {
    render(<PaymentConfirmation onGoBack={() => {}} onComplete={() => {}} />);

    expect(screen.getByRole("heading", { name: title })).toBeInTheDocument();
    expect(screen.getByText(directDebitDetailsTitle)).toBeInTheDocument();
    expect(screen.getByText(accountDetailsTitle)).toBeInTheDocument();
    expect(screen.getByText(goLiveDetailsTitle)).toBeInTheDocument();
    expect(screen.getByTestId("termsAndConditions")).toBeInTheDocument();
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
      const termsSection = screen.getByTestId("termsAndConditions").nextSibling;
      const termsCheckboxes = within(termsSection as HTMLElement).getAllByRole(
        "checkbox",
      );

      termsCheckboxes.forEach(async (checkbox) => {
        await user.click(checkbox);
      });
    });

    const confirmButton = screen.getByRole("button", {
      name: signUpText,
    });
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

    expect(mockOnCompleteHandler).toHaveBeenCalled();
  });

  it("confirm button is disabled when terms are not agreed", () => {
    render(<PaymentConfirmation onGoBack={() => {}} onComplete={() => {}} />);

    const confirmButton = screen.getByRole("button", {
      name: paymentConfirmationText.signUpText,
    });
    expect(confirmButton).toBeDisabled();
  });

  it("opens accessibility modal when accessibility requirements checkbox is clicked", async () => {
    // This test is written weirdly as the DOM tree is too large for the testing library and the modal is not in the truncated DOM tree
    const user = userEvent.setup();
    const { container } = render(
      <PaymentConfirmation onGoBack={() => {}} onComplete={() => {}} />,
    );

    const accessibilityCheckbox = screen.getByRole("checkbox", {
      name: "Yes, I have specific requirements or needs",
    });

    // Find the accessibility modal by looking for the dialog that contains the accessibility modal title (there are multiple dialogs in the DOM)
    const accessibilityModal = Array.from(
      container.querySelectorAll("dialog"),
    ).find((dialog) => {
      const titleElement = dialog.querySelector('h2[id="modal-title"]');
      return (
        titleElement?.textContent ===
        accessibilityModalText.accessibilityRequirementsModalTitle
      );
    }) as HTMLDialogElement;
    const otherModal = Array.from(container.querySelectorAll("dialog")).find(
      (dialog) => {
        const titleElement = dialog.querySelector('h2[id="modal-title"]');
        return (
          titleElement?.textContent !==
          accessibilityModalText.accessibilityRequirementsModalTitle
        );
      },
    ) as HTMLDialogElement;

    expect(accessibilityModal).toBeInTheDocument();
    expect(accessibilityModal.open).toBe(false);
    expect(otherModal.open).toBe(false);

    await act(async () => {
      await user.click(accessibilityCheckbox);
    });

    expect(accessibilityModal.open).toBe(true);
    expect(otherModal.open).toBe(false);
    expect(screen.getByText("Blind or Vision impaired")).toBeVisible();
  });

  it("shows the CICS buttons that that link to the intended resources", () => {
    render(<PaymentConfirmation onGoBack={() => {}} onComplete={() => {}} />);

    const contractSummaryBtn = screen.getByTestId("Contract Summary");
    const contractInformationBtn = screen.getByTestId("Contract Information");
    const termsAndConditionsBtn = screen.getByTestId("Terms & Conditions");
    const privacyNoticeBtn = screen.getByTestId("Privacy Notice");

    // short wait while the data is fetched
    setTimeout(() => {
      expect(contractSummaryBtn).toHaveAttribute(
        "href",
        "https://s3.cuckoo.co/contractSummary",
      );
      expect(contractInformationBtn).toHaveAttribute(
        "href",
        "https://s3.cuckoo.co/contractInformation",
      );
      expect(termsAndConditionsBtn).toHaveAttribute(
        "href",
        "https://cms.cuckoo.co/tacs",
      );
      expect(privacyNoticeBtn).toHaveAttribute(
        "href",
        "https://cms.cuckoo.co/privacy",
      );
    }, 100);
  });
});
