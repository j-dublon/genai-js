import { CustomInputProps } from "@react-component-library/ui";
import { render, screen, waitFor } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import React from "react";
import { useForm } from "react-hook-form";
import { beforeEach, describe, expect, it, vi } from "vitest";

import { FormDropdown } from "./";

vi.mock("@react-component-library/ui", () => ({
  InputField: ({
    setIsOpen,
    isOpen,
    placeholderText,
    value,
  }: CustomInputProps) => (
    <input
      data-testid="input-field"
      placeholder={placeholderText}
      value={value || ""}
      onClick={() => setIsOpen(!isOpen)}
      readOnly
    />
  ),
}));

interface MockFormData extends Record<string, string> {
  timeSlot: string;
  selectedDate: string;
}

const mockOptions = {
  "9:00 AM": "9:00 AM",
  "10:00 AM": "10:00 AM",
  "11:00 AM": "11:00 AM",
};
const mockLabel = "Select Time Slot";
const mockPlaceholder = "Choose a time slot";

function TestComponent({
  errorMessage,
  errorMessageStyling,
}: {
  errorMessage?: string;
  errorMessageStyling?: string;
}) {
  const { control } = useForm<MockFormData>({
    defaultValues: { timeSlot: "", selectedDate: "" },
  });

  return (
    <FormDropdown
      name="timeSlot"
      dropdownLabel={mockLabel}
      control={control}
      dropdownPlaceholder={mockPlaceholder}
      options={mockOptions}
      errorMessage={errorMessage}
      errorMessageStyling={errorMessageStyling}
    />
  );
}

describe("FormDropdown Component", () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  it("renders with the correct label and placeholder", () => {
    render(<TestComponent errorMessage={undefined} />);

    expect(screen.getByText(mockLabel)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(mockPlaceholder)).toBeInTheDocument();
  });

  it("opens the dropdown when the input is clicked", async () => {
    render(<TestComponent errorMessage={undefined} />);

    const inputField = screen.getByTestId("input-field");
    expect(
      screen.queryByText(Object.keys(mockOptions)[0]),
    ).not.toBeInTheDocument();

    await userEvent.click(inputField);

    // Verify all options are displayed
    for (const option of Object.keys(mockOptions)) {
      expect(screen.getByText(option)).toBeInTheDocument();
    }
  });

  it("selects an option and closes the dropdown", async () => {
    render(<TestComponent errorMessage={undefined} />);

    // Open dropdown
    const inputField = screen.getByTestId("input-field");
    await userEvent.click(inputField);

    // Select an option
    const optionToSelect = screen.getByText(Object.keys(mockOptions)[1]);
    userEvent.click(optionToSelect);

    // Dropdown should be closed
    await waitFor(() => {
      expect(
        screen.queryByText(Object.keys(mockOptions)[0]),
      ).not.toBeInTheDocument();
    });
  });

  it("closes the dropdown when clicking outside", async () => {
    render(
      <div>
        <TestComponent errorMessage={undefined} />
        <div data-testid="outside-element">Outside Element</div>
      </div>,
    );

    // Open dropdown
    const inputField = screen.getByTestId("input-field");
    await userEvent.click(inputField);

    // Verify dropdown is open
    expect(screen.getByText(Object.keys(mockOptions)[0])).toBeInTheDocument();

    // Click outside
    const outsideElement = screen.getByTestId("outside-element");
    await userEvent.click(outsideElement);

    // Dropdown should close
    await waitFor(() => {
      expect(
        screen.queryByText(Object.keys(mockOptions)[0]),
      ).not.toBeInTheDocument();
    });
  });

  it("displays error message when provided", () => {
    const errorMessage = "Please select a time slot";
    render(
      <TestComponent
        errorMessage={errorMessage}
        errorMessageStyling="custom-class"
      />,
    );

    const errorMessageElement = screen.getByText(errorMessage);
    expect(errorMessageElement).toBeInTheDocument();
    expect(errorMessageElement).toHaveClass("custom-class");
  });

  it("applies default error message styling when not provided", () => {
    const errorMessage = "Please select a time slot";
    render(
      <TestComponent
        errorMessage={errorMessage}
        errorMessageStyling={undefined}
      />,
    );
    const errorMessageElement = screen.getByText(/please select/i);
    expect(errorMessageElement).toHaveClass("text-ui-error text-sm mt-1");
  });

  it("doesn't display error message when not provided", () => {
    render(<TestComponent errorMessage={undefined} />);

    expect(screen.queryByText(/please select/i)).not.toBeInTheDocument();
  });

  it("highlights the selected option", async () => {
    render(<TestComponent errorMessage={undefined} />);

    // Open dropdown
    const inputField = screen.getByTestId("input-field");
    await userEvent.click(inputField);

    // Select an option
    const optionToSelect = screen.getByText(Object.keys(mockOptions)[1]);
    await userEvent.click(optionToSelect);

    // Reopen dropdown to check if option is highlighted
    await userEvent.click(inputField);

    // Find the button containing the selected option
    const selectedButton = screen
      .getByText(Object.keys(mockOptions)[1])
      .closest("button");

    // Check if it has the selected class (contains font-medium)
    expect(selectedButton).toHaveClass("font-medium");
  });
});
