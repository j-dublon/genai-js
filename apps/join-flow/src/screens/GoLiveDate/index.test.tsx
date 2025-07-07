import { DatePickerProps } from "@react-component-library/ui";
import useJoinFlowStore from "@store/useJoinFlowStore";
import { act, fireEvent, render, screen } from "@testing-library/react";
import { useRouter } from "next/navigation";
import React from "react";
import { Control, FieldValues, Path } from "react-hook-form";
import { beforeEach, describe, expect, it, Mock, vi } from "vitest";

import { Appointment } from "@/services/helpers/getEngineerAppointments";
import * as goLiveDatesModule from "@/services/helpers/getGoLiveDates";

import GoLiveDate from "./";
import { goLiveDateText } from "./GoLiveDateProps";
import { fetchEngineerAppointments } from "./utils/GoLiveDateUtils";

vi.mock("@/services/helpers/getEngineerAppointments");
vi.mock("@services/helpers/getGoLiveDates");
vi.mock("@store/useJoinFlowStore");
vi.mock("next/navigation", () => ({ useRouter: vi.fn() }));
vi.mock("@/components/StepNavigationWithBasket", () => ({
  StepNavigationWithBasket: () => <div>Step Navigation</div>,
}));
vi.mock("@/components/Footer", () => ({ Footer: () => <footer /> }));

vi.mock("./utils/GoLiveDateUtils", async () => {
  const actual = await vi.importActual("./utils/GoLiveDateUtils");
  return {
    ...actual,
    fetchEngineerAppointments: vi.fn(),
  };
});

interface FormDropdownProps<TFieldValues extends FieldValues, TValue> {
  control: Control<TFieldValues>;
  name: Path<TFieldValues>;
  dropdownLabel?: string;
  dropdownPlaceholder: string;
  options: Record<string, TValue>;
  errorMessage?: string;
}

