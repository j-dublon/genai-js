import { DatePickerProps } from "@react-component-library/ui";
import useJoinFlowStore from "@store/useJoinFlowStore";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { useRouter } from "next/navigation";
import React from "react";
import { beforeEach, describe, expect, it, Mock, vi } from "vitest";

import * as getEngineerAppointmentsModule from "@/services/helpers/getEngineerAppointments";

import GoLiveDate from "./";

vi.mock("@/services/helpers/getEngineerAppointments");
vi.mock("@store/useJoinFlowStore");
vi.mock("next/navigation", () => ({
  useRouter: vi.fn(),
}));

vi.mock("@/components/StepNavigationWithBasket", () => ({
  StepNavigationWithBasket: () => <div>Step Navigation</div>,
}));
vi.mock("@/components/Footer", () => ({ Footer: () => <footer /> }));
interface FormDropdownProps<T extends Record<string, unknown>, V> {
  control: T;
  name: keyof T & string;
  dropdownLabel?: string;
  dropdownPlaceholder: string;
  options: Record<string, V>;
  errorMessage?: string;
}
vi.mock("@/components/FormDropdown", () => ({
  FormDropdown: <T extends Record<string, unknown>, V>({
    control,
    name,
    dropdownLabel,
    dropdownPlaceholder,
    options,
  }: FormDropdownProps<T, V>) => {
    const typedControl = control as unknown as {
      _formValues?: Record<string, unknown>;
      _fields?: Record<
        string,
        {
          onChange: (event: Event | unknown) => void;
        }
      >;
    };

    return (
      <select
        aria-label={dropdownLabel}
        name={name}
        data-testid="form-dropdown"
        onChange={(e) => {
          if (typedControl._formValues) {
            typedControl._formValues[name] = (
              e.target as HTMLSelectElement
            ).value;
          }
          typedControl._fields?.[name]?.onChange(e);
        }}
      >
        <option value="">{dropdownPlaceholder}</option>
        {Object.entries(options).map(([label, value]) => (
          <option key={label} value={value as unknown as string}>
            {label}
          </option>
        ))}
      </select>
    );
  },
}));
vi.mock("@react-component-library/ui", () => ({
  DatePicker: ({ selectedDate, onDateSelect, disabled }: DatePickerProps) => (
    <input
      type="date"
      aria-label="DatePicker"
      value={selectedDate}
      onChange={(e) => onDateSelect(e.target.value)}
      disabled={disabled}
      data-testid="date-picker"
    />
  ),
  Button: ({
    children,
    disabled,
    ...props
  }: {
    children: React.ReactNode;
    disabled: boolean;
    onClick?: () => void;
  }) => (
    <button disabled={disabled} {...props}>
      {children}
    </button>
  ),
  TipCard: (
    props: React.PropsWithChildren<{
      image: { src: string; alt: string };
      className: string;
    }>,
  ) => <div data-testid="tip-card">{props.children}</div>,
}));

describe("GoLiveDate component", () => {
  const mockSetGoLiveDetails = vi.fn();
  const mockSetCurrentStep = vi.fn();
  const mockPush = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();

    (useJoinFlowStore as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
      setGoLiveDetails: mockSetGoLiveDetails,
      goLiveDetails: {},
      setCurrentStep: mockSetCurrentStep,
      switchingDetails: {},
      basket: { product: { quoteLookup: "quote123" } },
    });

    (useRouter as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
      push: mockPush,
    });
  });

  it("renders loading state and fetches appointments", async () => {
    (
      getEngineerAppointmentsModule.getEngineerAppointments as Mock
    ).mockResolvedValue({
      appointments: [
        {
          startDateTime: new Date("2023-01-01T08:00:00Z"),
          endDateTime: new Date("2023-01-01T13:00:00Z"),
          type: "am",
        },
      ],
    });

    render(<GoLiveDate />);

    expect(screen.getByText("Step Navigation")).toBeDefined();

    await waitFor(() => {
      expect(
        getEngineerAppointmentsModule.getEngineerAppointments,
      ).toHaveBeenCalledWith("quote123");
    });

    expect(screen.getByTestId("date-picker")).not.toBeDisabled();
  });

  it("shows error message if fetching appointments fails", async () => {
    (
      getEngineerAppointmentsModule.getEngineerAppointments as Mock
    ).mockResolvedValue({
      appointments: [],
      error: { type: "generalError", message: "Failed to fetch" },
    });

    render(<GoLiveDate />);

    await waitFor(() => {
      expect(
        screen.getByText("Failed to fetch engineer appointments"),
      ).toBeDefined();
    });
  });

  it("disables continue button if no date selected", async () => {
    (
      getEngineerAppointmentsModule.getEngineerAppointments as Mock
    ).mockResolvedValue({
      appointments: [],
    });

    render(<GoLiveDate />);

    const button = screen.getByRole("button", { name: /continue/i });
    expect(button).toBeDisabled();
  });

  it("enables continue button when date is selected", async () => {
    (
      getEngineerAppointmentsModule.getEngineerAppointments as Mock
    ).mockResolvedValue({
      appointments: [
        {
          startDateTime: new Date("2023-01-01T08:00:00Z"),
          endDateTime: new Date("2023-01-01T13:00:00Z"),
          type: "am",
        },
      ],
    });

    render(<GoLiveDate />);

    const datePicker = screen.getByTestId("date-picker");
    fireEvent.change(datePicker, { target: { value: "2023-01-01" } });

    await waitFor(() => {
      expect(screen.getByTestId("form-dropdown")).toBeDefined();
    });

    const dropdown = screen.getByTestId("form-dropdown");
    fireEvent.change(dropdown, { target: { value: "am" } });

    const button = screen.getByRole("button", { name: /continue/i });
    expect(button).not.toBeDisabled();
  });

  it("logs error and returns nothing if no quoteLookup in basket", () => {
    const consoleErrorSpy = vi
      .spyOn(console, "error")
      .mockImplementation(() => {});
    (useJoinFlowStore as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
      basket: { product: {} },
    });

    const { container } = render(<GoLiveDate />);

    expect(consoleErrorSpy).toHaveBeenCalledWith("no quoting code available");
    expect(container.innerHTML).toBe("");

    consoleErrorSpy.mockRestore();
  });
});
