import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import { packageSelectionPageText } from "./ChooseYourPackageProps";
import { ChooseYourPackage } from "./index";

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
  tint: string;
  featurePackage?: boolean;
  promotion?: string;
};

const mockSelectPackage = vi.fn();
const mockSetServiceAddress = vi.fn();
const mockRouterPush = vi.fn();

const mockUseScrollable = {
  isMouseDown: false,
  onMouseDown: vi.fn(),
  onMouseUp: vi.fn(),
  onMouseMove: vi.fn(),
};

vi.mock("@react-component-library/ui", () => ({
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
  useScrollable: () => mockUseScrollable,
}));

vi.mock("@react-component-library/ui/server", () => ({
  PackageCard: ({
    pkg,
    onPackageSelect,
    tint,
    featurePackage,
    promotion,
  }: PackageCardProps) => (
    <div data-testid="package-card" onClick={() => onPackageSelect(pkg)}>
      <div>{pkg.name}</div>
      <div>£{pkg.price.monthly}/month</div>
      <div data-testid="contract-length">{pkg.contractLength}</div>
      {featurePackage && (
        <div data-testid="feature-package">Feature Package</div>
      )}
      {promotion && <div data-testid="promotion">{promotion}</div>}
      <div data-testid="tint">{tint}</div>
    </div>
  ),
}));

vi.mock("@store/useJoinFlowStore", () => ({
  default: () => ({
    selectPackage: mockSelectPackage,
    setServiceAddress: mockSetServiceAddress,
  }),
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
}));

describe("ChooseYourPackage", () => {
  beforeEach(() => {
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

    const packageCards = screen.getAllByTestId("package-card");
    await userEvent.click(packageCards[0]);

    expect(mockSelectPackage).toHaveBeenCalled();
    expect(mockRouterPush).toHaveBeenCalledWith("/join-flow/personal-details");
  });

  it("renders the toggle switch with correct initial state", () => {
    render(<ChooseYourPackage />);
    const toggleSwitch = screen.getByTestId("toggle-switch");

    expect(toggleSwitch).toBeInTheDocument();
    expect(toggleSwitch).toHaveAttribute("aria-pressed", "false");
    expect(toggleSwitch).toHaveTextContent("12-months");
  });

  it("filters packages based on contract length when toggle is switched", async () => {
    render(<ChooseYourPackage />);

    const initialContractLengths = screen.getAllByTestId("contract-length");
    const initial12MonthCount = initialContractLengths.filter(
      (el) => el.textContent === "12",
    ).length;
    expect(initial12MonthCount).toBeGreaterThan(0);

    const toggleSwitch = screen.getByTestId("toggle-switch");
    await userEvent.click(toggleSwitch);

    const updatedContractLengths = screen.getAllByTestId("contract-length");
    const updated24MonthCount = updatedContractLengths.filter(
      (el) => el.textContent === "24",
    ).length;
    expect(updated24MonthCount).toBeGreaterThan(0);
  });

  it("renders the help link", () => {
    render(<ChooseYourPackage />);
    const helpLink = screen.getByText("I need help choosing");

    expect(helpLink).toBeInTheDocument();
    expect(helpLink).toHaveClass("text-ui-link", "underline", "cursor-pointer");
  });
});
