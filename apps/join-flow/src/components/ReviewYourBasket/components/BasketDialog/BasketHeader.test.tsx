import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";

import { BasketHeader } from "./BasketHeader";

describe("BasketHeader", () => {
  const mockOnClose = vi.fn();
  const mockTitle = "Review Your Basket";

  const defaultProps = {
    onClose: mockOnClose,
    title: mockTitle,
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should render the title correctly", () => {
    render(<BasketHeader {...defaultProps} />);

    expect(screen.getByRole("heading", { level: 2 })).toHaveTextContent(
      mockTitle,
    );
    expect(screen.getByText(mockTitle)).toBeInTheDocument();
  });

  it("should call onClose when close button is clicked", async () => {
    const user = userEvent.setup();
    render(<BasketHeader {...defaultProps} />);

    const closeButton = screen.getByLabelText("Close basket");
    await user.click(closeButton);

    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });

  it("should have responsive classes to vary close button content by screen size", () => {
    render(<BasketHeader {...defaultProps} />);

    const closeButton = screen.getByLabelText("Close basket");
    // First child is the close text with X icon, second child is the chevron icon
    expect(closeButton.firstChild).toHaveClass("hidden md:flex");
    expect(closeButton.firstChild).toHaveTextContent("Close");
    expect(closeButton.lastChild).toHaveClass("md:hidden");
  });
});
