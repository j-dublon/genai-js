import { fireEvent, render, screen } from "@testing-library/react";
import { ReactNode } from "react";

import { Preferences } from "./preferences";

vi.mock("./details", () => ({
  Root: ({ children }: { children: ReactNode }) => <div>{children}</div>,
  Summary: ({ children }: { children: ReactNode }) => <div>{children}</div>,
  Content: ({ children }: { children: ReactNode }) => <div>{children}</div>,
  IndicatorPlusMinus: () => <span>+</span>,
  Label: ({ children }: { children: ReactNode }) => <span>{children}</span>,
}));

describe("Preferences Component", () => {
  const mockOnChange = vi.fn();

  afterEach(() => {
    mockOnChange.mockClear();
  });

  it("renders with correct header and body text", () => {
    render(
      <Preferences
        header="Test Header"
        body="This is a test body."
        defaultChecked={false}
        disabled={false}
        onChange={mockOnChange}
      />,
    );

    expect(screen.getByText("Test Header")).toBeInTheDocument();
    expect(screen.getByText("This is a test body.")).toBeInTheDocument();
  });

  it("calls onChange when the toggle is clicked", () => {
    render(
      <Preferences
        header="Test Header"
        body="This is a test body."
        defaultChecked={false}
        disabled={false}
        onChange={mockOnChange}
      />,
    );

    const toggle = screen.getByRole("checkbox");
    fireEvent.click(toggle);

    expect(mockOnChange).toHaveBeenCalledWith(true);
  });

  it("should respect defaultChecked prop", () => {
    render(
      <Preferences
        header="Test Header"
        body="This is a test body."
        defaultChecked={true}
        disabled={false}
        onChange={mockOnChange}
      />,
    );

    const toggle = screen.getByRole("checkbox");
    expect(toggle).toBeChecked();
  });
});
