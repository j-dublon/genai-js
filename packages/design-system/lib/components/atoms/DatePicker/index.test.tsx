import "@testing-library/jest-dom";

import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import { DatePicker, DatePickerProps } from "./";

describe("DatePick Component", () => {
  const availableDates = [
    new Date("2023-10-01"),
    new Date("2023-10-15"),
    new Date("2023-10-30"),
  ];

  const mockOnDateSelect = vi.fn();

  const defaultProps: DatePickerProps = {
    availableDates,
    selectedDate: "",
    onDateSelect: mockOnDateSelect,
    placeholderText: "Select a date",
  };

  it("renders the date picker input", () => {
    render(<DatePicker {...defaultProps} />);
    const input = screen.getByText("Select a date");
    expect(input).toBeInTheDocument();
  });

  it("opens the calendar when clicked", () => {
    render(<DatePicker {...defaultProps} />);
    const input = screen.getByText("Select a date");
    fireEvent.click(input);

    const calendar = screen.getByRole("dialog");
    expect(calendar).toBeVisible();
  });

  it("calls onDateSelect when a date is selected", () => {
    render(<DatePicker {...defaultProps} />);
    const input = screen.getByText("Select a date");
    fireEvent.click(input);

    const day = screen.getByText("15");
    fireEvent.click(day);

    expect(mockOnDateSelect).toHaveBeenCalledWith(
      new Date("2023-10-15").toDateString(),
    );
  });

  it("rotates the icon when the calendar is open", () => {
    render(<DatePicker {...defaultProps} />);
    const input = screen.getByText("Select a date");
    fireEvent.click(input);

    const icon = screen.getByTestId("arrow-icon");
    expect(icon).toHaveClass("ds:rotate-180");
  });

  it("does not rotate the icon when the calendar is closed", () => {
    render(<DatePicker {...defaultProps} />);
    const icon = screen.getByTestId("arrow-icon");
    expect(icon).not.toHaveClass("ds:rotate-180");
  });
});
