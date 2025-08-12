import { render, screen, waitFor } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import { Control } from "react-hook-form";
import { beforeEach, describe, expect, it, vi } from "vitest";

import { text } from "./DateTimeSelectionFormProps";
import { DateTimeSelectionForm } from "./index";

vi.mock("next/navigation", () => ({
  useRouter: vi.fn(() => ({
    refresh: vi.fn(),
    push: vi.fn(),
    replace: vi.fn(),
    back: vi.fn(),
    forward: vi.fn(),
    prefetch: vi.fn(),
  })),
}));

vi.mock("@/screens/GoLiveDate/utils/GoLiveDateUtils", () => ({
  getTimeSlotsForDate: vi.fn(() => [
    { label: "9am - 11am", selectionIdentifier: "slot-1" },
    { label: "2pm - 4pm", selectionIdentifier: "slot-2" },
  ]),
}));

vi.mock("@react-component-library/ui", async () => {
  const actual = await vi.importActual("@react-component-library/ui");
  return {
    ...actual,
    DatePicker: vi.fn(
      ({ availableDates, selectedDate, onDateSelect, disabled }) => (
        <div data-testid="date-picker">
          <select
            data-testid="date-select"
            value={selectedDate || ""}
            onChange={(e) => onDateSelect(e.target.value)}
            disabled={disabled}
          >
            <option value="">Select a date</option>
            {availableDates?.map((date: Date, index: number) => (
              <option key={index} value={date.toISOString().split("T")[0]}>
                {date.toISOString().split("T")[0]}
              </option>
            ))}
          </select>
        </div>
      ),
    ),
    Button: vi.fn(({ children, tint, variant, type, fullWidth, ...props }) => (
      <button
        data-testid="submit-button"
        type={type}
        data-full-width={fullWidth}
        data-tint={tint}
        data-variant={variant}
        {...props}
      >
        {children}
      </button>
    )),
  };
});

vi.mock("@/components/FormDropdown", () => ({
  FormDropdown: vi.fn(
    ({
      dropdownLabel,
      name,
      dropdownPlaceholder,
      options,
      errorMessage,
    }: {
      dropdownLabel?: string;
      control?: Control<{ selectedDate: string; timeSlot: string }>;
      name?: string;
      dropdownPlaceholder?: string;
      options?: Record<string, string>;
      errorMessage?: string;
    }) => (
      <div data-testid="form-dropdown">
        <label>{dropdownLabel}</label>
        <select data-testid="time-slot-select" name={name}>
          <option value="">{dropdownPlaceholder}</option>
          {Object.entries(options || {}).map(([label, value]) => (
            <option key={value} value={value}>
              {label}
            </option>
          ))}
        </select>
        {errorMessage && (
          <div data-testid="time-slot-error">{errorMessage}</div>
        )}
      </div>
    ),
  ),
}));

