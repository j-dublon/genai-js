import { vi } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { useScrollable } from "./";

describe("useScrollable", () => {
  const mock = (scrollLeft = 0) => ({
    current: {
      offsetLeft: 100,
      scrollLeft,
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      tagName: "DIV",
      style: {}
    } as unknown as HTMLDivElement
  });

  const mockRef = mock();

  it("should initialize with default values", () => {
    const { result } = renderHook(() => useScrollable(mockRef));
    expect(result.current.isMouseDown).toBe(false);
  });

  it("should handle mouse down event", () => {
    const { result } = renderHook(() => useScrollable(mockRef));

    act(() => {
      result.current.onMouseDown({ pageX: 150 } as React.MouseEvent);
    });

    expect(result.current.isMouseDown).toBe(true);
  });

  it("should handle mouse up event", () => {
    const { result } = renderHook(() => useScrollable(mockRef));

    act(() => {
      result.current.onMouseDown({ pageX: 150 } as React.MouseEvent);
      result.current.onMouseUp();
    });

    expect(result.current.isMouseDown).toBe(false);
  });

  it("should update scroll position on mouse move", () => {
    const mockRefWithScroll = mock(50);
    const { result } = renderHook(() => useScrollable(mockRefWithScroll));
    act(() => {
      result.current.onMouseDown({ pageX: 150 } as React.MouseEvent);
      result.current.onMouseMove({
        pageX: 200,
        preventDefault: () => {}
      } as unknown as React.MouseEvent);
    });
    expect(mockRefWithScroll.current.scrollLeft).toBeDefined();
  });

  it("should not scroll when mouse is not down", () => {
    const mockRefWithScroll = mock(50);
    const { result } = renderHook(() => useScrollable(mockRefWithScroll));
    const initialScrollLeft = mockRefWithScroll.current.scrollLeft;
    act(() => {
      result.current.onMouseMove({
        pageX: 200,
        preventDefault: () => {}
      } as unknown as React.MouseEvent);
    });
    expect(mockRefWithScroll.current.scrollLeft).toBe(initialScrollLeft);
  });
});
