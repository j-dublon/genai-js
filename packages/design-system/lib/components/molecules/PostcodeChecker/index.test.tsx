import { render, screen } from "@testing-library/react";

import { PostcodeChecker } from ".";

describe("PostcodeChecker Component", () => {
  const props = {
    titleText: "Test title",
    labelText: "Test label text title",
    placeholderText: "Test placeholder text",
    inputBoxButtonText: "Test",
  };
  it("renders the component", () => {
    render(<PostcodeChecker {...props} />);

    expect(screen.getByText("Test title")).toBeInTheDocument();
    expect(screen.getByText("Test label text title")).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText("Test placeholder text"),
    ).toBeInTheDocument();
  });

  it("doesn't render the label text if labelText prop isn't set", () => {
    const newProps = {
      titleText: "Test title",
      placeholderText: "Test placeholder text",
      InputBoxButtonText: "Test",
    };
    render(<PostcodeChecker {...newProps} />);

    expect(screen.queryByText("Test label text title")).not.toBeInTheDocument();
  });
});
