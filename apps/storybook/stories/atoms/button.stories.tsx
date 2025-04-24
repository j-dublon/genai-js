import { Button } from "@react-component-library/ui";
import type { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof Button> = {
  component: Button,
  parameters: {
    docs: {
      description: {
        component:
          "A button component that accepts all standard HTMLButtonElement attributes in addition to its custom props.",
      },
    },
  },
  argTypes: {
    as: {
      control: "select",
      options: ["button", "a", "div", "span"],
      description: "Render button as a different HTML element",
      table: {
        type: { summary: "ElementType" },
        defaultValue: { summary: "button" },
      },
    },
    size: {
      control: "select",
      options: ["small", "medium", "large"],
      description: "Controls the size of the button",
      table: {
        type: { summary: '"small" | "medium" | "large"' },
        defaultValue: { summary: "large" },
      },
    },
    tint: {
      control: "select",
      options: ["black", "yellow", "white", "blue", "grey", "light-peach"],
      description: "Controls the color theme of the button",
      table: {
        type: {
          summary:
            '"black" | "yellow" | "white" | "blue" | "grey" | "light-peach"',
        },
        defaultValue: { summary: "black" },
      },
    },
    variant: {
      control: "radio",
      options: ["solid", "outline"],
      description: "Controls the visual style of the button",
      table: {
        type: { summary: '"solid" | "outline"' },
        defaultValue: { summary: "outline" },
      },
    },
    textColor: {
      control: "select",
      options: ["black", "yellow", "white", "blue"],
      description: "Overrides the text color of the button",
      table: {
        type: { summary: '"black" | "yellow" | "white" | "blue"' },
      },
    },
    href: {
      control: "text",
      description: "If provided, renders the button as an anchor tag",
      table: {
        type: { summary: "string" },
      },
    },
    rel: {
      control: "text",
      description:
        "Specifies the relationship between the current document and the linked document",
      table: {
        type: { summary: "string" },
      },
    },
    target: {
      control: "select",
      options: ["_blank", "_self", "_parent", "_top"],
      description: "Specifies where to open the linked document",
      table: {
        type: { summary: "string" },
      },
    },
    className: {
      control: "text",
      description: "Additional CSS classes to apply",
      table: {
        type: { summary: "string" },
      },
    },
    disabled: {
      control: "boolean",
      description: "Controls whether the button is disabled",
      table: {
        type: { summary: "boolean" },
      },
    },
    fullWidth: {
      control: "boolean",
      description: "Controls whether the button wrapper is full width",
      table: {
        type: { summary: "boolean" },
      },
    },
    type: {
      control: "radio",
      options: ["button", "submit", "reset"],
      description: "Controls the HTML button type attribute",
      table: {
        type: { summary: '"button" | "submit" | "reset"?' },
      },
    },
    children: {
      description: "Button content",
      table: {
        type: { summary: "ReactNode" },
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Default: Story = {
  args: {
    children: "I'm a button",
  },
};
