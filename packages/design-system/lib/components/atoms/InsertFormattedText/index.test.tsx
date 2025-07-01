import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { InsertFormattedText } from ".";

describe("InsertFormattedText", () => {
  const mockText = "This is a sample text for testing";
  const mockSearchText = "sample";
  const mockClassName = "highlighted-text";

  it("renders the original text when searchText is found", () => {
    render(
      <InsertFormattedText
        text={mockText}
        searchText={mockSearchText}
        className={mockClassName}
      />,
    );
    expect(screen.getByText(/This is a/)).toBeInTheDocument();
    expect(screen.getByText(/sample/)).toBeInTheDocument();
    expect(screen.getByText(/ text for testing/)).toBeInTheDocument();
  });

  it("applies the correct className to the highlighted text", () => {
    render(
      <InsertFormattedText
        text={mockText}
        searchText={mockSearchText}
        className={mockClassName}
      />,
    );
    const highlightedSpan = screen.getByText(mockSearchText);
    expect(highlightedSpan).toHaveClass(mockClassName);
    expect(highlightedSpan.tagName).toBe("SPAN");
  });

  it("returns the original text, without a className when searchText is not found", () => {
    const { container } = render(
      <InsertFormattedText
        text={mockText}
        searchText="notfound"
        className={mockClassName}
      />,
    );
    const textContent = container.textContent;
    expect(textContent).toBe(mockText);
    expect(screen.queryByText(/notfound/)).not.toBeInTheDocument();
    expect(container.querySelector(`.${mockClassName}`)).toBeNull();
  });

  it("returns the original text when text is empty", () => {
    const { container } = render(
      <InsertFormattedText
        text=""
        searchText={mockSearchText}
        className={mockClassName}
      />,
    );
    expect(container.textContent).toBe("");
  });

  it("returns the original text when searchText is empty", () => {
    const { container } = render(
      <InsertFormattedText
        text={mockText}
        searchText=""
        className={mockClassName}
      />,
    );
    expect(container.textContent).toBe(mockText);
  });

  it("returns the original text when className is empty", () => {
    const { container } = render(
      <InsertFormattedText
        text={mockText}
        searchText={mockSearchText}
        className=""
      />,
    );
    expect(container.textContent).toBe(mockText);
    // Verify no span element exists when className is empty
    expect(container.querySelector("span")).toBeNull();
  });

  it("handles case-sensitive search correctly", () => {
    render(
      <InsertFormattedText
        text="This is a Sample text"
        searchText="sample"
        className={mockClassName}
      />,
    );
    // Should not find "sample" (lowercase) in "Sample" (capitalized)
    expect(screen.queryByText(/sample/)).not.toBeInTheDocument();
    expect(screen.getByText(/This is a Sample text/)).toBeInTheDocument();
  });

  it("highlights only the first occurrence when searchText appears multiple times", () => {
    const textWithMultipleOccurrences = "test this test text";
    const { container } = render(
      <InsertFormattedText
        text={textWithMultipleOccurrences}
        searchText="test"
        className={mockClassName}
      />,
    );

    // Verify the full text content is preserved
    expect(container.textContent).toBe(textWithMultipleOccurrences);
    // Verify only one span with the className exists (first occurrence only)
    expect(container.querySelectorAll(`.${mockClassName}`)).toHaveLength(1);
  });

  it("handles special characters in searchText", () => {
    const textWithSpecialChars = "Email: user@example.com for contact";
    render(
      <InsertFormattedText
        text={textWithSpecialChars}
        searchText="user@example.com"
        className={mockClassName}
      />,
    );

    expect(screen.getByText(/Email: /)).toBeInTheDocument();
    expect(screen.getByText(/user@example.com/)).toBeInTheDocument();
    expect(screen.getByText(/user@example.com/)).toHaveClass(mockClassName);
    expect(screen.getByText(/ for contact/)).toBeInTheDocument();
  });

  it("handles searchText at the beginning of text", () => {
    const textStartingWithSearch = "Hello world and everyone";
    const { container } = render(
      <InsertFormattedText
        text={textStartingWithSearch}
        searchText="Hello"
        className={mockClassName}
      />,
    );

    expect(screen.getByText(/Hello/)).toHaveClass(mockClassName);
    expect(container.textContent).toBe(textStartingWithSearch);
  });

  it("handles searchText at the end of text", () => {
    const textEndingWithSearch = "Welcome to the world";
    const { container } = render(
      <InsertFormattedText
        text={textEndingWithSearch}
        searchText="world"
        className={mockClassName}
      />,
    );

    expect(screen.getByText(/world/)).toHaveClass(mockClassName);
    expect(container.textContent).toBe(textEndingWithSearch);
  });

  it("handles searchText that spans the entire text", () => {
    const fullText = "complete";
    render(
      <InsertFormattedText
        text={fullText}
        searchText={fullText}
        className={mockClassName}
      />,
    );

    expect(screen.getByText(/complete/)).toHaveClass(mockClassName);
  });
});
