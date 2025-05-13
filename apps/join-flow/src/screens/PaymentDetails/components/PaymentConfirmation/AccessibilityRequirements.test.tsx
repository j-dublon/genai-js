import { fireEvent, render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";

import useJoinFlowStore from "@/store/useJoinFlowStore";

import { AccessibilityRequirements } from "./AccessibilityRequirements";
import { paymentConfirmationText } from "./PaymentConfirmationProps";

vi.mock("@/store/useJoinFlowStore", () => ({
  default: vi.fn(),
}));

describe("AccessibilityRequirements", () => {
  const mockOnChange = vi.fn();
  const {
    accessibilityRequirementsTitle,
    accessibilityRequirementsDescription,
    accessibilityRequirementsCheckboxText,
  } = paymentConfirmationText;

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders the component with unchecked state when accessibilityRequirements is null", () => {
    (useJoinFlowStore as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
      accessibilityRequirements: null,
    });

    render(<AccessibilityRequirements onChange={mockOnChange} />);

    expect(
      screen.getByText(accessibilityRequirementsTitle),
    ).toBeInTheDocument();
    expect(
      screen.getByText(accessibilityRequirementsDescription),
    ).toBeInTheDocument();
    expect(
      screen.getByText(accessibilityRequirementsCheckboxText),
    ).toBeInTheDocument();

    const checkbox = screen.getByRole("checkbox");
    expect(checkbox).not.toBeChecked();
  });

  it("renders the component with checked state when accessibilityRequirements exists", () => {
    (useJoinFlowStore as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
      accessibilityRequirements: { visionImpaired: true },
    });

    render(<AccessibilityRequirements onChange={mockOnChange} />);

    const checkbox = screen.getByRole("checkbox");
    expect(checkbox).toBeChecked();
  });

  it("calls onChange when checkbox is clicked", () => {
    (useJoinFlowStore as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
      accessibilityRequirements: null,
    });

    render(<AccessibilityRequirements onChange={mockOnChange} />);

    const checkbox = screen.getByRole("checkbox");
    fireEvent.click(checkbox);

    expect(mockOnChange).toHaveBeenCalledTimes(1);
  });
});
