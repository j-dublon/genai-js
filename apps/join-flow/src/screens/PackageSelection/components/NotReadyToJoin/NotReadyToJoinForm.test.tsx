import { DatePickerProps } from "@react-component-library/ui";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";

import { NotReadyToJoinForm } from "./NotReadyToJoinForm";

vi.mock("./NotReadyToJoinProps", () => ({
  notReadyToJoinProps: {
    buttonText: "Mock Button Text",
    confirmationMessage: "Mock Confirmation Message",
    privacyNoticeText: "Mock Privacy Notice Text",
  },
}));

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
            onClick={() => onDateSelect && onDateSelect("2024-12-31")}
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

// Mock console.log to test form submission until real functionality added
const mockConsoleLog = vi.spyOn(console, "log").mockImplementation(() => {});

describe("NotReadyToJoinForm", () => {
  const user = userEvent.setup();

  beforeEach(() => {
    vi.clearAllMocks();
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

    await user.type(screen.getByPlaceholderText("Full name"), "John Doe");
    await user.type(
      screen.getByPlaceholderText("Email address"),
      "john.doe@example.com",
    );
    await user.type(
      screen.getByPlaceholderText("Phone number (optional)"),
      "07123456789",
    );
    const datePickerButton = screen.getByTestId("date-picker-button");
    await user.click(datePickerButton);
    const submitButton = screen.getByRole("button", {
      name: "Mock Button Text",
    });
    await user.click(submitButton);

    await waitFor(() => {
      expect(mockConsoleLog).toHaveBeenCalledWith({
        fullName: "John Doe",
        email: "john.doe@example.com",
        selectedDate: "2024-12-31",
        phoneNumber: "07123456789",
      });
    });
  });

  it("allows valid form submission with only required fields filled", async () => {
    render(<NotReadyToJoinForm />);

    await user.type(screen.getByPlaceholderText("Full name"), "John Doe");
    await user.type(
      screen.getByPlaceholderText("Email address"),
      "john.doe@example.com",
    );
    const datePickerButton = screen.getByTestId("date-picker-button");
    await user.click(datePickerButton);
    const submitButton = screen.getByRole("button", {
      name: "Mock Button Text",
    });
    await user.click(submitButton);

    await waitFor(() => {
      expect(mockConsoleLog).toHaveBeenCalledWith({
        fullName: "John Doe",
        email: "john.doe@example.com",
        selectedDate: "2024-12-31",
        phoneNumber: "",
      });
    });
  });

  it("shows success state after form submission and hides submit button", async () => {
    render(<NotReadyToJoinForm />);

    await user.type(screen.getByPlaceholderText("Full name"), "John Doe");
    await user.type(
      screen.getByPlaceholderText("Email address"),
      "john.doe@example.com",
    );
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
});
