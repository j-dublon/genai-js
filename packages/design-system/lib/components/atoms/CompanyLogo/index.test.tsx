import { render, screen } from "@testing-library/react";

import { CompanyLogo } from ".";

describe("CompanyLogo Component", () => {
  const props = {
    altText: "Test alt text",
    width: "100",
    height: "100",
    imgSrc: "Test img src",
  };
  it("renders the button with children", () => {
    render(<CompanyLogo {...props} />);

    expect(screen.getByRole("img")).toBeInTheDocument();
    expect(screen.getByAltText("Test alt text")).toBeInTheDocument();
  });
});
