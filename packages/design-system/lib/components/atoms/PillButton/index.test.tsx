import { fireEvent, render, screen } from "@testing-library/react";

import { PillButton, PillButtonProps } from ".";

describe("PillButton Component", () => {
  const baseProps: PillButtonProps = {
    buttonText: "Test Button",
    backgroundColor: "black",
    type: "button",
    onSelect: vi.fn(),
  };

  it("renders the button with text", () => {
    render(<PillButton {...baseProps} />);
    const button = screen.getByRole("button", { name: /test button/i });
    expect(button).toBeInTheDocument();
    expect(button).toHaveTextContent("Test Button");
  });

  it("calls onSelect when clicked (button type)", () => {
    const onSelect = vi.fn();
    render(<PillButton {...baseProps} onSelect={onSelect} />);
    const button = screen.getByRole("button", { name: /test button/i });
    fireEvent.click(button);
    expect(onSelect).toHaveBeenCalled();
  });

  it("applies backgroundColor and whiteText classes", () => {
    render(<PillButton {...baseProps} backgroundColor="yellow" whiteText />);
    const button = screen.getByRole("button", { name: /test button/i });
    const buttonText = button.querySelector("h1");
    expect(button.className).toMatch(/ds:bg-core-yellow/);
    expect(buttonText?.className).toMatch(/ds:text-core-white/);
  });

  it("renders an icon if provided (button type)", () => {
    render(<PillButton {...baseProps} icon={<svg data-testid="icon" />} />);
    expect(screen.getByTestId("icon")).toBeInTheDocument();
  });

  describe("Dropdown type", () => {
    const dropDownOptions = [
      { label: "Option 1", value: "1" },
      { label: "Option 2", value: "2" },
    ];
    function setupDropdown(
      open = false,
      setDropDownOpen = vi.fn(),
      onSelect = vi.fn(),
    ) {
      render(
        <PillButton
          {...baseProps}
          type="dropdown"
          dropDownOptions={dropDownOptions}
          dropDownOpen={open}
          setDropDownOpen={setDropDownOpen}
          onSelect={onSelect}
        />,
      );
    }

    it("toggles dropdown open/close on button click", () => {
      const setDropDownOpen = vi.fn();
      setupDropdown(false, setDropDownOpen);
      const button = screen.getByRole("button", { name: /test button/i });
      fireEvent.click(button);
      expect(setDropDownOpen).toHaveBeenCalledWith(true);
    });

    it("shows dropdown options when open", () => {
      setupDropdown(true);
      expect(screen.getByText("Option 1")).toBeInTheDocument();
      expect(screen.getByText("Option 2")).toBeInTheDocument();
    });

    it("calls onSelect with value when option clicked", () => {
      const onSelect = vi.fn();
      setupDropdown(true, vi.fn(), onSelect);
      const option = screen.getByText("Option 2");
      fireEvent.click(option);
      expect(onSelect).toHaveBeenCalledWith("2");
    });
  });

  it("applies additional className if provided", () => {
    render(<PillButton {...baseProps} className="extra-class" />);
    const button = screen.getByRole("button", { name: /test button/i });
    expect(button.className).toMatch(/extra-class/);
  });

  it("sets aria-label if provided", () => {
    render(<PillButton {...baseProps} ariaLabel="custom label" />);
    const button = screen.getByLabelText("custom label");
    expect(button).toBeInTheDocument();
  });
});
