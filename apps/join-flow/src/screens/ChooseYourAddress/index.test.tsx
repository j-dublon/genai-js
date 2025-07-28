import { render, screen } from "@testing-library/react";
import { vi } from "vitest";

import useJoinFlowStore from "@/store/useJoinFlowStore";

import { ChooseYourAddress } from ".";

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
  default: vi.fn(),
}));
const mockJoinFlowStore = vi.mocked(useJoinFlowStore);

describe("ChooseYourAddress", () => {
  const mockProps = {
    affiliateSession: {
      id: "123",
      sessionId: "456",
      affiliateName: "Test Affiliate",
      displayItems: {
        landingPageBanner: [
          {
            style: "default" as const,
            primaryTitle: "Test Title",
            secondaryTitle: "Test Secondary Title",
            descriptionText: "Test Description Text",
            blockType: "basicLandingBannerBlock" as const,
          },
        ],
        termsAndConditionsLink: "https://example.com",
      },
    },
    sessionDocumentId: "789",
  };

  beforeEach(() => {
    mockJoinFlowStore.mockReturnValue({
      resetFlow: vi.fn(),
      setRoiPostcode: vi.fn(),
      isLoadingModalOpen: false,
      setAffiliateSession: vi.fn(),
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
      setAffiliateSession: vi.fn(),
    });
    render(<ChooseYourAddress {...mockProps} />);
    const modal = screen.getByTestId("loading-modal");
    expect(modal).toBeInTheDocument();
    expect(modal).toHaveAttribute("open");
  });

  it("does not show the LoadingModal when isLoadingModalOpen is false", () => {
    render(<ChooseYourAddress {...mockProps} />);
    const modal = screen.getByTestId("loading-modal");
    expect(modal).toBeInTheDocument();
    expect(modal).not.toHaveAttribute("open");
  });

  it("renders the ColorPill component", () => {
    render(<ChooseYourAddress {...mockProps} />);
    expect(screen.getByLabelText(/color pill text/i)).toBeInTheDocument();
  });

  it("renders the TipCard component", () => {
    render(<ChooseYourAddress {...mockProps} />);
    const tipCard = screen.getByLabelText("Tip card");
    expect(tipCard).toBeInTheDocument();
  });

  it("renders the ServiceAddressLookupForm component", () => {
    render(<ChooseYourAddress {...mockProps} />);
    expect(screen.getByPlaceholderText(/postcode/i)).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Search for my address" }),
    ).toBeInTheDocument();
  });

  it("renders the ContactInfo component", () => {
    render(<ChooseYourAddress {...mockProps} />);
    const contactInfo = screen.getByLabelText(
      "Call us directly on 0330 912 9955",
    );
    expect(contactInfo).toBeInTheDocument();
  });

  it("renders the TrustpilotHorizontal component when trustScore is present", () => {
    render(<ChooseYourAddress {...mockProps} />);
    const trustpilot = screen.getByTestId("trustpilot-link");
    expect(trustpilot).toBeInTheDocument();
  });
});
