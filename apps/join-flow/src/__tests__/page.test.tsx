import { act, render, screen, within } from "@testing-library/react";
import { vi } from "vitest";

import PackageSelection from "@/screens/PackageSelection";
import {
  broadbandPackages,
  packageSelectionPageText,
} from "@/screens/PackageSelection/components/ChooseYourPackage/ChooseYourPackageProps";
import { bannerTitle } from "@/screens/PackageSelection/components/HeroBanner/HeroBannerProps";
import { heading as remindersHeading } from "@/screens/PackageSelection/components/Reminders/RemindersProps";

vi.mock("next/navigation", () => ({
  useRouter: () => ({
    push: vi.fn(),
  }),
}));

vi.mock("@store/useJoinFlowStore", () => ({
  default: () => ({
    selectPackage: vi.fn(),
    setServiceAddress: vi.fn(),
  }),
}));

vi.mock("@react-component-library/ui", async () => {
  const actual = await vi.importActual("@react-component-library/ui");
  return {
    ...actual,
    useTrustpilotScore: () => ({
      data: {
        trustScore: 4.8,
        numberOfReviews: 1234,
      },
      isLoading: false,
      error: null,
    }),
  };
});

const mockSetValue = vi.fn();

vi.mock("react-hook-form", () => ({
  useForm: () => ({
    setValue: mockSetValue,
    formState: { errors: {} },
  }),
}));

vi.mock("@hookform/resolvers/zod", () => ({
  zodResolver: vi.fn(),
}));

vi.mock("@/hooks/useAddress", () => ({
  useAddress: () => ({
    selectedAddress: {
      line1: "10 Downing Street",
      line2: "Westminster",
      line3: "London",
      postcode: "SW1A 2AA",
      addressKey: "test-address-key",
      addressKeyType: "NAD",
    },
    loading: false,
    error: null,
  }),
}));

vi.mock("@/screens/PackageSelection/components/Address", () => ({
  Address: () => <div data-testid="address-mock">Address Mock</div>,
}));

vi.mock("@/screens/PackageSelection/components/SpeedCalculator", () => ({
  SpeedCalculator: () => (
    <dialog data-testid="speed-calculator-mock">Speed Calculator Mock</dialog>
  ),
}));

describe("PackageSelection Component", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders the component with title and packages", async () => {
    await act(async () => {
      render(<PackageSelection />);
    });

    expect(
      screen.getByText(packageSelectionPageText.pageTitle),
    ).toBeInTheDocument();

    expect(
      screen.getByText(packageSelectionPageText.pageSubtitle),
    ).toBeInTheDocument();

    broadbandPackages.forEach((pkg) => {
      expect(screen.getByText(pkg.name)).toBeInTheDocument();
    });
  });

  it("renders NavWrapper component", async () => {
    await act(async () => {
      render(<PackageSelection />);
    });

    const navElement = screen.getByRole("navigation");
    expect(navElement).toBeInTheDocument();
    const logo = screen.getByAltText("Cuckoo");
    expect(logo).toBeInTheDocument();
  });

  it("renders HeroBanner component", async () => {
    await act(async () => {
      render(<PackageSelection />);
    });

    expect(screen.getByText(bannerTitle)).toBeInTheDocument();
    const addressComponent = screen.getByTestId("address-mock");
    expect(addressComponent).toBeInTheDocument();
  });

  it("renders ChooseYourPackage component", async () => {
    await act(async () => {
      render(<PackageSelection />);
    });

    expect(
      screen.getByText(packageSelectionPageText.pageTitle),
    ).toBeInTheDocument();
  });

  it("renders Reminders component", async () => {
    await act(async () => {
      render(<PackageSelection />);
    });

    const remindersSection = screen.getByRole("region", {
      name: "Reminders section",
    });
    expect(screen.getByText(remindersHeading)).toBeInTheDocument();
    expect(remindersSection).toBeInTheDocument();
  });

  it("renders LegalClaims component", async () => {
    await act(async () => {
      render(<PackageSelection />);
    });

    const legalClaimsHeading = screen.getByText("Stats and claims");
    expect(legalClaimsHeading).toBeInTheDocument();
    const legalClaimsSection = screen.getByRole("region", { name: "Legal" });
    const legalList = within(legalClaimsSection).getByRole("list");
    const legalItems = within(legalList).getAllByRole("listitem");
    expect(legalList).toBeInTheDocument();
    expect(legalItems.length).toBeGreaterThan(0);
  });

  it("renders SpeedCalculator component", async () => {
    await act(async () => {
      render(<PackageSelection />);
    });

    const speedCalculatorMock = screen.getByTestId("speed-calculator-mock");
    expect(speedCalculatorMock).toBeInTheDocument();
    expect(speedCalculatorMock).toHaveTextContent("Speed Calculator Mock");
  });
});