vi.mock("@/components/FormDropdown", () => ({
  FormDropdown: <TFieldValues extends FieldValues, TValue>({
    control,
    name,
    dropdownLabel,
    dropdownPlaceholder,
    options,
  }: FormDropdownProps<TFieldValues, TValue>) => {
    const typedControl = control as unknown as {
      _fields?: Record<
        string,
        {
          onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
        }
      >;
    };

    return (
      <select
        aria-label={dropdownLabel}
        name={name as string}
        data-testid="form-dropdown"
        onChange={(e) => {
          typedControl._fields?.[name as string]?.onChange(e);
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

interface ButtonProps {
  children: React.ReactNode;
  disabled: boolean;
  [key: string]: unknown;
}

vi.mock("@react-component-library/ui", async () => {
  const actual = await vi.importActual("@react-component-library/ui");
  return {
    ...actual,
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
    Button: ({ children, disabled, ...props }: ButtonProps) => (
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
  };
});

describe("GoLiveDate component", () => {
  const mockSetGoLiveDetails = vi.fn();
  const mockSetCurrentStep = vi.fn();
  const mockPush = vi.fn();

  beforeAll(() => {
    HTMLDialogElement.prototype.show = vi.fn();
    HTMLDialogElement.prototype.showModal = vi.fn();
    HTMLDialogElement.prototype.close = vi.fn();
  });

  beforeEach(() => {
    vi.clearAllMocks();

    (useJoinFlowStore as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
      setGoLiveDetails: mockSetGoLiveDetails,
      goLiveDetails: {},
      setCurrentStep: mockSetCurrentStep,
      switchingDetails: {},
      basket: {
        product: {
          quoteLookup: { value: "quote123", relationTo: "newSaleQuoteLookups" },
        },
      },
      setBasket: vi.fn(),
      selectedPackage: { installationRequired: true },
    });

    (useRouter as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
      push: mockPush,
    });

    (fetchEngineerAppointments as Mock).mockImplementation(
      async (
        setAppointmentError: (err: string) => void,
        setAvailableAppointments: (appts: Appointment[]) => void,
        setLoadingAppointments: (loading: boolean) => void,
        setDocumentID: (id: string) => void,
      ) => {
        setAvailableAppointments([
          {
            startDateTime: new Date("2023-01-01T08:00:00Z"),
            endDateTime: new Date("2023-01-01T13:00:00Z"),
            type: "am",
            selectionIdentifier: "slot1",
          },
        ]);
        setAppointmentError("");
        setDocumentID("doc123");
        setLoadingAppointments(false);
      },
    );

    (goLiveDatesModule.getGoLiveDates as Mock).mockResolvedValue([
      "2023-01-01",
      "2023-01-02",
    ]);
  });

  it("renders and fetches appointments", async () => {
    await act(async () => {
      render(<GoLiveDate />);
    });

    expect(screen.getByText("Step Navigation")).toBeDefined();
    expect(fetchEngineerAppointments).toHaveBeenCalledWith(
      expect.any(Function),
      expect.any(Function),
      expect.any(Function),
      expect.any(Function),
      "quote123",
    );
    expect(screen.getByTestId("date-picker")).not.toBeDisabled();
  });

  it("shows error message if fetching appointments fails", async () => {
    (fetchEngineerAppointments as Mock).mockImplementationOnce(
      async (
        setAppointmentError: (msg: string) => void,
        setAvailableAppointments: (appts: Appointment[]) => void,
        setLoadingAppointments: (loading: boolean) => void,
        setDocumentID: (id: string) => void,
      ) => {
        setAvailableAppointments([]);
        setAppointmentError("Failed to fetch engineer appointments");
        setLoadingAppointments(false);
        setDocumentID("");
      },
    );

    await act(async () => {
      render(<GoLiveDate />);
    });

    expect(
      screen.getByText("Failed to fetch engineer appointments"),
    ).toBeDefined();
  });

  it("enables continue button when date and time slot are selected", async () => {
    await act(async () => {
      render(<GoLiveDate />);
    });

    const datePicker = screen.getByTestId("date-picker");
    fireEvent.change(datePicker, { target: { value: "2023-01-01" } });

    const dropdown = screen.getByTestId("form-dropdown");
    fireEvent.change(dropdown, { target: { value: "slot1" } });

    const button = screen.getByRole("button", { name: /continue/i });
    expect(button).not.toBeDisabled();
  });

  it("opens the engineer visit modal when the engineer link is clicked", async () => {
    await act(async () => {
      render(<GoLiveDate />);
    });

    const engineerLink = screen.getByRole("button", {
      name: goLiveDateText.engineerLink,
    });
    fireEvent.click(engineerLink);

    expect(HTMLDialogElement.prototype.showModal).toHaveBeenCalled();
  });

  it("closes the engineer visit modal when clicking outside", async () => {
    await act(async () => {
      render(<GoLiveDate />);
    });

    const engineerLink = screen.getByRole("button", {
      name: goLiveDateText.engineerLink,
    });
    fireEvent.click(engineerLink);

    const modal = document.querySelector("dialog");
    if (modal) {
      modal.setAttribute("open", "");
    }

    fireEvent.mouseDown(document.body, { clientX: 1, clientY: 1 });

    expect(HTMLDialogElement.prototype.close).toHaveBeenCalled();
  });

  it("logs error and returns nothing if no quoteLookup in basket", async () => {
    const consoleErrorSpy = vi
      .spyOn(console, "error")
      .mockImplementation(() => {});

    (useJoinFlowStore as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
      basket: { product: {} },
    });

    let container: HTMLElement;
    await act(async () => {
      const result = render(<GoLiveDate />);
      container = result.container;
    });

    expect(consoleErrorSpy).toHaveBeenCalledWith("no quoting code available");
    expect(container!.innerHTML).toBe("");

    consoleErrorSpy.mockRestore();
  });
});
