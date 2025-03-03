import "@testing-library/jest-dom";

import { render, screen } from "@testing-library/react";

import { MobileAppWrapper } from ".";
import { mobileAppProps } from "./mobileAppProps";

describe("MobileAppWrapper", () => {
  beforeEach(() => {
    render(<MobileAppWrapper />);
  });

  it("renders the heading", () => {
    expect(
      screen.getByText("Plus, a really, really handy app"),
    ).toBeInTheDocument();
  });

  it("renders the text with tick items", () => {
    mobileAppProps.textItems.forEach((item) => {
      expect(screen.getAllByText(item.itemText)[0]).toBeInTheDocument();
    });
  });
});
