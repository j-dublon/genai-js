import { Preview } from "@storybook/react";
import "@react-component-library/ui/ui.css";
import "../fonts.css";

const preview: Preview = {
  parameters: {
    viewport: {
      viewports: {
        desktop: {
          name: "Desktop",
          styles: {
            width: "1152px",
            height: "800px",
          },
        },
        mobile: {
          name: "Mobile",
          styles: {
            width: "768px",
            height: "800px",
          },
        },
      },
      defaultViewport: "desktop",
    },
  },
};

export default preview;
