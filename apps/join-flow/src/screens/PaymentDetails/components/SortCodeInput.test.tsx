import { fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { UseFormRegisterReturn } from "react-hook-form";
import { vi } from "vitest";

import { SortCodeInput } from "./SortCodeInput";

describe("SortCodeInput", () => {
  const mockRegister = {
    onChange: vi.fn().mockImplementation(() => {
      return Promise.resolve();
    }),
    onBlur: vi.fn().mockImplementation(() => {
      return Promise.resolve();
    }),
    name: "sortCode",
    ref: vi.fn(),
  } as unknown as UseFormRegisterReturn;

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders correctly", () => {
    render(
      <SortCodeInput
        register={mockRegister}
        id="sortCode"
        placeholder="Sort code"
      />,
    );

    expect(screen.getByPlaceholderText("Sort code")).toBeInTheDocument();
  });

  it("formats input with dashes when digits are entered", async () => {
    const user = userEvent.setup();
    let inputValue = "";

    const mockOnChange = vi.fn((e) => {
      inputValue = e.target.value;
      return Promise.resolve();
    });

    const customRegister = {
      ...mockRegister,
      onChange: mockOnChange,
    } as unknown as UseFormRegisterReturn;

    render(
      <SortCodeInput
        register={customRegister}
        id="sortCode"
        placeholder="Sort code"
      />,
    );

    const input = screen.getByPlaceholderText("Sort code");

    await user.type(input, "1");
    expect(mockOnChange).toHaveBeenCalled();
    expect(inputValue).toBe("1");

    await user.type(input, "23");
    expect(inputValue).toBe("12-3");

    await user.type(input, "456");
    expect(inputValue).toBe("12-34-56");
  });

  it("handles pasting of digits without dashes", async () => {
    let inputValue = "";

    const mockOnChange = vi.fn((e) => {
      inputValue = e.target.value;
      return Promise.resolve();
    });

    const customRegister = {
      ...mockRegister,
      onChange: mockOnChange,
    } as unknown as UseFormRegisterReturn;

    render(
      <SortCodeInput
        register={customRegister}
        id="sortCode"
        placeholder="Sort code"
      />,
    );

    const input = screen.getByPlaceholderText("Sort code");

    fireEvent.change(input, { target: { value: "123456" } });

    expect(mockOnChange).toHaveBeenCalled();
    expect(inputValue).toBe("12-34-56");
  });

  it("handles pasting of digits with dashes", async () => {
    let inputValue = "";

    const mockOnChange = vi.fn((e) => {
      inputValue = e.target.value;
      return Promise.resolve();
    });

    const customRegister = {
      ...mockRegister,
      onChange: mockOnChange,
    } as unknown as UseFormRegisterReturn;

    render(
      <SortCodeInput
        register={customRegister}
        id="sortCode"
        placeholder="Sort code"
      />,
    );

    const input = screen.getByPlaceholderText("Sort code");

    fireEvent.change(input, { target: { value: "12-34-56" } });

    expect(mockOnChange).toHaveBeenCalled();
    expect(inputValue).toBe("12-34-56");
  });

  it("strips non-digit characters", async () => {
    let inputValue = "";

    const mockOnChange = vi.fn((e) => {
      inputValue = e.target.value;
      return Promise.resolve();
    });

    const customRegister = {
      ...mockRegister,
      onChange: mockOnChange,
    } as unknown as UseFormRegisterReturn;

    render(
      <SortCodeInput
        register={customRegister}
        id="sortCode"
        placeholder="Sort code"
      />,
    );

    const input = screen.getByPlaceholderText("Sort code");

    fireEvent.change(input, { target: { value: "ab1c2d3e4f5g6h" } });

    expect(mockOnChange).toHaveBeenCalled();
    expect(inputValue).toBe("12-34-56");
  });

  it("limits input to max 6 digits (formatted as XX-XX-XX)", async () => {
    let inputValue = "";

    const mockOnChange = vi.fn((e) => {
      inputValue = e.target.value;
      return Promise.resolve();
    });

    const customRegister = {
      ...mockRegister,
      onChange: mockOnChange,
    } as unknown as UseFormRegisterReturn;

    render(
      <SortCodeInput
        register={customRegister}
        id="sortCode"
        placeholder="Sort code"
      />,
    );

    const input = screen.getByPlaceholderText("Sort code");

    fireEvent.change(input, { target: { value: "1234567890" } });

    expect(mockOnChange).toHaveBeenCalled();
    expect(inputValue).toBe("12-34-56");
  });

  it("preserves partially formatted input", async () => {
    let inputValue = "";

    const mockOnChange = vi.fn((e) => {
      inputValue = e.target.value;
      return Promise.resolve();
    });

    const customRegister = {
      ...mockRegister,
      onChange: mockOnChange,
    } as unknown as UseFormRegisterReturn;

    render(
      <SortCodeInput
        register={customRegister}
        id="sortCode"
        placeholder="Sort code"
      />,
    );

    const input = screen.getByPlaceholderText("Sort code");

    fireEvent.change(input, { target: { value: "12-34" } });

    expect(mockOnChange).toHaveBeenCalled();
    expect(inputValue).toBe("12-34");
  });
});
