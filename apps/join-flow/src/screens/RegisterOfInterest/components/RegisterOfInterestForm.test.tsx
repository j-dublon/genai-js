import { render, screen, waitFor, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";

import { ROIOriginJourney } from "@/lib/constants";
import { registerInterest } from "@/services/helpers/registerInterest";
import useJoinFlowStore from "@/store/useJoinFlowStore";

import {
  RegisterOfInterestForm,
  RegisterOfInterestFormProps,
} from "./RegisterOfInterestForm";

vi.mock("@react-component-library/ui", async () => {
  const actual = await vi.importActual("@react-component-library/ui");
  return {
    ...actual,
    TipCard: ({ children }: { children: React.ReactNode }) => (
      <div data-testid="mock-tip-card">{children}</div>
    ),
    Button: ({
      children,
      ...props
    }: { children: React.ReactNode } & Record<string, unknown>) => (
      <button data-testid="mock-button" {...props}>
        {children}
      </button>
    ),
  };
});

vi.mock("@/store/useJoinFlowStore", () => ({
  __esModule: true,
  default: vi.fn(() => ({
    affiliateSession: { affiliateName: "test-affiliate" },
    serviceAddress: null,
    roiPostcode: "AB12 3CD",
  })),
}));

vi.mock("@/services/helpers/registerInterest", () => ({
  registerInterest: vi.fn(),
}));

const user = userEvent.setup();

const TEST_FULL_NAME = "John Doe";
const TEST_EMAIL = "john@example.com";
const TEST_PHONE = "07123456789";
const TEST_ADDRESS_POSTCODE_ONLY = { postcode: "AB12 3CD" };
const TEST_ADDRESS_FULL = {
  line1: "123 Main St",
  line2: "Apt 4B",
  line3: "London",
  postcode: "AB12 3CD",
  identifiers: [
    { value: "123", scheme: "OSS_IDENTIFIER", id: "123" },
    { value: "456", scheme: "URN", id: "456" },
  ],
};

describe("RegisterOfInterestForm", () => {
  const onSuccessMock = vi.fn();
  const defaultProps: RegisterOfInterestFormProps = {
    source: "not-shown",
    buttonText: "Submit",
    privacyNoticeText: "Here's a link to the Privacy Notice",
    privacyNoticeLinkText: "Privacy Notice",
    privacyNoticeUrl: "https://example.com/privacy",
    errorTipCardTitle: "Error!",
    formErrorText:
      "There was an error submitting your details. Please try again or contact us.",
    onSuccess: onSuccessMock,
  };

  beforeEach(() => {
    vi.clearAllMocks();
    defaultProps.onSuccess = vi.fn();
    vi.mocked(registerInterest).mockResolvedValue({ roi: "abc-123" });
    vi.mocked(useJoinFlowStore).mockReturnValue({
      affiliateSession: { affiliateName: "test-affiliate" },
      serviceAddress: null,
      roiPostcode: "AB12 3CD",
    });
  });

  it("renders all required fields and the submit button", () => {
    render(<RegisterOfInterestForm {...defaultProps} />);
    expect(screen.getByPlaceholderText("Full name")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Email")).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText("Phone number (optional)"),
    ).toBeInTheDocument();
    const submitButton = screen.getByTestId("mock-button");
    expect(submitButton).toBeInTheDocument();
    expect(submitButton).toHaveTextContent("Submit");
    const privacyNoticeLink = screen.getByText(/Privacy Notice/i);
    expect(privacyNoticeLink).toBeInTheDocument();
    expect(privacyNoticeLink).toHaveAttribute(
      "href",
      "https://example.com/privacy",
    );
    expect(privacyNoticeLink).toHaveAttribute("target", "_blank");
    expect(privacyNoticeLink).toHaveAttribute("rel", "noopener noreferrer");
  });

  it("shows error message tipCard when submitting empty form", async () => {
    render(<RegisterOfInterestForm {...defaultProps} />);
    await user.click(screen.getByTestId("mock-button"));
    const errorTipCard = await screen.findByTestId("mock-tip-card");
    expect(errorTipCard).toBeInTheDocument();
    expect(
      within(errorTipCard).getByText("Full name is required"),
    ).toBeInTheDocument();
    expect(
      within(errorTipCard).getByText("Invalid email address"),
    ).toBeInTheDocument();
  });

  it("submits the form with valid data", async () => {
    render(<RegisterOfInterestForm {...defaultProps} />);
    await user.type(screen.getByPlaceholderText("Full name"), TEST_FULL_NAME);
    await user.type(screen.getByPlaceholderText("Email"), TEST_EMAIL);
    await user.type(
      screen.getByPlaceholderText("Phone number (optional)"),
      TEST_PHONE,
    );
    await user.click(screen.getByTestId("mock-button"));

    expect(screen.queryByTestId("mock-tip-card")).not.toBeInTheDocument();
    expect(registerInterest).toHaveBeenCalledWith({
      fullName: TEST_FULL_NAME,
      email: TEST_EMAIL,
      phoneNumber: TEST_PHONE,
      address: [TEST_ADDRESS_POSTCODE_ONLY],
      originJourney: ROIOriginJourney.ERROR_ROI,
      affiliateCode: "test-affiliate",
      isServiceable: null,
    });
    expect(defaultProps.onSuccess).toHaveBeenCalled();
  });

  it("displays a loading indicator when submitting", async () => {
    let resolvePromise: (value: { roi: string }) => void;
    const promise = new Promise<{ roi: string }>((resolve) => {
      resolvePromise = resolve;
    });

    vi.mocked(registerInterest).mockImplementation(() => promise);

    render(<RegisterOfInterestForm {...defaultProps} />);
    await user.type(screen.getByPlaceholderText("Full name"), TEST_FULL_NAME);
    await user.type(screen.getByPlaceholderText("Email"), TEST_EMAIL);
    await user.click(screen.getByTestId("mock-button"));

    // Spinner should be visible before the promise resolves
    expect(await screen.findByRole("status")).toBeInTheDocument();

    resolvePromise!({ roi: "abc-123" });

    // Spinner should be hidden after the promise resolves
    await waitFor(() => {
      expect(screen.queryByRole("status")).not.toBeInTheDocument();
    });
  });

  it("submits the full address data when available", async () => {
    vi.mocked(useJoinFlowStore).mockReturnValue({
      affiliateSession: { affiliateName: "test-affiliate" },
      serviceAddress: TEST_ADDRESS_FULL,
      roiPostcode: "AB12 3CD",
    });
    render(
      <RegisterOfInterestForm
        {...defaultProps}
        source="cannot-service-address"
      />,
    );
    await user.type(screen.getByPlaceholderText("Full name"), TEST_FULL_NAME);
    await user.type(screen.getByPlaceholderText("Email"), TEST_EMAIL);
    await user.type(
      screen.getByPlaceholderText("Phone number (optional)"),
      TEST_PHONE,
    );
    await user.click(screen.getByTestId("mock-button"));
    expect(registerInterest).toHaveBeenCalledWith({
      fullName: TEST_FULL_NAME,
      email: TEST_EMAIL,
      phoneNumber: TEST_PHONE,
      address: [TEST_ADDRESS_FULL],
      originJourney: ROIOriginJourney.PRE_REG,
      affiliateCode: "test-affiliate",
      isServiceable: false,
    });
    expect(defaultProps.onSuccess).toHaveBeenCalled();
  });
});
