import { render, screen } from "@testing-library/react";
import { vi } from "vitest";

import PackageSelection from "@/components/pages/PackageSelection";

vi.mock("next/navigation", () => ({
  useRouter: () => ({
    push: vi.fn(),
  }),
}));

vi.mock("@store/useJoinFlowStore", () => ({
  default: () => ({
    selectPackage: vi.fn(),
  }),
}));

vi.mock("@store/mockData", () => ({
  broadbandPackages: [
    {
      id: "basic",
      name: "Basic Package",
      speed: { download: 100, upload: 20 },
      price: { monthly: 25, setup: 0 },
      contractLength: 12,
      description: "Good for everyday browsing",
    },
    {
      id: "standard",
      name: "Standard Package",
      speed: { download: 300, upload: 50 },
      price: { monthly: 35, setup: 0 },
      contractLength: 12,
      description: "Great for streaming and gaming",
    },
    {
      id: "premium",
      name: "Premium Package",
      speed: { download: 900, upload: 100 },
      price: { monthly: 45, setup: 0 },
      contractLength: 18,
      description: "Ultimate performance for power users",
    },
  ],
}));

const mockSetValue = vi.fn();
const mockHandleSubmit = vi.fn();
vi.mock("react-hook-form", () => ({
  useForm: () => ({
    handleSubmit: (cb: (data: { packageId: string }) => void) => {
      mockHandleSubmit.mockImplementation((e?: React.BaseSyntheticEvent) => {
        e?.preventDefault?.();
        return cb({ packageId: "basic" });
      });
      return mockHandleSubmit;
    },
    setValue: mockSetValue,
    formState: { errors: {} },
  }),
}));

vi.mock("@hookform/resolvers/zod", () => ({
  zodResolver: vi.fn(),
}));

vi.mock("@/hooks/useAddress", () => ({
  useAddress: vi.fn().mockImplementation(({ initialPostcode }) => {
    if (initialPostcode === "ERROR") {
      return {
        selectedAddress: null,
        loading: false,
        error: "Failed to load address",
      };
    } else if (initialPostcode === "LOADING") {
      return {
        selectedAddress: null,
        loading: true,
        error: null,
      };
    } else {
      return {
        selectedAddress: {
          line1: "10 Downing Street",
          line2: "Westminster",
          line3: "London",
          postcode: "SW1A 2AA",
        },
        loading: false,
        error: null,
      };
    }
  }),
}));

describe("PackageSelection Component", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders the component with title and packages", () => {
    render(<PackageSelection />);

    expect(
      screen.getByText("Choose Your Broadband Package"),
    ).toBeInTheDocument();
    expect(
      screen.getByText("Select the package that suits your needs"),
    ).toBeInTheDocument();

    expect(screen.getByText("Basic Package")).toBeInTheDocument();
    expect(screen.getByText("Standard Package")).toBeInTheDocument();
    expect(screen.getByText("Premium Package")).toBeInTheDocument();
  });
});
