import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";

import { RestartBasket } from "./RestartBasket";

describe("RestartBasket", () => {
  const mockOnRestart = vi.fn();

  const defaultProps = {
    subtitle: "Test Subtitle",
    restartText: "Click to restart",
    warningText: "This will reset your progress",
    onRestart: mockOnRestart,
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should render all text content correctly", () => {
    render(<RestartBasket {...defaultProps} />);

    expect(screen.getByText(defaultProps.subtitle)).toBeInTheDocument();
    expect(screen.getByText(defaultProps.restartText)).toBeInTheDocument();
    expect(
      screen.getByText(`. ${defaultProps.warningText}`),
    ).toBeInTheDocument();
  });

  it("should call onRestart when restart text is clicked", async () => {
    const user = userEvent.setup();
    render(<RestartBasket {...defaultProps} />);

    const restartButton = screen.getByRole("button", {
      name: defaultProps.restartText,
    });
    await user.click(restartButton);

    expect(mockOnRestart).toHaveBeenCalledTimes(1);
  });

  it("should render the Alert icon, and hide it on desktop", () => {
    render(<RestartBasket {...defaultProps} />);

    const alertIcon = document.querySelector("svg");
    expect(alertIcon).toBeInTheDocument();
    expect(alertIcon).toHaveClass("md:hidden");
  });
});
