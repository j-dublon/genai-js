import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import React from "react";
import { beforeEach, describe, expect, it, vi } from "vitest";

import useJoinFlowStore from "@/store/useJoinFlowStore";

import { accessibilityCommunicationPreferencesText } from "./AccessibilityProps";
import { CommunicationRequirements } from "./CommunicationRequirements";

vi.mock("@/store/useJoinFlowStore", () => ({
  default: vi.fn(),
}));

vi.mock("./AccessibilityProps", () => ({
  accessibilityCommunicationPreferencesText: {
    formatNeededLabel: "I need information in a different format",
    communicationsTitle: "Communication Preferences",
    formatDescription: "Choose how you want to receive information",
    documentCheckboxesTitle: "Select documents you need in different format",
    saveButtonText: "Save Preferences",
    editButtonText: "Edit Preferences",
    formatRadioOptions: [
      { label: "Audio", name: "audio" },
      { label: "Braille", name: "braille" },
      { label: "Large print", name: "largePrint" },
    ],
    documentCheckboxes: [
      { label: "Monthly bills", name: "monthlyBills" },
      { label: "Contract information and summary", name: "cics" },
      { label: "T&Cs", name: "termsAndConditions" },
    ],
  },
}));

describe("CommunicationRequirements", () => {
  const mockSetAccessibilityCommunicationPreferences = vi.fn();
  const user = userEvent.setup();

  beforeEach(() => {
    vi.clearAllMocks();
    (useJoinFlowStore as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
      accessibilityCommunicationPreferences: null,
      setAccessibilityCommunicationPreferences:
        mockSetAccessibilityCommunicationPreferences,
    });
  });

  it("renders the component with initial state", () => {
    render(<CommunicationRequirements />);

    expect(
      screen.getByText(
        accessibilityCommunicationPreferencesText.formatNeededLabel,
      ),
    ).toBeInTheDocument();

    const checkbox = screen.getByLabelText(
      accessibilityCommunicationPreferencesText.formatNeededLabel,
    );
    expect(checkbox).not.toBeChecked();

    expect(
      screen.queryByText(
        accessibilityCommunicationPreferencesText.communicationsTitle,
      ),
    ).not.toBeInTheDocument();
  });

  it("shows form when checkbox is checked", async () => {
    render(<CommunicationRequirements />);

    const checkbox = screen.getByLabelText(
      accessibilityCommunicationPreferencesText.formatNeededLabel,
    );
    await user.click(checkbox);

    expect(
      screen.getByText(
        accessibilityCommunicationPreferencesText.communicationsTitle,
      ),
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        accessibilityCommunicationPreferencesText.formatDescription,
      ),
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        accessibilityCommunicationPreferencesText.documentCheckboxesTitle,
      ),
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        accessibilityCommunicationPreferencesText.saveButtonText,
      ),
    ).toBeInTheDocument();
  });

  it("hides form when checkbox is unchecked", async () => {
    render(<CommunicationRequirements />);

    const checkbox = screen.getByLabelText(
      accessibilityCommunicationPreferencesText.formatNeededLabel,
    );

    await user.click(checkbox);
    expect(
      screen.getByText(
        accessibilityCommunicationPreferencesText.communicationsTitle,
      ),
    ).toBeInTheDocument();

    await user.click(checkbox);
    expect(
      screen.queryByText(
        accessibilityCommunicationPreferencesText.communicationsTitle,
      ),
    ).not.toBeInTheDocument();
  });

  it("shows form when accessibilityCommunicationPreferences exists in store", () => {
    (useJoinFlowStore as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
      accessibilityCommunicationPreferences: {
        contentTypes: { monthlyBills: true },
        contactPreferences: { audio: true },
      },
      setAccessibilityCommunicationPreferences:
        mockSetAccessibilityCommunicationPreferences,
    });

    render(<CommunicationRequirements />);

    const checkbox = screen.getByLabelText(
      accessibilityCommunicationPreferencesText.formatNeededLabel,
    );
    expect(checkbox).toBeChecked();
    expect(
      screen.getByText(
        accessibilityCommunicationPreferencesText.communicationsTitle,
      ),
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        accessibilityCommunicationPreferencesText.formatDescription,
      ),
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        accessibilityCommunicationPreferencesText.documentCheckboxesTitle,
      ),
    ).toBeInTheDocument();
  });

  it("starts in editing mode when preferences exist in store", () => {
    (useJoinFlowStore as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
      accessibilityCommunicationPreferences: {
        contentTypes: { monthlyBills: true },
        contactPreferences: { audio: true },
      },
      setAccessibilityCommunicationPreferences:
        mockSetAccessibilityCommunicationPreferences,
    });

    render(<CommunicationRequirements />);

    expect(
      screen.getByText(
        accessibilityCommunicationPreferencesText.saveButtonText,
      ),
    ).toBeInTheDocument();
    expect(
      screen.queryByText(
        accessibilityCommunicationPreferencesText.editButtonText,
      ),
    ).not.toBeInTheDocument();
  });

  it("submits form and updates store with filtered data", async () => {
    render(<CommunicationRequirements />);

    const checkbox = screen.getByLabelText(
      accessibilityCommunicationPreferencesText.formatNeededLabel,
    );
    await user.click(checkbox);

    const audioRadio = screen.getByLabelText("Audio");
    await user.click(audioRadio);

    const monthlyBillsCheckbox = screen.getByLabelText("Monthly bills");
    await user.click(monthlyBillsCheckbox);

    const saveButton = screen.getByText(
      accessibilityCommunicationPreferencesText.saveButtonText,
    );
    await user.click(saveButton);

    await waitFor(() => {
      expect(mockSetAccessibilityCommunicationPreferences).toHaveBeenCalledWith(
        {
          contentTypes: { monthlyBills: true },
          contactPreferences: { audio: true },
        },
      );
    });
  });

  it("clears accessibility preferences when checkbox is unchecked after being checked", async () => {
    (useJoinFlowStore as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
      accessibilityCommunicationPreferences: {
        contentTypes: { monthlyBills: true },
        contactPreferences: { audio: true },
      },
      setAccessibilityCommunicationPreferences:
        mockSetAccessibilityCommunicationPreferences,
    });

    render(<CommunicationRequirements />);

    const checkbox = screen.getByLabelText(
      accessibilityCommunicationPreferencesText.formatNeededLabel,
    );
    await user.click(checkbox);

    expect(mockSetAccessibilityCommunicationPreferences).toHaveBeenCalledWith(
      null,
    );
  });

  it("renders FormatSelection with correct props", async () => {
    render(<CommunicationRequirements />);

    const checkbox = screen.getByLabelText(
      accessibilityCommunicationPreferencesText.formatNeededLabel,
    );
    await user.click(checkbox);

    expect(
      screen.getByText(
        accessibilityCommunicationPreferencesText.formatDescription,
      ),
    ).toBeInTheDocument();

    accessibilityCommunicationPreferencesText.formatRadioOptions.forEach(
      (option) => {
        expect(screen.getByLabelText(option.label)).toBeInTheDocument();
      },
    );
  });

  it("renders DocumentSelection with correct props", async () => {
    render(<CommunicationRequirements />);

    const checkbox = screen.getByLabelText(
      accessibilityCommunicationPreferencesText.formatNeededLabel,
    );
    await user.click(checkbox);

    expect(
      screen.getByText(
        accessibilityCommunicationPreferencesText.documentCheckboxesTitle,
      ),
    ).toBeInTheDocument();

    accessibilityCommunicationPreferencesText.documentCheckboxes.forEach(
      (option) => {
        expect(screen.getByLabelText(option.label)).toBeInTheDocument();
      },
    );
  });

  it("has correct form attributes", async () => {
    render(<CommunicationRequirements />);

    const checkbox = screen.getByLabelText(
      accessibilityCommunicationPreferencesText.formatNeededLabel,
    );
    await user.click(checkbox);

    const form = document.querySelector("form");
    expect(form).toHaveAttribute("id", "communication-requirements-form");
  });

  it("handles form submission with empty data, unchecking the formatNeeded checkbox", async () => {
    render(<CommunicationRequirements />);

    const checkbox = screen.getByLabelText(
      accessibilityCommunicationPreferencesText.formatNeededLabel,
    );
    await user.click(checkbox);
    expect(checkbox).toBeChecked();

    const saveButton = screen.getByText(
      accessibilityCommunicationPreferencesText.saveButtonText,
    );
    await user.click(saveButton);

    await waitFor(() => {
      expect(
        mockSetAccessibilityCommunicationPreferences,
      ).not.toHaveBeenCalled();
      expect(checkbox).not.toBeChecked();
    });
  });

  it("renders horizontal rule separator", async () => {
    render(<CommunicationRequirements />);

    const checkbox = screen.getByLabelText(
      accessibilityCommunicationPreferencesText.formatNeededLabel,
    );
    await user.click(checkbox);

    const hr = screen.getByRole("separator");
    expect(hr).toHaveClass(
      "border-ui-grey-300",
      "bg-ui-grey-300",
      "my-1",
      "md:my-2",
    );
  });

  it("shows edit button after saving preferences", async () => {
    render(<CommunicationRequirements />);

    const checkbox = screen.getByLabelText(
      accessibilityCommunicationPreferencesText.formatNeededLabel,
    );
    await user.click(checkbox);

    expect(
      screen.getByText(
        accessibilityCommunicationPreferencesText.saveButtonText,
      ),
    ).toBeInTheDocument();
    expect(
      screen.queryByText(
        accessibilityCommunicationPreferencesText.editButtonText,
      ),
    ).not.toBeInTheDocument();

    const audioRadio = screen.getByLabelText("Audio");
    await user.click(audioRadio);

    const monthlyBillsCheckbox = screen.getByLabelText("Monthly bills");
    await user.click(monthlyBillsCheckbox);

    const saveButton = screen.getByText(
      accessibilityCommunicationPreferencesText.saveButtonText,
    );
    await user.click(saveButton);

    await waitFor(() => {
      expect(
        screen.getByText(
          accessibilityCommunicationPreferencesText.editButtonText,
        ),
      ).toBeInTheDocument();
      expect(
        screen.queryByText(
          accessibilityCommunicationPreferencesText.saveButtonText,
        ),
      ).not.toBeInTheDocument();
    });
  });

  it("switches to view mode after saving, then back to editing when edit button is clicked", async () => {
    render(<CommunicationRequirements />);

    const checkbox = screen.getByLabelText(
      accessibilityCommunicationPreferencesText.formatNeededLabel,
    );
    await user.click(checkbox);

    expect(
      screen.getByText(
        accessibilityCommunicationPreferencesText.saveButtonText,
      ),
    ).toBeInTheDocument();
    expect(
      screen.queryByText(
        accessibilityCommunicationPreferencesText.editButtonText,
      ),
    ).not.toBeInTheDocument();

    const audioRadio = screen.getByLabelText("Audio");
    await user.click(audioRadio);
    const monthlyBillsCheckbox = screen.getByLabelText("Monthly bills");
    await user.click(monthlyBillsCheckbox);

    const saveButton = screen.getByText(
      accessibilityCommunicationPreferencesText.saveButtonText,
    );
    await user.click(saveButton);

    await waitFor(() => {
      expect(
        screen.getByText(
          accessibilityCommunicationPreferencesText.editButtonText,
        ),
      ).toBeInTheDocument();
      expect(
        screen.queryByText(
          accessibilityCommunicationPreferencesText.saveButtonText,
        ),
      ).not.toBeInTheDocument();
    });

    const editButton = screen.getByText(
      accessibilityCommunicationPreferencesText.editButtonText,
    );
    await user.click(editButton);

    expect(
      screen.getByText(
        accessibilityCommunicationPreferencesText.saveButtonText,
      ),
    ).toBeInTheDocument();
    expect(
      screen.queryByText(
        accessibilityCommunicationPreferencesText.editButtonText,
      ),
    ).not.toBeInTheDocument();
  });

  it("validates form requirements correctly, requiring at least one document", async () => {
    render(<CommunicationRequirements />);

    const checkbox = screen.getByLabelText(
      accessibilityCommunicationPreferencesText.formatNeededLabel,
    );
    await user.click(checkbox);

    const audioRadio = screen.getByLabelText("Audio");
    await user.click(audioRadio);

    const saveButton = screen.getByText(
      accessibilityCommunicationPreferencesText.saveButtonText,
    );
    await user.click(saveButton);

    await waitFor(() => {
      expect(
        screen.getByText("Please select at least one document"),
      ).toBeInTheDocument();
    });
  });

  it("validates form requirements correctly, requiring one format", async () => {
    render(<CommunicationRequirements />);

    const checkbox = screen.getByLabelText(
      accessibilityCommunicationPreferencesText.formatNeededLabel,
    );
    await user.click(checkbox);

    const monthlyBillsCheckbox = screen.getByLabelText("Monthly bills");
    await user.click(monthlyBillsCheckbox);

    const saveButton = screen.getByText(
      accessibilityCommunicationPreferencesText.saveButtonText,
    );
    await user.click(saveButton);

    await waitFor(() => {
      expect(screen.getByText("Please select a format")).toBeInTheDocument();
    });
  });

  it("populates form with existing preferences from store", () => {
    (useJoinFlowStore as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
      accessibilityCommunicationPreferences: {
        contentTypes: { monthlyBills: true, cics: true },
        contactPreferences: { braille: true },
      },
      setAccessibilityCommunicationPreferences:
        mockSetAccessibilityCommunicationPreferences,
    });

    render(<CommunicationRequirements />);

    const checkbox = screen.getByLabelText(
      accessibilityCommunicationPreferencesText.formatNeededLabel,
    );
    expect(checkbox).toBeChecked();

    const expectFormState = (
      checkedItems: string[],
      uncheckedItems: string[] = [],
    ) => {
      checkedItems.forEach((item) => {
        expect(screen.getByLabelText(item)).toBeChecked();
      });
      uncheckedItems.forEach((item) => {
        expect(screen.getByLabelText(item)).not.toBeChecked();
      });
    };

    expectFormState(
      ["Braille", "Monthly bills", "Contract information and summary"],
      ["Audio", "Large print", "T&Cs"],
    );
  });
});
