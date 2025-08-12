import { DatePickerProps } from "@react-component-library/ui";
import useJoinFlowStore from "@store/useJoinFlowStore";
import { act, fireEvent, render, screen } from "@testing-library/react";
import { useRouter } from "next/navigation";
import React from "react";
import { Control, FieldValues, Path } from "react-hook-form";
import { beforeEach, describe, expect, it, Mock, vi } from "vitest";

import { useFetchEngineerAppointments } from "@/hooks/useFetchEngineerAppointments";
import { Appointment } from "@/services/helpers/getEngineerAppointments";
import * as goLiveDatesModule from "@/services/helpers/getGoLiveDates";

import GoLiveDate from "./";
import { goLiveDateText } from "./GoLiveDateProps";

vi.mock("@/services/helpers/getEngineerAppointments");
vi.mock("@services/helpers/getGoLiveDates");
vi.mock("@store/useJoinFlowStore");
vi.mock("next/navigation", () => ({ useRouter: vi.fn() }));
vi.mock("@/components/StepNavigationWithBasket", () => ({
  StepNavigationWithBasket: () => <div>Step Navigation</div>,
}));
vi.mock("@/components/Footer", () => ({ Footer: () => <footer /> }));

vi.mock("@/hooks/useFetchEngineerAppointments", () => ({
  useFetchEngineerAppointments: vi.fn(),
}));

vi.mock("@/hooks/useLoadingModal", () => ({
  useLoadingModal: vi.fn().mockReturnValue({
    loadingModalRef: vi.fn(),
    slidesWithAssetPath: [
      {
        src: "/images/world-animated.gif",
        message: "Sit tight! We're checking out your area",
      },
    ],
  }),
}));

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
  const mockSetIsLoadingModalOpen = vi.fn();
  const mockFetchEngineerAppointments = vi.fn();

  beforeAll(() => {
    HTMLDialogElement.prototype.show = vi.fn();
    HTMLDialogElement.prototype.showModal = vi.fn();
    HTMLDialogElement.prototype.close = vi.fn();
  });

  beforeEach(() => {
    vi.clearAllMocks();

    (useFetchEngineerAppointments as Mock).mockReturnValue({
      fetchEngineerAppointments: mockFetchEngineerAppointments,
    });

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
      setIsLoadingModalOpen: mockSetIsLoadingModalOpen,
      isLoadingModalOpen: false,
      setErrorInfo: vi.fn(),
    });

    (useRouter as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
      push: mockPush,
    });

    mockFetchEngineerAppointments.mockImplementation(
      async (
        setAppointmentError: (err: string) => void,
        setAvailableAppointments: (appts: Appointment[]) => void,
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
    expect(mockFetchEngineerAppointments).toHaveBeenCalledWith(
      expect.any(Function),
      expect.any(Function),
      expect.any(Function),
      "quote123",
    );
    expect(screen.getByTestId("date-picker")).not.toBeDisabled();
  });

  it("shows a tip card with first available appointment date when available appointments are found", async () => {
    await act(async () => {
      render(<GoLiveDate />);
    });
    expect(
      screen.getByText(/we can get you live as early as/i),
    ).toBeInTheDocument();
    expect(screen.getByText("1 January 2023")).toBeInTheDocument();
  });

  it("shows error tip card and retry button if fetching appointments fails, and no tip card with first available appointment", async () => {
    mockFetchEngineerAppointments.mockImplementationOnce(
      async (
        setAppointmentError: (msg: string) => void,
        setAvailableAppointments: (appts: Appointment[]) => void,
        setDocumentID: (id: string) => void,
      ) => {
        setAvailableAppointments([]);
        setAppointmentError("Failed to fetch engineer appointments");
        setDocumentID("");
      },
    );

    await act(async () => {
      render(<GoLiveDate />);
    });

    expect(
      screen.queryByText(/we can get you live as early as/i),
    ).not.toBeInTheDocument();
    expect(screen.getByText(/whoops/i)).toBeDefined();
    expect(
      screen.getByRole("button", {
        name: /Retry for available go live dates/i,
      }),
    ).toBeInTheDocument();
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

  it("redirects to error page if no quoteLookup in basket", async () => {
    const mockSetErrorInfo = vi.fn();
    (useJoinFlowStore as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
      basket: { product: {} },
      setIsLoadingModalOpen: vi.fn(),
      isLoadingModalOpen: false,
      setErrorInfo: mockSetErrorInfo,
    });

    // Ensure router mock is set up for this test
    (useRouter as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
      push: mockPush,
    });

    await act(async () => {
      render(<GoLiveDate />);
    });

    expect(mockSetErrorInfo).toHaveBeenCalledWith({ type: "basketError" });
    expect(mockPush).toHaveBeenCalledWith("/join-flow/error");
  });

  it("renders the toast message pill if switch is successful", async () => {
    (useJoinFlowStore as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
      switchingDetails: { otsSwitchStatus: "SWITCH_SUCCESS" },
      basket: {
        product: {
          quoteLookup: { value: "quote123", relationTo: "newSaleQuoteLookups" },
        },
      },
      setIsLoadingModalOpen: vi.fn(),
      isLoadingModalOpen: false,
      setErrorInfo: vi.fn(),
    });

    await act(async () => {
      render(<GoLiveDate />);
    });

    expect(screen.getByText("Switching successful")).toBeInTheDocument();
  });

  it("shows the loading modal when the user clicks continue", async () => {
    (useJoinFlowStore as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
      setGoLiveDetails: mockSetGoLiveDetails,
      goLiveDetails: {},
      setCurrentStep: mockSetCurrentStep,
      switchingDetails: {},
      basket: {
        id: "basket-123",
        product: {
          quoteLookup: { value: "quote123", relationTo: "newSaleQuoteLookups" },
        },
      },
      setBasket: vi.fn(),
      selectedPackage: { installationRequired: false }, // Changed to false to avoid timeSlot requirement
      setIsLoadingModalOpen: mockSetIsLoadingModalOpen,
      isLoadingModalOpen: false,
      setErrorInfo: vi.fn(),
    });

    await act(async () => {
      render(<GoLiveDate />);
    });

    const datePicker = screen.getByTestId("date-picker");
    fireEvent.change(datePicker, { target: { value: "2023-01-01" } });

    const button = screen.getByRole("button", { name: /continue/i });

    await act(async () => {
      fireEvent.click(button);
    });

    expect(mockSetIsLoadingModalOpen).toHaveBeenCalledWith(true);
    expect(
      screen.getByText("Sit tight! We're checking out your area"),
    ).toBeInTheDocument();
  });
});
