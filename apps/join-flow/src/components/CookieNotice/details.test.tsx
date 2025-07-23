import { fireEvent, render, screen } from "@testing-library/react";
import { vi } from "vitest";

import { Content, IndicatorArrow, Label, Root, Summary } from "./details";

vi.mock(import("framer-motion"), async (importOriginal) => {
  const actual = await importOriginal();
  return {
    ...actual,
    AnimatePresence: ({ children }) => <>{children}</>,
  };
});

describe("Details Component", () => {
  it("should render with correct header and content", () => {
    render(
      <Root>
        <Summary>
          <Label>Test Header</Label>
          <IndicatorArrow />
        </Summary>
        <Content>Test Content</Content>
      </Root>,
    );

    expect(screen.getByText("Test Header")).toBeInTheDocument();
    expect(screen.queryByText("Test Content")).not.toBeInTheDocument();
  });

  it("should toggle open state correctly", () => {
    render(
      <Root open={true}>
        <Summary>
          <Label>Test Header</Label>
          <IndicatorArrow />
        </Summary>
        <Content>Test Content</Content>
      </Root>,
    );

    const summary = screen.getByText("Test Header");
    expect(screen.getByText("Test Content")).toBeInTheDocument();

    fireEvent.click(summary);
    expect(screen.queryByText("Test Content")).not.toBeInTheDocument();

    fireEvent.click(summary);
    expect(screen.getByText("Test Content")).toBeInTheDocument();
  });
});
