import useJoinFlowStore, {
  type StoreSelectedPackage,
} from "@store/useJoinFlowStore";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useRouter } from "next/navigation";
import { beforeEach, describe, expect, it, vi } from "vitest";

import { createBasket } from "@/services/helpers/createBasket";

import { speedCalculatorText } from "./ChooseYourPackageProps";
import { ChooseYourPackage } from "./index";

vi.mock("@react-component-library/ui", async () => {
  const actual = await vi.importActual("@react-component-library/ui");
  return {
    ...actual,
    ToggleSwitch: ({
      isOn,
      onChange,
    }: {
      isOn: boolean;
      onChange: (isOn: boolean) => void;
    }) => (
      <button
        data-testid="toggle-switch"
        onClick={() => onChange(!isOn)}
        aria-pressed={isOn}
      >
        {isOn ? "24-months" : "12-months"}
      </button>
    ),
    PromotionCard: ({
      heading,
      features,
      mainPrice,
      onButtonClick,
      onDetailsClick,
      buttonText,
      detailsButtonText,
      tint,
      featured,
      promotionPillsText,
    }: {
      heading: string;
      features: Array<{ value: number; unit: string; label: string }>;
      mainPrice: number;
      onButtonClick: () => void;
      onDetailsClick?: () => void;
      buttonText: string;
      detailsButtonText?: string;
      tint: string;
      featured?: boolean;
      promotionPillsText?: string[];
    }) => (
      <div data-testid="package-card">
        <div>{heading}</div>
        <div>
          {features.map((feature, index) => (
            <div key={index}>
              {feature.value}
              {feature.unit} {feature.label}
            </div>
          ))}
        </div>
        <div>£{mainPrice}/month</div>
        {featured && <div data-testid="feature-package">Feature Package</div>}
        {promotionPillsText && promotionPillsText.length > 0 && (
          <div data-testid="promotion">{promotionPillsText[0]}</div>
        )}
        <div data-testid="tint">{tint}</div>
        <button data-testid="select-package" onClick={onButtonClick}>
          {buttonText}
        </button>
        {onDetailsClick && detailsButtonText && (
          <button data-testid="view-details" onClick={onDetailsClick}>
            {detailsButtonText}
          </button>
        )}
      </div>
    ),
    useScrollable: () => mockUseScrollable,
  };
});

vi.mock("@/lib/formatDate", () => ({
  formatDisplayDate: () => "1 April 2026",
}));

vi.mock("@/hooks/usePricingCalculations", () => ({
  convertPenceToPounds: (pence: number) => pence / 100,
}));

vi.mock("@store/useJoinFlowStore", () => ({
  default: vi.fn(),
}));
const mockUseJoinFlowStore = vi.mocked(useJoinFlowStore);

vi.mock("@/services/helpers/createBasket", () => ({
  createBasket: vi.fn(),
}));
const mockCreateBasket = vi.mocked(createBasket);

vi.mock("@/hooks/useAddress", () => ({
  useAddress: () => ({
    selectedAddress: {
      line1: "123 Test Street",
      postcode: "SW1A 2AA",
      addressKey: "test-key",
      addressKeyType: "NAD",
    },
  }),
}));

vi.mock("@/hooks/useTopSpeedPackage", () => ({
  useTopSpeedPackage: () => null,
}));

vi.mock("@/hooks/useClearFocus", () => ({
  useClearFocus: () => {},
}));

vi.mock("next/navigation", () => ({
  useRouter: vi.fn(),
  usePathname: () => "/test-path",
}));
const mockUseRouter = vi.mocked(useRouter);