describe("DateTimeSelectionForm - Business Logic", () => {
  const mockOnSubmit = vi.fn();
  const mockOnRetry = vi.fn();

  const defaultProps = {
    availableAppointments: [
      {
        startDateTime: new Date("2024-01-15T09:00:00Z"),
        endDateTime: new Date("2024-01-15T11:00:00Z"),
        selectionIdentifier: "slot-1",
        type: "engineer" as const,
      },
      {
        startDateTime: new Date("2024-01-16T14:00:00Z"),
        endDateTime: new Date("2024-01-16T16:00:00Z"),
        selectionIdentifier: "slot-2",
        type: "engineer" as const,
      },
    ],
    loadingAppointments: false,
    requiresTimeSlot: false,
    availableDatesLabel: "Available dates",
    timeSlotLabel: "Time slot",
    timeSlotPlaceHolder: "Select a time slot",
    submitButtonText: "Submit",
    onSubmit: mockOnSubmit,
    onRetry: mockOnRetry,
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("Form submission", () => {
    it("calls onSubmit with form data when submitted", async () => {
      const user = userEvent.setup();

      render(<DateTimeSelectionForm {...defaultProps} />);

      const dateSelect = screen.getByTestId("date-select");
      await user.selectOptions(dateSelect, "2024-01-15");

      const submitButton = screen.getByTestId("submit-button");
      await user.click(submitButton);

      await waitFor(() => {
        expect(mockOnSubmit).toHaveBeenCalledWith({
          selectedDate: "2024-01-15",
          timeSlot: "",
        });
      });
    });

    it("prevents submission and shows error when time slot is required but not selected", async () => {
      const user = userEvent.setup();

      render(
        <DateTimeSelectionForm
          {...defaultProps}
          requiresTimeSlot={true}
          defaultSelectedDate="2024-01-15"
        />,
      );

      const submitButton = screen.getByTestId("submit-button");
      await user.click(submitButton);

      await waitFor(() => {
        expect(screen.getByTestId("time-slot-error")).toHaveTextContent(
          "Please select a time slot",
        );
        expect(mockOnSubmit).not.toHaveBeenCalled();
      });
    });
  });

  describe("Conditional rendering", () => {
    it("shows time slot dropdown only when date is selected and time slot is required", async () => {
      const user = userEvent.setup();

      render(
        <DateTimeSelectionForm {...defaultProps} requiresTimeSlot={true} />,
      );

      expect(screen.queryByTestId("form-dropdown")).not.toBeInTheDocument();

      const dateSelect = screen.getByTestId("date-select");
      await user.selectOptions(dateSelect, "2024-01-15");

      await waitFor(() => {
        expect(screen.getByTestId("form-dropdown")).toBeInTheDocument();
        expect(screen.getByText("Time slot")).toBeInTheDocument();
      });
    });

    it("does not show time slot dropdown when time slot is not required", () => {
      render(
        <DateTimeSelectionForm
          {...defaultProps}
          requiresTimeSlot={false}
          defaultSelectedDate="2024-01-15"
        />,
      );

      expect(screen.queryByTestId("form-dropdown")).not.toBeInTheDocument();
    });

    it("shows the error tip card when appointment error is provided", () => {
      render(
        <DateTimeSelectionForm
          {...defaultProps}
          appointmentError="Failed to load appointments"
        />,
      );

      expect(screen.getByText(text.errorTipCardText)).toBeInTheDocument();
    });

    it("shows retry button and calls onRetry when clicked", async () => {
      const user = userEvent.setup();

      render(
        <DateTimeSelectionForm
          {...defaultProps}
          appointmentError="Failed to load appointments"
        />,
      );

      const retryButton = screen.getByText(text.retryButtonText);
      expect(retryButton).toBeInTheDocument();

      await user.click(retryButton);

      expect(mockOnRetry).toHaveBeenCalledTimes(1);
    });

    it("shows a loading slide when loading appointments, and no drop down or date picker", () => {
      render(
        <DateTimeSelectionForm {...defaultProps} loadingAppointments={true} />,
      );

      expect(screen.getByRole("status")).toBeInTheDocument();
      expect(screen.queryByTestId("form-dropdown")).not.toBeInTheDocument();
      expect(screen.queryByTestId("date-select")).not.toBeInTheDocument();
    });
  });

  describe("Button configuration", () => {
    it("renders submit button with correct props", () => {
      render(
        <DateTimeSelectionForm
          {...defaultProps}
          submitButtonText="Save Changes"
          submitButtonFullWidth={true}
          submitButtonAlignment="right"
        />,
      );

      const submitButton = screen.getByTestId("submit-button");
      expect(submitButton).toHaveTextContent("Save Changes");
      expect(submitButton).toHaveAttribute("data-full-width", "true");
      expect(submitButton).toHaveAttribute("data-tint", "yellow");
      expect(submitButton).toHaveAttribute("data-variant", "solid");

      const buttonContainer = submitButton.parentElement;
      expect(buttonContainer).toHaveClass("justify-end");
    });

    it("shows loading stat on button when isSubmitting is true", () => {
      render(
        <DateTimeSelectionForm
          {...defaultProps}
          submitButtonText="Save Changes"
          isSubmitting={true}
        />,
      );

      const submitButton = screen.getByTestId("submit-button");
      expect(submitButton).toHaveTextContent("Loading...");
      expect(submitButton).toBeDisabled();
    });

    it("shows normal button text when isSubmitting is false", () => {
      render(
        <DateTimeSelectionForm
          {...defaultProps}
          submitButtonText="Save Changes"
          isSubmitting={false}
        />,
      );

      const submitButton = screen.getByTestId("submit-button");
      expect(submitButton).toHaveTextContent("Save Changes");
      expect(submitButton).not.toBeDisabled();
    });

    it("applies correct alignment classes", () => {
      const { rerender } = render(
        <DateTimeSelectionForm
          {...defaultProps}
          submitButtonAlignment="center"
        />,
      );

      let buttonContainer = screen.getByTestId("submit-button").parentElement;
      expect(buttonContainer).toHaveClass("justify-center");

      rerender(
        <DateTimeSelectionForm
          {...defaultProps}
          submitButtonAlignment="left"
        />,
      );

      buttonContainer = screen.getByTestId("submit-button").parentElement;
      expect(buttonContainer).toHaveClass("justify-start");
    });

    it("does not render submit button when showSubmitButton is false", () => {
      render(
        <DateTimeSelectionForm {...defaultProps} showSubmitButton={false} />,
      );

      expect(screen.queryByTestId("submit-button")).not.toBeInTheDocument();
    });
  });

  describe("Default values", () => {
    it("populates form with default values", () => {
      render(
        <DateTimeSelectionForm
          {...defaultProps}
          defaultSelectedDate="2024-01-15"
          defaultTimeSlot="slot-1"
          requiresTimeSlot={true}
        />,
      );

      const dateSelect = screen.getByTestId("date-select");
      expect(dateSelect).toHaveValue("2024-01-15");

      waitFor(() => {
        const timeSlotSelect = screen.getByTestId("time-slot-select");
        expect(timeSlotSelect).toHaveValue("slot-1");
      });
    });

    it("handles empty default values", () => {
      render(<DateTimeSelectionForm {...defaultProps} />);

      const dateSelect = screen.getByTestId("date-select");
      expect(dateSelect).toHaveValue("");
    });
  });

  describe("Tip card rendering", () => {
    it("renders tip card when provided", () => {
      const tipCard = (
        <div data-testid="custom-tip-card">Custom tip content</div>
      );

      render(<DateTimeSelectionForm {...defaultProps} tipCard={tipCard} />);

      expect(screen.getByTestId("custom-tip-card")).toBeInTheDocument();
      expect(screen.getByText("Custom tip content")).toBeInTheDocument();
    });

    it("does not render tip card when not provided", () => {
      render(<DateTimeSelectionForm {...defaultProps} />);

      expect(screen.queryByTestId("custom-tip-card")).not.toBeInTheDocument();
    });
  });

  describe("Accessibility", () => {
    it("renders form with proper labels", () => {
      render(
        <DateTimeSelectionForm
          {...defaultProps}
          requiresTimeSlot={true}
          defaultSelectedDate="2024-01-15"
        />,
      );

      expect(screen.getByText("Available dates")).toBeInTheDocument();

      waitFor(() => {
        expect(screen.getByText("Time slot")).toBeInTheDocument();
      });
    });

    it("associates error messages with form fields", async () => {
      const user = userEvent.setup();

      render(
        <DateTimeSelectionForm
          {...defaultProps}
          requiresTimeSlot={true}
          defaultSelectedDate="2024-01-15"
        />,
      );

      const submitButton = screen.getByTestId("submit-button");
      await user.click(submitButton);

      await waitFor(() => {
        const errorElement = screen.getByTestId("time-slot-error");
        expect(errorElement).toBeInTheDocument();
      });
    });
  });
});
