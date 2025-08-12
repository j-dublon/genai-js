import { render, screen } from "@testing-library/react";
import { useRouter } from "next/navigation";
import { createRef } from "react";
import { describe, expect, it, vi } from "vitest";

import { PaymentGoLiveModal } from "./index";

vi.mock("next/navigation", () => ({ useRouter: vi.fn() }));

vi.mock("@react-component-library/ui", async () => {
  const actual = await vi.importActual("@react-component-library/ui");
  return {
    ...actual,
    InfoModal: vi.fn(({ title, children }) => (
      <div data-testid="info-modal" role="dialog" aria-labelledby="modal-title">
        <h2 id="modal-title">{title}</h2>
        <div>{children}</div>
      </div>
    )),
    TipCard: vi.fn(({ children, className }) => (
      <div data-testid="tip-card" className={className}>
        {children}
      </div>
    )),
  };
});

vi.mock("@/lib/get-asset-path", () => ({
  getAssetPath: vi.fn((path) => path),
}));

vi.mock("@/components/DateTimeSelectionForm", () => ({
  default: vi.fn(({ tipCard, submitButtonText }) => (
    <div data-testid="datetime-selection-form">
      <div>Date Time Selection Form</div>
      {tipCard}
      <button>{submitButtonText}</button>
    </div>
  )),
}));

vi.mock("@store/useJoinFlowStore", () => ({
  default: vi.fn(() => ({
    setGoLiveDetails: vi.fn(),
    goLiveDetails: {
      selectedDate: "2024-01-15",
      engineerTimeSlot: {
        startDateTime: "2024-01-15T09:00:00Z",
        endDateTime: "2024-01-15T11:00:00Z",
        selectionIdentifier: "slot-1",
      },
    },
    basket: {
      id: "test-basket",
      product: { quoteLookup: { value: "test-quote" } },
    },
    setBasket: vi.fn(),
    selectedPackage: {
      installationRequired: false,
    },
  })),
}));

vi.mock("@/screens/GoLiveDate/utils/GoLiveDateUtils", () => ({
  fetchEngineerAppointments: vi.fn((setError, setAppointments, setLoading) => {
    setAppointments([]);
    setLoading(false);
  }),
}));

vi.mock("@/services/helpers/getGoLiveDates", () => ({
  getGoLiveDates: vi.fn(() =>
    Promise.resolve(["2024-01-15", "2024-01-16", "2024-01-17"]),
  ),
}));

vi.mock("@/services/helpers/updateBasket", () => ({
  updateBasket: vi.fn(() => Promise.resolve({ basket: { id: "test" } })),
}));

vi.mock("next/navigation", () => ({
  useRouter: vi.fn(),
}));
const mockUseRouter = vi.mocked(useRouter);

describe("PaymentGoLiveModal", () => {
  beforeEach(() => {
    mockUseRouter.mockReturnValue({
      push: vi.fn(),
      back: vi.fn(),
      forward: vi.fn(),
      refresh: vi.fn(),
      replace: vi.fn(),
      prefetch: vi.fn(),
    });
  });

  const renderComponent = () => {
    const modalRef = createRef<HTMLDialogElement>();
    return render(
      <PaymentGoLiveModal modalRef={modalRef} setIsModalOpen={vi.fn()} />,
    );
  };

  it("renders InfoModal with correct title", () => {
    renderComponent();

    expect(screen.getByTestId("info-modal")).toBeInTheDocument();
    expect(
      screen.getByText("Your go-live date & Switching info"),
    ).toBeInTheDocument();
  });

  it("renders DateTimeSelectionForm", () => {
    renderComponent();

    expect(screen.getByTestId("datetime-selection-form")).toBeInTheDocument();
    expect(screen.getByText("Date Time Selection Form")).toBeInTheDocument();
    expect(screen.getByText("Save my go live info")).toBeInTheDocument();
  });

  it("renders TipCard with correct content", () => {
    renderComponent();

    const tipCard = screen.getByTestId("tip-card");
    expect(tipCard).toBeInTheDocument();
    expect(screen.getByText("Important:")).toBeInTheDocument();
  });
});
