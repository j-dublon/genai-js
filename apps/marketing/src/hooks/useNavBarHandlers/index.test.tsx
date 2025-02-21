import { act, renderHook } from "@testing-library/react";

import { useNavBarHandlers } from ".";

describe("useNavBarHandlers Hook", () => {
  test("should close dropdown when clicking outside the dropdown area", () => {
    const { result } = renderHook(() => useNavBarHandlers());

    act(() => {
      document.dispatchEvent(new MouseEvent("mousedown", { bubbles: true }));
    });

    expect(result.current.toggled).toBe(false);
    expect(result.current.openDropdown).toBe(null);
  });

  test("should close dropdown when Escape key is pressed", () => {
    const { result } = renderHook(() => useNavBarHandlers());

    act(() => {
      document.dispatchEvent(new KeyboardEvent("keydown", { key: "Escape" }));
    });

    expect(result.current.toggled).toBe(false);
    expect(result.current.openDropdown).toBe(null);
  });
});
