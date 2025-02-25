import { act, renderHook } from "@testing-library/react";
import { vi } from "vitest";

import { getStorageValue, useBrowserStorage } from ".";

describe("getStorageValue", () => {
  beforeEach(() => {
    localStorage.clear();
    sessionStorage.clear();
  });

  it("should return undefined for a non-existing key", () => {
    const result = getStorageValue("non_existing_key");
    expect(result).toBeUndefined();
  });

  it("should return parsed value for an existing key", () => {
    localStorage.setItem("test_key", JSON.stringify({ foo: "bar" }));
    const result = getStorageValue<{ foo: string }>("test_key");
    expect(result).toEqual({ foo: "bar" });
  });

  it("should handle JSON parsing errors gracefully", () => {
    localStorage.setItem("test_key", "invalid_json");
    const consoleErrorSpy = vi.spyOn(console, "error");
    const result = getStorageValue("test_key");
    expect(result).toBeUndefined();
    expect(consoleErrorSpy).toHaveBeenCalledWith(
      "Unable to parse 'test_key' from localStorage",
    );
    consoleErrorSpy.mockRestore();
  });
});

describe("useBrowserStorage", () => {
  beforeEach(() => {
    localStorage.clear();
    sessionStorage.clear();
  });

  it("should initialize with null if no initial value is provided", () => {
    const { result } = renderHook(() => useBrowserStorage("test_key"));
    expect(result.current[0]).toBeNull();
  });

  it("should initialize with the provided initial value", () => {
    const { result } = renderHook(() =>
      useBrowserStorage("test_key", { foo: "bar" }),
    );
    expect(result.current[0]).toEqual({ foo: "bar" });
  });

  it("should set and get value from localStorage", () => {
    const { result } = renderHook(() => useBrowserStorage("test_key"));

    act(() => {
      result.current[1]({ foo: "bar" });
    });

    expect(result.current[0]).toEqual({ foo: "bar" });
    expect(localStorage.getItem("test_key")).toEqual(
      JSON.stringify({ foo: "bar" }),
    );
  });

  it("should retrieve value from localStorage on mount", () => {
    localStorage.setItem("test_key", JSON.stringify({ foo: "bar" }));
    const { result } = renderHook(() => useBrowserStorage("test_key"));

    expect(result.current[0]).toEqual({ foo: "bar" });
  });
});
