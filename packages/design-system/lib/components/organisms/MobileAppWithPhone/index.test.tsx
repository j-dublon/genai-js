import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { MobileAppWithPhone } from ".";
import { MobileAppProps } from "@components/molecules/MobileApp";

const mockMobileProps: MobileAppProps = {
  headingText: "It’s all in hand with the app",
  textItems: [
    {
      itemText: "Manage your order and installation"
    }
  ]
};

describe("MobileAppWithPhone Component", () => {
  it("renders the title text", () => {
    render(<MobileAppWithPhone {...mockMobileProps} />);
    expect(screen.getByText(mockMobileProps.headingText)).toBeInTheDocument();
  });

  it("renders the text items", () => {
    render(<MobileAppWithPhone {...mockMobileProps} />);
    mockMobileProps.textItems.forEach((item) => {
      expect(
        screen.getAllByLabelText(
          `Text item with statement: ${item.itemText}`
        )[0]
      ).toBeInTheDocument();
    });
  });
});