vi.mock("@/screens/PackageSelection/components/SpeedCalculator", () => ({
  SpeedCalculator: ({
    onShowPackageDetails,
  }: {
    onShowPackageDetails: (pkg: StoreSelectedPackage) => void;
  }) => (
    <dialog data-testid="speed-calculator-mock">
      Speed Calculator Mock
      <button
        onClick={() =>
          onShowPackageDetails({
            frontendIdentifier: "test-package",
            frontendTitle: "test-package",
            krakenProductCode: "TEST-CODE",
            termMonths: 24,
            selectionIdentifier: "test-selection",
            installationRequired: false,
            appliedPromotionUUIDs: null,
            prices: {
              basePrice: 3000,
              discountedPrice: 3000,
              annualPriceRise: null,
            },
            speeds: {
              download: 150,
              upload: 30,
            },
            extras: null,
            offers: null,
            id: null,
          } as StoreSelectedPackage)
        }
      >
        Show Package Details
      </button>
    </dialog>
  ),
}));

vi.mock(
  "@/screens/PackageSelection/components/PackageSelectionDetails",
  () => ({
    PackageSelectionDetails: ({
      packageDetails,
      handlePackageSelection,
    }: {
      packageDetails: StoreSelectedPackage;
      handlePackageSelection: (pkg: StoreSelectedPackage) => void;
    }) => (
      <div data-testid="package-selection-details">
        <div data-testid="package-name">
          {packageDetails.speeds.download}Mbps
        </div>
        <div data-testid="package-contract-length">
          {packageDetails.termMonths}
        </div>
        <button
          data-testid="package-selection-button"
          onClick={() =>
            handlePackageSelection(packageDetails as StoreSelectedPackage)
          }
        >
          Add to basket
        </button>
      </div>
    ),
  }),
);

const mockQuoteResponse = {
  documentID: "quote-123",
  response: {
    products: [
      {
        selectionIdentifier: "product-selection-123",
        krakenProductCode: "BT-150-24M_30",
        frontendIdentifier: "150-24",
        frontendTitle: "C-150",
        termMonths: 24,
        installationRequired: false,
        appliedPromotionUUIDs: [],
        prices: {
          basePrice: 3000,
          discountedPrice: 3000,
          annualPriceRise: [
            {
              price: 3300,
              date: "2026-04-01T12:00:00.000Z",
              id: "rise-1",
            },
          ],
        },
        speeds: {
          download: 150,
          upload: 30,
        },
        extras: null,
        offers: null,
        id: "c-150",
      },
      {
        selectionIdentifier: "product-selection-124",
        krakenProductCode: "BT-500-24M_35",
        frontendIdentifier: "500-24",
        termMonths: 24,
        installationRequired: false,
        appliedPromotionUUIDs: [],
        prices: {
          basePrice: 3500,
          discountedPrice: 3500,
          annualPriceRise: [
            {
              price: 3800,
              date: "2026-04-01T12:00:00.000Z",
              id: "rise-2",
            },
          ],
        },
        speeds: {
          download: 500,
          upload: 20,
        },
        extras: null,
        offers: null,
        id: "c-500",
      },
      {
        selectionIdentifier: "product-selection-125",
        krakenProductCode: "BT-900-24M_41",
        frontendIdentifier: "900-24",
        termMonths: 24,
        installationRequired: false,
        appliedPromotionUUIDs: [],
        prices: {
          basePrice: 4100,
          discountedPrice: 4100,
          annualPriceRise: [
            {
              price: 4400,
              date: "2026-04-01T12:00:00.000Z",
              id: "rise-3",
            },
          ],
        },
        speeds: {
          download: 900,
          upload: 100,
        },
        extras: null,
        offers: [
          {
            blockType: "giftCardBlock",
            value: 100,
          },
        ],
        id: "c-900",
      },
      {
        selectionIdentifier: "product-selection-126",
        krakenProductCode: "BT-150-12M_32",
        frontendIdentifier: "150-12",
        termMonths: 12,
        installationRequired: false,
        appliedPromotionUUIDs: [],
        prices: {
          basePrice: 3200,
          discountedPrice: 3200,
          annualPriceRise: [
            {
              price: 3500,
              date: "2026-04-01T12:00:00.000Z",
              id: "rise-4",
            },
          ],
        },
        speeds: {
          download: 150,
          upload: 30,
        },
        extras: null,
        offers: null,
        id: "c-150-12",
      },
      {
        selectionIdentifier: "product-selection-127",
        krakenProductCode: "BT-500-12M_37",
        frontendIdentifier: "500-12",
        termMonths: 12,
        installationRequired: false,
        appliedPromotionUUIDs: [],
        prices: {
          basePrice: 3700,
          discountedPrice: 3700,
          annualPriceRise: [
            {
              price: 4000,
              date: "2026-04-01T12:00:00.000Z",
              id: "rise-5",
            },
          ],
        },
        speeds: {
          download: 500,
          upload: 20,
        },
        extras: null,
        offers: null,
        id: "c-500-12",
      },
    ],
  },
};

