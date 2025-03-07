import { fireEvent, render, screen } from "@testing-library/react";

import { ChevronVerticalAnimated } from ".";

describe("ChevronVerticalAnimated", () => {
  test("renders with default props", () => {
    render(<ChevronVerticalAnimated />);

    const chevronSpan = screen.getByRole("button", { hidden: true });
    expect(chevronSpan).toBeInTheDocument();
    expect(chevronSpan).toHaveAttribute("aria-label", "Toggle menu");
    expect(chevronSpan).toHaveAttribute("aria-expanded", "false");
    expect(chevronSpan).not.toHaveAttribute("aria-controls");
    expect(chevronSpan).not.toHaveAttribute("id");
  });

  test("renders with custom props", () => {
    render(
      <ChevronVerticalAnimated
        isOpen={true}
        ariaLabel="Open dropdown"
        ariaControls="dropdown-menu"
        buttonId="custom-button"
      />,
    );

    const chevronSpan = screen.getByRole("button", { hidden: true });
    expect(chevronSpan).toHaveAttribute("aria-label", "Open dropdown");
    expect(chevronSpan).toHaveAttribute("aria-expanded", "true");
    expect(chevronSpan).toHaveAttribute("aria-controls", "dropdown-menu");
    expect(chevronSpan).toHaveAttribute("id", "custom-button");
  });

  test("applies correct styles when closed", () => {
    render(<ChevronVerticalAnimated isOpen={false} />);

    const chevronSpan = screen.getByRole("button", { hidden: true });
    expect(chevronSpan).toHaveClass("ds:bg-core-white");
    expect(chevronSpan).toHaveClass("ds:text-gray-900");

    const innerSpan = chevronSpan.querySelector("span");
    expect(innerSpan).not.toHaveClass("ds:rotate-180");
  });

  test("applies correct styles when open", () => {
    render(<ChevronVerticalAnimated isOpen={true} />);

    const chevronSpan = screen.getByRole("button", { hidden: true });
    expect(chevronSpan).toHaveClass("ds:bg-core-black");
    expect(chevronSpan).toHaveClass("ds:text-core-white");

    const innerSpan = chevronSpan.querySelector("span");
    expect(innerSpan).toHaveClass("ds:rotate-180");
  });

  test("calls onClick when clicked", () => {
    const handleClick = vi.fn();
    render(<ChevronVerticalAnimated onClick={handleClick} />);

    const chevronSpan = screen.getByRole("button", { hidden: true });
    fireEvent.click(chevronSpan);

    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  test("calls onClick when Enter key is pressed", () => {
    const handleClick = vi.fn();
    render(<ChevronVerticalAnimated onClick={handleClick} />);

    const chevronSpan = screen.getByRole("button", { hidden: true });
    fireEvent.keyDown(chevronSpan, { key: "Enter", code: "Enter" });

    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  test("calls onClick when Space key is pressed", () => {
    const handleClick = vi.fn();
    render(<ChevronVerticalAnimated onClick={handleClick} />);

    const chevronSpan = screen.getByRole("button", { hidden: true });
    fireEvent.keyDown(chevronSpan, { key: " ", code: "Space" });

    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
