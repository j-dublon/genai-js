import { useScrollable } from "@hooks/useScrollable";
import { render, screen } from "@testing-library/react";
import { Mock, vi } from "vitest";

import { Slider } from "./";

vi.mock("@hooks/useScrollable", () => ({
  useScrollable: vi.fn(),
}));

describe("Slider", () => {
  const mockUseScrollable = {
    isMouseDown: false,
    onMouseDown: vi.fn(),
    onMouseUp: vi.fn(),
    onMouseMove: vi.fn(),
  };
  globalThis.ResizeObserver = vi.fn().mockImplementation(() => ({
    observe: vi.fn(),
    unobserve: vi.fn(),
    disconnect: vi.fn(),
  }));
  beforeEach(() => {
    (useScrollable as Mock).mockReturnValue(mockUseScrollable);
  });
  afterEach(() => {
    vi.clearAllMocks();
  });
  it("renders children correctly", () => {
    render(
      <Slider>
        <div data-testid="child-1">Item 1</div>
        <div data-testid="child-2">Item 2</div>
      </Slider>,
    );
    expect(screen.getByTestId("child-1")).toBeInTheDocument();
    expect(screen.getByTestId("child-2")).toBeInTheDocument();
  });

  it("renders expected scrollbar classes to hide for mobile and show for desktop", () => {
    // mocking that the content is wider than the slider
    vi.spyOn(HTMLElement.prototype, "scrollWidth", "get").mockReturnValue(500);
    vi.spyOn(HTMLElement.prototype, "clientWidth", "get").mockReturnValue(300);

    render(
      <Slider>
        <div data-testid="child-1">Item 1</div>
        <div data-testid="child-2">Item 2</div>
      </Slider>,
    );

    const scrollbar = screen.getByRole("scrollbar", {
      name: /scroll indicator/i,
    });

    expect(scrollbar.className).toContain("md:block");
    expect(scrollbar.className).toContain("hidden");
  });

  it("does not render a scrollbar if the content is not wider than the slider", () => {
    vi.spyOn(HTMLElement.prototype, "scrollWidth", "get").mockReturnValue(300);
    vi.spyOn(HTMLElement.prototype, "clientWidth", "get").mockReturnValue(300);

    render(
      <Slider>
        <div data-testid="child-1">Item 1</div>
        <div data-testid="child-2">Item 2</div>
      </Slider>,
    );

    const scrollbar = screen.queryByRole("scrollbar", {
      name: /scroll indicator/i,
    });

    expect(scrollbar).not.toBeInTheDocument();
  });

  it("renders with additional margin styles if provided", () => {
    render(
      <Slider margin="xl:before:w-10">
        <div data-testid="child-1">Item 1</div>
        <div data-testid="child-2">Item 2</div>
      </Slider>,
    );

    const slider = screen.getByRole("region", { name: "Scrollable content" });
    expect(slider).toHaveClass("xl:before:w-10");
  });
});
