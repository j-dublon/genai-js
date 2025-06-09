import useJoinFlowStore from "@store/useJoinFlowStore";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { Controller } from "react-hook-form";
import { beforeEach, describe, expect, it, vi } from "vitest";

import { FormDropDownProps } from "@/components/FormDropdown";

import GoLiveDate from "./";

interface MockFormData extends Record<string, string> {
  timeSlot: string;
  selectedDate: string;
}

interface ButtonProps {
  children: React.ReactNode;
  type: "button" | "submit" | "reset";
  onClick: () => void;
  disabled?: boolean;
}

interface DatePickerProps {
  selectedDate: string;
  onDateSelect: (date: string) => void;
  availableDates: string[];
}

interface TipCardProps {
  children: React.ReactNode;
  className: string;
}

vi.mock("@react-component-library/ui", () => ({
  Button: ({ children, type, onClick, disabled }: ButtonProps) => (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      data-testid="button"
    >
      {children}
    </button>
  ),
  DatePicker: ({
    selectedDate,
    onDateSelect,
    availableDates,
  }: DatePickerProps) => (
    <div data-testid="date-picker">
      <button
        data-testid="select-date-button"
        onClick={() => onDateSelect("Wed Jun 15 2023")}
      >
        Select Date
      </button>
      <div>Selected: {selectedDate}</div>
      <div>Available Dates: {availableDates.length}</div>
    </div>
  ),
  SimpleNavBar: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="simple-nav-bar">{children}</div>
  ),
  ColorPill: ({
    colorPillText,
    className,
  }: {
    colorPillText: string;
    className: string;
  }) => (
    <div data-testid="color-pill" className={className}>
      {colorPillText}
    </div>
  ),
  TipCard: ({ children, className }: TipCardProps) => (
    <div data-testid="tip-card" className={className}>
      {children}
    </div>
  ),
}));

vi.mock("@/components/Footer", () => ({
  Footer: () => <div data-testid="footer">Footer</div>,
}));

vi.mock("@/components/FormDropdown", () => ({
  FormDropdown: ({
    control,
    dropdownLabel,
    options,
  }: FormDropDownProps<MockFormData, string>) => (
    <Controller
      name="timeSlot"
      control={control}
      render={() => (
        <div data-testid="form-dropdown">
          <label>{dropdownLabel}</label>
          <select data-testid="time-slot-select">
            {Object.keys(options).map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>
      )}
    />
  ),
}));

interface PaymentDetailsProps {
  onGoBack: () => void;
  onComplete: () => void;
}

vi.mock("@/screens/PaymentDetails", () => ({
  default: ({ onGoBack, onComplete }: PaymentDetailsProps) => (
    <div data-testid="payment-details">
      <button data-testid="go-back-button" onClick={onGoBack}>
        Go Back
      </button>
      <button data-testid="complete-button" onClick={onComplete}>
        Complete
      </button>
    </div>
  ),
}));

vi.mock("next/navigation");
vi.mock("@store/useJoinFlowStore");
const mockedUseJoinFlowStore = vi.mocked(useJoinFlowStore);

describe("GoLiveDate Component", () => {
  const mockSetGoLiveDetails = vi.fn();
  const mockSetCurrentStep = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();

    mockedUseJoinFlowStore.mockReturnValue({
      setGoLiveDetails: mockSetGoLiveDetails,
      goLiveDetails: {},
      setCurrentStep: mockSetCurrentStep,
    });
  });

  it("renders the component correctly", () => {
    render(<GoLiveDate />);

    expect(screen.getByTestId("simple-nav-bar")).toBeInTheDocument();
    const stepText = screen.getByText((_, element) => {
      return element?.textContent === "Step 3 of 4";
    });
    expect(stepText).toBeInTheDocument();
    expect(screen.getByTestId("tip-card")).toBeInTheDocument();
    expect(screen.getByTestId("date-picker")).toBeInTheDocument();
    expect(screen.getByTestId("button")).toBeInTheDocument();
    expect(screen.getByTestId("footer")).toBeInTheDocument();
  });

  it("disables the continue button when no date is selected", () => {
    render(<GoLiveDate />);

    const continueButton = screen.getByTestId("button");
    expect(continueButton).toBeDisabled();
  });

  it("enables the continue button and shows time slot dropdown when date is selected", async () => {
    render(<GoLiveDate />);

    expect(screen.queryByTestId("form-dropdown")).not.toBeInTheDocument();

    fireEvent.click(screen.getByTestId("select-date-button"));

    await waitFor(() => {
      expect(screen.getByTestId("form-dropdown")).toBeInTheDocument();
    });

    const continueButton = screen.getByTestId("button");
    expect(continueButton).not.toBeDisabled();
  });

  it("pre-fills form with existing data from store", () => {
    // Mock store with existing data
    mockedUseJoinFlowStore.mockReturnValue({
      setGoLiveDetails: mockSetGoLiveDetails,
      goLiveDetails: {
        selectedDate: "Wed Jun 15 2023",
        engineerSlot: {
          timeSlot: "1pm - 6pm",
        },
      },
      setCurrentStep: mockSetCurrentStep,
    });

    render(<GoLiveDate />);

    expect(screen.getByText("Selected: Wed Jun 15 2023")).toBeInTheDocument();

    expect(screen.getByTestId("form-dropdown")).toBeInTheDocument();
  });

  it("generates the correct date range for available dates", () => {
    render(<GoLiveDate />);

    expect(screen.getByText(/Available Dates: \d+/)).toBeInTheDocument();
  });

  it("displays the OTS fail banner when the OTS switch fails", () => {
    mockedUseJoinFlowStore.mockReturnValue({
      setGoLiveDetails: mockSetGoLiveDetails,
      goLiveDetails: {},
      setCurrentStep: mockSetCurrentStep,
      switchingDetails: {
        otsSwitchStatus: "OTS_FAILED",
      },
    });

    render(<GoLiveDate />);

    expect(screen.getByText("Important info:")).toBeInTheDocument();
    expect(screen.getByText("let them know")).toBeInTheDocument();
  });

  it("does not display the OTS fail banner when the OTS switch is successful", () => {
    mockedUseJoinFlowStore.mockReturnValue({
      setGoLiveDetails: mockSetGoLiveDetails,
      goLiveDetails: {},
      setCurrentStep: mockSetCurrentStep,
      switchingDetails: {
        otsSwitchStatus: "SWITCH_SUCCESS",
      },
    });

    render(<GoLiveDate />);

    expect(screen.queryByText("Important info:")).not.toBeInTheDocument();
    expect(screen.queryByText("let them know")).not.toBeInTheDocument();
  });
});
