import { act, render, screen } from "@testing-library/react";
import { vi } from "vitest";

import PackageSelection from "@/screens/PackageSelection";
import {
  broadbandPackages,
  packageSelectionPageText,
} from "@/screens/PackageSelection/components/ChooseYourPackage/ChooseYourPackageProps";

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
});
