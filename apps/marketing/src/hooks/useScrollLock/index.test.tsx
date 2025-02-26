import { renderHook } from "@testing-library/react";
import { afterAll, beforeEach, describe, expect, it, vi } from "vitest";

import { useScrollLock } from ".";

describe("useScrollLock", () => {
  const originalScrollY = window.scrollY;

  const originalBodyStyle = {
    position: document.body.style.position,
    top: document.body.style.top,
    width: document.body.style.width,
    overflowY: document.body.style.overflowY,
  };

  const scrollToMock = vi.fn();
  window.scrollTo = scrollToMock;

  beforeEach(() => {
    document.body.style.position = originalBodyStyle.position;
    document.body.style.top = originalBodyStyle.top;
    document.body.style.width = originalBodyStyle.width;
    document.body.style.overflowY = originalBodyStyle.overflowY;

    scrollToMock.mockReset();

    Object.defineProperty(window, "scrollY", {
      configurable: true,
      value: 100,
    });
  });

  afterAll(() => {
    Object.defineProperty(window, "scrollY", {
      configurable: true,
      value: originalScrollY,
    });
  });

  it("should apply body styles when isLocked is true", () => {
    renderHook(() => useScrollLock(true));

    expect(document.body.style.position).toBe("fixed");
    expect(document.body.style.top).toBe("-100px");
    expect(document.body.style.width).toBe("100%");
    expect(document.body.style.overflowY).toBe("hidden");
  });

  it("should not apply body styles when isLocked is false", () => {
    renderHook(() => useScrollLock(false));

    expect(document.body.style.position).toBe(originalBodyStyle.position);
    expect(document.body.style.top).toBe(originalBodyStyle.top);
    expect(document.body.style.width).toBe(originalBodyStyle.width);
    expect(document.body.style.overflowY).toBe(originalBodyStyle.overflowY);
  });

  it("should restore body styles and scroll position when unmounted", () => {
    const { unmount } = renderHook(() => useScrollLock(true));

    unmount();

    expect(document.body.style.position).toBe("");
    expect(document.body.style.top).toBe("");
    expect(document.body.style.width).toBe("");
    expect(document.body.style.overflowY).toBe("");
    expect(scrollToMock).toHaveBeenCalledWith(0, 100);
  });

  it("should restore body styles and scroll position when isLocked changes from true to false", () => {
    const { rerender } = renderHook(({ isLocked }) => useScrollLock(isLocked), {
      initialProps: { isLocked: true },
    });

    rerender({ isLocked: false });

    expect(document.body.style.position).toBe("");
    expect(document.body.style.top).toBe("");
    expect(document.body.style.width).toBe("");
    expect(document.body.style.overflowY).toBe("");
    expect(scrollToMock).toHaveBeenCalledWith(0, 100);
  });

  it("should not restore body styles when isLocked remains false", () => {
    scrollToMock.mockReset();

    const { rerender } = renderHook(({ isLocked }) => useScrollLock(isLocked), {
      initialProps: { isLocked: false },
    });

    rerender({ isLocked: false });

    expect(scrollToMock).not.toHaveBeenCalled();
  });

  it("should handle different scroll positions", () => {
    Object.defineProperty(window, "scrollY", {
      configurable: true,
      value: 250,
    });

    renderHook(() => useScrollLock(true));

    expect(document.body.style.top).toBe("-250px");
  });
});
