import { render, screen } from "@testing-library/react";
import { PostcodeChecker } from ".";

describe("PostcodeChecker Component", () => {
  const props = {
    titleText: "Test title",
    topText: "Test top text title",
    placeholderText: "Test placeholder text",
    inputBoxButtonText: "Test",
  };
  it("renders the component", () => {
    render(<PostcodeChecker {...props} />);

    expect(screen.getByText("Test title")).toBeInTheDocument();
    expect(screen.getByText("Test top text title")).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText("Test placeholder text")
    ).toBeInTheDocument();
  });

  it("doesn't render the top text if topText prop isn't set", () => {
    const newProps = {
      titleText: "Test title",
      placeholderText: "Test placeholder text",
      InputBoxButtonText: "Test",
    };
    render(<PostcodeChecker {...newProps} />);

    expect(screen.queryByText("Test top text title")).not.toBeInTheDocument();
  });
});