const mockUseScrollable = {
  isMouseDown: false,
  onMouseDown: vi.fn(),
  onMouseUp: vi.fn(),
  onMouseMove: vi.fn(),
};

describe("ChooseYourPackage", () => {
  const mockBasketResponse = {
    id: "basket-123",
    locked: false,
    product: {
      quoteLookup: {
        value: "quote-123",
        relationTo: "newSaleQuoteLookups" as const,
      },
      selectionIdentifier: "product-selection-123",
    },
    updatedAt: "2025-01-01T00:00:00.000Z",
    createdAt: "2025-01-01T00:00:00.000Z",
  };

  const mockSetIsLoadingModalOpen = vi.fn();
  let mockIsLoadingModalOpen = false;

  const mockStore = {
    selectPackage: vi.fn(),
    setBasket: vi.fn(),
    setSoftCreditCheck: vi.fn(),
    quoteResponse: mockQuoteResponse,
    setIsLoadingModalOpen: mockSetIsLoadingModalOpen,
    get isLoadingModalOpen() {
      return mockIsLoadingModalOpen;
    },
  };

  const mockRouter = {
    push: vi.fn(),
    back: vi.fn(),
    forward: vi.fn(),
    refresh: vi.fn(),
    replace: vi.fn(),
    prefetch: vi.fn(),
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
    mockCreateBasket.mockResolvedValue({
      basket: mockBasketResponse,
    });
    mockUseJoinFlowStore.mockReturnValue(mockStore);
    mockUseRouter.mockReturnValue(mockRouter);
  });

  afterAll(() => {
    vi.clearAllMocks();
  });

  it("renders package cards", () => {
    render(<ChooseYourPackage />);
    const packageCards = screen.getAllByTestId("package-card");
    expect(packageCards.length).toBeGreaterThan(0);
  });

  it("renders the feature package with promotion", () => {
    render(<ChooseYourPackage />);
    const featurePackage = screen.getByTestId("feature-package");
    const promotion = screen.getByTestId("promotion");

    expect(featurePackage).toBeInTheDocument();
    expect(promotion).toBeInTheDocument();
  });

  it("applies different tints to package cards", () => {
    render(<ChooseYourPackage />);
    const tints = screen.getAllByTestId("tint");

    const uniqueTints = new Set(tints.map((tint) => tint.textContent));
    expect(uniqueTints.size).toBeGreaterThan(1);
  });

  it("calls the expected functions when a package is selected", async () => {
    render(<ChooseYourPackage />);

    const packageCards = screen.getAllByTestId("select-package");
    await userEvent.click(packageCards[0]);

    expect(mockStore.selectPackage).toHaveBeenCalled();

    await waitFor(() => {
      expect(mockCreateBasket).toHaveBeenCalledWith({
        product: {
          selectionIdentifier: expect.any(String),
          quoteLookup: {
            value: "quote-123",
            relationTo: "newSaleQuoteLookups",
          },
        },
      });
    });

    expect(mockStore.setBasket).toHaveBeenCalled();
    expect(mockRouter.push).toHaveBeenCalledWith("/join-flow/personal-details");
  });

  it("renders the toggle switch with correct initial state", () => {
    render(<ChooseYourPackage />);
    const toggleSwitch = screen.getByTestId("toggle-switch");

    expect(toggleSwitch).toBeInTheDocument();
    expect(toggleSwitch).toHaveAttribute("aria-pressed", "true");
    expect(toggleSwitch).toHaveTextContent("24-months");
  });

  it("filters packages based on contract length when toggle is switched", async () => {
    render(<ChooseYourPackage />);

    const initialPackageCards = screen.getAllByTestId("package-card");
    expect(initialPackageCards).toHaveLength(3);

    const toggleSwitch = screen.getByTestId("toggle-switch");
    await userEvent.click(toggleSwitch);

    const updatedPackageCards = screen.getAllByTestId("package-card");
    expect(updatedPackageCards).toHaveLength(2);
  });

  it("renders the help link", () => {
    render(<ChooseYourPackage />);
    const helpLink = screen.getByText(
      speedCalculatorText.speedCalculatorButtonText,
    );

    expect(helpLink).toBeInTheDocument();
    expect(helpLink).toHaveClass("text-ui-link", "underline", "cursor-pointer");
  });

  it("renders the speed calculator modal with correct props and opens when help link is clicked", async () => {
    HTMLDialogElement.prototype.showModal = vi.fn();
    render(<ChooseYourPackage />);
    const modal = screen.getByLabelText("Speed calculator modal");
    expect(modal).toBeInTheDocument();
    expect(modal).toHaveAttribute("aria-modal", "true");
    expect(modal).not.toHaveAttribute("open");
    const helpLink = screen.getByText(
      speedCalculatorText.speedCalculatorButtonText,
    );
    await userEvent.click(helpLink);
    expect(HTMLDialogElement.prototype.showModal).toHaveBeenCalled();
  });

  it("opens package details modal when view details is clicked", async () => {
    HTMLDialogElement.prototype.showModal = vi.fn();
    render(<ChooseYourPackage />);

    const viewDetailsButtons = screen.getAllByTestId("view-details");
    await userEvent.click(viewDetailsButtons[0]);

    expect(screen.getByTestId("package-selection-details")).toBeInTheDocument();
    expect(HTMLDialogElement.prototype.showModal).toHaveBeenCalled();
  });

  it("handles package selection from details modal", async () => {
    HTMLDialogElement.prototype.showModal = vi.fn();
    render(<ChooseYourPackage />);

    const viewDetailsButtons = screen.getAllByTestId("view-details");
    await userEvent.click(viewDetailsButtons[0]);

    const addToBasketButton = screen.getByTestId("package-selection-button");
    await userEvent.click(addToBasketButton);

    expect(mockStore.selectPackage).toHaveBeenCalled();
    expect(mockRouter.push).toHaveBeenCalledWith("/join-flow/personal-details");
  });

  it("opens the loading modal when the package is selected", async () => {
    mockCreateBasket.mockImplementation(
      () => new Promise((resolve) => resolve({ basket: mockBasketResponse })),
    );

    const { rerender } = render(<ChooseYourPackage />);

    const packageCards = screen.getAllByTestId("select-package");
    await userEvent.click(packageCards[0]);

    const loadingDialog = screen.queryAllByRole("dialog", { hidden: true })[0];
    expect(loadingDialog).toBeInTheDocument();
    expect(loadingDialog).toHaveAttribute("aria-modal", "true");
    expect(loadingDialog).not.toHaveAttribute("open");

    expect(mockStore.selectPackage).toHaveBeenCalled();
    expect(mockSetIsLoadingModalOpen).toHaveBeenCalledWith(true);
    expect(mockCreateBasket).toHaveBeenCalled();

    // Simulate the store state change and force a re-render
    mockIsLoadingModalOpen = true;
    rerender(<ChooseYourPackage />);

    await waitFor(() => {
      expect(HTMLDialogElement.prototype.showModal).toHaveBeenCalled();
    });
  });
});
