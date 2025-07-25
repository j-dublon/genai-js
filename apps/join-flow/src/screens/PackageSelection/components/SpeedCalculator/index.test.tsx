import {
  act,
  fireEvent,
  render,
  screen,
  waitFor,
} from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";

import { useScrollToElement } from "@/hooks/useScrollToElement";
import { useSpeedCalculator } from "@/hooks/useSpeedCalculator";
import { StoreSelectedPackage } from "@/store/useJoinFlowStore";

import { SpeedCalculator } from "./index";
import { questionProps } from "./SpeedCalculatorProps";

vi.mock("@/hooks/useScrollToElement");
vi.mock("@/hooks/useSpeedCalculator");

const mockScrollToElement = vi.fn();
const mockScrollToForm = vi.fn();
const mockScrollToTop = vi.fn();

const mockOnShowPackageDetails = vi.fn();

const testTitle = "Test Title";
const testSubtitle = "Test Subtitle";

const mockBroadbandPackages: StoreSelectedPackage[] = [
  {
    krakenProductCode: "BT-150-24M_30",
    frontendIdentifier: "150-24",
    frontendTitle: "C-150",
    termMonths: 24,
    selectionIdentifier: "0",
    installationRequired: true,
    appliedPromotionUUIDs: [],
    prices: {
      broadbandAndCurrentExtras: {
        basePrice: 3000,
        discount: 0,
        customerPriceIncDiscount: 3000,
        annualPriceRise: [
          {
            price: 3300,
            date: "2026-04-01T12:00:00.000Z",
            id: "rise-1",
          },
        ],
      },
      currentExtras: {
        basePrice: 0,
        discount: 0,
        customerPriceIncDiscount: 0,
      },
      broadband: {
        basePrice: 3000,
        discount: 0,
        customerPriceIncDiscount: 3000,
        annualPriceRise: [
          {
            price: 3300,
            date: "2026-04-01T12:00:00.000Z",
            id: "rise-1",
          },
        ],
      },
    },
    speeds: {
      download: 150,
      upload: 30,
    },
    availableExtras: null,
    offers: null,
    id: "c-150",
  },
  {
    krakenProductCode: "BT-500-24M_35",
    frontendIdentifier: "500-24",
    frontendTitle: "C-500",
    termMonths: 24,
    selectionIdentifier: "1",
    installationRequired: true,
    appliedPromotionUUIDs: [],
    prices: {
      broadbandAndCurrentExtras: {
        basePrice: 3500,
        discount: 0,
        customerPriceIncDiscount: 3500,
        annualPriceRise: [
          {
            price: 3800,
            date: "2026-04-01T12:00:00.000Z",
            id: "rise-2",
          },
        ],
      },
      currentExtras: {
        basePrice: 0,
        discount: 0,
        customerPriceIncDiscount: 0,
      },
      broadband: {
        basePrice: 3500,
        discount: 0,
        customerPriceIncDiscount: 3500,
        annualPriceRise: [
          {
            price: 3800,
            date: "2026-04-01T12:00:00.000Z",
            id: "rise-2",
          },
        ],
      },
    },
    speeds: {
      download: 500,
      upload: 20,
    },
    availableExtras: null,
    offers: null,
    id: "c-500",
  },
  {
    krakenProductCode: "BT-900-24M_41",
    frontendIdentifier: "900-24",
    frontendTitle: "C-900",
    termMonths: 24,
    selectionIdentifier: "2",
    installationRequired: true,
    appliedPromotionUUIDs: [],
    prices: {
      broadbandAndCurrentExtras: {
        basePrice: 4100,
        discount: 0,
        customerPriceIncDiscount: 4100,
        annualPriceRise: [
          {
            price: 4400,
            date: "2026-04-01T12:00:00.000Z",
            id: "rise-3",
          },
        ],
      },
      currentExtras: {
        basePrice: 0,
        discount: 0,
        customerPriceIncDiscount: 0,
      },
      broadband: {
        basePrice: 4100,
        discount: 0,
        customerPriceIncDiscount: 4100,
        annualPriceRise: [
          {
            price: 4400,
            date: "2026-04-01T12:00:00.000Z",
            id: "rise-3",
          },
        ],
      },
    },
    speeds: {
      download: 900,
      upload: 100,
    },
    availableExtras: null,
    offers: null,
    id: "c-900",
  },
];

