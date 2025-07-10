import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";

import { HoverTooltip } from ".";

const tooltipText = "Hover me!";
const tooltipContent = "This is a tooltip.";

const user = userEvent.setup();

describe("HoverTooltip", () => {
  it("renders the tooltip text", () => {
    render(
      <HoverTooltip
        tooltipText={tooltipText}
        tooltipContent={tooltipContent}
      />,
    );
    expect(screen.getByText(tooltipText)).toBeInTheDocument();
  });

  it("shows the tooltip on mouse enter", async () => {
    render(
      <HoverTooltip
        tooltipText={tooltipText}
        tooltipContent={tooltipContent}
      />,
    );
    const trigger = screen.getByText(tooltipText);
    await user.hover(trigger);
    const tooltips = screen.getAllByText(tooltipContent);
    const visibleTooltip = tooltips.find(
      (el) => !el.classList.contains("sr-only"),
    );
    const tooltip = visibleTooltip?.parentElement;
    expect(tooltip).toHaveClass("opacity-100");
    expect(tooltip).not.toHaveClass("invisible");
  });

  it("renders the correct tooltip content", async () => {
    render(
      <HoverTooltip
        tooltipText={tooltipText}
        tooltipContent={tooltipContent}
      />,
    );
    const trigger = screen.getByText(tooltipText);
    await user.hover(trigger);
    const tooltips = screen.getAllByText(tooltipContent);
    const visibleTooltip = tooltips.find(
      (el) => !el.classList.contains("sr-only"),
    );
    expect(visibleTooltip).toBeInTheDocument();
  });

  it("hides the tooltip on mouse leave", async () => {
    render(
      <HoverTooltip
        tooltipText={tooltipText}
        tooltipContent={tooltipContent}
      />,
    );
    const trigger = screen.getByText(tooltipText);
    await user.hover(trigger);
    await user.unhover(trigger);
    const tooltips = screen.getAllByText(tooltipContent);
    const visibleTooltip = tooltips.find(
      (el) => !el.classList.contains("sr-only"),
    );
    const tooltip = visibleTooltip?.parentElement;
    expect(tooltip).toHaveClass("opacity-0");
    expect(tooltip).toHaveClass("invisible");
  });

  it("renders a screen reader only span with the tooltip content and correct id", () => {
    const exampleTooltipText = "Example Text";
    const exampleTooltipContent = "This is a tooltip.";
    const toolTipId = "example-text-tooltip";
    render(
      <HoverTooltip
        tooltipText={exampleTooltipText}
        tooltipContent={exampleTooltipContent}
      />,
    );

    const tooltips = screen.getAllByText(tooltipContent);
    const srOnly = tooltips.find((el) => el.classList.contains("sr-only"));
    expect(srOnly).toBeInTheDocument();
    expect(srOnly).toHaveTextContent(exampleTooltipContent);
    expect(srOnly).toHaveAttribute("id", toolTipId);
  });
});
