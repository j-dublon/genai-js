import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeAll, beforeEach, describe, expect, it, vi } from "vitest";

import useJoinFlowStore from "@/store/useJoinFlowStore";

import { accessibilityModalText } from "./AccessibilityProps";
import { AccessibilityRequirements } from "./AccessibilityRequirements";

vi.mock("@/store/useJoinFlowStore", () => ({
  default: vi.fn(),
}));

vi.mock("./AccessibilityProps", () => ({
  accessibilityModalText: {
    accessibilityRequirementsModalTitle: "Requirements Modal",
    accessibilityRequirementsCheckboxText: "I have accessibility requirements",
    accessibilityRequirementsDescription: "Tell us about your needs",
    accessibilityRequirementsTitle: "Here is a test title",
    accessibilityCheckboxes: [],
  },
  accessibilityCommunicationPreferencesText: {
    formatNeededLabel: "I require my info in a different format",
    communicationsTitle: "Your communications",
    formatCheckboxesDescription:
      "Tell us how you'd like to receive your information",
    formatCheckboxes: [],
    documentCheckboxesTitle: "What info do you require in a different format?",
    documentCheckboxes: [],
    saveButtonText: "Save",
    editButtonText: "Edit my communications",
  },
}));

describe("AccessibilityRequirements", () => {
  const mockSetAccessibilityRequirements = vi.fn();
  const mockSetAccessibilityCommunicationPreferences = vi.fn();

  beforeAll(() => {
    HTMLDialogElement.prototype.show = vi.fn(function mock(
      this: HTMLDialogElement,
    ) {
      this.open = true;
    });
    HTMLDialogElement.prototype.showModal = vi.fn(function mock(
      this: HTMLDialogElement,
    ) {
      this.open = true;
    });
    HTMLDialogElement.prototype.close = vi.fn(function mock(
      this: HTMLDialogElement,
    ) {
      this.open = false;
    });
  });

  beforeEach(() => {
    vi.clearAllMocks();
    (useJoinFlowStore as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
      accessibilityRequirements: null,
      setAccessibilityRequirements: mockSetAccessibilityRequirements,
      setAccessibilityCommunicationPreferences:
        mockSetAccessibilityCommunicationPreferences,
    });
  });

  it("renders the component with unchecked state when accessibilityRequirements is null", () => {
    render(<AccessibilityRequirements />);

    expect(
      screen.getByText(accessibilityModalText.accessibilityRequirementsTitle),
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        accessibilityModalText.accessibilityRequirementsDescription,
      ),
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        accessibilityModalText.accessibilityRequirementsCheckboxText,
      ),
    ).toBeInTheDocument();

    const checkbox = screen.getByLabelText(
      accessibilityModalText.accessibilityRequirementsCheckboxText,
    );
    expect(checkbox).not.toBeChecked();
  });

  it("renders the component with checked state when accessibilityRequirements exists", () => {
    (useJoinFlowStore as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
      accessibilityRequirements: { visionImpaired: true },
      setAccessibilityRequirements: mockSetAccessibilityRequirements,
      setAccessibilityCommunicationPreferences:
        mockSetAccessibilityCommunicationPreferences,
    });

    render(<AccessibilityRequirements />);

    const checkbox = screen.getByLabelText(
      accessibilityModalText.accessibilityRequirementsCheckboxText,
    );
    expect(checkbox).toBeChecked();
  });

  it("opens modal when checkbox is clicked from unchecked state", async () => {
    const user = userEvent.setup();
    render(<AccessibilityRequirements />);

    const checkbox = screen.getByLabelText(
      accessibilityModalText.accessibilityRequirementsCheckboxText,
    );
    await user.click(checkbox);

    expect(HTMLDialogElement.prototype.showModal).toHaveBeenCalled();
  });

  it("clears accessibility requirements when checkbox is unchecked", async () => {
    const user = userEvent.setup();
    (useJoinFlowStore as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
      accessibilityRequirements: { visionImpaired: true },
      setAccessibilityRequirements: mockSetAccessibilityRequirements,
      setAccessibilityCommunicationPreferences:
        mockSetAccessibilityCommunicationPreferences,
    });

    render(<AccessibilityRequirements />);

    const checkbox = screen.getByLabelText(
      accessibilityModalText.accessibilityRequirementsCheckboxText,
    );
    await user.click(checkbox);

    expect(mockSetAccessibilityRequirements).toHaveBeenCalledWith(null);
  });

  it("renders the modal with correct title", () => {
    render(<AccessibilityRequirements />);

    expect(
      screen.getByText(
        accessibilityModalText.accessibilityRequirementsModalTitle,
      ),
    ).toBeInTheDocument();
  });
});
