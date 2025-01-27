import { render, screen, fireEvent } from "@testing-library/react";
import { Slider } from "./";
import { useScrollable } from "@hooks/useScrollable";

jest.mock("../../../hooks/useScrollable", () => ({
  useScrollable: jest.fn(),
}));

describe("Slider", () => {
  const mockUseScrollable = {
    isMouseDown: false,
    onMouseDown: jest.fn(),
    onMouseUp: jest.fn(),
    onMouseMove: jest.fn(),
  };

  beforeEach(() => {
    (useScrollable as jest.Mock).mockReturnValue(mockUseScrollable);
  });

  afterEach(() => {
    jest.clearAllMocks();
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

  it("wraps children in slider-item class", () => {
    render(
      <Slider>
        <div>Item 1</div>
      </Slider>
    );

    expect(screen.getByText("Item 1").parentElement).toHaveClass("slider-item");
  });

  describe("when draggable is false (default)", () => {
    it("does not add drag-related classes", () => {
      const { container } = render(
        <Slider>
          <div>Item</div>
        </Slider>
      );

      const sliderElement = container.firstChild as HTMLElement;
      expect(sliderElement).not.toHaveClass("cursor-grab");
      expect(sliderElement).not.toHaveClass("cursor-grabbing");
      expect(sliderElement).not.toHaveClass("select-none");
    });

    it("does not attach mouse event handlers", () => {
      const { container } = render(
        <Slider>
          <div>Item</div>
        </Slider>
      );

      const sliderElement = container.firstChild as HTMLElement;
      expect(sliderElement).not.toHaveAttribute("onmousedown");
      expect(sliderElement).not.toHaveAttribute("onmouseup");
      expect(sliderElement).not.toHaveAttribute("onmousemove");
    });
  });

  describe("when draggable is true", () => {
    it("adds correct drag-related classes", () => {
      const { container } = render(
        <Slider draggable>
          <div>Item</div>
        </Slider>
      );

      const sliderElement = container.firstChild as HTMLElement;
      expect(sliderElement).toHaveClass("cursor-grab");
      expect(sliderElement).toHaveClass("select-none");
    });

    it("changes cursor style when mouse is down", () => {
      (useScrollable as jest.Mock).mockReturnValue({
        ...mockUseScrollable,
        isMouseDown: true,
      });

      const { container } = render(
        <Slider draggable>
          <div>Item</div>
        </Slider>
      );

      const sliderElement = container.firstChild as HTMLElement;
      expect(sliderElement).toHaveClass("cursor-grabbing");
    });

    it("attaches mouse event handlers", () => {
      const { container } = render(
        <Slider draggable>
          <div>Item</div>
        </Slider>
      );

      const sliderElement = container.firstChild as HTMLElement;

      fireEvent.mouseDown(sliderElement);
      expect(mockUseScrollable.onMouseDown).toHaveBeenCalled();

      fireEvent.mouseUp(sliderElement);
      expect(mockUseScrollable.onMouseUp).toHaveBeenCalled();

      fireEvent.mouseMove(sliderElement);
      expect(mockUseScrollable.onMouseMove).toHaveBeenCalled();
    });
  });

  it("applies responsive margin styles", () => {
    const { container } = render(
      <Slider>
        <div>Item</div>
      </Slider>
    );

    const sliderElement = container.firstChild as HTMLElement;
    expect(sliderElement).toHaveClass("before:w-4");
    expect(sliderElement).toHaveClass("sm:before:w-6");
    expect(sliderElement).toHaveClass("md:before:w-8");
    expect(sliderElement).toHaveClass("lg:before:w-12");
    expect(sliderElement).toHaveClass("xl:before:w-[calc((100vw-1280px)/2)]");
  });
});
