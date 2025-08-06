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

  it("calls onDateSelect when an available date is selected", () => {
    render(<DatePicker {...defaultProps} />);
    const input = screen.getByText("Select a date");
    fireEvent.click(input);

    const day = screen.getByText("15");
    fireEvent.click(day);

    expect(mockOnDateSelect).toHaveBeenCalledWith(
      new Date("2023-10-15").toDateString(),
    );
  });

  it("does not call onDateSelect when an unavailable date is clicked", () => {
    render(<DatePicker {...defaultProps} />);
    const input = screen.getByText("Select a date");
    fireEvent.click(input);

    const unavailableDay = screen.getByLabelText(
      "Not available Tuesday, 10 October 2023",
    );
    fireEvent.click(unavailableDay);

    expect(mockOnDateSelect).not.toHaveBeenCalled();
  });

  it("filters out unavailable dates from selection", () => {
    render(<DatePicker {...defaultProps} />);
    const input = screen.getByText("Select a date");
    fireEvent.click(input);

    const unavailableDay = screen.getByLabelText(
      "Not available Tuesday, 10 October 2023",
    );
    expect(unavailableDay).toHaveAttribute("aria-disabled", "true");
  });

  it("only allows selection of dates in availableDates array", () => {
    const testAvailableDates = [
      new Date("2023-10-01"),
      new Date("2023-10-15"),
      new Date("2023-10-30"),
    ];

    render(
      <DatePicker {...defaultProps} availableDates={testAvailableDates} />,
    );

    const input = screen.getByText("Select a date");
    fireEvent.click(input);

    const availableDay1 = screen.getByLabelText(
      "Choose Sunday, 1 October 2023",
    );
    const availableDay15 = screen.getByLabelText(
      "Choose Sunday, 15 October 2023",
    );
    const availableDay30 = screen.getByLabelText(
      "Choose Monday, 30 October 2023",
    );

    expect(availableDay1).not.toHaveAttribute("aria-disabled", "true");
    expect(availableDay15).not.toHaveAttribute("aria-disabled", "true");
    expect(availableDay30).not.toHaveAttribute("aria-disabled", "true");

    const unavailableDay10 = screen.getByLabelText(
      "Not available Tuesday, 10 October 2023",
    );
    const unavailableDay20 = screen.getByLabelText(
      "Not available Friday, 20 October 2023",
    );

    expect(unavailableDay10).toHaveAttribute("aria-disabled", "true");
    expect(unavailableDay20).toHaveAttribute("aria-disabled", "true");
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
