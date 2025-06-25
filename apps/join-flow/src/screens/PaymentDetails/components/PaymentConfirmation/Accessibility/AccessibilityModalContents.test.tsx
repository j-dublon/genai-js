import { zodResolver } from "@hookform/resolvers/zod";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useForm } from "react-hook-form";
import { beforeEach, describe, expect, it } from "vitest";

import useJoinFlowStore from "@/store/useJoinFlowStore";
import {
  AccessibilityRequirementsFormData,
  accessibilityRequirementsSchema,
} from "@/validation/join-flow-schema";

import { AccessibilityModalContents } from "./AccessibilityModalContents";
import { accessibilityModalText } from "./AccessibilityProps";

// Test wrapper component that provides form logic
const TestWrapper = ({
  onSubmit = vi.fn(),
  onClear = vi.fn(),
  initialValues = {},
}: {
  onSubmit?: (data: AccessibilityRequirementsFormData) => void;
  onClear?: () => void;
  initialValues?: Partial<AccessibilityRequirementsFormData>;
}) => {
  const { handleSubmit, control, setValue } =
    useForm<AccessibilityRequirementsFormData>({
      resolver: zodResolver(accessibilityRequirementsSchema),
      defaultValues: {
        visionImpaired: false,
        hearingImpaired: false,
        neurodiverse: false,
        learningDisability: false,
        thirdPartyAssistance: false,
        thirdPartyName: "",
        thirdPartyPhone: "",
        thirdPartyEmail: "",
        physicalIllness: false,
        physicalDisability: false,
        communicationNeeds: false,
        mentalIllness: false,
        additionalInformation: "",
        ...initialValues,
      },
    });

  return (
    <AccessibilityModalContents
      control={control}
      handleSubmit={handleSubmit}
      setValue={setValue}
      onSubmit={onSubmit}
      onClear={onClear}
    />
  );
};

describe("AccessibilityModalContents", () => {
  const mockOnSubmit = vi.fn();
  const mockOnClear = vi.fn();
  const {
    accessibilityCheckboxes,
    additionalInformationLabel,
    additionalInformationPlaceholder,
    submitButtonText,
  } = accessibilityModalText;

  beforeEach(() => {
    vi.clearAllMocks();
    useJoinFlowStore.setState({ accessibilityRequirements: null });
  });

  it("renders the form with all accessibility checkboxes", () => {
    render(<TestWrapper onSubmit={mockOnSubmit} onClear={mockOnClear} />);

    accessibilityCheckboxes.forEach(({ label }) => {
      expect(screen.getByLabelText(label)).toBeInTheDocument();
    });
  });

  it("renders additional information textarea", () => {
    render(<TestWrapper onSubmit={mockOnSubmit} onClear={mockOnClear} />);

    expect(screen.getByText(additionalInformationLabel)).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText(additionalInformationPlaceholder),
    ).toBeInTheDocument();
  });

  it("renders reset and submit buttons", () => {
    render(<TestWrapper onSubmit={mockOnSubmit} onClear={mockOnClear} />);

    expect(
      screen.getByRole("button", { name: "Clear requirements" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: submitButtonText }),
    ).toBeInTheDocument();
  });

  it("calls onSubmit when form is submitted with valid data", async () => {
    const user = userEvent.setup();
    render(<TestWrapper onSubmit={mockOnSubmit} onClear={mockOnClear} />);

    const visionImpairedCheckbox = screen.getByLabelText(
      accessibilityCheckboxes.find(({ name }) => name === "visionImpaired")
        ?.label ?? "",
    );

    await user.click(visionImpairedCheckbox);

    const submitButton = screen.getByRole("button", {
      name: submitButtonText,
    });

    await user.click(submitButton);

    expect(mockOnSubmit).toHaveBeenCalledWith(
      {
        visionImpaired: true,
        hearingImpaired: false,
        neurodiverse: false,
        learningDisability: false,
        thirdPartyAssistance: false,
        thirdPartyName: "",
        thirdPartyPhone: "",
        thirdPartyEmail: "",
        physicalIllness: false,
        physicalDisability: false,
        communicationNeeds: false,
        mentalIllness: false,
        additionalInformation: "",
      },
      expect.any(Object), // The event object
    );
  });

  it("shows validation errors for third party fields when third party assistance is checked", async () => {
    const user = userEvent.setup();
    render(<TestWrapper onSubmit={mockOnSubmit} onClear={mockOnClear} />);

    const thirdPartyCheckbox = screen.getByLabelText(
      accessibilityCheckboxes.find(
        ({ name }) => name === "thirdPartyAssistance",
      )?.label ?? "",
    );

    await user.click(thirdPartyCheckbox);

    const submitButton = screen.getByRole("button", {
      name: submitButtonText,
    });

    await user.click(submitButton);

    expect(screen.getByText("Please provide a name")).toBeInTheDocument();
    expect(
      screen.getByText("Please provide an email address"),
    ).toBeInTheDocument();
    expect(mockOnSubmit).not.toHaveBeenCalled();
  });

  it("calls onClear when reset button is clicked", async () => {
    const user = userEvent.setup();
    render(<TestWrapper onSubmit={mockOnSubmit} onClear={mockOnClear} />);

    const resetButton = screen.getByRole("button", {
      name: "Clear requirements",
    });
    await user.click(resetButton);

    expect(mockOnClear).toHaveBeenCalled();
  });

  it("loads initial values into form", () => {
    const initialValues = {
      visionImpaired: true,
      hearingImpaired: true,
      additionalInformation: "Test information",
    };

    render(
      <TestWrapper
        onSubmit={mockOnSubmit}
        onClear={mockOnClear}
        initialValues={initialValues}
      />,
    );

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