describe("SpeedCalculator", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    (useScrollToElement as ReturnType<typeof vi.fn>).mockImplementation(
      (elementId: string) => {
        if (elementId === "#results") return mockScrollToElement;
        if (elementId === "#speed-calculator-form") return mockScrollToForm;
        if (elementId === "#fullscreen-modal-title") return mockScrollToTop;
      },
    );

    (useSpeedCalculator as ReturnType<typeof vi.fn>).mockReturnValue({
      recommendedPackage: null,
      calculateRecommendedPackage: vi.fn(),
    });
  });

  it("renders the component with expected title, subtitle and buttons", () => {
    render(
      <SpeedCalculator
        title={testTitle}
        subtitle={testSubtitle}
        broadbandPackages={mockBroadbandPackages}
        onShowPackageDetails={mockOnShowPackageDetails}
      />,
    );

    expect(screen.getByText(testTitle)).toBeInTheDocument();
    expect(screen.getByText(testSubtitle)).toBeInTheDocument();
    expect(screen.getByText("Calculate")).toBeInTheDocument();
    expect(screen.getByText("Reset")).toBeInTheDocument();
  });

  it("renders all questions with correct titles and options", () => {
    render(
      <SpeedCalculator
        title={testTitle}
        subtitle={testSubtitle}
        broadbandPackages={mockBroadbandPackages}
        onShowPackageDetails={mockOnShowPackageDetails}
      />,
    );

    expect(screen.getByText(questionProps.question1.title)).toBeInTheDocument();
    expect(
      screen.getByText(questionProps.question1.subtitle),
    ).toBeInTheDocument();
    const slider = screen.getByRole("slider");
    expect(slider).toBeInTheDocument();
    expect(slider).toHaveAttribute("min", "0");
    expect(slider).toHaveAttribute("max", "10");
    expect(slider).toHaveAttribute("value", "0");

    expect(screen.getByText(questionProps.question2.title)).toBeInTheDocument();
    const internetUses = [
      "Streaming",
      "Gaming",
      "Working from home",
      "Video calls",
      "Social media",
    ];
    internetUses.forEach((use) => {
      const checkbox = screen.getByLabelText(use);
      expect(checkbox).toBeInTheDocument();
      expect(checkbox).toHaveAttribute("type", "checkbox");
      expect(checkbox).not.toBeChecked();
    });

    expect(screen.getByText(questionProps.question3.title)).toBeInTheDocument();
    const smartSpeakerOptions = ["Yes", "No"];
    smartSpeakerOptions.forEach((option) => {
      const radio = screen.getByLabelText(option);
      expect(radio).toBeInTheDocument();
      expect(radio).toHaveAttribute("type", "radio");
      expect(radio).not.toBeChecked();
    });
  });

  it("handles form submission and shows results", async () => {
    const mockCalculateRecommendedPackage = vi.fn();
    const mockOnShowPackageDetails = vi.fn();
    (useSpeedCalculator as ReturnType<typeof vi.fn>).mockReturnValue({
      recommendedPackage: mockBroadbandPackages[0],
      calculateRecommendedPackage: mockCalculateRecommendedPackage,
    });

    render(
      <SpeedCalculator
        title={testTitle}
        subtitle={testSubtitle}
        broadbandPackages={mockBroadbandPackages}
        onShowPackageDetails={mockOnShowPackageDetails}
      />,
    );

    await act(async () => {
      const slider = screen.getByRole("slider");
      fireEvent.change(slider, { target: { value: "3" } });

      const streamingCheckbox = screen.getByLabelText("Streaming");
      fireEvent.click(streamingCheckbox);

      const yesRadio = screen.getByLabelText("Yes");
      fireEvent.click(yesRadio);

      const calculateButton = screen.getByText("Calculate");
      fireEvent.click(calculateButton);
    });

    await waitFor(() => {
      expect(mockCalculateRecommendedPackage).toHaveBeenCalledWith({
        peopleCount: 3,
        internetUses: ["Streaming"],
        smartSpeakers: "Yes",
      });
      expect(mockScrollToElement).toHaveBeenCalled();
    });

    const recommendedPackageButton = screen.getByRole("button", {
      name: "150Mbps Plan",
    });
    expect(recommendedPackageButton).toBeInTheDocument();

    await act(async () => {
      fireEvent.click(recommendedPackageButton);
    });

    expect(mockOnShowPackageDetails).toHaveBeenCalledWith(
      mockBroadbandPackages[0],
    );
  });

  it("handles form reset", async () => {
    const mockCalculateRecommendedPackage = vi.fn();
    (useSpeedCalculator as ReturnType<typeof vi.fn>).mockReturnValue({
      recommendedPackage: mockBroadbandPackages[0],
      calculateRecommendedPackage: mockCalculateRecommendedPackage,
    });

    render(
      <SpeedCalculator
        title={testTitle}
        subtitle={testSubtitle}
        broadbandPackages={mockBroadbandPackages}
        onShowPackageDetails={mockOnShowPackageDetails}
      />,
    );

    await act(async () => {
      const slider = screen.getByRole("slider");
      fireEvent.change(slider, { target: { value: "3" } });

      const streamingCheckbox = screen.getByLabelText("Streaming");
      fireEvent.click(streamingCheckbox);

      const yesRadio = screen.getByLabelText("Yes");
      fireEvent.click(yesRadio);

      const resetButton = screen.getByText("Reset");
      fireEvent.click(resetButton);
    });

    const slider = screen.getByRole("slider");
    const streamingCheckbox = screen.getByLabelText("Streaming");
    const yesRadio = screen.getByLabelText("Yes");

    expect(slider).toHaveValue("0");
    expect(streamingCheckbox).not.toBeChecked();
    expect(yesRadio).not.toBeChecked();
    expect(mockCalculateRecommendedPackage).toHaveBeenCalledWith(null);
    expect(mockScrollToForm).toHaveBeenCalled();
  });

  it("validates required fields", async () => {
    render(
      <SpeedCalculator
        title={testTitle}
        subtitle={testSubtitle}
        broadbandPackages={mockBroadbandPackages}
        onShowPackageDetails={mockOnShowPackageDetails}
      />,
    );

    await act(async () => {
      const calculateButton = screen.getByText("Calculate");
      fireEvent.click(calculateButton);
    });

    await waitFor(() => {
      expect(
        screen.getByText("Please select at least one option"),
      ).toBeInTheDocument();
      expect(screen.getByText("Please select an option")).toBeInTheDocument();
    });
  });

  it("disables form controls after successful submission", async () => {
    const mockCalculateRecommendedPackage = vi.fn();
    (useSpeedCalculator as ReturnType<typeof vi.fn>).mockReturnValue({
      recommendedPackage: mockBroadbandPackages[0],
      calculateRecommendedPackage: mockCalculateRecommendedPackage,
    });

    render(
      <SpeedCalculator
        title={testTitle}
        subtitle={testSubtitle}
        broadbandPackages={mockBroadbandPackages}
        onShowPackageDetails={mockOnShowPackageDetails}
      />,
    );

    await act(async () => {
      const slider = screen.getByRole("slider");
      fireEvent.change(slider, { target: { value: "3" } });

      const streamingCheckbox = screen.getByLabelText("Streaming");
      fireEvent.click(streamingCheckbox);

      const yesRadio = screen.getByLabelText("Yes");
      fireEvent.click(yesRadio);

      const calculateButton = screen.getByText("Calculate");
      fireEvent.click(calculateButton);
    });

    await waitFor(() => {
      expect(screen.queryByText("Calculate")).not.toBeInTheDocument();
    });

    const slider = screen.getByRole("slider");
    const streamingCheckbox = screen.getByLabelText("Streaming");
    const yesRadio = screen.getByLabelText("Yes");

    expect(slider).toBeDisabled();
    expect(streamingCheckbox).toBeDisabled();
    expect(yesRadio).toBeDisabled();
  });

  it("displays the recommended package details when the submit button is clicked", async () => {
    const mockCalculateRecommendedPackage = vi.fn();
    const mockRecommendedPackage = mockBroadbandPackages[0];

    (useSpeedCalculator as ReturnType<typeof vi.fn>).mockReturnValue({
      recommendedPackage: mockRecommendedPackage,
      calculateRecommendedPackage: mockCalculateRecommendedPackage,
    });

    render(
      <SpeedCalculator
        title={testTitle}
        subtitle={testSubtitle}
        broadbandPackages={mockBroadbandPackages}
        onShowPackageDetails={mockOnShowPackageDetails}
      />,
    );

    const slider = screen.getByRole("slider");
    const streamingCheckbox = screen.getByLabelText("Streaming");
    const yesRadio = screen.getByLabelText("Yes");
    const calculateButton = screen.getByText("Calculate");

    await act(async () => {
      fireEvent.change(slider, { target: { value: "3" } });
      fireEvent.click(streamingCheckbox);
      fireEvent.click(yesRadio);
      fireEvent.click(calculateButton);
    });

    await waitFor(() => {
      expect(mockCalculateRecommendedPackage).toHaveBeenCalledWith({
        peopleCount: 3,
        internetUses: ["Streaming"],
        smartSpeakers: "Yes",
      });
      expect(screen.queryByText("Calculate")).not.toBeInTheDocument();
    });

    const recommendedPackageButton = screen.getByRole("button", {
      name: `150Mbps Plan`,
    });
    expect(recommendedPackageButton).toBeInTheDocument();

    await act(async () => {
      fireEvent.click(recommendedPackageButton);
    });

    expect(mockOnShowPackageDetails).toHaveBeenCalledWith(
      mockRecommendedPackage,
    );
    expect(mockScrollToTop).toHaveBeenCalled();
  });
});
