import "@testing-library/jest-dom";

import { render, screen } from "@testing-library/react";

import { HowFastCanYouGo } from "./index";

describe("HowFastCanYouGo component", () => {
  it("renders the PostcodeChecker", () => {
    render(<HowFastCanYouGo />);
    expect(screen.getByText("How fast can you go?")).toBeInTheDocument();
    expect(screen.getByText("Let's go")).toBeInTheDocument();
  });
});
