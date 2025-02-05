import { renderHook, act } from "@testing-library/react";
import { describe, it, expect, beforeEach, vi, afterEach } from "vitest";
import useIsDesktopScreen from ".";

describe("useIsDesktopScreen", () => {
  const originalInnerWidth = window.innerWidth;

  let resizeCallback: (() => void) | null = null;

  beforeEach(() => {
    vi.spyOn(window, "addEventListener").mockImplementation(
      (event, callback) => {
        if (event === "resize") {
          resizeCallback = callback as () => void;
        }
      },
    );

    vi.spyOn(window, "removeEventListener").mockImplementation(() => {});
  });

  afterEach(() => {
    vi.restoreAllMocks();
    Object.defineProperty(window, "innerWidth", {
      configurable: true,
      writable: true,
      value: originalInnerWidth,
    });
    resizeCallback = null;
  });

  it("should return true for desktop screen width (>=768px)", () => {
    Object.defineProperty(window, "innerWidth", {
      configurable: true,
      writable: true,
      value: 1024,
    });

    const { result } = renderHook(() => useIsDesktopScreen());
    expect(result.current).toBe(true);
  });

  it("should return false for mobile screen width (<768px)", () => {
    Object.defineProperty(window, "innerWidth", {
      configurable: true,
      writable: true,
      value: 375,
    });

    const { result } = renderHook(() => useIsDesktopScreen());
    expect(result.current).toBe(false);
  });

  it("should return true when resizing from mobile to desktop", () => {
    Object.defineProperty(window, "innerWidth", {
      configurable: true,
      writable: true,
      value: 375,
    });

    const { result } = renderHook(() => useIsDesktopScreen());
    expect(result.current).toBe(false);

    Object.defineProperty(window, "innerWidth", {
      configurable: true,
      writable: true,
      value: 1024,
    });

    act(() => {
      if (resizeCallback) {
        resizeCallback();
      }
    });

    expect(result.current).toBe(true);
  });

  it("should clean up event listener on unmount", () => {
    const { unmount } = renderHook(() => useIsDesktopScreen());

    unmount();

    expect(window.removeEventListener).toHaveBeenCalledWith(
      "resize",
      expect.any(Function),
    );
  });

  it("should handle exact breakpoint (768px)", () => {
    Object.defineProperty(window, "innerWidth", {
      configurable: true,
      writable: true,
      value: 768,
    });

    const { result } = renderHook(() => useIsDesktopScreen());
    expect(result.current).toBe(true);
  });
});
