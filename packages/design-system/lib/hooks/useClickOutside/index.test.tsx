import { renderHook } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import { useClickOutside } from "./index";

describe("useClickOutside", () => {
  it("should not add mousedown event listener when isModalOpen is false", () => {
    const addEventListenerSpy = vi.spyOn(document, "addEventListener");
    const ref = { current: document.createElement("dialog") };

    renderHook(() => useClickOutside(ref, false, vi.fn()));

    const mousedownCalls = addEventListenerSpy.mock.calls.filter(
      (call) => call[0] === "mousedown",
    );
    expect(mousedownCalls.length).toBe(0);

    addEventListenerSpy.mockRestore();
  });

  it("should add mousedown event listener when isModalOpen is true", () => {
    const addEventListenerSpy = vi.spyOn(document, "addEventListener");
    const ref = { current: document.createElement("dialog") };

    renderHook(() => useClickOutside(ref, true, vi.fn()));

    const mousedownCalls = addEventListenerSpy.mock.calls.filter(
      (call) => call[0] === "mousedown",
    );
    expect(mousedownCalls.length).toBe(1);

    addEventListenerSpy.mockRestore();
  });

  it("should call onOutsideClick when clicking outside the element", () => {
    const onOutsideClick = vi.fn();
    const ref = { current: document.createElement("dialog") };

    ref.current.getBoundingClientRect = vi.fn().mockReturnValue({
      left: 100,
      right: 300,
      top: 100,
      bottom: 300,
    });

    renderHook(() => useClickOutside(ref, true, onOutsideClick));

    const clickEvent = new MouseEvent("mousedown", {
      clientX: 50,
      clientY: 50,
    });

    document.dispatchEvent(clickEvent);

    expect(onOutsideClick).toHaveBeenCalled();
  });

  it("should not call onOutsideClick when clicking inside the element", () => {
    const onOutsideClick = vi.fn();
    const ref = { current: document.createElement("dialog") };

    ref.current.getBoundingClientRect = vi.fn().mockReturnValue({
      left: 100,
      right: 300,
      top: 100,
      bottom: 300,
    });

    renderHook(() => useClickOutside(ref, true, onOutsideClick));

    const clickEvent = new MouseEvent("mousedown", {
      clientX: 200,
      clientY: 200,
    });

    document.dispatchEvent(clickEvent);

    expect(onOutsideClick).not.toHaveBeenCalled();
  });

  it("should remove mousedown event listener on cleanup", () => {
    const removeEventListenerSpy = vi.spyOn(document, "removeEventListener");
    const ref = { current: document.createElement("dialog") };

    const { unmount } = renderHook(() => useClickOutside(ref, true, vi.fn()));

    unmount();

    const mousedownCalls = removeEventListenerSpy.mock.calls.filter(
      (call) => call[0] === "mousedown",
    );
    expect(mousedownCalls.length).toBe(1);

    removeEventListenerSpy.mockRestore();
  });
});
