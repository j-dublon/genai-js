import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";

import { packageSelectionPageText } from "./ChooseYourPackageProps";
import { ChooseYourPackage } from "./index";

const { mockSelectPackage, mockSetBasket, mockCreateBasket, mockRouterPush } =
  vi.hoisted(() => ({
    mockSelectPackage: vi.fn(),
    mockSetBasket: vi.fn(),
    mockCreateBasket: vi.fn(),
    mockRouterPush: vi.fn(),
  }));

const mockQuoteResponse = {
  documentID: "quote-123",
  response: {
    products: [
      {
        selectionIdentifier: "product-selection-123",
        krakenProductCode: "test-product",
        frontendIdentifier: "150-12",
        termMonths: "12",
        installationRequired: false,
        prices: {
          basePrice: 2500,
          discountedPrice: 2500,
        },
        speeds: {
          download: 150,
          upload: 30,
        },
      },
    ],
  },
};

type PackageCardProps = {
  pkg: {
    id: string;
    name: string;
    price: {
      monthly: number;
    };
    contractLength: number;
  };
  onPackageSelect: (pkg: {
    id: string;
    name: string;
    price: { monthly: number };
  }) => void;
  onViewDetails: (pkg: {
    id: string;
    name: string;
    price: { monthly: number };
  }) => void;
  tint: string;
  featurePackage?: boolean;
  promotion?: string;
};

const mockUseScrollable = {
  isMouseDown: false,
  onMouseDown: vi.fn(),
  onMouseUp: vi.fn(),
  onMouseMove: vi.fn(),
};

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
    PackageCard: ({
      pkg,
      onPackageSelect,
      onViewDetails,
      tint,
      featurePackage,
      promotion,
    }: PackageCardProps) => (
      <div data-testid="package-card">
        <div>{pkg.name}</div>
        <div>£{pkg.price.monthly}/month</div>
        <div data-testid="contract-length">{pkg.contractLength}</div>
        {featurePackage && (
          <div data-testid="feature-package">Feature Package</div>
        )}
        {promotion && <div data-testid="promotion">{promotion}</div>}
        <div data-testid="tint">{tint}</div>
        <button
          data-testid="select-package"
          onClick={() => onPackageSelect(pkg)}
        >
          Select Package
        </button>
        <button data-testid="view-details" onClick={() => onViewDetails(pkg)}>
          View Details
        </button>
      </div>
    ),
    useScrollable: () => mockUseScrollable,
  };
});

vi.mock("@store/useJoinFlowStore", () => ({
  default: () => ({
    selectPackage: mockSelectPackage,
    setBasket: mockSetBasket,
    quoteResponse: mockQuoteResponse,
  }),
}));

vi.mock("@/services/helpers/createBasket", () => ({
  createBasket: mockCreateBasket,
}));

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

vi.mock("next/navigation", () => ({
  useRouter: () => ({
    push: mockRouterPush,
  }),
  usePathname: () => "/test-path",
}));

vi.mock("@/screens/PackageSelection/components/SpeedCalculator", () => ({
  SpeedCalculator: ({
    onShowPackageDetails,
  }: {
    onShowPackageDetails: (pkg: { id: string }) => void;
  }) => (
    <dialog data-testid="speed-calculator-mock">
      Speed Calculator Mock
      <button onClick={() => onShowPackageDetails({ id: "test-package" })}>
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
      packageDetails: {
        id: string;
        name: string;
        contractLength: number;
      };
      handlePackageSelection: (id: string) => void;
    }) => (
      <div data-testid="package-selection-details">
        <div data-testid="package-name">{packageDetails.name}</div>
        <div data-testid="package-contract-length">
          {packageDetails.contractLength}
        </div>
        <button
          data-testid="package-selection-button"
          onClick={() => handlePackageSelection(packageDetails.id)}
        >
          Add to basket
        </button>
      </div>
    ),
  }),
);

describe("ChooseYourPackage", () => {
  const mockBasketResponse = {
    id: "basket-123",
    locked: false,
    product: {
      quoteLookup: "quote-123",
      selectionIdentifier: "product-selection-123",
    },
    updatedAt: "2025-01-01T00:00:00.000Z",
    createdAt: "2025-01-01T00:00:00.000Z",
  };

  beforeEach(() => {
    vi.clearAllMocks();
    mockCreateBasket.mockResolvedValue({
      basket: mockBasketResponse,
    });
  });

  afterAll(() => {
    vi.clearAllMocks();
  });

  it("renders the component with the correct title", () => {
    render(<ChooseYourPackage />);
    expect(
      screen.getByText(packageSelectionPageText.pageTitle),
    ).toBeInTheDocument();
    expect(
      screen.getByText(packageSelectionPageText.pageSubtitle),
    ).toBeInTheDocument();
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
    expect(promotion).toHaveTextContent("3 months free");
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

    expect(mockSelectPackage).toHaveBeenCalled();

    await waitFor(() => {
      expect(mockCreateBasket).toHaveBeenCalledWith({
        product: {
          selectionIdentifier: "product-selection-123",
          quoteLookup: "quote-123",
        },
      });
    });

    await waitFor(() => {
      expect(mockSetBasket).toHaveBeenCalledWith(mockBasketResponse);
      expect(mockRouterPush).toHaveBeenCalledWith(
        "/join-flow/personal-details",
      );
    });
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

    const initialContractLengths = screen.getAllByTestId("contract-length");
    const initial24MonthCount = initialContractLengths.filter(
      (el) => el.textContent === "24",
    ).length;
    expect(initial24MonthCount).toBeGreaterThan(0);

    const toggleSwitch = screen.getByTestId("toggle-switch");
    await userEvent.click(toggleSwitch);

    const updatedContractLengths = screen.getAllByTestId("contract-length");
    const updated12MonthCount = updatedContractLengths.filter(
      (el) => el.textContent === "12",
    ).length;
    expect(updated12MonthCount).toBeGreaterThan(0);
  });

  it("renders the help link", () => {
    render(<ChooseYourPackage />);
    const helpLink = screen.getByText("I need help choosing");

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
    const helpLink = screen.getByText("I need help choosing");
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

    expect(mockSelectPackage).toHaveBeenCalled();
    expect(mockRouterPush).toHaveBeenCalledWith("/join-flow/personal-details");
  });
});
