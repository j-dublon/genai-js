import type { Meta, StoryObj } from "@storybook/react";
import { HowFastCanYouGo } from "@react-component-library/ui";

const meta: Meta<typeof HowFastCanYouGo> = {
  component: HowFastCanYouGo,
};

export default meta;

type Story = StoryObj<typeof HowFastCanYouGo>;

/*
 *👇 Render functions are a framework specific feature to allow you control on how the component renders.
 * See https://storybook.js.org/docs/react/api/csf
 * to learn how to use render functions.
 */

 interface HowFastCanYouGoProps {
  inputBackgroundVideoWebm: {
    url: string
  };
  inputBackgroundVideoMp4: {
    url: string
  };
}

export const Primary: Story = {
  render: (props: HowFastCanYouGoProps) => <HowFastCanYouGo {...props} />,
  name: "How Fast Can You Go",
  args: {
    inputBackgroundVideoWebm: {
      url: "https://cuckoo-egg.cdn.prismic.io/cuckoo-egg/1ed68638-5926-4c9e-b5a1-c0a1342dd5c2_CK_Flex_Master.webm"
    },
    inputBackgroundVideoMp4: {
      url: "https://cuckoo-egg.cdn.prismic.io/cuckoo-egg/7d413c03-5afb-4c9b-8934-f6f21ebda40c_CK_Flex_Master.mp4"
    }
  },
};
