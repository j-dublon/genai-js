import { render, screen } from "@testing-library/react";

import { AccessibleLoadingEgg } from ".";

describe("AccessibleLoadingEgg", () => {
  it("renders the LoadingEgg spinner", () => {
    const { container } = render(<AccessibleLoadingEgg />);
    const svg = container.querySelector("svg");
    expect(svg).toBeInTheDocument();
  });

  it("includes a screen-reader-only loading message", () => {
    render(<AccessibleLoadingEgg />);
    const srText = screen.getByText("Loading...", { selector: ".sr-only" });
    expect(srText).toBeInTheDocument();
  });

  it("sets aria-live='polite' on the wrapper to announce the loading state", () => {
    render(<AccessibleLoadingEgg wrapperClassName="wrapper" />);
    const wrapper = screen.getByText("Loading...", {
      selector: ".sr-only",
    }).parentElement;
    expect(wrapper).toHaveAttribute("aria-live", "polite");
  });
});
