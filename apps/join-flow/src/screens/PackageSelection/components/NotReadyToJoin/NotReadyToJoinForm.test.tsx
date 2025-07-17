import { DatePickerProps } from "@react-component-library/ui";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";

import { useRoiAddress } from "@/hooks/useRoiAddress";
import { registerInterest } from "@/services/helpers/registerInterest";

import { NotReadyToJoinForm } from "./NotReadyToJoinForm";

vi.mock("./NotReadyToJoinProps", () => ({
  notReadyToJoinProps: {
    buttonText: "Mock Button Text",
    confirmationMessage: "Mock Confirmation Message",
    privacyNoticeText: "Mock Privacy Notice Text",
    errorTipCardTitle: "Mock Error Tip Card Title",
    noAddressError: "Mock No Address Error",
    errorMessage: "Mock Error Message",
  },
}));

const TEST_FULL_NAME = "John Doe";
const TEST_EMAIL = "john.doe@example.com";
const TEST_PHONE = "07123456789";
const TEST_DATE = "2024-12-31";
const TEST_ADDRESS = {
  addressKey: "abc-123",
  addressKeyType: "URN",
  postcode: "AB12 3CD",
  formattedAddress:
    "line1=123&line2=Main+St&line3=Anytown&postcode=AB12+3CD&addressKey=abc-123&addressKeyType=URN",
  additionalAddressKeys: [],
};

interface ButtonProps {
  children: React.ReactNode;
  [key: string]: unknown;
}

interface FormInputProps {
  error?: { message: string };
  id?: string;
  [key: string]: unknown;
}

vi.mock("@react-component-library/ui", async () => {
  const actual = await vi.importActual("@react-component-library/ui");
  return {
    ...actual,
    Button: ({ children, ...props }: ButtonProps) => (
      <button {...props}>{children}</button>
    ),
    DatePicker: ({
      onDateSelect,
      selectedDate,
      placeholderText,
      disabled,
      ...props
    }: DatePickerProps) => {
      // Remove DatePicker-specific props that shouldn't be passed to DOM for mock
      const {
        availableDates,
        buttonClassName,
        outerClassName,
        overlay,
        ...domProps
      } = props;
      void availableDates;
      void buttonClassName;
      void outerClassName;
      void overlay;
      return (
        <div data-testid="date-picker" {...domProps}>
          <button
            type="button"
            onClick={() => onDateSelect && onDateSelect(TEST_DATE)}
            data-testid="date-picker-button"
            disabled={disabled}
          >
            {selectedDate || placeholderText}
          </button>
        </div>
      );
    },
  };
});

vi.mock("@/components/FormInput", () => ({
  default: ({ error, ...props }: FormInputProps) => (
    <div>
      <input {...props} />
      {error && <p data-testid={`${props.id}-error`}>{error.message}</p>}
    </div>
  ),
}));

vi.mock("@/hooks/useRoiAddress", () => ({
  useRoiAddress: vi.fn(),
}));

vi.mock("@/store/useJoinFlowStore", () => ({
  __esModule: true,
  default: () => ({ affiliateSession: { affiliateName: "test-affiliate" } }),
}));

vi.mock("@/services/helpers/registerInterest", () => ({
  registerInterest: vi.fn(),
}));

