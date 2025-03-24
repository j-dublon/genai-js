import { fireEvent, render, screen, within } from "@testing-library/react";
import { vi } from "vitest";

import { PostcodeChecker } from ".";

describe("PostcodeChecker Component", () => {
  const props = {
    titleText: "Test title",
    placeholderText: "Test placeholder text",
    inputBoxButtonText: "Test",
    postcode: "PO9 6YA",
    setPostcode: vi.fn(),
    onClickFunction: vi.fn(),
  };

  it("renders the component", () => {
    render(<PostcodeChecker {...props} />);

    expect(screen.getByText("Test title")).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText("Test placeholder text"),
    ).toBeInTheDocument();
  });

  it("renders mobile and desktop submit buttons with correct visibility", () => {
    render(<PostcodeChecker {...props} />);

    const desktopSubmitButton = screen.getByTestId("desktop-submit");
    expect(desktopSubmitButton).toHaveClass("ds:hidden", "ds:sm:flex");
    expect(within(desktopSubmitButton).getByRole("button")).toHaveTextContent(
      "Test",
    );

    expect(screen.getByTestId("mobile-submit")).toHaveClass(
      "ds:block",
      "ds:sm:hidden",
    );
  });

  it("runs the onSubmit function when the desktop submit button is clicked", () => {
    render(<PostcodeChecker {...props} />);
    const button = within(screen.getByTestId("desktop-submit")).getByRole(
      "button",
    );
    fireEvent.click(button);
    expect(props.onClickFunction).toHaveBeenCalled();
  });

  it("runs the onSubmit function when the mobile submit button is clicked", () => {
    render(<PostcodeChecker {...props} />);
    const button = screen.getByTestId("mobile-submit");
    fireEvent.click(button);
    expect(props.onClickFunction).toHaveBeenCalled();
  });
});
