import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { HowFastCanYouGo, HowFastCanYouGoProps } from "./index";

const mockHowFastCanYouGoProps: HowFastCanYouGoProps = {
  inputBackgroundVideoMp4: {
    url: "https://cuckoo-egg.cdn.prismic.io/cuckoo-egg/7d413c03-5afb-4c9b-8934-f6f21ebda40c_CK_Flex_Master.mp4",
  },
  inputBackgroundVideoWebm: {
    url: "https://cuckoo-egg.cdn.prismic.io/cuckoo-egg/1ed68638-5926-4c9e-b5a1-c0a1342dd5c2_CK_Flex_Master.webm"
  }
};

describe("HowFastCanYouGo component", () => {
  it("renders the PostcodeChecker", () => {
    render(<HowFastCanYouGo {...mockHowFastCanYouGoProps} />);
    expect(screen.getByText("How fast can you go?")).toBeInTheDocument();
    expect(screen.getByText("Check your speed")).toBeInTheDocument();
  });
});