describe("NotReadyToJoinForm", () => {
  const user = userEvent.setup();

  beforeEach(() => {
    vi.clearAllMocks();
    vi.mocked(registerInterest).mockImplementation(
      () => new Promise((resolve) => resolve({ roi: "abc-123" })),
    );
    vi.mocked(useRoiAddress).mockReturnValue([TEST_ADDRESS]);
  });

  it("renders the form with all required fields", () => {
    render(<NotReadyToJoinForm />);

    const form = document.querySelector("#notReadyToJoinForm");
    expect(form).toBeInTheDocument();

    expect(screen.getByPlaceholderText("Full name")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Email address")).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText("Phone number (optional)"),
    ).toBeInTheDocument();
    expect(screen.getByTestId("date-picker")).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Mock Button Text" }),
    ).toBeInTheDocument();
    expect(screen.getByText(/Privacy Notice/)).toBeInTheDocument();
  });

  it("displays validation errors for required fields when submitted empty", async () => {
    render(<NotReadyToJoinForm />);

    const submitButton = screen.getByRole("button", {
      name: "Mock Button Text",
    });
    await user.click(submitButton);

    await waitFor(() => {
      expect(screen.getByTestId("fullName-error")).toHaveTextContent(
        "Full name is required",
      );
      expect(screen.getByTestId("email-error")).toHaveTextContent(
        "Invalid email address",
      );
      expect(screen.getByText("Please select a date")).toBeInTheDocument();
    });
  });

  it("displays validation error for invalid email", async () => {
    render(<NotReadyToJoinForm />);

    const emailInput = screen.getByPlaceholderText("Email address");
    await user.type(emailInput, "invalid-email");

    const submitButton = screen.getByRole("button", {
      name: "Mock Button Text",
    });
    await user.click(submitButton);

    await waitFor(() => {
      expect(screen.getByTestId("email-error")).toHaveTextContent(
        "Invalid email address",
      );
    });
  });

  it("displays various validation errors for invalid mobile phone number", async () => {
    render(<NotReadyToJoinForm />);
    const phoneInput = screen.getByPlaceholderText("Phone number (optional)");
    await user.type(phoneInput, "01234567890");
    const submitButton = screen.getByRole("button", {
      name: "Mock Button Text",
    });
    await user.click(submitButton);
    await waitFor(() => {
      expect(screen.getByTestId("phoneNumber-error")).toHaveTextContent(
        "Please enter a valid UK mobile phone number",
      );
    });

    await user.clear(phoneInput);
    await user.type(phoneInput, "0146ABC");
    await user.click(submitButton);
    await waitFor(() => {
      expect(screen.getByTestId("phoneNumber-error")).toHaveTextContent(
        "Please enter only digits for your phone number",
      );
    });

    await user.clear(phoneInput);
    await user.type(phoneInput, "071234567890");
    await user.click(submitButton);
    await waitFor(() => {
      expect(screen.getByTestId("phoneNumber-error")).toHaveTextContent(
        "UK mobile number must be 11 digits",
      );
    });
  });

  it("allows valid form submission with all fields filled", async () => {
    render(<NotReadyToJoinForm />);

    await user.type(screen.getByPlaceholderText("Full name"), TEST_FULL_NAME);
    await user.type(screen.getByPlaceholderText("Email address"), TEST_EMAIL);
    await user.type(
      screen.getByPlaceholderText("Phone number (optional)"),
      TEST_PHONE,
    );
    const datePickerButton = screen.getByTestId("date-picker-button");
    await user.click(datePickerButton);
    const submitButton = screen.getByRole("button", {
      name: "Mock Button Text",
    });
    await user.click(submitButton);

    await waitFor(() => {
      expect(registerInterest).toHaveBeenCalledWith({
        fullName: TEST_FULL_NAME,
        email: TEST_EMAIL,
        endOfContractDate: TEST_DATE,
        phoneNumber: TEST_PHONE,
        address: [TEST_ADDRESS],
        originJourney: "SERVICEABLE_ROI",
        affiliateCode: "test-affiliate",
        isServiceable: true,
      });
    });
  });

  it("allows valid form submission with only required fields filled", async () => {
    render(<NotReadyToJoinForm />);

    await user.type(screen.getByPlaceholderText("Full name"), TEST_FULL_NAME);
    await user.type(screen.getByPlaceholderText("Email address"), TEST_EMAIL);
    const datePickerButton = screen.getByTestId("date-picker-button");
    await user.click(datePickerButton);
    const submitButton = screen.getByRole("button", {
      name: "Mock Button Text",
    });
    await user.click(submitButton);

    await waitFor(() => {
      expect(registerInterest).toHaveBeenCalledWith({
        fullName: TEST_FULL_NAME,
        email: TEST_EMAIL,
        phoneNumber: undefined,
        endOfContractDate: TEST_DATE,
        address: [TEST_ADDRESS],
        originJourney: "SERVICEABLE_ROI",
        affiliateCode: "test-affiliate",
        isServiceable: true,
      });
      expect(screen.getByText("Mock Confirmation Message")).toBeInTheDocument();
    });
  });

  it("shows success state after form submission and hides submit button", async () => {
    render(<NotReadyToJoinForm />);

    await user.type(screen.getByPlaceholderText("Full name"), TEST_FULL_NAME);
    await user.type(screen.getByPlaceholderText("Email address"), TEST_EMAIL);
    const datePickerButton = screen.getByTestId("date-picker-button");
    await user.click(datePickerButton);
    const submitButton = screen.getByRole("button", {
      name: "Mock Button Text",
    });
    await user.click(submitButton);
    await waitFor(() => {
      expect(screen.getByText("Mock Confirmation Message")).toBeInTheDocument();
      expect(screen.getByPlaceholderText("Full name")).toBeDisabled();
      expect(screen.getByPlaceholderText("Email address")).toBeDisabled();
      expect(
        screen.getByPlaceholderText("Phone number (optional)"),
      ).toBeDisabled();
      expect(screen.queryByText(/Privacy Notice/)).not.toBeInTheDocument();
      expect(submitButton).not.toBeInTheDocument();
    });
  });

  it("shows error state if address can't be found on store", async () => {
    vi.mocked(useRoiAddress).mockReturnValue([]);
    render(<NotReadyToJoinForm />);

    await user.type(screen.getByPlaceholderText("Full name"), TEST_FULL_NAME);
    await user.type(screen.getByPlaceholderText("Email address"), TEST_EMAIL);
    const datePickerButton = screen.getByTestId("date-picker-button");
    await user.click(datePickerButton);
    const submitButton = screen.getByRole("button", {
      name: "Mock Button Text",
    });
    await user.click(submitButton);
    await waitFor(() => {
      expect(screen.getByText("Mock No Address Error")).toBeInTheDocument();
    });
  });

  it("shows error state if there is an error submitting the form", async () => {
    vi.mocked(registerInterest).mockRejectedValue({ error: "Mock Error" });
    render(<NotReadyToJoinForm />);

    await user.type(screen.getByPlaceholderText("Full name"), TEST_FULL_NAME);
    await user.type(screen.getByPlaceholderText("Email address"), TEST_EMAIL);
    const datePickerButton = screen.getByTestId("date-picker-button");
    await user.click(datePickerButton);
    const submitButton = screen.getByRole("button", {
      name: "Mock Button Text",
    });
    await user.click(submitButton);
    await waitFor(() => {
      expect(screen.getByText("Mock Error Message")).toBeInTheDocument();
    });
  });

  it("shows loading indicator and hides submit button when submitting", async () => {
    let resolvePromise: (value: { roi: string }) => void;
    const promise = new Promise<{ roi: string }>((resolve) => {
      resolvePromise = resolve;
    });

    vi.mocked(registerInterest).mockImplementation(() => promise);

    render(<NotReadyToJoinForm />);

    await user.type(screen.getByPlaceholderText("Full name"), TEST_FULL_NAME);
    await user.type(screen.getByPlaceholderText("Email address"), TEST_EMAIL);
    const datePickerButton = screen.getByTestId("date-picker-button");
    await user.click(datePickerButton);

    const submitButton = screen.getByRole("button", {
      name: "Mock Button Text",
    });
    expect(submitButton).toBeInTheDocument();

    await user.click(submitButton);

    expect(await screen.findByRole("status")).toBeInTheDocument();
    expect(
      screen.queryByRole("button", { name: "Mock Button Text" }),
    ).not.toBeInTheDocument();

    resolvePromise!({ roi: "abc-123" });

    await waitFor(() => {
      expect(screen.getByText("Mock Confirmation Message")).toBeInTheDocument();
      expect(screen.queryByRole("status")).not.toBeInTheDocument();
    });
  });
});
