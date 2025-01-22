import { render, screen } from "@testing-library/react";
import { CompanyLogoStrip } from ".";

describe("CompanyLogoStrip Component", () => {
  const props = {
    logos: [
      {
        altText: "Test alt text",
        width: "100",
        height: "100",
        imgSrc: "Test img src",
      },
    ],
  };
  it("renders the component", () => {
    render(<CompanyLogoStrip {...props} />);
    expect(screen.getByRole("img")).toBeInTheDocument();
  });
});
