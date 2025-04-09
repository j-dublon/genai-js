import {
  TEXT_COLORS,
  TipCard,
  tipCardColors,
} from "@react-component-library/ui";
import type { Meta, StoryObj } from "@storybook/react";

const meta = {
  component: TipCard,
  parameters: {
    docs: {
      description: {
        component:
          "A card component for displaying tips or information with optional subtitle, image, and customizable colors.",
      },
    },
  },
  argTypes: {
    subtitle: {
      control: "text",
      description: "Optional subtitle displayed in bold before the main text",
      table: {
        type: { summary: "string" },
      },
    },
    image: {
      control: "object",
      description: "Optional image to display alongside the text",
      table: {
        type: { summary: "{ src: string, alt: string }" },
      },
    },
    backgroundColor: {
      control: "select",
      options: Object.keys(tipCardColors),
      description: "Background color of the card",
      table: {
        type: { summary: "BackgroundColors" },
        defaultValue: { summary: "white" },
      },
    },
    subtitleColor: {
      control: "select",
      options: TEXT_COLORS,
      description: "Text color of the subtitle",
      table: {
        type: { summary: "TextColors" },
        defaultValue: { summary: "black" },
      },
    },
    children: {
      description: "Content for the tip card",
      table: {
        type: { summary: "ReactNode" },
      },
    },
  },
} as Meta<typeof TipCard>;

export default meta;
type Story = StoryObj<typeof TipCard>;

export const Simple: Story = {
  args: {
    subtitle: "Important:",
    children:
      "This is a simple tip card with just text content. It contains super useful information that you should know!",
    backgroundColor: "blue",
    subtitleColor: "tertiary-blue-dark",
    image: {
      src: "/assets/images/love.svg",
      alt: "Placeholder image",
    },
  },
};

export const WithComplexContent: Story = {
  args: {
    backgroundColor: "green",
    children: (
      <>
        This tip card contains complex content with a{" "}
        <a href="https://example.com" className="ds:text-ui-link">
          link
        </a>{" "}
        and <strong>formatted text</strong>, and no image.
      </>
    ),
  },
};
