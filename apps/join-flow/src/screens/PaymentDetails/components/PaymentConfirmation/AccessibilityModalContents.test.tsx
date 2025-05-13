import { act, fireEvent, render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it } from "vitest";

import useJoinFlowStore from "@/store/useJoinFlowStore";

import { AccessibilityModalContents } from "./AccessibilityModalContents";
import { accessibilityModalText } from "./AccessibilityModalProps";

describe("AccessibilityModalContents", () => {
  const mockCloseModal = vi.fn();
  const {
    accessibilityCheckboxes,
    additionalInformationLabel,
    additionalInformationPlaceholder,
    submitButtonText,
  } = accessibilityModalText;

  beforeEach(() => {
    useJoinFlowStore.setState({ accessibilityRequirements: null });
  });

  it("renders the form with all accessibility checkboxes", () => {
    render(<AccessibilityModalContents closeModal={mockCloseModal} />);

    accessibilityCheckboxes.forEach(({ label }) => {
      expect(screen.getByLabelText(label)).toBeInTheDocument();
    });
  });

  it("renders additional information textarea", () => {
    render(<AccessibilityModalContents closeModal={mockCloseModal} />);

    expect(screen.getByText(additionalInformationLabel)).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText(additionalInformationPlaceholder),
    ).toBeInTheDocument();
  });

  it("renders reset and submit buttons", () => {
    render(<AccessibilityModalContents closeModal={mockCloseModal} />);

    expect(
      screen.getByRole("button", { name: "Clear requirements" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: submitButtonText }),
    ).toBeInTheDocument();
  });

  it("requires third party name when third party assistance is checked", async () => {
    render(<AccessibilityModalContents closeModal={mockCloseModal} />);

    const thirdPartyCheckbox = screen.getByLabelText(
      accessibilityCheckboxes.find(
        ({ name }) => name === "thirdPartyAssistance",
      )?.label ?? "",
    );

    await act(() => {
      fireEvent.click(thirdPartyCheckbox);
      const submitButton = screen.getByRole("button", {
        name: submitButtonText,
      });
      fireEvent.click(submitButton);
    });

    const errorMessage = screen.getByText("Please provide a name");
    expect(errorMessage).toBeInTheDocument();
    expect(useJoinFlowStore.getState().accessibilityRequirements).toBeNull();
  });

  it("submits form with selected requirements", async () => {
    render(<AccessibilityModalContents closeModal={mockCloseModal} />);

    const visionImpairedCheckbox = screen.getByLabelText(
      accessibilityCheckboxes.find(({ name }) => name === "visionImpaired")
        ?.label ?? "",
    );

    await act(() => {
      fireEvent.click(visionImpairedCheckbox);
      const submitButton = screen.getByRole("button", {
        name: submitButtonText,
      });
      fireEvent.click(submitButton);
    });

    expect(useJoinFlowStore.getState().accessibilityRequirements).toEqual({
      visionImpaired: true,
    });
    expect(mockCloseModal).toHaveBeenCalled();
  });

  it("resets form and closes modal when reset button is clicked", () => {
    render(<AccessibilityModalContents closeModal={mockCloseModal} />);

    const resetButton = screen.getByRole("button", {
      name: "Clear requirements",
    });
    fireEvent.click(resetButton);

    expect(useJoinFlowStore.getState().accessibilityRequirements).toBeNull();
    expect(mockCloseModal).toHaveBeenCalled();
  });

  it("loads existing accessibility requirements into form", () => {
    const existingRequirements = {
      visionImpaired: true,
      hearingImpaired: true,
      additionalInformation: "Test information",
    };

    useJoinFlowStore.setState({
      accessibilityRequirements: existingRequirements,
    });

    render(<AccessibilityModalContents closeModal={mockCloseModal} />);

    const visionImpairedCheckbox = screen.getByLabelText(
      accessibilityCheckboxes.find(({ name }) => name === "visionImpaired")
        ?.label ?? "",
    );
    const hearingImpairedCheckbox = screen.getByLabelText(
      accessibilityCheckboxes.find(({ name }) => name === "hearingImpaired")
        ?.label ?? "",
    );

    expect(visionImpairedCheckbox).toBeChecked();
    expect(hearingImpairedCheckbox).toBeChecked();
    expect(
      screen.getByPlaceholderText(additionalInformationPlaceholder),
    ).toHaveValue("Test information");
  });
});
