import { render, screen } from "@testing-library/react";
import { vi } from "vitest";

import { ChooseYourAddress } from ".";

const mockJoinFlowStore = vi.fn();

vi.mock("@react-component-library/ui", async (importActual) => {
  const actual = (await importActual()) as object;
  return {
    ...actual,
    LoadingModal: vi.fn(({ loading }) =>
      loading ? (
        <dialog data-testid="loading-modal" open />
      ) : (
        <dialog data-testid="loading-modal" />
      ),
    ),
    useTrustpilotScore: () => ({
      data: { trustScore: 4.5, numberOfReviews: 100 },
    }),
  };
});

vi.mock("next/navigation", async (importActual) => {
  const actual = (await importActual()) as object;
  return {
    ...actual,
    useSearchParams: () => ({ get: () => null }),
    useRouter: () => ({
      push: vi.fn(),
      replace: vi.fn(),
      prefetch: vi.fn(),
    }),
  };
});

vi.mock("@/hooks/useAffiliateSession", () => ({
  useAffiliateSession: () => {},
}));
vi.mock("@/lib/get-asset-path", () => ({ getAssetPath: (src: string) => src }));

vi.mock("@/store/useJoinFlowStore", () => ({
  __esModule: true,
  default: () => mockJoinFlowStore(),
}));

describe("ChooseYourAddress", () => {
  beforeEach(() => {
    mockJoinFlowStore.mockReturnValue({
      resetFlow: vi.fn(),
      setRoiPostcode: vi.fn(),
      isLoadingModalOpen: false,
    });
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it("shows the LoadingModal when isLoadingModalOpen is true", () => {
    mockJoinFlowStore.mockReturnValue({
      resetFlow: vi.fn(),
      setRoiPostcode: vi.fn(),
      isLoadingModalOpen: true,
    });
    render(<ChooseYourAddress />);
    const modal = screen.getByTestId("loading-modal");
    expect(modal).toBeInTheDocument();
    expect(modal).toHaveAttribute("open");
  });

  it("does not show the LoadingModal when isLoadingModalOpen is false", () => {
    render(<ChooseYourAddress />);
    const modal = screen.getByTestId("loading-modal");
    expect(modal).toBeInTheDocument();
    expect(modal).not.toHaveAttribute("open");
  });

  it("renders the ColorPill component", () => {
    render(<ChooseYourAddress />);
    expect(screen.getByLabelText(/color pill text/i)).toBeInTheDocument();
  });

  it("renders the TipCard component", () => {
    render(<ChooseYourAddress />);
    const tipCard = screen.getByLabelText("Tip card");
    expect(tipCard).toBeInTheDocument();
  });

  it("renders the ServiceAddressLookupForm component", () => {
    render(<ChooseYourAddress />);
    expect(screen.getByPlaceholderText(/postcode/i)).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Search for my address" }),
    ).toBeInTheDocument();
  });

  it("renders the ContactInfo component", () => {
    render(<ChooseYourAddress />);
    const contactInfo = screen.getByLabelText(
      "Call us directly on 0330 912 9955",
    );
    expect(contactInfo).toBeInTheDocument();
  });

  it("renders the TrustpilotHorizontal component when trustScore is present", () => {
    render(<ChooseYourAddress />);
    const trustpilot = screen.getByTestId("trustpilot-link");
    expect(trustpilot).toBeInTheDocument();
  });
});
