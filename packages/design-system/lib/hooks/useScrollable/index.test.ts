// DOMMatrixReadOnly is used in useScrollable, needs mocking for tests to run
class DOMMatrixReadOnlyPolyfill {
  m41: number;
  constructor(transform: string) {
    const match = transform.match(/matrix\(([^)]+)\)/);
    if (match) {
      const parts = match[1].split(",").map((s) => parseFloat(s.trim()));
      this.m41 = parts[4] || 0;
    } else {
      this.m41 = 0;
    }
  }
}

if (typeof DOMMatrixReadOnly === "undefined") {
  // @ts-expect-error loads of missing types but we
  // just want to make the test happy
  // eslint-disable-next-line no-undef
  global.DOMMatrixReadOnly = DOMMatrixReadOnlyPolyfill;
}

import { renderHook } from "@testing-library/react";
import React, { act } from "react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { useScrollable } from ".";

describe("useScrollable", () => {
  let element: HTMLDivElement;
  let ref: React.RefObject<HTMLDivElement>;

  beforeEach(() => {
    element = document.createElement("div");
    Object.defineProperty(element, "offsetLeft", {
      configurable: true,
      value: 0,
    });
    element.scrollLeft = 100;
    Object.defineProperty(element, "scrollWidth", {
      configurable: true,
      value: 500,
    });
    Object.defineProperty(element, "clientWidth", {
      configurable: true,
      value: 300,
    });
    element.style.transition = "all 0.3s";
    element.style.transform = "translateX(0px)";

    ref = { current: element };
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("sets initial state on mouse down", () => {
    const { result } = renderHook(() => useScrollable(ref));

    // create a fake mouse down event
    const mouseDownEvent = {
      pageX: 30,
    } as React.MouseEvent;

    act(() => {
      result.current.onMouseDown(mouseDownEvent);
    });

    expect(result.current.isMouseDown).toBe(true);
    expect(element.scrollLeft).toBe(100); // remains unchanged from initial
    expect(element.style.transition).toBe("");
    expect(element.style.transform).toBe("");
  });

  it("updates scroll position on mouse move when within bounds", () => {
    const { result } = renderHook(() => useScrollable(ref));

    act(() => {
      result.current.onMouseDown({ pageX: 50 } as React.MouseEvent);
    });

    // create a fake mouse move event
    const moveEvent = {
      pageX: 60,
      preventDefault: vi.fn(),
    } as unknown as React.MouseEvent;

    act(() => {
      result.current.onMouseMove(moveEvent);
    });

    expect(element.scrollLeft).toBe(80);
    expect(element.style.transform).toBe("translateX(0px)");
    expect(moveEvent.preventDefault).toHaveBeenCalled();
  });

  it("applies transform when overscrolling left", () => {
    const { result } = renderHook(() => useScrollable(ref));

    act(() => {
      result.current.onMouseDown({ pageX: 50 } as React.MouseEvent);
    });

    // simulate a mouse move that would overscroll to the left.
    const moveEvent = {
      pageX: 120,
      preventDefault: vi.fn(),
    } as unknown as React.MouseEvent;

    act(() => {
      result.current.onMouseMove(moveEvent);
    });

    expect(element.scrollLeft).toBe(0);
    expect(element.style.transform).toBe("translateX(4px)");
    expect(moveEvent.preventDefault).toHaveBeenCalled();
  });

  it("applies transform when overscrolling right", () => {
    const { result } = renderHook(() => useScrollable(ref));

    act(() => {
      result.current.onMouseDown({ pageX: 50 } as React.MouseEvent);
    });

    // simulate a mouse move that overscrolls to the right
    const moveEvent = {
      pageX: -10,
      preventDefault: vi.fn(),
    } as unknown as React.MouseEvent;

    act(() => {
      result.current.onMouseMove(moveEvent);
    });

    expect(element.scrollLeft).toBe(200); // clamped to maxScroll
    expect(element.style.transform).toBe("translateX(-2px)");
    expect(moveEvent.preventDefault).toHaveBeenCalled();
  });

  it("does nothing on mouse move if mouse is not down", () => {
    const { result } = renderHook(() => useScrollable(ref));

    const initialScrollLeft = element.scrollLeft;
    const moveEvent = {
      pageX: 70,
      preventDefault: vi.fn(),
    } as unknown as React.MouseEvent;

    act(() => {
      result.current.onMouseMove(moveEvent);
    });

    expect(element.scrollLeft).toBe(initialScrollLeft);
    expect(element.style.transform).toBe("translateX(0px)");
  });

  it("does nothing on mouse move if ref.current is null", () => {
    const nullRef = { current: null };
    const { result } = renderHook(() => useScrollable(nullRef));

    const moveEvent = {
      pageX: 70,
      preventDefault: vi.fn(),
    } as unknown as React.MouseEvent;

    expect(() => {
      act(() => {
        result.current.onMouseMove(moveEvent);
      });
    }).not.toThrow();
  });

  it("does nothing on mouse up if ref.current is null", () => {
    const nullRef = { current: null };
    const { result } = renderHook(() => useScrollable(nullRef));

    expect(() => {
      act(() => {
        result.current.onMouseUp();
      });
    }).not.toThrow();
  });
});
