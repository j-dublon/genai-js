import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";

import { useScrollToElement } from "@/hooks/useScrollToElement";
import { useSpeedCalculator } from "@/hooks/useSpeedCalculator";

import { broadbandPackages } from "../ChooseYourPackage/ChooseYourPackageProps";
import { SpeedCalculator } from "./index";
import { questionProps } from "./SpeedCalculatorProps";

vi.mock("@/hooks/useScrollToElement");
vi.mock("@/hooks/useSpeedCalculator");

const mockScrollToElement = vi.fn();
const mockScrollToForm = vi.fn();

const testTitle = "Test Title";
const testSubtitle = "Test Subtitle";

describe("SpeedCalculator", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    (useScrollToElement as ReturnType<typeof vi.fn>).mockImplementation(
      (elementId: string) => {
        if (elementId === "#results") return mockScrollToElement;
        if (elementId === "#speed-calculator-form") return mockScrollToForm;
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
        broadbandPackages={broadbandPackages}
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
        broadbandPackages={broadbandPackages}
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
    (useSpeedCalculator as ReturnType<typeof vi.fn>).mockReturnValue({
      recommendedPackage: broadbandPackages[0],
      calculateRecommendedPackage: mockCalculateRecommendedPackage,
    });

    render(
      <SpeedCalculator
        title={testTitle}
        subtitle={testSubtitle}
        broadbandPackages={broadbandPackages}
      />,
    );

    const slider = screen.getByRole("slider");
    fireEvent.change(slider, { target: { value: "3" } });

    const streamingCheckbox = screen.getByLabelText("Streaming");
    fireEvent.click(streamingCheckbox);

    const yesRadio = screen.getByLabelText("Yes");
    fireEvent.click(yesRadio);

    const calculateButton = screen.getByText("Calculate");
    fireEvent.click(calculateButton);

    await waitFor(() => {
      expect(mockCalculateRecommendedPackage).toHaveBeenCalledWith({
        peopleCount: 3,
        internetUses: ["Streaming"],
        smartSpeakers: "Yes",
      });
      expect(mockScrollToElement).toHaveBeenCalled();
    });

    const recommendedPackageButton = screen.getByRole("button", {
      name: "C-150 Plan",
    });
    expect(recommendedPackageButton).toBeInTheDocument();
  });

  it("handles form reset", () => {
    const mockCalculateRecommendedPackage = vi.fn();
    (useSpeedCalculator as ReturnType<typeof vi.fn>).mockReturnValue({
      recommendedPackage: broadbandPackages[0],
      calculateRecommendedPackage: mockCalculateRecommendedPackage,
    });

    render(
      <SpeedCalculator
        title={testTitle}
        subtitle={testSubtitle}
        broadbandPackages={broadbandPackages}
      />,
    );

    const slider = screen.getByRole("slider");
    fireEvent.change(slider, { target: { value: "3" } });

    const streamingCheckbox = screen.getByLabelText("Streaming");
    fireEvent.click(streamingCheckbox);

    const yesRadio = screen.getByLabelText("Yes");
    fireEvent.click(yesRadio);

    const resetButton = screen.getByText("Reset");
    fireEvent.click(resetButton);

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
        broadbandPackages={broadbandPackages}
      />,
    );

    const calculateButton = screen.getByText("Calculate");
    fireEvent.click(calculateButton);

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
      recommendedPackage: broadbandPackages[0],
      calculateRecommendedPackage: mockCalculateRecommendedPackage,
    });

    render(
      <SpeedCalculator
        title={testTitle}
        subtitle={testSubtitle}
        broadbandPackages={broadbandPackages}
      />,
    );

    const slider = screen.getByRole("slider");
    fireEvent.change(slider, { target: { value: "3" } });

    const streamingCheckbox = screen.getByLabelText("Streaming");
    fireEvent.click(streamingCheckbox);

    const yesRadio = screen.getByLabelText("Yes");
    fireEvent.click(yesRadio);

    const calculateButton = screen.getByText("Calculate");
    fireEvent.click(calculateButton);

    await waitFor(() => {
      expect(screen.queryByText("Calculate")).not.toBeInTheDocument();
    });

    expect(slider).toBeDisabled();
    expect(streamingCheckbox).toBeDisabled();
    expect(yesRadio).toBeDisabled();
  });
});
