import { render, screen } from "@testing-library/react";
import { StorybookLogo } from ".";

describe("StorybookLogo Component", () => {
  const mockProps = {
    altText: "Test Logo",
    imgSrc: "https://via.placeholder.com/150",
    width: 150,
    height: 150
  };

  it("renders the logo with correct attributes", () => {
    render(<StorybookLogo {...mockProps} />);
    const logo = screen.getByAltText(mockProps.altText);

    expect(logo).toBeInTheDocument();
    expect(logo).toHaveAttribute("src", mockProps.imgSrc);
    expect(logo).toHaveAttribute("width", mockProps.width.toString());
    expect(logo).toHaveAttribute("height", mockProps.height.toString());
  });

  it("includes the correct aria-label", () => {
    render(<StorybookLogo {...mockProps} />);
    const logo = screen.getByLabelText(`Storybook Logo: ${mockProps.altText}`);

    expect(logo).toBeInTheDocument();
  });
});
