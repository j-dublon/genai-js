import { render, screen } from "@testing-library/react";
import { CompanyLogoStrip } from "@components/molecules/CompanyLogoStrip";

describe("CompanyLogoStrip Component", () => {
  const props = {
    logos: [
      {
        altText: "Test Alt Text 1",
        width: "100",
        height: "100",
        imgSrc: "test-src-1.png"
      },
      {
        altText: "Test Alt Text 2",
        width: "120",
        height: "80",
        imgSrc: "test-src-2.png"
      }
    ],
    backgroundColor: "bg-gray-100"
  };

  it("renders the component", () => {
    render(<CompanyLogoStrip {...props} />);
    expect(
      screen.getAllByRole("img", { name: "Test Alt Text 1" })
    ).toHaveLength(3);
    expect(
      screen.getAllByRole("img", { name: "Test Alt Text 2" })
    ).toHaveLength(3);
  });

  it("renders the correct number of logos", () => {
    render(<CompanyLogoStrip {...props} />);
    expect(screen.getAllByRole("img")).toHaveLength(6);
  });
});
