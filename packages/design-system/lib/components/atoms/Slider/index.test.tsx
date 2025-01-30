import { render, screen } from "@testing-library/react";
import { Slider } from "./";
import { useScrollable } from "@hooks/useScrollable";
import { vi, Mock } from "vitest";

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
      </Slider>
    );
    expect(screen.getByTestId("child-1")).toBeInTheDocument();
    expect(screen.getByTestId("child-2")).toBeInTheDocument();
  });
});
