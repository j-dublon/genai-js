import { render, screen } from "@testing-library/react";
import { vi } from "vitest";

import { PostcodeChecker } from ".";

describe("PostcodeChecker Component", () => {
  const props = {
    titleText: "Test title",
    placeholderText: "Test placeholder text",
    inputBoxButtonText: "Test",
    postcode: "PO9 6YA",
    setPostcode: vi.fn(),
  };
  it("renders the component", () => {
    render(<PostcodeChecker {...props} />);

    expect(screen.getByText("Test title")).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText("Test placeholder text"),
    ).toBeInTheDocument();
  });
});
